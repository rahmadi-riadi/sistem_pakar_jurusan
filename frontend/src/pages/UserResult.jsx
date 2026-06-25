import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasil = location.state?.hasil;

  if (!hasil || !hasil.rekomendasi) {
    return (
      <div>
        <Navbar />
        <div className="page-container">
          <div
            className="card"
            style={{ textAlign: "center", padding: "3rem 0" }}
          >
            <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
              Belum ada data sesi konsultasi yang diproses atau sesi telah
              berakhir.
            </p>
            <button
              onClick={() => navigate("/user/input")}
              className="btn btn-secondary"
            >
              Tes Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div
          className="card card-auth"
          style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}
        >
          {/* Ikon Sukses */}
          <div
            style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#dcfce7",
              color: "#15803d",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
            }}
          >
            <svg
              style={{ width: "2rem", height: "2rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "#4b5563",
              margin: 0,
            }}
          >
            Rekomendasi Jurusan
          </h2>

          {/* Nama Jurusan Hasil Inferensi */}
          <h1
            className="title"
            style={{
              color: "#2563eb",
              marginBottom: "1rem",
              fontSize: "1.875rem",
            }}
          >
            {hasil.rekomendasi}
          </h1>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#4b5563",
              marginBottom: "1.5rem",
            }}
          >
            Tingkat Kecocokan:{" "}
            <span style={{ fontWeight: "bold" }}>{hasil.kecocokan}%</span>
          </p>

          {/* Fasilitas Penjelasan (Explanation Facility) */}
          <div
            style={{
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              padding: "1rem",
              borderRadius: "6px",
              textAlign: "left",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                color: "#1e3a8a",
                borderBottom: "1px solid #93c5fd",
                paddingBottom: "0.25rem",
                margin: 0,
              }}
            >
              Penjelasan
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#1e40af",
                lineHeight: "1.5",
                marginTop: "0.5rem",
                margin: 0,
              }}
            >
              {hasil.deskripsi}
            </p>
          </div>

          <button
            onClick={() => navigate("/user/input")}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Tes lagi
          </button>
        </div>
      </div>
    </div>
  );
}
