
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# Load all keys from .env
load_dotenv()

# App settings
APP_NAME = os.getenv("APP_NAME", "SupportPilot")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
DEBUG = os.getenv("DEBUG", "true").lower() == "true"
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

# Shared LLM — used by all agents
def get_llm():
    return ChatOpenAI(
        model=os.getenv("MODEL_NAME", "openai/gpt-4o-mini"),
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
        temperature=0.3
    )