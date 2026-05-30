from sqlalchemy import create_engine, Column, String, Integer, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

# ── PostgreSQL connection ──────────────────────────────
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:root123@localhost:5432/supportpilot"
)

engine = create_engine(
    DATABASE_URL,
    pool_size=10,          # max connections in pool
    max_overflow=20,       # extra connections if pool full
    pool_pre_ping=True,    # test connection before using
    echo=False             # set True to see SQL queries
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ── Ticket table ───────────────────────────────────────
class TicketDB(Base):
    __tablename__ = "tickets"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4())[:8].upper()
    )
    customer_name = Column(String(100), nullable=False)
    complaint = Column(Text, nullable=False)
    category = Column(String(50), default="general")
    priority = Column(String(20), default="medium")
    sentiment = Column(String(20), default="neutral")
    resolution = Column(Text, nullable=True)
    quality_score = Column(Integer, default=0)
    attempts = Column(Integer, default=1)
    status = Column(String(20), default="resolved")
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

# ── Create all tables ──────────────────────────────────
def create_tables():
    print("🗄️  Connecting to PostgreSQL...")
    Base.metadata.create_all(bind=engine)
    print("   ✅ Tables ready!")

# ── DB session dependency for FastAPI ─────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()