# Changelog

All Notable Changes to the PEND Boilerplate Project will be Documented in this File.

The Format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this Project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

# [1.0.24] - June 26, 2026

### Upgraded

- **Backend** : 
  - **`pytest`** Updated Requirement from `<10.0,>=9.1.0` to `>=9.1.1,<10.0`.
  - **`fastapi`** Updated Requirement from `<1.0,>=0.137.2` to `>=0.138.1,<1.0`.
  - **`redis`** Updated Requirement from `<9.0,>=8.0.0` to `>=8.0.1,<9.0`.
- **Frontend** : 
  - **`playwright`** Bumped from `1.60.0` to `1.61.1`.
  - **`axios`** Bumped from `1.17.0` to `1.18.1`.
  - **`react-hook-form`** Bumped from `7.79.0` to `7.80.0`.
  - **`@types/node`** Bumped from `25.9.1` to `26.0.1`.
  - **`@storybook/nextjs-vite`** Bumped from `10.4.2` to `10.4.6`.
- **Mobile** : 
  - **`react-hook-form`** Bumped from `7.79.0` to `7.80.0`.
  - **`@react-navigation/stack`** Bumped from `7.10.5` to `7.10.6`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.18.2` to `7.18.3`.
  - **`expo`** Bumped from `56.0.8` to `56.0.12`.

---

# [1.0.23] - June 19, 2026

### Upgraded

- **Backend** : 
  - **`fastapi`** Updated Requirement from `<1.0,>=0.136.3` to `>=0.137.2,<1.0`.
  - **`django-environ`** Updated Requirement from `<1.0,>=0.13.0` to `>=0.14.0,<1.0`.
  - **`django-debug-toolbar`** Updated Requirement from `<7.0,>=6.3.0` to `>=7.0.0,<8.0`.
   - **`pytest`** Updated Requirement from `<10.0,>=9.0.3` to `>=9.1.0,<10.0`.
- **Frontend** : 
  - **`@storybook/addon-vitest`** Bumped from `10.4.2` to `10.4.6`.
  - **`@tailwindcss/postcss`** Bumped from `4.3.0` to `4.3.1`.
  - **`react-hook-form`** Bumped from `7.77.0` to `7.79.0`.
  - **`@vitest/coverage-v8`** Bumped from `4.1.8` to `4.1.9`.
- **Mobile** : 
  - **`react-native`** Bumped from `0.85.3` to `0.86.0`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.18.0` to `7.18.2`.
  - **`expo-constants`** Bumped from `56.0.16` to `56.0.18`.
  - **`react-hook-form`** Bumped from `7.77.0` to `7.79.0`.
  - **`@react-navigation/stack`** Bumped from `7.10.3` to `7.10.5`.

---

# [1.0.22] - June 12, 2026

### Upgraded

- **Backend** : 
  - **`faker`** Updated Requirement from `<41.0,>=40.21.0` to `>=40.23.0,<41.0`.
- **Frontend** :
  - **`eslint-config-next`** Bumped from `16.2.7` to `16.2.9`.
  - **`@storybook/addon-docs`** Bumped from `10.4.2` to `10.4.4`.
  - **`@storybook/addon-a11y`** Bumped from `10.4.2` to `10.4.4`.
  - **`cypress`** Bumped from `15.16.0` to `15.17.0`.
- **Mobile** : 
  - **`react-redux`** Bumped from `9.2.0` to `9.3.0`.
  - **`react`** Bumped from `19.2.6` to `19.2.7`.
  - **`@types/react`** Bumped from `19.2.15` to `19.2.17`.
  - **`@react-navigation/native`** Bumped from `7.2.5` to `7.3.1`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.16.2` to `7.18.0`.
  - **`@react-navigation/stack`** Bumped from `7.9.3` to `7.10.3`.

---

# [1.0.21] - June 05, 2026

### Fixed

In the CI Pipeline, as the Frontend Tests are failing, the following downgrade is performed : 

- **Frontend** : 
  - **`react`** Downgraded from `19.2.7` to `18.3.0`.
  - **`@types/react`** Downgraded from `19` to `18.3.0`.
  - **`react-dom`** Downgraded from `19.2.5` to `18.3.0`.
  - **`@types/react-dom`** Downgraded from `19` to `18.3.0`.

### Upgraded

- **Backend** : 
  - **`ipython`** Updated Requirement from `<10.0,>=9.6.0` to `>=9.14.1,<10.0`.
  - **`uvicorn`** Updated Requirement from `<1.0,>=0.48.0` to `>=0.49.0,<1.0`.
  - **`faker`** Updated Requirement from `<41.0,>=40.19.1` to `>=40.21.0,<41.0`.
  - **`django`** Updated Requirement from `<6.1,>=6.0.5` to `>=6.0.6,<6.1`.
  - **`gunicorn`** Requirement Updated from `<26.0,>=23.0.0` to `>=26.0.0,<27.0`.
- **Frontend** : 
  - **`@storybook/addon-vitest`** Bumped from `10.4.1` to `10.4.2`.
- **Mobile** : 
  - **`axios`** Bumped from `1.16.1` to `1.17.0`.
  - **`expo-constants`** Bumped from `55.0.15` to `56.0.16`.
  - **`react-hook-form`** Bumped from `7.75.0` to `7.77.0`.
  - **`@reduxjs/toolkit`** Bumped from `2.11.2` to `2.12.0`.
  - **`react-native-screens`** Bumped from `4.25.0` to `4.25.2`.

---

# [1.0.20] - May 29, 2026

### Upgraded

- **Backend** : 
  - **`uvicorn`** Updated Requirement from `<1.0,>=0.47.0` to `>=0.48.0,<1.0`.
  - **`faker`** Updated Requirement from `<41.0,>=40.18.0` to `>=40.19.1,<41.0`.
  - **`redis`** Updated Requirement from `<8.0,>=5.3.0` to `>=8.0.0,<9.0`.
  - **`fastapi`** Updated Requirement from `<1.0,>=0.119.0` to `>=0.136.3,<1.0`.
  - **`pytest-cov`** Updated Requirement from `<8.0,>=7.0.0` to `>=7.1.0,<8.0`.
- **Frontend** : 
  - **`storybook`** Bumped from `10.4.0` to `10.4.1`.
  - **`@storybook/addon-vitest`** Bumped from `10.4.0` to `10.4.1`.
  - **`@storybook/addon-a11y`** Bumped from `10.4.0` to `10.4.1`.
  - **`postcss`** Bumped from `8.5.14` to `8.5.15`.
- **Mobile** :
  - **`expo-status-bar`** Bumped from `55.0.6` to `56.0.4`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.15.9` to `7.16.2`.
  - **`expo`** Bumped from `56.0.3` to `56.0.8`.
  - **`@react-navigation/stack`** Bumped from `7.8.11` to `7.9.3`.

---

# [1.0.19] - May 22, 2026

### Upgraded

- **Backend** : 
  - **`pydantic`** Updated Requirement from `<3.0,>=2.13.3` to `>=2.13.4,<3.0`.
  - **`whitenoise`** Updated Requirement from `<7.0,>=6.11.0` to `>=6.12.0,<7.0`.
  - **`black`** Updated Requirement from `<27.0,>=25.9.0` to `>=26.5.1,<27.0`.
  - **`django`** Updated Requirement from `<6.1,>=6.0.4` to `>=6.0.5,<6.1`.
  - **`faker`** Updated Requirement from `<41.0,>=40.15.0` to `>=40.18.0,<41.0`.
- **Frontend** : 
  - **`@vitest/browser-playwright`** Bumped from `4.1.6` to `4.1.7`.
  - **`@hookform/resolvers`** Bumped from `5.2.2` to `5.4.0`.
  - **`@types/jest`** Bumped from `29.5.14` to `30.0.0`.
- **Mobile** : 
  - **`expo`** Bumped from `55.0.19` to `56.0.3`.
  - **`react-native-safe-area-context`** Bumped from `5.7.0` to `5.8.0`.
  - **`@hookform/resolvers`** Bumped from `5.2.2` to `5.4.0`.
  - **`react`** Bumped from `19.2.5` to `19.2.6`.
  - **`@types/react`** Bumped from `19.2.14` to `19.2.15`.
  - **`expo-secure-store`** Bumped from `55.0.13` to `56.0.4`.

---

# [1.0.18] - May 15, 2026

### Upgraded

- **Backend** : 
  - **`drf-yasg`** Updated Requirement from `<2.0,>=1.21.11` to `>=1.21.15,<2.0`.
  - **`uvicorn`** Updated Requirement from `<1.0,>=0.37.0` to `>=0.47.0,<1.0`.
  - **`djangorestframework`** Updated Requirement from `<4.0,>=3.16` to `>=3.17.1,<4.0`.
  - **`isort`** Upgraded Dependency Range from `<9.0,>=6.1.0` to `>=8.0.1,<9.0`.
- **Frontend** : 
  - **`jest`** Bumped from `30.3.0` to `30.4.2`.
  - **`@types/node`** Bumped from `25.8.0` to `25.9.0`.
- **Mobile** : 
  - **`react-native-screens`** Bumped from `4.24.0` to `4.25.0`.
  - **`axios`** Bumped from `1.15.2` to `1.16.1`.

---

# [1.0.17] - May 08, 2026

### Upgraded

- **Backend** :
  - **`django-environ`** Updated Requirement from `<1.0,>=0.12.0` to `>=0.13.0,<1.0`.
  - **`django-debug-toolbar`** Updated Requirement from `<7.0,>=6.0.0` to `>=6.3.0,<7.0`.
  - **`celery`** Updated Requirement from `<6.0,>=5.5.3` to `>=5.6.3,<6.0`.
  - **`pytest`** Updated Requirement from `<10.0,>=8.4.2` to `>=9.0.3,<10.0`.
  - **`django-filter`** Updated Requirement from `<26.0,>=24.0` to `>=25.2,<26.0`.
- **Frontend** :
  - **`eslint-plugin-storybook`** Bumped from `10.3.4` to `10.3.6`.
- **Mobile** :
  - **`@react-navigation/native`** Bumped from `7.2.2` to `7.2.3`.
  - **`expo-status-bar`** Bumped from `55.0.5` to `55.0.6`.
  - **`zod`** Bumped from `4.3.6` to `4.4.3`.
  - **`react-native`** Bumped from `0.85.2` to `0.85.3`.

---

# [1.0.16] - May 01, 2026

### Upgraded

- **Mobile** :
  - **`@react-navigation/stack`** Bumped from `7.8.10` to `7.8.11`.
  - **`expo`** Bumped from `55.0.15` to `55.0.19`.
  - **`react-hook-form`** Bumped from `7.72.1` to `7.75.0`.

---

# [1.0.15] - April 24, 2026

### Upgraded

- **Backend** :
  - **`pydantic`** Updated Requirement from `<3.0,>=2.12.2` to `>=2.13.3,<3.0`.
  - **`pytest-django`** Updated Requirement from `<5.0,>=4.11.1` to `>=4.12.0,<5.0`.
  - **`faker`** Updated Requirement from `<41.0,>=37.11.0` to `>=40.15.0,<41.0`.
  - **`psycopg2-binary`** Updated Requirement from `<3.0,>=2.9.11` to `>=2.9.12,<3.0`.
  - **`django`** Updated Requirement from `<6.1,>=5.2` to `>=6.0.4,<6.1`.
- **Frontend** :
  - **`cypress`** Bumped from `15.13.0` to `15.14.1`.
  - **`@storybook/addon-a11y`** Bumped from `10.3.3` to `10.3.5`.
  - **`vitest`** Bumped from `4.1.4` to `4.1.5`.
  - **`tailwindcss`** Bumped from `4.2.2` to `4.2.4`.
- **Mobile** :
  - **`axios`** Bumped from `1.15.0` to `1.15.2`.
  - **`expo-constants`** Bumped from `55.0.14` to `55.0.15`.
  - **`react-native`** Bumped from `0.85.1` to `0.85.2`.

---

# [1.0.14] - April 18, 2026

### Upgraded

- **Frontend** :
  - **`eslint`** Bumped from `9.21.0` to `9.39.4`.
  - **`vitest`** Bumped from `4.1.2` to `4.1.4`.
  - **`typescript`** Bumped from `6.0.2` to `6.0.3`.
  - **`playwright`** Bumped from `1.58.2` to `1.59.1`.
  - **`@storybook/addon-docs`** Bumped from `10.3.3` to `10.3.5`.
- **Mobile** :
  - **`expo`** Bumped from `55.0.11` to `55.0.15`.
  - **`typescript`** Bumped from `6.0.2` to `6.0.3`.
  - **`axios`** Bumped from `1.14.0` to `1.15.0`.
  - **`react-native`** Bumped from `0.84.1` to `0.85.1`.

---

# [1.0.13] - April 10, 2026

### Upgraded

- **Frontend** :
  - **`eslint-config-next`** Bumped from `16.2.2` to `16.2.3`.
  - **`axios`** Bumped from `1.14.0` to `1.15.0`.
  - **`react-dom`** Bumped from `19.2.4` to `19.2.5`.
  - **`@storybook/addon-vitest`** Bumped from `10.3.3` to `10.3.5`.
  - **`react-hook-form`** Bumped from `7.72.0` to `7.72.1`.
- **Mobile** :
  - **`@react-navigation/stack`** Bumped from `7.8.8` to `7.8.10`.
  - **`react`** Bumped from `19.2.4` to `19.2.5`.
  - **`react-hook-form`** Bumped from `7.72.0` to `7.72.1`.
  - **`expo-secure-store`** Bumped from `55.0.11` to `55.0.13`.
  - **`expo-constants`** Bumped from `55.0.11` to `55.0.13`.

---

# [1.0.12] - April 04, 2026

### Upgraded

- **Frontend** :
  - **`storybook`** Bumped from `10.3.3` to `10.3.4`.
  - **`eslint-plugin-storybook`** Bumped from `10.3.3` to `10.3.4`.
  - **`eslint-config-next`** Bumped from `16.2.1` to `16.2.2`.
  - **`@storybook/addon-onboarding`** Bumped from `10.3.3` to `10.3.4`.
  - **`typescript`** Bumped from `5.9.3` to `6.0.2`.
- **Mobile** :
  - **`expo`** Bumped from `55.0.8` to `55.0.11`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.15.8` to `7.15.9`.
  - **`expo-secure-store`** Bumped from `55.0.9` to `55.0.11`.
  - **`axios`** Bumped from `1.13.6` to `1.14.0`.
  - **`expo-status-bar`** Bumped from `55.0.4` to `55.0.5`.

---

# [1.0.11] - March 28, 2026

### Upgraded

- **Frontend** :
  - **`jest`** Bumped from `30.2.0` to `30.3.0`.
  - **`vitest`** Bumped from `4.1.0` to `4.1.2`.
  - **`@chromatic-com/storybook`** Bumped from `5.0.2` to `5.1.1`.
  - **`@vitest/coverage-v8`** Bumped from `4.1.0` to `4.1.2`.
- **Mobile** :
  - **`@react-navigation/native`** Bumped from `7.1.34` to `7.2.1`.
  - **`react-hook-form`** Bumped from `7.71.2` to `7.72.0`.
  - **`@react-navigation/stack`** Bumped from `7.8.6` to `7.8.8`.
  - **`typescript`** Bumped from `5.9.3` to `6.0.2`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.15.6` to `7.15.8`.

---

# [1.0.10] - March 21, 2026

### Fixed

- **CI / Security** :
  - Updated Workflow Step of the Trivy SARIF Generation Action to use the `v` - Prefixed Tag

### Upgraded

- **Frontend** :
  - **`storybook`** Bumped from `10.2.17` to `10.3.1`.
  - **`@storybook/addon-vitest`** Bumped from `10.2.13` to `10.3.1`.
  - **`@storybook/addon-a11y`** Bumped from `10.2.9` to `10.3.1`.
  - **`@chromatic-com/storybook`** Bumped from `5.0.1` to `5.0.2`.
  - **`eslint-config-next`** Bumped from `16.1.6` to `16.2.0`.
- **Mobile** :
  - **`@react-navigation/stack`** Bumped from `7.8.5` to `7.8.6`.
  - **`expo-constants`** Bumped from `55.0.7` to `55.0.9`.
  - **`expo-secure-store`** Bumped from `55.0.8` to `55.0.9`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.15.5` to `7.15.6`.
  - **`expo`** Bumped from `55.0.6` to `55.0.8`.

---

# [1.0.9] - March 14, 2026

### Upgraded

- **Frontend** :
  - **`@vitest/browser-playwright`** Bumped from `4.0.18` to `4.1.0`.
  - **`tar`** Bumped from `7.5.9` to `7.5.11`.
  - **`@types/node`** Bumped from `25.3.0` to `25.5.0`.
  - **`@storybook/addon-onboarding`** Bumped from `10.2.9` to `10.2.17`.
- **Mobile** :
  - `expo-secure-store` Bumped from `15.0.8` to `55.0.8`.
  - **`@react-navigation/bottom-tabs`** Bumped from `7.15.2` to `7.15.5`.
  - **`@react-navigation/stack`** Bumped from `7.8.4` to `7.8.5`.
  - **`expo`** Bumped from `55.0.5` to `55.0.6`.

---

# [1.0.8] - March 07, 2026

### Upgraded

- **Frontend** :
  - **`axios`** Bumped from `1.13.5` to `1.13.6`.
  - **`@storybook/addon-docs`** Bumped from `10.2.9` to `10.2.15`.
  - **`tailwind-merge`** Bumped from `3.4.1` to `3.5.0`.
  - **`@storybook/nextjs-vite`** Bumped from `10.2.13` to `10.2.15`.
- **Mobile** :
  - **`react-native-safe-area-context`** Bumped from `5.6.2` to `5.7.0`.
  - **`react-native`** Bumped from `0.84.0` to `0.84.1`.
  - **`@react-navigation/native`** Bumped from `7.1.31` to `7.1.33`.
  - **`@react-navigation/stack`** Bumped from `7.8.2` to `7.8.4`.
  - **`expo`** Bumped from `54.0.33` to `55.0.5`.

---

# [1.0.7] - March 04, 2026

### Fixed

- **CI / Security** :
  - Hardened Trivy SARIF Generation to avoid transient Registry Rate-Limits by using the Trivy DB ECR Mirror (`public.ecr.aws/...`).
    - Upload SARIF only when `trivy-results.sarif` exists (Prevents CI Failing with “Path does not exist”).
    - Made Trivy Step Non-Blocking (`continue-on-error`) so transient DB Fetch Failures don’t fail the Pipeline.
    - Updated `aquasecurity/trivy-action` to `0.33.1`.

---

## [1.0.6] - February 27, 2026

### Fixed

- **Security** :
  - Updated `minimatch` to `10.2.3` for resolving [`CVE-2026-27903`](https://vulners.com/cve/CVE-2026-27903) & [`CVE-2026-27904`](https://vulners.com/cve/CVE-2026-27904)

### Upgraded

- **Frontend** :
  - **`@storybook/nextjs-vite`** Bumped from `10.2.9` to `10.2.13`.
  - **`tailwindcss`** Bumped from `4.2.0` to `4.2.1`.
  - **`@storybook/addon-vitest`** Bumped from `10.2.10` to `10.2.13`.
  - **`react-hook-form`** Bumped from `7.71.1` to `7.71.2`.
  - **`@chromatic-com/storybook`** Bumped from `4.1.3` to `5.0.1`.
- **Mobile** :
  - **`expo-constants`** Bumped from `18.0.13` to `55.0.7`.
  - **`expo-status-bar`** Bumped from `3.0.9` to `55.0.4`.
  - **`react-native-screens`** Bumped from `4.23.0` to `4.24.0`.

---

## [1.0.5] - February 20, 2026

### 🛡️ Fixed

- **Security** :
  - Updated `minimatch` to `10.2.1` for resolving [`CVE-2026-26996`](https://vulners.com/cve/CVE-2026-26996)
  - Updated `tar` to `7.5.8` for resolving [`CVE-2026-26960`](https://vulners.com/cve/CVE-2026-26960)
- **Frontend** :
  - Improved CSS Parse Error Reporting in the Build Pipeline (via Tailwind CSS 4.2 Improvements).
  - Resolved potential Source M ap Inconsistencies during `npm run dev`.

### Upgraded

- **Backend** :
  - **`isort`** Upgraded Dependency Range from `>=6.1.0,<8.0` to `>=6.1.0,<9.0`.
  - **`gunicorn`** Requirement Updated from `<25.0,>=23.0.0` to `>=23.0.0,<26.0`.
- **Frontend** :
  - **Dependencies** : **`tailwindcss`** Bumped from `4.1.18` to `4.2.0`.
  - **Tooling** : **`@tailwindcss/postcss`** Updated to match the Core Engine Version for better Build Stability.
  - **`storybook`** Requirement Updated from `10.2.9` to `10.2.10`.
  - **`@types/node`** Bumped from `25.2.3` to `25.3.0`.
  - **`@storybook/addon-vitest`** Bumped from `10.2.9` to `10.2.10`.
  - **`eslint-plugin-storybook`** Bumped from `10.2.9` to `10.2.10`.
- **Mobile** :
  - **`@react-navigation/bottom-tabs`** Bumped from `7.13.0` to `7.14.0`.
  - **`react-native-screens`** Bumped from `4.16.0` to `4.23.0`.

---

## [1.0.4] - February 13, 2026

### Added

- **Backend** :
  - `DjangoFilterInspector` to maintain Swagger Documentation Compatibility.
- **Mobile** :
  - Native Support for ReactJS 19 Features in the `Mobile` Workspace.

### Upgraded

- **Frontend** :
  - `eslint` Pinned to `v9` to fix CI Breaking Changes.

- **Mobile** :
  - `expo-status-bar` Bumped from `3.0.8` to `3.0.9` to stay aligned with the latest Maintenance Patches.
  - `react` & `@types/react` Upgraded to `19.1.0`.
  - `react-native` Upgraded from `0.81.5` to `0.84.0`.
  - `typescript` Updated to `~5.9.2` to support new ReactJS Typings.

---

## [1.0.3] - February 06, 2026

### 🛡️ Fixed

- **Security** :
  - Updated `axios` to `v1.13.5` to resolve [`CVE-2026-25639`](https://github.com/advisories/GHSA-43fc-jf86-j433) (Denial of Service via `__proto__` Key).
  - Updated `@isaacs/brace-expansion` to `v5.0.1` to resolve [`CVE-2026-25547`](https://github.com/advisories/GHSA-7h2j-956f-4vf2) (Denial of Service via unbounded range expansion).

### Upgraded

- **Backend** :
  - Added Compatibility Support for Django Versions `>=5.2,<6.1`.
  - **`django-filter`** Upgraded to `25.x` Range.
    - This Version formally supports **Python 3.13** & **Django 5.2**.
    - **Note** : Support for Python 3.9 & Django < 5.2 has been dropped by the Package.
    - Legacy DRF Schema Generation Support has been removed.
  - **`faker`** Requirement Upgraded from `<38.0` to `<41.0` to support newer Python Environments & Locale Improvements. (**Note** : This Update requires Python 3.10 / higher for the Backend Module.)
  - **`isort`** Upgraded Dependency Range from `<7.0,>=6.1.0` to `>=6.1.0,<8.0`.
- **Frontend** :
  - `@types/react-dom` Bumped to `^19` to fully align with the React 19 EcoSystem. This ensures full TypeScript Support for React 19's New Features (like Actions & the `use` Hook) within the `/frontend` Directory.
- **Mobile** :
  - `expo-secure-store` Bumped from `15.0.7` to `15.0.8`

---

## [1.0.2] - January 31, 2026

### Upgraded

- **Backend** :
  - **`pytest`** Requirement Updated to allow 9.x (`>=8.4.2,<10.0`).
  - **`gunicorn`** Requirement Updated from `<24.0` to `<25.0` (Allows Gunicorn 24.x)
  - **`black`** Requirement Updated from `25.9.0` to `26.1.0`
- **Frontend** :
  - `@types/node` Bumped from `^20` (20.19.24) to `^25` (25.1.0) in `frontend/package.json`
  - `zod` Bumped from `4.1.12` to `4.3.6` in `frontend/package.json`
  - `axios` Bumped from `1.13.1` to `1.13.5` in `frontend/package.json` for the Resolution of High Severity Security Vulnerability [`CVE-2026-25639`](https://github.com/advisories/GHSA-43fc-jf86-j433)
  - `tailwind-merge` Bumped from `3.3.1` to `3.4.0` in `frontend/package.json`
- **Mobile** :
  - `@reduxjs/toolkit` Bumped from `2.10.1` to `2.11.2` (BugFix Release - ReactJS Native `AbortSignal` / `DOMException` Compatibility).
  - `expo-constants` Bumped from `18.0.10` to `18.0.13` (Patch, No User-Facing Changes).
  - `axios` Bumped from `1.13.2` to `1.13.5` in `mobile/package.json` for the Resolution of High Severity Security Vulnerability [`CVE-2026-25639`](https://github.com/advisories/GHSA-43fc-jf86-j433)
  - `zod` Bumped from `3.25.76` to `4.3.6` in the `mobile/package.json`.
    - **Breaking Changes** :
      1. `z.number()` now rejects `Infinity` & `NaN` by default.
      2. Updated Error Handling Logic to align with Zod 4's new unified error API.
    - **Improvements** : Significantly reduced bundle size for the Mobile Application & improved Validation Performance.

---

## [1.0.1] - January 12, 2026

### 🚀 Optimized

- **CI / CD Cache Strategy** : Decoupled Static Dependencies (`node_modules`) from Dynamic Build Artifacts (`.next/cache`) to improve Storage Efficiency.
- **Cache Lifecycle** : Implemented Commit-Specific Keys for Build Artifacts to ensure Clean Deployments without bloat.

### 🛡️ Fixed

- Resolved GitHub Actions **Approaching Total Cache Storage Limit**"\*\* (10GB) by implementing A Layered Caching Strategy in `ci.yaml`.

---

## [1.0.0] - December 31, 2025

### 🎉 Initial Release - Production Ready

The First Complete Release of the PEND Boilerplate, a Full-Stack Development Template using PostgreSQL, Expo, NextJS & Django with a focus on Scalability, Developer Experience & Production Readiness.

## ✨ Added

### Step 1 : Root Project Structure

- Created Comprehensive Root Directory Structure
- Established Organization for Database, Documentation, Scripts & Tests
- Set Up Directories for Integration, E2E & Load Testing
- Configured Project Hierarchy for Multi-Component Architecture

### Step 2 : Root Configuration Files

- **`.gitignore`** : Comprehensive Exclusion Rules for Python, NodeJS, Docker & IDEs
- **`README.md`** : Complete Project Overview with Quick Start Guide & CI / CD Documentation
- **`docker-compose.yaml`** : Multi-Service Orchestration for All PEND Stack Components
- **`.env.example`** : Environment Variable Template with Security Considerations
- **Initial Git Commit** : Established Version Control Foundation

### Step 3 : Environment Branches

- Created Git Workflow with 4 Environment Branches :
  - `main` : Stable Integration Branch
  - `devEnv` : Development Environment Deployment Target
  - `stagingEnv` : QA / Staging Environment Deployment Target
  - `prodEnv` : Production Environment Deployment Target
- Established Promotion Pipeline : `main` → `devEnv` → `stagingEnv` → `prodEnv`
- Created Developer Workflow Diagram

### Step 4 : Backend Foundation (Django)

- **Django 5.2 (LTS)** with Django REST Framework 3.16
- Virtual Environment Setup with Python 3.13
- Created Core Django Applications :
  - `authentication` : JWT-Based Authentication (RSA256)
  - `users` : User Management & Profiles
  - `tenants` : Multi-Tenant Architecture Support
- **Dependencies** :
  - `requirements.txt` : Production Dependencies (Django, DRF, PostgreSQL, Celery, Redis, Gunicorn)
  - `requirements-dev.txt` : Development Tools (pytest, black, flake8, isort)
- **Docker Configuration** :
  - Multi-Stage Dockerfile with Debian-Slim Base (Python 3.13-slim)
  - `.dockerignore` for Optimized Build Context (96% Reduction)
  - Non-Root User Security
  - Health Checks
- Backend-Specific README with Development Guide

### Step 5 : Django Settings Structure

- Modular Settings Architecture in `core/settings/` :
  - `base.py` : Shared Configuration
  - `development.py` : Debug & Development Features
  - `staging.py` : QA Environment Settings
  - `production.py` : Optimized for Production with Security Hardening
- Logging Directory with `.gitkeep`
- Environment-Specific Database, Cache & Security Configurations

### Step 6 : Frontend Foundation (NextJS)

- **NextJS 16** with TypeScript & App Router
- **Tailwind CSS v4.2** (PostCSS-Based, Zero-Configuration)
- PEND-Specific Directory Structure :
  - `app/` : App Router Pages
  - `components/` : Reusable UI Components
  - `features/` : Feature-Based Modules
  - `lib/` : Core Utilities
  - `styles/` : Global Styles
  - `types/` : TypeScript Definitions
- **Configuration** :
  - `next.config.ts` : API Rewrites, Standalone Output, Environment Variables with Defaults
  - `globals.css` : Figma Design System Integration
  - Open Sans Font Configuration
  - `.env.local.example` : Frontend Environment Template
- **Docker Configuration** :
  - Multi-Stage Dockerfile with Node 24-slim
  - Optimized Build Context with `.dockerignore`
  - Production-Ready with Standalone Output
- Frontend-Specific README

### Step 7 : Mobile Foundation (Expo)

- **Expo ~55.0.8** with React Native
- PEND-Specific Directory Structure for Mobile Application Development
- `App.tsx` with PEND Branding
- `.env.example` for Mobile Environment Configuration
- Native Navigation & Component Setup

### Step 8 : Frontend Core Files

- **Redux Toolkit** State Management :
  - Typed Hooks (`useAppDispatch`, `useAppSelector`)
  - Auth Slice with Login / Logout / Token Refresh
  - User Slice for Profile Management
- **TypeScript Definitions** :
  - User Types
  - Auth Types
  - API Response Types
- **API Client** :
  - Axios-Based HTTP Client
  - Request / Response Interceptors
  - JWT Token Management
  - Error Handling
- **Validation Schemas** (Zod) :
  - Login Validation
  - Registration Validation
  - Profile Update Validation
- **Utility Helpers** :
  - Date Formatting
  - String Manipulation
  - Number Formatting
- Redux Provider Integration in Layout

### Step 9 : UI Components with Tests

- **5 Core UI Components** :
  - `Button` : 6 Variants, 3 Sizes, Loading States, Icons
  - `Input` : Multiple Types, Validation States, Icons
  - `Badge` : 5 Variants, 2 Sizes, Dismissible
  - `Spinner` : 3 Sizes, Customizable Colors
  - `Icon` : Library-Agnostic Wrapper with Type Safety
- **Comprehensive Testing** :
  - 156 Tests across All Components
  - 99.78% Code Coverage
  - Component Behavior Testing
  - Accessibility Testing
  - Edge Case Validation
- **Utilities** :
  - `cn.ts` : `className` Utility using `clsx` & `tailwind-merge`
- Jest Configuration Optimized for NextJS 16

### Step 10 : Storybook Integration

- **Storybook 10.2.10** Configured for NextJS 16
- **83 Interactive Stories** across 5 Components :
  - Button : 29 Stories (Variants, Sizes, States, Icons)
  - Input : 20 Stories (Types, Validation, Icons)
  - Badge : 18 Stories (Variants, Sizes, Dismissible)
  - Spinner : 8 Stories (Sizes, Colors)
  - Icon : 8 Stories (Sizes, Colors, Accessibility)
- `Icon.README.md` : Integration Guide for Custom Icon Libraries
- Chromatic Deployment Ready

### Step 11 : Database Setup & Scripts

- **PostgreSQL 15** with Docker
- **Database Initialization Scripts** :
  - `01-init-database.sql` : Database Creation, Schema Setup (`auth`, `tenant`, `audit`)
  - `02-create-users.sql` : Multiple User Roles with Proper Permissions
- **Automation Scripts** :
  - `setup.sh` : One-Command Project Initialization
  - `dev-start.sh` : Development Environment Startup
  - `build.sh` : Docker Build with Automatic Cleanup (Prevents Disk Space Issues)
- **Database Features** :
  - Audit Logging with Triggers
  - Multi-Schema Architecture
  - Role-Based Access Control (RBAC)
  - Automatic Change Tracking
- Database & Scripts Documentation (README Files)

### Step 12 : Documentation, CI / CD & Finalization

- **GitHub Actions CI/CD Pipeline** :
  - `.github/workflows/ci.yml` : Hybrid Testing Strategy (Cost-Optimized to $0 / Month)
    - Backend Tests : `pytest`, Linting, Coverage
    - Frontend Tests : Jest, ESLint, `type-check`
    - Mobile Tests : Jest, Expo Validation
    - Storybook : Chromatic Deployment
    - Docker : Image Builds for Backend & Frontend
    - Security : Trivy Scans, `npm audit`, Python Safety Checks
    - E2E Tests : Full Integration Testing
    - Upgrade Validation : Backup Branch Verification
  - `.github/workflows/cd.yaml` : Automated Deployments
    - Environment-Specific Deployments (`devEnv`, `stagingEnv`, `prodEnv`)
    - Docker Image Publishing to GitHub Container Registry
    - Database Migrations
    - Smoke Tests
    - Automatic Production Rollback on Failure
- **Pull Request Template** :
  - `.github/PULL_REQUEST_TEMPLATE.md` : Comprehensive Checklist with 13 Branch Tags
- **CI / CD Documentation Suite** :
  - `documentation/ci-cd/README.md` : Overview & Quick Start
  - `documentation/ci-cd/GITHUB_SECRETS_SETUP.md` : Step-By-Step Secrets Configuration
  - `documentation/ci-cd/STRATEGY.md` : Testing Strategy & Git Workflow Integration
  - `documentation/ci-cd/TROUBLESHOOTING.md` : Common Issues & Solutions
  - `documentation/ci-cd/UPGRADE_GUIDE.md` : 8-Phase Major Version Upgrade Procedures
- **Project Documentation** :
  - `CONTRIBUTING.md` : Comprehensive Contribution Guide (13 Branch Tags, Scaffolding Instructions)
  - `README.md` : Updated with Branch Protection & Scaffolding Information
  - `BOILERPLATE_CONTEXT.md` : Complete Project Context for AI Continuity
- **Branch Protection Rules** :
  - Designed for Scalability (Solo → Team)
  - Rulesets for `main`, `devEnv`, `stagingEnv`, `prodEnv`
  - Special Protections for `backup/**` & `chore/upgrade/**` Branches
  - Team-Size Recommendations (0-3 Required Approvals Based on Team Size)

---

## 🔧 Fixed

### Docker Build Optimizations

- **LightningCSS Error Resolution** : Migrated from Alpine to Debian-Slim Base Images
- **Build Context Reduction** : Implemented `.dockerignore` Files (96% Reduction : 64MB → 2.5MB)
- **I / O Error Prevention** : Optimized Build Context Size
- **Environment Variable Handling** : Added Default Values in `next.config.ts` to Prevent Undefined Errors
- **Disk Space Management** : Automatic Docker Cleanup in Build Scripts

### Performance Improvements

- Build Time Reduced from 8-10 Minutes to 2-3 Minutes
- Backend Docker Image Optimized to ~400MB
- Frontend Docker Image Optimized to ~350MB
- Test Coverage increased to 99.78% on UI Components

---

## 📋 Technical Specifications

### Architecture

- **Type** : Headless, Multi-Tenant, MicroServices, Event-Driven
- **Backend** : Django 5.2 (LTS), FastAPI 0.119, GraphQL (Graphene-Django 3.2.3)
- **Frontend** : NextJS 16, ReactJS, TypeScript, Tailwind CSS v4.2
- **Mobile** : Expo ~55.0.8, React Native
- **Database** : PostgreSQL 15 with Multi-Schema Architecture
- **Caching / Queue** : Redis 8.2 with Celery 5.6.3
- **Authentication** : JWT with RSA256 (`djangorestframework-simplejwt 5.5.1`)

### Development Tools

- **Testing** : `pytest ≥8.4.2,<10`, Jest, 99.78% Coverage on UI
- **Code Quality** : Black >=26.5.1,<27.0, Flake8 7.3.0, `isort >=6.1.0,<9.0`, ESLint
- **Documentation** : Storybook v10.2.10 with 83 Interactive Stories
- **Containerization** : Docker with Multi-Stage Builds
- **CI / CD** : GitHub Actions (Free Tier, $0 / Month)

### Branch Structure

- **13 Development Tags** : `feature`, `fix`, `documentation`, `style`, `refactor`, `data`, `test`, `chore`, `cicd`, `performance`, `devEx`, `revert`, `miscellaneous`
- **4 Environment Branches** : `main`, `devEnv`, `stagingEnv`, `prodEnv`
- **2 Special Branches** : `backup/_`, `chore/upgrade/_`

### Project Statistics

- **Total Lines of Code (LOC)** : ~16,900
- **UI Components** : 5 (Button, Input, Badge, Spinner, Icon)
- **Tests** : 156 Comprehensive Tests
- **Test Coverage** : 99.78%
- **Storybook Stories** : 83
- **Documentation Files** : 13

---

## 🎯 Key Features

### For Developers

- **Zero to Hero Setup** : One-Command Initialization with `./scripts/setup.sh`
- **Hot Reload**: Development Environment with Live Reloading
- **Type Safety** : 100% TypeScript Coverage
- **Component Library** : Documented UI Components with Storybook
- **Testing** : Comprehensive Test Suites with High Coverage
- **Docker First** : Containerized Development & Production

### For Teams

- **Scalable Git Workflow** : Supports Solo Developers to Large Teams
- **Branch Protection** : Configurable Based on Team Size
- **Code Review** : PR Templates with Comprehensive Checklists
- **CI / CD Automation** : Automated Testing & Deployment
- **Documentation** : Extensive Guides for All Aspects

### For Production

- **Multi-Tenant** : Application-Level Tenant Isolation
- **Security** : RSA256 JWT, Audit Logging, Role-Based Access
- **Performance** : Optimized Docker Images, Caching with Redis
- **Monitoring** : Health Checks, Logging, Error Tracking
- **Scalability** : MicroServices Architecture, Event-Driven Design (EDD)

### For Scaffolding

- **Template Ready** : GitHub Template for New Projects
- **Customizable** : Easy Branding & Configuration Updates
- **Well Documented** : Complete Guides for Customization
- **Battle Tested** : Production-Ready from Day 1

---

## 🚀 Getting Started

```bash
# Clone the Repository
git clone https://github.com/yourusername/pend-boilerplate.git
cd pend-boilerplate

# Initial Setup (First Time Only)
./scripts/setup.sh

# Configure Environment Variables
cp .env.example .env
# Edit ".env" with Your Values

# Start Development Environment
./scripts/dev-start.sh
```

### Access Points

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Administrator Panel** : http://localhost:8000/admin/
- **API Documentation** : http://localhost:8000/swagger/
- **GraphQL** : http://localhost:8000/graphql
- **Storybook** : http://localhost:6006

---

## 📊 CI / CD Metrics

### Monthly Usage (GitHub Actions)

- **Main Branch** : ~1,870 Minutes (5 Pushes / Day)
- **`devEnv` Branch** : ~748 Minutes (2 Pushes / Day)
- **`stagingEnv` PRs** : ~36 Minutes (1 Push / Week)
- **`prodEnv` PRs** : ~18 Minutes (2 Pushes / Month)
- **Total** : ~1,672 Minutes / Month
- **Free Tier** : 2,000 Minutes / Month
- **Cost** : $0 / Month ✅

### Quality Gates

- 7 Validation Points Before Production
- Automatic Security Scanning
- Test Coverage Reporting
- E2E Testing on PRs
- Smoke Tests on Deployments

---

## 🛡️ Security

- JWT Authentication with RSA256 Encryption
- Role-Based Access Control (RBAC)
- Audit Logging with PostgreSQL Triggers
- Docker Security : Non-Root Users, Minimal Base Images
- Automated Security Scanning (Trivy, `npm audit`, Safety)
- Environment Variable Protection
- Cross-Origin Resource Sharing (CORS) & Content Security Policies (CSPs) Headers Configured

---

## 📚 Documentation

Complete Documentation Available in :

- Root : `README.md`, `CONTRIBUTING.md`
- Backend : `backend/README.md`
- Frontend : `frontend/README.md`
- Database : `database/init/README.md`
- Scripts : `scripts/README.md`
- CI / CD : `documentation/ci-cd/` (5 Comprehensive Guides)
- Components : `Icon.README.md`
- Pull Requests (PRs) : `.github/PULL_REQUEST_TEMPLATE.md`

---

## 🙏 Acknowledgments

Built with Modern Best Practices & Industry-Standard Tools to provide a Robust Foundation for Full-Stack Web & Mobile Applications.

---

## 📝 License

### MIT License

Copyright &copy; 2025 PEND Boilerplate Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above Copyright notice and this Permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### 3rd Party Licenses

This Project includes / depends on the following Open-Source Software :

#### Backend Dependencies

- **Django** (BSD 3-Clause License)
- **Django REST Framework** (BSD 3-Clause License)
- **FastAPI** (MIT License)
- **Celery** (BSD 3-Clause License)
- **Redis** (BSD 3-Clause License)
- **PostgreSQL** (PostgreSQL License)
- **Gunicorn** (MIT License)

#### Frontend Dependencies

- **NextJS** (MIT License)
- **ReactJS** (MIT License)
- **Tailwind CSS** (MIT License)
- **Redux Toolkit** (MIT License)
- **TypeScript** (Apache License 2.0)

#### Mobile Dependencies

- **Expo** (MIT License)
- **React Native** (MIT License)

#### Testing & Development Tools

- **Jest** (MIT License)
- **pytest** (MIT License)
- **Storybook** (MIT License)
- **ESLint** (MIT License)

For Complete License Information of All Dependencies, please refer to :

- Backend : `backend/requirements.txt` & Package Documentation
- Frontend : `frontend/package.json` & `node_modules/*/LICENSE`
- Mobile : `mobile/package.json` & `node_modules/*/LICENSE`

### Attribution

When using this Boilerplate for Your Projects :

- Attribution is Appreciated but Not Required
- You may Remove / Modify Any Branding
- Consider Contributing Improvements Back to the Community

---

## 🔗 Links

- **Repository** : [GitHub URL]
- **Documentation** : [Docs URL]
- **Issues** : [Issues URL]
- **Discussions** : [Discussions URL]

---

**Status** : ✅ Production Ready | **Version** : 1.0.24 | **Released** : June 26, 2026
