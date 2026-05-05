import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { S } from "./styles.js";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={S.nav}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px", background: "#f59e0b",
          borderRadius: "8px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "18px"
        }}>🚗</div>
        <span style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "15px" }}>
          Driver Mgmt
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link to="/" style={S.navLink}>Dashboard</Link>
        <Link to="/drivers" style={S.navLink}>All Drivers</Link>
        <Link to="/drivers/add" style={{
          ...S.navLink,
          background: "#f59e0b",
          color: "#0f172a",
          fontWeight: "700",
        }}>+ Add Driver</Link>
        <button onClick={logout} style={{
          ...S.btnSecondary,
          marginLeft: "8px",
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}
