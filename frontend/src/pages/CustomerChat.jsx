import { useState } from "react";
import { sendComplaint } from "../services/api";

const priorityColors = {
  high: { bg: "#fee2e2", color: "#dc2626" },
  medium: { bg: "#fef3c7", color: "#d97706" },
  low: { bg: "#dcfce7", color: "#16a34a" },
};

const sentimentEmoji = {
  angry: "😠",
  neutral: "😐",
  calm: "😊",
};

const categoryEmoji = {
  order: "📦",
  refund: "💳",
  technical: "🔧",
  billing: "🧾",
  general: "💬",
};

const loadingSteps = [
  { emoji: "🎯", text: "Triage agent classifying your complaint..." },
  { emoji: "🔀", text: "Routing to specialist agent..." },
  { emoji: "✍️", text: "Drafting personalised response..." },
  { emoji: "✅", text: "Quality agent reviewing response..." },
  { emoji: "💾", text: "Saving ticket to database..." },
];

export default function CustomerChat() {
  const [name, setName] = useState("");
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !complaint.trim()) {
      setError("Please fill in both your name and complaint.");
      return;
    }
    if (complaint.trim().length < 10) {
      setError("Please describe your issue in more detail.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Animate loading steps
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    try {
      const res = await sendComplaint({
        customer_name: name,
        complaint: complaint,
      });
      clearInterval(interval);
      setResult(res.data);
    } catch (e) {
      clearInterval(interval);
      setError(
        e.response?.data?.detail ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setName("");
    setComplaint("");
    setError("");
    setLoadingStep(0);
  };

  return (
    <div style={{
      maxWidth: "680px",
      margin: "0 auto",
      padding: "40px 20px"
    }}>

      {/* ── Header ────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "#1e1b4b",
          marginBottom: "8px"
        }}>
          How can we help you? 🛩️
        </h1>
        <p style={{ color: "#6b7280", fontSize: "15px" }}>
          Describe your issue and our AI agents will resolve it instantly
        </p>
      </div>

      {/* ── Form Card ─────────────────────────────── */}
      {!result && (
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
          border: "1px solid #e0e7ff"
        }}>

          {/* Name input */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ravi Kumar"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1.5px solid #e0e7ff",
                fontSize: "14px",
                outline: "none",
                backgroundColor: loading ? "#f9fafb" : "#ffffff",
                color: "#1e1b4b",
                transition: "border 0.2s"
              }}
            />
          </div>

          {/* Complaint textarea */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Describe your issue
            </label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="e.g. My order hasn't arrived after 5 days. Tracking shows it's stuck in Mumbai..."
              rows={5}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1.5px solid #e0e7ff",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
                backgroundColor: loading ? "#f9fafb" : "#ffffff",
                color: "#1e1b4b",
                fontFamily: "inherit",
                transition: "border 0.2s"
              }}
            />
            <div style={{
              textAlign: "right",
              fontSize: "12px",
              color: "#9ca3af",
              marginTop: "4px"
            }}>
              {complaint.length} characters
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              marginBottom: "16px"
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: loading ? "#818cf8" : "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            {loading ? "🤖 AI Agents Working..." : "Submit Complaint →"}
          </button>

          {/* Loading steps */}
          {loading && (
            <div style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "#f5f3ff",
              borderRadius: "10px",
              border: "1px solid #e0e7ff"
            }}>
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "6px 0",
                    opacity: index <= loadingStep ? 1 : 0.3,
                    transition: "opacity 0.5s"
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{step.emoji}</span>
                  <span style={{
                    fontSize: "13px",
                    color: index <= loadingStep ? "#4f46e5" : "#9ca3af",
                    fontWeight: index === loadingStep ? "600" : "400"
                  }}>
                    {step.text}
                  </span>
                  {index < loadingStep && (
                    <span style={{ marginLeft: "auto", color: "#16a34a" }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Result Card ───────────────────────────── */}
      {result && (
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
          border: "1px solid #e0e7ff"
        }}>

          {/* Ticket header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}>
            <div>
              <div style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px"
              }}>
                Ticket ID
              </div>
              <div style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1e1b4b",
                fontFamily: "monospace"
              }}>
                #{result.ticket_id}
              </div>
            </div>
            <div style={{
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              ✅ Resolved
            </div>
          </div>

          {/* Tags row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px"
          }}>
            {/* Category */}
            <span style={{
              backgroundColor: "#ede9fe",
              color: "#7c3aed",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500"
            }}>
              {categoryEmoji[result.category]} {result.category}
            </span>

            {/* Priority */}
            <span style={{
              backgroundColor: priorityColors[result.priority]?.bg || "#f3f4f6",
              color: priorityColors[result.priority]?.color || "#374151",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500"
            }}>
              {result.priority} priority
            </span>

            {/* Sentiment */}
            <span style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500"
            }}>
              {sentimentEmoji[result.sentiment]} {result.sentiment}
            </span>

            {/* Quality score */}
            <span style={{
              backgroundColor: "#e0e7ff",
              color: "#4f46e5",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "500"
            }}>
              ⭐ {result.quality_score}/10
            </span>

            {/* Attempts */}
            <span style={{
              backgroundColor: "#f3f4f6",
              color: "#6b7280",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
            }}>
              🔄 {result.attempts} attempt{result.attempts > 1 ? "s" : ""}
            </span>
          </div>

          {/* Response box */}
          <div style={{
            background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #ddd6fe",
            marginBottom: "20px"
          }}>
            <div style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#7c3aed",
              letterSpacing: "1px",
              marginBottom: "10px"
            }}>
              🤖 AI RESPONSE
            </div>
            <p style={{
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#1e1b4b",
              whiteSpace: "pre-line"
            }}>
              {result.final_response}
            </p>
          </div>

          {/* Footer */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <p style={{
              fontSize: "12px",
              color: "#9ca3af"
            }}>
              Powered by SupportPilot AI • Reference: #{result.ticket_id}
            </p>
            <button
              onClick={handleReset}
              style={{
                padding: "8px 20px",
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              New Complaint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}