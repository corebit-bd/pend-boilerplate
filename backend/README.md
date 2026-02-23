# PEND Backend - Django Application

## 📋 Overview

The backend is built with Django >=5.2,<6.1 and provides a robust, scalable foundation for the PEND boilerplate. It implements a multi-tenant, headless architecture with support for REST, GraphQL, and FastAPI edge services.

## 🏗️ Architecture

### Core Technologies

- **Django >=5.2,<6.1** - Main Application Framework
- **Django REST Framework 3.16** - RESTful API
- **Graphene-Django 3.2.3** - GraphQL API
- **FastAPI 0.119** - Edge Services for High-Performance Endpoints
- **PostgreSQL 15** - Primary Database
- **Redis 8.2** - Caching & Task Queue
- **Celery 5.5.3** - Asynchronous Task Processing
- **JWT (RSA256)** - Secure Authentication

### Design Patterns

- **Multi-Tenant** - Tenant Isolation at Application Level
- **Headless CMS** - APIs consumed by Web, Mobile, and 3rd Party Clients
- **Event-Driven** - Asynchronous Operations via Celery
- **Micro-Services** - FastAPI Edge Services for specialized use cases

## 📁 Directory Structure

```
backend/
├── core/                     # Django Project
│   ├── settings/             # Environment-Specific Settings
│   │   ├── __init__.py       # Settings Loader
│   │   ├── base.py           # Shared Configuration
│   │   ├── development.py    # Local Development
│   │   ├── staging.py        # Staging / QA Environment
│   │   └── production.py     # Production Environment
│   ├── urls.py               # URL Routing
│   ├── asgi.py               # ASGI Configuration
│   └── wsgi.py               # WSGI Configuration
│
├── apps/                     # Django Applications
│   ├── authentication/       # Authentication & Authorization
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tests.py
│   │   └── apps.py
│   ├── users/                # Users Management
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tests.py
│   │   └── apps.py
│   └── tenants/              # Multi-Tenant Management
│       ├── migrations/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── tests.py
│       └── apps.py
│
├── shared/                   # Shared Utilities
│   ├── middleware/           # Custom Middleware
│   ├── utils/                # Helper Functions
│   └── exceptions/           # Custom Exceptions
│
├── edge_services/            # FastAPI Micro-Services
│   └── fastapi_app/
│       └── routers/          # API Routes
│
├── api/                      # API Versioning
│   └── v1/
│       ├── graphql/          # GraphQL Schemas
│       └── rest/             # REST Endpoints
│
├── logs/                     # Application Logs
│   └── .gitkeep
│
├── venv/                     # Virtual Environment (gitignored)
├── requirements.txt          # Production Dependencies
├── requirements-dev.txt      # Development Dependencies
├── .env                      # Environment Variables (gitignored)
├── .env.example              # Environment Template
├── Dockerfile                # Docker Image Configuration
└── manage.py                 # Django Management Script
```

## 🚀 Getting Started

### Prerequisites

- Python 3.13+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (**Recommended**)

### Initial Setup

#### Option 1 : Using Setup Script (Recommended)

```bash
# From Project Root
./scripts/setup.sh
```

#### Option 2 : Manual Setup

```bash
# 1. Create Virtual Environment
cd backend
python3 -m venv venv

# 2. Activate Virtual Environment
source venv/bin/activate  # Linux / MacOS
# or
venv\Scripts\activate     # Windows

# 3. Install Dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# 4. Copy Environment File
cp .env.example .env

# 5. Generate SECRET_KEY
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# 6. Update .env with your SECRET_KEY & Database Credentials

# 7. Start Docker Services (From Project Root)
docker-compose up -d postgres redis

# 8. Run Migrations
python manage.py migrate

# 9. Create SuperUser (Optional)
python manage.py createsuperuser
```

### Configuration

#### Environment Variables (.env)

```bash
# Database
DATABASE_URL=postgresql://pend_app_user:your_password@localhost:5432/pend

# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_SETTINGS_MODULE=core.settings.development

# JWT
JWT_SECRET_KEY=your-jwt-secret-key-here
JWT_ALGORITHM=RS256
JWT_ACCESS_TOKEN_LIFETIME=15  # Minutes
JWT_REFRESH_TOKEN_LIFETIME=7  # Days

# Redis
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/1

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Email (Optional)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

#### Settings Structure

The Project uses Environment-Specific Settings :

**`core/settings/base.py`** : Shared Configuration for All Environments
**`core/settings/development.py`** : Local Development Settings
**`core/settings/staging.py`** : Staging Environment Settings
**`core/settings/production.py`** : Production Environment Settings

Set the Environment using :

```bash
export DJANGO_SETTINGS_MODULE=core.settings.development
```

## 🔧 Development

### Running the Development Server

```bash
# Activate Virtual Environment
source venv/bin/activate

# Run Django Development Server
python manage.py runserver

# Or Use the Development Script (From Project Root)
./scripts/dev-start.sh
```

The server will be available at :

- API : http://localhost:8000
- Admin : http://localhost:8000/admin/
- Swagger Documentation : http://localhost:8000/swagger/
- Redoc : http://localhost:8000/redoc/

### Running Celery Worker

```bash
# In A Separate Terminal
source venv/bin/activate
celery -A core worker -l info
```

### Running Celery Beat (Scheduled Tasks)

```bash
# In A Separate Terminal
source venv/bin/activate
celery -A core beat -l info
```

## 🧪 Testing

### Running Tests

```bash
# Activate Virtual Environment
source venv/bin/activate

# Run All tTests
pytest

# Run with Coverage
pytest --cov

# Run Specific Test File
pytest apps/users/tests.py

# Run Specific Test
pytest apps/users/tests.py::TestUserModel::test_create_user

# Run with Verbose Output
pytest -v

# Run & Stop at First Failure
pytest -x
```

### Test Coverage Report

```bash
pytest --cov --cov-report=html
# Open htmlcov/index.html in browser
```

## 🏗️ Development Workflow

### Creating A New Application

```bash
# Create the Application
python manage.py startapp app_name apps/app_name

# Update "apps/app_name/apps.py"
class AppNameConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.app_name'

# Add to INSTALLED_APPS in "core/settings/base.py"
INSTALLED_APPS = [
    # ...
    'apps.app_name',
]
```

### Creating Migrations

```bash
# Create Migrations for All Applications
python manage.py makemigrations

# Create Migration for Specific Application
python manage.py makemigrations app_name

# Apply Migrations
python manage.py migrate

# Show Migration Status
python manage.py showmigrations
```

### Database Management

```bash
# Access Django Shell
python manage.py shell

# Access Database Shell
python manage.py dbshell

# Create SuperUser
python manage.py createsuperuser

# Collect Static Files
python manage.py collectstatic

# Clear Cache
python manage.py clear_cache  # If Custom Command Exists
```

### Code Quality

```bash
# Format Code with Black
black .

# Sort Imports with isort
isort .

# Lint with Flake8
flake8 .

# Run All Quality Checks
black . && isort . && flake8 .
```

## 📦 Dependencies

### Production Dependencies (requirements.txt)

- Django 5.2+ (LTS)
- djangorestframework 3.16+
- django-cors-headers 4.9+
- psycopg2-binary 2.9.11+
- django-environ 0.12.0+
- drf-yasg 1.21+ (API Documentation)
- djangorestframework-simplejwt 5.5.1+ (JWT Auth)
- django-filter >=24.0,<26.0
- graphene-django 3.2.3+
- fastapi 0.119.0+
- uvicorn 0.37.0+
- pydantic 2.12.2+
- celery 5.5.3+
- redis >=5.3.0,<8.0
- gunicorn >=23.0.0,<26.0
- whitenoise 6.11+

### Development Dependencies (requirements-dev.txt)

- pytest ≥8.4.2,<10
- pytest-django 4.11.1+
- pytest-cov 7.0.0+
- black 26.1.0+
- flake8 7.3.0+
- isort >=6.1.0,<9.0
- ipython 9.6.0+
- django-debug-toolbar 6.0.0+
- django-extensions 4.1+
- factory-boy 3.3.3+ (Test Factories)
- faker >=37.11.0,<41.0 (Fake Data Generation)

## 🔒 Security

### Authentication

- JWT Tokens with RSA256 Algorithm
- Access Tokens : 15 Minutes Lifetime
- Refresh Tokens : 7 Days Lifetime
- Token Blacklisting Supported

### Best Practices

1. **Never Commit `.env` Files** : Use `.env.example` as Template
2. **Use Strong `SECRET_KEY`** - Generate with Django's Utility
3. **Change Default Passwords** - Especially for Database Users
4. **Enable HTTPS in Production** - Use SSL/TLS Certificates
5. **Use Environment Variables** - For All Sensitive Configuration
6. **Keep Dependencies Updated** - Run `pip list --outdated` Regularly
7. **Run Security Checks** - Use `python manage.py check --deploy`

### Database Security

- Separate User Roles (Application User Vs. Read-Only)
- Audit Logging Enabled for All Changes
- Prepared Statements prevent SQL Injection
- Row-Level Security for Multi-Tenant Data

## 🐳 Docker

### Building the Image

```bash
# From Project Root
docker-compose build backend
```

### Running with Docker Compose

```bash
# Start All Services
docker-compose up -d

# View Logs
docker-compose logs -f backend

# Run Migrations
docker-compose exec backend python manage.py migrate

# Create SuperUser
docker-compose exec backend python manage.py createsuperuser

# Access Shell
docker-compose exec backend python manage.py shell
```

### Dockerfile

The Dockerfile uses Python 3.13 Slim Image & includes:

- System Dependencies
- Python Dependencies
- Static Files Collection
- Gunicorn WSGI Server

## 📚 API Documentation

### Swagger User Interface (UI)

Interactive API Documentation available at :

- Development : http://localhost:8000/swagger/
- Staging : https://staging-api.example.com/swagger/
- Production : https://api.example.com/swagger/

#### ⚠️ Note on API Filtering & Swagger
With the upgrade to `django-filter` 25.x, Automatic Schema Generation for `drf-yasg` has been removed by the Package Maintainers. 

**Impact** : Filter Fields (Query Parameters) may not automatically appear in the Swagger UI.

**Workaround** : To display Filters in Swagger, you must manually define them using the `@swagger_auto_schema` Decorator on your ViewSets : 

```python
@swagger_auto_schema(
    manual_parameters=[
        openapi.Parameter('your_field', openapi.IN_QUERY, type=openapi.TYPE_STRING)
    ]
)
def list(self, request, *args, **kwargs):
    ...
```

### ReDoc

Alternative API Documentation at :

- Development : http://localhost:8000/redoc/

### GraphQL Playground

GraphQL Interface available at :

- Development : http://localhost:8000/graphql/

## 🔍 Debugging

### Django Debug Toolbar

Available in Development Mode at : http://localhost:8000/**debug**/

### Logging

Logs are stored in the `logs/` Directory:

- `django.log` : Main Application Log
- `celery.log` - Celery Task Log
- `error.log` - Error Log

View Logs :

```bash
# Watch Django Logs
tail -f logs/django.log

# Watch Celery Logs
tail -f logs/celery.log

# Watch Errors
tail -f logs/error.log
```

### IPython Shell

Enhanced Django Shell with IPython :

```bash
python manage.py shell
```

## 🚀 Production Deployment

### Pre-Deployment Checklist

- [ ] Set `DEBUG=False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set Strong `SECRET_KEY`
- [ ] Configure Production Database
- [ ] Setup Redis for Production
- [ ] Configure Email Backend
- [ ] Enable HTTPS/SSL
- [ ] Setup Static Files Serving
- [ ] Configure Logging
- [ ] Run Security Check : `python manage.py check --deploy`
- [ ] Run Migrations : `python manage.py migrate`
- [ ] Collect Static Files : `python manage.py collectstatic`
- [ ] Create SuperUser : `python manage.py createsuperuser`

### Production Server

```bash
# Using Gunicorn
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 4

# With Environment Variables
DJANGO_SETTINGS_MODULE=core.settings.production gunicorn core.wsgi:application
```

### Environment Variables (Production)

```bash
DJANGO_SETTINGS_MODULE=core.settings.production
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:5432/dbname
REDIS_URL=redis://redis-host:6379/0
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

## 📝 Common Tasks

### Reset Database

```bash
# Drop & Recreate Database
python manage.py flush

# Or Using Docker
docker-compose down -v
docker-compose up -d postgres
python manage.py migrate
```

### Backup Database

```bash
# Using Django
python manage.py dumpdata > backup.json

# Using PostgreSQL
docker-compose exec postgres pg_dump -U postgres pend > backup.sql
```

### Restore Database

```bash
# Using Django
python manage.py loaddata backup.json

# Using PostgreSQL
docker-compose exec -T postgres psql -U postgres pend < backup.sql
```

## 🐛 Troubleshooting

### Common Issues

**❌ Issue : "ModuleNotFoundError: No module named `apps`"**

```bash
# ✅ Solution : Make sure you're in the "backend" Directory and "venv" is Activated
cd backend
source venv/bin/activate
```

**❌ Issue : "`django.db.utils.OperationalError`: could not connect to server"**

```bash
# ✅ Solution : Make sure PostgreSQL is running
docker-compose up -d postgres
```

**❌ Issue : "FATAL: password authentication failed"**

```bash
# ✅ Solution : Update "DATABASE_URL" in ".env" with correct credentials
# Default : postgresql://pend_app_user:your_password@localhost:5432/pend
```

**❌ Issue : "CommandError: You must set `settings.ALLOWED_HOSTS`"**

```bash
# ✅ Solution : Add your hostname to "ALLOWED_HOSTS" in settings
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
```

## 📖 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Graphene-Django](https://docs.graphene-python.org/projects/django/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Celery Documentation](https://docs.celeryproject.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Create a `feature` Branch : `feature/username/story-id-description`
2. Make Your Changes
3. Run Tests : `pytest`
4. Run Code Quality Checks : `black . && isort . && flake8 .`
5. Commit with Conventional Commits: `feature (#Issue Reference, if any) : Created A New Feature`
6. Push & Create A Pull Request (PR)

### Commit Label Tags Convention 
- `feature` : Indication of New Feature or Functionality or a significant enhancement into the system
- `fix` : Signifies Bug or Error Fixes in the system
- `documentation` : Changes to the Documentation File(s)
- `style` : Addition / Changes to Design Styles of the Application User Interface (UI) / User Experience (UX)
- `refactor` : Code Refactoring (Variable Renaming / Code Restructuring or Formatting) that doesn't affect Functionality
- `data` : Used for Database, Information & Data Manipulation
- `test` : Adding, Fixing or Modifying Tests; No Production Code Change
- `chore` : Updating Build Scripts / Upgrading Dependencies, Maintenance & Changes in Tools; No Production Code Change
- `cicd` : Changes to CI/CD Configuration or Scripts
- `performance` : Performance Improvements / Optimization Changes
- `devEx` : Developers' Experience : Use for Improvement of Developers' Experience. Mostly Used in Issue Creation that might help Developers during Design & Development.
- `revert` : Undoing the Changes made by a Previous Commit
- `miscellaneous` : Use for anything that does not clearly fall into any of the previous categories

## 📄 License

PEND is licensed under the MIT License. See the [LICENSE](LICENSE) File for more details.
