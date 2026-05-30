
export default function StatsCard({ title, value, suffix, color }) {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid #e0e7ff",
      boxShadow: "0 2px 8px rgba(79,70,229,0.06)"
    }}>
      <p style={{
        fontSize: "12px",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "8px"
      }}>
        {title}
      </p>
      <p style={{
        fontSize: "36px",
        fontWeight: "700",
        color: color || "#1e1b4b"
      }}>
        {value}
        {suffix && (
          <span style={{
            fontSize: "16px",
            color: "#6b7280",
            fontWeight: "400"
          }}>
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}