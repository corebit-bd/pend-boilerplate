import os
import sys
import json
import time
import re
from pathlib import Path
from google import genai
from google.genai import types

ROOT_DIR = Path(__file__).resolve().parents[2]
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from mcp_server.config import get_model_name  # pyright: ignore[reportMissingImports]

def _send_with_fallback(client, primary_model, prompt):
    """Tries the primary model with backoff, falling back to active flash models during high demand or deprecation."""
    fallback_candidates = [
        primary_model,
        "gemini-3.6-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
    ]
    models_to_try = list(dict.fromkeys(fallback_candidates))

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
                error_str = str(e)
                if "503" in error_str or "UNAVAILABLE" in error_str:
                    wait_time = attempt * 5
                    print(f"[DOCS AGENT WARN] {model} busy (503). Retrying in {wait_time}s... (Attempt {attempt}/3)")
                    time.sleep(wait_time)
                elif "404" in error_str or "NOT_FOUND" in error_str:
                    print(f"[DOCS AGENT WARN] Model {model} not available or deprecated (404). Skipping...")
                    break
                else:
                    print(f"[DOCS AGENT WARN] Unexpected error on {model}: {e}. Retrying...")
                    time.sleep(3)
        print(f"[DOCS AGENT WARN] Model {model} unavailable. Switching to next model in fallback chain...")

    raise RuntimeError("All configured Gemini models failed or are currently unavailable.")

def _clean_json_text(raw_text: str) -> str:
    """Removes markdown wrappers and fixes invalid unicode escape sequences."""
    text = raw_text.strip()
    # Strip markdown json code block fences if present
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\n?", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\n?```$", "", text)
    # Fix invalid \uXXXX escape sequences by escaping orphan backslashes
    text = re.sub(r'\\u(?![0-9a-fa-fA-F]{4})', r'\\\\u', text)
    return text.strip()

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
    Ensure all text strings inside JSON values are properly JSON-escaped.
    """

    response = _send_with_fallback(client, primary_model, prompt)
    cleaned_text = _clean_json_text(response.text)

    try:
        data = json.loads(cleaned_text, strict=False)
    except json.JSONDecodeError as err:
        print(f"[DOCS AGENT ERROR] JSON parsing failed: {err}")
        sys.exit(1)

    for rel_path, text in data.items():
        target_path = ROOT_DIR / rel_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(text, encoding="utf-8")

    print(f"[SUCCESS] DocumentationMaintainerAgent synchronized {len(data)} documentation file(s).")

if __name__ == "__main__":
    summary = sys.argv[1] if len(sys.argv) > 1 else "Dependabot dependency upgrades and system updates applied."
    update_docs(summary)