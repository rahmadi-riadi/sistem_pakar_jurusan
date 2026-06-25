import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function handleCekLogin() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  if (token) {
    if (role === "admin" || role === "user") {
      window.location.href = "/user/input";
    } else {
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login";
  }
}

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <Navbar />

      <main className="landing-main">
        <div className="landing-title-group">
          <h1 className="landing-title">Konsultasi Pemilihan Jurusan</h1>
          <p className="landing-desc">
            Temukan program studi atau jurusan kuliah yang paling sesuai dengan
            minat, bakat, dan kepribadian Anda melalui pendekatan mesin
            penalaran pakar.
          </p>
        </div>

        <div className="landing-cta-wrapper">
          <button
            onClick={handleCekLogin}
            className="landing-btn-cta"
            style={{ border: "none", cursor: "pointer" }}
          >
            Mulai Konsultasi Sekarang
          </button>
        </div>
      </main>
    </div>
  );
}
