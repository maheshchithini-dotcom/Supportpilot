from langgraph.graph import StateGraph, END
from typing import TypedDict
from agents.triage import triage_agent
from agents.order import order_agent
from agents.refund import refund_agent
from agents.technical import technical_agent
from agents.billing import billing_agent
from agents.general import general_agent
from agents.quality import quality_agent

# ── Shared state definition ────────────────────────────

class SupportState(TypedDict):
    # Input
    customer_name: str
    complaint: str

    # Triage output
    category: str
    priority: str
    sentiment: str

    # Specialist output
    resolution: str

    # Quality output
    quality_score: int
    quality_feedback: str
    final_response: str

    # Control
    attempts: int

# ── Routing function ───────────────────────────────────

def route_to_specialist(state: SupportState) -> str:
    category = state.get("category", "general")
    print(f"\n🔀 ROUTER: Sending to {category} specialist...")

    routes = {
        "order": "order",
        "refund": "refund",
        "technical": "technical",
        "billing": "billing",
        "general": "general"
    }

    return routes.get(category, "general")

# ── Quality check function ─────────────────────────────

def check_quality(state: SupportState) -> str:
    score = state.get("quality_score", 0)
    attempts = state.get("attempts", 0)

    print(f"\n🔍 QUALITY CHECK: Score {score}/10 | Attempt {attempts}/3")

    # Deliver if score is good OR max attempts reached
    if score >= 8 or attempts >= 3:
        print(f"   ✅ Delivering to customer!")
        return "deliver"
    else:
        print(f"   🔁 Quality too low — retrying...")
        return "redo"

# ── Build the graph ────────────────────────────────────

def build_graph():
    print("\n🏗️  Building SupportPilot agent graph...")

    graph = StateGraph(SupportState)

    # ── Add all nodes ──────────────────────────────────
    graph.add_node("triage", triage_agent)
    graph.add_node("order", order_agent)
    graph.add_node("refund", refund_agent)
    graph.add_node("technical", technical_agent)
    graph.add_node("billing", billing_agent)
    graph.add_node("general", general_agent)
    graph.add_node("quality", quality_agent)

    # ── Set entry point ────────────────────────────────
    graph.set_entry_point("triage")

    # ── Triage → route to right specialist ────────────
    graph.add_conditional_edges(
        "triage",
        route_to_specialist,
        {
            "order": "order",
            "refund": "refund",
            "technical": "technical",
            "billing": "billing",
            "general": "general"
        }
    )

    # ── All specialists → quality check ───────────────
    graph.add_edge("order", "quality")
    graph.add_edge("refund", "quality")
    graph.add_edge("technical", "quality")
    graph.add_edge("billing", "quality")
    graph.add_edge("general", "quality")

    # ── Quality → deliver or redo ──────────────────────
    graph.add_conditional_edges(
        "quality",
        check_quality,
        {
            "deliver": END,
            "redo": "triage"
        }
    )

    app = graph.compile()
    print("   ✅ Graph built successfully!")
    return app