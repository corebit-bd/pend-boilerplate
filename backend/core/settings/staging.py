from .base import *

# Staging-Specific Settings
DEBUG = False

# Security Settings for Staging
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# HSTS Settings (Less Strict than Production)
SECURE_HSTS_SECONDS = 3600  # 1 Hour
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = False

# Logging Configuration for Staging
LOGGING = {
    "version" : 1,
    "disable_existing_loggers" : False,
    "formatters" : {
        "verbose" : {
            "format" : "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style" : "{",
        },
    },
    "handlers" : {
        "console" : {
            "class" : "logging.StreamHandler",
            "formatter" : "verbose",
        },
        "file" : {
            "class" : "logging.handlers.RotatingFileHandler",
            "filename" : BASE_DIR / "logs" / "staging.log",
            "maxBytes" : 1024 * 1024 * 10,  # 10 MB
            "backupCount" : 5,
            "formatter" : "verbose",
        },
    },
    "root" : {
        "handlers" : ["console", "file"],
        "level" : "INFO",
    },
    "loggers" : {
        "django" : {
            "handlers" : ["console", "file"],
            "level" : "INFO",
            "propagate" : False,
        },
        "django.request" : {
            "handlers" : ["console", "file"],
            "level" : "WARNING",
            "propagate" : False,
        },
    },
}

# Email Backend for Staging (Use SMTP or Console)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# Administrator Email Notifications
ADMINS = [
    ("Administrator", "admin@example.com"),
]

MANAGERS = ADMINS