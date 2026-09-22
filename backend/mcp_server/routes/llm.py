"""LLM Generation & Quota Monitoring REST Router.

Exposes Endpoints for Prompt Completion, Hybrid Model Fallback Testing
and Real-time Token Quota Inspection.
"""

from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

from mcp_server.services.hybrid_engine import HybridLLMEngine

router = APIRouter(prefix="/api/llm", tags=["llm"])
llm_engine = HybridLLMEngine()


class GenerateRequest(BaseModel):
    """Schema for Content Generation Requests.

    Attributes:
        prompt: Task Instruction or Context Text.
        system_instruction: Optional Persona Definition or Constraints.
        force_fallback: Optional Flag forcing Secondary Model Usage.
    """

    prompt: str
    system_instruction: Optional[str] = None
    force_fallback: Optional[bool] = False


class GenerateResponse(BaseModel):
    """Schema for Content Generation Responses.

    Attributes:
        text: Model Output Response Text.
        model: Identifier of Model that generated the Output.
        fallback_used: Boolean indicating if Failover occurred.
    """

    text: str
    model: str
    fallback_used: bool


@router.post("/generate", response_model=GenerateResponse)
async def generate_llm_content(req: GenerateRequest):
    """Generates LLM Text Response using Gemini 3.6 Flash or Claude Fallback.

    Args:
        req: GenerateRequest Payload.

    Returns:
        GenerateResponse Payload containing Text, Model and Fallback State.
    """
    result = llm_engine.generate_response(
        prompt=req.prompt,
        system_instruction=req.system_instruction,
        force_fallback=req.force_fallback or False,
    )
    return GenerateResponse(
        text=result["text"],
        model=result["model"],
        fallback_used=result["fallback_used"],
    )


@router.get("/quota")
async def get_quota_status():
    """Returns current Rate Limit, Requests Per Minute and Token Consumption Status.

    Returns:
        Dictionary with Quota Metrics from ModelQuotaManager.
    """
    return llm_engine.quota_manager.get_status()
