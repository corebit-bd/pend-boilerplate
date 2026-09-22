"""MCP Token Reader Tool Adapter.

Loads and parses Design System Color Tokens and Typography Hierarchy from
.mcp/knowledge/tokens.json.
"""

import json
from pathlib import Path
from typing import Any, Dict

PROJECT_ROOT = Path(__file__).resolve().parents[3]


class MCPTokenReaderTool:
    """Tool Adapter reading Project Design Tokens from .mcp/knowledge/tokens.json."""

    def __init__(self):
        """Resolves Target tokens.json File Path."""
        self.token_file = PROJECT_ROOT / ".mcp" / "knowledge" / "tokens.json"

    def execute(self) -> Dict[str, Any]:
        """Reads and parses Design System JSON Tokens.

        Returns:
            Dictionary containing Typography, Color Palette and Spacing Rules.
        """
        if not self.token_file.exists():
            return {
                "error": "tokens.json Not Found",
                "path": str(self.token_file),
            }

        try:
            content = self.token_file.read_text(encoding="utf-8")
            return json.loads(content)
        except Exception as e:
            return {"error": f"Failed to parse tokens.json : {str(e)}"}
