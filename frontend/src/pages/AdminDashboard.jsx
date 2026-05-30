import { useState, useEffect } from "react";
import { getTickets, getAnalytics } from "../services/api";

const priorityColors = {
  high: { bg: "#fee2e2", color: "#dc2626" },
  medium: { bg: "#fef3c7", color: "#d97706" },
  low: { bg: "#dcfce7", color: "#16a34a" },
};

const categoryEmoji = {
  order: "📦",
  refund: "💳",
  technical: "🔧",
  billing: "🧾",
  general: "💬",
};

const sentimentEmoji = {
  angry: "😠",
  neutral: "😐",
  calm: "😊",
};

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ticketsRes, analyticsRes] = await Promise.all([
        getTickets(),
        getAnalytics(),
      ]);
      setTickets(ticketsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === "all") return true;
    return t.category === filter;
  });

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        flexDirection: "column",
        gap: "16px"
      }}>
        <div style={{ fontSize: "40px" }}>🤖</div>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "32px 20px"
    }}>

      {/* ── Header ────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "28px"
      }}>
        <div>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1e1b4b"
          }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
            Monitor all support tickets and analytics
          </p>
        </div>
        <button
          onClick={fetchData}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* ── Analytics Cards ───────────────────────── */}
      {analytics && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}>

          {/* Total tickets */}
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
              Total Tickets
            </p>
            <p style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#1e1b4b"
            }}>
              {analytics.total_tickets}
            </p>
          </div>

          {/* Resolved */}
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
              Resolved
            </p>
            <p style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#16a34a"
            }}>
              {analytics.resolved_tickets}
            </p>
          </div>

          {/* Avg quality */}
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
              Avg Quality
            </p>
            <p style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#4f46e5"
            }}>
              {analytics.avg_quality_score}
              <span style={{
                fontSize: "16px",
                color: "#6b7280",
                fontWeight: "400"
              }}>
                /10
              </span>
            </p>
          </div>

          {/* By category */}
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
              marginBottom: "12px"
            }}>
              By Category
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {Object.entries(analytics.by_category).map(([key, val]) => (
                <div key={key} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px"
                }}>
                  <span style={{ color: "#374151" }}>
                    {categoryEmoji[key]} {key}
                  </span>
                  <span style={{
                    fontWeight: "600",
                    color: "#4f46e5"
                  }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By priority */}
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
              marginBottom: "12px"
            }}>
              By Priority
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {Object.entries(analytics.by_priority).map(([key, val]) => (
                <div key={key} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px"
                }}>
                  <span style={{
                    color: priorityColors[key]?.color || "#374151"
                  }}>
                    {key}
                  </span>
                  <span style={{ fontWeight: "600", color: "#374151" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By sentiment */}
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
              marginBottom: "12px"
            }}>
              By Sentiment
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {Object.entries(analytics.by_sentiment).map(([key, val]) => (
                <div key={key} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px"
                }}>
                  <span style={{ color: "#374151" }}>
                    {sentimentEmoji[key]} {key}
                  </span>
                  <span style={{ fontWeight: "600", color: "#374151" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ── Filter tabs ───────────────────────────── */}
      <div style={{
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        {["all", "order", "refund", "technical", "billing", "general"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1.5px solid",
              borderColor: filter === f ? "#4f46e5" : "#e0e7ff",
              backgroundColor: filter === f ? "#4f46e5" : "#ffffff",
              color: filter === f ? "#ffffff" : "#6b7280",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {f === "all" ? "🎯 All" : `${categoryEmoji[f]} ${f}`}
          </button>
        ))}
      </div>

      {/* ── Tickets table ─────────────────────────── */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e0e7ff",
        boxShadow: "0 2px 8px rgba(79,70,229,0.06)",
        overflow: "hidden"
      }}>

        {/* Table header */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid #e0e7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h2 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#1e1b4b"
          }}>
            All Tickets
            <span style={{
              marginLeft: "8px",
              backgroundColor: "#e0e7ff",
              color: "#4f46e5",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "12px"
            }}>
              {filteredTickets.length}
            </span>
          </h2>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9ff" }}>
                {["Ticket ID", "Customer", "Category", "Priority", "Sentiment", "Quality", "Status", "Action"].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e0e7ff"
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={8} style={{
                    textAlign: "center",
                    padding: "48px",
                    color: "#9ca3af",
                    fontSize: "15px"
                  }}>
                    🎫 No tickets yet. Submit a complaint to get started!
                  </td>
                </tr>
              )}
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  style={{
                    borderBottom: "1px solid #f3f4f6",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafbff",
                    transition: "background 0.15s"
                  }}
                >
                  {/* Ticket ID */}
                  <td style={{ padding: "14px 16px" }}>
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
                  </td>

                  {/* Customer */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{
                      fontWeight: "600",
                      color: "#1e1b4b"
                    }}>
                      {ticket.customer_name}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      marginTop: "2px",
                      maxWidth: "180px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {ticket.complaint}
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      backgroundColor: "#ede9fe",
                      color: "#7c3aed",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {categoryEmoji[ticket.category]} {ticket.category}
                    </span>
                  </td>

                  {/* Priority */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      backgroundColor: priorityColors[ticket.priority]?.bg || "#f3f4f6",
                      color: priorityColors[ticket.priority]?.color || "#374151",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      {ticket.priority}
                    </span>
                  </td>

                  {/* Sentiment */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {sentimentEmoji[ticket.sentiment]}
                    </span>
                  </td>

                  {/* Quality */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontWeight: "700",
                      color: ticket.quality_score >= 8
                        ? "#16a34a"
                        : ticket.quality_score >= 6
                        ? "#d97706"
                        : "#dc2626",
                      fontSize: "15px"
                    }}>
                      {ticket.quality_score}
                      <span style={{
                        fontSize: "11px",
                        color: "#9ca3af",
                        fontWeight: "400"
                      }}>
                        /10
                      </span>
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      backgroundColor: "#dcfce7",
                      color: "#16a34a",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      ✅ {ticket.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td style={{ padding: "14px 16px" }}>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "#f5f3ff",
                        color: "#4f46e5",
                        border: "1px solid #e0e7ff",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Ticket Detail Modal ───────────────────── */}
      {selectedTicket && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
          }}>

            {/* Modal header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#1e1b4b"
              }}>
                Ticket #{selectedTicket.id}
              </h2>
              <button
                onClick={() => setSelectedTicket(null)}
                style={{
                  backgroundColor: "#f3f4f6",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                ✕
              </button>
            </div>

            {/* Customer info */}
            <div style={{
              backgroundColor: "#f8f9ff",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "16px"
            }}>
              <div style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "4px"
              }}>
                Customer
              </div>
              <div style={{
                fontWeight: "600",
                color: "#1e1b4b",
                fontSize: "16px"
              }}>
                {selectedTicket.customer_name}
              </div>
            </div>

            {/* Complaint */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "8px"
              }}>
                Complaint
              </div>
              <p style={{
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.6",
                backgroundColor: "#fff7ed",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #fed7aa"
              }}>
                {selectedTicket.complaint}
              </p>
            </div>

            {/* Tags */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px"
            }}>
              <span style={{
                backgroundColor: "#ede9fe",
                color: "#7c3aed",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {categoryEmoji[selectedTicket.category]} {selectedTicket.category}
              </span>
              <span style={{
                backgroundColor: priorityColors[selectedTicket.priority]?.bg,
                color: priorityColors[selectedTicket.priority]?.color,
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {selectedTicket.priority} priority
              </span>
              <span style={{
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                {sentimentEmoji[selectedTicket.sentiment]} {selectedTicket.sentiment}
              </span>
              <span style={{
                backgroundColor: "#e0e7ff",
                color: "#4f46e5",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px"
              }}>
                ⭐ {selectedTicket.quality_score}/10
              </span>
            </div>

            {/* AI Response */}
            <div>
              <div style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "8px"
              }}>
                AI Response
              </div>
              <p style={{
                fontSize: "14px",
                color: "#1e1b4b",
                lineHeight: "1.7",
                backgroundColor: "#f5f3ff",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #ddd6fe",
                whiteSpace: "pre-line"
              }}>
                {selectedTicket.resolution}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}