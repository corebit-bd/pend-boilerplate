"""File System I/O Tool Adapter.

Provides Structured Tool Interface for Agents to Read, Write and Inspect Files
within PROJECT_ROOT.
"""

from pathlib import Path
from typing import Any, Dict

PROJECT_ROOT = Path(__file__).resolve().parents[3]


class FileSystemIOTool:
    """Tool Adapter executing Secure Workspace File Read and Write Actions."""

    def read_file(self, path: str) -> Dict[str, Any]:
        """Reads File Content safely bounded within Workspace.

        Args:
            path: Relative Workspace File Path.

        Returns:
            Dictionary containing File Path and Text Content.
        """
        target_path = (PROJECT_ROOT / path).resolve()
        if not str(target_path).startswith(str(PROJECT_ROOT)):
            return {"error": "Access Denied : Path outside Workspace"}

        if not target_path.exists():
            return {"error": f"File Not Found : {path}"}

        try:
            return {
                "path": path,
                "content": target_path.read_text(encoding="utf-8"),
            }
        except Exception as e:
            return {"error": f"Read Failed : {str(e)}"}

    def write_file(self, path: str, content: str) -> Dict[str, Any]:
        """Writes Content to File, Creating Parent Folders as needed.

        Args:
            path: Relative Workspace Target Path.
            content: UTF-8 String Content to persist.

        Returns:
            Dictionary with Operation Status.
        """
        target_path = (PROJECT_ROOT / path).resolve()
        if not str(target_path).startswith(str(PROJECT_ROOT)):
            return {"error": "Access Denied : Path outside Workspace"}

        try:
            target_path.parent.mkdir(parents=True, exist_ok=True)
            target_path.write_text(content, encoding="utf-8")
            return {"status": "success", "path": path}
        except Exception as e:
            return {"error": f"Write Failed : {str(e)}"}
