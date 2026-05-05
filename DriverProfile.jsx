import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DriverProfile() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    fetch(`http://10.163.88.102:3001/api/drivers/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setDriver(data.driver);
        else setError("Driver not found");
      })
      .catch(() => setError("Cannot connect to server"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    const card = document.getElementById("driver-card");
    const canvas = await html2canvas(card, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [160, 100] });
    pdf.addImage(imgData, "PNG", 0, 0, 160, 100);
    pdf.save(`Driver-${driver.name}.pdf`);
    setPdfLoading(false);
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#64748b", fontSize: "16px" }}>⏳ Loading...</p>
    </div>
  );

  if (error || !driver) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#f87171", fontSize: "16px" }}>❌ {error}</p>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "24px"
    }}>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
        Smart Driver Management System
      </p>

      {/* Aadhaar-style card */}
      <div id="driver-card" style={{
        width: "100%", maxWidth: "500px",
        background: "linear-gradient(135deg, #0d1240 0%, #1e2a78 50%, #080b2e 100%)",
        borderRadius: "16px", overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {/* Top stripe */}
        <div style={{ height: "6px", background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)" }} />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", background: "#f59e0b",
              borderRadius: "8px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "18px"
            }}>🚗</div>
            <div>
              <p style={{ color: "#f59e0b", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Smart Driver Card
              </p>
              <p style={{ color: "#475569", fontSize: "10px" }}>Government of India (Sample)</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#475569", fontSize: "10px" }}>ID</p>
            <p style={{ color: "#94a3b8", fontSize: "11px", fontFamily: "monospace" }}>
              {driver.id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", gap: "20px", padding: "20px 24px" }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: "80px", height: "90px", borderRadius: "10px",
              background: "#1e293b", border: "2px solid rgba(245,158,11,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "40px"
            }}>👤</div>
            <div style={{
              marginTop: "8px", textAlign: "center",
              padding: "3px 8px", borderRadius: "999px",
              background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)",
              color: "#f87171", fontSize: "11px", fontWeight: "700"
            }}>
              🩸 {driver.bloodGroup}
            </div>
          </div>

          {/* Details */}
          <div style={{ flex: 1 }}>
            <p style={{ color: "#f1f5f9", fontSize: "20px", fontWeight: "800", marginBottom: "12px" }}>
              {driver.name}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Phone", value: driver.phone },
                { label: "Vehicle No.", value: driver.vehicleNumber },
                { label: "License No.", value: driver.licenseNumber, full: true },
              ].map((item) => (
                <div key={item.label} style={{ gridColumn: item.full ? "1 / -1" : "auto" }}>
                  <p style={{ color: "#475569", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
                    {item.label}
                  </p>
                  <p style={{ color: item.label === "License No." ? "#f59e0b" : "#cbd5e1", fontSize: "13px", fontFamily: "monospace", fontWeight: "600" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "10px 24px", borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.2)", display: "flex", justifyContent: "space-between"
        }}>
          <p style={{ color: "#475569", fontSize: "10px" }}>
            Issued: {new Date(driver.createdAt).toLocaleDateString("en-IN")}
          </p>
          <p style={{ color: "rgba(245,158,11,0.5)", fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em" }}>
            SMART DRIVER MGMT
          </p>
        </div>
      </div>

      {/* Download PDF button */}
      <button
        onClick={handleDownloadPDF}
        disabled={pdfLoading}
        style={{
          marginTop: "20px", padding: "10px 28px",
          background: "#f59e0b", color: "#0f172a",
          border: "none", borderRadius: "8px",
          fontWeight: "700", fontSize: "14px", cursor: "pointer"
        }}
      >
        {pdfLoading ? "Generating..." : "📄 Download PDF"}
      </button>
    </div>
  );
}