
export default function ChatWindow({ messages }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "16px"
    }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
          }}
        >
          <div style={{
            maxWidth: "70%",
            padding: "12px 16px",
            borderRadius: msg.role === "user"
              ? "16px 16px 4px 16px"
              : "16px 16px 16px 4px",
            backgroundColor: msg.role === "user" ? "#4f46e5" : "#f5f3ff",
            color: msg.role === "user" ? "#ffffff" : "#1e1b4b",
            fontSize: "14px",
            lineHeight: "1.6"
          }}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}