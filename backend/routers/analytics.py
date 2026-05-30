
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db, TicketDB
from models import AnalyticsResponse

router = APIRouter()

@router.get("/analytics", response_model=AnalyticsResponse)
def get_analytics(db: Session = Depends(get_db)):
    tickets = db.query(TicketDB).all()
    total = len(tickets)

    if total == 0:
        return AnalyticsResponse(
            total_tickets=0,
            resolved_tickets=0,
            avg_quality_score=0.0,
            by_category={},
            by_priority={},
            by_sentiment={}
        )

    resolved = len([t for t in tickets if t.status == "resolved"])
    avg_quality = sum(t.quality_score for t in tickets) / total

    by_category = {}
    by_priority = {}
    by_sentiment = {}

    for t in tickets:
        by_category[t.category] = by_category.get(t.category, 0) + 1
        by_priority[t.priority] = by_priority.get(t.priority, 0) + 1
        by_sentiment[t.sentiment] = by_sentiment.get(t.sentiment, 0) + 1

    return AnalyticsResponse(
        total_tickets=total,
        resolved_tickets=resolved,
        avg_quality_score=round(avg_quality, 1),
        by_category=by_category,
        by_priority=by_priority,
        by_sentiment=by_sentiment
    )