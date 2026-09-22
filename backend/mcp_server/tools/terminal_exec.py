"""Terminal Execution Tool Adapter.

Executes Test Runner Suites (pytest, npm test) in Isolated Subprocesses and Captures
stdout/stderr Traces for AITDDLC Auto-Healing.
"""

import subprocess
from pathlib import Path
from typing import Any, Dict

PROJECT_ROOT = Path(__file__).resolve().parents[3]


class TerminalExecTool:
    """Tool Adapter running pytest and npm test Suites in Workspace Shell."""

    def run_tests(self, command: str) -> Dict[str, Any]:
        """Executes Test Command in Shell and captures Return Code and Error Output.

        Args:
            command: Shell Test Command String (e.g. 'pytest', 'npm test').

        Returns:
            Dictionary containing returncode, stdout, stderr and success Status.
        """
        allowed_prefixes = ("pytest", "npm test", "npm run test", "jest")
        if not any(command.startswith(p) for p in allowed_prefixes):
            return {
                "error": "Security Restriction : Command must be a valid Test Runner",
                "command": command,
            }

        try:
            process = subprocess.run(
                command,
                shell=True,
                cwd=str(PROJECT_ROOT),
                capture_output=True,
                text=True,
                timeout=60,
            )
            return {
                "command": command,
                "returncode": process.returncode,
                "stdout": process.stdout,
                "stderr": process.stderr,
                "success": process.returncode == 0,
            }
        except subprocess.TimeoutExpired:
            return {"error": "Execution Timed Out after 60 seconds"}
        except Exception as e:
            return {"error": f"Execution Failed : {str(e)}"}
