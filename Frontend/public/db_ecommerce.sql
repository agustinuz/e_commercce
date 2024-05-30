-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2024 at 12:37 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `Owner` varchar(255) NOT NULL,
  `patientName` varchar(255) NOT NULL,
  `tanggalLahir` datetime DEFAULT NULL,
  `jenisKelamin` varchar(255) DEFAULT NULL,
  `Spesies` varchar(255) DEFAULT NULL,
  `Ras` varchar(255) DEFAULT NULL,
  `typePengobatan` varchar(255) DEFAULT NULL,
  `Schedule` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `Owner`, `patientName`, `tanggalLahir`, `jenisKelamin`, `Spesies`, `Ras`, `typePengobatan`, `Schedule`, `createdAt`, `updatedAt`) VALUES
(1, 'Agustinus Sitompul', 'Frans Diego', '2014-10-08 17:00:00', 'Laki-Laki', 'Kucing', 'French Buldog', 'Grooming', 2, '2024-05-26 14:57:03', '2024-05-26 15:50:12'),
(2, 'Agustinus', 'Frans', '2014-10-05 17:00:00', 'LakiLaki', 'Anjing', 'Buldog', 'Grooming', 2, '2024-05-26 15:45:11', '2024-05-26 15:45:11'),
(3, 'Agustinus', 'Frans', '2014-11-05 17:00:00', 'LakiLaki', 'Anjing', 'Buldog', 'Berobat', 9, '2024-05-26 15:45:48', '2024-05-26 15:45:48');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nameKategori` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nameKategori`, `createdAt`, `updatedAt`) VALUES
(6, 'Makanan Ular2', '2024-05-12 16:34:33', '2024-05-26 17:02:48'),
(9, 'Makanan Anjing', '2024-05-13 15:29:52', '2024-05-13 15:29:52'),
(10, 'makanan1', '2024-05-14 04:35:00', '2024-05-14 04:35:00'),
(11, 'makanan2', '2024-05-14 04:35:06', '2024-05-14 04:35:06'),
(12, 'makanan 3', '2024-05-14 04:35:19', '2024-05-14 04:35:19'),
(13, 'makanan5', '2024-05-14 08:07:39', '2024-05-14 08:07:39'),
(14, 'makanan 6', '2024-05-14 08:07:48', '2024-05-14 08:07:48'),
(15, 'Makanan Ular kadut', '2024-05-14 08:07:56', '2024-05-26 16:01:58');

-- --------------------------------------------------------

--
-- Table structure for table `merk`
--

CREATE TABLE `merk` (
  `id` int(11) NOT NULL,
  `nameMerk` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merk`
--

INSERT INTO `merk` (`id`, `nameMerk`, `createdAt`, `updatedAt`) VALUES
(1, 'ROYAL CANIN', '2024-05-09 18:26:46', '2024-05-09 18:26:46'),
(7, 'PEDIGREE', '2024-05-13 16:33:28', '2024-05-13 16:33:28'),
(8, 'WISHKAS', '2024-05-13 16:33:40', '2024-05-23 18:34:18'),
(9, 'HAPPY DOG', '2024-05-14 16:40:26', '2024-05-14 16:40:26'),
(10, 'NATURE BRIDGE ', '2024-05-14 16:40:59', '2024-05-14 16:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `merk_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `image`, `kategori_id`, `merk_id`, `createdAt`, `updatedAt`) VALUES
(11, 'Recovery', 200000, 'makanan kesehatan kucing', 'recovery.png', 9, 1, '2024-05-23 17:35:00', '2024-05-23 18:18:09');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `date`, `time`, `createdAt`, `updatedAt`) VALUES
(1, '2024-06-15', '10:00:00', '2024-05-20 18:08:36', '2024-05-20 18:08:36'),
(2, '2024-05-22', '11:00:00', '2024-05-20 18:43:39', '2024-05-20 18:43:39'),
(3, '2024-05-22', '11:00:00', '2024-05-20 18:43:40', '2024-05-20 18:43:40'),
(9, '2024-06-29', '15:00:00', '2024-05-26 15:17:47', '2024-05-26 15:56:53'),
(12, '2023-08-01', '15:20:00', '2024-05-26 16:20:50', '2024-05-26 16:20:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'Agustinus Sitompul', 'tinus02@gmail.com', '$2b$10$dWJ4gM6j3XNPFoEyoaxOwuvrE96gYWPiEh71dKfs/elT8E73Xofcq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiJBZ3VzdGludXMgU2l0b21wdWwiLCJlbWFpbCI6InRpbnVzMDJAZ21haWwuY29tIiwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNjU2Mzk2NCwiZXhwIjoxNzE2NTY3NTY0fQ.W0zzA5i2TbmlKC4nO2yVsjsjekxLIyJ8fGXNbCi-K7A', 'customer', '2024-05-06 16:07:00', '2024-05-24 15:19:24'),
(4, 'Agustinus Sitompul', 'tinus0@gmail.com', '$2b$10$Ex38Vm.7kfJqarIlPQyUUuSbnmXljNQBsp14Zo.XcFmV7DKGv.xva', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsIm5hbWUiOiJBZ3VzdGludXMgU2l0b21wdWwiLCJlbWFpbCI6InRpbnVzMEBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2ODMwMDI0LCJleHAiOjE3MTY4MzM2MjR9.NTe-Dyzsy0GQp89L8g_-Ix1Li3L-X1jXYcJslPzOrfY', 'admin', '2024-05-06 17:03:48', '2024-05-27 17:13:44'),
(5, 'EllynMariana', 'ellyn02@gmail.com', '$2b$10$Hzfp/Rvx4OYyTSl.TWHd4OK0.yS2lrsZFLK42jJNrFUD9Ka7Md5gO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsIm5hbWUiOiJFbGx5bk1hcmlhbmEiLCJlbWFpbCI6ImVsbHluMDJAZ21haWwuY29tIiwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNjc3Njk3OSwiZXhwIjoxNzE2NzgwNTc5fQ.d-eEajClavfQNIr-4mi20Jjt4PFjafnw4ZCp4KjZENk', 'customer', '2024-05-23 15:18:54', '2024-05-27 02:29:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Schedule` (`Schedule`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merk`
--
ALTER TABLE `merk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `merk_id` (`merk_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `merk`
--
ALTER TABLE `merk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`Schedule`) REFERENCES `schedule` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`merk_id`) REFERENCES `merk` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
