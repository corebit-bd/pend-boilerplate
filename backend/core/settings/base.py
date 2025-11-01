import environ  # pyright: ignore[reportMissingImports]
from pathlib import Path
from datetime import timedelta

# Environment Variables
env = environ.Env(
    DEBUG = (bool, False)
)

# Build Paths inside the Project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Read ".env" File
environ.Env.read_env(BASE_DIR / ".env")

# ⚠️ SECURITY WARNING : Keep the Secret Key used in Production Secret!
SECRET_KEY = env("SECRET_KEY", default = "django-insecure-change-me-in-production")

# ⚠️ SECURITY WARNING : Don't run with DEBUG turned on in Production!
DEBUG = env('DEBUG')

# Allowed Hosts
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default = [])

# Application Definition
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "graphene_django",
    "drf_yasg",
    "django_filters",
]

LOCAL_APPS = [
    "apps.authentication",
    "apps.users",
    "apps.tenants",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# Middleware Definition
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Root URL Configuration
ROOT_URLCONF = "core.urls"

# Template Configuration
TEMPLATES = [
    {
        "BACKEND" : "django.template.backends.django.DjangoTemplates",
        "DIRS" : [BASE_DIR / "templates"],
        "APP_DIRS" : True,
        "OPTIONS" : {
            "context_processors" : [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# WSGI Application Configuration
WSGI_APPLICATION = "core.wsgi.application"

# Database Configuration
DATABASES = {
    "default" : env.db("DATABASE_URL")
}

# Password Validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME" : "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME" : "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME" : "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME" : "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# REST Framework Configuration
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES" : (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES" : [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_RENDERER_CLASSES" : [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES" : [
        "rest_framework.parsers.JSONParser",
    ],
    "DEFAULT_PAGINATION_CLASS" : "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE" : 20,
    "DEFAULT_FILTER_BACKENDS" : [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
}

# JWT Configuration
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME" : timedelta(minutes = 60),
    "REFRESH_TOKEN_LIFETIME" : timedelta(days = 1),
    "ROTATE_REFRESH_TOKENS" : True,
    "BLACKLIST_AFTER_ROTATION" : True,
    "ALGORITHM" : "HS256",
    "SIGNING_KEY" : env("SECRET_KEY", default = "django-insecure-change-me"),
    "AUTH_HEADER_TYPES" : ("Bearer", ),
}

# CORS Configuration
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default = [])
CORS_ALLOW_CREDENTIALS = True

# GraphQL Configuration
GRAPHENE = {
    "SCHEMA" : "api.v1.graphql.schema.schema",
    "MIDDLEWARE" : [
        "graphene_django.debug.DjangoDebugMiddleware",
    ],
}

# Celery Configuration
CELERY_BROKER_URL = env("CELERY_BROKER_URL", default = "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND", default = "redis://localhost:6379/0")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static Files / Assets (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media Files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default Primary Key Field Type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"