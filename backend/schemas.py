from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# ── Agent State Schema ─────────────────────────────────
# This is the shared state passed between all agents

class SupportState(dict):
    """
    Shared state between all LangGraph agents.
    Every agent reads from and writes to this state.
    """
    pass

# ── Default initial state ──────────────────────────────

def get_initial_state(customer_name: str, complaint: str) -> dict:
    return {
        # Input
        "customer_name": customer_name,
        "complaint": complaint,

        # Triage output
        "category": "",
        "priority": "",
        "sentiment": "",

        # Specialist output
        "resolution": "",

        # Quality output
        "quality_score": 0,
        "quality_feedback": "",
        "final_response": "",

        # Control
        "attempts": 0,
    }

# ── Category definitions ───────────────────────────────

CATEGORIES = {
    "order": "📦 Order & Delivery",
    "refund": "💳 Refund & Payment",
    "technical": "🔧 Technical Issues",
    "billing": "🧾 Billing & Subscription",
    "general": "💬 General Inquiry"
}

PRIORITIES = {
    "high": "🔴 High",
    "medium": "🟡 Medium",
    "low": "🟢 Low"
}

SENTIMENTS = {
    "angry": "😠 Angry",
    "neutral": "😐 Neutral",
    "calm": "😊 Calm"
}