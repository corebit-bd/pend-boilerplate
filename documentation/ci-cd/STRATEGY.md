# CI / CD Pipeline Strategy

## 🎯 Cost-Optimized Testing Approach

This Boilerplate uses a **Hybrid Testing Strategy** to stay within GitHub's Free Tier (2,000 Minutes / Month) while Maintaining Professional Code Quality Standards.

## 🔄 Git Workflow Integration

### Branch Structure

```
[relevant-tag]/[dev-username]/[user-story-id]
    ↓ (PR & Review)
  main (Stable Integration Point)
    ↓ (Environment Promotion)
  devEnv (Development Server Deployment)
    ↓ (After Development Testing)
  stagingEnv (QA Server Deployment)
    ↓ (After QA / Stakeholder Approval)
  prodEnv (Production Server Deployment)
```

### Relevant Tags

- **`feature/`** : Indication of New Feature or Functionality or a significant enhancement into the system

- **`fix/`** : Signifies Bug or Error Fixes in the system

- **`documentation/`** : Changes to the Documentation File(s)

- **`style/`** : Addition / Changes to Design Styles of the Application UI / UX

- **`refactor/`** : Code Refactoring (Variable Renaming / Code Restructuring or Formatting) that doesn't affect Functionality

- **`data/`** : Used for Database, Information & Data Manipulation

- **`test/`** : Adding, Fixing or Modifying Tests; No Production Code Change

- **`chore/`** : Updating Build Scripts / Upgrading Dependencies, Maintenance & Changes in Tools; No Production Code Change

- **`cicd/`** : Changes to CI / CD Configuration or Scripts

- **`performance/`** : Performance Improvements / Optimization Changes

- **`devEx/`** : Developers' Experience : Use for Improvement of Developers' Experience

- **`revert/`** : Undoing the Changes made by a Previous Commit

- **`miscellaneous/`** : Use for anything that does not clearly fall into any of the previous categories

### Special Maintenance Branches

#### Backup Branches

**Format** : `backup/pre-[update-name]-[YYYYMMDD]`

**Purpose** : Safety Snapshots Before Major Upgrades

**Examples** :

```bash
backup/pre-django5-20241218 # Django Upgrade : Backup Taken On December 18, 2024
backup/pre-nextjs16-20241220 # NextJS Upgrade : Backup Taken On December 20, 2024
```

**CI / CD** : No Testing / Deployment (Snapshot Only)

#### Upgrade Branches

**Format** : `chore/upgrade/[module]`

**Purpose** : Major Framework / Dependency Version Upgrades Requiring Careful Testing

**Examples** :

```bash
chore/upgrade/backend     # Django, Python, Backend Dependencies Upgrade
chore/upgrade/frontend    # NextJS, ReactJS, Frontend Dependencies Upgrade
chore/upgrade/mobile      # Expo, React Native, Mobile Dependencies Upgrade
chore/upgrade/database    # PostgreSQL Upgrade
```

**CI/CD** : Full Testing + Manual Approval Required

**Workflow** :

```bash
# Step 1 : Create Backup FIRST (⚠️ REQUIRED)
git checkout main
git pull origin main
git checkout -b backup/pre-django5-20241218
git push origin backup/pre-django5-20241218

# Step 2 : Create Upgrade Branch
git checkout main
git checkout -b chore/upgrade/backend

# Step 3 : Make Upgrade Changes
# - Update requirements.txt / package.json
# - Fix Breaking Changes
# - Update Documentation
# - Add Migration Notes

# Step 4 : Test Extensively
cd backend && pytest
cd frontend && npm test

# Step 5 : Create Pull Request (PR) with [UPGRADE] Tag
git add .
git commit -m "chore (#issue) : Upgraded Django from 5.1 to 5.2

BREAKING CHANGES :
- Updated Python to 3.13
- Migrated Deprecated Imports
- Updated 3rd Party Packages

Testing :
- All Tests Pass Locally
- Tested in Isolated Environment
- Database Migrations Verified"

git push origin chore/upgrade/backend

# Step 6 : Create PR to Main Branch (main)
# Title : [UPGRADE] chore (#issue) : Upgraded Django from 5.1 to 5.2
# Add Detailed Description of Changes & Testing

# Step 7 : Deploy to Development Environment Branch (devEnv) for Testing
# After PR Merge :
git checkout devEnv
git merge main
git push origin devEnv
# Test Thoroughly for 1-2 Days

# Step 8 : Promote Cautiously
# Only After Extensive Testing :
# devEnv (After Testing 2 Days) → stagingEnv (After Testing 1 Week) → prodEnv
```

**Upgrade PR Checklist** :

- [ ] Backup Branch Created
- [ ] All Dependencies Updated
- [ ] Breaking Changes Documented
- [ ] Migration Guide Included
- [ ] All Tests Pass
- [ ] Tested in Isolated Environment
- [ ] Team Notified of Upgrade
- [ ] Rollback Plan Documented

### Complete Developer Workflow

#### 1. Create Branch from Main Branch `main`

```bash
# Always Start from Main Branch (main)
git checkout main
git pull origin main

# Create Your Tag Branch related to the Task you were assigned to
git checkout -b [tag]/[your-username]/[user-story-id]
```

#### 2. Develop & Commit

```bash
# Make Your Changes
git add .

# Use Conventional Commits
git commit -m "feature : Added User Authentication Module"
git commit -m "fix : Resolved Login Timeout Issue"
git commit -m "documentation : Updated API Documentation"
```

**Conventional Commit Format** :

```
<tag> : <description>

feature : Created New Feature for ... .. .
fix : Fixed Bug for ... .. .
documentation : Created Documentation for ... .. .
style : Added CSS Design Styling for ... .. .
refactor : Refactored ... .. .
data : Created SQL Query for ... .. .
test : Created Tests for ... .. .
chore : Configured Dependencies of ... .. .
cicd : Created CI / CD Pipeline of ... .. .
performance : Improved Performance of ... .. .
devEx : Improved Developer's Experience by ... .. .
revert : Reverted Commit Message commit_id for ... .. .
miscellaneous : Added Logo Image for ... .. .
```

#### 3. Run Tests Locally (Required)

```bash
# Backend Tests
cd backend
source venv/bin/activate  # OR : . venv/bin/activate
pytest
black --check .
flake8 .
isort --check-only .
cd ..

# Frontend Tests
cd frontend
npm test
npm run lint
npm run type-check
cd ..

# Mobile Tests
cd mobile
npm test
npm run lint
cd ..
```

**⚠️ Do Not Push If Tests Fail Locally!**

#### 4. Push Created Branch

```bash
git push origin [tag]/[your-username]/[user-story-id]
```

#### 5. Create Pull Request to Main Branch (`main`)

1. Go to GitHub Repository
2. Click "Compare & pull request" Button
3. **Base** : `main`
4. **Compare** : `[tag]/[your-username]/[user-story-id]`
5. Fill out the PR Template Completely :
   - Branch Information
   - Type of Change
   - Description
   - Related Issues
   - Testing Details
   - Screenshots (If UI Changes)
   - Complete All Checklists
6. Click "Create pull request"

#### 6. Wait for CI to Pass

**Automated Checks** :

- ✅ Backend Tests (pytest)
- ✅ Frontend Tests (Jest)
- ✅ Mobile Tests
- ✅ Linting (Black, ESLint)
- ✅ Type Checking (TypeScript)
- ✅ Docker Builds
- ✅ Security Scans (Trivy)
- ✅ E2E Tests (Cypress)

**All Checks MUST PASS Before Merge!**
❌ Failed CI = Cannot Merge

#### 7. Code Review Process

- Request Review from Team Members
- Address Review Comments
- Push Additional Commits If Needed
- Wait for Approval

#### 8. Merge to Main Branch (`main`)

Once Approved & CI Passes :

- Click "Merge pull request"
- Delete the Created Branch After Merge
- CI will Run Again on `main` Branch ✅

#### 9. Environment Promotion (Maintainers Only)

```bash
# Promote to Development Environment Branch
git checkout devEnv
git pull origin devEnv
git merge main
git push origin devEnv
# → Deploys to Development Server 🚀

# After Testing, Promote to Staging Environment Branch
git checkout stagingEnv
git pull origin stagingEnv
git merge devEnv
git push origin stagingEnv
# → Deploys to QA Server 🚀

# After QA Approval, Promote to Production Environment Branch
git checkout prodEnv
git pull origin prodEnv
git merge stagingEnv
git push origin prodEnv
# → Deploys to Production Server 🚀
```

### Quality Gates Summary

Every Code Change Passes Through **Minimum 7 Quality Gates** :

```
Gate 1 : PR to main → CI : Full Tests ✅
Gate 2 : Merge to main → CI : Full Tests ✅
Gate 3 : Merge to devEnv → CD : Deploy + Smoke Tests ✅
Gate 4 : PR to stagingEnv → CI : Essential Tests ✅
Gate 5 : Merge to stagingEnv → CD : Deploy + Smoke Tests ✅
Gate 6 : PR to prodEnv → CI : Essential Tests ✅
Gate 7 : Merge to prodEnv → CD : Production Deploy ✅
```

**Result** : Highly Reliable Deployments with Multiple Validation Points! 🛡️

---

### Testing Strategy

#### ✅ **Full CI on Pushes** (`main`, `devEnv`)

- Backend Tests + Linting
- Frontend Tests + Linting
- Mobile Tests
- Docker Builds
- Security Scans
- Storybook Deployment
- Mobile Builds (Android / iOS)

**Why?** : These are Active Development Branches where Most Changes Occur.

#### ✅ **Essential CI On PRs** (All Branches)

- Backend Tests
- Frontend Tests
- Mobile Tests
- Docker Builds
- Security Scans
- End-To-End (E2E) Tests (Integration Validation)

**Why?** : Catches Issues Before Code is Merged to Any Branch.

#### ⏭️ **Skipped** (`stagingEnv` / `prodEnv` Pushes)

- No CI on Direct Pushes to `stagingEnv` / `prodEnv` Environment Branches
- Storybook Builds
- Mobile Preview Builds

**Why?** : Code Reaching `stagingEnv` / `prodEnv` Environment Branches has already been Tested in `main` / `devEnv` Environment Branches & Validated via Pull Requests (PRs).

---

## 🔐 Required Setup : GitHub Secrets

**BEFORE Running CI / CD Pipelines, You MUST Configure GitHub Secrets.**

### Quick Setup Checklist

- [ ] `CODECOV_TOKEN` - Code Coverage Reporting (Optional)
- [ ] `CHROMATIC_PROJECT_TOKEN` - Storybook Deployment (Optional)
- [ ] `EXPO_TOKEN` - Mobile Application Builds (Required for Mobile)

**📚 Detailed Instructions** : See [GitHub Secrets Setup Guide](./GITHUB_SECRETS_SETUP.md)

### Why This Matters?

Without these Secrets :

- ⚠️ Codecov Uploads will Fail (Coverage Still Works Locally)
- ⚠️ Storybook won't Deploy to Chromatic
- ❌ Mobile Builds will Fail Completely

**All Secrets are FREE for Open-Source Projects!**

---

## 📊 Monthly Usage Estimate

| Branch             | Pushes    | CI Duration | Monthly Minutes      |
| ------------------ | --------- | ----------- | -------------------- |
| `main`             | 5 / Day   | 17 Minutes  | 1,870 Minutes        |
| `devEnv`           | 2 / Day   | 17 Minutes  | 748 Minutes          |
| `stagingEnv` (PRs) | 1 / Week  | 9 Minutes   | 36 Minutes           |
| `prodEnv` (PRs)    | 2 / Month | 9 Minutes   | 18 Minutes           |
| **TOTAL**          |           |             | **1,672 Minutes** ✅ |

**GitHub Free Tier** : 2,000 Minutes / Month  
**Remaining** : 328 Minutes Buffer

---

## 🔧 Customization Options

### Option 1 : Enable Full Testing (All Branches)

If Your Project has Budget for GitHub Actions Or You are on a Paid Plan :

**Edit `.github/workflows/ci.yml` Line 17-18** :

```yaml
on:
  push:
    branches:
      - main
      - devEnv
      - stagingEnv # Add This
      - prodEnv # Add This
```

**Impact** : ~2,672 Minutes / Month (~$5.38 / Month Overage)

### Option 2 : Reduce Testing (Budget Constrained)

If You need to Reduce Costs Further :

**Edit `.github/workflows/ci.yml`** :

```yaml
on:
  push:
    branches:
      - main # Only Test Main Branch
```

**Impact** : ~1,200 Minutes / Month (Well Under Free Tier)  
**Trade-off** : Less Coverage On `devEnv` Environment Branch

### Option 3 : Conditional Expensive Jobs

Skip Mobile Builds Or Storybook with Commit Messages :

```bash
git commit -m "fix : Updated API [skip-mobile] [skip-storybook]"
```

---

## 🛡️ Safety Guarantees

Despite the Cost Optimization, Code Quality is Maintained through :

### Multiple Test Gates

Feature Development :

1. PR to `main` → Full CI ✅
2. Push to `main` → Full CI ✅
3. Push to `devEnv` → Full CI ✅
4. PR to `stagingEnv` → Essential CI ✅
5. PR to `prodEnv` → Essential CI ✅

### CD Pipeline Safety

- Tests Run Before Every Deployment
- Smoke Tests After Deployment (Non-Production)
- Automatic Rollback On Production Failures

### Result

Every Line of Code is Tested **At Least 3 Times** Before Reaching Production!

---

## 📈 When to Upgrade

Consider Enabling Full Testing on All Branches When :

1. **Team Growth** : More Developers = More Pushes
2. **Critical Applications** : HealthCare, FinTech, Etc.
3. **Paid GitHub Plan** : 3,000+ Minutes Included
4. **Self-Hosted Runners** : Unlimited Free Minutes

---

## 🎓 Learning Resources

Understanding Our CI / CD Decisions :

- [GitHub Actions Pricing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
- [Optimizing CI / CD Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)
- [Cost-Effective Testing Strategies](https://martinfowler.com/articles/practical-test-pyramid.html)

---

## 🔍 Monitoring Usage

Track Your GitHub Actions Usage :

1. Go to `Settings` → `Billing` → `Actions`
2. View Current Usage & Limits
3. Set Up Spending Limits (Optional)

**Pro Tip** : Enable Email Notifications When You Reach 75% of Your Limit.

---

## ✅ Summary

| Feature             | Status | Notes                  |
| ------------------- | ------ | ---------------------- |
| Free Tier Compliant | ✅     | ~1,672 / 2,000 Minutes |
| All PRs Tested      | ✅     | Before Merge           |
| Production Safety   | ✅     | 3+ Test Gates          |
| Cost Conscious      | ✅     | Smart Optimization     |
| Easily Upgradeable  | ✅     | One-Line Change        |

**🚀 Bottom Line** : Professional CI / CD that Respects Your Budget 💰
