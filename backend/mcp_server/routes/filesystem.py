"""Workspace File System I/O API Router.

Provides endpoints for directory tree inspection, safe file reading and file
writing scoped strictly within the project workspace bounds.
"""

import os
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/fs", tags=["filesystem"])

# Resolve repository root (4 directory levels up from routes/filesystem.py)
PROJECT_ROOT = Path(__file__).resolve().parents[3]


class FileWriteRequest(BaseModel):
    """Schema for file write operations.

    Attributes:
        path: Workspace-relative path where file should be saved.
        content: UTF-8 string content to write into the target file.
    """

    path: str
    content: str


class FileNode(BaseModel):
    """Recursive schema representing a file or directory node in the workspace.

    Attributes:
        name: Name of the file or directory.
        path: Workspace-relative path.
        is_directory: Boolean indicating if node is a folder.
        children: Optional list of nested FileNode objects if is_directory is True.
    """

    name: str
    path: str
    is_directory: bool
    children: Optional[List["FileNode"]] = None


def build_file_tree(dir_path: Path) -> List[FileNode]:
    """Recursively constructs a tree structure of workspace files and directories.

    Args:
        dir_path: Absolute Path object pointing to the directory to inspect.

    Returns:
        List of FileNode objects representing the directory tree.
    """
    nodes = []
    ignored_dirs = {
        ".git",
        "node_modules",
        "__pycache__",
        ".next",
        ".venv",
        "venv",
        "dist",
        "build",
    }

    try:
        entries = sorted(
            os.scandir(dir_path), key=lambda e: (not e.is_dir(), e.name.lower())
        )
        for entry in entries:
            if entry.name in ignored_dirs or entry.name.startswith("."):
                continue

            rel_path = str(Path(entry.path).relative_to(PROJECT_ROOT))
            is_dir = entry.is_dir()

            node = FileNode(
                name=entry.name,
                path=rel_path,
                is_directory=is_dir,
                children=(build_file_tree(Path(entry.path)) if is_dir else None),
            )
            nodes.append(node)
    except PermissionError:
        pass

    return nodes


@router.get("/tree", response_model=List[FileNode])
async def get_file_tree():
    """Generates and returns the entire workspace directory tree structure.

    Returns:
        List of root-level FileNode objects.
    """
    return build_file_tree(PROJECT_ROOT)


@router.get("/read")
async def read_file(path: str):
    """Reads UTF-8 encoded text content from a specified workspace path.

    Args:
        path: Workspace-relative string path to read.

    Returns:
        Dictionary containing relative path and file text content.

    Raises:
        HTTPException 403: If requested path resides outside PROJECT_ROOT bounds.
        HTTPException 404: If target file does not exist.
        HTTPException 500: If file reading fails due to OS or decoding errors.
    """
    target_path = (PROJECT_ROOT / path).resolve()

    if not str(target_path).startswith(str(PROJECT_ROOT)):
        raise HTTPException(
            status_code=403, detail="Access Denied : Path outside Workspace"
        )

    if not target_path.exists() or not target_path.is_file():
        raise HTTPException(status_code=404, detail="File Not Found")

    try:
        content = target_path.read_text(encoding="utf-8")
        return {"path": path, "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read File : {str(e)}")


@router.post("/write")
async def write_file(req: FileWriteRequest):
    """Writes content to a workspace file, automatically creating parent directories.

    Args:
        req: FileWriteRequest payload containing target relative path and content.

    Returns:
        Dictionary indicating write status and target path.

    Raises:
        HTTPException 403: If target path attempts directory traversal outside root.
        HTTPException 500: If disk write operation fails.
    """
    target_path = (PROJECT_ROOT / req.path).resolve()

    if not str(target_path).startswith(str(PROJECT_ROOT)):
        raise HTTPException(
            status_code=403, detail="Access Denied : Path outside Workspace"
        )

    try:
        target_path.parent.mkdir(parents=True, exist_ok=True)
        target_path.write_text(req.content, encoding="utf-8")
        return {"status": "success", "path": req.path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write File : {str(e)}")
