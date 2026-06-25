import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((res) => setUsers(res.data.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    axios
      .put(`http://localhost:5000/api/admin/users/${id}/role`, {
        role: newRole,
      })
      .then(fetchUsers);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="card">
          <h2 className="subtitle">Kelola Hak Akses Pengguna</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role Saat Ini</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id_user}>
                  <td>{u.username}</td>
                  <td>
                    <strong>{u.role.toUpperCase()}</strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => changeRole(u.id_user, u.role)}
                    >
                      Ubah Role
                    </button>
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
