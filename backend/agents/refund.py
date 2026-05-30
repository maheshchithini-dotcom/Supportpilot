
from config import get_llm

llm = get_llm()

def refund_agent(state: dict) -> dict:
    print(f"\n💳 REFUND AGENT: Resolving payment/refund issue...")

    prompt = f"""
    You are a specialist customer support agent for SupportPilot.
    You handle PAYMENT, REFUND, and BILLING issues for ANY industry.

    Customer Name: {state['customer_name']}
    Complaint: {state['complaint']}
    Priority: {state['priority']}
    Customer Sentiment: {state['sentiment']}

    Write a professional, reassuring response following these rules:

    1. Start with "Dear {state['customer_name']},"
    2. Acknowledge the payment or refund concern clearly
    3. If sentiment is angry — apologise sincerely first
    4. Explain the refund or resolution process step by step
    5. Give exact timeline (e.g. 5-7 business days)
    6. Provide a unique reference number like REF-SP-12345
    7. Reassure the customer their money is completely safe
    8. End with support contact details
    9. Sign off as "SupportPilot Team"

    Tone rules:
    - angry customer → extra empathy, apologise twice, be very reassuring
    - neutral customer → professional and clear
    - calm customer → friendly and informative

    Keep response under 120 words.
    Do NOT use bullet points — write in natural paragraphs.
    """

    resolution = llm.invoke(prompt).content.strip()
    print(f"   ✅ Resolution drafted ({len(resolution)} chars)")

    return {"resolution": resolution}