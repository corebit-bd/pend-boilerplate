import os
from pathlib import Path


class DocumentationIndexer:
    def __init__(self, doc_root="documentation"):
        self.doc_root = Path(doc_root)

    def get_style_and_qa_specs(self) -> str:
        """Reads UI/UX Design Specifications & QA Guidelines for Prompt Injection."""
        style_path = (
            self.doc_root
            / "02-design-specifications/01_BASIC_STYLE_GUIDE_SPECIFICATION.md"
        )
        qa_path = (
            self.doc_root
            / "02-design-specifications/09_QUALITY_ASSURANCE_MANAGEMENT_SPECIFICATION.md"
        )

        style = style_path.read_text(encoding="utf-8") if style_path.exists() else ""
        qa = qa_path.read_text(encoding="utf-8") if qa_path.exists() else ""

        return f"=== STYLE GUIDE SPECIFICATION ===\n{style}\n\n=== QA SPECIFICATION ===\n{qa}"
