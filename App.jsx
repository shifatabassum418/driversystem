import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DriverList from "./pages/DriverList.jsx";
import AddDriver from "./pages/AddDriver.jsx";
import EditDriver from "./pages/EditDriver.jsx";
import DriverProfile from "./pages/DriverProfile.jsx";

const isLoggedIn = () => !!localStorage.getItem("token");

const Guard = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/driver/:id" element={<DriverProfile />} />
        <Route path="/" element={<Guard><Dashboard /></Guard>} />
        <Route path="/drivers" element={<Guard><DriverList /></Guard>} />
        <Route path="/drivers/add" element={<Guard><AddDriver /></Guard>} />
        <Route path="/drivers/edit/:id" element={<Guard><EditDriver /></Guard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}