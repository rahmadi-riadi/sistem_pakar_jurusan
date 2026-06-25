import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function UserInput() {
  const [namaUser, setNamaUser] = useState("");
  const [indikatorList, setIndikatorList] = useState([]);
  const [jawaban, setJawaban] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchIndikator();
  }, []);

  const fetchIndikator = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/indikator");
      if (response.data.status === "success") {
        setIndikatorList(response.data.data);
      } else {
        setError("Gagal memuat daftar pertanyaan.");
      }
    } catch (err) {
      setError("Koneksi ke server gagal. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  // Handler saat checkbox diubah
  const handleCheckboxChange = (idIndikator) => {
    setJawaban((prev) => {
      if (prev.includes(idIndikator)) {
        return prev.filter((item) => item !== idIndikator);
      } else {
        return [...prev, idIndikator];
      }
    });
  };

  // Logika Pagination
  const totalPages = Math.ceil(indikatorList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIndikator = indikatorList.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Submit data ke mesin inferensi backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaUser.trim()) {
      alert("Nama pengguna tidak boleh kosong.");
      return;
    }
    if (jawaban.length === 0) {
      alert("Pilih setidaknya satu indikator minat/bakat.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/konsultasi",
        {
          nama_user: namaUser,
          jawaban: jawaban,
        },
      );

      // Oper hasil inferensi ke halaman result
      navigate("/user/result", { state: { hasil: response.data } });
    } catch (err) {
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat memproses data.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: "center" }}>
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="card">
          <h2
            className="title"
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            Formulir Konsultasi Sistem Pakar
          </h2>

          {error && (
            <div
              className="alert alert-danger"
              style={{ marginBottom: "1rem" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Nama Lengkap:</label>
              <input
                type="text"
                className="form-control"
                value={namaUser}
                onChange={(e) => setNamaUser(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <h3
              className="subtitle"
              style={{ fontSize: "1rem", marginBottom: "1rem" }}
            >
              Pilih indikator yang sesuai dengan minat dan bakat Anda (Halaman{" "}
              {currentPage} dari {totalPages}):
            </h3>

            {/* Daftar Pertanyaan (Indikator) per Halaman */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {currentIndikator.map((item, index) => (
                <div
                  key={item.id_indikator}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    backgroundColor: "#f9fafb",
                    padding: "1rem",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <input
                    type="checkbox"
                    id={`indikator_${item.id_indikator}`}
                    checked={jawaban.includes(item.id_indikator)}
                    onChange={() => handleCheckboxChange(item.id_indikator)}
                    style={{
                      marginTop: "0.25rem",
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor={`indikator_${item.id_indikator}`}
                    style={{
                      fontSize: "0.875rem",
                      color: "#374151",
                      cursor: "pointer",
                      lineHeight: "1.4",
                    }}
                  >
                    {indexOfFirstItem + index + 1}. {item.pertanyaan}
                  </label>
                </div>
              ))}
            </div>

            {/* Navigasi Pagination & Tombol Submit */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.5rem",
              }}
            >
              <button
                type="button"
                onClick={handlePrev}
                className="btn btn-secondary"
                disabled={currentPage === 1}
                style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>

              {currentPage < totalPages ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#059669", borderColor: "#059669" }}
                >
                  Proses Konsultasi
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
