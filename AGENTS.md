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

## Code Documentation Standards

- **Python (Backend / MCP Engine & Tests)** : Every Python module, class, function, API route and test module (`tests.py`, `test_*.py`) MUST use Python docstrings (`"""Docstring comment..."""`) describing purpose, parameters, return types, test scenarios and expected assertions.
- **Next.js / TypeScript (Frontend / Web IDE UI, Tests & Storybook)** : Every React component, custom hook, utility function, API client method, unit test (`*.test.tsx`, `*.spec.ts`) and Storybook story (`*.stories.tsx`) MUST use TypeDoc comments (`/** TypeDoc comment... */`) specifying props, types, behavior, test cases and story state variations.

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
- `documentation/02_design-specifications/`
- `documentation/03_poc-validation/`

### Mandatory Document Structure & Skeleton Rules**

- **Strict Heading Skeleton Adherence** :  Never delete, rename or reorder the existing `##` sub-headings in the specification Markdown files. 
- **Upstream Context Synthesis** : Populate each section in `02_design-specifications/` and `03_poc-validation/` by synthesizing user requirements, personas & backlog items defined in `documentation/01_user-requirements-specifications/`.
- **Zero Placeholder Policy** : Every sub-heading MUST contain fully articulated specifications, data tables or Mermaid diagrams. Do NOT leave sections empty, incomplete or marked as "TBD".

### Mandatory Formatting & Documentation Density Rules

- **Brevity & Conciseness** : Keep all specification documents lean and actionable. Write high-level, bulleted summaries instead of lengthy prose.
- **Visual & Structural Clarity** : Favor structured tables, bullet points, and explicit Mermaid diagrams over dense paragraphs for describing components, schemas, data models, and user flows.
- **Mandatory Visual Diagrams** : Every specification document MUST include appropriate visual diagrams using **Mermaid syntax** (` ```mermaid `). Do NOT use static images, ASCII art, or external non-code diagram formats.
- **Supported Mermaid Types** : 
  - **Flowcharts** (Process flows, execution logic, user journeys)
  - **Class Diagrams** (Domain models, component hierarchies)
  - **Sequence Diagrams** (API request / response flows, authentication / authorization, service interactions)
  - **Entity Relationship Diagrams (ERD)** (Database schema design)
  - **State Diagrams** (Lifecycle states, order/task processes)
  - **Mindmaps** (Feature mapping, backlog taxonomy)
  - **Architecture / Block / C4 Diagrams** (System boundaries, infrastructure, container views)
  - **Cynefin Framework Diagrams** (Domain problem evaluation)