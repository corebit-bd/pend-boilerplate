from django.apps import AppConfig  # pyright: ignore[reportMissingImports]

class AuthenticationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.authentication"