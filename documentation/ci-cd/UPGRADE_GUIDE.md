# Major Version Upgrade Guide

## 🎯 Overview

This Guide Covers the Process for Upgrading Major Framework Versions (Django, NextJS, PostgreSQL, etc.) in the PEND Stack Boilerplate.

**⚠️ CRITICAL** : Always Create A Backup Branch Before Starting Any Major Upgrade !

---

## 📋 Types of Upgrades

### 1. Backend Upgrades

- Django Version (Example : 5.1 → 5.2)
- Python Version (Example : 3.12 → 3.13)
- Major Backend Dependencies

### 2. Frontend Upgrades

- NextJS Version (Example : 15 → 16)
- ReactJS Version
- NodeJS Version
- Major Frontend Dependencies

### 3. Database Upgrades

- PostgreSQL Version (Example : 15 → 16)
- Redis Version

### 4. Mobile Upgrades

- Expo SDK Version
- React Native Version

---

## 🔄 Complete Upgrade Workflow

### Phase 1 : Preparation (Before Starting)

#### Step 1 : Check Current Versions

```bash
# Backend
cd backend
python --version
pip list | grep Django

# Frontend
cd frontend
node --version
npm list react next

# Database
docker-compose exec postgres psql --version
```

#### Step 2 : Review Release Notes

Read Official Upgrade Guides :

- Django : https://docs.djangoproject.com/en/stable/releases/
- NextJS : https://nextjs.org/docs/upgrading
- ReactJS : https://react.dev/blog
- PostgreSQL : https://www.postgresql.org/docs/release/

**Document** :

- Breaking Changes
- Deprecated Features
- Required Migration Steps
- Known Issues

#### Step 3 : Notify Team

```md
Subject : Major Upgrade Planned - [Module] [Old Version] → [New Version]

Team,

We're Planning to Upgrade [Module] from [Old] to [New] Version.

Timeline :

- Backup : [Date]
- Upgrade Branch : [Date]
- Testing in devEnv Branch : [Start Date] - [End Date] (Minimum 2 Days)
- Staging Deployment : [Date]
- Production Deployment : [Date]

Breaking Changes :

- [List Breaking Changes]

Testing Needed :

- [List Critical Features to Test]

Rollback Plan :

- Backup Branch : backup/pre-[update-name]-[date]
- Revert Steps : [Document]

Please Block out Time for Testing during the devEnv Phase.

Thanks,
Jeet Z. H. Khondker
Founder, CEO & President, NeXuS Co. Ltd.
```

---

### Phase 2 : Create Backup (⚠️ REQUIRED)

#### Step 1 : Create Backup Branch

```bash
# Ensure You're On Latest Main Branch "main"
git checkout main
git pull origin main

# Create Backup with Descriptive Nname
# Format : backup/pre-[update-name]-[YYYYMMDD]
DATE=$(date +%Y%m%d)
git checkout -b backup/pre-django5-$DATE
git push origin backup/pre-django5-$DATE

echo "✅ Backup Created : backup/pre-django5-$DATE"
```

#### Step 2 : Protect Backup Branch in GitHub

1. Go To `Settings` → `Branches` → `Branch protection rules`
2. Click `Add rule`
3. Branch Name Pattern : `backup/*`
4. Enable :
   - ✅ Lock Branch
   - ✅ Do Not Allow Bypassing the Above Settings
5. Save

#### Step 3 : Tag Current Version (Optional But RECOMMENDED)

```bash
git tag -a v1.0.0-pre-django5-upgrade -m "Version Before Django 5 Upgrade"
git push origin v1.0.0-pre-django5-upgrade
```

#### Step 4 : Document Backup

Create `UPGRADE_NOTES.md` in Repository :

````markdown
# Upgrade Notes

## Django 5.1 → 5.2 (December 18, 2024)

### Backup Information

- Backup Branch : `backup/pre-django5-20241218`
- Backup Tag : `v1.0.0-pre-django5-upgrade`
- Backup date : December 18, 2024
- Last Working Commit : abc123def456

### Current Production State

- Django : 5.1.x
- Python : 3.12
- All Tests Pass : ✅
- Production Status : Stable

### Rollback Instructions

If Upgrade Fails :

```bash
# Option 1 : Revert to Backup Branch
git checkout backup/pre-django5-20241218
git checkout -b rollback/django5-failed
# Test, Then Deploy

# Option 2 : Revert Merge Commit
git revert -m 1 <merge-commit-hash>
```
````

---

### Phase 3 : Create Upgrade Branch

#### Step 1 : Create Branch

```bash
# Create Upgrade Branch from "main"
git checkout main
git pull origin main
git checkout -b chore/upgrade/backend

echo "✅ Upgrade Branch Created : chore/upgrade/backend"
```

#### Step 2 : Update Dependencies

**Backend (Django)** :

```bash
cd backend

# Update requirements.txt
# Change : Django==5.1.x
# To :     Django==5.2.x
vim requirements.txt

# Update Python Version If Needed
# "pyproject.toml" / ".python-version"

# Install New Versions
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Check for Deprecation Warnings
python manage.py check --deploy
```

**Frontend (NextJS)** :

```bash
cd frontend

# Update "package.json"
npm install next@latest react@latest react-dom@latest

# Or Specific Version
npm install next@16.0.0

# Update All Related Packages
npm update

# Check for Peer Dependency Issues
npm list
```

#### Step 3 : Fix Breaking Changes

**Django Example** :

```python
# Old (Django 5.1)
from django.conf.urls import url

urlpatterns = [
    url(r'^api/', include('api.urls')),
]

# New (Django 5.2)
from django.urls import re_path

urlpatterns = [
    re_path(r'^api/', include('api.urls')),
]
```

**NextJS Example** :

```typescript
// Old (NextJS 15)
import { useRouter } from "next/router";

// New (NextJS 16)
import { useRouter } from "next/navigation";
```

#### Step 4 : Run Tests Locally

```bash
# Backend
cd backend
pytest -v
pytest --cov

# Frontend
cd frontend
npm test
npm run build

# Integration
./scripts/dev-start.sh
# Manual Testing
```

#### Step 5 : Update Documentation

Update These Files :

- `README.md` - Version Numbers
- `requirements.txt` / `package.json` - Already Done
- `Dockerfile` - Base Image Versions
- `docker-compose.yml` - Service Versions
- `.github/workflows/ci.yml` - If CI Versions Changed
- `CHANGELOG.md` - Document Upgrade

---

### Phase 4 : Create Pull Request

#### Step 1 : Commit Changes

```bash
git add .

# Use Conventional Commit Format
git commit -m "chore : Upgraded Django from 5.1 to 5.2

BREAKING CHANGES :
- django.conf.urls.url Deprecated, Use django.urls.re_path
- Updated Python to 3.13 for Django 5.2 Support
- Migrated 3rd Party Packages to Compatible Versions

Migrations :
- Updated All url() Calls to re_path()
- Fixed Deprecated Settings
- Updated Middleware Configuration

Testing :
- All Tests Pass Locally (pytest : 150/150)
- Manual Testing Completed
- Backward Compatibility Verified
- Database Migrations Tested

Dependencies Updated :
- Django : 5.1.7 → 5.2.0
- djangorestframework : 3.15.x → 3.16.x
- Python : 3.12 → 3.13

Backup Created : backup/pre-django5-20241218"
```

#### Step 2 : Push Branch

```bash
git push origin chore/upgrade/backend
```

#### Step 3 : Create PR with Special Template

**PR Title** :

```
[UPGRADE] chore : Upgraded Django from 5.1 to 5.2
```

**PR Description** :

````markdown
## ⚠️ MAJOR UPGRADE - REQUIRES CAREFUL REVIEW

### Upgrade Details

**Module** : Backend (Django)
**Old Version** : 5.1.7
**New Version** : 5.2.0
**Backup Branch** : `backup/pre-django5-20241218`

### Breaking Changes

1. `django.conf.urls.url` → `django.urls.re_path`
2. Python Minimum Version : 3.12 → 3.13
3. [List All Breaking Changes]

### Changes Made

- [ ] Updated Django : 5.1 → 5.2
- [ ] Updated Python : 3.12 → 3.13
- [ ] Fixed All Deprecation Warnings
- [ ] Updated Related Packages
- [ ] Migrated Deprecated Imports
- [ ] Updated Dockerfile
- [ ] Updated CI / CD Workflows
- [ ] Updated Documentation

### Testing Completed

- [ ] All Unit Tests Pass (150/150)
- [ ] All Integration Tests Pass
- [ ] Manual Testing Completed
- [ ] Backward Compatibility Verified
- [ ] Performance Testing (No Regression)
- [ ] Security Scan Passed

### Migration Guide

See `UPGRADE_NOTES.md` for Detailed Migration Steps.

### Rollback Plan

**If Upgrade Fails** :

```bash
# Option 1 : Restore from Backup
git checkout backup/pre-django5-20241218

# Option 2 : Revert Merge
git revert -m 1 <merge-commit>

# Option 3 : Restore Database from Backup
# [Document Database Restore Steps]
```
````

### Post-Merge Plan

1. Deploy to `devEnv` Immediately After Merge
2. Test in `devEnv` for **Minimum 2 Days**
3. Monitor Error Logs & Performance
4. Document Any Issues Found
5. Fix Issues Before Promoting
6. Deploy to `stagingEnv` (After 2+ Days Successful Testing)
7. Test in Staging Environment for **Minimum 1 Week**
8. Deploy to Production Environment (After Stakeholder Approval)

### Required Approvals

⚠️ This PR requires :

- [ ] Approval from 2+ Maintainers
- [ ] Backend Lead Review
- [ ] DevOps Review
- [ ] QA Sign-Off After `devEnv` Testing

### Deployment Schedule

- `devEnv` : Immediately After Merge
- `stagingEnv` : [Date] (After 2+ Days Testing)
- `prodEnv` : [Date] (After 1+ Week Testing)

**DO NOT Merge Until All Approvals Received!**

---

### Phase 5 : CI / CD Testing

#### Automated Checks

CI will Automatically :

- ✅ Run All Backend Tests
- ✅ Run All Frontend Tests
- ✅ Check for Backup Branch Existence
- ✅ Validate Breaking Changes Documented
- ✅ Security Scans
- ⚠️ Add Warning Comment About Upgrade

#### Manual Testing Checklist

- [ ] PR Created with [UPGRADE] Tag
- [ ] CI Passes (All Green)
- [ ] Code Review Completed
- [ ] Breaking Changes Documented
- [ ] Migration Guide Prepared
- [ ] Rollback Plan Verified
- [ ] Team Notified

---

### Phase 6 : Deploy to `devEnv` (Extended Testing)

#### Step 1 : Merge PR

After All Approvals :

```bash
# Merge PR on GitHub
# DO NOT Delete Upgrade Branch Yet
```

#### Step 2 : Deploy to `devEnv`

```bash
git checkout devEnv
git pull origin devEnv
git merge main
git push origin devEnv

# CD Pipeline Deploys Automatically
# Monitor Deployment
```

#### Step 3 : Extended Testing (2+ Days Minimum)

```bash
# Day 1-2 : Intensive Testing
./scripts/dev-start.sh

# Test Critical Features :
- [ ] User Authentication
- [ ] API Endpoints
- [ ] Database Operations
- [ ] File Uploads
- [ ] Background Jobs
- [ ] Email Sending
- [ ] Payment Processing
- [ ] 3rd Party Integrations

# Monitor Logs :
docker-compose logs -f backend
docker-compose logs -f frontend

# Check for Errors :
grep ERROR logs/*.log
```

#### Step 4 : Performance Testing

```bash
# Load Testing
ab -n 1000 -c 10 http://dev-server/api/endpoint

# Memory Usage
docker stats

# Database Performance
EXPLAIN ANALYZE SELECT ...
```

#### Step 5 : Document Issues

Keep `UPGRADE_NOTES.md` Updated :

```markdown
### Issues Found in Development Environment Branch "devEnv"

#### December 18, 2024 - Day 1

- ❌ API Endpoint /api/users Slow (2 Seconds → Fixed : Optimized Query)
- ✅ All Authentication Flows Working
- ⚠️ Warning in Logs about Deprecated Setting (Non-Critical)

#### December 19, 2024 - Day 2

- ✅ No New Issues
- ✅ Performance Stable
- ✅ All Tests Passing
```

---

### Phase 7 : Promote to Staging

**Only After 2+ Days Successful Testing in `devEnv`**

#### Step 1 : Create PR to Staging Environment Branch `stagingEnv`

```bash
git checkout stagingEnv
git pull origin stagingEnv

# Create PR : "devEnv" → "stagingEnv"
# Title : "Deploy Django 5.2 Upgrade to Staging Environment"
```

#### Step 2 : Stakeholder Approval

Get Sign-Off from :

- [ ] Tech Lead
- [ ] QA Team
- [ ] Product Manager
- [ ] DevOps Team

#### Step 3 : Deploy

```bash
git merge devEnv
git push origin stagingEnv

# CD Deploys Automatically
```

#### Step 4 : QA Testing (1+ Week)

Full Regression Testing by QA Team

---

### Phase 8 : Promote to Production Environment

**Only After 1+ Week Successful Testing in `stagingEnv`**

#### Step 1 : Production Checklist

- [ ] All Tests Passing in Staging Environment
- [ ] No Critical Issues Found
- [ ] Performance Acceptable
- [ ] All Stakeholders Approved
- [ ] Rollback Plan Tested
- [ ] Database Backup Verified
- [ ] Monitoring Alerts Configured
- [ ] On-Call Schedule Prepared

#### Step 2 : Deployment Window

Choose Low-Traffic Time :

- Best : Weekend Morning
- Avoid : Monday Mornings, Friday Afternoons

#### Step 3 : Deploy

```bash
git checkout prodEnv
git pull origin prodEnv
git merge stagingEnv
git push origin prodEnv

# CD Deploys with Automatic Rollback Capability
```

#### Step 4 : Monitor Production

```bash
# Watch Logs
tail -f /var/log/app.log

# Monitor Errors
watch -n 10 'grep ERROR /var/log/app.log | tail -20'

# Check Metrics
# - Response Times
# - Error Rates
# - CPU / Memory Usage
# - Database Connections
```

#### Step 5 : Post-Deployment

- [ ] Smoke Tests Passed
- [ ] Critical Features Verified
- [ ] No Error Spike in Logs
- [ ] Performance within Normal Range
- [ ] Notify Team of Successful Deployment

---

## 🚨 Rollback Procedures

### Immediate Rollback (Production Issues)

#### Option 1 : Revert to Backup Branch

```bash
# 1. Checkout Backup
git checkout backup/pre-django5-20241218

# 2. Create Rollback Branch
git checkout -b rollback/django5-failed-20241220

# 3. Deploy Immediately
git push origin rollback/django5-failed-20241220

# 4. Update Production Environment Branch "prodEnv"
git checkout prodEnv
git reset --hard rollback/django5-failed-20241220
git push --force origin prodEnv
```

#### Option 2 : Revert Merge Commit

```bash
# Find Merge Commit
git log --oneline -10

# Revert (Keep Changes But Undo Merge)
git revert -m 1 <merge-commit-hash>
git push origin prodEnv
```

#### Option 3 : Database Rollback

```bash
# Restore from Backup
psql -U postgres -d nexus_pend < backup-pre-upgrade.sql

# Or Use Point-In-Time (PIT) Recovery
# (If Configured)
```

### Post-Rollback Actions

1. ✅ Verify Production is Stable
2. ✅ Notify Team of Rollback
3. ✅ Document Rollback Reason
4. ✅ Analyze What Went Wrong
5. ✅ Plan Fix & Retry

---

## 📊 Upgrade Checklist Template

Copy this for Each Upgrade :

```markdown
# [Module] Upgrade : [Old] → [New]

## Pre-Upgrade

- [ ] Release Notes Reviewed
- [ ] Breaking Changes Documented
- [ ] Team Notified
- [ ] Backup Branch Created : `backup/pre-[component_library]-[date]`
- [ ] Backup Branch Protected
- [ ] Version Tagged
- [ ] Rollback Plan Prepared

## Upgrade

- [ ] Upgrade Branch Created : `chore/upgrade/[module]`
- [ ] Dependencies Updated
- [ ] Breaking Changes Fixed
- [ ] Tests Pass Locally
- [ ] Documentation Updated
- [ ] CHANGELOG Updated
- [ ] PR Created with [UPGRADE] Tag

## Testing

- [ ] CI Passes
- [ ] Code Reviewed (2+ Approvals)
- [ ] Deployed to `devEnv`
- [ ] Tested in `devEnv` (2+ Days)
- [ ] No Critical Issues Found
- [ ] Performance Acceptable

## Staging

- [ ] Deployed to `stagingEnv`
- [ ] QA Testing Completed (1+ Week)
- [ ] Stakeholder Approval Obtained
- [ ] Production Deployment Scheduled

## Production

- [ ] Deployed to `prodEnv`
- [ ] Smoke Tests Passed
- [ ] Monitoring Configured
- [ ] No Errors in Logs
- [ ] Performance Normal
- [ ] Team Notified

## Post-Deployment

- [ ] Upgrade Notes Finalized
- [ ] Issues Documented
- [ ] Lessons Learned Recorded
- [ ] Next Upgrade Scheduled
```

---

## 🎓 Best Practices

### DOs ✅

1. **Always Create Backup Branch First**
2. Test Extensively in `devEnv` (Minimum 2 Days)
3. Document All Breaking Changes
4. Get Multiple Approvals
5. Deploy during Low-Traffic Hours
6. Monitor Closely After Deployment
7. Keep Upgrade Branch Until Confirmed Stable

### DON'Ts ❌

1. Skip Backup Branch Creation
2. Rush through Testing Phases
3. Upgrade Multiple Modules Simultaneously
4. Deploy on Morning Mornings / Friday Afternoons
5. Ignore Deprecation Warnings
6. Delete Backup Branches Prematurely
7. Auto-Merge Upgrade PRs

---

## 📚 Resources

### Official Documentation

- [Django Upgrade Guide](https://docs.djangoproject.com/en/stable/howto/upgrade-version/)
- [NextJS Upgrade Guide](https://nextjs.org/docs/upgrading)
- [ReactJS Upgrade Guide](https://react.dev/blog)
- [PostgreSQL Upgrade](https://www.postgresql.org/docs/current/upgrading.html)

### Tools

- [Django Upgrade](https://github.com/adamchainz/django-upgrade) - Automated Django upgrades
- [NextJS Codemod](https://github.com/vercel/next-codemod) - NextJS migration tool
- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) - Update dependencies

---

**Last Updated** : December 2025
**Version** : 1.0.0
