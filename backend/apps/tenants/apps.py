from django.apps import AppConfig  # pyright: ignore[reportMissingImports]

class TenantsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.tenants"