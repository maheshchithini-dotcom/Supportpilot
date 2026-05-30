
from config import get_llm

llm = get_llm()

def triage_agent(state: dict) -> dict:
    print(f"\n🎯 TRIAGE AGENT: Analysing complaint...")
    print(f"   Customer: {state['customer_name']}")
    print(f"   Complaint: {state['complaint'][:60]}...")

    prompt = f"""
    You are a customer support triage agent for SupportPilot.
    You work for ANY industry — banking, e-commerce, healthcare, telecom, travel, etc.

    Customer Name: {state['customer_name']}
    Complaint: {state['complaint']}

    Analyse this complaint and respond in EXACTLY this format with no extra text:
    CATEGORY: [order/refund/technical/billing/general]
    PRIORITY: [high/medium/low]
    SENTIMENT: [angry/neutral/calm]

    Category rules:
    - order: delivery delays, missing items, wrong product, cancelled appointments, booking issues
    - refund: payment issues, double charge, refund requests, overcharging
    - technical: app crashes, login issues, website not working, error messages
    - billing: invoice questions, subscription issues, pricing queries
    - general: feedback, information requests, compliments, anything else
    
    Priority rules:
    - high: urgent issue, financial loss, angry customer, time sensitive
    - medium: moderate issue, needs resolution soon
    - low: general query, feedback, not urgent

    Sentiment rules:
    - angry: frustrated, upset, using strong language, threatening
    - neutral: calm but firm, just stating facts
    - calm: polite, understanding, patient
    """

    response = llm.invoke(prompt).content.strip()
    print(f"   Raw response: {response}")

    # Parse response safely
    lines = response.split('\n')
    category = "general"
    priority = "medium"
    sentiment = "neutral"

    for line in lines:
        line = line.strip()
        if line.startswith("CATEGORY:"):
            val = line.split(":", 1)[1].strip().lower()
            if val in ["order", "refund", "technical", "billing", "general"]:
                category = val
        elif line.startswith("PRIORITY:"):
            val = line.split(":", 1)[1].strip().lower()
            if val in ["high", "medium", "low"]:
                priority = val
        elif line.startswith("SENTIMENT:"):
            val = line.split(":", 1)[1].strip().lower()
            if val in ["angry", "neutral", "calm"]:
                sentiment = val

    print(f"   ✅ Category: {category} | Priority: {priority} | Sentiment: {sentiment}")

    return {
        "category": category,
        "priority": priority,
        "sentiment": sentiment
    }