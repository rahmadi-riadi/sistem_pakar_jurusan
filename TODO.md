# TODO - Riwayat Sesi + Analitik Admin Dashboard

## Step 1 — Pemahaman skema database

- [ ] Cek struktur tabel yang relevan: users, jurusan, indikator, rules, riwayat/session/log.
- [ ] Petakan relasi antar tabel (FK) untuk log riwayat.

## Step 2 — Implementasi penyimpanan riwayat sesi saat konsultasi

- [ ] Tambahkan endpoint backend untuk menyimpan sesi konsultasi + detail hasil.
- [ ] Modifikasi endpoint /api/konsultasi agar membuat record riwayat pada tabel log.
- [ ] Pastikan data yang tersimpan cukup untuk tampilan AdminHistory & AdminHistoryDetail.

## Step 3 — Endpoint analitik untuk AdminDashboard

- [ ] Buat endpoint: /api/admin/analytics yang mengembalikan statistik (jumlah sesi, tren per hari/minggu, jurusan teratas).
- [ ] Buat endpoint /api/admin/history (list) dan /api/admin/history/:id (detail) yang konsisten dengan UI.

## Step 4 — UI admin: tambahkan komponen analytics

- [ ] Update frontend/src/pages/AdminDashboard.jsx menampilkan statistik dari endpoint analitik.
- [ ] Pastikan style konsisten dan responsif.

## Step 5 — Konsistensi & responsif UI (minor refactor)

- [ ] Rapikan layout AdminHistory dan AdminHistoryDetail agar seragam: spacing, typography, overflow table.
- [ ] Pastikan setiap halaman menggunakan kelas container/card dari App.css / index.css untuk konsistensi.

## Step 6 — Testing

- [ ] Jalankan backend + frontend.
- [ ] Lakukan simulasi konsultasi beberapa kali.
- [ ] Verifikasi riwayat tersimpan, list/ detail tampil, dan analytics ter-update.
