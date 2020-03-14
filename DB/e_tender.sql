-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 14, 2020 at 03:20 PM
-- Server version: 5.7.27-0ubuntu0.19.04.1
-- PHP Version: 7.2.24-0ubuntu0.19.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_tender`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `c_id` tinyint(4) NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `d_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `d_id` tinyint(4) NOT NULL,
  `d_name` varchar(25) NOT NULL,
  `st_id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `legal_status_details`
--

CREATE TABLE `legal_status_details` (
  `l_id` tinyint(4) NOT NULL,
  `l_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `legal_status_details`
--

INSERT INTO `legal_status_details` (`l_id`, `l_name`) VALUES
(0, 'Others'),
(1, 'Limited Company'),
(2, 'Undertaking'),
(3, 'Jointventure'),
(4, 'Partnership');

-- --------------------------------------------------------

--
-- Table structure for table `log_in_details`
--

CREATE TABLE `log_in_details` (
  `login_id` int(10) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role_id` tinyint(4) NOT NULL,
  `v_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log_in_details`
--

INSERT INTO `log_in_details` (`login_id`, `user_name`, `password`, `role_id`, `v_id`) VALUES
(1, 'winu', 'winu', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `role_details`
--

CREATE TABLE `role_details` (
  `role_id` tinyint(4) NOT NULL,
  `role_name` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_details`
--

INSERT INTO `role_details` (`role_id`, `role_name`) VALUES
(0, 'Super Admin'),
(1, 'Dept. Admin'),
(2, 'Vendor');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `st_id` tinyint(4) NOT NULL,
  `st_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_details`
--

CREATE TABLE `vendor_details` (
  `vd_id` int(11) NOT NULL,
  `v_name` varchar(20) NOT NULL,
  `v_address` varchar(35) NOT NULL,
  `v_yoe` varchar(4) NOT NULL,
  `v_email` varchar(25) NOT NULL,
  `v_mobile` varchar(10) NOT NULL,
  `v_reg_no` varchar(10) NOT NULL,
  `v_state_id` tinyint(4) NOT NULL,
  `v_dist_id` tinyint(4) NOT NULL,
  `v_city_id` tinyint(4) NOT NULL,
  `v_pincode` varchar(6) NOT NULL,
  `v_legal_id` varchar(1) NOT NULL,
  `v_pan` varchar(10) NOT NULL,
  `v_is_verified` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendor_details`
--

INSERT INTO `vendor_details` (`vd_id`, `v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`) VALUES
(1, 'sequeria industry', 'andheri east', '1999', 'ws@gmail.com', '7894561230', 'D123N67', 5, 4, 10, '400706', '1', 'Rf234Rt', '0');

-- --------------------------------------------------------

--
-- Table structure for table `v_contact_details`
--

CREATE TABLE `v_contact_details` (
  `vcd_id` int(11) NOT NULL,
  `vcd_name` varchar(20) NOT NULL,
  `vcd_title` varchar(15) NOT NULL,
  `vcd_dob` varchar(10) NOT NULL,
  `vcd_aadhar` varchar(12) NOT NULL,
  `vcd_contact` varchar(10) NOT NULL,
  `vcd_email` varchar(25) NOT NULL,
  `vcd_designation` varchar(20) NOT NULL,
  `vd_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `v_contact_details`
--

INSERT INTO `v_contact_details` (`vcd_id`, `vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation`, `vd_id`) VALUES
(1, 'winston sequeria', 'Mr.', '16-6-1999', '456145614561', '8975647845', 'winstonsequeria@gmail.com', 'CEO', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`d_id`),
  ADD KEY `st_id` (`st_id`);

--
-- Indexes for table `legal_status_details`
--
ALTER TABLE `legal_status_details`
  ADD PRIMARY KEY (`l_id`);

--
-- Indexes for table `log_in_details`
--
ALTER TABLE `log_in_details`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `v_id` (`v_id`);

--
-- Indexes for table `role_details`
--
ALTER TABLE `role_details`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `vendor_details`
--
ALTER TABLE `vendor_details`
  ADD PRIMARY KEY (`vd_id`);

--
-- Indexes for table `v_contact_details`
--
ALTER TABLE `v_contact_details`
  ADD PRIMARY KEY (`vcd_id`),
  ADD KEY `vd_id` (`vd_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `d_id` tinyint(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `log_in_details`
--
ALTER TABLE `log_in_details`
  MODIFY `login_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `st_id` tinyint(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `vendor_details`
--
ALTER TABLE `vendor_details`
  MODIFY `vd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `v_contact_details`
--
ALTER TABLE `v_contact_details`
  MODIFY `vcd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `districts` (`d_id`);

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `states` (`st_id`);

--
-- Constraints for table `log_in_details`
--
ALTER TABLE `log_in_details`
  ADD CONSTRAINT `log_in_details_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `v_contact_details` (`vcd_id`);

--
-- Constraints for table `v_contact_details`
--
ALTER TABLE `v_contact_details`
  ADD CONSTRAINT `v_contact_details_ibfk_1` FOREIGN KEY (`vd_id`) REFERENCES `vendor_details` (`vd_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
