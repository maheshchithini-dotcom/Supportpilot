
from config import get_llm

llm = get_llm()

def technical_agent(state: dict) -> dict:
    print(f"\n🔧 TECHNICAL AGENT: Resolving technical issue...")

    prompt = f"""
    You are a specialist customer support agent for SupportPilot.
    You handle TECHNICAL, APP, and SYSTEM issues for ANY industry.

    Customer Name: {state['customer_name']}
    Complaint: {state['complaint']}
    Priority: {state['priority']}
    Customer Sentiment: {state['sentiment']}

    Write a professional, helpful response following these rules:

    1. Start with "Dear {state['customer_name']},"
    2. Acknowledge the technical problem clearly
    3. If sentiment is angry — apologise sincerely first
    4. Provide exactly 3 clear troubleshooting steps numbered 1, 2, 3
    5. Mention that if steps don't work, escalate to tech team
    6. Give a resolution timeline (e.g. within 24 hours)
    7. Provide support contact: support@supportpilot.ai
    8. End positively and reassuringly
    9. Sign off as "SupportPilot Team"

    Tone rules:
    - angry customer → extra empathy, apologise twice
    - neutral customer → professional and clear
    - calm customer → friendly and step by step

    Keep response under 150 words.
    Do NOT use bullet points — write steps as "Step 1:", "Step 2:", "Step 3:".
    """

    resolution = llm.invoke(prompt).content.strip()
    print(f"   ✅ Resolution drafted ({len(resolution)} chars)")

    return {"resolution": resolution}