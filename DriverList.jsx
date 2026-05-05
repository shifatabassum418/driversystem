import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../components/Navbar.jsx";
import { S, bloodColor } from "../components/styles.js";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [qrDriver, setQrDriver] = useState(null);

  const fetchDrivers = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/drivers")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDrivers(data.drivers);
        else setError("Failed to load drivers");
      })
      .catch(() => setError("Cannot connect to server"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete driver "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:3001/api/drivers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setDrivers((prev) => prev.filter((d) => d.id !== id));
      else alert("Delete failed: " + data.message);
    } catch {
      alert("Cannot connect to server.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = drivers.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.phone.includes(q) ||
      d.licenseNumber.toLowerCase().includes(q) ||
      d.vehicleNumber.toLowerCase().includes(q)
    );
  });

  const profileUrl = (id) => `http://localhost:5173/driver/${id}`;

  return (
    <div style={S.page}>
      <Navbar />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#f1f5f9" }}>All Drivers</h1>
            <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
              {drivers.length} driver{drivers.length !== 1 ? "s" : ""} registered
            </p>
          </div>
          <Link to="/drivers/add" style={{ textDecoration: "none" }}>
            <button style={{ ...S.btnPrimary, width: "auto", padding: "10px 20px" }}>➕ Add Driver</button>
          </Link>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search by name, phone, license or vehicle..."
          style={{ ...S.input, marginBottom: "20px" }}
        />

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", color: "#f87171", fontSize: "13px",
          }}>⚠️ {error}</div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <p>Loading drivers…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ ...S.card, textAlign: "center", padding: "48px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{search ? "🔍" : "🪪"}</div>
            <p style={{ color: "#94a3b8", fontWeight: "600", marginBottom: "8px" }}>
              {search ? "No drivers match your search" : "No drivers yet"}
            </p>
            {!search && <Link to="/drivers/add" style={{ color: "#f59e0b", fontSize: "14px" }}>Add your first driver →</Link>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filtered.map((d) => (
              <div key={d.id} style={{ ...S.card, padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>👤</div>

                <div style={{ flex: 1, minWidth: "150px" }}>
                  <div style={{ fontWeight: "700", fontSize: "15px", color: "#f1f5f9", marginBottom: "4px" }}>{d.name}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>{d.phone}</div>
                </div>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase" }}>License</div>
                    <div style={{ fontSize: "13px", color: "#cbd5e1", fontFamily: "monospace" }}>{d.licenseNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#475569", textTransform: "uppercase" }}>Vehicle</div>
                    <div style={{ fontSize: "13px", color: "#cbd5e1", fontFamily: "monospace" }}>{d.vehicleNumber}</div>
                  </div>
                  <div>
                    <span style={S.badge(bloodColor(d.bloodGroup))}>🩸 {d.bloodGroup}</span>
                  </div>
                </div>

                {/* QR Code */}
                <div
                  onClick={() => setQrDriver(d)}
                  style={{ background: "white", padding: "4px", borderRadius: "6px", cursor: "pointer" }}
                  title="Click to view QR"
                >
                  <QRCodeCanvas value={profileUrl(d.id)} size={48} />
                </div>

                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <Link to={`/drivers/edit/${d.id}`} style={{ textDecoration: "none" }}>
                    <button style={S.btnSecondary}>✏️ Edit</button>
                  </Link>
                  <button style={S.btnDanger} disabled={deletingId === d.id} onClick={() => handleDelete(d.id, d.name)}>
                    {deletingId === d.id ? "…" : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Modal */}
      {qrDriver && (
        <div
          onClick={() => setQrDriver(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#1e293b", borderRadius: "16px", padding: "32px", textAlign: "center", border: "1px solid #334155" }}
          >
            <p style={{ color: "#f1f5f9", fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>{qrDriver.name}</p>
            <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "20px" }}>Scan to view driver profile</p>
            <div style={{ background: "white", padding: "12px", borderRadius: "10px", display: "inline-block" }}>
              <QRCodeCanvas value={profileUrl(qrDriver.id)} size={200} />
            </div>
            <p style={{ color: "#475569", fontSize: "11px", marginTop: "12px" }}>{profileUrl(qrDriver.id)}</p>
            <br />
            <Link to={`/driver/${qrDriver.id}`} target="_blank" style={{ color: "#f59e0b", fontSize: "13px" }}>
              Open Profile Page →
            </Link>
            <br /><br />
            <button onClick={() => setQrDriver(null)} style={{ ...S.btnSecondary, margin: "0 auto" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}