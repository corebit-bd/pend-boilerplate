import os
import sys
import json
import time
from pathlib import Path
from google import genai
from google.genai import types

ROOT_DIR = Path(__file__).resolve().parents[2]
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from mcp_server.config import get_model_name  # pyright: ignore[reportMissingImports]

def _send_with_fallback(client, primary_model, prompt):
    """Tries the primary model with backoff, falling back to flash if unavailable."""
    models_to_try = [primary_model, "gemini-2.5-flash", "gemini-1.5-flash"]
    # De-duplicate while preserving order
    models_to_try = list(dict.fromkeys(models_to_try))

    for model in models_to_try:
        print(f"[DOCS AGENT] Attempting generation with model: {model}")
        for attempt in range(1, 4):
            try:
                chat = client.chats.create(
                    model=model,
                    config=types.GenerateContentConfig(response_mime_type="application/json")
                )
                return chat.send_message(prompt)
            except Exception as e:
                if "503" in str(e) or "UNAVAILABLE" in str(e):
                    wait_time = attempt * 5
                    print(f"[DOCS AGENT WARN] {model} busy (503). Retrying in {wait_time}s... (Attempt {attempt}/3)")
                    time.sleep(wait_time)
                else:
                    raise e
        print(f"[DOCS AGENT WARN] Model {model} unavailable after 3 attempts. Switching model...")

    raise RuntimeError("All configured Gemini models are currently experiencing 503 high demand.")

def update_docs(change_summary: str = "Dependabot dependency upgrades and system updates applied."):
    """DocumentationMaintainerAgent: Synchronizes project documentation and rules via Gemini."""
    if not os.getenv("GEMINI_API_KEY"):
        print("[DOCS AGENT ERROR] GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    client = genai.Client()
    primary_model = get_model_name()
    
    docs_to_sync = [
        "AGENTS.md",
        "CHANGELOG.md",
        "BOILERPLATE_CONTEXT.md",
        "LICENSE-THIRD-PARTY.md",
        "README.md",
        "backend/README.md",
        "frontend/README.md"
    ]
    
    contents = {}
    for rel_path in docs_to_sync:
        file_path = ROOT_DIR / rel_path
        if file_path.exists():
            contents[rel_path] = file_path.read_text(encoding="utf-8")

    prompt = f"""
    You are DocumentationMaintainerAgent for PEND Boilerplate.
    
    SUMMARY OF RECENT MERGES / CHANGES:
    {change_summary}
    
    CURRENT DOCUMENTATION FILES:
    {json.dumps(contents, indent=2)}
    
    TASK:
    Synchronize version numbers, library updates, and changelogs across all target files.
    Ensure AGENTS.md guidelines accurately reflect major dependency versions found in package definitions.
    
    Return JSON mapping output relative file paths to complete updated text strings.
    """

    response = _send_with_fallback(client, primary_model, prompt)

    data = json.loads(response.text)
    for rel_path, text in data.items():
        target_path = ROOT_DIR / rel_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(text, encoding="utf-8")

    print(f"[SUCCESS] DocumentationMaintainerAgent synchronized {len(data)} documentation file(s).")

if __name__ == "__main__":
    summary = sys.argv[1] if len(sys.argv) > 1 else "Dependabot dependency upgrades and system updates applied."
    update_docs(summary)