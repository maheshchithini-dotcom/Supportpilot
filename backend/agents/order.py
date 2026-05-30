
from config import get_llm

llm = get_llm()

def order_agent(state: dict) -> dict:
    print(f"\n📦 ORDER AGENT: Resolving order/delivery issue...")

    prompt = f"""
    You are a specialist customer support agent for SupportPilot.
    You handle ORDER, DELIVERY, and BOOKING issues for ANY industry.

    Customer Name: {state['customer_name']}
    Complaint: {state['complaint']}
    Priority: {state['priority']}
    Customer Sentiment: {state['sentiment']}

    Write a professional, empathetic response following these rules:
    
    1. Start with "Dear {state['customer_name']},"
    2. Acknowledge the specific issue clearly
    3. If sentiment is angry — apologise sincerely first
    4. Provide a clear solution or next steps
    5. Give a realistic timeline for resolution
    6. End with reassurance and your support contact
    7. Sign off as "SupportPilot Team"

    Tone rules:
    - angry customer → extra empathy, apologise twice
    - neutral customer → professional and helpful
    - calm customer → friendly and efficient

    Keep response under 120 words.
    Do NOT use bullet points — write in natural paragraphs.
    """

    resolution = llm.invoke(prompt).content.strip()
    print(f"   ✅ Resolution drafted ({len(resolution)} chars)")

    return {"resolution": resolution}