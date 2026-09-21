"""Web Terminal PTY Bridge Router.

Spawns an interactive local shell session (bash/zsh) via Python pseudo-terminal
(PTY) and pipes raw terminal input/output over WebSockets.
"""

import asyncio
import os
import pty
import select

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(tags=["terminal"])


@router.websocket("/ws/terminal")
async def websocket_terminal(websocket: WebSocket):
    """WebSocket endpoint binding browser xterm.js sessions to local shell PTY.

    Args:
        websocket: Active FastAPI WebSocket connection instance.
    """
    await websocket.accept()

    master_fd, slave_fd = pty.openpty()
    shell = os.environ.get("SHELL", "/bin/bash")

    pid = os.fork()
    if pid == 0:
        # Child Process : Duplicate Slave File Descriptors to Standard Streams
        os.setsid()
        os.dup2(slave_fd, 0)
        os.dup2(slave_fd, 1)
        os.dup2(slave_fd, 2)
        os.close(master_fd)
        os.close(slave_fd)
        os.execv(shell, [shell])
    else:
        # Parent Process : Bridge Master PTY Stream with WebSocket Messages
        os.close(slave_fd)

        async def read_from_pty():
            """Asynchronously reads data chunks from PTY master and sends to WebSocket."""
            while True:
                await asyncio.sleep(0.01)
                r, _, _ = select.select([master_fd], [], [], 0)
                if r:
                    output = os.read(master_fd, 1024)
                    if output:
                        await websocket.send_text(
                            output.decode("utf-8", errors="replace")
                        )
                    else:
                        break

        read_task = asyncio.create_task(read_from_pty())

        try:
            while True:
                data = await websocket.receive_text()
                os.write(master_fd, data.encode("utf-8"))
        except WebSocketDisconnect:
            read_task.cancel()
            os.close(master_fd)
            os.kill(pid, 9)
