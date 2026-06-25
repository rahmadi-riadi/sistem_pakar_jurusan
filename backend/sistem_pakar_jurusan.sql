-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2026 at 04:54 AM
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
(5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(8, 'Apakah Anda lebih menyukai integrasi antara teknologi komputer dan strategi proses bisnis?'),
(9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(12, 'Apakah Anda memiliki bakat dan minat yang tinggi dalam estetika visual, tata letak, dan desain grafis?'),
(13, 'Apakah Anda suka merancang media komunikasi visual untuk keperluan periklanan atau branding?'),
(14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(17, 'Apakah Anda tertarik pada implementasi operasional praktis sistem informasi di dalam organisasi atau perusahaan?'),
(18, 'Faktanya saya suka merakit komponen perangkat keras komputer secara fisik.'),
(19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(23, 'Saya lebih menyukai dunia perancangan tata letak visual, ilustrasi, dan periklanan media cetak/digital.'),
(24, 'Saya suka membuat desain grafis berbasis vektor dan manipulasi gambar menggunakan aplikasi desain.'),
(25, 'Faktanya saya menyukai tantangan dalam menemukan letak bug/kesalahan pada suatu program logika.'),
(26, 'Saya lebih berminat pada urusan tata kelola IT, audit sistem, dan efisiensi operasional bisnis perusahaan.'),
(27, 'Saya tertarik mempelajari cara kerja perangkat keras dan mikrokontroler (embedded system).'),
(28, 'Saya suka merangkai konsep visual untuk pembuatan antarmuka pengguna (UI) dan pengalaman pengguna (UX) sebuah aplikasi.');

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
(5, 'Teknik Informatika', 'Fokus pada pengembangan perangkat lunak, algoritma, dan pemrograman komputer'),
(6, 'Sistem Informasi', 'Fokus pada manajemen sistem, basis data, dan integrasi bisnis dengan teknologi.'),
(7, 'Ilmu Komputer', 'Fokus pada fondasi teoritis komputasi dan pengolahan data.'),
(8, 'Teknologi Informasi', 'Fokus pada infrastruktur IT, jaringan, dan keamanan siber.'),
(9, 'Desain Komunikasi Visual', 'Fokus pada estetika visual, periklanan, dan media desain grafis.'),
(10, 'Sains Data', 'Fokus pada analisis data berskala besar, statistik, dan machine learning.'),
(11, 'Kejuruteraan Perangkat Lunak', 'Fokus pada metodologi pembangunan dan rekayasa sistem perangkat lunak skala besar.'),
(12, 'Manajemen Informatika', 'Fokus pada penerapan praktis operasional sistem informasi dalam perusahaan.');

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
(1, 6, 5),
(2, 5, 6),
(3, 5, 7),
(4, 6, 8),
(5, 6, 9),
(6, 6, 10),
(7, 7, 11),
(8, 7, 12),
(9, 7, 13),
(10, 7, 14),
(11, 8, 15),
(12, 8, 16),
(13, 9, 17),
(14, 9, 18),
(15, 9, 19),
(16, 10, 20),
(17, 10, 21),
(18, 10, 22),
(19, 11, 23),
(20, 11, 24),
(21, 11, 25),
(22, 12, 26),
(23, 12, 27),
(24, 11, 28),
(25, 5, 19);

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

--
-- Dumping data for table `working_memory`
--

INSERT INTO `working_memory` (`id_wm`, `username`, `jurusan_terpilih`, `created_at`, `nilai_kecocokan`) VALUES
(1, 'qwdsccvbbb', NULL, '2026-06-24 23:54:29', 0),
(2, 'qwdsccvbbb', NULL, '2026-06-24 23:54:47', 0),
(3, 'qwdsccvbbb', NULL, '2026-06-24 23:54:56', 0),
(4, 'asd', NULL, '2026-06-25 00:47:58', 0),
(5, 'asd', NULL, '2026-06-25 00:48:08', 0),
(6, 'dfg', 6, '2026-06-25 01:00:29', 36),
(7, 'coba', NULL, '2026-06-25 01:05:32', 0),
(8, 'klo', 5, '2026-06-25 01:30:41', 30),
(9, 'zxc', NULL, '2026-06-25 01:46:09', 0),
(10, 'zxc', NULL, '2026-06-25 01:46:36', 0),
(11, 'zxmnb', NULL, '2026-06-25 01:47:23', 0),
(12, 'ggggg', NULL, '2026-06-25 01:50:58', 0),
(13, 'RTY', NULL, '2026-06-25 02:09:32', 0),
(14, '11111vv', NULL, '2026-06-25 02:21:06', 0),
(15, 'vvvvv', 6, '2026-06-25 02:27:05', 33);

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
-- Dumping data for table `working_memory_detail`
--

INSERT INTO `working_memory_detail` (`id_detail`, `id_wm`, `id_indikator`, `jawaban`) VALUES
(1, 7, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(2, 7, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(3, 7, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(4, 7, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(5, 7, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(6, 7, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(7, 7, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(8, 7, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(9, 7, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(10, 7, 22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(11, 7, 24, 'Saya suka membuat desain grafis berbasis vektor dan manipulasi gambar menggunakan aplikasi desain.'),
(12, 8, 6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(13, 8, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(14, 8, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(15, 8, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(16, 8, 12, 'Apakah Anda memiliki bakat dan minat yang tinggi dalam estetika visual, tata letak, dan desain grafis?'),
(17, 8, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(18, 8, 17, 'Apakah Anda tertarik pada implementasi operasional praktis sistem informasi di dalam organisasi atau perusahaan?'),
(19, 8, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(20, 8, 24, 'Saya suka membuat desain grafis berbasis vektor dan manipulasi gambar menggunakan aplikasi desain.'),
(21, 8, 23, 'Saya lebih menyukai dunia perancangan tata letak visual, ilustrasi, dan periklanan media cetak/digital.'),
(22, 9, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(23, 9, 6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(24, 9, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(25, 9, 8, 'Apakah Anda lebih menyukai integrasi antara teknologi komputer dan strategi proses bisnis?'),
(26, 9, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(27, 9, 13, 'Apakah Anda suka merancang media komunikasi visual untuk keperluan periklanan atau branding?'),
(28, 9, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(29, 9, 17, 'Apakah Anda tertarik pada implementasi operasional praktis sistem informasi di dalam organisasi atau perusahaan?'),
(30, 9, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(31, 9, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(32, 9, 22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(33, 9, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(34, 9, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(35, 10, 8, 'Apakah Anda lebih menyukai integrasi antara teknologi komputer dan strategi proses bisnis?'),
(36, 10, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(37, 10, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(38, 10, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(39, 10, 12, 'Apakah Anda memiliki bakat dan minat yang tinggi dalam estetika visual, tata letak, dan desain grafis?'),
(40, 10, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(41, 10, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(42, 10, 18, 'Faktanya saya suka merakit komponen perangkat keras komputer secara fisik.'),
(43, 10, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(44, 10, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(45, 10, 22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(46, 10, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(47, 11, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(48, 11, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(49, 11, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(50, 11, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(51, 11, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(52, 11, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(53, 11, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(54, 11, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(55, 11, 18, 'Faktanya saya suka merakit komponen perangkat keras komputer secara fisik.'),
(56, 11, 22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(57, 11, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(58, 11, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(59, 12, 8, 'Apakah Anda lebih menyukai integrasi antara teknologi komputer dan strategi proses bisnis?'),
(60, 12, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(61, 12, 6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(62, 12, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(63, 12, 13, 'Apakah Anda suka merancang media komunikasi visual untuk keperluan periklanan atau branding?'),
(64, 12, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(65, 12, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(66, 12, 17, 'Apakah Anda tertarik pada implementasi operasional praktis sistem informasi di dalam organisasi atau perusahaan?'),
(67, 12, 18, 'Faktanya saya suka merakit komponen perangkat keras komputer secara fisik.'),
(68, 12, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(69, 12, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(70, 12, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(71, 13, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(72, 13, 6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(73, 13, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(74, 13, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(75, 13, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(76, 13, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(77, 13, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(78, 13, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(79, 13, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(80, 13, 24, 'Saya suka membuat desain grafis berbasis vektor dan manipulasi gambar menggunakan aplikasi desain.'),
(81, 13, 22, 'Saya tertarik merancang diagram alur (flowchart) logika dan pemodelan sistem basis data.'),
(82, 13, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(83, 14, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(84, 14, 6, 'Apakah Anda tertarik merancang algoritma dan struktur data yang efisien?'),
(85, 14, 7, 'Apakah Anda suka mengelola, menganalisis, dan mengoptimalkan basis data perusahaan?'),
(86, 14, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(87, 14, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(88, 14, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(89, 14, 12, 'Apakah Anda memiliki bakat dan minat yang tinggi dalam estetika visual, tata letak, dan desain grafis?'),
(90, 14, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(91, 14, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(92, 14, 18, 'Faktanya saya suka merakit komponen perangkat keras komputer secara fisik.'),
(93, 14, 16, 'Apakah Anda lebih tertarik pada metodologi manajemen proyek pengembangan perangkat lunak skala enterprise?'),
(94, 14, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(95, 14, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(96, 15, 5, 'Apakah Anda memiliki minat yang kuat dalam mengembangkan perangkat lunak atau aplikasi ?'),
(97, 15, 8, 'Apakah Anda lebih menyukai integrasi antara teknologi komputer dan strategi proses bisnis?'),
(98, 15, 9, 'Apakah Anda tertarik mempelajari fondasi teoretis ilmu komputer dan komputasi matematis?'),
(99, 15, 10, 'Apakah Anda memiliki ketertarikan pada infrastruktur jaringan komputer dan administrasi server?'),
(100, 15, 14, 'Apakah Anda senang mengolah, membersihkan, dan menganalisis data berskala besar (big data)?'),
(101, 15, 11, 'Apakah Anda peduli dengan keamanan siber (cybersecurity) dan perlindungan data sistem informasi?'),
(102, 15, 15, 'Apakah Anda memiliki kemampuan atau minat dalam pemodelan statistik dan machine learning?'),
(103, 15, 19, 'Faktanya saya suka memasang dan mengonfigurasi jaringan kabel komputer (LAN/WAN).'),
(104, 15, 17, 'Apakah Anda tertarik pada implementasi operasional praktis sistem informasi di dalam organisasi atau perusahaan?'),
(105, 15, 21, 'Faktanya saya suka menghitung, mengolah, dan memvalidasi sekumpulan data agar menjadi informasi terstruktur.'),
(106, 15, 20, 'Saya memiliki ketertarikan untuk melakukan instalasi sistem operasi dan perbaikan komputer secara langsung.'),
(107, 15, 24, 'Saya suka membuat desain grafis berbasis vektor dan manipulasi gambar menggunakan aplikasi desain.');

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
  MODIFY `id_indikator` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id_jurusan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `id_rule` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `working_memory`
--
ALTER TABLE `working_memory`
  MODIFY `id_wm` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `working_memory_detail`
--
ALTER TABLE `working_memory_detail`
  MODIFY `id_detail` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

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
