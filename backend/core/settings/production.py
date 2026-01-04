from .base import *

# Production-Specific Settings
DEBUG = False

# Security Settings for Production
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# HSTS Settings (Strict for Production)
SECURE_HSTS_SECONDS = 31536000  # 1 Year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Additional Security Headers
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Logging Configuration for Production
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": BASE_DIR / "logs" / "production.log",
            "maxBytes": 1024 * 1024 * 50,  # 50 MB
            "backupCount": 10,
            "formatter": "verbose",
        },
        "error_file": {
            "class": "logging.handlers.RotatingFileHandler",
            "filename": BASE_DIR / "logs" / "error.log",
            "maxBytes": 1024 * 1024 * 50,  # 50 MB
            "backupCount": 10,
            "formatter": "verbose",
            "level": "ERROR",
        },
    },
    "root": {
        "handlers": ["console", "file"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console", "file", "error_file"],
            "level": "ERROR",
            "propagate": False,
        },
        "django.security": {
            "handlers": ["console", "file", "error_file"],
            "level": "WARNING",
            "propagate": False,
        },
    },
}

# Email Backend for Production
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# Administrator Email Notifications
ADMINS = [
    ("Administrator", "admin@yourdomain.com"),
]

MANAGERS = ADMINS

# Error Reporting
SERVER_EMAIL = "server@yourdomain.com"
DEFAULT_FROM_EMAIL = "noreply@yourdomain.com"
