import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchHistory = (searchQuery = "") => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/history?search=${searchQuery}`)
      .then((response) => {
        if (response.data.status === "success") setHistory(response.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="card" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <style>{`
            .admin-history-table-wrap{max-height: 520px; overflow-y:auto; overflow-x:auto;}
          `}</style>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
                Riwayat Sesi Konsultasi (Working Memory)
              </h2>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginTop: "0.25rem",
                }}
              >
                Klik baris untuk melihat detail.
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                fetchHistory(e.target.value);
              }}
              placeholder="Cari user atau jurusan..."
              style={{
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                outline: "none",
                minWidth: 260,
              }}
            />
          </div>

          {loading ? (
            <p style={{ textAlign: "center" }}>Memuat riwayat sesi...</p>
          ) : (
            <div className="admin-history-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>ID Sesi</th>
                    <th>Nama Pengguna</th>
                    <th>Tanggal Tes</th>
                    <th>Rekomendasi Jurusan</th>
                    <th>Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={item.id_session}
                      onClick={() =>
                        navigate(`/admin/history/${item.id_session}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <td>{index + 1}</td>
                      <td
                        style={{
                          fontFamily: "monospace",
                          fontSize: "0.75rem",
                          color: "#9ca3af",
                        }}
                      >
                        {String(item.id_session).substring(0, 8)}...
                      </td>
                      <td style={{ fontWeight: 700 }}>{item.nama_user}</td>
                      <td>
                        {new Date(item.tanggal_tes).toLocaleString("id-ID")}
                      </td>
                      <td style={{ color: "#2563eb", fontWeight: 800 }}>
                        {item.nama_jurusan || "-"}
                      </td>
                      <td>{item.nilai_keyakinan}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
