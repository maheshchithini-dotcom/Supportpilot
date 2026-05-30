
import StatusBadge from "./StatusBadge";

export default function TicketCard({ ticket, onClick }) {
  return (
    <div
      onClick={() => onClick(ticket)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #e0e7ff",
        boxShadow: "0 2px 8px rgba(79,70,229,0.06)",
        cursor: "pointer",
        transition: "all 0.2s"
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
      }}>
        <span style={{
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#6b7280",
          backgroundColor: "#f3f4f6",
          padding: "3px 8px",
          borderRadius: "6px"
        }}>
          #{ticket.id}
        </span>
        <StatusBadge type="status" value={ticket.status} />
      </div>

      {/* Customer name */}
      <div style={{
        fontWeight: "600",
        color: "#1e1b4b",
        fontSize: "15px",
        marginBottom: "6px"
      }}>
        {ticket.customer_name}
      </div>

      {/* Complaint preview */}
      <div style={{
        fontSize: "13px",
        color: "#6b7280",
        marginBottom: "12px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }}>
        {ticket.complaint}
      </div>

      {/* Tags */}
      <div style={{
        display: "flex",
        gap: "6px",
        flexWrap: "wrap"
      }}>
        <StatusBadge type="category" value={ticket.category} />
        <StatusBadge type="priority" value={ticket.priority} />
        <StatusBadge type="sentiment" value={ticket.sentiment} />
        <span style={{
          backgroundColor: "#e0e7ff",
          color: "#4f46e5",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "500"
        }}>
          ⭐ {ticket.quality_score}/10
        </span>
      </div>
    </div>
  );
}