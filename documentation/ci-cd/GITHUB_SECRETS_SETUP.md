# 🔐 GitHub Secrets Setup Guide

## Overview

Before running the CI / CD Pipelines, you need to configure GitHub Secrets. These are Secure Environment Variables that store Sensitive Tokens & API Keys required by the Workflows.

**⚠️ IMPORTANT** : Never commit Secrets Directly to your Repository. Always Use GitHub Secrets.

---

## Required Secrets

The PEND Stack Boilerplate requires 3 Mandatory Secrets for Full CI / CD Functionality :

| Secret Name               | Purpose                        | Required For | Priority                      |
| ------------------------- | ------------------------------ | ------------ | ----------------------------- |
| `CODECOV_TOKEN`           | Upload Test Coverage Reports   | CI Pipeline  | 🟡 Optional                   |
| `CHROMATIC_PROJECT_TOKEN` | Deploy Storybook for UI Review | CI Pipeline  | 🟡 Optional                   |
| `EXPO_TOKEN`              | Build Mobile Applications      | CI Pipeline  | 🔴 Required (If Using Mobile) |

**Note** : `GITHUB_TOKEN` is Automatically Provided by GitHub Actions - **Do Not Add it Manually**.

---

## Setup Instructions

### Step 1 : Access GitHub Secrets

1. Go to Your GitHub Repository
2. Click `Settings` (Top Menu)
3. Navigate to `Secrets and variables` → `Actions` (Left Sidebar)
4. Click `New repository secret`

---

## ① `CODECOV_TOKEN` (Optional)

It is the Token for Uploading Code Coverage Reports to [Codecov.io](https://codecov.io) for Visualization & Tracking.

### Purpose

- Visualize Test Coverage Over Time
- Track Coverage Trends
- Display Coverage Badges
- Get Coverage Reports in Pull Requests (PRs)

### How to get it ?

1. **Sign Up for Codecov** :

   - Go To [Codecov.io](https://codecov.io)
   - Click **Sign up with GitHub**
   - Authorize Codecov to Access Your Repositories

2. **Add Your Repository** :

   - Click **Add new repository**
   - Select Your Repository
   - Codecov will Display Your Upload Token

3. **Copy the Token** :
   Example Format :

   ```
   a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

4. **Add to GitHub** :
   - **Name** : `CODECOV_TOKEN`
   - **Secret** : (Paste Your Token)
   - Click **Add secret**

### What happens without it ?

- ⚠️ Coverage Upload Step will Fail
- ✅ Tests will still Run Successfully
- ℹ️ You just won't see Coverage Reports in Codecov

### Cost

- ✅ **FREE** for Open-Source Projects
- 💰 **Paid** for Private Repositories (Starts At $10/Month)

---

## ② `CHROMATIC_PROJECT_TOKEN` (Optional)

It is the Token for deploying Storybook to [Chromatic](https://www.chromatic.com) for Visual Testing & Review.

### Purpose

- Deploy Storybook for Team Review
- Visual Regression Testing
- UI Component Documentation
- Shareable Component Library

### How to get it ?

1. **Sign Up for Chromatic** :

   - Go to [Chromatic](https://www.chromatic.com)
   - Click **Sign in with GitHub**
   - Authorize Chromatic

2. **Create A Project** :

   - Click **Add project**
   - Select Your Repository
   - Choose **Storybook** as Your Project Type

3. **Get Your Project Token** :

   - After Project Creation, You will see :

   ```bash
   npx chromatic --project-token=chpt_xxxxxxxxxxxxxxxx
   ```

   - Copy the Token (Starts With `chpt_`)

4. **Add to GitHub** :
   - **Name** : `CHROMATIC_PROJECT_TOKEN`
   - **Secret** : `chpt_xxxxxxxxxxxxxxxx`
   - Click **Add secret**

### What happens without it ?

- ⚠️ Storybook Deployment will Fail
- ✅ Storybook will still Build Locally
- ℹ️ Team won't have Online Access to Component Library

### Cost

- ✅ **FREE** for Open-Source Projects (5,000 Snapshots/Month)
- 💰 **Paid** for Private Projects (Starts At $149/Month)

## ③ `EXPO_TOKEN` (Required for Mobile)

It is the Authentication Token for [Expo](https://expo.dev) to Build & Publish Mobile Applications.

### Purpose

- Build Android / iOS Applications
- Publish Updates Over-The-Air (OTA)
- Use Expo Application Services (EAS)
- Deploy to App Stores

### How to get it ?

1. **Sign up for Expo** :

   - Go to [Expo](https://expo.dev)
   - Click **Sign up** or **Log in**
   - Complete Registration

2. **Generate Access Token** :

   - Go to [Access Tokens](https://expo.dev/accounts/[your-username]/settings/access-tokens)
   - Click **Create token**
   - Give it a Name (Example : **CI / CD Pipeline**)
   - Select Scopes (Select All for Full Functionality)
   - Click **Generate token**

3. **Copy the Token Immediately** :
   Example :

   ```
   abc123def456...
   ```

   ⚠️ **You can only see this once!** Save it Securely.

4. **Add to GitHub** :
   - **Name** : `EXPO_TOKEN`
   - **Secret**: (Paste Your Token)
   - Click **Add secret**

### What happens without it ?

- ❌ Mobile Builds will Fail Completely
- ❌ Cannot Build Android / iOS Applications
- ❌ Cannot Use EAS Build

### Cost

- ✅ **FREE** Tier Available (Limited Builds)
- 💰 **Production Plan** : $29/Month (Unlimited Builds)
- 💰 **Enterprise Plan** : Custom Pricing

---

## Alternative : Skip Optional Secrets

If You don't want to set up Optional Secrets Immediately, You can :

### Option 1 : Comment Out Jobs (Temporary)

Edit `.github/workflows/ci.yml`

```yaml
# Temporarily Disable Storybook
# storybook-chromatic:
#   name: Storybook & Chromatic
#   ...

# Temporarily Disable Codecov Upload
# - name: Upload Coverage to Codecov
#   uses: codecov/codecov-action@v4
#   ...
```

### Option 2 : Add Dummy Secrets (Not Recommended)

**⚠️ Not Recommended for Production!**

For Testing Purposes Only :

- `CODECOV_TOKEN` : `dummy-token-for-testing`
- `CHROMATIC_PROJECT_TOKEN` : `dummy-token-for-testing`

The Workflows will Fail at Upload Time But will Continue Running.

---

## Verification

### Check If Secrets Are Set

1. Go to `Settings` → `Secrets and variables` → `Actions`

2. You Should See :

   ```
   ✅ CODECOV_TOKEN
   ✅ CHROMATIC_PROJECT_TOKEN
   ✅ EXPO_TOKEN
   ```

3. **You Cannot View Secret Values** - This is Intentional for Security

### Test Your Setup :

1. Create A Test Branch :

   ```bash
   # Follow Branch Naming Convention : [tag]/[username]/[description]
   git checkout main
   git pull origin main
   git checkout -b test/your-username/verify-ci-cd

   # Make a Small Test Change
   echo "# CI/CD Pipeline Test" >> README.md
   git add README.md
   git commit -m "test : Verified CI / CD Secrets Configuration"
   git push origin test/your-username/verify-ci-cd
   ```

2. Create A Pull Request (PR) To `main` Branch :

   - Go to Your Repository on Github
   - Click **Compare & pull request** Button
   - **Base / Target Branch** : `main`
   - **Comparing Branch** : test/your-username/verify-ci-cd
   - Fill Out The Pull Request (PR) Template
   - Click **Create pull request**

3. Verify CI Pipeline is Executed

   - Go to **Actions** Tab in Github
   - Find Your PR Workflow Run (Named **CI Pipeline**)
   - Watch Each Job's Execution for Success :
     ・ ✅ Backend Tests
     ・ ✅ Frontend Tests
     ・ ✅ Mobile Tests
     ・ ✅ Docker Build
     ・ ✅ Security Scan
     ・ ✅ E2E Tests (If On PR)
   - Check Secret-Related Jobs for Success :
     ・ ✅ Codecov Upload (If `CODECOV_TOKEN` Set)
     ・ ✅ Chromatic Deployment (If `CHROMATIC_PROJECT_TOKEN` Set)
     ・ ✅ Mobile Builds (If `EXPO_TOKEN` Set)

4. Environment Promotion (After PR Merge)

   ```bash
   # After PR is Merged to Main Branch "main"
   git checkout main
   git pull origin main

   # Promote to Development Environment Branch "devEnv" (Triggers CD Deployment)
   git checkout devEnv
   git merge main
   git push origin devEnv

   # Watch CD Pipeline Deploy to Development Server
   # Go to "Actions" → "CD Pipeline" → "Check deployment"
   # Verify Success of the Deployment
   ```

**Expected Workflow** :

```bash
User Feature Branch [test/username/verify-ci-cd]
    ↓ (Create PR)
  CI runs on PR ✅ (Full Test Suite)
    ↓ (Merge PR)
  CI runs on main ✅ (Full Test Suite)
    ↓ (Environment Promotion)
  Merge to devEnv
    ↓
  CD Deploys to Development Server 🚀
    ↓ (After Testing)
  Merge to stagingEnv
    ↓
  CD Deploys to QA Server 🚀
    ↓ (After Approval)
  Merge to prodEnv
    ↓
  CD Deploys to Production Server 🚀
```

---

## Security Best Practices

### ✅ DOs

- Rotate Tokens Every 90 Days
- Use Minimal Permissions for Tokens
- Delete Unused Tokens Immediately
- Use Different Tokens for Development / Production
- Enable GitHub Secret Scanning

### ❌ DON'Ts

- Commit Secrets to Repository
- Share Secrets in Chat / Email
- Use Production Tokens in Development
- Give Tokens More Permissions Than Needed
- Store Secrets in Code Comments

---

## Troubleshooting

### `Invalid token` Errors

**❌ Problem** : Token is incorrect or expired

**✅ Solution** :

1. Regenerate Token from Provider (Codecov / Chromatic / Expo)
2. Update GitHub Secret with New Value
3. Re-Execute / Re-Run Workflow

### `Secret not found` Errors

**❌ Problem** : Secret name doesn't match workflow

**✅ Solution** :

- Verify Exact Secret Name (Case-Sensitive)
- Check Spelling :
  ✅ `CODECOV_TOKEN`
  ❌ `CODECOV-TOKEN`

### Codecov Upload Fails

**❌ Problem** : Token invalid or repository not added

**✅ Solution** :

1. Go to https://codecov.io/gh/[username]/[repo]
2. Click **Settings** → **General**
3. Copy the Upload Token
4. Update GitHub Secret

### Chromatic Deployment Fails

**❌ Problem** : Token invalid or project not configured

**✅ Solution** :

1. Go to https://www.chromatic.com/builds
2. Select Your Project
3. Go to **Manage** → **Configure**
4. Copy Project Token
5. Update GitHub Secret

### Expo Builds Fail

**❌ Problem** : Token lacks required permissions

**✅ Solution** :

1. Go to https://expo.dev/accounts/[username]/settings/access-tokens
2. Delete Old Token
3. Create New Token with All Scopes Selected
4. Update GitHub Secret

---

## Cost Summary

| Service            | Open Source              | Private / Commercial                    |
| ------------------ | ------------------------ | --------------------------------------- |
| **Codecov**        | ✅ FREE                  | $10/Month                               |
| **Chromatic**      | ✅ FREE (5000 Snapshots) | $149/Month                              |
| **Expo**           | ✅ FREE (Limited)        | $29/Month                               |
| **GitHub Actions** | ✅ 2,000 Minutes/Month   | 3,000 min/month (Included in Team Plan) |

**Total Monthly Cost (If All Paid)** :

- Open Source : **$0**
- Private Project (All Services) : **~$188/Month**
- Private Project (Minimal) : **$29/Month** (Just Expo If Needed)

---

## Next Steps

After Setting Up Secrets:

1. ✅ Verify All Secrets are Added in GitHub
2. ✅ Push A Test Commit to Trigger CI / CD
3. ✅ Monitor Workflow Execution
4. ✅ Fix Any Failures
5. ✅ Set Up Branch Protection Rules
6. ✅ Configure Notifications (Optional)

---

## Quick Reference

### Workflow Files

- CI Pipeline : `.github/workflows/ci.yml`
- CD Pipeline : `.github/workflows/cd.yml`

### Secret Names (Copy-Paste Ready)

```
CODECOV_TOKEN
CHROMATIC_PROJECT_TOKEN
EXPO_TOKEN
```

### Provider URLs

- **Codecov** : https://codecov.io
- **Chromatic** : https://www.chromatic.com
- **Expo** : https://expo.dev

---

## Support

### Official Documentation

- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Codecov Setup](https://docs.codecov.com/docs/quick-start)
- [Chromatic Setup](https://www.chromatic.com/docs/ci)
- [Expo Authentication](https://docs.expo.dev/accounts/programmatic-access/)

### Common Issues

- Check [PEND Stack Discussions](https://github.com/your-org/pend-boilerplate/discussions)
- Report Bugs in [Issues](https://github.com/your-org/pend-boilerplate/issues)

---

**🎉 Once Secrets are Configured, Your CI / CD Pipeline is Ready to Run 🚀**
