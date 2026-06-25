import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import UserInput from "./pages/UserInput";
import UserResult from "./pages/UserResult";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCRUD from "./pages/AdminCRUD";
import AdminUsers from "./pages/AdminUsers";
import AdminHistory from "./pages/AdminHistory";
import AdminHistoryDetail from "./pages/AdminHistoryDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik (Bisa diakses siapa saja) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rute Khusus User/Siswa */}

        <Route
          path="/user/input"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserInput />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/result"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserResult />
            </ProtectedRoute>
          }
        />

        {/* Rute Khusus Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crud"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCRUD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/history"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/history/:id_session"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHistoryDetail />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
