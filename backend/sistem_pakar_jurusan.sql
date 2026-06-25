-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2026 at 12:30 PM
-- Server version: 8.0.36
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_pakar_jurusan`
--

-- --------------------------------------------------------

--
-- Table structure for table `indikator`
--

CREATE TABLE `indikator` (
  `id_indikator` int NOT NULL,
  `pertanyaan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `indikator`
--

INSERT INTO `indikator` (`id_indikator`, `pertanyaan`) VALUES
(1, 'Saya suka memecahkan masalah menggunakan logika dan algoritma.'),
(2, 'Saya suka mengoperasikan, membongkar, atau memodifikasi perangkat komputer.'),
(3, 'Saya tertarik menganalisis data untuk mendukung keputusan bisnis.'),
(4, 'Saya suka mengatur keuangan dan mencatat pengeluaran secara detail.'),
(5, 'Saya suka berbicara, berdiskusi, atau berdebat di depan umum.'),
(6, 'Saya suka menulis artikel, cerita, atau menyusun naskah.'),
(7, 'Saya tertarik mempelajari struktur tata bahasa dan literatur asing.'),
(8, 'Saya suka memimpin tim dan merencanakan strategi kegiatan.'),
(9, 'Saya tertarik mengamati tren pasar dan kondisi ekonomi secara makro.'),
(10, 'Saya suka melakukan negosiasi atau kegiatan promosi dan pemasaran.'),
(11, 'Saya tertarik membaca dan menganalisis undang-undang atau peraturan.'),
(12, 'Saya suka mengamati dan menganalisis isu-isu politik atau kebijakan publik.'),
(13, 'Saya peduli pada isu-isu global dan hubungan antar negara.'),
(14, 'Saya suka mempelajari fungsi organ tubuh manusia dan kesehatan.'),
(15, 'Saya memiliki rasa empati yang tinggi dan suka merawat orang yang sakit.'),
(16, 'Saya tertarik bereksperimen dengan bahan kimia di laboratorium.'),
(17, 'Saya menjadi tempat curhat yang baik dan suka mendengarkan masalah orang lain.'),
(18, 'Saya tertarik mengamati perilaku, sifat, dan karakter manusia.'),
(19, 'Saya suka mengajar, menjelaskan materi, dan berbagi ilmu dengan orang lain.'),
(20, 'Saya memiliki kesabaran ekstra saat berinteraksi dengan anak-anak.'),
(21, 'Saya suka menghitung dan bermain dengan angka atau rumus matematika.'),
(22, 'Saya suka merancang dan menggambar sketsa struktur bangunan.'),
(23, 'Saya tertarik mempelajari bagaimana sebuah mesin atau alat mekanis bekerja.'),
(24, 'Saya suka mencari cara agar suatu pekerjaan atau produksi menjadi lebih cepat (efisien).'),
(25, 'Saya suka menggambar ilustrasi, melukis, atau membuat desain grafis digital.'),
(26, 'Saya tertarik pada dunia fotografi, videografi, atau pembuatan animasi.'),
(27, 'Saya suka beraktivitas di alam terbuka dan peduli pada lingkungan hidup.'),
(28, 'Saya tertarik mempelajari cara bercocok tanam atau beternak yang modern.'),
(29, 'Saya suka memikirkan cara memasarkan produk olahan hasil bumi/pertanian.'),
(30, 'Saya suka memperhatikan estetika dan tampilan visual dari sebuah informasi.'),
(31, 'Saya mampu membuat argumen hukum berdasarkan fakta dan logika.'),
(32, 'Saya senang membaca literatur medis dan metode penyembuhan penyakit.'),
(33, 'Saya suka merancang antarmuka (UI/UX) atau sistem alur digital.');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id_jurusan` int NOT NULL,
  `nama_jurusan` varchar(255) NOT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id_jurusan`, `nama_jurusan`, `deskripsi`) VALUES
(1, 'Teknik Informatika', 'Fokus pada rekayasa perangkat lunak, komputasi, dan pengembangan sistem algoritma.'),
(2, 'Sistem Informasi', 'Menjembatani teknologi informasi dengan kebutuhan proses bisnis dan organisasi.'),
(3, 'Ilmu Komunikasi', 'Mempelajari cara penyampaian pesan yang efektif, media massa, dan public relations.'),
(4, 'Manajemen', 'Berfokus pada pengelolaan tim, operasional organisasi, dan strategi bisnis.'),
(5, 'Akuntansi', 'Mempelajari sistem pencatatan, audit, dan pelaporan keuangan perusahaan.'),
(6, 'Hukum', 'Mendalami sistem perundang-undangan, tata tertib, dan analisis penyelesaian kasus hukum.'),
(7, 'Psikologi', 'Mempelajari perilaku, kepribadian, dan proses mental manusia.'),
(8, 'Kedokteran', 'Mempelajari ilmu anatomi tubuh manusia, diagnosis penyakit, dan tindakan medis.'),
(9, 'Farmasi', 'Fokus pada peracikan, pengembangan, dan penelitian obat-obatan serta bahan kimia medis.'),
(10, 'Teknik Sipil', 'Mempelajari perancangan, konstruksi, dan pemeliharaan infrastruktur serta bangunan.'),
(11, 'Teknik Industri', 'Fokus pada optimalisasi dan efisiensi sistem produksi yang melibatkan manusia, mesin, dan material.'),
(12, 'Hubungan Internasional', 'Mempelajari dinamika politik global, diplomasi, dan interaksi antar negara.'),
(13, 'Sastra Inggris', 'Mendalami linguistik, budaya, dan analisis literatur berbahasa Inggris.'),
(14, 'Desain Komunikasi Visual', 'Fokus pada pemecahan masalah komunikasi melalui karya seni, desain grafis, dan multimedia.'),
(15, 'Ilmu Pemerintahan', 'Mempelajari sistem tata kelola negara, dinamika politik lokal, dan penyusunan kebijakan publik.'),
(16, 'Matematika', 'Mendalami teori bilangan, logika deduktif, dan pemodelan analitis.'),
(17, 'PGSD', 'Pendidikan Guru Sekolah Dasar, fokus pada metode pengajaran untuk anak usia dini dan dasar.'),
(18, 'Ilmu Keperawatan', 'Berfokus pada pemulihan kesehatan, perawatan fisik, dan dukungan psikologis pasien.'),
(19, 'Ekonomi Pembangunan', 'Mempelajari isu ekonomi makro, kesejahteraan masyarakat, dan kebijakan publik.'),
(20, 'Agribisnis', 'Menggabungkan ilmu pertanian dengan strategi bisnis dan komersialisasi hasil bumi.');

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `id_rule` int NOT NULL,
  `id_jurusan` int NOT NULL,
  `id_indikator` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`id_rule`, `id_jurusan`, `id_indikator`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 21),
(4, 1, 33),
(5, 2, 1),
(6, 2, 3),
(7, 2, 24),
(8, 2, 33),
(9, 3, 5),
(10, 3, 6),
(11, 3, 10),
(12, 4, 8),
(13, 4, 10),
(14, 4, 24),
(15, 5, 4),
(16, 5, 21),
(17, 6, 5),
(18, 6, 11),
(19, 6, 31),
(20, 7, 17),
(21, 7, 18),
(22, 7, 15),
(23, 8, 14),
(24, 8, 15),
(25, 8, 32),
(26, 9, 14),
(27, 9, 16),
(28, 9, 32),
(29, 10, 21),
(30, 10, 22),
(31, 10, 27),
(32, 11, 3),
(33, 11, 21),
(34, 11, 23),
(35, 11, 24),
(36, 12, 5),
(37, 12, 12),
(38, 12, 13),
(39, 13, 6),
(40, 13, 7),
(41, 14, 25),
(42, 14, 26),
(43, 14, 30),
(44, 15, 8),
(45, 15, 11),
(46, 15, 12),
(47, 16, 1),
(48, 16, 21),
(49, 17, 19),
(50, 17, 20),
(51, 18, 14),
(52, 18, 15),
(53, 18, 17),
(54, 19, 9),
(55, 19, 12),
(56, 19, 21),
(57, 20, 10),
(58, 20, 27),
(59, 20, 28),
(60, 20, 29);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2b$10$2s1UxOY3aX7ozOo53w6VH.S5R3GAKsJ3dqYi9fEVBbEtOLFb4Dn5a', 'admin'),
(4, 'qwe', '$2b$10$UO1KnpvDGzVSLag5HQYB5ukxPpu2rFRlNr1pNqWwlXrQdHIkeT4Ee', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `working_memory`
--

CREATE TABLE `working_memory` (
  `id_wm` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `jurusan_terpilih` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nilai_kecocokan` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `working_memory_detail`
--

CREATE TABLE `working_memory_detail` (
  `id_detail` int NOT NULL,
  `id_wm` int NOT NULL,
  `id_indikator` int NOT NULL,
  `jawaban` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `indikator`
--
ALTER TABLE `indikator`
  ADD PRIMARY KEY (`id_indikator`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id_jurusan`);

--
-- Indexes for table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id_rule`),
  ADD KEY `id_jurusan` (`id_jurusan`),
  ADD KEY `id_indikator` (`id_indikator`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `working_memory`
--
ALTER TABLE `working_memory`
  ADD PRIMARY KEY (`id_wm`),
  ADD KEY `jurusan_terpilih` (`jurusan_terpilih`);

--
-- Indexes for table `working_memory_detail`
--
ALTER TABLE `working_memory_detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_wm` (`id_wm`),
  ADD KEY `id_indikator` (`id_indikator`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `indikator`
--
ALTER TABLE `indikator`
  MODIFY `id_indikator` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id_jurusan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `id_rule` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `working_memory`
--
ALTER TABLE `working_memory`
  MODIFY `id_wm` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `working_memory_detail`
--
ALTER TABLE `working_memory_detail`
  MODIFY `id_detail` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rules`
--
ALTER TABLE `rules`
  ADD CONSTRAINT `fk_rules_indikator` FOREIGN KEY (`id_indikator`) REFERENCES `indikator` (`id_indikator`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rules_jurusan` FOREIGN KEY (`id_jurusan`) REFERENCES `jurusan` (`id_jurusan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `working_memory`
--
ALTER TABLE `working_memory`
  ADD CONSTRAINT `fk_wm_jurusan` FOREIGN KEY (`jurusan_terpilih`) REFERENCES `jurusan` (`id_jurusan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `working_memory_detail`
--
ALTER TABLE `working_memory_detail`
  ADD CONSTRAINT `fk_wmd_indikator` FOREIGN KEY (`id_indikator`) REFERENCES `indikator` (`id_indikator`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_wmd_wm` FOREIGN KEY (`id_wm`) REFERENCES `working_memory` (`id_wm`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
