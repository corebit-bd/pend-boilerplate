from drf_yasg import openapi  # pyright: ignore[reportMissingImports]
from drf_yasg.inspectors import (  # pyright: ignore[reportMissingImports]
    FilterInspector,
)


class DjangoFilterInspector(FilterInspector):
    def get_filter_parameters(self, filter_backend):
        # Identify the DjangoFilterBackend by Class Name to avoid Import Loops
        if filter_backend.__class__.__name__ == "DjangoFilterBackend":
            view = self.view
            filterset_class = getattr(view, "filterset_class", None)

            if filterset_class:
                parameters = []
                # Manually Build Parameters from the "filterset" Fields
                # This bypasses the Removed "get_schema_fields" Method in "django-filter 25.x"
                for field_name, filter_object in filterset_class.base_filters.items():
                    parameters.append(
                        openapi.Parameter(
                            name=field_name,
                            in_=openapi.IN_QUERY,
                            type=openapi.TYPE_STRING,
                            description=filter_object.extra.get(
                                "help_text", f"Filter by {field_name}"
                            ),
                            required=filter_object.extra.get("required", False),
                        )
                    )
                return parameters

        return super().get_filter_parameters(filter_backend)
