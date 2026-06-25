import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="nav-menu">
      <div className="nav-left-section">
        <Link className="nav-link" to="/">
          Beranda
        </Link>

        {/* Navigasi bersyarat berdasarkan hak akses login */}
        {role === "admin" && (
          <>
            <Link className="nav-link " to="/admin/dashboard">
              Dashboard Admin
            </Link>
            <Link className="nav-link" to="/admin/crud">
              Kelola Basis Pakar
            </Link>
            <Link className="nav-link" to="/admin/users">
              Kelola User
            </Link>
            <Link className="nav-link" to="/admin/history">
              Riwayat Sesi
            </Link>
          </>
        )}
      </div>

      <div className="nav-right-section">
        {!role ? (
          <div className="nav-auth-buttons">
            <Link className="btn btn-sm btn-primary" to="/login">
              Masuk
            </Link>
            <Link className="btn btn-sm btn-secondary" to="/register">
              Daftar
            </Link>
          </div>
        ) : (
          <button className="btn btn-sm btn-danger" onClick={handleLogout}>
            Keluar
          </button>
        )}
      </div>
    </nav>
  );
}
