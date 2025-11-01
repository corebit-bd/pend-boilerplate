from django.apps import AppConfig  # pyright: ignore[reportMissingImports]

class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.users"