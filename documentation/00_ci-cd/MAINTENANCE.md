# 🛠️ PEND Boilerplate Maintenance Guide

This Document outlines the mandatory Workflow for maintaining the PEND (PostgreSQL, Expo, NextJS, Django) Stack. It ensures that Automated Dependency Updates do not compromise the "Scaffolding-Ready" Integrity of the Boilerplate.

---

## 🔄 The Maintenance Loop

Maintenance is triggered by 2 Events :

- Automated Dependabot PRs (For Libraries)
- Manual Version Alerts (For Core Infra-Structure like Python, Node / Postgres).

### 1. Handling Automated Updates (Dependabot)

When Dependabot opens a Pull Request (PR) with the prefix `chore/upgrade/`, the `upgrade-validation` Job in `ci.yaml` will trigger.

#### Step A : Satisfy the "Safety Lock"

The CI will fail by default until a Backup Branch exists.

1. **Identify the Module** (Example : `backend`).

2. **Create a Backup Branch** :

```bash
git checkout main
git checkout -b backup/pre-backend-YYYYMMDD
```

3. **Push the Branch** :

```bash
git push origin backup/pre-backend-YYYYMMDD
```

4. The CI `upgrade-validation` Job will now Pass ✅

#### Step B : Validation & Soak Testing

1. **Review Logs** : Ensure `backend-tests`, `frontend-tests` & `mobile-tests` (Including `expo-doctor`) are all Passing ✅ on the Dependabot PR.

2. **DevEnv Merge** : Merge the PR into the `devEnv` Branch first.

```bash
# Fetch the Latest Changes from the Repository
git fetch origin

# Switch to the Development Environment Branch
git checkout devEnv
git pull origin devEnv

# Merge the Dependabot Upgrade Branch into devEnv
git merge origin/chore/upgrade/backend-django

# Push to trigger the Full CI Suite for devEnv
git push origin devEnv
```

3. **The 2-Day Rule** : Monitor the `devEnv` for **at least 48 Hours**. During these 48 hours, you do not run any git commands for this specific upgrade. You monitor the logs and ensure no regressions appear in the `devEnv`. This is needed before promoting the changes to `main` / `stagingEnv` / `prodEnv`.

4. **Promoting to `main` (Stabilization)** : After the 2-Day Soak Test passes without issues, the Changes are merged into `main` to update the Boilerplate's Master Template.

```bash
# Switch to the main Branch
git checkout main
git pull origin main

# Merge the Now-Stabilized devEnv into main
git merge devEnv

# Push to Update the Boilerplate Baseline
git push origin main
```

5. **Final Promotion (Staging & Production)** : Finally, the code is promoted to the Environments that are ready for Scaffolding / End-User Testing.

```bash
# Update Staging
git checkout stagingEnv
git pull origin stagingEnv
git merge main
git push origin stagingEnv

# Update Production
git checkout prodEnv
git pull origin prodEnv
git merge stagingEnv
git push origin prodEnv
```

### 2. Handling Core Infra-Structure Updates

Dependabot cannot update the Global Environment Variables in the CI Pipeline. These must be handled manually.

**⚠️ When you receive a Release Alert for Python, Node, Postgres** :

1. **Update `ci.yaml`** : Modify the `env:` Block at the top of the file :

   - `PYTHON_VERSION`
   - `NODE_VERSION`
   - `POSTGRES_VERSION`
   - `REDIS_VERSION`

2. **Update Docker Images** : Update the `image:` Tags in the `services:` Section of `ci.yaml` (Example : `image: postgres:16-alpine`).

3. **Test Locally** : Run the Local Build Scripts to ensure the New Versions don't break the Container Orchestration.

### 3. Synchronizing Context Documents

The Boilerplate’s value lies in its AI-Readiness. Documentation must match the code.

**After Every Major Upgrade** :

- `BOILERPLATE_CONTEXT.md` :
  ・　 Update the 🗂️ `Tech Stack` Section with New Version Numbers.
  ・　 Increment the `Version` at the top & bottom of the file.
  ・　 Update the `Last Updated` date.

- `PROJECT_CONTEXT.template.md` :
  ・　 Add a New Entry to the `🔄 Document Version History` Table so that New Projects start with the correct Baseline.

---

## ⚠️ Emergency Rollback

If an Upgrade causes a Critical Failure :

1. Identify the Relevant Backup Branch (Example : `backup/pre-frontend-YYYYMMDD`).

2. Use `git revert <merge-commit-hash>` to undo the Upgrade.

3. Notify the Team & Document the Failure in the `CHANGELOG.md`.

---

**Current Maintenance Status** : `Optimized`
**Last Audit** : January 30, 2026
