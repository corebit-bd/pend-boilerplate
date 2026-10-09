import os
from pathlib import Path
from typing import Any, Dict, List, Optional

import pathspec
from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/api/filesystem", tags=["filesystem"])

# Define Project Root relative to backend Repository Root
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent


def get_gitignore_spec(root_path: Path) -> Optional[pathspec.PathSpec]:
    """Load .gitignore Rules if present in the Project Root."""
    gitignore_path = root_path / ".gitignore"
    if gitignore_path.is_file():
        try:
            with open(gitignore_path, "r", encoding="utf-8") as f:
                patterns = f.readlines()
            return pathspec.PathSpec.from_lines("gitwildmatch", patterns)
        except Exception:
            return None
    return None


def resolve_safe_path(relative_path: str) -> Path:
    """Resolve & Validate Path against Directory Traversal Attacks."""
    target_path = (PROJECT_ROOT / relative_path).resolve()
    if not str(target_path).startswith(str(PROJECT_ROOT)):
        raise HTTPException(
            status_code=403, detail="Access outside Workspace Root is forbidden."
        )
    return target_path


@router.get("/tree")
def get_file_tree(path: str = "") -> List[Dict[str, Any]]:
    """
    Shallow Traversal Endpoint : Returns Top-level contents of the Target Directory.
    Supports On-Demand Dynamic Expansion for heavy file trees.
    """
    target_dir = resolve_safe_path(path)

    if not target_dir.exists() or not target_dir.is_dir():
        raise HTTPException(status_code=404, detail="Directory not found.")

    spec = get_gitignore_spec(PROJECT_ROOT)
    items = []

    try:
        with os.scandir(target_dir) as entries:
            for entry in entries:
                entry_path = Path(entry.path)
                rel_path = entry_path.relative_to(PROJECT_ROOT).as_posix()

                # Ignore git System Directory Internal Files
                if entry.name == ".git":
                    continue

                # Check against .gitignore Rules
                is_ignored = False
                if spec:
                    # Append Trailing Slash for Directory Matching
                    check_path = f"{rel_path}/" if entry.is_dir() else rel_path
                    is_ignored = spec.match_file(check_path)

                items.append(
                    {
                        "name": entry.name,
                        "path": rel_path,
                        "is_directory": entry.is_dir(),
                        "is_ignored": is_ignored,
                    }
                )

        # Sort : Directories First, then Files Alphabetically
        items.sort(key=lambda x: (not x["is_directory"], x["name"].lower()))
        return items

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to read Directory : {str(e)}"
        )


@router.get("/content")
def get_file_content(path: str = Query(..., description="Relative Path to File")):
    """Read & return raw file text content."""
    file_path = resolve_safe_path(path)

    if not file_path.exists() or file_path.is_dir():
        raise HTTPException(status_code=404, detail="File Not Found.")

    try:
        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
        return {"path": path, "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read File : {str(e)}")
