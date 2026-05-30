import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

// ── Chat ──────────────────────────────────────────────
export const sendComplaint = (data) => API.post("/chat", data);

// ── Tickets ───────────────────────────────────────────
export const getTickets = () => API.get("/tickets");
export const getTicket = (id) => API.get(`/tickets/${id}`);

// ── Analytics ─────────────────────────────────────────
export const getAnalytics = () => API.get("/analytics");

// ── Health ────────────────────────────────────────────
export const checkHealth = () => API.get("/health");