# 🛠️ Automation Scripts

This Directory contains Automation Scripts to streamline Development & Deployment Workflows.

## 📁 Available Scripts

### 1. `setup.sh` - Initial Project Setup

First-time Setup Script that configures the entire Development Environment.

**Usage** :

```bash
./scripts/setup.sh
```

**What it does?** :

- ✅ Checks Prerequisites (Docker, Python, Node.js)
- ✅ Creates Python Virtual Environment
- ✅ Installs Backend Dependencies (pip)
- ✅ Installs Frontend Dependencies (npm)
- ✅ Installs Mobile Dependencies (npm)
- ✅ Creates `.env` Files from Templates
- ✅ Starts Docker Services (PostgreSQL, Redis)

**When to use?** :

- First time Setting up the Project
- After Cloning the Repository
- When Resetting the Entire Environment

---

### 2. `dev-start.sh` - Startup of Development Servers

Starts All Development Servers with one command.

**Usage** :

```bash
./scripts/dev-start.sh
```

**What it does?** :

- ✅ Starts PostgreSQL & Redis (Docker)
- ✅ Starts Django Development Server (Port 8000)
- ✅ Starts NextJS Development Server (Port 3000)
- ✅ Displays Access URLs & Helpful Information
- ✅ Keeps Running until Ctrl+C

**Access URLs** :

- Frontend : http://localhost:3000
- Backend : http://localhost:8000
- API Documentation : http://localhost:8000/swagger/
- Administrator Panel : http://localhost:8000/admin/

**To Stop Services** :
Press `Ctrl+C` - Servers will shut down gracefully

---

### 3. `build.sh` - Production Build

Builds Production-Ready Docker Images and Assets.

**Usage** :

```bash
# Build for Production (Default)
./scripts/build.sh

# Build for Specific Environment
./scripts/build.sh --env staging
./scripts/build.sh --env development

# Build Specific Components
./scripts/build.sh --frontend-only
./scripts/build.sh --backend-only

# Include Mobile Build
./scripts/build.sh --mobile

# Execute Tests before Building
./scripts/build.sh --test
```

**What it does?** :

- ✅ Validates Environment
- ✅ Executes Tests (Optional)
- ✅ Builds Backend Docker Image
- ✅ Collects Django Static Files
- ✅ Builds Frontend Docker Image
- ✅ Builds NextJS Production Bundle
- ✅ Builds Storybook Static Site
- ✅ Mobile Build Preparation (Optional)

**Output** :

- Backend : `pend-backend:{environment}`
- Frontend : `pend-frontend:{environment}`
- Static Files in Respective Directories

---

## 🚀 Quick Start Guide

### First Time Setup :

```bash
# 1. Clone Repository
git clone <repository-url>
cd pend-boilerplate

# 2. Run Setup Script (Installation of Dependencies & Startup of Database Services)
chmod +x scripts/*.sh
./scripts/setup.sh

# 3. Configuration & Migration of Database
#    a. Open "backend/.env" and update "DATABASE_URL" with Correct Credentials
#    b. Run Migrations to create Database Tables :
cd backend
source venv/bin/activate
python manage.py migrate
cd ..

# 4. Create Django SuperUser
cd backend
source venv/bin/activate
python manage.py createsuperuser
cd ..

# 4. Start Development
./scripts/dev-start.sh
```

### Daily Development :

```bash
# Start All Servers
./scripts/dev-start.sh

# In Separate Terminals :
# - Execute Tests : cd frontend && npm test
# - View Storybook : cd frontend && npm run storybook
# - Mobile Development : cd mobile && npm start
```

### Production Build :

```bash
# Build Everything
./scripts/build.sh --test

# Deployment
docker-compose -f docker-compose.prod.yml up -d
```

---

## ⚙️ Script Configuration

### Environment Variables

Scripts respect the following Environment Variables :

**Backend (`.env`)** :

```bash
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
```

**Frontend (`.env.local`)** :

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
NODE_ENV=production
```

---

## 🔧 Troubleshooting (FAQs)

### Setup Issues

**❌ Problem** : `Permission denied` when running scripts

```bash
# ✅ Solution : Make Scripts Executable
chmod +x scripts/*.sh
```

**❌ Problem** : Python Virtual Environment Not Activating

```bash
# ✅ Solution : Use Correct Activation Command
source backend/venv/bin/activate  # Linux / Mac
backend\venv\Scripts\activate     # Windows
```

**❌ Problem** : Docker Services won't start

```bash
# ✅ Solution : Check Docker Daemon
docker ps  # Should Show Running Containers
docker-compose ps  # Check Service Status
```

### Development Issues

**❌ Problem** : Port Already In Use

```bash
# ✅ Solution : Find & Kill Process Using Port
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**❌ Problem** : Database Connection Refused

```bash
# ✅ Solution : Ensure PostgreSQL is running
docker-compose up -d postgres
docker-compose logs postgres  # Check Logs
```

**❌ Problem** : Frontend Module Not Found

```bash
# ✅ Solution : Reinstall Dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

**❌ Problem** : Docker Build Fails

```bash
# ✅ Solution : Clean Docker Cache
docker system prune -a
docker-compose build --no-cache
```

**❌ Problem** : Out of Memory During Build

```bash
# ✅ Solution : Increase Docker Memory Limit
# Docker Desktop → Settings → Resources → Memory
```

---

## 📝 Adding Custom Scripts

To add your own Automation Scripts:

1. Create Script in `scripts/` directory
2. Make it Executable : `chmod +x scripts/my-script.sh`
3. Follow the Naming Convention : `action-description.sh`
4. Use the same Color Coding & Output Format
5. Document it in this README

**Template** :

```bash
#!/bin/bash
# scripts/my-script.sh
# Description of what this script does

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

echo -e "${GREEN}✓ Task(s) Completed${NO_COLOR}"
```

---

## 🧪 Testing Scripts

Before Committing Script Changes :

```bash
# Test Setup
./scripts/setup.sh

# Test Development Servers
./scripts/dev-start.sh
# Verify URLs Work, Then Ctrl+C

# Test Build
./scripts/build.sh --env development --test
```

---

## 📚 Related Documentation

- [Database README](../database/init/README.md)
- [Backend README](../backend/README.md)
- [Frontend README](../frontend/README.md)
- [Docker Compose Guide](../docker-compose.yml)

---

## 🎯 Best Practices

1. **Always Execute `setup.sh` First** on new machines
2. **Run `python manage.py migrate`** after updating `.env` Files
3. **Use `dev-start.sh`** for Daily Development
4. **Test Builds Locally** before Pushing
5. **Update `.env` files** for Each Environment
6. **Keep Scripts Executable** with `chmod +x`
7. **Document Changes** in this README

---

## 🔐 Security Notes

⚠️ **IMPORTANT** :

- ❌ Never Commit `.env` Files with Real Credentials
- ✅ Always Use `.env.example` for Templates
- ✅ Change Default Passwords Before Production
- ✅ Review Scripts Before Execution
- ✅ Use Strong Passwords in Production

---

## 💡 Tips & Tricks

### Faster Development :

```bash
# Start Only What You Need
docker-compose up -d postgres  # Database Only
cd backend && python manage.py runserver  # Backend Only
cd frontend && npm run dev  # Frontend Only
```

### Clean Restart :

```bash
# Stop Everything & Clean
docker-compose down -v
rm -rf backend/venv
rm -rf frontend/node_modules
./scripts/setup.sh  # Fresh Start
```

### Quick Database Reset :

```bash
docker-compose down -v
docker-compose up -d postgres
cd backend && python manage.py migrate
```

---

**Need Help?** Check the main [README.md](../README.md) or open an issue!
