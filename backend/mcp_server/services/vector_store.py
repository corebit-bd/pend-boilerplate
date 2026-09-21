"""PostgreSQL pgvector Local RAG Database Service.

Manages connection pools, table initialization and vector similarity search
for codebase chunk embeddings utilizing pgvector and Google GenAI SDK.
"""

import os
from typing import Any, Dict, List

import psycopg2
from google import genai
from pgvector.psycopg2 import register_vector


class VectorStoreService:
    """Service handling PostgreSQL pgvector queries and embedding storage."""

    def __init__(self):
        """Initializes database credentials, Google GenAI client and database tables."""
        self.db_url = os.getenv(
            "DATABASE_URL",
            "postgresql://postgres:postgres@localhost:5432/pend_db",
        )
        self.client = genai.Client()
        self._init_db()

    def _get_connection(self):
        """Establishes and registers pgvector extension on psycopg2 connection."""
        conn = psycopg2.connect(self.db_url)
        register_vector(conn)
        return conn

    def _init_db(self):
        """Ensures vector extension and document_embeddings table exist in PostgreSQL."""
        try:
            conn = self._get_connection()
            with conn.cursor() as cur:
                cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS document_embeddings (
                        id SERIAL PRIMARY KEY,
                        file_path TEXT NOT NULL,
                        content_chunk TEXT NOT NULL,
                        embedding vector(768),
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                conn.commit()
            conn.close()
            print("[RAG SERVICE] PostgreSQL pgvector Store Initialized.")
        except Exception as e:
            print(f"[RAG SERVICE WARNING] Failed to Initialize pgvector Database : {e}")

    def query_similar_code(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Generates embedding for a query string and returns top-k nearest code chunks.

        Args:
            query: User prompt or codebase search string.
            top_k: Number of nearest matches to return (defaults to 5).

        Returns:
            List of dictionaries containing matching file_path, content_chunk and distance.
        """
        try:
            response = self.client.models.embed_content(
                model="text-embedding-004", contents=query
            )
            query_vector = response.embeddings[0].values

            conn = self._get_connection()
            results = []
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT file_path, content_chunk, embedding <-> %s::vector AS distance
                    FROM document_embeddings
                    ORDER BY distance ASC
                    LIMIT %s;
                """,
                    (query_vector, top_k),
                )
                rows = cur.fetchall()
                for row in rows:
                    results.append(
                        {
                            "file_path": row[0],
                            "content_chunk": row[1],
                            "distance": float(row[2]),
                        }
                    )
            conn.close()
            return results
        except Exception as e:
            print(f"[RAG SEARCH ERROR] Vector Search Failed : {e}")
            return []
