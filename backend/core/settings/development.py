from .base import *

# Development-Specific Settings
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "backend"]

# CORS - Allow All Origins in Development
CORS_ALLOW_ALL_ORIGINS = True

# Development-Specific Installed Apps
INSTALLED_APPS += [
    "django_extensions",
    "debug_toolbar",
]

# Middleware for Development
MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

# Django Debug Toolbar Configuration
INTERNAL_IPS = [
    "127.0.0.1",
    "localhost",
]

# Logging Configuration for Development
LOGGING = {
    "version" : 1,
    "disable_existing_loggers" : False,
    "formatters" : {
        "verbose" : {
            "format" : "{levelname} {asctime} {module} {message}",
            "style" : "{",
        },
    },
    "handlers" : {
        "console" : {
            "class" : "logging.StreamHandler",
            "formatter" : "verbose",
        },
    },
    "root" : {
        "handlers" : ["console"],
        "level" : "INFO",
    },
    "loggers" : {
        "django" : {
            "handlers" : ["console"],
            "level" : "INFO",
            "propagate" : False,
        },
    },
}

# Email Backend for Development (Console)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"