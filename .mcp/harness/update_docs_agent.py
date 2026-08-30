import os
import sys
import json
from pathlib import Path
from google import genai
from google.genai import types
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

# Fix Python path to import mcp_server from backend
ROOT_DIR = Path(__file__).resolve().parents[2]
BACKEND_DIR = ROOT_DIR / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from mcp_server.config import get_model_name  # pyright: ignore[reportMissingImports]

@retry(
    stop=stop_after_attempt(4),
    wait=wait_exponential(multiplier=2, min=5, max=30),
    retry=retry_if_exception_type(Exception),
    reraise=True
)

def _call_gemini_with_retry(client, model_name, prompt):
    """Executes the chat request with exponential backoff on transient errors."""
    chat = client.chats.create(
        model=model_name,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    return chat.send_message(prompt)

def update_docs(change_summary: str = "Dependabot dependency upgrades and system updates applied."):
    """DocumentationMaintainerAgent: Synchronizes project documentation and rules via Gemini."""
    if not os.getenv("GEMINI_API_KEY"):
        print("[DOCS AGENT ERROR] GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    client = genai.Client()
    model_name = get_model_name()
    
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

    print("[DOCUMENTATION MAINTAINER AGENT] Sending Documentation Synchronization Request to Gemini ... .. .")
    response = _call_gemini_with_retry(client, model_name, prompt)

    data = json.loads(response.text)
    for rel_path, text in data.items():
        target_path = ROOT_DIR / rel_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(text, encoding="utf-8")

    print(f"[SUCCESS] DocumentationMaintainerAgent synchronized {len(data)} documentation file(s).")

if __name__ == "__main__":
    summary = sys.argv[1] if len(sys.argv) > 1 else "Dependabot dependency upgrades and system updates applied."
    update_docs(summary)