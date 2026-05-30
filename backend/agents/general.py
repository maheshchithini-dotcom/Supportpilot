
from config import get_llm

llm = get_llm()

def general_agent(state: dict) -> dict:
    print(f"\n💬 GENERAL AGENT: Handling general inquiry...")

    prompt = f"""
    You are a friendly customer support agent for SupportPilot.
    You handle GENERAL inquiries, feedback, and information requests for ANY industry.

    Customer Name: {state['customer_name']}
    Complaint/Query: {state['complaint']}
    Priority: {state['priority']}
    Customer Sentiment: {state['sentiment']}

    Write a warm, helpful response following these rules:

    1. Start with "Dear {state['customer_name']},"
    2. Acknowledge their query or feedback warmly
    3. If sentiment is angry — apologise sincerely first
    4. Address their query directly and completely
    5. Offer additional help if needed
    6. Provide general support contact: support@supportpilot.ai
    7. End on a positive, friendly note
    8. Sign off as "SupportPilot Team"

    Tone rules:
    - angry customer → extra empathy, apologise twice
    - neutral customer → professional and helpful
    - calm customer → warm and conversational

    Keep response under 100 words.
    Do NOT use bullet points — write in natural paragraphs.
    """

    resolution = llm.invoke(prompt).content.strip()
    print(f"   ✅ Resolution drafted ({len(resolution)} chars)")

    return {"resolution": resolution}