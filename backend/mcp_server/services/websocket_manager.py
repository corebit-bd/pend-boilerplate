"""WebSocket Connection Manager.

Manages active WebSocket Connections across terminal and filesystem Sessions,
handling Connection Life-Cycle, Payload JSON Serialization and Broadcasts.
"""

from typing import Dict, Set

from fastapi import WebSocket


class ConnectionManager:
    """Thread-Safe Manager for WebSocket Connections."""

    def __init__(self):
        """Initializes Connection Registries for Channels."""
        self.active_connections: Set[WebSocket] = set()
        self.channel_subscribers: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str = "default"):
        """Accepts Incoming Connection and registers Client into Channel.

        Args:
            websocket: FastAPI WebSocket Connection Instance.
            channel: Target Subscription Channel Name.
        """
        await websocket.accept()
        self.active_connections.add(websocket)

        if channel not in self.channel_subscribers:
            self.channel_subscribers[channel] = set()
        self.channel_subscribers[channel].add(websocket)

    def disconnect(self, websocket: WebSocket, channel: str = "default"):
        """Unregisters Client on disconnect.

        Args:
            websocket: FastAPI WebSocket Instance.
            channel: Target Subscription Channel Name.
        """
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

        if channel in self.channel_subscribers:
            self.channel_subscribers[channel].discard(websocket)

    async def send_json(self, websocket: WebSocket, data: dict):
        """Sends JSON Payload to specific WebSocket Connection.

        Args:
            websocket: Target Connection.
            data: Payload dictionary to send.
        """
        await websocket.send_json(data)

    async def broadcast(self, data: dict, channel: str = "default"):
        """Broadcasts JSON Payload to all active Subscribers on Channel.

        Args:
            data: Payload dictionary.
            channel: Subscription Channel Identifier.
        """
        if channel in self.channel_subscribers:
            disconnected = []
            for connection in self.channel_subscribers[channel]:
                try:
                    await connection.send_json(data)
                except Exception:
                    disconnected.append(connection)

            for conn in disconnected:
                self.disconnect(conn, channel=channel)


# Global Singleton Instance
ws_manager = ConnectionManager()
