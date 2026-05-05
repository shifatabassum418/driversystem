import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "../components/styles.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    // No backend call — just store and redirect
    localStorage.setItem("token", "demo-token-123");
    localStorage.setItem("user", JSON.stringify({ email, name: "Admin" }));
    navigate("/");
  };

  return (
    <div style={S.center}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "64px", height: "64px", background: "#f59e0b",
            borderRadius: "16px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "32px",
            margin: "0 auto 16px",
            boxShadow: "0 8px 32px rgba(245,158,11,0.3)",
          }}>🚗</div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#f1f5f9" }}>
            Smart Driver Mgmt
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>
            Sign in to your admin account
          </p>
        </div>

        <div style={S.card}>
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px", padding: "12px 16px", marginBottom: "20px",
              color: "#f87171", fontSize: "13px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={S.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@demo.com"
                style={S.input}
                required
              />
            </div>
            <div>
              <label style={S.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Any password works"
                style={S.input}
                required
              />
            </div>
            <button type="submit" style={S.btnPrimary}>
              Sign In
            </button>
          </form>

          <p style={{
            marginTop: "20px", fontSize: "12px", color: "#475569", textAlign: "center",
            padding: "12px", background: "#0f172a", borderRadius: "8px",
          }}>
            💡 Any email &amp; password combination works
          </p>
        </div>
      </div>
    </div>
  );
}