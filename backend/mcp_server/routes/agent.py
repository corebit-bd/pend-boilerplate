"""Agent Task Dispatch REST Router.

Exposes Endpoints for dispatching Tasks to Agents, querying Agent Task Router
and retrieving Tool Access Permissions.
"""

from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

from mcp_server.services.agent_router import AgentTaskRouter

router = APIRouter(prefix="/api/agent", tags=["agent"])
agent_router_service = AgentTaskRouter()


class TaskDispatchRequest(BaseModel):
    """Schema for Task Dispatch Requests.

    Attributes:
        prompt: User Prompt or Task Instruction.
        target_file: Optional Target File Path relative to Workspace Root.
    """

    prompt: str
    target_file: Optional[str] = ""


class TaskDispatchResponse(BaseModel):
    """Schema for Task Routing Response.

    Attributes:
        assigned_agent: Name of assigned Agent.
        allowed_tools: List of Tool Identifiers granted to Agent.
        status: Operation Status Message.
    """

    assigned_agent: str
    allowed_tools: List[str] = []
    status: str


@router.post("/dispatch", response_model=TaskDispatchResponse)
async def dispatch_task(req: TaskDispatchRequest):
    """Routes Incoming Prompt to assigned Agent based on File Ownership and Intent.

    Args:
        req: TaskDispatchRequest Payload containing Prompt and Optional Target File.

    Returns:
        TaskDispatchResponse with assigned Agent and allowed Tools.
    """
    agent_name, tools = agent_router_service.resolve_agent_for_task(
        prompt=req.prompt, target_file=req.target_file or ""
    )
    return TaskDispatchResponse(
        assigned_agent=agent_name,
        allowed_tools=tools,
        status="task_routed_successfully",
    )


@router.get("/status")
async def get_agent_status():
    """Retrieves Active Agent Routing Engine Status and Available Tool List.

    Returns:
        Dictionary detailing Active Router Configuration.
    """
    return {
        "status": "ready",
        "router": "AgentTaskRouter (SKILLS.md Compliant)",
        "active_agents_count": 8,
    }
