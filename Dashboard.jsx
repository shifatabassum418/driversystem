import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { S, bloodColor } from "../components/styles.js";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Admin","email":""}');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/drivers")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDrivers(data.drivers);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const bloodGroupCounts = drivers.reduce((acc, d) => {
    acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={S.page}>
      <Navbar />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Greeting */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9" }}>
            Welcome back, {user.name} 👋
          </h1>
          <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>{user.email}</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {[
            { icon: "🪪", label: "Total Drivers", value: loading ? "…" : drivers.length, color: "#f59e0b" },
            { icon: "✅", label: "Active", value: loading ? "…" : drivers.length, color: "#34d399" },
            { icon: "🩸", label: "Blood Groups", value: loading ? "…" : Object.keys(bloodGroupCounts).length, color: "#f87171" },
          ].map((s) => (
            <div key={s.label} style={{ ...S.card, display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: s.color + "22", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "22px", flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "#f1f5f9" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <Link to="/drivers/add" style={{ textDecoration: "none" }}>
            <div style={{
              ...S.card,
              cursor: "pointer",
              transition: "border-color 0.2s",
              borderColor: "#f59e0b44",
            }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>➕</div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#f1f5f9", marginBottom: "6px" }}>Add New Driver</div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>Register a driver with all details</div>
            </div>
          </Link>
          <Link to="/drivers" style={{ textDecoration: "none" }}>
            <div style={{ ...S.card, cursor: "pointer" }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>📋</div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#f1f5f9", marginBottom: "6px" }}>View All Drivers</div>
              <div style={{ fontSize: "13px", color: "#64748b" }}>Browse, search and manage drivers</div>
            </div>
          </Link>
        </div>

        {/* Recent drivers preview */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9" }}>Recent Drivers</h2>
            <Link to="/drivers" style={{ fontSize: "13px", color: "#f59e0b", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {loading ? (
            <p style={{ color: "#64748b", fontSize: "14px" }}>Loading…</p>
          ) : drivers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: "#475569" }}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>🪪</div>
              <p style={{ fontSize: "14px" }}>No drivers yet.</p>
              <Link to="/drivers/add" style={{ color: "#f59e0b", fontSize: "13px" }}>Add your first driver →</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {drivers.slice(0, 5).map((d) => (
                <div key={d.id} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "12px 14px", background: "#0f172a", borderRadius: "10px",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    background: "#1e293b", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "18px", flexShrink: 0,
                  }}>👤</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#f1f5f9" }}>{d.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "monospace" }}>{d.licenseNumber}</div>
                  </div>
                  <span style={S.badge(bloodColor(d.bloodGroup))}>{d.bloodGroup}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}