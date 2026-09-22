"""SearXNG Local Web Search Tool Adapter.

Connects to Self-Hosted SearXNG Instance for Web Research, Competitor Analysis
and Documentation Lookup.
"""

import json
import os
import urllib.parse
import urllib.request
from typing import Any, Dict, List


class SearXNGSearchTool:
    """Tool Adapter interfacing with Local or Self-Hosted SearXNG Instance."""

    def __init__(self):
        """Initializes SearXNG Base URL from Environment or Local Default."""
        self.base_url = os.getenv("SEARXNG_URL", "http://localhost:8080")

    def execute(self, query: str, num_results: int = 5) -> List[Dict[str, Any]]:
        """Executes Search Query against Local SearXNG JSON API Endpoint.

        Args:
            query: Search Keywords or Query String.
            num_results: Maximum number of Search Results to return.

        Returns:
            List of dictionaries containing title, url, and snippet content.
        """
        encoded_query = urllib.parse.quote(query)
        target_url = f"{self.base_url}/search?q={encoded_query}&format=json"

        try:
            req = urllib.request.Request(
                target_url, headers={"User-Agent": "PEND-IDE-Workspace/1.0"}
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode("utf-8"))
                results = data.get("results", [])[:num_results]
                return [
                    {
                        "title": item.get("title"),
                        "url": item.get("url"),
                        "content": item.get("content"),
                    }
                    for item in results
                ]
        except Exception as e:
            print(f"[SEARXNG TOOL WARNING] Search Failed / Offline : {e}")
            return [
                {
                    "title": "Offline Fallback",
                    "url": self.base_url,
                    "content": f"SearXNG Service Unreachable : {str(e)}",
                }
            ]
