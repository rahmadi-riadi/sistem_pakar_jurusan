import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      if (res.data.status === "success") {
        setMessage("Registrasi berhasil. Mengarahkan ke login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <div className="card card-auth">
          <h2 className="title">Daftar Akun Siswa</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              className="btn btn-success"
              style={{ width: "100%" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Buat Akun"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Sudah punya akun?{" "}
            <Link to="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
