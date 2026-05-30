
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ── Request Models (what comes IN) ────────────────────

class ChatRequest(BaseModel):
    customer_name: str
    complaint: str

# ── Response Models (what goes OUT) ───────────────────

class ChatResponse(BaseModel):
    ticket_id: str
    customer_name: str
    category: str
    priority: str
    sentiment: str
    final_response: str
    quality_score: int
    attempts: int
    status: str

class TicketResponse(BaseModel):
    id: str
    customer_name: str
    complaint: str
    category: str
    priority: str
    sentiment: str
    resolution: Optional[str]
    quality_score: int
    attempts: int
    status: str
    created_at: datetime
    resolved_at: Optional[datetime]

    class Config:
        from_attributes = True

class AnalyticsResponse(BaseModel):
    total_tickets: int
    resolved_tickets: int
    avg_quality_score: float
    by_category: dict
    by_priority: dict
    by_sentiment: dict