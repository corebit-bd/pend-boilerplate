# CI / CD Troubleshooting Guide

## 🔍 Common Issues & Solutions

---

## 1. GitGuardian False Positives

### ❌ Issue

GitGuardian flags Test Credentials in Workflow Files :

```bash
⚠️ GitGuardian has uncovered 1 secret
Secret: Generic Password
File: .github/workflows/ci.yml
```

### ✅ Solution

This is a **False Positive** for Test Credentials.

**Click** : `Ignore` → Select `"This is not a secret (false positive)"`

**Why it's safe?** :

- Ephemeral Test Database (Destroyed After Each Execution)
- Only Exists during CI Workflow
- Not Accessible Externally
- Standard Industry Practice

**Add Comment** :

```
Ephemeral CI Test Database Password.
Container Destroyed After Workflow Completion.
Standard Practice for GitHub Actions.
```

---

## 2. Missing GitHub Secrets

### ❌ Issue

```bash
Error: Secret CODECOV_TOKEN not found
Error: Secret CHROMATIC_PROJECT_TOKEN not found
Error: Secret EXPO_TOKEN not found
```

### ✅ Solution

Configure Required Secrets in GitHub :

1. Go to `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Add Each Required Secret

**See** : [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md) for Detailed Instructions

### Quick Fix (Skip Optional Secrets)

If you don't need Coverage / Storybook :

- Coverage Upload will Fail (Tests Still Pass)
- Storybook won't Deploy to Chromatic
- Mobile Builds Require `EXPO_TOKEN` (Cannot Skip)

---

## 3. Codecov Upload Fails

### ❌ Issue

```
Error : Codecov : Failed to properly upload report
```

### ✅ Solutions

#### Option A : Invalid Token

1. Go to https://codecov.io
2. Find Your Repository
3. Go to `Settings` → `General`
4. Copy Upload Token
5. Update GitHub Secret : `CODECOV_TOKEN`

#### Option B : Repository Not Added

1. Go to https://codecov.io
2. Click `Add new repository`
3. Select `pend-boilerplate`
4. Copy Token & Add to GitHub Secrets

#### Option C : Skip Codecov (Not Recommended)

Comment Out in `.github/workflows/ci.yml` :

```yaml
# - name: Upload Coverage to Codecov
#   uses: codecov/codecov-action@v4
#   with:
#     token: ${{ secrets.CODECOV_TOKEN }}
```

---

## 4. Chromatic Deployment Fails

### ❌ Issue

```
Error : Chromatic : Could not authenticate
```

### ✅ Solutions

#### Option A : Invalid Project Token

1. Go to https://www.chromatic.com/builds
2. Select Your Project
3. Go to `Manage` → `Configure`
4. Copy Project Token (Starts With `chpt_`)
5. Update GitHub Secret : `CHROMATIC_PROJECT_TOKEN`

#### Option B : Project Not Created

1. Go to https://www.chromatic.com
2. Click `Add project`
3. Connect Your Repository
4. Choose `Storybook` Type
5. Copy Token & Add to GitHub Secrets

#### Option C : Skip Chromatic

Comment Out Job in `.github/workflows/ci.yml` :

```yaml
# storybook-chromatic:
#   name: Storybook & Chromatic
#   ...
```

---

## 5. Mobile Builds Fail

### ❌ Issue

```
Error : EXPO_TOKEN not found
Error : Authentication failed
```

### ✅ Solutions

#### Option A : Invalid Token

1. Go to https://expo.dev/accounts/[username]/settings/access-tokens
2. Delete Old Token
3. Create New Token with **All Scopes Selected**
4. Copy Token Immediately (Only Shown Once!)
5. Update GitHub Secret : `EXPO_TOKEN`

#### Option B : Insufficient Permissions

Token Needs **ALL Scopes** :

- Read User Data
- Read Projects
- Write Builds
- Publish Updates

**Create New Token with ALL Permissions!**

#### Option C : Skip Mobile Builds

If Not Using Mobile : Comment Out in `.github/workflows/ci.yml`

```yaml
# mobile-build-android:
#   ...
# mobile-build-ios:
#   ...
```

---

## 6. Docker Build Fails

### ❌ Issue

```
Error : failed to solve: process "/bin/sh -c npm install" did not complete successfully
Error: COPY failed: file not found
```

### ✅ Solutions

#### Option A : Missing `.dockerignore`

Ensure `.dockerignore` Exists :

**backend/.dockerignore** :

```
__pycache__/
*.py[cod]
.venv/
venv/
.pytest_cache/
htmlcov/
.coverage
*.env
.git/
```

**frontend/.dockerignore** :

```
node_modules/
.next/
.env*
npm-debug.log*
.git/
coverage/
```

#### Option B : Build Context Too Large

```bash
# Clean Docker cache
docker system prune -a --volumes -f

# Rebuild
./scripts/build.sh --cleanup
```

#### Option C : Syntax Error

Validate Dockerfile :

1. Check Indentation
2. Verify File Paths
3. Test Locally : `docker build -t test .`

---

## 7. Tests Pass Locally But Fail in CI

### ❌ Issue

Local Tests Pass But CI Fails with :

```
ModuleNotFoundError: No module named 'xxx'
Error: Cannot find module 'xxx'
```

### ✅ Solutions

#### Option A : Dependency Version Mismatch

**Backend** :

```bash
# Regenerate requirements.txt
cd backend
pip freeze > requirements.txt
git add requirements.txt
git commit -m "fix : Updated Python Library Packages & its Necessary Dependencies"
```

**Frontend** :

```bash
# Ensure package-lock.json is committed
cd frontend
npm install
git add package-lock.json
git commit -m "fix: update Node dependencies"
```

#### Option B : Python / Node Version Mismatch

Check `.github/workflows/ci.yml` :

```yaml
env:
  PYTHON_VERSION: 3.13 # MUST Match Your Local Version
  NODE_VERSION: 24 # MUST Match Your Local Version
```

#### Option C : Missing Environment Variables

Add to CI Workflow :

```yaml
env:
  CUSTOM_VAR: value
```

---

## 8. PR Checks Required But Missing

### ❌ Issue

```
⚠️ Some checks haven't completed yet
⚠️ Merging is blocked - Required checks must pass
```

### ✅ Solutions

#### Option A : Wait for Checks

All CI Jobs MUST Complete (Can Take 10 to 15 Minutes)

#### Option B : Re-run Failed Checks

1. Go to `Actions` Tab
2. Find Failed Workflow
3. Click `Re-run failed jobs`

#### Option C : Check Branch Protection

1. Go to `Settings` → `Branches`
2. Find Rule for `main`
3. Verify Required Checks are Listed
4. Uncheck If Blocking Legitimate Merges

---

## 9. Workflow Not Found Error

### ❌ Issue

```
Error : Unable to find workflow named 'CI Pipeline'
```

### ✅ Solutions

#### Option A : YAML Syntax Error

Validate Workflow File :

```bash
# Use Online YAML Validator
# https://www.yamllint.com/

# Or Install "yamllint"
pip install yamllint
yamllint .github/workflows/ci.yml
```

#### Option B : File Location Wrong

Ensure Files are in Correct Location :

```
.github/
└── workflows/
    ├── ci.yml    # MUST Be Here
    └── cd.yml    # MUST Be Here
```

#### Option C : Indentation Error

YAML is Sensitive to Indentation :

- Use **Spaces**, Not Tabs ↠
- Consistent Indentation (2 Spaces)

---

## 10. Deployment Fails

### ❌ Issue

```
Error : Deployment to [environment] failed
Error : Unable to connect to server
```

### ✅ Solutions

#### Option A : Server Not Configured

CD Pipeline has Placeholders :

```yaml
# Replace with Actual Deployment Commands
# ssh deploy@server.com "cd /app && git pull"
```

You Need To :

1. Set Up Deployment Servers
2. Configure SSH Keys
3. Update Deployment Scripts
4. Add Server Secrets to GitHub

#### Option B : Database Migration Fails

```bash
# Run Migrations Manually
ssh deploy@dev-server.com
cd /opt/pend
docker-compose exec backend python manage.py migrate
```

#### Option C : Docker Compose Not Found

Install On Deployment Server :

```bash
ssh deploy@server.com
sudo apt-get update
sudo apt-get install docker-compose
```

---

## 11. E2E Tests Fail in CI

### ❌ Issue

```
Error : Timed out waiting for server
Error : Connection refused
```

### ✅ Solutions

#### Option A : Server Not Ready

Increase Wait Time in Workflow :

```yaml
- name: Start Backend Server
  run: |
    cd backend
    python manage.py runserver &
    sleep 15  # Increased from 10
```

#### Option B : Port Already in Use

Check for Port Conflicts :

```yaml
# Use Different Ports
python manage.py runserver 0.0.0.0:8001 &
```

#### Option C : Skip E2E in CI

If Not Critical :

```yaml
e2e-tests:
  if: false # Disable Temporarily
```

---

## 12. Coverage Upload Partial

### ❌ Issue

```
Warning : Some coverage files were not found
```

### ✅ Solutions

#### Option A : Missing Coverage Files

Ensure Tests Generate Coverage :

```bash
# Backend
cd backend
pytest --cov --cov-report=xml

# Frontend
cd frontend
npm test -- --coverage
```

#### Option B : Wrong File Path

Check Paths in Workflow :

```yaml
- name: Upload Coverage
  with:
    file: ./backend/coverage.xml # Verify Path
```

---

## 13. Storybook Build Fails

### ❌ Issue

```
Error : Build failed with 1 error
Error : Module not found
```

### ✅ Solutions

#### Option A : Missing Dependencies

```bash
cd frontend
npm install
npm run build-storybook
```

#### Option B : Storybook Configuration

Verify `.storybook/main.ts` :

```typescript
export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  // ... Rest of Configuration
};
```

#### Option C : Component Import Error

Check Story Imports :

```typescript
import { Button } from "@/components/ui/Button"; // Verify Correct Path
```

---

## 🆘 Still Having Issues?

### Debug Steps

1. **Check Workflow Logs**

   - Go to `Actions` Tab
   - Click Failed Workflow
   - Expand Failed Jobs
   - Read Error Messages Carefully

2. **Run Locally**

   ```bash
   # Backend
   cd backend && pytest -v

   # Frontend
   cd frontend && npm test -- --verbose

   # Docker
   docker-compose up --build
   ```

3. **Enable Debug Logging**

   Add to Workflow :

   ```yaml
   env:
     ACTIONS_STEP_DEBUG: true
     ACTIONS_RUNNER_DEBUG: true
   ```

4. **Search GitHub Issues**

   - Check Closed Issues for Solutions
   - Search for Specific Error Messages

### Get Help

- 💬 [GitHub Discussions](https://github.com/your-org/pend-boilerplate/discussions)
- 🐛 [Report Bug](https://github.com/your-org/pend-boilerplate/issues/new)
- 📚 [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 📋 Pre-Flight Checklist

Before Pushing to CI, Verify :

- [ ] All Tests Pass Locally
- [ ] Dependencies are Committed
- [ ] `.env` Files Not Committed
- [ ] GitHub Secrets Configured
- [ ] Branch Naming Convention Followed
- [ ] Commit Messages Follow Format
- [ ] Pull Request (PR) Template Filled Out

**This Prevents 90% of CI Failures!**

---

**Last Updated:** December 2025
**Version:** 1.0.0
