import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminDashboardAnalyticsCards from "./AdminDashboardAnalyticsCards";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAnalytics = async () => {
      setLoadingAnalytics(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/analytics",
        );
        if (!isMounted) return;
        setAnalytics(res.data);
      } catch (e) {
        if (!isMounted) return;
        setAnalytics(null);
      } finally {
        if (!isMounted) return;
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />

      <div className="card">
        <h1 className="title" style={{ marginBottom: "0.5rem" }}>
          Selamat Datang, Administrator!
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "2.5rem",
          }}
        >
          Pilih menu di bawah ini untuk mengelola keseluruhan sistem pakar.
        </p>

        <AdminDashboardAnalyticsCards
          data={analytics}
          loading={loadingAnalytics}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.25rem",
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.5rem",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#1f2937" }}>
              Basis Pengetahuan
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Kelola daftar jurusan, kriteria fakta, dan aturan pakar (Rules).
            </p>
            <Link
              to="/admin/crud"
              className="btn btn-primary"
              style={{ display: "block", textDecoration: "none" }}
            >
              Kelola Data
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.5rem",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#1f2937" }}>
              Manajemen Pengguna
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Lihat daftar akun terdaftar dan ubah hak akses (Role) pengguna.
            </p>
            <Link
              to="/admin/users"
              className="btn btn-success"
              style={{ display: "block", textDecoration: "none" }}
            >
              Kelola Akun
            </Link>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.5rem",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#1f2937" }}>
              Riwayat Konsultasi
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Pantau hasil tes pemilihan jurusan yang telah dilakukan oleh
              siswa.
            </p>
            <Link
              to="/admin/history"
              className="btn"
              style={{
                display: "block",
                textDecoration: "none",
                backgroundColor: "#6366f1",
                color: "#fff",
              }}
            >
              Lihat Riwayat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
