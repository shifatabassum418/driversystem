import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { S } from "../components/styles.js";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EditDriver() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", licenseNumber: "", vehicleNumber: "", bloodGroup: "",
  });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/drivers/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const { name, phone, licenseNumber, vehicleNumber, bloodGroup } = data.driver;
          setForm({ name, phone, licenseNumber, vehicleNumber, bloodGroup });
        } else {
          setError("Driver not found");
        }
      })
      .catch(() => setError("Cannot connect to server"))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaveLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/drivers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/drivers");
      } else {
        setError(data.message || "Update failed");
      }
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={S.page}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 0", color: "#64748b" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
          <p>Loading driver…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <Navbar />
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 24px" }}>

        <div style={{ marginBottom: "24px" }}>
          <Link to="/drivers" style={{ color: "#64748b", fontSize: "13px", textDecoration: "none" }}>
            ← Back to Drivers
          </Link>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#f1f5f9", marginTop: "10px" }}>
            Edit Driver
          </h1>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
            Update the driver's information below.
          </p>
        </div>

        <div style={S.card}>
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px", padding: "12px 16px", marginBottom: "20px",
              color: "#f87171", fontSize: "13px",
            }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={S.label}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} style={S.input} required />
            </div>
            <div>
              <label style={S.label}>Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={S.input} required />
            </div>
            <div>
              <label style={S.label}>License Number *</label>
              <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange}
                style={{ ...S.input, fontFamily: "monospace", textTransform: "uppercase" }} required />
            </div>
            <div>
              <label style={S.label}>Vehicle Number *</label>
              <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange}
                style={{ ...S.input, fontFamily: "monospace", textTransform: "uppercase" }} required />
            </div>
            <div>
              <label style={S.label}>Blood Group *</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}
                style={{ ...S.input, cursor: "pointer" }} required>
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button type="submit" style={S.btnPrimary} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "💾 Save Changes"}
              </button>
              <Link to="/drivers" style={{ flex: "1", textDecoration: "none" }}>
                <button type="button" style={{ ...S.btnSecondary, width: "100%", padding: "11px" }}>
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}