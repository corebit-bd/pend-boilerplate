# 🔥 NeXuS PEND (PostgreSQL - Expo - NextJS - Django) Tech Stack Boilerplate 🚀

## PEND (PostgreSQL - Expo - NextJS - Django) Tech Stack Boilerplate for NeXuS

1. **Frontend** : NextJS with TypeScript
2. **Backend** : Django
3. **Database** : PostgreSQL
4. **Native Apps (Mobile Application Development)** : ReactJS Native
5. **Native Apps Framework** : Expo
6. **API** : GraphQL, REST
7. **API Frameworks** :

   ▪️ **Django REST Framework (DRF)** for Core Operations / Admin / Multi-Tenant Management

   ▪️ **FastAPI** for Edge APIs / PUB-SUB Services / AI Agents / Serverless

8. **CSS Styling** : Tailwind CSS
9. **Cookie** : HTTP-Only Cookies
10. **Authentication & Authorization** : Simple JWT (RSA 256)
11. **State Management** : Redux Toolkit (RTK)
12. **Data Validation** :

    ▪️ **Frontend Runtime** : Zod

13. **Package Manager** :

    ▪️ **Backend** : pip

    ▪️ **Frontend** : npm / pnpm / yarn

14. **Code Version Management** : Git & Github
15. **UI Design Tool** : Figma
16. **Testing Tools** :

    ▪️ **Frontend Testing** :

    → 　**Jest & ReactJS Testing Library** for Unit Testing (UT) & Integration Testing (IT)

    → 　**Cypress** for End-To-End (E2E) Testing

    → 　**Storybook with Chromatic** for Visual Regression Testing

    ▪️ **Backend Testing** :

    → 　**Python** : unittest

    → 　**Django** : TestCase, Test Client, Test Fixtures

    ▪️ **API Testing** : Postman

17. **IDE (Integrated Development Environment)** : Cursor IDE / Trae IDE / VS Code IDE
18. **Documentation** :

    ▪️ **API Documentation** : Swagger UI

    ▪️ **User Manual** : Custom Made / Nextra

    ▪️ **Technical Manual** : Custom Made / Nextra

    ▪️ **Design Documentation** : Storybook / Zeroheight / Custom Made / Nextra

19. **Environment Platform** :

    ▪️ **Operating System (OS)** : MacOS / Windows / Linux

    ▪️ **Containerization** : Docker

    ▪️ **Environments** : Development, Testing / Staging / QA, Production

20. **Git Commit Message Tags** :

    ▪️ **`feature`** : Indication of New Feature or Functionality or a significant enhancement into the system

    ▪️ **`fix`** : Signifies Bug or Error Fixes in the system

    ▪️ **`documentation`** : Changes to the Documentation File(s)
    ▪️ **`style`** : Addition / Changes to Design Styles of the Application UI / UX

    ▪️ **`refactor`** : Code Refactoring (Variable Renaming / Code Restructuring or Formatting) that doesn't affect Functionality

    ▪️ **`data`** : Used for Database, Information & Data Manipulation

    ▪️ **`test`** : Adding, Fixing or Modifying Tests; No Production Code Change

    ▪️ **`chore`** : Updating Build Scripts / Upgrading Dependencies, Maintenance & Changes in Tools; No Production Code Change

    ▪️ **`cicd`** : Changes to CI/CD Configuration or Scripts

    ▪️ **`performance`** : Performance Improvements / Optimization Changes

    ▪️ **`devEx`** : Developers' Experience : Use for Improvement of Developers' Experience

    ▪️ **`revert`** : Undoing the Changes made by a Previous Commit

    ▪️ **`miscellaneous`** : Use for anything that does not clearly fall into any of the previous categories

21. **Git Branches Template** :

    ▪️ **`backup/pre-[updates]-[date]`** : Backup of the Major Version Update Release on a specific date. Need Detailed Observation & Execution.

    ▪️ **`chore/upgrade/backend`** : Upgrading Backend (Django) Version to the Latest New Version. Need Detailed Observation & Execution.

    ▪️ **`chore/upgrade/frontend`** : Upgrading Frontend (NextJS) Version to the Latest New Version. Need Detailed Observation & Execution.

    ▪️ **`[tag]/[dev_username]/[user_story_id]`** : A specific Developer working on a specific user story which has a predefined tag.
    _Example_ : `feature/jeetzhkhondker/spmt-us-231`

22. **Environment Branches** :

    ▪️ **main** : Main Branch is considered as the Stable Development Baseline & Integration Point. It contains latest stable code from all completed features. It is the source for creating working branches by different developers in the team and for receiving merged works. It is often deployed to Development Environment (`devEnv` Branch) for primary testing 🧪.

    ▪️ **devEnv** : `devEnv` Branch is considered as the Development Environment Deployment Branch. It contains code which are currently deployed to Development Server. It receives tested code from `main` Branch & Deployed (Automatically) to Development Server. Development Team use this Environment Branch for Primary Testing 🧪 & Integration.

    ▪️ **stagingEnv** : Testing / QA / Staging Environment Deployment Branch contains code being tested by QA Team. It receives tested code from `devEnv` Branch & Deploy it to Staging Server. QA Team & Stakeholders use this Environment Branch for Secondary Testing 🧪🧪.

    ▪️ **prodEnv** : Production Environment Deployment Branch contains Production-Ready, Fully-Tested Code. It receives approved code from `stagingEnv` Branch & Deploy it to Production Server. This Environment Branch is used for Live Users to See, Check & Use the Real Application 🔥.

23. **Developer Workflow** :
    ![Developer Workflow](developer-workflow.png)
24. **Development Rules Set for FrontEnd (FE) & BackEnd (BE)** :

    ▪️ `[FE]` **❌ NO USE of shadcn/ui** : Instead Building Custom Reusable Components from scratch

    ▪️ `[FE]` **Server-Client Composition** : Parts of a page are rendered on the server, while others are rendered on the client. Some parts are served statically from a CDN, while others are rendered dynamically. These engineering challenges have already been addressed by NextJS through its solutions for complex rendering processes, advanced routing patterns, and intelligent caching.

    ▪️ `[FE]` **Use of Semantic Elements** : Use of Semantic Elements to enhance SEO like `<section />`, `<main />` Tags etc.

    ▪️ **User Story-Oriented Changes** Need to be Committed using Git in Github.

    ▪️ `[FE]` **Arrow Functional Components with Named Exports** : As it is a Micro-Services with an Event-Driven Multi-Tenant Headless Architecture having a PUB-SUB Communication Flow where server-based solution is used for core operations and serverless architecture is used for supporting features with API-First & Domain Driven Design Approach, the codebase will be pretty large. So it is recommended to use Arrow Functional Components with Named Exports.

    ▪️ `[FE] [BE]` **Custom Rule for Code Syntax Highlighting** : For any kinds of string values, check the length of the string. If it is a single character or an empty string, embrace it with `''` single quotes. Otherwise, embrace it with `""` double quotes.

25. **Infrastructure & Architecture** :
    - Headless Architecture
    - Multi-Tenancy Architecture
    - Microservices Event-Driven Architecture with PUB-SUB Communication Flow : Server-Based Solution is used for Core Operations & Serverless Architecture is used for Supporting Features (like Building API Gateway from Scratch)
    - Event-Driven AI Agents
26. **Design & Development Approach** :
    - API-First Design & Development Approach
    - Domain Driven Design (DDD) Approach
27. **Software Development Strategy** : Monorepo
28. **Software Development Framework** : Agile SCRUM Framework

## References :

1. [Storybook with Chromatic](https://www.chromatic.com/docs/visual-tests-addon/)
2. [Nextra](https://nextra.site/)
3. [Zeroheight](https://zeroheight.com/)

## Quick Start

```bash
# Install Dependencies
./scripts/setup.sh

# Start Development Environment
./scripts/dev-start.sh
```

## Getting Started

### Installation

1. Clone the repository

```bash
git clone https://github.com/jeet-khondker/nexus-pend-boilerplate.git
cd nexus-pend-boilerplate
```

2. Run Setup Script

```bash
./scripts/setup.sh
```

3. Configure Environment Variables

```bash
# Update .env Files with Your Configuration
backend/.env
frontend/.env.local
mobile/.env
```

4. Start Services

```bash
# Start Docker services (PostgreSQL, Redis)
docker-compose up -d postgres redis

# Start Development Servers
./scripts/dev-start.sh
```

## Development URLs

After starting the Development Environment :

▪️ **Frontend** : http://localhost:3000

▪️ **Backend API** : http://localhost:8000

▪️ **Backend Admin** : http://localhost:8000/admin

▪️ **API Documentation** : http://localhost:8000/swagger/

▪️ **GraphQL Playground** : http://localhost:8000/graphql

▪️ **Storybook** : http://localhost:6006 (run `npm run storybook` in **frontend/**)

## Testing

### Backend API Testing

```bash
cd backend
python manage.py test
```

### Frontend Testing

```bash
cd frontend
npm test               # Unit Tests
npm run test:e2e       # E2E Tests with Cypress
npm run storybook      # Component Documentation
```

### Mobile Testing

```bash
cd mobile
npm test
```

## Contribution

1. Create a Branch with the relevant Tag from `main`. **Reference** : Section 21.

2. Follow the Commit Message Convention mentioned in Section 20.

3. Write relavent Tests for your Changes

4. Update Documentation

5. Submit a Pull Request (PR) to `main`

## License

Nexus License