import os
from dotenv import load_dotenv

# Load Environment Variables from `.env` in `backend` Directory
load_dotenv()

# Fallback Base Model Alias
DEFAULT_MODEL_NAME = "gemini-3.7-flash"


def get_model_name() -> str:
    """Returns the configured Gemini Model Name from Environment / Fallback Default."""
    return os.getenv("GEMINI_MODEL_NAME", DEFAULT_MODEL_NAME)
