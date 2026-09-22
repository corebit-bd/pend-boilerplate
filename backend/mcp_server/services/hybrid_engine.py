"""Hybrid Multi-Model Generation Engine.

Wraps Google Gen AI SDK (`google-genai`) using primary model `gemini-3.6-flash`
with automatic fallback handling for resilient agent execution.
"""

import os
from typing import Any, Dict, Optional

from dotenv import load_dotenv
from google import genai

from mcp_server.services.quota_manager import ModelQuotaManager

# Load environment variables from .env file
load_dotenv()


class HybridLLMEngine:
    """Primary LLM Engine supporting Gemini primary execution and fallback routing."""

    def __init__(self):
        """Initializes Google GenAI client and quota manager."""
        self.primary_model = os.getenv("GEMINI_MODEL_NAME", "gemini-3.6-flash")
        self.fallback_model = os.getenv(
            "CLAUDE_MODEL_NAME", "claude-3-5-sonnet-20241022"
        )
        self.quota_manager = ModelQuotaManager()

        # Check for Gemini API key before attempting client initialization
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

        self.genai_available = False
        self.client = None

        if api_key:
            try:
                self.client = genai.Client(api_key=api_key)
                self.genai_available = True
            except Exception as e:
                print(f"[HYBRID ENGINE WARNING] GenAI SDK init error: {e}")
        else:
            print("[HYBRID ENGINE WARNING] GEMINI_API_KEY missing in environment.")

    def generate_response(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        force_fallback: bool = False,
    ) -> Dict[str, Any]:
        """Generates content via Gemini 3.6 Flash, falling back if rate limited.

        Args:
            prompt: User prompt or task description.
            system_instruction: Optional system persona instructions.
            force_fallback: Forces invocation of fallback provider.

        Returns:
            Dictionary containing generated text, model used, and fallback status.
        """
        # Check quota status or forced fallback
        if self.quota_manager.is_rate_limited() or force_fallback:
            return self._execute_fallback(
                prompt, system_instruction, reason="Rate limit reached or forced"
            )

        if not self.genai_available or not self.client:
            return self._execute_fallback(
                prompt, system_instruction, reason="GenAI Client unavailable"
            )

        try:
            config = {}
            if system_instruction:
                config["system_instruction"] = system_instruction

            response = self.client.models.generate_content(
                model=self.primary_model,
                contents=prompt,
                config=config if config else None,
            )

            # Record estimated token usage in Quota Manager
            prompt_tokens = len(prompt) // 4
            completion_tokens = len(response.text) // 4
            self.quota_manager.record_usage(prompt_tokens, completion_tokens)

            return {
                "text": response.text,
                "model": self.primary_model,
                "fallback_used": False,
            }

        except Exception as e:
            print(
                f"[HYBRID ENGINE ERROR] Primary model failed: {e}. Triggering fallback."
            )
            self.quota_manager.set_fallback_state(True)
            return self._execute_fallback(prompt, system_instruction, reason=str(e))

    def _execute_fallback(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        reason: str = "",
    ) -> Dict[str, Any]:
        """Executes secondary fallback provider generation.

        Args:
            prompt: User prompt string.
            system_instruction: Optional system instruction.
            reason: Explanation trigger for fallback execution.

        Returns:
            Dictionary containing text, model, and fallback flag.
        """
        anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

        if anthropic_api_key:
            try:
                import anthropic

                claude_client = anthropic.Anthropic(api_key=anthropic_api_key)
                messages = [{"role": "user", "content": prompt}]
                kwargs = {
                    "model": self.fallback_model,
                    "max_tokens": 4096,
                    "messages": messages,
                }
                if system_instruction:
                    kwargs["system"] = system_instruction

                resp = claude_client.messages.create(**kwargs)
                return {
                    "text": resp.content[0].text,
                    "model": self.fallback_model,
                    "fallback_used": True,
                    "fallback_reason": reason,
                }
            except Exception as e:
                print(f"[FALLBACK ERROR] Claude execution failed: {e}")

        # Deterministic offline fallback response
        return {
            "text": (
                f"[OFFLINE HYBRID ENGINE FALLBACK]\n"
                f"Primary model ({self.primary_model}) and Claude fallback were unavailable.\n"
                f"Trigger Reason: {reason}\n\n"
                f"Task Prompt Acknowledged: {prompt[:100]}..."
            ),
            "model": "local-fallback-engine",
            "fallback_used": True,
            "fallback_reason": reason,
        }
