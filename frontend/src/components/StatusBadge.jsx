
export default function StatusBadge({ type, value }) {
  const configs = {
    priority: {
      high: { bg: "#fee2e2", color: "#dc2626", label: "🔴 High" },
      medium: { bg: "#fef3c7", color: "#d97706", label: "🟡 Medium" },
      low: { bg: "#dcfce7", color: "#16a34a", label: "🟢 Low" },
    },
    category: {
      order: { bg: "#ede9fe", color: "#7c3aed", label: "📦 Order" },
      refund: { bg: "#ede9fe", color: "#7c3aed", label: "💳 Refund" },
      technical: { bg: "#ede9fe", color: "#7c3aed", label: "🔧 Technical" },
      billing: { bg: "#ede9fe", color: "#7c3aed", label: "🧾 Billing" },
      general: { bg: "#ede9fe", color: "#7c3aed", label: "💬 General" },
    },
    sentiment: {
      angry: { bg: "#fee2e2", color: "#dc2626", label: "😠 Angry" },
      neutral: { bg: "#f3f4f6", color: "#374151", label: "😐 Neutral" },
      calm: { bg: "#dcfce7", color: "#16a34a", label: "😊 Calm" },
    },
    status: {
      resolved: { bg: "#dcfce7", color: "#16a34a", label: "✅ Resolved" },
      open: { bg: "#fef3c7", color: "#d97706", label: "🔓 Open" },
      closed: { bg: "#f3f4f6", color: "#374151", label: "🔒 Closed" },
    },
  };

  const config = configs[type]?.[value];

  if (!config) return null;

  return (
    <span style={{
      backgroundColor: config.bg,
      color: config.color,
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500",
      display: "inline-block"
    }}>
      {config.label}
    </span>
  );
}