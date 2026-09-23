"""Interactive Terminal Streaming WebSocket Router.

Spawns Asynchronous Subprocesses and streams stdout/stderr output line-by-line
to connected Clients over WebSockets for real-time Terminal Execution.
"""

import asyncio
import json
import os

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from mcp_server.services.websocket_manager import ws_manager

router = APIRouter(prefix="/ws", tags=["websockets"])

PROJECT_ROOT = os.path.abspath(os.getenv("WORKSPACE_ROOT", os.path.dirname(__file__)))


@router.websocket("/terminal")
async def terminal_websocket_endpoint(websocket: WebSocket):
    """Handles real-time Command Execution Streaming over WebSocket.

    Args:
        websocket: Subscribed WebSocket Client Connection.
    """
    await ws_manager.connect(websocket, channel="terminal")
    try:
        while True:
            raw_data = await websocket.receive_text()
            try:
                data = json.loads(raw_data)
                command = data.get("command")
            except json.JSONDecodeError:
                command = raw_data

            if not command:
                continue

            # Stream Start Frame
            await ws_manager.send_json(
                websocket,
                {"type": "start", "command": command, "status": "running"},
            )

            # Spawn Asynchronous Subprocess
            process = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=PROJECT_ROOT,
            )

            # Stream stdout line-by-line
            async def stream_output(stream, stream_type):
                while True:
                    line = await stream.readline()
                    if not line:
                        break
                    await ws_manager.send_json(
                        websocket,
                        {
                            "type": "output",
                            "stream": stream_type,
                            "data": line.decode("utf-8", errors="replace"),
                        },
                    )

            await asyncio.gather(
                stream_output(process.stdout, "stdout"),
                stream_output(process.stderr, "stderr"),
            )

            return_code = await process.wait()

            # Stream Completion Frame
            await ws_manager.send_json(
                websocket,
                {
                    "type": "exit",
                    "command": command,
                    "return_code": return_code,
                    "status": "completed" if return_code == 0 else "failed",
                },
            )

    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel="terminal")
