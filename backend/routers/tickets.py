
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db, TicketDB
from models import TicketResponse

router = APIRouter()

# Get all tickets
@router.get("/tickets", response_model=List[TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
    tickets = db.query(TicketDB)\
        .order_by(TicketDB.created_at.desc())\
        .all()
    return tickets

# Get single ticket by ID
@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(TicketDB)\
        .filter(TicketDB.id == ticket_id.upper())\
        .first()
    if not ticket:
        raise HTTPException(status_code=404, detail=f"Ticket {ticket_id} not found")
    return ticket