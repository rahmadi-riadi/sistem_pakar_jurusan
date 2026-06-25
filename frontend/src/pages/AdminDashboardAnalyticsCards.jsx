import React from "react";

export default function AdminDashboardAnalyticsCards({ data, loading }) {
  const cards = [
    {
      title: "Total Sesi",
      value: loading ? "-" : (data?.total_sessions ?? 0),
      color: "#2563eb",
      desc: "Jumlah konsultasi yang pernah disimpan di working memory",
    },
    {
      title: "Sesi Hari Ini",
      value: loading ? "-" : (data?.today_sessions ?? 0),
      color: "#059669",
      desc: "Konsultasi yang dibuat pada tanggal hari ini",
    },
    {
      title: "Rekomendasi Teratas",
      value: loading ? "-" : (data?.top_jurusan?.nama_jurusan ?? "-"),
      color: "#7c3aed",
      desc: "Jurusan yang paling sering muncul dari rekomendasi",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        marginTop: "1.25rem",
      }}
    >
      {cards.map((c) => (
        <div
          key={c.title}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: "1.25rem",
            background: "#fff",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.8rem",
              color: "#6b7280",
              fontWeight: 600,
            }}
          >
            {c.title}
          </p>
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "1.35rem",
              fontWeight: 800,
              color: c.color,
              wordBreak: "break-word",
            }}
          >
            {c.value}
          </div>
          <p
            style={{
              margin: "0.5rem 0 0",
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            {c.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
