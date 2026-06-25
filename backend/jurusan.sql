-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2026 at 04:46 AM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id_jurusan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id_jurusan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
