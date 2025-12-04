"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg.openapi import Info, Contact, License

# Swagger User Interface (UI) Settings & Configuration
schema_view = get_schema_view(
   Info(
      title = "NeXuS PEND Boilerplate API",
      default_version = 'v1.0',
      description = "Master Codebase Foundation for all Software Development Projects - Developed By NeXuS",
      terms_of_service = "https://www.google.com/policies/terms/",
      contact = Contact(email="jeetzhkhondker@gmail.com"),
      license = License(name="NeXuS PEND Boilerplate License"),
   ),
   public = True,
   permission_classes = [AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),

    # Once you add Real Endpoints
    # path("api/v1/", include("api.v1.rest.urls")),
]
