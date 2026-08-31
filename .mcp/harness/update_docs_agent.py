import os
import sys
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

def _clean_markdown_text(raw_text: str) -> str:
    """Removes outer markdown code block fences if returned by the LLM."""
    text = raw_text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:markdown|md)?\n?", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\n?```$", "", text)
    return text.strip() + "\n"

def _process_single_file_with_fallback(client: genai.Client, primary_model: str, rel_path: str, current_content: str, change_summary: str) -> str:
    """Processes a single documentation file via streaming with model fallbacks."""
    fallback_candidates = [
        primary_model,
        "gemini-3.6-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
    ]
    models_to_try = list(dict.fromkeys(fallback_candidates))

    prompt = f"""
You are DocumentationMaintainerAgent for PEND Boilerplate.

FILE TO SYNC : {rel_path}

SUMMARY OF RECENT MERGES / CHANGES : 
{change_summary}

CURRENT CONTENT OF {rel_path}:
{current_content}

TASK:
Synchronize version numbers, library updates, timestamps, guidelines, or changelogs for this specific file based on the summary.
- Return ONLY the updated full markdown text content for {rel_path}.
- Do NOT wrap the entire output in JSON.
- Do NOT add introductory or concluding conversational text.
"""

    for model in models_to_try:
        print(f"  [Attempting: {model}] ", end="", flush=True)
        for attempt in range(1, 4):
            try:
                response_stream = client.models.generate_content_stream(
                    model=model,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        temperature=0.2,
                    )
                )
                
                accumulated_text = ""
                for chunk in response_stream:
                    if chunk.text:
                        accumulated_text += chunk.text
                        print(".", end="", flush=True)  # Visual heartbeat
                
                print(" [Done]")
                return _clean_markdown_text(accumulated_text)

            except Exception as e:
                error_str = str(e)
                if "503" in error_str or "UNAVAILABLE" in error_str:
                    wait_time = attempt * 5
                    print(f"\n  [WARN] {model} busy (503). Retrying in {wait_time}s... (Attempt {attempt}/3)")
                    time.sleep(wait_time)
                elif "404" in error_str or "NOT_FOUND" in error_str:
                    print(f"\n  [WARN] Model {model} unavailable/deprecated (404). Skipping...")
                    break
                else:
                    print(f"\n  [WARN] Error on {model}: {e}. Retrying...")
                    time.sleep(3)

    raise RuntimeError(f"Failed to update {rel_path}. All configured Gemini models failed or are unavailable.")

def update_docs(change_summary: str = "Dependabot Dependency Upgrades & System Updates applied."):
    """DocumentationMaintainerAgent: Synchronizes project documentation and rules file-by-file via Gemini."""
    if not os.getenv("GEMINI_API_KEY"):
        print("[DOCS AGENT ERROR] GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    # Initialize client with explicit 60-second HTTP timeout to prevent indefinite socket hangs
    client = genai.Client(
        http_options=types.HttpOptions(timeout=60.0)
    )
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

    print(f"[DOCS AGENT] Starting synchronization for {len(docs_to_sync)} documentation files...")
    updated_count = 0

    for rel_path in docs_to_sync:
        file_path = ROOT_DIR / rel_path
        if not file_path.exists():
            print(f"[DOCS AGENT SKIP] File not found: {rel_path}")
            continue

        print(f"\n[DOCS AGENT] Updating ({updated_count + 1}/{len(docs_to_sync)}): {rel_path}")
        current_content = file_path.read_text(encoding="utf-8")
        
        try:
            new_content = _process_single_file_with_fallback(
                client, primary_model, rel_path, current_content, change_summary
            )
            
            # Write updated content
            file_path.parent.mkdir(parents=True, exist_ok=True)
            file_path.write_text(new_content, encoding="utf-8")
            updated_count += 1
            
        except Exception as err:
            print(f"[DOCS AGENT ERROR] Skipping {rel_path} due to error: {err}")

    print(f"\n[SUCCESS] DocumentationMaintainerAgent synchronized {updated_count} documentation file(s).")

if __name__ == "__main__":
    summary = sys.argv[1] if len(sys.argv) > 1 else "Dependabot dependency upgrades and system updates applied."
    update_docs(summary)