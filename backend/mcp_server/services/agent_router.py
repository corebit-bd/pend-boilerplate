"""Agent Task Router Service.

Implements SKILLS.md Agent Routing Matrix, Dispatches Prompts to Designated Agent
Roles based on Target Files or Keyword Intents and Enforces Documentation Skeleton
and Zero-Placeholder Policies.
"""

import re
from pathlib import Path
from typing import Any, Dict, List, Tuple

PROJECT_ROOT = Path(__file__).resolve().parents[3]


class AgentTaskRouter:
    """Task Routing Engine parsing Prompt Intents and Enforcing Governance Rules."""

    # File-to-Agent Ownership Map derived from SKILLS.md
    FILE_OWNERSHIP_MAP: Dict[str, str] = {
        "02_MARKET_RESEARCH.md": "MarketResearchAgent",
        "03_COMPETITOR_ANALYSIS.md": "MarketResearchAgent",
        "04_USER_PERSONAS_SPECIFICATION.md": "MarketResearchAgent",
        "01_PROJECT_KICKOFF.md": "ProductManagerAgent",
        "05_INITIAL_BACKLOG.md": "ProductManagerAgent",
        "01_POC_OBJECTIVES.md": "ProductManagerAgent",
        "02_POC_SCOPE.md": "ProductManagerAgent",
        "03_CRITICAL_USER_FLOWS.md": "ProductManagerAgent",
        "02_BASIC_SYSTEM_ARCHITECTURE_DESIGN_SPECIFICATION.md": (
            "SystemArchitectAgent"
        ),
        "03_BASIC_TECHNOLOGY_STACK_SPECIFICATION.md": "SystemArchitectAgent",
        "07_INTEGRATION_SCOPE_IDENTIFICATION_DESIGN_SPECIFICATION.md": (
            "SystemArchitectAgent"
        ),
        "13_SCALABILITY_CONSIDERATION_SPECIFICATION.md": "SystemArchitectAgent",
        "06_DATABASE_SCHEMA_DESIGN_SPECIFICATION.md": "DatabaseArchitectAgent",
        "04_MULTIPLE_ENVIRONMENTS_DESIGN_SPECIFICATION.md": "DevOpsInfraAgent",
        "05_BASIC_INFRASTRUCTURE_DESIGN_SPECIFICATION.md": "DevOpsInfraAgent",
        "11_RELEASE_DEPLOYMENT_DESIGN_SPECIFICATION.md": "DevOpsInfraAgent",
        "06_POC_ARCHITECTURE.md": "DevOpsInfraAgent",
        "01_BASIC_STYLE_GUIDE_SPECIFICATION.md": "UIUXDesignAgent",
        "08_SECURITY_REQUIREMENTS_SPECIFICATION.md": "SecurityAndQAAgent",
        "09_QUALITY_ASSURANCE_MANAGEMENT_SPECIFICATION.md": ("SecurityAndQAAgent"),
        "10_LOG_MANAGEMENT_SPECIFICATION.md": "SecurityAndQAAgent",
        "12_OPERATIONAL_MAINTENANCE_SPECIFICATION.md": "SecurityAndQAAgent",
        "04_TECHNICAL_VALIDATION.md": "SecurityAndQAAgent",
        "05_FAKE_DATA_SPECIFICATION.md": "PoCValidationAgent",
        "07_POC_FINDINGS.md": "PoCValidationAgent",
        "08_POC_DECISIONS.md": "PoCValidationAgent",
        "09_STAKEHOLDER_FEEDBACK.md": "PoCValidationAgent",
    }

    def resolve_agent_for_task(
        self, prompt: str, target_file: str = ""
    ) -> Tuple[str, List[str]]:
        """Determines Responsible Agent and Tool Access List for a given Task.

        Args:
            prompt: Raw User Prompt String.
            target_file: Optional Target File Path String.

        Returns:
            Tuple containing assigned Agent Name and list of allowed Tool Identifiers.
        """
        # Rule 1 : Check explicit File Ownership
        if target_file:
            filename = Path(target_file).name
            if filename in self.FILE_OWNERSHIP_MAP:
                agent = self.FILE_OWNERSHIP_MAP[filename]
                return agent, self._get_tools_for_agent(agent)

        # Rule 2 : Fallback Keyword Intent Routing
        prompt_lower = prompt.lower()
        if any(k in prompt_lower for k in ["market", "competitor", "persona", "trend"]):
            return "MarketResearchAgent", self._get_tools_for_agent(
                "MarketResearchAgent"
            )
        elif any(
            k in prompt_lower for k in ["backlog", "user story", "epic", "sprint"]
        ):
            return "ProductManagerAgent", self._get_tools_for_agent(
                "ProductManagerAgent"
            )
        elif any(
            k in prompt_lower for k in ["architecture", "c4", "scalability", "stack"]
        ):
            return "SystemArchitectAgent", self._get_tools_for_agent(
                "SystemArchitectAgent"
            )
        elif any(k in prompt_lower for k in ["schema", "database", "erd", "sql"]):
            return "DatabaseArchitectAgent", self._get_tools_for_agent(
                "DatabaseArchitectAgent"
            )
        elif any(k in prompt_lower for k in ["deploy", "docker", "vps", "cloudflare"]):
            return "DevOpsInfraAgent", self._get_tools_for_agent("DevOpsInfraAgent")
        elif any(k in prompt_lower for k in ["style guide", "token", "ui", "tailwind"]):
            return "UIUXDesignAgent", self._get_tools_for_agent("UIUXDesignAgent")
        elif any(k in prompt_lower for k in ["security", "owasp", "qa", "test", "log"]):
            return "SecurityAndQAAgent", self._get_tools_for_agent("SecurityAndQAAgent")
        elif any(k in prompt_lower for k in ["poc", "findings", "seed", "fake data"]):
            return "PoCValidationAgent", self._get_tools_for_agent("PoCValidationAgent")

        # Default Fallback
        return "SpecificationGeneratorAgent", [
            "file_system_io",
            "pgvector_rag",
        ]

    def _get_tools_for_agent(self, agent_name: str) -> List[str]:
        """Returns Tool Access Taxonomy for Specified Agent from SKILLS.md Matrix.

        Args:
            agent_name: Name of Target Agent.

        Returns:
            List of Tool Identifier Strings.
        """
        tool_matrix = {
            "MarketResearchAgent": ["searxng_search", "file_system_io"],
            "ProductManagerAgent": [
                "searxng_search",
                "pgvector_rag",
                "file_system_io",
            ],
            "SystemArchitectAgent": [
                "searxng_search",
                "pgvector_rag",
                "file_system_io",
            ],
            "DatabaseArchitectAgent": ["pgvector_rag", "file_system_io"],
            "DevOpsInfraAgent": [
                "searxng_search",
                "pgvector_rag",
                "file_system_io",
            ],
            "UIUXDesignAgent": ["mcp_token_reader", "file_system_io"],
            "SecurityAndQAAgent": [
                "searxng_search",
                "pgvector_rag",
                "file_system_io",
                "terminal_exec",
            ],
            "PoCValidationAgent": [
                "searxng_search",
                "pgvector_rag",
                "file_system_io",
            ],
        }
        return tool_matrix.get(agent_name, ["file_system_io"])

    def validate_document_output(
        self, original_content: str, generated_content: str
    ) -> Dict[str, Any]:
        """Enforces Heading Skeleton Preservation and Zero-Placeholder Policy.

        Args:
            original_content: Original Markdown Template Content before editing.
            generated_content: Candidate Markdown Output produced by Agent.

        Returns:
            Dictionary with Validity Status, Detailed Errors and Missing Headings.
        """
        errors = []

        # Enforce Zero Placeholder Policy
        placeholder_matches = re.findall(
            r"\b(TBD|TODO|FIXME|\[\s*\]|N/A)\b",
            generated_content,
            re.IGNORECASE,
        )
        if placeholder_matches:
            errors.append(
                f"Zero Placeholder Violation : Found unresolved Tokens {set(placeholder_matches)}"
            )

        # Enforce Heading Skeleton Adherence
        orig_headings = [
            line.strip()
            for line in original_content.splitlines()
            if line.strip().startswith("## ")
        ]
        gen_headings = [
            line.strip()
            for line in generated_content.splitlines()
            if line.strip().startswith("## ")
        ]

        missing_headings = [h for h in orig_headings if h not in gen_headings]
        if missing_headings:
            errors.append(
                f"Heading Skeleton Violation : Missing required Headings {missing_headings}"
            )

        return {
            "is_valid": len(errors) == 0,
            "errors": errors,
            "missing_headings": missing_headings,
        }
