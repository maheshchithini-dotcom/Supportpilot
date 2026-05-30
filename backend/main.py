
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import APP_NAME, APP_VERSION, CORS_ORIGINS
from database import create_tables
from graph.workflow import build_graph
import routers.chat as chat_router
import routers.tickets as tickets_router
import routers.analytics as analytics_router

# ── Create tables on startup ───────────────────────────
create_tables()

# ── Build agent graph once ─────────────────────────────
graph = build_graph()

# ── Inject graph into chat router ─────────────────────
chat_router.agent_graph = graph

# ── Create FastAPI app ─────────────────────────────────
app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="AI-Powered Customer Support System"
)

# ── CORS — allow React frontend ────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Include all routers ────────────────────────────────
app.include_router(chat_router.router, prefix="/api")
app.include_router(tickets_router.router, prefix="/api")
app.include_router(analytics_router.router, prefix="/api")

# ── Health check ───────────────────────────────────────
@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "app": APP_NAME,
        "version": APP_VERSION
    }

# ── Root ───────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "message": f"Welcome to {APP_NAME} API",
        "version": APP_VERSION,
        "docs": "/docs"
    }