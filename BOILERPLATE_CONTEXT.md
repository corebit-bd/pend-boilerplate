# PEND Boilerplate - Context Preservation Document

## 📋 Project Overview

- **Project Name** : pend-boilerplate
- **Purpose** : Full-Stack Boilerplate Using PostgreSQL-Expo-NextJS-Django Stack
- **Architecture** : Headless, Multi-Tenant, MicroServices Event-Driven
- **Current Status** : ✅ COMPLETE - All 12 Steps Finished
- **Version** : 1.0.3
- **Last Updated** : February 06, 2026

## 🗂️ Tech Stack

### Backend

- `Django >=5.2,<6.1` with Django REST Framework 3.16
- FastAPI 0.119 for Edge Services
- GraphQL via `Graphene-Django 3.2.3`
- JWT Authentication with RSA256 (`djangorestframework-simplejwt 5.5.1`)
- Celery 5.5.3 for Background Tasks
- Redis 8.2 for Caching & Task Queue
- Gunicorn >=23.0.0,<26.0 + Whitenoise 6.11 for Production

### Frontend

- NextJS 16 with TypeScript & App Router
- Tailwind CSS v4.2 (PostCSS-Based, No Configuration File)
- Redux Toolkit for State Management
- Zod for Validation
- React Hook Form for Forms
- Storybook 10.2.10 for Component Documentation
- Jest with 99.78% Test Coverage (156 Tests)

### Mobile

- React Native with Expo ~49.0.15
- Native Navigation & Components

### Database

- PostgreSQL 15 with Docker
- Custom Schemas : `auth`, `tenant`, `audit`
- Audit Logging with Triggers
- Multiple User Roles for Security

### DevOps

- Docker & Docker Compose for Containerization
- GitHub Actions for CI / CD
- Multi-Stage Dockerfiles (`Debian-slim`)
- Automated Testing & Deployment

### CI / CD & Infrastructure

- GitHub Actions with **Layered Caching Strategy** (Storage Optimized)
- Automated Security, Dependency & Secret Scanning
- Multi-Environment Deployment (Development, Staging, Production)

### Testing

- Backend : `pytest ≥8.4.2,<10`, `pytest-django 4.11.1`
- Frontend : Jest, `@testing-library/react` (99.78% Coverage)
- Code Quality : Black, Flake8, `isort`, ESLint

## ✅ All Steps Completed (1-12)

### Step 1 : Root Project Structure ✅

```
pend-boilerplate/
├── .github/workflows/
├── database/
│   ├── init/
│   ├── migrations/
│   └── backups/
├── documentation/
│   ├── api/
│   ├── ci-cd/
│   ├── user-manual/pages/
│   └── technical-manual/pages/
├── scripts/
└── tests/
    ├── integration/
    ├── e2e/
    └── load/
```

### Step 2 : Root Configuration Files ✅

- ✅ `.gitignore` (Comprehensive Exclusions)
- ✅ `README.md` (Project Overview + CI / CD Section)
- ✅ `docker-compose.yaml` (All Services Configured)
- ✅ `.env.example` (Environment Template)
- ✅ Initial Git Commit Completed

### Step 3: Environment Branches ✅

- ✅ Branches : `main`, `devEnv`, `stagingEnv`, `prodEnv`
- ✅ Git Workflow : `main` → `devEnv` → `stagingEnv` → `prodEnv`

![Developer Workflow](developer-workflow.png)

### Step 4 : Backend Foundation (Django) ✅

- ✅ Virtual Environment Created
- ✅ `requirements.txt` & `requirements-dev.txt`
- ✅ Django Project Created
- ✅ Django Applications : `authentication`, `users`, `tenants`
- ✅ `backend/.env.example`
- ✅ `backend/Dockerfile` (Python 3.13-slim)
- ✅ `backend/.dockerignore`
- ✅ `backend/README.md`

### Step 5 : Configure Django Settings Structure ✅

- ✅ `core/settings/` Directory
- ✅ `base.py`, `development.py`, `staging.py`, `production.py`
- ✅ `logs/` Directory with `.gitkeep`
- ✅ Environment-Specific Configuration

### Step 6 : Setup Frontend Foundation (NextJS) ✅

- ✅ NextJS 16 Application Created
- ✅ Production & Development Dependencies Installed
- ✅ PEND-Specific Directory Structure
- ✅ `.env.local.example`
- ✅ `next.config.ts` with API Rewrites & Standalone Output
- ✅ `globals.css` with Figma Design System
- ✅ Open Sans Font Configured
- ✅ `frontend/Dockerfile` (Node 24-slim, Multi-Stage)
- ✅ `frontend/.dockerignore`
- ✅ `frontend/README.md`

### Step 7 : Setup Mobile Application Foundation (Expo) ✅

- ✅ Expo Application Created
- ✅ Dependencies Installed
- ✅ PEND-Specific Directory Structure
- ✅ `.env.example`
- ✅ `App.tsx` with PEND Branding

### Step 8 : Create Frontend Core Files ✅

- ✅ Redux Store Setup with Typed Hooks
- ✅ Auth Slice & User Slice
- ✅ Type Definitions
- ✅ API Client with Axios
- ✅ Validation Schemas (Zod)
- ✅ Utility Helpers
- ✅ Redux Provider Integration

### Step 9 : Create UI Components with Tests ✅

- ✅ 5 UI Components : Button, Input, Badge, Spinner, Icon
- ✅ 156 Comprehensive Tests (99.78% Coverage)
- ✅ `className` Utility (`cn.ts`)
- ✅ Jest Configuration

### Step 10 : Create Storybook Stories ✅

- ✅ Storybook 10.2.10 Configured
- ✅ 83 Comprehensive Stories across 5 Components
- ✅ `Icon.README.md` with Integration Guide

### Step 11 : Database Setup an&d Scripts ✅

- ✅ PostgreSQL Initialization Scripts
  - `01-init-database.sql`
  - `02-create-users.sql`
- ✅ Automation Scripts
  - `scripts/setup.sh`
  - `scripts/dev-start.sh`
  - `scripts/build.sh` (with Docker Cleanup)
- ✅ Database Documentation
- ✅ Scripts Documentation

### Step 12 : Documentation, CI / CD, Finalize ✅

- ✅ GitHub Actions CI / CD Pipeline
  - `.github/workflows/ci.yml` - Hybrid Testing Strategy (Cost-Optimized)
  - `.github/workflows/cd.yml` - Automated Deployments
  - Upgrade Validation for Special Branches
- ✅ Pull Request Template
  - `.github/PULL_REQUEST_TEMPLATE.md` - With Branch Naming Convention
- ✅ CI / CD Documentation (Complete Suite)
  - `documentation/ci-cd/README.md` - Overview & Quick Start
  - `documentation/ci-cd/GITHUB_SECRETS_SETUP.md` - Secrets Configuration Guide
  - `documentation/ci-cd/STRATEGY.md` - Testing Strategy & Git Workflow
  - `documentation/ci-cd/TROUBLESHOOTING.md` - Common Issues & Solutions
  - `documentation/ci-cd/UPGRADE_GUIDE.md` - Major Version Upgrade Procedures
- ✅ `CHANGELOG.md` - v1.0.0 Release Notes
- ✅ `CONTRIBUTING.md` - Comprehensive Scaffolding-Ready Guide
- ✅ `README.md` - Updated with Branch Protection & Scaffolding Information
- ✅ Context Document Updated

**Status** : ✅ COMPLETE - Production Ready & Scaffolding Ready

## 🔧 Key Fixes Applied

### Docker Build Issues (Resolved)

1. **LightningCSS Error** : Migrated from Alpine to Debian-Slim
2. **Large Build Context** : Added `.dockerignore` Files (64MB → 2.5MB)
3. **I / O Errors** : Reduced Build Context by 96%
4. **Environment Variables Undefined** : Added Default Values in `next.config.ts`
5. **Disk Space Issues** : Implemented Automatic Docker Cleanup

### Performance Improvements

- Build Time : 8-10 Minutes → 2-3 Minutes
- Build Context : 64MB → 2.5MB
- Final Images : Backend ~400MB, Frontend ~350MB
- Test Coverage : 99.78% on UI Components

## 📊 Project Statistics

### Code Quality

- **UI Components** : 5 Components (Button, Input, Badge, Spinner, Icon)
- **Tests** : 156 Comprehensive Tests
- **Test Coverage** : 99.78% on UI Components
- **Storybook Stories** : 83 Interactive Stories
- **Type Safety** : 100% TypeScript
- **Database Scripts** : 2 Initialization Scripts + 3 Automation Scripts

### Lines of Code (LOC) (Estimated)

- Backend : ~2,500 Lines
- Frontend : ~4,000 Lines
- Mobile : ~500 Lines
- Database : ~400 Lines
- Scripts : ~800 Lines
- Documentation : ~6,500 Lines (Including Comprehensive `CONTRIBUTING.md`)
- CI / CD : ~1,200 Lines
- **Total** : ~16,900 Lines

### Documentation Files

- `README.md` (root) - Comprehensive with Scaffolding Guide
- `CONTRIBUTING.md` - Complete Scaffolding-Ready Contribution Guide
- `backend/README.md`
- `frontend/README.md`
- `database/init/README.md`
- `scripts/README.md`
- `documentation/ci-cd/README.md`
- `documentation/ci-cd/GITHUB_SECRETS_SETUP.md`
- `documentation/ci-cd/STRATEGY.md`
- `documentation/ci-cd/TROUBLESHOOTING.md`
- `documentation/ci-cd/UPGRADE_GUIDE.md`
- `CHANGELOG.md`
- `PULL_REQUEST_TEMPLATE.md`
- `Icon.README.md`

## 📝 Key Requirements & Decisions

### Dependencies (Latest Stable Versions)

**Production (`requirements.txt`)** :

- `Django` 5.2.x (LTS)
- `djangorestframework` 3.16.x
- `psycopg2-binary` 2.9.11+
- `djangorestframework-simplejwt` 5.5.1+ (RSA256)
- `graphene-django` 3.2.3+
- `fastapi` 0.119.0+
- `celery` 5.5.3+
- `redis` >=5.3.0,<8.0
- `gunicorn` >=23.0.0,<26.0
- `whitenoise` 6.11+

**Development (`requirements-dev.txt`)** :

- `pytest` ≥8.4.2,<10
- `pytest-django` 4.11.1+
- `black` 26.1.0+
- `flake8` 7.3.0+
- `isort` >=6.1.0,<9.0

### Architecture Decisions

1. **Multi-Tenant** : Tenant Isolation at Application Level
2. **Headless CMS** : Backend APIs Consumed by Multiple Frontends
3. **Event-Driven** : Celery + Redis for Asynchronous Operations
4. **MicroServices** : FastAPI for Edge Services
5. **API-First** : GraphQL + REST for Flexible Data Access
6. **JWT with RSA256** : Secure Token-Based Authentication
7. **Icon Library Agnostic** : Flexible Integration
8. **Database Schemas** : Separate Schemas for `auth`, `tenant`, `audit`
9. **Audit Logging** : Automatic Change Tracking
10. **Multi-Stage Builds** : Debian-Slim for Reliability
11. **Automated Cleanup** : Prevents Disk Space Issues
12. **Cost-Optimized CI / CD** : Hybrid Testing Strategy (~$0 / Month)
13. **Scaffolding-Ready** : Template Configuration for New Projects

### Branch Naming Convention (13 Tags)

All Development Branches follow : `[tag]/[username]/[story-id]`

#### Available Tags

| Tag              | Purpose                                               | Example                                   |
| ---------------- | ----------------------------------------------------- | ----------------------------------------- |
| `feature/`       | New Features / Enhancements                           | `feature/jzhk/user-authentication-123`    |
| `fix/`           | Bug / Error Fixes                                     | `fix/ijs/login-error-456`                 |
| `documentation/` | Documentation Addition / Changes                      | `documentation/smd/api-documentation-789` |
| `style/`         | UI / UX Design Styles Addition / Changes              | `style/jzhk/button-design-231`            |
| `refactor/`      | Code Refactoring - No Behavior Change                 | `refactor/ijs/cleanup-utils-321`          |
| `data/`          | Data Manipulation / Information Addition / Changes    | `data/jk/posts-timestamp-111`             |
| `test/`          | Adding / Fixing / Updating Tests                      | `test/jzhk/unit-tests-654`                |
| `chore/`         | Build Scripts, Dependencies, Configuration            | `chore/smd/update-dependencies-987`       |
| `cicd/`          | Addition / Changes to CI / CD Configuration / Scripts | `cicd/smd/setup-cicd-432`                 |
| `performance/`   | Performance Improvements / Optimization Changes       | `performance/jzhk/fast-reload-999`        |
| `devEx/`         | Developers' Experience Improvements                   | `devEx/jzhk/kiss-principle-342`           |
| `revert/`        | Undoing Changes from Previous Commit                  | `revert/ijs/fix-commit-289`               |
| `miscellaneous/` | Anything not Falling into Previous Tags               | `miscellaneous/smd/others-misc-752`       |

### Git Workflow

#### Branch Structure

```
Regular Development Branches (13 Tags):
├── feature/[username]/[story-id]       # New Features
├── fix/[username]/[story-id]           # Bug Fixes
├── documentation/[username]/[story-id] # Documentation
├── style/[username]/[story-id]         # UI / UX Changes
├── refactor/[username]/[story-id]      # Code Refactoring
├── data/[username]/[story-id]          # Data Manipulation
├── test/[username]/[story-id]          # Test Updates
├── chore/[username]/[story-id]         # Build / Configuration
├── cicd/[username]/[story-id]          # CI / CD Changes
├── performance/[username]/[story-id]   # Performance
├── devEx/[username]/[story-id]         # Developers' Experience
├── revert/[username]/[story-id]        # Revert Commits
└── miscellaneous/[username]/[story-id] # Other Changes

Special Maintenance Branches :

├── backup/pre-[update]-[YYYYMMDD]    # Pre-Upgrade Snapshots
│   ├── backup/pre-django5-20241218
│   ├── backup/pre-nextjs16-20241220
│   └── backup/pre-postgres16-20241225
│
└── chore/upgrade/[component]           # Major Upgrades
    ├── chore/upgrade/backend           # Django, Python
    ├── chore/upgrade/frontend          # NextJS, ReactJS
    ├── chore/upgrade/mobile            # Expo, React Native
    └── chore/upgrade/database          # PostgreSQL

Environment Branches :

├── main                                # Stable Integration
├── devEnv                              # Development Server
├── stagingEnv                          # QA Server
└── prodEnv                             # Production Server
```

#### Git Flow

**Feature Development** :

```
[tag]/[username]/[story-id]
    ↓ (PR to main with CI Checks)
  main → CI : Full Tests ✅
    ↓ (Environment Promotion)
  devEnv → CD : Deploy 🚀
    ↓
  stagingEnv → CD : Deploy 🚀
    ↓
  prodEnv → CD : Deploy 🚀
```

![Developer Workflow](developer-workflow.png)

**Major Upgrades** :

```
1. Create backup/pre-[update]-[YYYYMMDD](⚠️ REQUIRED!)
2. Create chore/upgrade/[component]
3. PR to main with Upgrade Validation
4. Enhanced Testing Period (2+ Days devEnv, 1+ Week stagingEnv)
5. Deploy to devEnv → stagingEnv → prodEnv
```

#### Conventional Commits

```
<type> (<scope>) : <description>

[optional body]

[optional footer]
```

**Types Map to Branch Tags** :

- `feature` → `feature/`
- `fix` → `fix/`
- `documentation` → `documentation/`
- `style` → `style/`
- `refactor` → `refactor/`
- `performance` → `performance/`
- `test` → `test/`
- `chore` → `chore/`
- `cicd` → `cicd/`
- `revert` → `revert/`
- `data` → `data/`
- `devEx` → `devEx/`
- `miscellaneous` → `miscellaneous/`

## 🔧 Environment Configuration

### Backend (`.env`)

```bash
PYTHON_VERSION=3.13
POSTGRES_DB=pend
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DJANGO_SETTINGS_MODULE=core.settings.development
DEBUG=True
SECRET_KEY=dev-secret-key
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/pend
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/0
GUNICORN_WORKERS=4
```

### Frontend (`.env.local`)

```bash
NODE_ENV=development
NODE_VERSION=24
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8001
```

### Mobile (`.env`)

```bash
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NODE_ENV=development
```

## 🐳 Docker Configuration

### Services

1. **`postgres`** : PostgreSQL 15-alpine (Port 5432)
2. **`redis`** : Redis 7-alpine (Port 6379)
3. **`backend`** : Django Application (Port 8000)
4. **`frontend`** : NextJS Application (Port 3000)
5. **`celery_worker`** : Background Tasks
6. **`celery_beat`** : Scheduled Tasks

### Volumes

- `postgres_data` : PostgreSQL Persistence
- `redis_data` : Redis Persistence
- `backend_static` : Static Files
- `backend_media` : Media Files

### Network

- `pend_network` (Bridge, `172.28.0.0/16`)

### Docker Optimizations

- Multi-Stage Builds
- `.dockerignore` Files (96% Context Reduction)
- Debian-Slim Base Images
- Non-Root Users
- Health Checks on All Services

## 🧪 Testing Strategy

### Minimum Coverage

- **Backend** : 80% Code Coverage
- **Frontend** : 80% Code Coverage
- **UI Components** : 95%+ Coverage (Currently at 99.78%)

### Test Types Required

**Backend** :

- Unit Tests for Business Logic
- Integration Tests for API Endpoints
- Database Migration Tests

**Frontend** :

- Component Unit Tests
- Integration Tests for Features
- Storybook Stories for All UI Components

### Integration Testing

- API Testing in `tests/integration/api/`
- Frontend Integration in `tests/integration/frontend/`

### CI / CD Testing

- **Hybrid Strategy (Cost-Optimized)** :
  - Full CI on `main`, `devEnv` Pushes
  - Essential CI on `stagingEnv`, `prodEnv` PRs
  - No CI on `backup/*` Branches
  - Full CI + Validation on `chore/upgrade/*` Branches
- **Monthly Usage** : ~1,672 Minutes (FREE Tier : 2,000 Minutes)
- **Cost** : $0 / Month
- **Quality Gates** : 7 Validation Points Before Production

## 🚀 CI / CD Pipeline

### Continuous Integration (`ci.yaml`)

**Triggers** :

- Push to `main`, `devEnv`
- PRs to `main`, `devEnv`, `stagingEnv`, `prodEnv`
- Excludes `backup/**` Branches

**Jobs** :

- `backend-tests` (`pytest`, Linting, Coverage)
- `frontend-tests` (Jest, ESLint, `type-check`)
- `mobile-tests` (Jest, Expo)
- `storybook-chromatic` (Chromatic Deployment)
- `mobile-build-android` (Only `main` / `devEnv`)
- `mobile-build-ios` (Only `main` / `devEnv`)
- `mobile-eas-build` (Only `prodEnv`)
- `docker-build` (`backend`, `frontend` Images)
- `security-scan` (Trivy, `npm audit`, `safety`)
- `e2e-tests` (Only PRs)
- `upgrade-validation` (For Upgrade Branches)
- `notify-success` / `notify-failure`

**Special Features** :

- Upgrade Branch Validation (Checks Backup Exists)
- Automatic Warning Comments on Upgrade PRs
- Coverage Reporting to Codecov
- Security Results to GitHub Security Tab

### Continuous Deployment (`cd.yaml`)

**Triggers** :

- Push to `devEnv`, `stagingEnv`, `prodEnv`
- Version Tags (`v*.*.*`)
- Workflow Dispatch (Manual)
- After Successful CI (`workflow_run`)

**Jobs** :

- `setup` (Determine Environment)
- `tests` (Re-Run Before Deployment)
- `build-and-push` (Github Container Registry)
- `deploy` (Environment-Specific)
- `smoke-tests` (Non-Production)
- `notify-deployment`
- `rollback` (Production Failures)

**Features** :

- Docker Image Publishing to Github Container Registry
- Environment-Specific Deployments
- Database Migrations
- Smoke Tests
- Automatic Production Rollback

### Cost Breakdown

**Monthly GitHub Actions Usage** :

`main` Branch : ~1,870 Minutes (5 Pushes / Day)
`devEnv` Branch : ~748 Minutes (2 Pushes / Day)
PRs to `stagingEnv` : ~36 Minutes (1 Push / Week)
PRs to `prodEnv` : ~18 Minutes (2 Pushes / Month)

Total : ~1,672 Minutes / Month
Free Tier : 2,000 Minutes / Month
Cost: $0 / Month ✅

## 🛡️ Branch Protection Rules (GitHub Rulesets)

### Configuration Status

- ✅ Designed for Scalability (Solo → Team)
- ✅ Documented in `CONTRIBUTING.md`
- ✅ Configurable Based on Team Size
- ✅ Automated CI / CD Enforcement

### Rulesets Created

#### 1. `main` Branch (Integration Branch)

**Ruleset** : `main-branch-protection`

**Default Requirements** :

- ✅ **Pull Request Required** - Direct Pushes Blocked
- ⚙️ **Approval Requirements** - Configurable (0 for Solo, 1+ for Teams)
- ✅ **Status Checks Must Pass** - All CI Tests Required
  - `backend-tests` - Django / FastAPI Tests (pytest, Linting)
  - `frontend-tests` - NextJS / ReactJS Tests (Jest, ESLint)
  - `mobile-tests` - Expo / React Native Tests
  - `docker-build` - Container Build Validation
  - `security-scan` - Trivy, `npm audit`, Safety Checks
- ✅ **Branch Must be Up-To-Date** - Rebase / Merge Required
- ✅ **Force Pushes Blocked** - Prevents History Rewriting
- ✅ **Linear History Required** - Clean Commit History

**Team Size Recommendations** :

**Solo Developer** :

- Required Approvals : `0` (Owner can Merge After CI)
- Self-Review Encouraged But Not Enforced

**Small Team (2-5 Developers)** :

- Required Approvals : `1`
- Any Team Member can Approve

**Medium / Large Team (6+ Developers)** :

- Required Approvals : `2`
- Consider `CODEOWNERS.md` for Specialized Reviews

#### 2. Development Environment Branch (`devEnv`)

**Ruleset** : `devEnv-branch-protection`

**Requirements** :

- ✅ **Pull Request Required**
- ⚙️ **Approval Requirements** :
  - 0 Approval for Solo
  - 1+ Approvals for Team
- ✅ **Status Checks Must Pass**
- ✅ **Force Pushes Blocked**
- ✅ **Deletion Restricted**

**What This Means?** :

- Development Environment Branch `devEnv` is the Deployment Target
- Changes Flow through : `main` → `devEnv`
- Protected from Accidental Deletion / Force Pushes
- Merges Allowed After CI Passes

#### 3. Staging / QA Environment Branch (`stagingEnv`)

**Ruleset** : `stagingEnv-branch-protection`

**Requirements** :

- ✅ **Pull Request Required**
- ⚙️ **Approval Requirements** :
  - 0 Approval for Solo
  - 1 Approval for QA / Team Lead
- ✅ **Status Checks Must Pass**
- ✅ **Force Pushes Blocked**
- ✅ **Deletion Restricted**

**What This Means?** :

- Staging Environment Branch `stagingEnv` is the Deployment Target
- Changes Flow through : `main` → `devEnv` → `stagingEnv`
- Protected from Accidental Deletion / Force Pushes
- Merges Allowed After CI Passes

#### 4. Production Environment Branch (`prodEnv`)

**Ruleset** : `prodEnv-branch-protection`

**Requirements** :

- ✅ **Pull Request Required**
- ⚙️ **Approval Requirements** :
  - 0 Approval for Solo
  - 1-2 Approvals (Maintainers Only)
- ✅ **Status Checks Must Pass**
- ✅ **Force Pushes Blocked**
- ✅ **Deletion Restricted**

**What This Means?** :

- Production Environment Branch `prodEnv` is the Deployment Target
- Changes Flow through : `main` → `devEnv` → `stagingEnv` → `prodEnv`
- Protected from Accidental Deletion / Force Pushes
- Production requires Highest Scrutiny

#### 3. Backup Branches (`backup/**`)

**Ruleset** : `backup-branches-protection`

**Requirements** :

- ✅ **Force Pushes Blocked** - Immutable Snapshots
- ✅ **Deletion Restricted** - Permanent Preservation
- ✅ **Linear History Required** - Clean History
- ❌ **No PRs Required** - Created Directly from `main`
- ❌ **No Status Checks** - Snapshots, Not Active Development

**Purpose** :

- Provides Rollback Points for Major Upgrades
- Preserves Known-Good States
- Cannot be Modified After Creation

#### 4. Upgrade Branches (`chore/upgrade/**`)

**Ruleset** : `upgrade-branches-protection`

**Requirements** :

- ✅ **Pull Request Required**
- ⚙️ **Enhanced Approval Requirements** - 1 - 2+ Approvals Recommended
- ✅ **All Status Checks Must Pass**
- ✅ **Upgrade Validation Check** - Verifies Backup Exists
- ✅ **Force Pushes Blocked**

**Special CI Validation** :

- Automatically Checks that Corresponding Backup Branch Exists
- Fails CI if Backup is Missing
- ⚠️ Warns about Major Version Changes

### Team Size Recommendations

**Solo Project** :

```yaml
main: 0 Approval Required (Self-Review Encouraged)
devEnv: 0 Approval (Self-Review Encouraged)
stagingEnv: 0 Approval (Self-Review Encouraged)
prodEnv: 0 Approval (Self-Review Encouraged)
```

**Small Team (2-5)** :

```yaml
main: 1 Approval Required
devEnv: 0 Approval
stagingEnv: 1 Approval
prodEnv: 1 Approval
```

**Medium Team (6-15)** :

```yaml
main: 1-2 Approvals Required
devEnv: 0 Approval
stagingEnv: 1 Approval (QA Lead)
prodEnv: 2 Approvals (Maintainers)
```

**Large Team (15+)** :

```yaml
main: 2 Approvals Required
devEnv: 1 Approval
stagingEnv: 2 Approvals
prodEnv: 2-3 Approvals (CODEOWNERS Enforced)
```

## 📚 Documentation Structure

### Root Documentation

- **`README.md`** - Comprehensive Project Overview, Scaffolding Guide
- **`CONTRIBUTING.md`** - Complete Contribution Guide with 13 Branch Tags
- **`CHANGELOG.md`** - Version History
- **`PULL_REQUEST_TEMPLATE.md`** - PR Checklist

### CI / CD Documentation (`documentation/ci-cd/`)

- **`README.md`** - Overview, Quick Start, Pipeline Status
- **`GITHUB_SECRETS_SETUP.md`** - Step-By-Step Secrets Configuration
- **`STRATEGY.md`** - Testing Strategy, Git Workflow Integration
- **`TROUBLESHOOTING.md`** - Common Issues & Solutions
- **`UPGRADE_GUIDE.md`** - Major Version Upgrade Procedures (8 Phases)

### Component Documentation

- **`backend/README.md`** - Backend Development Guide
- **`frontend/README.md`** - Frontend Development Guide
- **`database/init/README.md`** - Database Setup Guide
- **`scripts/README.md`** - Scripts Usage Guide
- **`Icon.README.md`** - Icon Component Integration

### API Documentation

- Swagger UI : Auto-Generated
- Endpoint Documentation : `documentation/api/`
- Postman Collections : `documentation/api/postman/`

## 🚀 Development Workflow

### Starting Development

```bash
# 1. Initial Setup (First Time Only)
./scripts/setup.sh

# 2. Configure Environment
# Edit ".env" with Correct Values

# 3. Run Migrations
cd backend
source venv/bin/activate
python manage.py migrate
cd ..

# 4. Start Development
./scripts/dev-start.sh
```

### Development URLs

- Frontend : http://localhost:3000
- Backend API : http://localhost:8000
- API Documentation : http://localhost:8000/swagger/
- Administrator Panel : http://localhost:8000/admin/
- GraphQL : http://localhost:8000/graphql
- Storybook : http://localhost:6006

### Creating PRs

```bash
# 1. Create Branch with Correct Tag
git checkout -b [tag]/your-username/story-123

# 2. Make Changes & Test Locally
npm test  # Frontend
pytest    # Backend

# 3. Commit with Conventional Format
git commit -m "feature : Added New Feature"

# 4. Push & Create PR
git push origin feature/your-username/story-123

# 5. CI Runs Automatically
# 6. Merge When CI Passes (And Reviewed If Team)
```

### Major Upgrades

```bash
# 1. Create Backup FIRST (⚠️ REQUIRED!)
git checkout -b backup/pre-django5-20241230
git push origin backup/pre-django5-20241230

# 2. Create Upgrade Branch
git checkout main
git checkout -b chore/upgrade/backend

# 3. Make Upgrade Changes & Create PR
# 4. CI Validates Backup Exists
# 5. Test Txtensively (2+ Days Development Environment "devEnv", 1+ Week Staging Environment "stagingEnv")
# 6. Deploy to Production After Validation

# See : "documentation/ci-cd/UPGRADE_GUIDE.md"
```

## 🎯 Scaffolding New Projects

This Boilerplate is **Template-Ready** for Scaffolding New Projects.

### Quick Scaffold Process

1. **Use GitHub Template**
   - Click `Use this template` on GitHub
   - Name Your New Repository
   - Clone Locally

2. **Customize Configuration**
   - Update Project Name Throughout
   - Configure Environment Variables
   - Update Branding / Logos
   - Customize Color Scheme

3. **Configure GitHub**
   - Create Environment Branches
   - Set Up Branch Protection (Based on Team Size)
   - Configure GitHub Secrets
   - Enable GitHub Actions

4. **Initial Development**
   - Run Setup Script
   - Verify All Tests Pass
   - Make First Feature
   - Deploy to Environments

### Scaffolding Checklist

**Configuration** :

- [ ] Updated Project Name
- [ ] Configured Environment Variables
- [ ] Updated Branding
- [ ] Customized Documentation

**GitHub** :

- [ ] Created Repository
- [ ] Created Environment Branches
- [ ] Configured Branch Protection
- [ ] Set Up GitHub Secrets

**Testing** :

- [ ] Setup Script Successful
- [ ] All Tests Passing
- [ ] Docker Working
- [ ] CI / CD Working

**See** : `CONTRIBUTING.md` "Scaffolding New Projects" Section for Complete Guide

## ⚠️ Important Notes

1. **Docker-First** : ✅ Use Debian-s
   Slim, ❌ Not Alpine
2. **`.dockerignore` Required** : Critical for Build Performance
3. **Environment Files** : Never Commit `.env` Files
4. **Testing Required** : 80%+ Coverage Minimum
5. **Storybook for UI** : All Components Must have Stories
6. **Icon Flexibility** : No Enforced Icon Library
7. **Security** : Change Default Passwords in Production
8. **Cleanup Script** : Prevents Disk Space Issues
9. **Multi-Stage Builds** : Optimizes Final Image Size
10. **CI / CD Pipeline** : Automated Testing & Deployment
11. **Backup Before Upgrades** : Always Create Backup Branch First
12. **Branch Naming** : Strict 13-Tag Convention Enforced
13. **Scaffolding Ready** : Template Configured for New Projects
14. **Team Scalability** : Protection Rules Adjust to Team Size

## 📗 Quick Reference Links

- Root README : `README.md` (Comprehensive with Scaffolding)
- Contributing Guide : `CONTRIBUTING.md` (Complete Scaffolding Guide)
- Backend Guide : `backend/README.md`
- Frontend Guide : `frontend/README.md`
- Database Guide : `database/init/README.md`
- Scripts Guide : `scripts/README.md`
- Icon Guide : `frontend/src/components/ui/Icon.README.md`
- CI / CD Overview : `documentation/ci-cd/README.md`
- Secrets Setup : `documentation/ci-cd/GITHUB_SECRETS_SETUP.md`
- Testing Strategy : `documentation/ci-cd/STRATEGY.md`
- Upgrade Guide : `documentation/ci-cd/UPGRADE_GUIDE.md`
- Troubleshooting : `documentation/ci-cd/TROUBLESHOOTING.md`
- Changelog : `CHANGELOG.md`
- PR Template : `.github/PULL_REQUEST_TEMPLATE.md`

## 💡 Troubleshooting

### Build Issues

```bash
# Clean Docker
docker system prune -a --volumes -f

# Rebuild with Cleanup
./scripts/build.sh --env development --cleanup
```

### Database Issues

```bash
# Reset Database
docker-compose down -v
docker-compose up -d postgres

cd backend
python manage.py migrate
```

### Test Failures

```bash
# Backend
cd backend
pytest -v

# Frontend
cd frontend
npm test -- --verbose
```

### CI / CD Issues

See : `documentation/ci-cd/TROUBLESHOOTING.md`

## 📌 Context Restoration Instructions

When Starting A New AI Chat :

1. Share this Boilerplate Context Document
2. State : `I'm working on the PEND Boilerplate - [Specific Topic]`
3. Provide Specific Files / Code being worked on
4. Reference : "The Boilerplate uses 13 Branch Tags & is Scaffolding-Ready"

This Document contains All Necessary Context to Resume Development!

---

**Project Status** : ✅ COMPLETE - Production & Scaffolding Ready
**Version** : 1.0.5
**Last Updated** : February 20, 2026
**All 12 Steps** : COMPLETED ✅ (Infrastructure Optimized v1.0.3)
**CI / CD** : Production-Ready ✅
**Documentation** : Comprehensive ✅
**Branch Protection** : Configured ✅
**Branch Tags** : 13 Tags Supported ✅
**Scaffolding** : Template-Ready ✅
**Cost** : $0 / Month ✅
