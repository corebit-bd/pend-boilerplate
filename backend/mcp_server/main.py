"""Primary Local Workspace Server Application Entrypoint.

Mounts the isolated IDE Workspace sub-application at /ide-workspace route prefix
and configures global CORS policy for NextJS frontend communication.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from mcp_server.routes import filesystem, terminal

# Root FastAPI Server Instance
app = FastAPI(title="PEND Primary Local Server")

# Isolated IDE Workspace sub-application mounted under /ide-workspace
ide_app = FastAPI(
    title="PEND Local Workspace IDE Engine",
    version="1.0.0",
    root_path="/ide-workspace",
)

# Enable CORS Mmiddleware specifically targeting NextJS frontend Development Server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include subpath route modules into ide_app sub-application
ide_app.include_router(filesystem.router)
ide_app.include_router(terminal.router)


@ide_app.get("/api/health")
async def ide_health_check():
    """Health Check Endpoint for IDE Workspace sub-application.

    Returns:
        Dictionary confirming server status, mounted subpath and engine type.
    """
    return {
        "status": "online",
        "subpath": "/ide-workspace",
        "engine": "FastAPI/Python Workspace Server",
    }


# Mount isolated IDE sub-application
app.mount("/ide-workspace", ide_app)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)