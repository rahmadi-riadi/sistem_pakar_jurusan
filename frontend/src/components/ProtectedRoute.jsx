import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  // Jika tidak ada role (belum login), tendang ke halaman login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Jika role yang sedang login tidak ada dalam daftar yang diizinkan, tendang ke halaman defaultnya
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect ke route yang valid sesuai struktur App.jsx
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/user/input" replace />;
  }

  // Jika aman, tampilkan halaman yang direquest
  return children;
}
