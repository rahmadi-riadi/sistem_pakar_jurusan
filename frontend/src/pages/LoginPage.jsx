import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // Pengalihan rute (Routing)
        if (res.data.role === "admin") {
          navigate("/admin"); // Akses dasbor admin
        } else {
          navigate("/user/input");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Koneksi ke server gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <div className="card card-auth">
          <h2 className="title">Login Sistem Pakar</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleLogin}>
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
              className="btn btn-primary"
              style={{ width: "100%" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk Sistem"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
