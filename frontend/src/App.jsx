
import { useState } from "react";
import CustomerChat from "./pages/CustomerChat";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("chat");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9ff" }}>

      {/* ── Navbar ────────────────────────────────── */}
      <nav style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e7ff",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(79,70,229,0.08)"
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            backgroundColor: "#4f46e5",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px"
          }}>
            🛩️
          </div>
          <div>
            <span style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#1e1b4b"
            }}>
              Support
            </span>
            <span style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#4f46e5"
            }}>
              Pilot
            </span>
            <div style={{
              fontSize: "10px",
              color: "#818cf8",
              letterSpacing: "1px",
              marginTop: "-2px"
            }}>
              AI-POWERED SUPPORT
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setPage("chat")}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: page === "chat" ? "#4f46e5" : "transparent",
              color: page === "chat" ? "#ffffff" : "#6b7280",
              transition: "all 0.2s"
            }}
          >
            💬 Customer Chat
          </button>
          <button
            onClick={() => setPage("admin")}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: page === "admin" ? "#4f46e5" : "transparent",
              color: page === "admin" ? "#ffffff" : "#6b7280",
              transition: "all 0.2s"
            }}
          >
            📊 Admin Dashboard
          </button>
        </div>

      </nav>

      {/* ── Pages ─────────────────────────────────── */}
      {page === "chat" ? <CustomerChat /> : <AdminDashboard />}

    </div>
  );
}