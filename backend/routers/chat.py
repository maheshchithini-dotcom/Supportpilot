
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from database import get_db, TicketDB
from models import ChatRequest, ChatResponse
from schemas import get_initial_state

router = APIRouter()

# Will be set from main.py
agent_graph = None

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    print(f"\n{'='*50}")
    print(f"🎫 NEW TICKET: {request.customer_name}")
    print(f"📝 Complaint: {request.complaint[:80]}...")
    print(f"{'='*50}")

    # Run the full agent graph
    result = agent_graph.invoke(
        get_initial_state(request.customer_name, request.complaint)
    )

    # Generate ticket ID
    ticket_id = str(uuid.uuid4())[:8].upper()

    # Save to database
    ticket = TicketDB(
        id=ticket_id,
        customer_name=request.customer_name,
        complaint=request.complaint,
        category=result.get("category", "general"),
        priority=result.get("priority", "medium"),
        sentiment=result.get("sentiment", "neutral"),
        resolution=result.get("final_response", ""),
        quality_score=result.get("quality_score", 0),
        attempts=result.get("attempts", 1),
        status="resolved",
        resolved_at=datetime.utcnow()
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    print(f"\n✅ TICKET {ticket_id} RESOLVED!")
    print(f"   Category: {ticket.category}")
    print(f"   Priority: {ticket.priority}")
    print(f"   Quality: {ticket.quality_score}/10")

    return ChatResponse(
        ticket_id=ticket_id,
        customer_name=request.customer_name,
        category=ticket.category,
        priority=ticket.priority,
        sentiment=ticket.sentiment,
        final_response=ticket.resolution,
        quality_score=ticket.quality_score,
        attempts=ticket.attempts,
        status=ticket.status
    )