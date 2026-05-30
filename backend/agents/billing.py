
from config import get_llm

llm = get_llm()

def billing_agent(state: dict) -> dict:
    print(f"\n🧾 BILLING AGENT: Resolving billing/subscription issue...")

    prompt = f"""
    You are a specialist customer support agent for SupportPilot.
    You handle BILLING, SUBSCRIPTION, and INVOICE issues for ANY industry.

    Customer Name: {state['customer_name']}
    Complaint: {state['complaint']}
    Priority: {state['priority']}
    Customer Sentiment: {state['sentiment']}

    Write a professional, clear response following these rules:

    1. Start with "Dear {state['customer_name']},"
    2. Acknowledge the billing concern clearly
    3. If sentiment is angry — apologise sincerely first
    4. Explain the charges or subscription details clearly
    5. Offer to review the invoice or subscription plan
    6. Provide billing support contact: billing@supportpilot.ai
    7. Give resolution timeline (e.g. within 48 hours)
    8. End with reassurance
    9. Sign off as "SupportPilot Team"

    Tone rules:
    - angry customer → extra empathy, apologise twice
    - neutral customer → professional and informative
    - calm customer → friendly and detailed

    Keep response under 120 words.
    Do NOT use bullet points — write in natural paragraphs.
    """

    resolution = llm.invoke(prompt).content.strip()
    print(f"   ✅ Resolution drafted ({len(resolution)} chars)")

    return {"resolution": resolution}