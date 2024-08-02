-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2024 at 04:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

USE `foodexpress_2024`;  -- Database: `foodexpress_2024`
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `itemId` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`itemId`, `name`, `category`, `price`, `image`) VALUES
(1, 'Buttermilk Fried Chicken', 'Western', 23.00, 'friedchicken.png'),
(2, 'Black Angus Burger', 'Western', 28.00, 'black-angus-burger.png'),
(3, 'Fish N Chips', 'Western', 25.00, 'fishnchips.png'),
(4, 'Hainanese Chicken Rice', 'Asian', 15.00, 'chickenrice.png'),
(7, 'Penang Char Kuey Teow', 'Asian', 17.50, 'kueyteow.png'),
(8, 'Egg Fried Rice', 'Asian', 12.00, 'eggfriedrice.png'),
(11, 'Mao Shan Wang Cheesecake', 'Dessert', 10.00, 'msw.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`itemId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `itemId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
