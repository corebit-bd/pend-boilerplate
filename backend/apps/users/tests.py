"""
Tests for the Users Application.
"""

import pytest
from django.test import TestCase


class UsersAppTestCase(TestCase):
    """Basic Test Case for Users Application."""

    def test_app_loads(self):
        """Test that the Users Application loads correctly."""
        from apps.users.apps import UsersConfig

        assert UsersConfig.name == "apps.users"
        assert UsersConfig.default_auto_field == "django.db.models.BigAutoField"


@pytest.mark.django_db
class UserModelTest:
    """Tests for User Model (When Implemented)."""

    def test_placeholder(self):
        """Placeholder Test to ensure pytest runs."""
        assert True, "User Model Tests will be implemented here"
