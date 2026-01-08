# Contributing to PEND Boilerplate

## Table of Contents

- [About This Boilerplate](#about-this-boilerplate)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Branch Protection Rules](#branch-protection-rules)
- [Pull Request Process](#pull-request-process)
- [Special Branches](#special-branches)
- [Commit Messages](#commit-messages)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Scaffolding New Projects](#scaffolding-new-projects)

## About This Boilerplate

**PEND Boilerplate** (PostgreSQL-Expo-NextJS-Django) is a Production-Ready, Full-Stack Boilerplate Designed to Scaffold New Projects Quickly while Maintaining High Quality Standards.

### Purpose

This Repository Serves as a **Template** for Creating New Projects. It includes :

- ✅ Complete Tech Stack Configuration
- ✅ CI / CD Pipelines Ready for Deployment
- ✅ Comprehensive Testing Setup
- ✅ Production-Grade Security Patterns
- ✅ Multi-Tenant Architecture Foundation
- ✅ Documented Best Practices

### How to Use This Boilerplate

1. **Use as GitHub Template** - Click `Use this template` to Create A New Repository
2. `Clone and Customize` - Clone this Repository & Modify for Your Specific Needs
3. **Follow This Guide** - Use these Contribution Guidelines in Your New Project

## Getting Started

### For Contributors to This Boilerplate

If You're Contributing to Improve the Boilerplate Itself :

1. **Clone the repository** :

   ```bash
   git clone https://github.com/jeet-khondker/pend-boilerplate.git
   cd pend-boilerplate
   ```

2. **Run Setup Script** :

   ```bash
   ./scripts/setup.sh
   ```

3. **Configure Environment** :

   ```bash
   cp .env.example .env
   # Edit .env with Your Local Configuration
   ```

4. **Start Development** :

   ```bash
   ./scripts/dev-start.sh
   ```

### For Projects Using This Boilerplate

If You've Scaffolded a New Project from this Boilerplate :

1. **Update Project Name** throughout the Codebase
2. **Configure Environment** for Your Specific Needs
3. **Update Documentation** to reflect Your Project
4. **Follow the Same Contribution Guidelines** Established Here
5. **Customize Branch Protection** Based on Your Team Size

## Development Workflow

### Git Flow

```
[tag]/[username]/[story-id]
    ↓ (PR with Required Checks)
  main → CI : Full Tests ✅
    ↓ (Automatic / Manual Promotion)
  devEnv → CD : Deploy to Development 🚀
    ↓
  stagingEnv → CD : Deploy to Staging 🚀
    ↓
  prodEnv → CD : Deploy to Production 🚀
```

### Environment Strategy

- **main** - Integration Branch, Always Deployable
- **devEnv** - Active Development, Latest Features
- **stagingEnv** - QA & Testing, Pre-Production Validation
- **prodEnv** - Production-Ready, Stable Releases

## Branch Naming Convention

All Development Branches Must Follow this Strict Naming Convention :

### Format

```
[tag]/[username]/[story-id]
```

### Components

**Tag** - One of the Available Tags (See Table Below)  
**Username** - Your GitHub Username / Team Identifier (Lowercase, Alphanumeric)  
**Story ID** - Issue / Ticket / Story Number / Descriptive Identifier

### Available Tags

| Tag              | Purpose                                                                                      | Example                                   | CI Trigger |
| ---------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- |
| `feature/`       | New Features / Enhancements                                                                  | `feature/jzhk/user-authentication-123`    | ✅ Full    |
| `fix/`           | Bug / Error Fixes                                                                            | `fix/ijs/login-error-456`                 | ✅ Full    |
| `documentation/` | Documentation Addition / Changes                                                             | `documentation/smd/api-documentation-789` | ✅ Full    |
| `style/`         | UI / UX Design Styles Addition / Changes                                                     | `style/jzhk/button-design-231`            | ✅ Full    |
| `refactor/`      | Code Refactoring (Variable Renaming / Code Restructuring or Formatting) - No Behavior Change | `refactor/ijs/cleanup-utils-321`          | ✅ Full    |
| `data/`          | Data Manipulation / Information Addition / Changes                                           | `data/jk/posts-timestamp-111`             | ✅ Full    |
| `test/`          | Adding / Fixing / Updating Tests                                                             | `test/jzhk/unit-tests-654`                | ✅ Full    |
| `chore/`         | Build Scripts, Dependencies, Config                                                          | `chore/smd/update-dependencies-987`       | ✅ Full    |
| `cicd/`          | Addition / Changes to CI / CD Configuration / Scripts                                        | `cicd/smd/setup-cicd-432`                 | ✅ Full    |
| `performance/`   | Performance Improvements / Optimization Changes                                              | `performance/jzhk/fast-reload-999`        | ✅ Full    |
| `devEx/`         | Developers' Experience : Use for Improvement of Developers' Experience                       | `devEx/jzhk/kiss-principle-342`           | ✅ Full    |
| `revert/`        | Undoing the Changes made by a Previous Commit                                                | `revert/ijs/fix-commit-289`               | ✅ Full    |
| `miscellaneous/` | Use for anything that does not clearly fall into any of the previous tags                    | `miscellaneous/smd/others-misc-752`       | ✅ Full    |

### Tag Selection Guide

**Choose the Right Tag** :

- **feature/** - Adding Login, Search, Notifications, New Pages, New APIs
- **fix/** - Fixing Bugs, Errors, Broken Functionality
- **documentation/** - README Updates, API Documentation, Guides, Comments
- **style/** - CSS Changes, UI Polish, Design System Updates
- **refactor/** - Reorganizing Code, Renaming Variables (No Behavior Change)
- **data/** - Database Seeds, Migrations, Data Transformations
- **test/** - Unit Tests, Integration Tests, Test Utilities
- **chore/** - Package Updates, Build Config, Tooling
- **cicd/** - GitHub Actions, Deployment Scripts, CI / CD Configuration
- **performance/** - Optimization, Caching, Lazy Loading
- **devEx/** - Developer Tools, Scripts, Linting Configuration
- **revert/** - Reverting Previous Commits
- **miscellaneous/** - Anything Else (Use Sparingly)

### Naming Examples

**Good Examples** :

```bash
feature/jzhk/user-authentication-123
fix/ijs/login-timeout-456
documentation/smd/api-endpoints-789
style/jzhk/responsive-navbar-231
refactor/ijs/auth-service-321
data/jk/user-seed-data-111
test/jzhk/auth-unit-tests-654
chore/smd/upgrade-nextjs-987
cicd/smd/deploy-pipeline-432
performance/jzhk/image-optimization-999
devEx/jzhk/vscode-settings-342
revert/ijs/broken-commit-289
miscellaneous/smd/temporary-fix-752
```

**Bad Examples** :

```bash
❌ feature-user-auth           # Missing Username & Story ID
❌ jzhk/user-authentication    # Missing Tag
❌ feature/UserAuth/123        # Username Not Lowercase
❌ feature/jzhk/User Auth 123  # Spaces Not Allowed
❌ my-feature-branch           # Doesn't Follow Convention
❌ quick-fix                   # Doesn't Follow Convention
```

### Special Maintenance Branches

In addition to Regular Development Branches, the Boilerplate supports Special Maintenance Branches :

#### Backup Branches

**Format** : `backup/pre-[update]-[YYYYMMDD]`

**Purpose** : Create Immutable Snapshots Before Major Upgrades

**Examples** :

```bash
backup/pre-django5-20241226
backup/pre-nextjs16-20241220
backup/pre-postgres16-20250115
```

**Important** :

- Required Before Any Major Framework Upgrade
- Protected from Modification & Deletion
- No CI / CD Runs on Backup Branches

#### Upgrade Branches

**Format** : `chore/upgrade/[component]`

**Purpose** : Major Version Upgrades for Core Components

**Examples** :

```bash
chore/upgrade/backend     # Django, Python Upgrades
chore/upgrade/frontend    # NextJS, ReactJS Upgrades
chore/upgrade/mobile      # Expo, React Native Upgrades
chore/upgrade/database    # PostgreSQL Upgrades
```

**Special Requirements** :

- Must Create Backup Branch First
- Requires Enhanced Testing (2+ Days `devEnv`, 1+ Week `stagingEnv`)
- May Require Additional Approvals (Team-Dependent)

## Branch Protection Rules

This Boilerplate enforces Branch Protection through GitHub Rulesets to Maintain Code Quality & Enable Safe Collaboration.

### Configuration Philosophy

The Branch Protection Rules are designed to be :

- **Scalable** - Work for Solo Developers & Teams
- **Flexible** - Adjust based on Team Size & Risk Tolerance
- **Automated** - Leverage CI / CD for Quality Gates
- **Safe** - Prevent Accidental Damage to Critical Branches

### Protected Branches

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

### Configuring for Your Team

**When Scaffolding A New Project, Adjust Protection based on Team Size** :

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

## Pull Request Process

### Before Creating a PR

1. **Ensure Branch Naming is Correct** :

   ```bash
   # Check Your Current Branch
   git branch --show-current

   # Should Match : [tag]/[username]/[story-id]
   # Example : feature/jzhk/user-auth-123
   ```

2. **Sync with `main`** :

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main  # Or git merge main
   ```

3. **Run Tests Locally** :

   ```bash
   # Backend
   cd backend
   source venv/bin/activate
   pytest --cov
   black . && flake8 && isort .

   # Frontend
   cd frontend
   npm test
   npm run lint
   npm run type-check
   ```

4. **Review Your Changes** :
   ```bash
   git diff main
   git log main..HEAD
   ```

### Creating the PR

1. **Push Your Branch** :

   ```bash
   git push origin [tag]/[username]/[story-id]
   ```

2. **Create PR via GitHub UI** / CLI :

   ```bash
   gh pr create --base main --head [tag]/[username]/[story-id]
   ```

3. **Fill out PR Template Completely** :

   - Clear Title Describing the Change
   - Reference to Issue / Story Number
   - Description of Changes Made
   - Testing Performed
   - Screenshots (For UI Changes)
   - Breaking Changes (If Any)
   - Checklist Completion

4. **Request Reviewers** (If Team) :
   - Tag Appropriate Team Members
   - Use `CODEOWNERS.md` If Configured
   - Notify in Team Channel

### PR Review Checklist

**Automated Checks (CI will Verify)** :

- ✅ Branch Naming follows Convention
- ✅ All Tests Pass (`backend`, `frontend`, `mobile`)
- ✅ Code Coverage meets Thresholds (80%+)
- ✅ No Linting Errors
- ✅ TypeScript Type Checks Pass
- ✅ Docker Images Build Successfully
- ✅ No Security Vulnerabilities
- ✅ Upgrade Validation (If `upgrade` Branch)

**Human Reviewers should Check** :

- Code Quality & Maintainability
- Architecture & Design Patterns
- Test Coverage Adequacy
- Documentation Completeness
- Breaking Changes Clearly Communicated
- Migration Path for Upgrades
- Performance Implications
- Security Considerations

### Addressing Review Feedback

1. **Make Requested Changes:**

   ```bash
   # Make Changes Locally
   git add .
   git commit -m "fix : Addressed Review Feedback"
   git push origin your-branch
   ```

2. **CI Runs Automatically** on New Pushes

3. **Re-Request Review** After Major Changes

4. **Resolve Conversations** in GitHub UI

### Merge Strategies

Choose the Appropriate Merge Strategy :

**`Squash and Merge`** (Recommended for Most Cases)

- Combines All Commits into One
- Keeps `main` History Clean & Linear
- Used for : `feature/_`, `fix/_`, `style/_`, `documentation/_`

```bash
# Results in One commit on "main" Branch :
feature : Added User Authentication (#123)
```

**`Rebase and Merge`** (For Specific Cases)

- Preserves Individual Commits
- Maintains Detailed Commit History
- Used for : Complex Features with Logical Commit Breakdown

```bash
# Preserves All Commits :
feature : Added User Model
feature : Added Authentication Service
feature : Added Login Endpoint
test : Added Authentication Tests
```

**Never Use "`Create a merge commit`"**

- Violates Linear History Requirement
- Creates Unnecessary Merge Commits
- Blocked by Branch Protection

### After Merging

1. **Delete the Created Branch** :

   ```bash
   git branch -d [tag]/[username]/[story-id]
   git push origin --delete [tag]/[username]/[story-id]
   ```

   Or Use GitHub's "Delete branch" Button (Recommended)

2. **Monitor CI / CD Deployment** :

   - Check GitHub Actions for Deployment Status
   - Verify Deployment to `devEnv`
   - Watch for Any Deployment Errors

3. **Verify Changes** :

   ```bash
   # Pull Latest "main"
   git checkout main
   git pull origin main

   # Test Locally If Needed
   ./scripts/dev-start.sh
   ```

4. **Update Documentation** If Needed

5. **Close Related Issues / Stories**

## Special Branches

### Working with Backup Branches

Backup Branches are **Critical** for Safe Major Upgrades. They provide Rollback Points if something goes wrong.

#### When to Create Backup Branches

Create a Backup Branch Before :

- ✅ Major Framework Upgrades (Django 5.1 → 5.2)
- ✅ Major Dependency Updates (NextJS 15 → 16)
- ✅ Database Engine Upgrades (PostgreSQL 15 → 16)
- ✅ Breaking API Changes
- ✅ Major Refactoring Efforts
- ✅ Significant Architecture Changes

#### How to Create Backup Branches

```bash
# 1. Ensure "main" Branch is Clean & Up-To-Date
git checkout main
git pull origin main

# 2. Verify Everything Works
./scripts/dev-start.sh

# Test Critical Functionality

# 3. Create Backup Branch
git checkout -b backup/pre-django5-20241226

# 4. Push Immediately (No Changes)
git push origin backup/pre-django5-20241226
```

**Important Notes** :

- Backup Branches are Created from `main` with **Zero Changes**
- They are immediately Protected (No Modifications Allowed)
- Never Delete `backup` Branches
- Keep Indefinitely / Until EOL of Old Version

#### Using Backup Branches for Rollback

If An Upgrade Fails :

```bash
# 1. Create Rollback Branch from Backup
git checkout backup/pre-django5-20241226
git checkout -b fix/jzhk/rollback-django5-999

# 2. Cherry-Pick Any Needed Commits
git cherry-pick

# 3. Create PR to "main" Branch
git push origin fix/jzhk/rollback-django5-999

# 4. Merge & Deploy
```

### Working with Upgrade Branches

Major Upgrades follow a Strict, Safe Process to Minimize Risk.

#### Complete Upgrade Process

**Phase 1 : Preparation**

```bash
# 1. Create Backup branch (⚠️ REQUIRED)
git checkout main
git pull origin main
git checkout -b backup/pre-django5-20241226
git push origin backup/pre-django5-20241226

# 2. Document Current State
# Record Versions, Known Issues, Test Results

# 3. Review Upgrade Notes
# Read Changelog, Migration Guides, Breaking Changes
```

**Phase 2 : Create Upgrade Branch**

```bash
# 1. Create Upgrade Branch from "main" Branch
git checkout main
git checkout -b chore/upgrade/backend

# 2. Update Dependencies
# Edit backend/requirements.txt
Django==5.2.0  # Was 5.1.0
djangorestframework==3.17.0  # Was 3.16.0

# 3. Install & Test Locally
cd backend
pip install -r requirements.txt
python manage.py check
pytest
```

**Phase 3 : Fix Breaking Changes**

```bash
# 1. Identify Breaking Changes
# Read Upgrade Documentation
# Run Tests to find Failures

# 2. Fix Code
# Update Deprecated Imports
# Fix API Changes
# Update Configuration

# 3. Update Tests
# Fix Test Fixtures
# Update Assertions
# Add New Test Cases

# 4. Test Thoroughly
pytest --cov
npm test
```

**Phase 4 : Documentation**

Update `CHANGELOG.md` :

```markdown
## [Unreleased]

### Changed

- Upgraded Django 5.1.0 → 5.2.0
- Upgraded Django REST Framework 3.16.0 → 3.17.0

### Breaking Changes

- `MIDDLEWARE_CLASSES` Setting Renamed to `MIDDLEWARE`
- Removed Support for Python 3.11 (Now Requires 3.12+)
- Changed Authentication Backend Interface

### Migration Steps

1. Update `settings.py` : Rename MIDDLEWARE_CLASSES → MIDDLEWARE
2. Update Python to 3.12 / Higher
3. Run `python manage.py migrate`
4. Update Custom Authentication Backends

### Rollback Plan

If Issues Occur, Rollback to "backup/pre-django5-20241226"
```

**Phase 5 : Create PR**

```bash
# 1. Commit All Changes
git add .
git commit -m "chore : Upgraded Django 5.1 → 5.2

- Updated 'backend/requirements.txt'
- Fixed Deprecated Settings in 'core/settings/base.py'
- Updated Middleware Configuration
- Fixed Authentication Backend for Django 5.2
- Updated Tests for New API
- Added Migration Guide to CHANGELOG.md

Breaking Changes :
- 'MIDDLEWARE_CLASSES' Renamed to 'MIDDLEWARE'
- Python 3.12+ Now Required

Backup : 'backup/pre-django5-20241226'
Reference Issue : #123"

# 2. Push & Create PR
git push origin chore/upgrade/backend

# 3. Create PR with [UPGRADE] Tag in Title
# Title : [UPGRADE] Django 5.1 → 5.2
```

**Phase 6 : Testing Period**

```bash
# 1. Deploy to "devEnv" Branch
# Merge PR to "main" Branch (After CI Passes)
# Automatic Deployment to "devEnv" Branch

# 2. Test in "devEnv" Branch (Minimum 2 Days)
- Run Smoke Tests
- Test Critical User Flows
- Monitor Logs for Errors
- Check Performance Metrics

# 3. Promote to "stagingEnv" Branch (Minimum 1 Week)
- Full QA Testing
- User Acceptance Testing
- Load Testing
- Security Scanning

# 4. Promote to "prodEnv" Branch (After Full Validation)
- Final Review
- Backup Production Database
- Deploy during Low-Traffic Window
- Monitor Closely
```

**Phase 7 : Production Deployment**

```bash
# 1. Pre-Deployment Checklist
- ✅ Backup Branch Exists
- ✅ All Tests Passing
- ✅ QA Sign-Off Obtained
- ✅ Rollback Plan Documented
- ✅ Team Notified
- ✅ Monitoring Ready

# 2. Deploy
git checkout prodEnv
git merge stagingEnv
git push origin prodEnv

# 3. Post-Deployment
- Monitor Error Rates
- Check Performance Metrics
- Verify Critical Functionality
- Be Ready to Rollback
```

**Phase 8 : Post-Upgrade**

```bash
# 1. Monitor (First 48 Hours Critical)
- Watch Error Logs
- Check Performance
- Monitor User Feedback

# 2. Document Lessons Learned
# Update Upgrade Guide with Insights

# 3. Clean Up (After 30 Days If Stable)
- Update Documentation
- Archive Old Backup (Don't Delete)
- Update Project Templates
```

#### Upgrade Branch Special Rules

**CI / CD Validates** :

- ✅ Backup Branch Exists (Fails If Missing)
- ✅ All Tests Pass
- ✅ No Security Vulnerabilities
- ✅ Documentation Updated

**Approval Requirements** :

- Solo : Thorough Self-Review Required
- Small Team : 1 Approval Recommended
- Medium / Large Team : 2+ Approvals Required

**See Also** : `documentation/ci-cd/UPGRADE_GUIDE.md` for Detailed Procedures

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) Specification.

### Format

```
<type> (<scope>) : <description>

[optional body]

[optional footer]
```

### Types

Map to Branch Tags :

### Available Tags

| Tag              | Purpose                                                                                      | Example                                   | CI Trigger |
| ---------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- |
| `feature/`       | New Features / Enhancements                                                                  | `feature/jzhk/user-authentication-123`    | ✅ Full    |
| `fix/`           | Bug / Error Fixes                                                                            | `fix/ijs/login-error-456`                 | ✅ Full    |
| `documentation/` | Documentation Addition / Changes                                                             | `documentation/smd/api-documentation-789` | ✅ Full    |
| `style/`         | UI / UX Design Styles Addition / Changes                                                     | `style/jzhk/button-design-231`            | ✅ Full    |
| `refactor/`      | Code Refactoring (Variable Renaming / Code Restructuring or Formatting) - No Behavior Change | `refactor/ijs/cleanup-utils-321`          | ✅ Full    |
| `data/`          | Data Manipulation / Information Addition / Changes                                           | `data/jk/posts-timestamp-111`             | ✅ Full    |
| `test/`          | Adding / Fixing / Updating Tests                                                             | `test/jzhk/unit-tests-654`                | ✅ Full    |
| `chore/`         | Build Scripts, Dependencies, Config                                                          | `chore/smd/update-dependencies-987`       | ✅ Full    |
| `cicd/`          | Addition / Changes to CI / CD Configuration / Scripts                                        | `cicd/smd/setup-cicd-432`                 | ✅ Full    |
| `performance/`   | Performance Improvements / Optimization Changes                                              | `performance/jzhk/fast-reload-999`        | ✅ Full    |
| `devEx/`         | Developers' Experience : Use for Improvement of Developers' Experience                       | `devEx/jzhk/kiss-principle-342`           | ✅ Full    |
| `revert/`        | Undoing the Changes made by a Previous Commit                                                | `revert/ijs/fix-commit-289`               | ✅ Full    |
| `miscellaneous/` | Use for anything that does not clearly fall into any of the previous tags                    | `miscellaneous/smd/others-misc-752`       | ✅ Full    |

### Examples

**Simple Feature** :

```bash
git commit -m "feature : Added User Authentication"
```

**Feature with Scope** :

```bash
git commit -m "feature (auth) : Added JWT Token Validation"
```

**Bug Fix with Body** :

```bash
git commit -m "fix (login) : Resolved Timeout on Slow Connections

Users were Experiencing Timeouts during Login when on Slow Networks. Increased Timeout from 5 Seconds to 15 Seconds & Added Retry
Logic with Exponential Backoff.

Fixed : Issue #456"
```

**Breaking Change** :

```bash
git commit -m "feature (api) : Redesigned Authentication Endpoints

BREAKING CHANGE : Authentication now uses JWT Tokens instead of Session Cookies. Clients Must Update to Use Bearer Token Authentication.

Migration Guide : 'documentation/migration/v2-auth.md'
Affects : All API Clients
Old Endpoint : POST /api/auth/login
New Endpoint : POST /api/v2/auth/token

Reference Issue : #789"
```

**Upgrade Commit** :

```bash
git commit -m "chore (deps) : Upgraded Django 5.1 → 5.2

- Updated 'requirements.txt'
- Fixed Deprecated Settings
- Updated Middleware Configuration
- Fixed Authentication Backend
- Updated Tests

Breaking Changes :
- MIDDLEWARE_CLASSES → MIDDLEWARE
- Python 3.12+ Required

Backup : 'backup/pre-django5-20241226'
Reference Issue : #123"
```

**Multiple Changes** :

```bash
git commit -m "chore : Updated Development Dependencies

- Upgraded pytest 8.3 → 8.4
- Upgraded black 24.8 → 25.9
- Upgraded eslint 8.57 → 9.0
- Fixed New Linting Issues
- Updated CI Configuration

All Tests Passing Locally."
```

### Commit Best Practices

**✅ DOs** :

- ✅ Use Past Tense ("Added Feature" not "Add Feature")
- ✅ Use space before & after ':' between Tag Name & Description (feature : Added Authentication)
- ✅ Use Title Case for Main Words (feature : Added Login Endpoint)
- ✅ Use Imperative Mood (OK ✅ "Moved Cursor to ..." Not ❌ "Moves Cursor to ...")
- ✅ Keep First Line Under 72 Characters
- ✅ Reference Issues / PRs with `#number`
- ✅ Explain **Why** in Body, Not ❌ **What** (Code Shows **What**)
- ✅ Use Body to provide Context
- ✅ Use Footer for Breaking Changes & References

**❌ DON'Ts** :

- ❌ End with Period (.) in Subject Line
- ❌ Use Vague Messages ("Fix Stuff", "Update", "Changes")
- ❌ Include Multiple Unrelated Changes
- ❌ Commit Commented-Out Code
- ❌ Commit `console.log()` / Debug Statements

## Code Standards

### Python (Backend)

**Formatting & Linting** :

- **Formatter** : Black (line length: 88)
- **Linter** : Flake8
- **Import Sorting** : isort
- **Type Hints** : Required for Public APIs
- **Docstrings** : Required for Classes & Public Methods (Google Style)

**Configuration Files** :

- `pyproject.toml` - Black, isort, pytest Configuration
- `.flake8` - Flake8 Rules
- `pytest.ini` - Test Configuration

**Pre-Commit Commands** :

```bash
cd backend

# Auto-Format Code
black .

# Check Linting
flake8

# Sort Imports
isort .

# Type Checking (Optional, If Using mypy)
mypy .

# Run Tests with Coverage
pytest --cov --cov-report=html
```

**Code Style** :

```python
"""Module docstring Describing Purpose."""

from typing import Optional, List
from django.db import models


class User(models.Model):
    """User Model for Authentication.

    Attributes :
        email : User's Email Address (Unique)
        username : User's Display Name
        is_active : Account Activation Status
    """

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "auth.users"
        ordering = ["-created_at"]

    def get_display_name(self) -> str:
        """Return the User's Display Name.

        Returns :
            Username / Email if username Not Set.
        """
        return self.username or self.email
```

### TypeScript (Frontend / Mobile)

**Configuration** :

- **Linter** : ESLint with Strict Rules
- **Type Checking** : Strict TypeScript Enabled
- **Style Guide** : Airbnb Base (Customized)

**Naming Conventions** :

- `camelCase` - Variables, Functions
- `PascalCase` - Components, Classes, Types
- `UPPER_SNAKE_CASE` - Constants
- `kebab-case` - File Names (Except Components)

**Pre-commit Commands** :

```bash
cd frontend

# Lint Code
npm run lint

# Auto-Fix Linting Issues
npm run lint:fix

# Type Check
npm run type-check

# Run Tests
npm test

# Check Coverage
npm test -- --coverage
```

**Component Structure** :

```tsx
// 1. Imports (Grouped)
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Internal Imports
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// 2. Types / Interfaces
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// 3. Constants
const MAX_NAME_LENGTH = 100;

// 4. Validation Schemas
const userSchema = z.object({
  name: z.string().min(1).max(MAX_NAME_LENGTH),
  email: z.string().email(),
});

// 5. Component
export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  // 6. State
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 7. Hooks
  const router = useRouter();

  // 8. Effects
  useEffect(() => {
    loadUser();
  }, [userId]);

  // 9. Handlers
  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getUser(userId);
      setUser(data);
    } catch (err) {
      setError("Failed to Load User");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const updated = await api.updateUser(user.id, user);
      setUser(updated);
      onUpdate?.(updated);
    } catch (err) {
      setError("Failed to Update User");
    }
  };

  // 10. Early Returns
  if (isLoading) return <div>Loading ... .. .</div>;
  if (error) return <div>Error : {error}</div>;
  if (!user) return <div>User Not Found</div>;

  // 11. Render
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
}
```

### General Code Standards

**For All Code** :

- ✅ Keep Functions Small (< 50 Lines Ideal)
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ YAGNI (You Aren't Gonna Need It)
- ✅ Write Self-Documenting Code
- ✅ Comment Complex Logic (Justify "Why", Not ❌ "What")
- ✅ Handle Errors Appropriately
- ✅ No Magic Numbers (Use Constants)
- ✅ Avoid Deep Nesting (< 3 Levels)

**Don'ts** :

- ❌ Commit Commented-Out Code
- ❌ Keep `console.log()` in Production
- ❌ Use `any` Type in TypeScript
- ❌ Ignore Linter Warnings
- ❌ Skip Error Handling
- ❌ Write Tests After the Fact

## Testing Requirements

### Minimum Coverage

**Coverage Targets** :

- **Backend** : 80%+ Code Coverage
- **Frontend** : 80%+ Code Coverage
- **UI Components** : 95%+ Coverage
- **Critical Paths** : 100% Coverage

**Current Status** :

- **UI Components** : 99.78% ✅
- **Backend** : Targeting 80%+
- **Frontend** : Targeting 80%+

### Test Types

**Backend Tests** :

```bash
backend/apps/[app]/tests/
├── test_models.py      # Model Tests
├── test_views.py       # API Endpoint Tests
├── test_serializers.py # Serializer Tests
├── test_services.py    # Business Logic Tests
└── factories.py        # Test Data Factories
```

**Frontend Tests** :

```bash
frontend/src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Button.test.tsx       # Unit Tests
│       └── Button.stories.tsx    # Storybook
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

### Running Tests

**Backend** :

```bash
cd backend
source venv/bin/activate

# All Tests
pytest

# With Coverage
pytest --cov --cov-report=html

# Specific File
pytest apps/users/tests/test_models.py

# Specific Test
pytest apps/users/tests/test_models.py::TestUserModel::test_create_user

# Failed Tests Only
pytest --lf

# Verbose Output
pytest -v

# Stop on First Failure
pytest -x
```

**Frontend** :

```bash
cd frontend

# All Tests
npm test

# With Coverage
npm test -- --coverage

# Specific File
npm test -- Button.test.tsx

# Watch Mode
npm test -- --watch

# Update Snapshots
npm test -- -u

# Verbose
npm test -- --verbose
```

**Storybook** :

```bash
cd frontend

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Writing Good Tests

**Test Structure (AAA [Arrange-Act-Assert] Pattern)** :

```python
def test_user_registration():
    # Arrange - Set Up Test Data
    user_data = {
        "email": "test@example.com",
        "password": "SecurePass123!",
        "username": "testuser"
    }

    # Act - Perform the Action
    response = client.post("/api/auth/register", json=user_data)

    # Assert - Verify Results
    assert response.status_code == 201
    assert response.json()["email"] == user_data["email"]
    assert "password" not in response.json()
```

**ReactJS Component Testing** :

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("Calls onClick when Clicked", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Disables Button when 'disabled' Property is true", () => {
    render(<Button disabled>Click Me</Button>);

    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });
});
```

**Best Practices** :

- ✅ Test Behavior, Not Implementation
- ✅ Use Descriptive Test Names
- ✅ One Logical Assertion Per Test
- ✅ Use Factories / Fixtures for Test Data
- ✅ Mock External Dependencies
- ✅ Test Edge Cases & Errors
- ✅ Keep Tests Fast
- ✅ Make Tests Independent

**Don'ts** :

- ❌ Test Framework Code
- ❌ Test 3rd Party Libraries
- ❌ Write Brittle Tests (Too Specific)
- ❌ Skip Error Cases
- ❌ Ignore Failing Tests
- ❌ Test Private Methods Directly

## Scaffolding New Projects

### Using This Boilerplate as a Template

When Creating a New Project from this Boilerplate :

#### Step 1 : Create New Repository

**Option A : GitHub Template**

1. Click `Use this template` on GitHub
2. Name Your New Repository
3. Clone Locally

**Option B : Manual Clone**

```bash
# Clone Boilerplate
git clone https://github.com/jeet-khondker/pend-boilerplate.git my-new-project

# Remove Original Git History
cd my-new-project
rm -rf .git

# Initialize New Repository
git init
git add .
git commit -m "chore : Initial Commit from PEND Stack Boilerplate"
```

#### Step 2 : Customize Configuration

```bash
# 1. Update Project Name Throughout
# Replace "pend-boilerplate" with Your Project Name
# Files to Update :
# - README.md
# - package.json
# - docker-compose.yml
# - .env.example files
# - Documentation Files

# 2. Configure Environment
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
cp mobile/.env.example mobile/.env

# Edit .env Files with Your Configuration

# 3. Update Branding
# - Update Logos
# - Change Color Scheme in globals.css
# - Update Meta Tags
```

#### Step 3 : Configure GitHub

```bash
# 1. Create New GitHub Repository
gh repo create my-new-project --private

# 2. Push Code
git remote add origin https://github.com/your-username/my-new-project.git
git branch -M main
git push -u origin main

# 3. Create Environment Branches
git checkout -b devEnv
git push origin devEnv

git checkout -b stagingEnv
git push origin stagingEnv

git checkout -b prodEnv
git push origin prodEnv

git checkout main
```

#### Step 4 : Set Up Branch Protection

Follow the **Branch Protection Rules** Section Above & Configure Based on Your Team Size.

**Solo Developer** :

- 0 Approvals Required
- CI Checks Enforced

**Team** :

- 1-2 Approvals Required
- Create `CODEOWNERS.md` File
- Configure Review Assignments

#### Step 5 : Configure GitHub Secrets

See `documentation/ci-cd/GITHUB_SECRETS_SETUP.md` for Detailed Instructions.

**Required Secrets** :

```bash
# In GitHub : Settings → Secrets and variables → Actions

# Optional (But Recommended) :
CODECOV_TOKEN=xxx           # Code Coverage
CHROMATIC_PROJECT_TOKEN=xxx # Storybook Deployment
EXPO_TOKEN=xxx              # Mobile Builds
```

#### Step 6 : Customize CI / CD

```bash
# Review & Update :
.github/workflows/ci.yml    # Continuous Integration
.github/workflows/cd.yml    # Continuous Deployment

# Adjust for Your Needs:
# - Test Coverage Thresholds
# - Deployment Targets
# - Environment Variables
# - Notification Channels
```

#### Step 7 : Initial Development

```bash
# 1. Run Setup
./scripts/setup.sh

# 2. Start Development
./scripts/dev-start.sh

# 3. Verify Everything Works
# - Backend : http://localhost:8000
# - Frontend : http://localhost:3000
# - API Documentation : http://localhost:8000/swagger/

# 4. Run Tests
# Backend Tests
cd backend
pytest

# Frontend Tests
cd frontend
npm test

# 5. Make Your First Feature
git checkout -b feature/yourname/initial-setup-1
# ... Make Changes ...
git commit -m "feature : Customized Boilerplate for [project-name]"
git push origin feature/yourname/initial-setup-1
```

### Customization Checklist

Use this Checklist when Scaffolding :

**Configuration** :

- [ ] Updated Project Name Everywhere
- [ ] Configured Environment Variables
- [ ] Updated Database Names
- [ ] Configured API URLs
- [ ] Updated Branding / Logos
- [ ] Customized Color Scheme

**GitHub** :

- [ ] Created Repository
- [ ] Pushed Code
- [ ] Created Environment Branches
- [ ] Configured Branch Protection
- [ ] Set Up GitHub Secrets
- [ ] Enabled GitHub Actions

**Documentation** :

- [ ] Updated `README.md`
- [ ] Customized `CONTRIBUTING.md`
- [ ] Updated `CHANGELOG.md`
- [ ] Reviewed `documentation/`

**Testing** :

- [ ] Ran Setup Script Successfully
- [ ] All Tests Passing
- [ ] Docker Containers Working
- [ ] CI / CD Pipeline Working
- [ ] Deployments Successful

**Team Setup (If Applicable)** :

- [ ] Added Team Members
- [ ] Configured `CODEOWNERS.md`
- [ ] Set Up Review Assignments
- [ ] Updated Approval Requirements
- [ ] Configured Notifications

## Additional Resources

### Documentation

**Project Documentation** :

- [README.md](../README.md) - Project Overview
- [CHANGELOG.md](../CHANGELOG.md) - Version History
- [CI / CD Overview](../documentation/ci-cd/README.md)
- [Testing Strategy](../documentation/ci-cd/STRATEGY.md)
- [Upgrade Guide](../documentation/ci-cd/UPGRADE_GUIDE.md)
- [Troubleshooting](../documentation/ci-cd/TROUBLESHOOTING.md)

**Component Documentation** :

- [Backend Guide](../backend/README.md)
- [Frontend Guide](../frontend/README.md)
- [Database Guide](../database/init/README.md)
- [Scripts Guide](../scripts/README.md)
- [Icon Integration](../frontend/src/components/ui/Icon.README.md)

**External Resources** :

- [Django Documentation](https://docs.djangoproject.com/)
- [NextJS Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Getting Help

**For This Boilerplate** :

- Open an Issue on GitHub
- Check Existing Issues First
- Use Appropriate Issue Template
- Provide Reproduction Steps

**For Projects Using This Boilerplate** :

- Follow Your Project's Support Channels
- Reference this Guide for Contribution Standards
- Maintain Similar Documentation Structure

### Community

**Contributing to the Boilerplate** :

- Improvements Welcome
- Follow this Contribution Guide
- Ensure All Tests Pass
- Update Documentation

**Sharing Your Projects** :

- Consider Open-Sourcing
- Share Your Improvements Back
- Help Improve the Boilerplate

---

## Summary

**Quick Reference** :

1. **Branch Naming** : `[tag]/[username]/[story-id]`
2. **Available Tags** : 13 tags (feature, fix, documentation, style, refactor, data, test, chore, cicd, performance, devEx, revert, miscellaneous)
3. **PR Process** : Create Branch → Make Changes → Push → Create PR → CI Checks → Review → Merge
4. **Commit Format** : Conventional Commits (`type : description`)
5. **Protection** : All Branches Protected, CI Required, Approvals Configurable
6. **Special Branches** : `backup/*` (Immutable), `chore/upgrade/*` (Enhanced Validation)
7. **Testing** : 80%+ Coverage, All Tests Must Pass
8. **Scaffolding** : Template-Ready, Customize & Deploy

---

**Thank You for Using PEND Boilerplate!** 🎉

This Boilerplate provides a Solid Foundation for Your Next Project. Follow these Guidelines to Maintain Quality & Enable Smooth Team Collaboration.

**Questions?** Check the Documentation / Open an Issue.

**Version** : 1.0.0  
**Last Updated** : December 29, 2025  
**Maintainer** : Jeet Z. H. Khondker
