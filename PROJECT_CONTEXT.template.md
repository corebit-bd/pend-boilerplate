# Project Context Document

> **Instructions** : Copy This File when Scaffolding A New Project from PEND Boilerplate.  
> Replace All `[PLACEHOLDER]` Values with Your Project-Specific Information.  
> Delete this Instructions Block After Filling Out.

---

## 📋 Project Information

- **Project Name** : `[YOUR_PROJECT_NAME]`
- **Project Type** : `[E-commerce / SaaS / Healthcare / FinTech / Other]`
- **Organization** : `[YOUR_COMPANY_NAME]`
- **Start Date** : `[YYYY-MM-DD]`
- **Current Version** : `[0.1.0]`
- **Production URL** : `[https://your-domain.com]`
- **Repository** : `[https://github.com/your-org/your-project]`

---

## 👥 Team

### Development Team

- **Tech Lead** : `[Name]` - `[email@example.com]`
- **Backend Lead** : `[Name]` - `[email@example.com]`
- **Frontend Lead** : `[Name]` - `[email@example.com]`
- **Mobile Lead** : `[Name]` - `[email@example.com]`
- **DevOps Lead** : `[Name]` - `[email@example.com]`

### Other Stakeholders

- **Product Manager** : `[Name]` - `[email@example.com]`
- **QA Lead** : `[Name]` - `[email@example.com]`
- **UI / UX Designer** : `[Name]` - `[email@example.com]`

---

## 🎯 Project Overview

### Business Purpose

`[Describe What this Application does & Why it Exists]`

**Example** :

```
An E-Commerce Platform for Selling Handmade Crafts.
Connects Artisans with Buyers Worldwide.
Handles Payments, Shipping & Reviews.
```

### Target Users

`[Who will Use this Application?]`

**Example** :

```
- Artisans (Sellers) : Upload Products, Manage Inventory
- Buyers : Browse, Purchase, Submit Reviews
- Administrators : Manage Platform, Resolve Disputes
```

### Key Features

1. `[Feature 1]` - `[Brief Description]`
2. `[Feature 2]` - `[Brief Description]`
3. `[Feature 3]` - `[Brief Description]`
4. `[Feature 4]` - `[Brief Description]`
5. `[Feature 5]` - `[Brief Description]`

---

## 🏗️ Technical Stack

### Inherited from PEND Boilerplate

- ✅ Backend : Django 5.2 + FastAPI
- ✅ Frontend : NextJS 16 + TypeScript
- ✅ Mobile : React Native + Expo
- ✅ Database : PostgreSQL 15
- ✅ Cache : Redis 7
- ✅ CI / CD : GitHub Actions
- ✅ Testing : Jest, Pytest, Cypress
- ✅ Documentation : Storybook, Swagger

### Project-Specific Additions

- `[Payment Gateway]` : `[Stripe / PayPal / etc.]`
- `[Email Service]` : `[SendGrid / AWS SES / etc.]`
- `[File Storage]` : `[AWS S3 / Google Cloud Storage / etc.]`
- `[Analytics]` : `[Google Analytics / Mixpanel / etc.]`
- `[Monitoring]` : `[Sentry / DataDog / etc.]`
- `[Other Services]` : `[List Any Additional Services]`

---

## 🗂️ Project Structure

### Custom Apps / Modules Added

```
backend/
├── apps/
│   ├── products/      # [Product Catalog Management]
│   ├── orders/        # [Order Processing]
│   ├── payments/      # [Payment Integration]
│   ├── shipping/      # [Shipping Calculation]
│   └── reviews/       # [Product Reviews]

frontend/
├── src/
│   ├── features/
│   │   ├── products/  # [Product Listing, Details]
│   │   ├── cart/      # [Shopping Cart]
│   │   ├── checkout/  # [Checkout Flow]
│   │   └── account/   # [User Account]
```

### 3rd Party Integrations

1. **`[Service Name]`**
   - Purpose : `[Why We Use it?]`
   - Integration : `[How It's Integrated?]`
   - Documentation : `[Link to Integration Documents]`

---

## 🔧 Environment Configuration

### Development

- **Frontend URL** : `http://localhost:3000`
- **Backend API** : `http://localhost:8000`
- **Database** : `postgres://localhost:5432/[project_name]_dev`

### Staging

- **Frontend URL** : `https://staging.[your-domain].com`
- **Backend API** : `https://api-staging.[your-domain].com`
- **Database** : `[Staging Database Connection]`

### Production

- **Frontend URL** : `https://[your-domain].com`
- **Backend API** : `https://api.[your-domain].com`
- **Database** : `[Production Database Connection]`

### Environment Variables (Custom)

```bash
# Payment Gateway
STRIPE_SECRET_KEY=[value]
STRIPE_PUBLIC_KEY=[value]

# Email Service
SENDGRID_API_KEY=[value]
FROM_EMAIL=[value]

# File Storage
AWS_ACCESS_KEY_ID=[value]
AWS_SECRET_ACCESS_KEY=[value]
AWS_S3_BUCKET=[value]

# Analytics
GOOGLE_ANALYTICS_ID=[value]

# Monitoring
SENTRY_DSN=[value]
```

---

## 📊 Database Schema (Custom)

### Custom Tables / Models

1. **Products**
   - Fields : `[List Main Fields]`
   - Relationships : `[Describe Relationships]`

2. **Orders**
   - Fields : `[List Main Fields]`
   - Relationships : `[Describe Relationships]`

3. **Payments**
   - Fields : `[List Main Fields]`
   - Relationships : `[Describe Relationships]`

### Database Migrations

- Current Migration : `[0042_add_product_variants.py]`
- Latest Feature : `[Product Variant Support]`

---

## 🚀 Current Development Status

### Sprint Information

- **Current Sprint** : `[Sprint 15]`
- **Sprint Goal** : `[Implement Payment Gateway Integration]`
- **Start Date** : `[YYYY-MM-DD]`
- **End Date** : `[YYYY-MM-DD]`

### In Progress Features

1. **`[Feature Name]`** - `[Developer Name]` - `[Branch : feature/user/story-id]`
   - Status : `[In Progress / Code Review / Testing]`
   - Completion : `[60%]`

2. **`[Feature Name]`** - `[Developer Name]` - `[Branch : feature/user/story-id]`
   - Status : `[In Progress / Code Review / Testing]`
   - Completion : `[30%]`

### Recently Completed

1. **`[Feature Name]`** - Merged On `[YYYY-MM-DD]` - `[v0.5.0]`
2. **`[Feature Name]`** - Merged On `[YYYY-MM-DD]` - `[v0.4.0]`

### Upcoming Features (Backlog)

1. `[Feature Name]` - Priority : `[High / Medium / Low]`
2. `[Feature Name]` - Priority : `[High / Medium / Low]`
3. `[Feature Name]` - Priority : `[High / Medium / Low]`

---

## 🐛 Known Issues

### Critical

1. **`[Issue Description]`**
   - Impact : `[Who / What is affected?]`
   - Workaround : `[Temporary Solution]`
   - Assigned To : `[Developer Name]`
   - Target Fix : `[Sprint / Date]`

### Non-Critical

1. **`[Issue Description]`**
   - Impact : `[Minor / Cosmetic]`
   - Priority : `[Low]`

---

## 🧪 Testing Strategy

### Test Coverage Goals

- **Backend** : `[85%+]` (Current : `[82%]`)
- **Frontend** : `[80%+]` (Current : `[75%]`)
- **E2E** : `[Critical Paths Covered]`

### Testing Checklist for New Features

- [ ] Unit Tests Written
- [ ] Integration Tests Written
- [ ] E2E Tests for Critical Paths
- [ ] Manual QA Completed
- [ ] Performance Testing (If Applicable)
- [ ] Security Review (If Sensitive)

---

## 🔐 Security Considerations

### Authentication & Authorization

- **Method** : `[JWT with RSA256]` (From PEND Boilerplate)
- **Role-Based Access Control (RBAC)** : `[List Custom Roles]`
  - Administrator : `[Permissions]`
  - Seller : `[Permissions]`
  - Buyer : `[Permissions]`

### Data Protection

- **PII Handling** : `[How Personal Data is Protected?]`
- **Payment Data** : `[Never Stored Locally, Handled by Stripe]`
- **Encryption** : `[At Rest : AES-256, In Transit : TLS 1.3]`

### Compliance Requirements

- **GDPR** : `[Yes / No / Partial]` - `[Details]`
- **PCI-DSS** : `[Yes / No]` - `[Details]`
- **HIPAA** : `[Yes / No]` - `[Details]`
- **Other** : `[Any Other Compliance Requirements]`

---

## 🚢 Deployment

### Deployment Process

```bash
# 1. Create Feature Branch
git checkout -b feature/your-name/story-123

# 2. Develop & Test Locally
npm test
pytest

# 3. Create PR to Main Branch
git push origin feature/your-name/story-123

# 4. After Merge, Promote through Environments
main → devEnv → stagingEnv → prodEnv
```

### Deployment Schedule

- **`devEnv`** : Continuous (After Every Merge to `main`)
- **`stagingEnv`** : `[Every Monday & Thursday]`
- **`prodEnv`** : `[Every Friday 6-7 AM JST]` (After Approval)

### Rollback Procedure

```bash
# 1. Identify Issue
# 2. Notify Team
# 3. Revert to Previous Version
git revert [commit-hash]
# Or Restore from Backup Branch

# 4. Deploy Rollback
# 5. Investigate & Fix
```

---

## 📈 Performance Metrics

### Current Metrics

- **API Response Time** : `[< 200 Milli-Seconds Average]`
- **Frontend Load Time** : `[< 3 Seconds]`
- **Database Query Time** : `[< 50 Milli-Seconds Average]`
- **Uptime** : `[99.9%]`

### Performance Goals

- API Response Time : `[< 150 Milli-Seconds]`
- Frontend Load Time : `[< 2 Seconds]`
- Database Query Time : `[< 30 Milli-Seconds]`
- Uptime : `[99.95%]`

---

## 📚 Documentation

### Internal Documentation

- Architecture Decisions : `[docs/architecture/]`
- API Documentation : `[http://localhost:8000/swagger/]`
- Component Library : `[http://localhost:6006]` (Storybook)
- Database Schema : `[docs/database/schema.md]`
- Deployment Guide : `[docs/deployment/README.md]`

### External Documentation

- User Guide : `[https://docs.your-domain.com]`
- API Documentation for Partners : `[https://api-docs.your-domain.com]`

---

## 🔄 3rd Party Service Status

### Active Integrations

1. **`[Service Name]`**
   - Status : `[Active / Testing / Disabled]`
   - Account : `[account@example.com]`
   - Documentation : `[Link to Documents]`
   - Cost : `[$XXX / Month]`

---

## 🎓 Domain Knowledge

### Business Rules

1. **`[Rule Name]`** : `[Description of Business Rule]`
   - Example : `[Concrete Example]`
   - Edge Cases : `[List Edge Cases]`

2. **`[Rule Name]`** : `[Description]`

### Terminology

- **`[Term]`** : `[Definition Specific to this Project]`
- **`[Term]`** : `[Definition]`

---

## 🚨 Incident Response

### On-Call Rotation

- **Current On-Call** : `[Name]` - `[Phone]`
- **Backup** : `[Name]` - `[Phone]`

### Emergency Contacts

- **Tech Lead** : `[Phone]`
- **DevOps** : `[Phone]`
- **CEO / Founder** : `[Phone]` (Critical Only)

### Incident Procedure

1. Acknowledge Alert
2. Assess Severity
3. Notify Team If Critical
4. Investigate & Fix
5. Document in Incident Log
6. Post-Mortem (For Major Incidents)

---

## 🔗 Important Links

### Development

- GitHub Repository : `[https://github.com/org/project]`
- CI / CD Pipeline : `[https://github.com/org/project/actions]`
- Project Board : `[https://github.com/org/project/projects]`

### Environments

- Development : `[http://localhost:3000]`
- Staging : `[https://staging.your-domain.com]`
- Production : `[https://your-domain.com]`

### Tools

- Design Files : `[Figma link]`
- Analytics : `[Google Analytics / Mixpanel]`
- Monitoring : `[Sentry / DataDog Dashboard]`
- Error Tracking : `[Link to Error Tracking]`

### Communication

- Media : `[#media-name]`
- Team Email : `[team@your-company.com]`
- Support Email : `[support@your-domain.com]`

---

## 📝 Working with AI Assistants

### When Using This Document with AI

1. Share This Entire Document at the Start of Conversation
2. Specify What You're Working On :
   - "I'm implementing [feature name]"
   - "I'm fixing [bug/issue]"
   - "I'm reviewing [component/module]"
3. Provide Relevant Code Snippets / Error Messages
4. Reference Specific Sections :
   - "See Business Rules for Payment Processing"
   - "See Known Issues for Current Bugs"

### Keeping This Document Updated

- Update After Completing Major Features
- Update After Sprint Planning
- Update When Team Members Change
- Update When Infrastructure Changes
- Update After Incidents (Add to Known Issues)

---

## 🔄 Document Version History

| Version | Date           | Changes                                                                                                                                                                                                                                                                                                                                                                                 | Updated By  |
| ------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 0.1.0   | `[YYYY-MM-DD]` | Initial Scaffolding from PEND Boilerplate                                                                                                                                                                                                                                                                                                                                               | `[Name]`    |
| 0.2.0   | `[YYYY-MM-DD]` | Added Payment Integration                                                                                                                                                                                                                                                                                                                                                               | `[Name]`    |
| 0.3.0   | `[YYYY-MM-DD]` | Added Shipping Module                                                                                                                                                                                                                                                                                                                                                                   | `[Name]`    |
| 1.0.1   | 2026-01-12     | Optimized CI / CD Caching for 10GB Limit                                                                                                                                                                                                                                                                                                                                                | @corebit-bd |
| 1.0.2   | 2026-01-31     | PEND Baseline : `pytest` allows 9.x (≥8.4.2,<10)                                                                                                                                                                                                                                                                                                                                        | @corebit-bd |
| 1.0.3   | 2026-02-06     | - Patched `CVE-2026-25639` (`axios`) & `CVE-2026-25547` (`@isaacs/brace-expansion`) <br/> - Expanded Django Support                                                                                                                                                                                                                                                                     | @corebit-bd |
| 1.0.4   | 2026-02-13     | Added `DjangoFilterInspector` to maintain Swagger Documentation Compatibility.                                                                                                                                                                                                                                                                                                          | @corebit-bd |
| 1.0.5   | 2026-02-20     | - Patched `CVE-2026-26996` (`minimatch`) & `CVE-2026-26960` (`tar`) <br /> - **`isort`** Upgraded Dependency Range from `>=6.1.0,<8.0` to `>=6.1.0,<9.0`.                                                                                                                                                                                                                               | @corebit-bd |
| 1.0.6   | 2026-02-27     | - Bumped `@storybook/nextjs-vite` from `10.2.9` to `10.2.13` in Frontend Directory. <br /> - Updated `minimatch` to `10.2.3` for resolving [`CVE-2026-27903`](https://vulners.com/cve/CVE-2026-27903) & [`CVE-2026-27904`](https://vulners.com/cve/CVE-2026-27904). <br /> - Bumped `tailwindcss` from `4.2.0` to `4.2.1`. <br /> - Bumped `react-hook-form` from `7.71.1` to `7.71.2`. | @corebit-bd |

---

## 📌 Quick Context for AI

**Copy This Block when Starting A New AI Conversation** :

```
Project : [PROJECT_NAME]
Type : [PROJECT_TYPE]
Tech Stack : PEND (PostgreSQL, Expo, NextJS, Django)
Current Sprint : [SPRINT_NUMBER]
Working On : [CURRENT_FEATURE/ISSUE]

Key Context :
- [One-Sentence Project Description]
- [Current Major Feature being Developed]
- [Any Critical Issues / Blockers]
- Infrastructure : Uses Layered GitHub Actions Caching ("node_modules" vs ".next/cache").

Question : [Your Actual Question Here]
```

---

**Last Updated:** `[YYYY-MM-DD]`  
**Updated By:** `[Name]`  
**Next Review:** `[YYYY-MM-DD]`
