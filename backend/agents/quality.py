
from config import get_llm

llm = get_llm()

def quality_agent(state: dict) -> dict:
    print(f"\n✅ QUALITY AGENT: Reviewing response...")
    print(f"   Attempt: {state.get('attempts', 0) + 1}/3")

    prompt = f"""
    You are a senior quality reviewer for SupportPilot customer support.

    Original Complaint: {state['complaint']}
    Customer Sentiment: {state['sentiment']}
    Agent Response: {state['resolution']}

    Score this response from 1 to 10 based on these criteria:
    - Empathy (2 points): Does it acknowledge the customer's feelings?
    - Clarity (2 points): Is the solution clear and easy to understand?
    - Completeness (2 points): Does it fully address the complaint?
    - Professionalism (2 points): Is the tone appropriate and professional?
    - Resolution (2 points): Does it provide a concrete solution or next steps?

    Respond in EXACTLY this format with no extra text:
    SCORE: [number between 1 and 10]
    FEEDBACK: [one clear sentence on what to improve, or "Excellent response" if score is 8 or above]
    FINAL_RESPONSE: [if score is 8 or above keep the response exactly as is, otherwise rewrite it to be better]

    Important rules:
    - Be strict — only give 8+ if the response is truly excellent
    - If rewriting, keep the same format but make it more empathetic and complete
    - Always start rewritten response with "Dear {state['customer_name']},"
    - Always end rewritten response with "SupportPilot Team"
    """

    response = llm.invoke(prompt).content.strip()

    # Parse safely
    lines = response.split('\n')
    score = 7
    feedback = "Needs improvement"
    final_response = state['resolution']

    for i, line in enumerate(lines):
        line = line.strip()
        if line.startswith("SCORE:"):
            try:
                # Extract just the number
                num = ''.join(filter(str.isdigit, line.split(":", 1)[1].strip()))
                score = int(num) if num else 7
                # Clamp between 1 and 10
                score = max(1, min(10, score))
            except:
                score = 7
        elif line.startswith("FEEDBACK:"):
            feedback = line.split(":", 1)[1].strip()
        elif line.startswith("FINAL_RESPONSE:"):
            # Get everything after FINAL_RESPONSE: including multiple lines
            remaining = lines[i:]
            final_response = '\n'.join(remaining).replace("FINAL_RESPONSE:", "", 1).strip()
            break

    attempts = state.get("attempts", 0) + 1

    print(f"   Score: {score}/10")
    print(f"   Feedback: {feedback}")

    return {
        "quality_score": score,
        "quality_feedback": feedback,
        "final_response": final_response,
        "attempts": attempts
    }