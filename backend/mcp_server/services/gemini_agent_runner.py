import os
import json
import subprocess
from google import genai
from google.genai import types
from mcp_server.config import get_model_name
from .document_indexer import DocumentationIndexer


class GeminiAgentRunner:
    def __init__(self):
        self.client = genai.Client()
        self.model_name = get_model_name()
        self.indexer = DocumentationIndexer()

    def process_new_file(self, file_path: str):
        with open(file_path, "r", encoding="utf-8") as f:
            code_content = f.read()

        context = self.indexer.get_style_and_qa_specs()

        prompt = f"""
        You are CodebaseWatcherAgent for PEND Boilerplate.
        
        DESIGN & QA CONTEXT:
        {context}
        
        NEW FILE CREATED: {file_path}
        CONTENT:
        {code_content}
        
        TASK:
        1. Generate a corresponding unit test file (.test.tsx for React or tests.py for Django).
        2. If it is a React component, generate a CSF3 Storybook file (.stories.tsx).
        
        Return output STRICTLY as JSON with schema:
        {{
            "test_path": "path/to/file.test.tsx",
            "test_code": "...",
            "storybook_path": "path/to/file.stories.tsx",
            "storybook_code": "..."
        }}
        """

        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json"),
        )

        data = json.loads(response.text)

        if "test_path" in data and "test_code" in data:
            with open(data["test_path"], "w", encoding="utf-8") as f:
                f.write(data["test_code"])
            self.run_self_healing_loop(file_path, data["test_path"])

        if "storybook_path" in data and "storybook_code" in data:
            with open(data["storybook_path"], "w", encoding="utf-8") as f:
                f.write(data["storybook_code"])

    def run_self_healing_loop(self, source_path: str, test_path: str, max_retries=3):
        """Executes Test Runners & heals failing implementation code."""
        for attempt in range(max_retries):
            cmd = (
                ["npm", "test", "--", test_path]
                if test_path.endswith(".tsx")
                else ["pytest", test_path]
            )
            result = subprocess.run(cmd, capture_output=True, text=True)

            if result.returncode == 0:
                print(f"[AITDDLC SUCCESS] All Tests passed for {test_path}")
                return

            print(
                f"[AITDDLC HEALING - Retry {attempt + 1}] Tests failed. Requesting Code Patch ... .. ."
            )

            fix_prompt = f"""
            Tests failed for : {source_path}
            Test File Path : {test_path}
            Error Trace:
            {result.stderr or result.stdout}
            
            Return JSON with key "fixed_code" containing updated Implementation Code.
            """

            fix_response = self.client.models.generate_content(
                model=self.model_name,
                contents=fix_prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json"
                ),
            )

            fix_data = json.loads(fix_response.text)
            if "fixed_code" in fix_data:
                with open(source_path, "w", encoding="utf-8") as f:
                    f.write(fix_data["fixed_code"])
