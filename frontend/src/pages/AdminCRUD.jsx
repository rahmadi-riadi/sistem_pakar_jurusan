import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminCRUD() {
  const [jurusan, setJurusan] = useState([]);
  const [fakta, setFakta] = useState([]);
  const [rules, setRules] = useState([]);

  const [search, setSearch] = useState("");

  const [formJurusan, setFormJurusan] = useState({
    nama_jurusan: "",
    deskripsi: "",
  });
  const [formFakta, setFormFakta] = useState({ pertanyaan: "" });
  const [formRule, setFormRule] = useState({
    id_jurusan: "",
    id_indikator: "",
  });

  // Edit state (inline per row)
  const [editingJurusanId, setEditingJurusanId] = useState(null);
  const [editJurusanForm, setEditJurusanForm] = useState({
    nama_jurusan: "",
    deskripsi: "",
  });

  const [editingFaktaId, setEditingFaktaId] = useState(null);
  const [editFaktaForm, setEditFaktaForm] = useState({ pertanyaan: "" });

  const [editingRuleId, setEditingRuleId] = useState(null);
  const [editRuleForm, setEditRuleForm] = useState({
    id_jurusan: "",
    id_indikator: "",
  });

  const fetchData = () => {
    axios.get("http://localhost:5000/api/admin/master-data").then((res) => {
      setJurusan(res.data.jurusan);
      setFakta(res.data.indikator);
    });

    axios
      .get("http://localhost:5000/api/admin/rules-all")
      .then((res) => setRules(res.data.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handlers
  const addJurusan = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/admin/jurusan", formJurusan)
      .then(fetchData);
  };

  const addFakta = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/admin/indikator", formFakta)
      .then(fetchData);
  };

  const addRule = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/admin/rules", formRule)
      .then(fetchData);
  };

  const delItem = (endpoint, id) => {
    axios
      .delete(`http://localhost:5000/api/admin/${endpoint}/${id}`)
      .then(fetchData);
  };

  const startEditJurusan = (j) => {
    setEditingJurusanId(j.id_jurusan);
    setEditJurusanForm({
      nama_jurusan: j.nama_jurusan,
      deskripsi: j.deskripsi,
    });
  };

  const cancelEditJurusan = () => {
    setEditingJurusanId(null);
    setEditJurusanForm({ nama_jurusan: "", deskripsi: "" });
  };

  const saveEditJurusan = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/admin/jurusan/${editingJurusanId}`,
        editJurusanForm,
      )
      .then(() => {
        cancelEditJurusan();
        fetchData();
      });
  };

  const startEditFakta = (f) => {
    setEditingFaktaId(f.id_indikator);
    setEditFaktaForm({ pertanyaan: f.pertanyaan });
  };

  const cancelEditFakta = () => {
    setEditingFaktaId(null);
    setEditFaktaForm({ pertanyaan: "" });
  };

  const saveEditFakta = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/admin/indikator/${editingFaktaId}`,
        editFaktaForm,
      )
      .then(() => {
        cancelEditFakta();
        fetchData();
      });
  };

  const startEditRule = (r) => {
    setEditingRuleId(r.id_rule);
    setEditRuleForm({ id_jurusan: r.id_jurusan, id_indikator: r.id_indikator });
  };

  const cancelEditRule = () => {
    setEditingRuleId(null);
    setEditRuleForm({ id_jurusan: "", id_indikator: "" });
  };

  const saveEditRule = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/admin/rules/${editingRuleId}`,
        editRuleForm,
      )
      .then(() => {
        cancelEditRule();
        fetchData();
      });
  };

  const normalizedSearch = useMemo(
    () => search.trim().toLowerCase(),
    [search],
  );

  const filteredJurusan = useMemo(() => {
    if (!normalizedSearch) return jurusan;
    return jurusan.filter(
      (j) =>
        String(j.nama_jurusan).toLowerCase().includes(normalizedSearch) ||
        String(j.deskripsi || "").toLowerCase().includes(normalizedSearch),
    );
  }, [jurusan, normalizedSearch]);

  const filteredFakta = useMemo(() => {
    if (!normalizedSearch) return fakta;
    return fakta.filter((f) =>
      String(f.pertanyaan).toLowerCase().includes(normalizedSearch),
    );
  }, [fakta, normalizedSearch]);

  const filteredRules = useMemo(() => {
    if (!normalizedSearch) return rules;
    return rules.filter(
      (r) =>
        String(r.nama_jurusan || "").toLowerCase().includes(normalizedSearch) ||
        String(r.pertanyaan || "").toLowerCase().includes(normalizedSearch) ||
        String(r.id_jurusan || "").includes(normalizedSearch) ||
        String(r.id_indikator || "").includes(normalizedSearch),
    );
  }, [rules, normalizedSearch]);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1 className="title">Kelola Data & Basis Pengetahuan</h1>

        <div
          className="card"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <input
            className="form-control"
            style={{ maxWidth: 500 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jurusan / fakta / rules..."
          />
          {normalizedSearch ? (
            <button
              className="btn btn-secondary"
              onClick={() => setSearch("")}
              type="button"
            >
              Reset
            </button>
          ) : null}
        </div>

        <div className="card" style={{ maxHeight: 580, overflowY: "auto" }}>
          <h2 className="subtitle">Jurusan</h2>
          <form
            onSubmit={addJurusan}
            className="form-group"
            style={{ display: "flex", gap: "1rem" }}
          >
            <input
              className="form-control"
              placeholder="Nama Jurusan"
              onChange={(e) =>
                setFormJurusan({ ...formJurusan, nama_jurusan: e.target.value })
              }
            />
            <button className="btn btn-success" type="submit">
              Tambah
            </button>
          </form>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredJurusan.map((j) => (
                <tr key={j.id_jurusan}>
                  <td>{j.id_jurusan}</td>
                  <td>
                    {editingJurusanId === j.id_jurusan ? (
                      <form onSubmit={saveEditJurusan}>
                        <input
                          className="form-control"
                          style={{ marginBottom: "0.5rem" }}
                          value={editJurusanForm.nama_jurusan}
                          onChange={(e) =>
                            setEditJurusanForm({
                              ...editJurusanForm,
                              nama_jurusan: e.target.value,
                            })
                          }
                        />
                        <input
                          className="form-control"
                          value={editJurusanForm.deskripsi}
                          onChange={(e) =>
                            setEditJurusanForm({
                              ...editJurusanForm,
                              deskripsi: e.target.value,
                            })
                          }
                        />
                      </form>
                    ) : (
                      <div>
                        <div>{j.nama_jurusan}</div>
                        {j.deskripsi ? (
                          <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                            {j.deskripsi}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </td>
                  <td>
                    {editingJurusanId === j.id_jurusan ? (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-primary"
                          type="submit"
                          onClick={saveEditJurusan}
                        >
                          Simpan
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={cancelEditJurusan}
                          type="button"
                        >
                          Batal
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("jurusan", j.id_jurusan)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => startEditJurusan(j)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("jurusan", j.id_jurusan)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ maxHeight: 580, overflowY: "auto" }}>
          <h2 className="subtitle">Master Fakta / Pertanyaan</h2>
          <form
            onSubmit={addFakta}
            className="form-group"
            style={{ display: "flex", gap: "1rem" }}
          >
            <input
              className="form-control"
              placeholder="Teks Pertanyaan"
              onChange={(e) =>
                setFormFakta({ ...formFakta, pertanyaan: e.target.value })
              }
            />
            <button className="btn btn-success" type="submit">
              Tambah
            </button>
          </form>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pertanyaan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFakta.map((f) => (
                <tr key={f.id_indikator}>
                  <td>{f.id_indikator}</td>
                  <td>
                    {editingFaktaId === f.id_indikator ? (
                      <form onSubmit={saveEditFakta}>
                        <input
                          className="form-control"
                          value={editFaktaForm.pertanyaan}
                          onChange={(e) =>
                            setEditFaktaForm({
                              pertanyaan: e.target.value,
                            })
                          }
                        />
                      </form>
                    ) : (
                      f.pertanyaan
                    )}
                  </td>
                  <td>
                    {editingFaktaId === f.id_indikator ? (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-primary"
                          type="submit"
                          onClick={saveEditFakta}
                        >
                          Simpan
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={cancelEditFakta}
                          type="button"
                        >
                          Batal
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("indikator", f.id_indikator)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => startEditFakta(f)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("indikator", f.id_indikator)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ maxHeight: 580, overflowY: "auto" }}>
          <h2 className="subtitle">Aturan (Rules) Pakar</h2>
          <form
            onSubmit={addRule}
            className="form-group"
            style={{ display: "flex", gap: "1rem" }}
          >
            <select
              className="form-control"
              onChange={(e) =>
                setFormRule({ ...formRule, id_jurusan: e.target.value })
              }
            >
              <option value="">Pilih Jurusan</option>
              {jurusan.map((j) => (
                <option key={j.id_jurusan} value={j.id_jurusan}>
                  {j.nama_jurusan}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              onChange={(e) =>
                setFormRule({ ...formRule, id_indikator: e.target.value })
              }
            >
              <option value="">Pilih Fakta</option>
              {fakta.map((f) => (
                <option key={f.id_indikator} value={f.id_indikator}>
                  {f.pertanyaan}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" type="submit">
              Relasikan
            </button>
          </form>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID Rule</th>
                <th>Jurusan</th>
                <th>Fakta Terkait</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((r) => (
                <tr key={r.id_rule}>
                  <td>R{r.id_rule}</td>
                  <td>
                    {editingRuleId === r.id_rule ? (
                      <form onSubmit={saveEditRule}>
                        <select
                          className="form-control"
                          value={editRuleForm.id_jurusan}
                          onChange={(e) =>
                            setEditRuleForm({
                              ...editRuleForm,
                              id_jurusan: e.target.value,
                            })
                          }
                        >
                          {jurusan.map((j) => (
                            <option key={j.id_jurusan} value={j.id_jurusan}>
                              {j.nama_jurusan}
                            </option>
                          ))}
                        </select>
                      </form>
                    ) : (
                      r.nama_jurusan
                    )}
                  </td>
                  <td>
                    {editingRuleId === r.id_rule ? (
                      <select
                        className="form-control"
                        value={editRuleForm.id_indikator}
                        onChange={(e) =>
                          setEditRuleForm({
                            ...editRuleForm,
                            id_indikator: e.target.value,
                          })
                        }
                      >
                        {fakta.map((f) => (
                          <option key={f.id_indikator} value={f.id_indikator}>
                            {f.pertanyaan}
                          </option>
                        ))}
                      </select>
                    ) : (
                      r.pertanyaan
                    )}
                  </td>
                  <td>
                    {editingRuleId === r.id_rule ? (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-primary"
                          type="submit"
                          onClick={saveEditRule}
                        >
                          Simpan
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={cancelEditRule}
                          type="button"
                        >
                          Batal
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("rules", r.id_rule)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => startEditRule(r)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => delItem("rules", r.id_rule)}
                          type="button"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

