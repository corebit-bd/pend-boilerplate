# AGENTS.md - PEND Boilerplate AI Guidelines

## Active AI Agent Roster

1. **SpecificationGeneratorAgent** - Handles administrative prompt generation and specification document creation.
2. **CodebaseWatcherAgent** - Watches local creation events, generates unit tests/Storybook specifications and runs local self-healing execution loops.
3. **DocumentationMaintainerAgent** - Keeps system documentation, READMEs and `AGENTS.md` guidelines synchronized upon package updates.

---

## Core Technology Stack Rules

- **Frontend** : Next.js (App Router), TypeScript, Tailwind CSS. Inspect `frontend/package.json` for active dependency versions. Build custom UI components from scratch (do NOT use external UI component libraries like shadcn/ui).
- **Backend** : Django, Django REST Framework, PostgreSQL. Inspect `backend/requirements.txt` or `backend/pyproject.toml` for active package versions.
- **Mobile** : Expo, React Native. Inspect `mobile/package.json` for active package versions.

---

## Model Configuration Standards

- **Primary API Engine** : Google Gen AI Python SDK (`google-genai`)
- **Default Model Alias** : `gemini-3.6-flash` (Overridable via `GEMINI_MODEL_NAME` environment variable)

---

## Operational Guardrails

1. **AITDDLC Execution** : CodebaseWatcherAgent must always write or update unit test files (`pytest` or `Jest`) when new functional code files are added.
2. **Self-Healing Execution** : Intercept terminal failure outputs and feed stack traces back to Gemini until tests pass 100%.
3. **Source of Truth** : Treat package configuration files (`frontend/package.json`, `backend/requirements.txt`, `backend/pyproject.toml`, `mobile/package.json`) as the true source of truth for version guidelines.

---

## Specification Document & Diagram Guidelines

When generating, updating, or populating documentation files under:
- `documentation/01_user-requirements-specifications/`
- `documentation/02-design-specifications/`

**Mandatory Diagram Rules** : 

- Every specification document MUST include appropriate visual diagrams using **Mermaid syntax** (` ```mermaid `).
- Do NOT use static images, ASCII art, or external non-code diagram formats.
- Supported and encouraged Mermaid diagram types depending on the specification context:
  - **Flowcharts** (Process flows, execution logic, user journeys)
  - **Class Diagrams** (Domain models, component hierarchies)
  - **Sequence Diagrams** (API request/response flows, authentication, service interactions)
  - **Entity Relationship Diagrams (ERD)** (Database schema design)
  - **State Diagrams** (Lifecycle states, order/task processes)
  - **Mindmaps** (Feature mapping, backlog taxonomy)
  - **Architecture / Block / C4 Diagrams** (System boundaries, infrastructure, container views)
  - **Cynefin Framework Diagrams** (Domain problem evaluation)