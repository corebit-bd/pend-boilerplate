"""PostgreSQL pgvector Local RAG Tool Adapter.

Executes Semantic Codebase and Document Vector Similarity Searches via VectorStoreService.
"""

from typing import Any, Dict, List

from mcp_server.services.vector_store import VectorStoreService


class PGVectorRAGTool:
    """Tool Adapter wrapping PostgreSQL pgvector Similarity Queries."""

    def __init__(self):
        """Initializes Local VectorStoreService Instance."""
        self.vector_store = VectorStoreService()

    def execute(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Executes Vector Similarity Search for Query against Codebase Chunks.

        Args:
            query: Code Snippet or Prompt Query.
            top_k: Number of nearest Code / Document Chunks to return.

        Returns:
            List of matching Chunks with File Path and Distance Metrics.
        """
        return self.vector_store.query_similar_code(query=query, top_k=top_k)
