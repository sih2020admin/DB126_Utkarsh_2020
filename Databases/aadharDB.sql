-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 16, 2020 at 09:10 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aadharDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `aadhar_details`
--

CREATE TABLE `aadhar_details` (
  `aadharno` varchar(15) NOT NULL,
  `phone_number` varchar(12) NOT NULL,
  `dob` date NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `date_creation` date NOT NULL,
  `last_modified_date` date NOT NULL,
  `is_delete` tinyint(4) NOT NULL,
  `deletion_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aadhar_details`
--

INSERT INTO `aadhar_details` (`aadharno`, `phone_number`, `dob`, `name`, `email`, `address`, `date_creation`, `last_modified_date`, `is_delete`, `deletion_date`) VALUES
('456745674567', '8976853955', '2020-03-10', 'softman', 'softmandev123@gmail.com', 'b-300 sector-2', '2020-03-12', '2020-03-12', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `OTP`
--

CREATE TABLE `OTP` (
  `otpid` int(11) NOT NULL,
  `aadharno` varchar(15) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `validtill` datetime NOT NULL,
  `isUsed` tinyint(4) NOT NULL,
  `reference_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OTP`
--

INSERT INTO `OTP` (`otpid`, `aadharno`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES
(1, '123412341234', '456123', '2020-03-12 09:22:19', 1, 4),
(8, '123412341234', '117340', '2020-03-12 16:45:17', 1, 1),
(9, '123412341234', '248001', '2020-03-12 16:47:13', 1, 1),
(10, '123412341234', '782065', '2020-03-12 16:49:50', 1, 1),
(11, '123412341234', '665279', '2020-03-12 16:49:26', 0, 1),
(12, '123412341234', '674782', '2020-03-12 16:52:10', 0, 1),
(13, '456745674567', '122786', '2020-03-16 20:09:39', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aadhar_details`
--
ALTER TABLE `aadhar_details`
  ADD PRIMARY KEY (`aadharno`);

--
-- Indexes for table `OTP`
--
ALTER TABLE `OTP`
  ADD PRIMARY KEY (`otpid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `OTP`
--
ALTER TABLE `OTP`
  MODIFY `otpid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
