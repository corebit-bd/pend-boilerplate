# AGENTS.md - PEND Boilerplate AI Guidelines

## Active AI Agent Roster

1. **SpecificationGeneratorAgent** - Handles administrative prompt generation and specification document creation.
2. **CodebaseWatcherAgent** - Watches local creation events, generates unit tests/Storybook specifications and runs local self-healing execution loops.
3. **PRReviewerAgent** - Analyzes Dependabot PRs in CI and writes structured AI approval reviews.
4. **DocumentationMaintainerAgent** - Keeps system documentation, READMEs and `AGENTS.md` guidelines synchronized upon package updates.

---

## Core Technology Stack Rules

- **Frontend** : Next.js (App Router), TypeScript, Tailwind CSS. Inspect `frontend/package.json` for active dependency versions. Build custom UI components from scratch (do NOT use external UI component libraries like shadcn/ui).
- **Backend** : Django, Django REST Framework, PostgreSQL. Inspect `backend/requirements.txt` or `backend/pyproject.toml` for active package versions.
- **Mobile** : Expo, React Native. Inspect `mobile/package.json` for active package versions.

---

## Model Configuration Standards

- **Primary API Engine** : Google Gen AI Python SDK (`google-genai`)
- **Default Model Alias** : `gemini-3.7-flash` (Overridable via `GEMINI_MODEL_NAME` environment variable)

---

## Operational Guardrails

1. **AITDDLC Execution** : CodebaseWatcherAgent must always write or update unit test files (`pytest` or `Jest`) when new functional code files are added.
2. **Self-Healing Execution** : Intercept terminal failure outputs and feed stack traces back to Gemini until tests pass 100%.
3. **Source of Truth** : Treat package configuration files (`frontend/package.json`, `backend/requirements.txt`, `backend/pyproject.toml`, `mobile/package.json`) as the true source of truth for version guidelines.