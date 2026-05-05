// Shared inline style tokens used across pages
export const S = {
  // Layout
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f1f5f9",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "24px",
  },
  // Cards
  card: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "32px",
  },
  // Inputs
  input: {
    width: "100%",
    padding: "10px 14px",
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#f1f5f9",
    fontSize: "14px",
    outline: "none",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "6px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  // Buttons
  btnPrimary: {
    width: "100%",
    padding: "11px",
    background: "#f59e0b",
    color: "#0f172a",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
  btnDanger: {
    padding: "6px 14px",
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "6px 14px",
    background: "rgba(255,255,255,0.05)",
    color: "#cbd5e1",
    border: "1px solid #334155",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
  // Nav
  nav: {
    background: "#1e293b",
    borderBottom: "1px solid #334155",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
  },
  navLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "8px",
    transition: "all 0.15s",
  },
  // Badge
  badge: (color) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: color + "22",
    color: color,
    border: `1px solid ${color}44`,
  }),
};

const BLOOD_COLORS = {
  "A+": "#f87171", "A-": "#fb923c",
  "B+": "#a78bfa", "B-": "#818cf8",
  "AB+": "#34d399", "AB-": "#2dd4bf",
  "O+": "#60a5fa", "O-": "#38bdf8",
};
export const bloodColor = (bg) => BLOOD_COLORS[bg] || "#94a3b8";
