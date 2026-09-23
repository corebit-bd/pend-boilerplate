"""Workspace File System Change Streaming WebSocket Router.

Streams live File System Updates (Tree Changes, File Saving) to Subscribers.
"""

import asyncio
import os

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from mcp_server.services.websocket_manager import ws_manager

router = APIRouter(prefix="/ws", tags=["websockets"])

PROJECT_ROOT = os.path.abspath(os.getenv("WORKSPACE_ROOT", os.path.dirname(__file__)))


def get_dir_tree(path: str, depth: int = 2) -> dict:
    """Helper constructing lightweight Directory Structure dictionary.

    Args:
        path: Target Root Directory.
        depth: Maximum Recursion Level.

    Returns:
        Structured dictionary of Files and Folders.
    """
    if depth < 0 or not os.path.exists(path):
        return {}

    node = {"name": os.path.basename(path), "type": "directory", "children": []}

    try:
        entries = os.scandir(path)
        for entry in entries:
            if entry.name.startswith((".", "node_modules", "venv", "__pycache__")):
                continue
            if entry.is_dir(follow_symlinks=False):
                if depth > 0:
                    node["children"].append(get_dir_tree(entry.path, depth - 1))
            else:
                node["children"].append({"name": entry.name, "type": "file"})
    except PermissionError:
        pass

    return node


@router.websocket("/filesystem")
async def filesystem_websocket_endpoint(websocket: WebSocket):
    """Streams Live Directory Structure Updates to Web UI.

    Args:
        websocket: Subscribed WebSocket Client Connection.
    """
    await ws_manager.connect(websocket, channel="filesystem")
    try:
        # Send initial Workspace Snapshot Frame
        initial_tree = get_dir_tree(PROJECT_ROOT)
        await ws_manager.send_json(
            websocket,
            {"type": "workspace_snapshot", "data": initial_tree},
        )

        # Heartbeat / Sync Loop
        while True:
            await asyncio.sleep(10)
            tree_snapshot = get_dir_tree(PROJECT_ROOT)
            await ws_manager.send_json(
                websocket,
                {"type": "workspace_sync", "data": tree_snapshot},
            )

    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel="filesystem")
