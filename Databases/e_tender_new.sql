-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 24, 2020 at 06:50 PM
-- Server version: 8.0.20-0ubuntu0.19.10.1
-- PHP Version: 7.2.24-0ubuntu0.19.04.2

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
-- Table structure for table `access_token`
--

CREATE TABLE `access_token` (
  `id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `access` varchar(45) NOT NULL,
  `refresh` varchar(45) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin_detail`
--

CREATE TABLE `admin_detail` (
  `ad_id` int NOT NULL,
  `ad_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ad_contact` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ad_email` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ad_dept_id` int NOT NULL,
  `ad_addr` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ad_org_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `admin_detail`
--

INSERT INTO `admin_detail` (`ad_id`, `ad_name`, `ad_contact`, `ad_email`, `ad_dept_id`, `ad_addr`, `ad_org_id`) VALUES
(1, 'admin', '7894561230', 'admintest@gmail.com', 1, 'kurla', 1),
(2, 'Sanjay Jadhav', '7412589630', 'asdfg@gmail.com', 6, 'Mumbai ', 1),
(3, 'Nana patekar', '7412589630', 'asdfg@gmail.com', 4, 'Mumbai ', 1),
(4, 'Devenfra F.', '7412589630', 'asdfg@gmail.com', 5, 'Mumbai ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `c_id` int NOT NULL,
  `c_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `st_id` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`c_id`, `c_name`, `st_id`) VALUES
(101, 'Alipur', 1),
(102, 'Andaman Island', 1),
(103, 'Anderson Island', 1),
(104, 'Arainj-Laka-Punga', 1),
(105, 'Austinabad', 1),
(106, 'Bamboo Flat', 1),
(107, 'Barren Island', 1),
(108, 'Beadonabad', 1),
(109, 'Betapur', 1),
(110, 'Bindraban', 1),
(111, 'Bonington', 1),
(112, 'Brookesabad', 1),
(113, 'Cadell Point', 1),
(114, 'Calicut', 1),
(115, 'Chetamale', 1),
(116, 'Cinque Islands', 1),
(117, 'Defence Island', 1),
(118, 'Digilpur', 1),
(119, 'Dolyganj', 1),
(120, 'Flat Island', 1),
(121, 'Geinyale', 1),
(122, 'Great Coco Island', 1),
(123, 'Haddo', 1),
(124, 'Havelock Island', 1),
(125, 'Henry Lawrence Island', 1),
(126, 'Herbertabad', 1),
(127, 'Hobdaypur', 1),
(128, 'Ilichar', 1),
(129, 'Ingoie', 1),
(130, 'Inteview Island', 1),
(131, 'Jangli Ghat', 1),
(132, 'Jhon Lawrence Island', 1),
(133, 'Karen', 1),
(134, 'Kartara', 1),
(135, 'KYD Islannd', 1),
(136, 'Landfall Island', 1),
(137, 'Little Andmand', 1),
(138, 'Little Coco Island', 1),
(139, 'Long Island', 1),
(140, 'Maimyo', 1),
(141, 'Malappuram', 1),
(142, 'Manglutan', 1),
(143, 'Manpur', 1),
(144, 'Mitha Khari', 1),
(145, 'Neill Island', 1),
(146, 'Nicobar Island', 1),
(147, 'North Brother Island', 1),
(148, 'North Passage Island', 1),
(149, 'North Sentinel Island', 1),
(150, 'Nothen Reef Island', 1),
(151, 'Outram Island', 1),
(152, 'Pahlagaon', 1),
(153, 'Palalankwe', 1),
(154, 'Passage Island', 1),
(155, 'Phaiapong', 1),
(156, 'Phoenix Island', 1),
(157, 'Port Blair', 1),
(158, 'Preparis Island', 1),
(159, 'Protheroepur', 1),
(160, 'Rangachang', 1),
(161, 'Rongat', 1),
(162, 'Rutland Island', 1),
(163, 'Sabari', 1),
(164, 'Saddle Peak', 1),
(165, 'Shadipur', 1),
(166, 'Smith Island', 1),
(167, 'Sound Island', 1),
(168, 'South Sentinel Island', 1),
(169, 'Spike Island', 1),
(170, 'Tarmugli Island', 1),
(171, 'Taylerabad', 1),
(172, 'Titaije', 1),
(173, 'Toibalawe', 1),
(174, 'Tusonabad', 1),
(175, 'West Island', 1),
(176, 'Wimberleyganj', 1),
(177, 'Yadita', 1),
(201, 'Adilabad', 2),
(202, 'Anantapur', 2),
(203, 'Chittoor', 2),
(204, 'Cuddapah', 2),
(205, 'East Godavari', 2),
(206, 'Guntur', 2),
(207, 'Hyderabad', 2),
(208, 'Karimnagar', 2),
(209, 'Khammam', 2),
(210, 'Krishna', 2),
(211, 'Kurnool', 2),
(212, 'Mahabubnagar', 2),
(213, 'Medak', 2),
(214, 'Nalgonda', 2),
(215, 'Nellore', 2),
(216, 'Nizamabad', 2),
(217, 'Prakasam', 2),
(218, 'Rangareddy', 2),
(219, 'Srikakulam', 2),
(220, 'Visakhapatnam', 2),
(221, 'Vizianagaram', 2),
(222, 'Warangal', 2),
(223, 'West Godavari', 2),
(301, 'Anjaw', 3),
(302, 'Changlang', 3),
(303, 'Dibang Valley', 3),
(304, 'East Kameng', 3),
(305, 'East Siang', 3),
(306, 'Itanagar', 3),
(307, 'Kurung Kumey', 3),
(308, 'Lohit', 3),
(309, 'Lower Dibang Valley', 3),
(310, 'Lower Subansiri', 3),
(311, 'Papum Pare', 3),
(312, 'Tawang', 3),
(313, 'Tirap', 3),
(314, 'Upper Siang', 3),
(315, 'Upper Subansiri', 3),
(316, 'West Kameng', 3),
(317, 'West Siang', 3),
(401, 'Barpeta', 4),
(402, 'Bongaigaon', 4),
(403, 'Cachar', 4),
(404, 'Darrang', 4),
(405, 'Dhemaji', 4),
(406, 'Dhubri', 4),
(407, 'Dibrugarh', 4),
(408, 'Goalpara', 4),
(409, 'Golaghat', 4),
(410, 'Guwahati', 4),
(411, 'Hailakandi', 4),
(412, 'Jorhat', 4),
(413, 'Kamrup', 4),
(414, 'Karbi Anglong', 4),
(415, 'Karimganj', 4),
(416, 'Kokrajhar', 4),
(417, 'Lakhimpur', 4),
(418, 'Marigaon', 4),
(419, 'Nagaon', 4),
(420, 'Nalbari', 4),
(421, 'North Cachar Hills', 4),
(422, 'Silchar', 4),
(423, 'Sivasagar', 4),
(424, 'Sonitpur', 4),
(425, 'Tinsukia', 4),
(426, 'Udalguri', 4),
(501, 'Araria', 5),
(502, 'Aurangabad', 5),
(503, 'Banka', 5),
(504, 'Begusarai', 5),
(505, 'Bhagalpur', 5),
(506, 'Bhojpur', 5),
(507, 'Buxar', 5),
(508, 'Darbhanga', 5),
(509, 'East Champaran', 5),
(510, 'Gaya', 5),
(511, 'Gopalganj', 5),
(512, 'Jamshedpur', 5),
(513, 'Jamui', 5),
(514, 'Jehanabad', 5),
(515, 'Kaimur (Bhabua)', 5),
(516, 'Katihar', 5),
(517, 'Khagaria', 5),
(518, 'Kishanganj', 5),
(519, 'Lakhisarai', 5),
(520, 'Madhepura', 5),
(521, 'Madhubani', 5),
(522, 'Munger', 5),
(523, 'Muzaffarpur', 5),
(524, 'Nalanda', 5),
(525, 'Nawada', 5),
(526, 'Patna', 5),
(527, 'Purnia', 5),
(528, 'Rohtas', 5),
(529, 'Saharsa', 5),
(530, 'Samastipur', 5),
(531, 'Saran', 5),
(532, 'Sheikhpura', 5),
(533, 'Sheohar', 5),
(534, 'Sitamarhi', 5),
(535, 'Siwan', 5),
(536, 'Supaul', 5),
(537, 'Vaishali', 5),
(538, 'West Champaran', 5),
(601, 'Chandigarh', 6),
(602, 'Mani Marja', 6),
(701, 'Bastar', 7),
(702, 'Bhilai', 7),
(703, 'Bijapur', 7),
(704, 'Bilaspur', 7),
(705, 'Dhamtari', 7),
(706, 'Durg', 7),
(707, 'Janjgir-Champa', 7),
(708, 'Jashpur', 7),
(709, 'Kabirdham-Kawardha', 7),
(710, 'Korba', 7),
(711, 'Korea', 7),
(712, 'Mahasamund', 7),
(713, 'Narayanpur', 7),
(714, 'Norh Bastar-Kanker', 7),
(715, 'Raigarh', 7),
(716, 'Raipur', 7),
(717, 'Rajnandgaon', 7),
(718, 'South Bastar-Dantewada', 7),
(719, 'Surguja', 7),
(801, 'Amal', 8),
(802, 'Amli', 8),
(803, 'Bedpa', 8),
(804, 'Chikhli', 8),
(805, 'Dadra & Nagar Haveli', 8),
(806, 'Dahikhed', 8),
(807, 'Dolara', 8),
(808, 'Galonda', 8),
(809, 'Kanadi', 8),
(810, 'Karchond', 8),
(811, 'Khadoli', 8),
(812, 'Kharadpada', 8),
(813, 'Kherabari', 8),
(814, 'Kherdi', 8),
(815, 'Kothar', 8),
(816, 'Luari', 8),
(817, 'Mashat', 8),
(818, 'Rakholi', 8),
(819, 'Rudana', 8),
(820, 'Saili', 8),
(821, 'Sili', 8),
(822, 'Silvassa', 8),
(823, 'Sindavni', 8),
(824, 'Udva', 8),
(825, 'Umbarkoi', 8),
(826, 'Vansda', 8),
(827, 'Vasona', 8),
(828, 'Velugam', 8),
(901, 'Brancavare', 9),
(902, 'Dagasi', 9),
(903, 'Daman', 9),
(904, 'Diu', 9),
(905, 'Magarvara', 9),
(906, 'Nagwa', 9),
(907, 'Pariali', 9),
(908, 'Passo Covo', 9),
(1001, 'Central Delhi', 10),
(1002, 'East Delhi', 10),
(1003, 'New Delhi', 10),
(1004, 'North Delhi', 10),
(1005, 'North East Delhi', 10),
(1006, 'North West Delhi', 10),
(1007, 'Old Delhi', 10),
(1008, 'South Delhi', 10),
(1009, 'South West Delhi', 10),
(1010, 'West Delhi', 10),
(1101, 'Canacona', 11),
(1102, 'Candolim', 11),
(1103, 'Chinchinim', 11),
(1104, 'Cortalim', 11),
(1105, 'Goa', 11),
(1106, 'Jua', 11),
(1107, 'Madgaon', 11),
(1108, 'Mahem', 11),
(1109, 'Mapuca', 11),
(1110, 'Marmagao', 11),
(1111, 'Panji', 11),
(1112, 'Ponda', 11),
(1113, 'Sanvordem', 11),
(1114, 'Terekhol', 11),
(1201, 'Ahmedabad', 12),
(1202, 'Amreli', 12),
(1203, 'Anand', 12),
(1204, 'Banaskantha', 12),
(1205, 'Baroda', 12),
(1206, 'Bharuch', 12),
(1207, 'Bhavnagar', 12),
(1208, 'Dahod', 12),
(1209, 'Dang', 12),
(1210, 'Dwarka', 12),
(1211, 'Gandhinagar', 12),
(1212, 'Jamnagar', 12),
(1213, 'Junagadh', 12),
(1214, 'Kheda', 12),
(1215, 'Kutch', 12),
(1216, 'Mehsana', 12),
(1217, 'Nadiad', 12),
(1218, 'Narmada', 12),
(1219, 'Navsari', 12),
(1220, 'Panchmahals', 12),
(1221, 'Patan', 12),
(1222, 'Porbandar', 12),
(1223, 'Rajkot', 12),
(1224, 'Sabarkantha', 12),
(1225, 'Surat', 12),
(1226, 'Surendranagar', 12),
(1227, 'Vadodara', 12),
(1228, 'Valsad', 12),
(1229, 'Vapi', 12),
(1301, 'Ambala', 13),
(1302, 'Bhiwani', 13),
(1303, 'Faridabad', 13),
(1304, 'Fatehabad', 13),
(1305, 'Gurgaon', 13),
(1306, 'Hisar', 13),
(1307, 'Jhajjar', 13),
(1308, 'Jind', 13),
(1309, 'Kaithal', 13),
(1310, 'Karnal', 13),
(1311, 'Kurukshetra', 13),
(1312, 'Mahendragarh', 13),
(1313, 'Mewat', 13),
(1314, 'Panchkula', 13),
(1315, 'Panipat', 13),
(1316, 'Rewari', 13),
(1317, 'Rohtak', 13),
(1318, 'Sirsa', 13),
(1319, 'Sonipat', 13),
(1320, 'Yamunanagar', 13),
(1401, 'Bilaspur', 14),
(1402, 'Chamba', 14),
(1403, 'Dalhousie', 14),
(1404, 'Hamirpur', 14),
(1405, 'Kangra', 14),
(1406, 'Kinnaur', 14),
(1407, 'Kullu', 14),
(1408, 'Lahaul & Spiti', 14),
(1409, 'Mandi', 14),
(1410, 'Shimla', 14),
(1411, 'Sirmaur', 14),
(1412, 'Solan', 14),
(1413, 'Una', 14),
(1501, 'Anantnag', 15),
(1502, 'Baramulla', 15),
(1503, 'Budgam', 15),
(1504, 'Doda', 15),
(1505, 'Jammu', 15),
(1506, 'Kargil', 15),
(1507, 'Kathua', 15),
(1508, 'Kupwara', 15),
(1509, 'Leh', 15),
(1510, 'Poonch', 15),
(1511, 'Pulwama', 15),
(1512, 'Rajauri', 15),
(1513, 'Srinagar', 15),
(1514, 'Udhampur', 15),
(1601, 'Bokaro', 16),
(1602, 'Chatra', 16),
(1603, 'Deoghar', 16),
(1604, 'Dhanbad', 16),
(1605, 'Dumka', 16),
(1606, 'East Singhbhum', 16),
(1607, 'Garhwa', 16),
(1608, 'Giridih', 16),
(1609, 'Godda', 16),
(1610, 'Gumla', 16),
(1611, 'Hazaribag', 16),
(1612, 'Jamtara', 16),
(1613, 'Koderma', 16),
(1614, 'Latehar', 16),
(1615, 'Lohardaga', 16),
(1616, 'Pakur', 16),
(1617, 'Palamu', 16),
(1618, 'Ranchi', 16),
(1619, 'Sahibganj', 16),
(1620, 'Seraikela', 16),
(1621, 'Simdega', 16),
(1622, 'West Singhbhum', 16),
(1701, 'Bagalkot', 17),
(1702, 'Bangalore', 17),
(1703, 'Bangalore Rural', 17),
(1704, 'Belgaum', 17),
(1705, 'Bellary', 17),
(1706, 'Bhatkal', 17),
(1707, 'Bidar', 17),
(1708, 'Bijapur', 17),
(1709, 'Chamrajnagar', 17),
(1710, 'Chickmagalur', 17),
(1711, 'Chikballapur', 17),
(1712, 'Chitradurga', 17),
(1713, 'Dakshina Kannada', 17),
(1714, 'Davanagere', 17),
(1715, 'Dharwad', 17),
(1716, 'Gadag', 17),
(1717, 'Gulbarga', 17),
(1718, 'Hampi', 17),
(1719, 'Hassan', 17),
(1720, 'Haveri', 17),
(1721, 'Hospet', 17),
(1722, 'Karwar', 17),
(1723, 'Kodagu', 17),
(1724, 'Kolar', 17),
(1725, 'Koppal', 17),
(1726, 'Madikeri', 17),
(1727, 'Mandya', 17),
(1728, 'Mangalore', 17),
(1729, 'Manipal', 17),
(1730, 'Mysore', 17),
(1731, 'Raichur', 17),
(1732, 'Shimoga', 17),
(1733, 'Sirsi', 17),
(1734, 'Sringeri', 17),
(1735, 'Srirangapatna', 17),
(1736, 'Tumkur', 17),
(1737, 'Udupi', 17),
(1738, 'Uttara Kannada', 17),
(1801, 'Alappuzha', 18),
(1802, 'Alleppey', 18),
(1803, 'Alwaye', 18),
(1804, 'Ernakulam', 18),
(1805, 'Idukki', 18),
(1806, 'Kannur', 18),
(1807, 'Kasargod', 18),
(1808, 'Kochi', 18),
(1809, 'Kollam', 18),
(1810, 'Kottayam', 18),
(1811, 'Kovalam', 18),
(1812, 'Kozhikode', 18),
(1813, 'Malappuram', 18),
(1814, 'Palakkad', 18),
(1815, 'Pathanamthitta', 18),
(1816, 'Perumbavoor', 18),
(1817, 'Thiruvananthapuram', 18),
(1818, 'Thrissur', 18),
(1819, 'Trichur', 18),
(1820, 'Trivandrum', 18),
(1821, 'Wayanad', 18),
(1901, 'Agatti Island', 19),
(1902, 'Bingaram Island', 19),
(1903, 'Bitra Island', 19),
(1904, 'Chetlat Island', 19),
(1905, 'Kadmat Island', 19),
(1906, 'Kalpeni Island', 19),
(1907, 'Kavaratti Island', 19),
(1908, 'Kiltan Island', 19),
(1909, 'Lakshadweep Sea', 19),
(1910, 'Minicoy Island', 19),
(1911, 'North Island', 19),
(1912, 'South Island', 19),
(2001, 'Anuppur', 20),
(2002, 'Ashoknagar', 20),
(2003, 'Balaghat', 20),
(2004, 'Barwani', 20),
(2005, 'Betul', 20),
(2006, 'Bhind', 20),
(2007, 'Bhopal', 20),
(2008, 'Burhanpur', 20),
(2009, 'Chhatarpur', 20),
(2010, 'Chhindwara', 20),
(2011, 'Damoh', 20),
(2012, 'Datia', 20),
(2013, 'Dewas', 20),
(2014, 'Dhar', 20),
(2015, 'Dindori', 20),
(2016, 'Guna', 20),
(2017, 'Gwalior', 20),
(2018, 'Harda', 20),
(2019, 'Hoshangabad', 20),
(2020, 'Indore', 20),
(2021, 'Jabalpur', 20),
(2022, 'Jagdalpur', 20),
(2023, 'Jhabua', 20),
(2024, 'Katni', 20),
(2025, 'Khandwa', 20),
(2026, 'Khargone', 20),
(2027, 'Mandla', 20),
(2028, 'Mandsaur', 20),
(2029, 'Morena', 20),
(2030, 'Narsinghpur', 20),
(2031, 'Neemuch', 20),
(2032, 'Panna', 20),
(2033, 'Raisen', 20),
(2034, 'Rajgarh', 20),
(2035, 'Ratlam', 20),
(2036, 'Rewa', 20),
(2037, 'Sagar', 20),
(2038, 'Satna', 20),
(2039, 'Sehore', 20),
(2040, 'Seoni', 20),
(2041, 'Shahdol', 20),
(2042, 'Shajapur', 20),
(2043, 'Sheopur', 20),
(2044, 'Shivpuri', 20),
(2045, 'Sidhi', 20),
(2046, 'Tikamgarh', 20),
(2047, 'Ujjain', 20),
(2048, 'Umaria', 20),
(2049, 'Vidisha', 20),
(2101, 'Ahmednagar', 21),
(2102, 'Akola', 21),
(2103, 'Amravati', 21),
(2104, 'Aurangabad', 21),
(2105, 'Beed', 21),
(2106, 'Bhandara', 21),
(2107, 'Buldhana', 21),
(2108, 'Chandrapur', 21),
(2109, 'Dhule', 21),
(2110, 'Gadchiroli', 21),
(2111, 'Gondia', 21),
(2112, 'Hingoli', 21),
(2113, 'Jalgaon', 21),
(2114, 'Jalna', 21),
(2115, 'Kolhapur', 21),
(2116, 'Latur', 21),
(2117, 'Mahabaleshwar', 21),
(2118, 'Mumbai', 21),
(2119, 'Mumbai City', 21),
(2120, 'Mumbai Suburban', 21),
(2121, 'Nagpur', 21),
(2122, 'Nanded', 21),
(2123, 'Nandurbar', 21),
(2124, 'Nashik', 21),
(2125, 'Osmanabad', 21),
(2126, 'Parbhani', 21),
(2127, 'Pune', 21),
(2128, 'Raigad', 21),
(2129, 'Ratnagiri', 21),
(2130, 'Sangli', 21),
(2131, 'Satara', 21),
(2132, 'Sholapur', 21),
(2133, 'Sindhudurg', 21),
(2134, 'Thane', 21),
(2135, 'Wardha', 21),
(2136, 'Washim', 21),
(2137, 'Yavatmal', 21),
(2201, 'Bishnupur', 22),
(2202, 'Chandel', 22),
(2203, 'Churachandpur', 22),
(2204, 'Imphal East', 22),
(2205, 'Imphal West', 22),
(2206, 'Senapati', 22),
(2207, 'Tamenglong', 22),
(2208, 'Thoubal', 22),
(2209, 'Ukhrul', 22),
(2301, 'East Garo Hills', 23),
(2302, 'East Khasi Hills', 23),
(2303, 'Jaintia Hills', 23),
(2304, 'Ri Bhoi', 23),
(2305, 'Shillong', 23),
(2306, 'South Garo Hills', 23),
(2307, 'West Garo Hills', 23),
(2308, 'West Khasi Hills', 23),
(2401, 'Aizawl', 24),
(2402, 'Champhai', 24),
(2403, 'Kolasib', 24),
(2404, 'Lawngtlai', 24),
(2405, 'Lunglei', 24),
(2406, 'Mamit', 24),
(2407, 'Saiha', 24),
(2408, 'Serchhip', 24),
(2501, 'Dimapur', 25),
(2502, 'Kohima', 25),
(2503, 'Mokokchung', 25),
(2504, 'Mon', 25),
(2505, 'Phek', 25),
(2506, 'Tuensang', 25),
(2507, 'Wokha', 25),
(2508, 'Zunheboto', 25),
(2601, 'Angul', 26),
(2602, 'Balangir', 26),
(2603, 'Balasore', 26),
(2604, 'Baleswar', 26),
(2605, 'Bargarh', 26),
(2606, 'Berhampur', 26),
(2607, 'Bhadrak', 26),
(2608, 'Bhubaneswar', 26),
(2609, 'Boudh', 26),
(2610, 'Cuttack', 26),
(2611, 'Deogarh', 26),
(2612, 'Dhenkanal', 26),
(2613, 'Gajapati', 26),
(2614, 'Ganjam', 26),
(2615, 'Jagatsinghapur', 26),
(2616, 'Jajpur', 26),
(2617, 'Jharsuguda', 26),
(2618, 'Kalahandi', 26),
(2619, 'Kandhamal', 26),
(2620, 'Kendrapara', 26),
(2621, 'Kendujhar', 26),
(2622, 'Khordha', 26),
(2623, 'Koraput', 26),
(2624, 'Malkangiri', 26),
(2625, 'Mayurbhanj', 26),
(2626, 'Nabarangapur', 26),
(2627, 'Nayagarh', 26),
(2628, 'Nuapada', 26),
(2629, 'Puri', 26),
(2630, 'Rayagada', 26),
(2631, 'Rourkela', 26),
(2632, 'Sambalpur', 26),
(2633, 'Subarnapur', 26),
(2634, 'Sundergarh', 26),
(2701, 'Bahur', 27),
(2702, 'Karaikal', 27),
(2703, 'Mahe', 27),
(2704, 'Pondicherry', 27),
(2705, 'Purnankuppam', 27),
(2706, 'Valudavur', 27),
(2707, 'Villianur', 27),
(2708, 'Yanam', 27),
(2801, 'Amritsar', 28),
(2802, 'Barnala', 28),
(2803, 'Bathinda', 28),
(2804, 'Faridkot', 28),
(2805, 'Fatehgarh Sahib', 28),
(2806, 'Ferozepur', 28),
(2807, 'Gurdaspur', 28),
(2808, 'Hoshiarpur', 28),
(2809, 'Jalandhar', 28),
(2810, 'Kapurthala', 28),
(2811, 'Ludhiana', 28),
(2812, 'Mansa', 28),
(2813, 'Moga', 28),
(2814, 'Muktsar', 28),
(2815, 'Nawanshahr', 28),
(2816, 'Pathankot', 28),
(2817, 'Patiala', 28),
(2818, 'Rupnagar', 28),
(2819, 'Sangrur', 28),
(2820, 'SAS Nagar', 28),
(2821, 'Tarn Taran', 28),
(2901, 'Ajmer', 29),
(2902, 'Alwar', 29),
(2903, 'Banswara', 29),
(2904, 'Baran', 29),
(2905, 'Barmer', 29),
(2906, 'Bharatpur', 29),
(2907, 'Bhilwara', 29),
(2908, 'Bikaner', 29),
(2909, 'Bundi', 29),
(2910, 'Chittorgarh', 29),
(2911, 'Churu', 29),
(2912, 'Dausa', 29),
(2913, 'Dholpur', 29),
(2914, 'Dungarpur', 29),
(2915, 'Hanumangarh', 29),
(2916, 'Jaipur', 29),
(2917, 'Jaisalmer', 29),
(2918, 'Jalore', 29),
(2919, 'Jhalawar', 29),
(2920, 'Jhunjhunu', 29),
(2921, 'Jodhpur', 29),
(2922, 'Karauli', 29),
(2923, 'Kota', 29),
(2924, 'Nagaur', 29),
(2925, 'Pali', 29),
(2926, 'Pilani', 29),
(2927, 'Rajsamand', 29),
(2928, 'Sawai Madhopur', 29),
(2929, 'Sikar', 29),
(2930, 'Sirohi', 29),
(2931, 'Sri Ganganagar', 29),
(2932, 'Tonk', 29),
(2933, 'Udaipur', 29),
(3001, 'Barmiak', 30),
(3002, 'Be', 30),
(3003, 'Bhurtuk', 30),
(3004, 'Chhubakha', 30),
(3005, 'Chidam', 30),
(3006, 'Chubha', 30),
(3007, 'Chumikteng', 30),
(3008, 'Dentam', 30),
(3009, 'Dikchu', 30),
(3010, 'Dzongri', 30),
(3011, 'Gangtok', 30),
(3012, 'Gauzing', 30),
(3013, 'Gyalshing', 30),
(3014, 'Hema', 30),
(3015, 'Kerung', 30),
(3016, 'Lachen', 30),
(3017, 'Lachung', 30),
(3018, 'Lema', 30),
(3019, 'Lingtam', 30),
(3020, 'Lungthu', 30),
(3021, 'Mangan', 30),
(3022, 'Namchi', 30),
(3023, 'Namthang', 30),
(3024, 'Nanga', 30),
(3025, 'Nantang', 30),
(3026, 'Naya Bazar', 30),
(3027, 'Padamachen', 30),
(3028, 'Pakhyong', 30),
(3029, 'Pemayangtse', 30),
(3030, 'Phensang', 30),
(3031, 'Rangli', 30),
(3032, 'Rinchingpong', 30),
(3033, 'Sakyong', 30),
(3034, 'Samdong', 30),
(3035, 'Singtam', 30),
(3036, 'Siniolchu', 30),
(3037, 'Sombari', 30),
(3038, 'Soreng', 30),
(3039, 'Sosing', 30),
(3040, 'Tekhug', 30),
(3041, 'Temi', 30),
(3042, 'Tsetang', 30),
(3043, 'Tsomgo', 30),
(3044, 'Tumlong', 30),
(3045, 'Yangang', 30),
(3046, 'Yumtang', 30),
(3101, 'Chennai', 31),
(3102, 'Chidambaram', 31),
(3103, 'Chingleput', 31),
(3104, 'Coimbatore', 31),
(3105, 'Courtallam', 31),
(3106, 'Cuddalore', 31),
(3107, 'Dharmapuri', 31),
(3108, 'Dindigul', 31),
(3109, 'Erode', 31),
(3110, 'Hosur', 31),
(3111, 'Kanchipuram', 31),
(3112, 'Kanyakumari', 31),
(3113, 'Karaikudi', 31),
(3114, 'Karur', 31),
(3115, 'Kodaikanal', 31),
(3116, 'Kovilpatti', 31),
(3117, 'Krishnagiri', 31),
(3118, 'Kumbakonam', 31),
(3119, 'Madurai', 31),
(3120, 'Mayiladuthurai', 31),
(3121, 'Nagapattinam', 31),
(3122, 'Nagarcoil', 31),
(3123, 'Namakkal', 31),
(3124, 'Neyveli', 31),
(3125, 'Nilgiris', 31),
(3126, 'Ooty', 31),
(3127, 'Palani', 31),
(3128, 'Perambalur', 31),
(3129, 'Pollachi', 31),
(3130, 'Pudukkottai', 31),
(3131, 'Rajapalayam', 31),
(3132, 'Ramanathapuram', 31),
(3133, 'Salem', 31),
(3134, 'Sivaganga', 31),
(3135, 'Sivakasi', 31),
(3136, 'Thanjavur', 31),
(3137, 'Theni', 31),
(3138, 'Thoothukudi', 31),
(3139, 'Tiruchirappalli', 31),
(3140, 'Tirunelveli', 31),
(3141, 'Tirupur', 31),
(3142, 'Tiruvallur', 31),
(3143, 'Tiruvannamalai', 31),
(3144, 'Tiruvarur', 31),
(3145, 'Trichy', 31),
(3146, 'Tuticorin', 31),
(3147, 'Vellore', 31),
(3148, 'Villupuram', 31),
(3149, 'Virudhunagar', 31),
(3150, 'Yercaud', 31),
(3201, 'Agartala', 32),
(3202, 'Ambasa', 32),
(3203, 'Bampurbari', 32),
(3204, 'Belonia', 32),
(3205, 'Dhalai', 32),
(3206, 'Dharam Nagar', 32),
(3207, 'Kailashahar', 32),
(3208, 'Kamal Krishnabari', 32),
(3209, 'Khopaiyapara', 32),
(3210, 'Khowai', 32),
(3211, 'Phuldungsei', 32),
(3212, 'Radha Kishore Pur', 32),
(3213, 'Tripura', 32),
(101, 'Alipur', 1),
(102, 'Andaman Island', 1),
(103, 'Anderson Island', 1),
(104, 'Arainj-Laka-Punga', 1),
(105, 'Austinabad', 1),
(106, 'Bamboo Flat', 1),
(107, 'Barren Island', 1),
(108, 'Beadonabad', 1),
(109, 'Betapur', 1),
(110, 'Bindraban', 1),
(111, 'Bonington', 1),
(112, 'Brookesabad', 1),
(113, 'Cadell Point', 1),
(114, 'Calicut', 1),
(115, 'Chetamale', 1),
(116, 'Cinque Islands', 1),
(117, 'Defence Island', 1),
(118, 'Digilpur', 1),
(119, 'Dolyganj', 1),
(120, 'Flat Island', 1),
(121, 'Geinyale', 1),
(122, 'Great Coco Island', 1),
(123, 'Haddo', 1),
(124, 'Havelock Island', 1),
(125, 'Henry Lawrence Island', 1),
(126, 'Herbertabad', 1),
(127, 'Hobdaypur', 1),
(128, 'Ilichar', 1),
(129, 'Ingoie', 1),
(130, 'Inteview Island', 1),
(131, 'Jangli Ghat', 1),
(132, 'Jhon Lawrence Island', 1),
(133, 'Karen', 1),
(134, 'Kartara', 1),
(135, 'KYD Islannd', 1),
(136, 'Landfall Island', 1),
(137, 'Little Andmand', 1),
(138, 'Little Coco Island', 1),
(139, 'Long Island', 1),
(140, 'Maimyo', 1),
(141, 'Malappuram', 1),
(142, 'Manglutan', 1),
(143, 'Manpur', 1),
(144, 'Mitha Khari', 1),
(145, 'Neill Island', 1),
(146, 'Nicobar Island', 1),
(147, 'North Brother Island', 1),
(148, 'North Passage Island', 1),
(149, 'North Sentinel Island', 1),
(150, 'Nothen Reef Island', 1),
(151, 'Outram Island', 1),
(152, 'Pahlagaon', 1),
(153, 'Palalankwe', 1),
(154, 'Passage Island', 1),
(155, 'Phaiapong', 1),
(156, 'Phoenix Island', 1),
(157, 'Port Blair', 1),
(158, 'Preparis Island', 1),
(159, 'Protheroepur', 1),
(160, 'Rangachang', 1),
(161, 'Rongat', 1),
(162, 'Rutland Island', 1),
(163, 'Sabari', 1),
(164, 'Saddle Peak', 1),
(165, 'Shadipur', 1),
(166, 'Smith Island', 1),
(167, 'Sound Island', 1),
(168, 'South Sentinel Island', 1),
(169, 'Spike Island', 1),
(170, 'Tarmugli Island', 1),
(171, 'Taylerabad', 1),
(172, 'Titaije', 1),
(173, 'Toibalawe', 1),
(174, 'Tusonabad', 1),
(175, 'West Island', 1),
(176, 'Wimberleyganj', 1),
(177, 'Yadita', 1),
(201, 'Adilabad', 2),
(202, 'Anantapur', 2),
(203, 'Chittoor', 2),
(204, 'Cuddapah', 2),
(205, 'East Godavari', 2),
(206, 'Guntur', 2),
(207, 'Hyderabad', 2),
(208, 'Karimnagar', 2),
(209, 'Khammam', 2),
(210, 'Krishna', 2),
(211, 'Kurnool', 2),
(212, 'Mahabubnagar', 2),
(213, 'Medak', 2),
(214, 'Nalgonda', 2),
(215, 'Nellore', 2),
(216, 'Nizamabad', 2),
(217, 'Prakasam', 2),
(218, 'Rangareddy', 2),
(219, 'Srikakulam', 2),
(220, 'Visakhapatnam', 2),
(221, 'Vizianagaram', 2),
(222, 'Warangal', 2),
(223, 'West Godavari', 2),
(301, 'Anjaw', 3),
(302, 'Changlang', 3),
(303, 'Dibang Valley', 3),
(304, 'East Kameng', 3),
(305, 'East Siang', 3),
(306, 'Itanagar', 3),
(307, 'Kurung Kumey', 3),
(308, 'Lohit', 3),
(309, 'Lower Dibang Valley', 3),
(310, 'Lower Subansiri', 3),
(311, 'Papum Pare', 3),
(312, 'Tawang', 3),
(313, 'Tirap', 3),
(314, 'Upper Siang', 3),
(315, 'Upper Subansiri', 3),
(316, 'West Kameng', 3),
(317, 'West Siang', 3),
(401, 'Barpeta', 4),
(402, 'Bongaigaon', 4),
(403, 'Cachar', 4),
(404, 'Darrang', 4),
(405, 'Dhemaji', 4),
(406, 'Dhubri', 4),
(407, 'Dibrugarh', 4),
(408, 'Goalpara', 4),
(409, 'Golaghat', 4),
(410, 'Guwahati', 4),
(411, 'Hailakandi', 4),
(412, 'Jorhat', 4),
(413, 'Kamrup', 4),
(414, 'Karbi Anglong', 4),
(415, 'Karimganj', 4),
(416, 'Kokrajhar', 4),
(417, 'Lakhimpur', 4),
(418, 'Marigaon', 4),
(419, 'Nagaon', 4),
(420, 'Nalbari', 4),
(421, 'North Cachar Hills', 4),
(422, 'Silchar', 4),
(423, 'Sivasagar', 4),
(424, 'Sonitpur', 4),
(425, 'Tinsukia', 4),
(426, 'Udalguri', 4),
(501, 'Araria', 5),
(502, 'Aurangabad', 5),
(503, 'Banka', 5),
(504, 'Begusarai', 5),
(505, 'Bhagalpur', 5),
(506, 'Bhojpur', 5),
(507, 'Buxar', 5),
(508, 'Darbhanga', 5),
(509, 'East Champaran', 5),
(510, 'Gaya', 5),
(511, 'Gopalganj', 5),
(512, 'Jamshedpur', 5),
(513, 'Jamui', 5),
(514, 'Jehanabad', 5),
(515, 'Kaimur (Bhabua)', 5),
(516, 'Katihar', 5),
(517, 'Khagaria', 5),
(518, 'Kishanganj', 5),
(519, 'Lakhisarai', 5),
(520, 'Madhepura', 5),
(521, 'Madhubani', 5),
(522, 'Munger', 5),
(523, 'Muzaffarpur', 5),
(524, 'Nalanda', 5),
(525, 'Nawada', 5),
(526, 'Patna', 5),
(527, 'Purnia', 5),
(528, 'Rohtas', 5),
(529, 'Saharsa', 5),
(530, 'Samastipur', 5),
(531, 'Saran', 5),
(532, 'Sheikhpura', 5),
(533, 'Sheohar', 5),
(534, 'Sitamarhi', 5),
(535, 'Siwan', 5),
(536, 'Supaul', 5),
(537, 'Vaishali', 5),
(538, 'West Champaran', 5),
(601, 'Chandigarh', 6),
(602, 'Mani Marja', 6),
(701, 'Bastar', 7),
(702, 'Bhilai', 7),
(703, 'Bijapur', 7),
(704, 'Bilaspur', 7),
(705, 'Dhamtari', 7),
(706, 'Durg', 7),
(707, 'Janjgir-Champa', 7),
(708, 'Jashpur', 7),
(709, 'Kabirdham-Kawardha', 7),
(710, 'Korba', 7),
(711, 'Korea', 7),
(712, 'Mahasamund', 7),
(713, 'Narayanpur', 7),
(714, 'Norh Bastar-Kanker', 7),
(715, 'Raigarh', 7),
(716, 'Raipur', 7),
(717, 'Rajnandgaon', 7),
(718, 'South Bastar-Dantewada', 7),
(719, 'Surguja', 7),
(801, 'Amal', 8),
(802, 'Amli', 8),
(803, 'Bedpa', 8),
(804, 'Chikhli', 8),
(805, 'Dadra & Nagar Haveli', 8),
(806, 'Dahikhed', 8),
(807, 'Dolara', 8),
(808, 'Galonda', 8),
(809, 'Kanadi', 8),
(810, 'Karchond', 8),
(811, 'Khadoli', 8),
(812, 'Kharadpada', 8),
(813, 'Kherabari', 8),
(814, 'Kherdi', 8),
(815, 'Kothar', 8),
(816, 'Luari', 8),
(817, 'Mashat', 8),
(818, 'Rakholi', 8),
(819, 'Rudana', 8),
(820, 'Saili', 8),
(821, 'Sili', 8),
(822, 'Silvassa', 8),
(823, 'Sindavni', 8),
(824, 'Udva', 8),
(825, 'Umbarkoi', 8),
(826, 'Vansda', 8),
(827, 'Vasona', 8),
(828, 'Velugam', 8),
(901, 'Brancavare', 9),
(902, 'Dagasi', 9),
(903, 'Daman', 9),
(904, 'Diu', 9),
(905, 'Magarvara', 9),
(906, 'Nagwa', 9),
(907, 'Pariali', 9),
(908, 'Passo Covo', 9),
(1001, 'Central Delhi', 10),
(1002, 'East Delhi', 10),
(1003, 'New Delhi', 10),
(1004, 'North Delhi', 10),
(1005, 'North East Delhi', 10),
(1006, 'North West Delhi', 10),
(1007, 'Old Delhi', 10),
(1008, 'South Delhi', 10),
(1009, 'South West Delhi', 10),
(1010, 'West Delhi', 10),
(1101, 'Canacona', 11),
(1102, 'Candolim', 11),
(1103, 'Chinchinim', 11),
(1104, 'Cortalim', 11),
(1105, 'Goa', 11),
(1106, 'Jua', 11),
(1107, 'Madgaon', 11),
(1108, 'Mahem', 11),
(1109, 'Mapuca', 11),
(1110, 'Marmagao', 11),
(1111, 'Panji', 11),
(1112, 'Ponda', 11),
(1113, 'Sanvordem', 11),
(1114, 'Terekhol', 11),
(1201, 'Ahmedabad', 12),
(1202, 'Amreli', 12),
(1203, 'Anand', 12),
(1204, 'Banaskantha', 12),
(1205, 'Baroda', 12),
(1206, 'Bharuch', 12),
(1207, 'Bhavnagar', 12),
(1208, 'Dahod', 12),
(1209, 'Dang', 12),
(1210, 'Dwarka', 12),
(1211, 'Gandhinagar', 12),
(1212, 'Jamnagar', 12),
(1213, 'Junagadh', 12),
(1214, 'Kheda', 12),
(1215, 'Kutch', 12),
(1216, 'Mehsana', 12),
(1217, 'Nadiad', 12),
(1218, 'Narmada', 12),
(1219, 'Navsari', 12),
(1220, 'Panchmahals', 12),
(1221, 'Patan', 12),
(1222, 'Porbandar', 12),
(1223, 'Rajkot', 12),
(1224, 'Sabarkantha', 12),
(1225, 'Surat', 12),
(1226, 'Surendranagar', 12),
(1227, 'Vadodara', 12),
(1228, 'Valsad', 12),
(1229, 'Vapi', 12),
(1301, 'Ambala', 13),
(1302, 'Bhiwani', 13),
(1303, 'Faridabad', 13),
(1304, 'Fatehabad', 13),
(1305, 'Gurgaon', 13),
(1306, 'Hisar', 13),
(1307, 'Jhajjar', 13),
(1308, 'Jind', 13),
(1309, 'Kaithal', 13),
(1310, 'Karnal', 13),
(1311, 'Kurukshetra', 13),
(1312, 'Mahendragarh', 13),
(1313, 'Mewat', 13),
(1314, 'Panchkula', 13),
(1315, 'Panipat', 13),
(1316, 'Rewari', 13),
(1317, 'Rohtak', 13),
(1318, 'Sirsa', 13),
(1319, 'Sonipat', 13),
(1320, 'Yamunanagar', 13),
(1401, 'Bilaspur', 14),
(1402, 'Chamba', 14),
(1403, 'Dalhousie', 14),
(1404, 'Hamirpur', 14),
(1405, 'Kangra', 14),
(1406, 'Kinnaur', 14),
(1407, 'Kullu', 14),
(1408, 'Lahaul & Spiti', 14),
(1409, 'Mandi', 14),
(1410, 'Shimla', 14),
(1411, 'Sirmaur', 14),
(1412, 'Solan', 14),
(1413, 'Una', 14),
(1501, 'Anantnag', 15),
(1502, 'Baramulla', 15),
(1503, 'Budgam', 15),
(1504, 'Doda', 15),
(1505, 'Jammu', 15),
(1506, 'Kargil', 15),
(1507, 'Kathua', 15),
(1508, 'Kupwara', 15),
(1509, 'Leh', 15),
(1510, 'Poonch', 15),
(1511, 'Pulwama', 15),
(1512, 'Rajauri', 15),
(1513, 'Srinagar', 15),
(1514, 'Udhampur', 15),
(1601, 'Bokaro', 16),
(1602, 'Chatra', 16),
(1603, 'Deoghar', 16),
(1604, 'Dhanbad', 16),
(1605, 'Dumka', 16),
(1606, 'East Singhbhum', 16),
(1607, 'Garhwa', 16),
(1608, 'Giridih', 16),
(1609, 'Godda', 16),
(1610, 'Gumla', 16),
(1611, 'Hazaribag', 16),
(1612, 'Jamtara', 16),
(1613, 'Koderma', 16),
(1614, 'Latehar', 16),
(1615, 'Lohardaga', 16),
(1616, 'Pakur', 16),
(1617, 'Palamu', 16),
(1618, 'Ranchi', 16),
(1619, 'Sahibganj', 16),
(1620, 'Seraikela', 16),
(1621, 'Simdega', 16),
(1622, 'West Singhbhum', 16),
(1701, 'Bagalkot', 17),
(1702, 'Bangalore', 17),
(1703, 'Bangalore Rural', 17),
(1704, 'Belgaum', 17),
(1705, 'Bellary', 17),
(1706, 'Bhatkal', 17),
(1707, 'Bidar', 17),
(1708, 'Bijapur', 17),
(1709, 'Chamrajnagar', 17),
(1710, 'Chickmagalur', 17),
(1711, 'Chikballapur', 17),
(1712, 'Chitradurga', 17),
(1713, 'Dakshina Kannada', 17),
(1714, 'Davanagere', 17),
(1715, 'Dharwad', 17),
(1716, 'Gadag', 17),
(1717, 'Gulbarga', 17),
(1718, 'Hampi', 17),
(1719, 'Hassan', 17),
(1720, 'Haveri', 17),
(1721, 'Hospet', 17),
(1722, 'Karwar', 17),
(1723, 'Kodagu', 17),
(1724, 'Kolar', 17),
(1725, 'Koppal', 17),
(1726, 'Madikeri', 17),
(1727, 'Mandya', 17),
(1728, 'Mangalore', 17),
(1729, 'Manipal', 17),
(1730, 'Mysore', 17),
(1731, 'Raichur', 17),
(1732, 'Shimoga', 17),
(1733, 'Sirsi', 17),
(1734, 'Sringeri', 17),
(1735, 'Srirangapatna', 17),
(1736, 'Tumkur', 17),
(1737, 'Udupi', 17),
(1738, 'Uttara Kannada', 17),
(1801, 'Alappuzha', 18),
(1802, 'Alleppey', 18),
(1803, 'Alwaye', 18),
(1804, 'Ernakulam', 18),
(1805, 'Idukki', 18),
(1806, 'Kannur', 18),
(1807, 'Kasargod', 18),
(1808, 'Kochi', 18),
(1809, 'Kollam', 18),
(1810, 'Kottayam', 18),
(1811, 'Kovalam', 18),
(1812, 'Kozhikode', 18),
(1813, 'Malappuram', 18),
(1814, 'Palakkad', 18),
(1815, 'Pathanamthitta', 18),
(1816, 'Perumbavoor', 18),
(1817, 'Thiruvananthapuram', 18),
(1818, 'Thrissur', 18),
(1819, 'Trichur', 18),
(1820, 'Trivandrum', 18),
(1821, 'Wayanad', 18),
(1901, 'Agatti Island', 19),
(1902, 'Bingaram Island', 19),
(1903, 'Bitra Island', 19),
(1904, 'Chetlat Island', 19),
(1905, 'Kadmat Island', 19),
(1906, 'Kalpeni Island', 19),
(1907, 'Kavaratti Island', 19),
(1908, 'Kiltan Island', 19),
(1909, 'Lakshadweep Sea', 19),
(1910, 'Minicoy Island', 19),
(1911, 'North Island', 19),
(1912, 'South Island', 19),
(2001, 'Anuppur', 20),
(2002, 'Ashoknagar', 20),
(2003, 'Balaghat', 20),
(2004, 'Barwani', 20),
(2005, 'Betul', 20),
(2006, 'Bhind', 20),
(2007, 'Bhopal', 20),
(2008, 'Burhanpur', 20),
(2009, 'Chhatarpur', 20),
(2010, 'Chhindwara', 20),
(2011, 'Damoh', 20),
(2012, 'Datia', 20),
(2013, 'Dewas', 20),
(2014, 'Dhar', 20),
(2015, 'Dindori', 20),
(2016, 'Guna', 20),
(2017, 'Gwalior', 20),
(2018, 'Harda', 20),
(2019, 'Hoshangabad', 20),
(2020, 'Indore', 20),
(2021, 'Jabalpur', 20),
(2022, 'Jagdalpur', 20),
(2023, 'Jhabua', 20),
(2024, 'Katni', 20),
(2025, 'Khandwa', 20),
(2026, 'Khargone', 20),
(2027, 'Mandla', 20),
(2028, 'Mandsaur', 20),
(2029, 'Morena', 20),
(2030, 'Narsinghpur', 20),
(2031, 'Neemuch', 20),
(2032, 'Panna', 20),
(2033, 'Raisen', 20),
(2034, 'Rajgarh', 20),
(2035, 'Ratlam', 20),
(2036, 'Rewa', 20),
(2037, 'Sagar', 20),
(2038, 'Satna', 20),
(2039, 'Sehore', 20),
(2040, 'Seoni', 20),
(2041, 'Shahdol', 20),
(2042, 'Shajapur', 20),
(2043, 'Sheopur', 20),
(2044, 'Shivpuri', 20),
(2045, 'Sidhi', 20),
(2046, 'Tikamgarh', 20),
(2047, 'Ujjain', 20),
(2048, 'Umaria', 20),
(2049, 'Vidisha', 20),
(2101, 'Ahmednagar', 21),
(2102, 'Akola', 21),
(2103, 'Amravati', 21),
(2104, 'Aurangabad', 21),
(2105, 'Beed', 21),
(2106, 'Bhandara', 21),
(2107, 'Buldhana', 21),
(2108, 'Chandrapur', 21),
(2109, 'Dhule', 21),
(2110, 'Gadchiroli', 21),
(2111, 'Gondia', 21),
(2112, 'Hingoli', 21),
(2113, 'Jalgaon', 21),
(2114, 'Jalna', 21),
(2115, 'Kolhapur', 21),
(2116, 'Latur', 21),
(2117, 'Mahabaleshwar', 21),
(2118, 'Mumbai', 21),
(2119, 'Mumbai City', 21),
(2120, 'Mumbai Suburban', 21),
(2121, 'Nagpur', 21),
(2122, 'Nanded', 21),
(2123, 'Nandurbar', 21),
(2124, 'Nashik', 21),
(2125, 'Osmanabad', 21),
(2126, 'Parbhani', 21),
(2127, 'Pune', 21),
(2128, 'Raigad', 21),
(2129, 'Ratnagiri', 21),
(2130, 'Sangli', 21),
(2131, 'Satara', 21),
(2132, 'Sholapur', 21),
(2133, 'Sindhudurg', 21),
(2134, 'Thane', 21),
(2135, 'Wardha', 21),
(2136, 'Washim', 21),
(2137, 'Yavatmal', 21),
(2201, 'Bishnupur', 22),
(2202, 'Chandel', 22),
(2203, 'Churachandpur', 22),
(2204, 'Imphal East', 22),
(2205, 'Imphal West', 22),
(2206, 'Senapati', 22),
(2207, 'Tamenglong', 22),
(2208, 'Thoubal', 22),
(2209, 'Ukhrul', 22),
(2301, 'East Garo Hills', 23),
(2302, 'East Khasi Hills', 23),
(2303, 'Jaintia Hills', 23),
(2304, 'Ri Bhoi', 23),
(2305, 'Shillong', 23),
(2306, 'South Garo Hills', 23),
(2307, 'West Garo Hills', 23),
(2308, 'West Khasi Hills', 23),
(2401, 'Aizawl', 24),
(2402, 'Champhai', 24),
(2403, 'Kolasib', 24),
(2404, 'Lawngtlai', 24),
(2405, 'Lunglei', 24),
(2406, 'Mamit', 24),
(2407, 'Saiha', 24),
(2408, 'Serchhip', 24),
(2501, 'Dimapur', 25),
(2502, 'Kohima', 25),
(2503, 'Mokokchung', 25),
(2504, 'Mon', 25),
(2505, 'Phek', 25),
(2506, 'Tuensang', 25),
(2507, 'Wokha', 25),
(2508, 'Zunheboto', 25),
(2601, 'Angul', 26),
(2602, 'Balangir', 26),
(2603, 'Balasore', 26),
(2604, 'Baleswar', 26),
(2605, 'Bargarh', 26),
(2606, 'Berhampur', 26),
(2607, 'Bhadrak', 26),
(2608, 'Bhubaneswar', 26),
(2609, 'Boudh', 26),
(2610, 'Cuttack', 26),
(2611, 'Deogarh', 26),
(2612, 'Dhenkanal', 26),
(2613, 'Gajapati', 26),
(2614, 'Ganjam', 26),
(2615, 'Jagatsinghapur', 26),
(2616, 'Jajpur', 26),
(2617, 'Jharsuguda', 26),
(2618, 'Kalahandi', 26),
(2619, 'Kandhamal', 26),
(2620, 'Kendrapara', 26),
(2621, 'Kendujhar', 26),
(2622, 'Khordha', 26),
(2623, 'Koraput', 26),
(2624, 'Malkangiri', 26),
(2625, 'Mayurbhanj', 26),
(2626, 'Nabarangapur', 26),
(2627, 'Nayagarh', 26),
(2628, 'Nuapada', 26),
(2629, 'Puri', 26),
(2630, 'Rayagada', 26),
(2631, 'Rourkela', 26),
(2632, 'Sambalpur', 26),
(2633, 'Subarnapur', 26),
(2634, 'Sundergarh', 26),
(2701, 'Bahur', 27),
(2702, 'Karaikal', 27),
(2703, 'Mahe', 27),
(2704, 'Pondicherry', 27),
(2705, 'Purnankuppam', 27),
(2706, 'Valudavur', 27),
(2707, 'Villianur', 27),
(2708, 'Yanam', 27),
(2801, 'Amritsar', 28),
(2802, 'Barnala', 28),
(2803, 'Bathinda', 28),
(2804, 'Faridkot', 28),
(2805, 'Fatehgarh Sahib', 28),
(2806, 'Ferozepur', 28),
(2807, 'Gurdaspur', 28),
(2808, 'Hoshiarpur', 28),
(2809, 'Jalandhar', 28),
(2810, 'Kapurthala', 28),
(2811, 'Ludhiana', 28),
(2812, 'Mansa', 28),
(2813, 'Moga', 28),
(2814, 'Muktsar', 28),
(2815, 'Nawanshahr', 28),
(2816, 'Pathankot', 28),
(2817, 'Patiala', 28),
(2818, 'Rupnagar', 28),
(2819, 'Sangrur', 28),
(2820, 'SAS Nagar', 28),
(2821, 'Tarn Taran', 28),
(2901, 'Ajmer', 29),
(2902, 'Alwar', 29),
(2903, 'Banswara', 29),
(2904, 'Baran', 29),
(2905, 'Barmer', 29),
(2906, 'Bharatpur', 29),
(2907, 'Bhilwara', 29),
(2908, 'Bikaner', 29),
(2909, 'Bundi', 29),
(2910, 'Chittorgarh', 29),
(2911, 'Churu', 29),
(2912, 'Dausa', 29),
(2913, 'Dholpur', 29),
(2914, 'Dungarpur', 29),
(2915, 'Hanumangarh', 29),
(2916, 'Jaipur', 29),
(2917, 'Jaisalmer', 29),
(2918, 'Jalore', 29),
(2919, 'Jhalawar', 29),
(2920, 'Jhunjhunu', 29),
(2921, 'Jodhpur', 29),
(2922, 'Karauli', 29),
(2923, 'Kota', 29),
(2924, 'Nagaur', 29),
(2925, 'Pali', 29),
(2926, 'Pilani', 29),
(2927, 'Rajsamand', 29),
(2928, 'Sawai Madhopur', 29),
(2929, 'Sikar', 29),
(2930, 'Sirohi', 29),
(2931, 'Sri Ganganagar', 29),
(2932, 'Tonk', 29),
(2933, 'Udaipur', 29),
(3001, 'Barmiak', 30),
(3002, 'Be', 30),
(3003, 'Bhurtuk', 30),
(3004, 'Chhubakha', 30),
(3005, 'Chidam', 30),
(3006, 'Chubha', 30),
(3007, 'Chumikteng', 30),
(3008, 'Dentam', 30),
(3009, 'Dikchu', 30),
(3010, 'Dzongri', 30),
(3011, 'Gangtok', 30),
(3012, 'Gauzing', 30),
(3013, 'Gyalshing', 30),
(3014, 'Hema', 30),
(3015, 'Kerung', 30),
(3016, 'Lachen', 30),
(3017, 'Lachung', 30),
(3018, 'Lema', 30),
(3019, 'Lingtam', 30),
(3020, 'Lungthu', 30),
(3021, 'Mangan', 30),
(3022, 'Namchi', 30),
(3023, 'Namthang', 30),
(3024, 'Nanga', 30),
(3025, 'Nantang', 30),
(3026, 'Naya Bazar', 30),
(3027, 'Padamachen', 30),
(3028, 'Pakhyong', 30),
(3029, 'Pemayangtse', 30),
(3030, 'Phensang', 30),
(3031, 'Rangli', 30),
(3032, 'Rinchingpong', 30),
(3033, 'Sakyong', 30),
(3034, 'Samdong', 30),
(3035, 'Singtam', 30),
(3036, 'Siniolchu', 30),
(3037, 'Sombari', 30),
(3038, 'Soreng', 30),
(3039, 'Sosing', 30),
(3040, 'Tekhug', 30),
(3041, 'Temi', 30),
(3042, 'Tsetang', 30),
(3043, 'Tsomgo', 30),
(3044, 'Tumlong', 30),
(3045, 'Yangang', 30),
(3046, 'Yumtang', 30),
(3101, 'Chennai', 31),
(3102, 'Chidambaram', 31),
(3103, 'Chingleput', 31),
(3104, 'Coimbatore', 31),
(3105, 'Courtallam', 31),
(3106, 'Cuddalore', 31),
(3107, 'Dharmapuri', 31),
(3108, 'Dindigul', 31),
(3109, 'Erode', 31),
(3110, 'Hosur', 31),
(3111, 'Kanchipuram', 31),
(3112, 'Kanyakumari', 31),
(3113, 'Karaikudi', 31),
(3114, 'Karur', 31),
(3115, 'Kodaikanal', 31),
(3116, 'Kovilpatti', 31),
(3117, 'Krishnagiri', 31),
(3118, 'Kumbakonam', 31),
(3119, 'Madurai', 31),
(3120, 'Mayiladuthurai', 31),
(3121, 'Nagapattinam', 31),
(3122, 'Nagarcoil', 31),
(3123, 'Namakkal', 31),
(3124, 'Neyveli', 31),
(3125, 'Nilgiris', 31),
(3126, 'Ooty', 31),
(3127, 'Palani', 31),
(3128, 'Perambalur', 31),
(3129, 'Pollachi', 31),
(3130, 'Pudukkottai', 31),
(3131, 'Rajapalayam', 31),
(3132, 'Ramanathapuram', 31),
(3133, 'Salem', 31),
(3134, 'Sivaganga', 31),
(3135, 'Sivakasi', 31),
(3136, 'Thanjavur', 31),
(3137, 'Theni', 31),
(3138, 'Thoothukudi', 31),
(3139, 'Tiruchirappalli', 31),
(3140, 'Tirunelveli', 31),
(3141, 'Tirupur', 31),
(3142, 'Tiruvallur', 31),
(3143, 'Tiruvannamalai', 31),
(3144, 'Tiruvarur', 31),
(3145, 'Trichy', 31),
(3146, 'Tuticorin', 31),
(3147, 'Vellore', 31),
(3148, 'Villupuram', 31),
(3149, 'Virudhunagar', 31),
(3150, 'Yercaud', 31),
(3201, 'Agartala', 32),
(3202, 'Ambasa', 32),
(3203, 'Bampurbari', 32),
(3204, 'Belonia', 32),
(3205, 'Dhalai', 32),
(3206, 'Dharam Nagar', 32),
(3207, 'Kailashahar', 32),
(3208, 'Kamal Krishnabari', 32),
(3209, 'Khopaiyapara', 32),
(3210, 'Khowai', 32),
(3211, 'Phuldungsei', 32),
(3212, 'Radha Kishore Pur', 32),
(3213, 'Tripura', 32);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int NOT NULL,
  `dept_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`) VALUES
(0, 'All'),
(1, 'IT'),
(4, 'Agriculture'),
(5, 'Electricity Board'),
(6, 'Water Supply dept');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `d_id` tinyint NOT NULL,
  `d_name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `st_id` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `doc_id` int NOT NULL,
  `doc_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`doc_id`, `doc_name`) VALUES
(1, 'Aadhar'),
(2, 'PAN');

-- --------------------------------------------------------

--
-- Table structure for table `e_tender_details`
--

CREATE TABLE `e_tender_details` (
  `et_id` int NOT NULL,
  `et_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `et_tender_fee` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `et_tender_ref_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `et_tender_desc` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `et_last_date_apply` date NOT NULL,
  `et_bidding_date` date NOT NULL,
  `et_file_uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `is_delete` tinyint NOT NULL,
  `dept_id` int NOT NULL,
  `is_approved` tinyint NOT NULL DEFAULT '0',
  `maximum_bid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `e_tender_details`
--

INSERT INTO `e_tender_details` (`et_id`, `et_title`, `et_tender_fee`, `et_tender_ref_no`, `et_tender_desc`, `et_last_date_apply`, `et_bidding_date`, `et_file_uri`, `is_delete`, `dept_id`, `is_approved`, `maximum_bid`) VALUES
(178, 'PipeLine upgrade', '1000', '2020/178/IT178', 'Replacement of existing 140mm PVC 4 KSC pipe with 160mm O-PVC pipe', '2020-07-21', '2020-07-24', 'uploads/sample.zip', 0, 1, 3, 500000),
(179, 'Insulators procurement', '4500', '2020/179/IT179', 'supply of 11 KV 45 KN Polymer composite disc insulators', '2020-07-22', '2020-07-23', 'uploads/sample.zip', 0, 1, 0, 500000),
(180, 'Radiology medical euipments', '7000', '2020/180/IT180', '	International Competitive Bidding For Supply And Installation Of Radiology Medical Equipment For Medical College Hospitals And Districts Headquarters Hospitals', '2020-07-25', '2020-07-26', 'uploads/sample.zip', 0, 1, 0, 500000);

-- --------------------------------------------------------

--
-- Table structure for table `e_tender_vendor`
--

CREATE TABLE `e_tender_vendor` (
  `etd_id` int NOT NULL,
  `et_id` int NOT NULL,
  `vd_id` int NOT NULL,
  `vcd_id` int NOT NULL,
  `bidding_amt` varbinary(255) NOT NULL,
  `is_approved` varbinary(255) NOT NULL,
  `date_of_approval` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varbinary(255) NOT NULL,
  `location` varbinary(255) DEFAULT NULL,
  `timestamp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time_period` varbinary(255) DEFAULT NULL,
  `reasons` varbinary(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `e_tender_vendor`
--

INSERT INTO `e_tender_vendor` (`etd_id`, `et_id`, `vd_id`, `vcd_id`, `bidding_amt`, `is_approved`, `date_of_approval`, `status`, `location`, `timestamp`, `time_period`, `reasons`) VALUES
(116, 178, 63, 22, 0x8f0707a064a075007b16074504304d13, 0x6b41838ec7c142cdf1502f5b610690df, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0xb0e71498a193a919c7ce2ef8c398b4f2, '2020-07-19T12:25:10.321Z', 0xb084d3bdcd57b2a6f29468be7e5f22c1, 0xc20ab9909d6b51777a826c807604b95d),
(117, 179, 63, 22, 0x8a163102ec04a6045e6b204c47b7840b, 0x0eb0c9aeb32706f65b92f89082b4c8ae, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0x4a54f0cdec50e0b9f1332f027c57e04854a636f41ea25f6aa9cfa0d8c38778e7, '2020-07-18T12:25:10.321Z\r\n', 0xb83b2b05a41080e2b3ee9f0d50e53f04, NULL),
(118, 180, 63, 22, 0xfbcf9ed0eb215d1971bf05fd8164b7f4, 0x0eb0c9aeb32706f65b92f89082b4c8ae, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0xb0e71498a193a919c7ce2ef8c398b4f2, '2020-07-17T12:25:10.321Z\r\n', 0xb084d3bdcd57b2a6f29468be7e5f22c1, NULL),
(119, 178, 1, 1, 0x1004cf173952dc08c914b93d80c01284, 0xed23f6e96d07dd2c7155cc3c870fd83e, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0xb0e71498a193a919c7ce2ef8c398b4f2, '2020-07-17T12:25:10.321Z\r\n', 0xe4fd12cedeb2492dd2a307c937ef390b, 0x350484b460925c47a644dd95cda6c240),
(120, 179, 1, 1, 0xa5dcfa2e4e51cae4a8b89f05881d049f, 0x0eb0c9aeb32706f65b92f89082b4c8ae, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0xb0e71498a193a919c7ce2ef8c398b4f2, '2020-07-20T12:25:10.321Z\r\n', 0xe4fd12cedeb2492dd2a307c937ef390b, NULL),
(121, 180, 1, 1, 0xa5dcfa2e4e51cae4a8b89f05881d049f, 0x0eb0c9aeb32706f65b92f89082b4c8ae, NULL, 0xe6a0060c1e0a440c5fc323aecc48436c, 0xb0e71498a193a919c7ce2ef8c398b4f2, '2020-07-17T12:25:10.321Z\r\n', 0xe4fd12cedeb2492dd2a307c937ef390b, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `email_address` varchar(50) NOT NULL,
  `feedback` text NOT NULL,
  `feedback_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `file_uri`
--

CREATE TABLE `file_uri` (
  `furi_id` int NOT NULL,
  `furi1` varbinary(255) DEFAULT NULL,
  `furi2` varbinary(255) DEFAULT NULL,
  `etd_id` int NOT NULL,
  `f_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `file_uri`
--

INSERT INTO `file_uri` (`furi_id`, `furi1`, `furi2`, `etd_id`, `f_type`) VALUES
(90, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 116, 'doc'),
(91, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 117, 'doc'),
(92, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 118, 'doc'),
(93, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 119, 'doc'),
(94, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 120, 'doc'),
(95, 0x316f881946fa5d45f37c10a63425588053191fa2e834eea042fd47cb33acd093858090d823fc6d625a8583106874fe6d87f8d17764c2b977648be9c626681015, 0x316f881946fa5d45f37c10a634255880ae64dd9a2750a8c1a22817bfb1af25221d61230837cafc237a84bfe0966019b34e081e476abbf03a50472179fc8a48fe, 121, 'doc');

-- --------------------------------------------------------

--
-- Table structure for table `legal_status_details`
--

CREATE TABLE `legal_status_details` (
  `l_id` tinyint NOT NULL,
  `l_name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

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
  `login_id` int NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `role_id` tinyint NOT NULL,
  `vcd_id` int DEFAULT NULL,
  `ad_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `log_in_details`
--

INSERT INTO `log_in_details` (`login_id`, `user_name`, `password`, `role_id`, `vcd_id`, `ad_id`) VALUES
(1, 'winu', '1a1bce4ed8b0a23582531e3e746cef6a0483f99d517091e5f8b8cea3488e5d77c7e098023b85625a4ea6abe90b2cc5f2559ebd6bddc7203ebda0930f6719e978', 2, 1, NULL),
(10, 'admin', '1d255920ada6ac787656b393e9e0b5845aa1d975f1db4015f80904da4c232786444e6dc87e719981bd4d8596b4d0f937d6e464cbd7424a3a0aff6059fa0caee1', 1, NULL, 1),
(16, 'viraj456', 'e13efc991a9bf44bbb4da87cdbb725240184585ccaf270523170e008cf2a3b85f45f86c3da647f69780fb9e971caf5437b3d06d418355a68c9760c70a31d05c7', 2, 22, NULL),
(28, 'water_admin', 'c22e8b9af4e85e9cc2443eb3d369e5d89bcf153a566810f101f5644f6cfcb7173b26924ef4c6dacbf37f56382c223c95af4cb62dc840085794c5382226ee07a6', 1, NULL, 2),
(29, 'agro123', '84348aeb0ed5c663e8237b6b1b11c83d52ff16a3920c9514473474c9b60a0b6d88d10ab125da43d0d0bdc78fd6f0db446cddfc13734e0e7f928143185784da1d', 1, NULL, 3),
(30, 'elec123', '359075b4bd66ffb751f7b5c3a8d8e9615418ce79f173bb49227615385635c57c9491024f1caf5c21022ecf0d97738448bfbf1de11f0711a4e23cfb661dfff44f', 1, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `org_details`
--

CREATE TABLE `org_details` (
  `org_id` int NOT NULL,
  `org_name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_contact` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_email` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_addr` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_state` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_dist` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `org_pin` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `org_details`
--

INSERT INTO `org_details` (`org_id`, `org_name`, `org_contact`, `org_email`, `org_addr`, `org_state`, `org_dist`, `org_pin`) VALUES
(1, 'Goverment Of India', '7894561230', 'tiot@gmail.com', 'delhi', 'delhi', 'a', '456123'),
(2, 'Don Bosco Inst of Tech', '9876543210', 'dbit@gmail.com', 'Kurla', 'Maharashtra', 'Mumba', '400070');

-- --------------------------------------------------------

--
-- Table structure for table `payment_transactions`
--

CREATE TABLE `payment_transactions` (
  `etd_id` int NOT NULL,
  `txn_id` varchar(50) NOT NULL,
  `order_id` varchar(20) NOT NULL,
  `txn_amount` varchar(10) NOT NULL,
  `resp_message` varchar(15) NOT NULL,
  `resp_code` varchar(10) NOT NULL,
  `refund_amount` varchar(10) NOT NULL,
  `txn_timestamp` varchar(30) NOT NULL,
  `bank_txn_id` varchar(50) NOT NULL,
  `gateway_name` varchar(15) NOT NULL,
  `bank_name` varchar(30) NOT NULL,
  `payment_mode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_transactions`
--

INSERT INTO `payment_transactions` (`etd_id`, `txn_id`, `order_id`, `txn_amount`, `resp_message`, `resp_code`, `refund_amount`, `txn_timestamp`, `bank_txn_id`, `gateway_name`, `bank_name`, `payment_mode`) VALUES
(116, '20200717111212800110168243601725628', 'ORD272677257', '1000', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC'),
(119, '20200717111212800110168243601725628', 'ORD272677257', '1000', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC'),
(117, '20200717111212800110168243601725628', 'ORD272677257', '4500', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC'),
(120, '20200717111212800110168243601725628', 'ORD272677257', '4500', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC'),
(118, '20200717111212800110168243601725628', 'ORD272677257', '7000', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC'),
(121, '20200717111212800110168243601725628', 'ORD272677257', '7000', 'TXN_SUCCESS', '01', '0', '2020-07-17 17:02:33.0', '777001676985216', 'HDFC', 'Bank of Bahrain and Kuwait', 'DC');

-- --------------------------------------------------------

--
-- Table structure for table `role_details`
--

CREATE TABLE `role_details` (
  `role_id` tinyint NOT NULL,
  `role_name` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `role_details`
--

INSERT INTO `role_details` (`role_id`, `role_name`) VALUES
(0, 'Super Admin'),
(1, 'Dept. Admin'),
(2, 'Vendor');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('16e3edb4-cba3-47b1-bb59-ad463f41a129', 1595599476, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2020-07-24T14:02:48.394Z\",\"httpOnly\":true,\"path\":\"/\"},\"vd_id\":63,\"vcd_id\":22,\"digi_access\":1}'),
('37ad950d-9477-493e-9993-7a90ef3c035d', 1595603894, '{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2020-07-24T15:18:08.229Z\",\"httpOnly\":true,\"path\":\"/\"},\"ad_id\":1,\"ad_org_id\":1,\"ad_dept_id\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `st_id` tinyint NOT NULL,
  `st_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`st_id`, `st_name`) VALUES
(1, 'Andaman and Nicobar [AN]'),
(2, 'Andhra Pradesh [AP]'),
(3, 'Arunachal Pradesh [AR]'),
(4, 'Assam [AS]'),
(5, 'Bihar [BH]'),
(6, 'Chandigarh [CH]'),
(7, 'Chhattisgarh [CG]'),
(8, 'Dadra and Nagar Haveli [DN]'),
(9, 'Daman and Diu [DD]'),
(10, 'Delhi [DL]'),
(11, 'Goa [GO]'),
(12, 'Gujarat [GU]'),
(13, 'Haryana [HR]'),
(14, 'Himachal Pradesh [HP]'),
(15, 'Jammu and Kashmir [JK]'),
(16, 'Jharkhand [JH]'),
(17, 'Karnataka [KR]'),
(18, 'Kerala [KL]'),
(19, 'Lakshadweep [LD]'),
(20, 'Madhya Pradesh [MP]'),
(21, 'Maharashtra [MH]'),
(22, 'Manipur [MN]'),
(23, 'Meghalaya [ML]'),
(24, 'Mizoram [MM]'),
(25, 'Nagaland [NL]'),
(26, 'Orissa OR'),
(27, 'Pondicherry [PC]'),
(28, 'Punjab [PJ]'),
(29, 'Rajasthan [RJ]'),
(30, 'Sikkim [SK]'),
(31, 'Tamil Nadu [TN]'),
(32, 'Tripura [TR]'),
(33, 'Uttaranchal [UP]'),
(34, 'Uttar Pradesh [UT]'),
(35, 'West Bengal [WB]');

-- --------------------------------------------------------

--
-- Table structure for table `tendor_req`
--

CREATE TABLE `tendor_req` (
  `tei_id` int NOT NULL,
  `trd_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `vendor_details`
--

CREATE TABLE `vendor_details` (
  `vd_id` int NOT NULL,
  `v_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_address` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_yoe` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_mobile` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_reg_no` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_state_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_dist_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_city_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_pincode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_legal_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_pan` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_is_verified` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `v_gst` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `schemes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `staff` int DEFAULT NULL,
  `equipment` int DEFAULT NULL,
  `india_equipment` int DEFAULT NULL,
  `rating` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `vendor_details`
--

INSERT INTO `vendor_details` (`vd_id`, `v_name`, `v_address`, `v_yoe`, `v_email`, `v_mobile`, `v_reg_no`, `v_state_id`, `v_dist_id`, `v_city_id`, `v_pincode`, `v_legal_id`, `v_pan`, `v_is_verified`, `v_gst`, `schemes`, `staff`, `equipment`, `india_equipment`, `rating`) VALUES
(1, 'sequeria industry', 'andheri east', '1772', 'ws@gmail.com', '7894561230', 'D123N67', 'Himachal Pradesh [HP]', '4', 'Bilaspur', '400706', 'Limited Company', 'Rf234Rt', '0', '789456', NULL, NULL, NULL, NULL, NULL),
(63, 'fghjk', 'dfghjk', '2020', 'v@gmail.com', '7894561230', 'bhunji', 'Chandigarh [CH]', '-1', 'Chandigarh', '456789', 'Jointventure', '6894561230', '0', '789456123012352', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendor_file`
--

CREATE TABLE `vendor_file` (
  `vd_id` int NOT NULL,
  `file_uri` varbinary(255) NOT NULL,
  `file_type` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `v_contact_details`
--

CREATE TABLE `v_contact_details` (
  `vcd_id` int NOT NULL,
  `vcd_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vcd_title` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vcd_dob` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vcd_aadhar` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vcd_contact` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vcd_email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vcd_designation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vd_id` int NOT NULL,
  `digi_access` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `v_contact_details`
--

INSERT INTO `v_contact_details` (`vcd_id`, `vcd_name`, `vcd_title`, `vcd_dob`, `vcd_aadhar`, `vcd_contact`, `vcd_email`, `vcd_designation`, `vd_id`, `digi_access`) VALUES
(1, 'Winston', 'Mr.', '2020-06-09', '456745674567', '8975647845', 'winstonsequeria@gmail.com', 'CEO', 1, 0),
(22, 'asdfghj', 'Mr', '2020-05-25', '123412341234', '8976853951', 'v@gmail.com', 'ceo', 63, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_detail`
--
ALTER TABLE `admin_detail`
  ADD PRIMARY KEY (`ad_id`),
  ADD KEY `ad_dept_id` (`ad_dept_id`),
  ADD KEY `ad_org_id` (`ad_org_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD KEY `st_id` (`st_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`d_id`),
  ADD KEY `st_id` (`st_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`doc_id`);

--
-- Indexes for table `e_tender_details`
--
ALTER TABLE `e_tender_details`
  ADD PRIMARY KEY (`et_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `e_tender_vendor`
--
ALTER TABLE `e_tender_vendor`
  ADD PRIMARY KEY (`etd_id`),
  ADD KEY `et_id` (`et_id`),
  ADD KEY `vd_id` (`vd_id`),
  ADD KEY `vcd_id` (`vcd_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `file_uri`
--
ALTER TABLE `file_uri`
  ADD PRIMARY KEY (`furi_id`),
  ADD UNIQUE KEY `etd_id` (`etd_id`);

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
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `user_name_2` (`user_name`),
  ADD KEY `v_id` (`vcd_id`),
  ADD KEY `ad_id` (`ad_id`);

--
-- Indexes for table `org_details`
--
ALTER TABLE `org_details`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD KEY `etd_id` (`etd_id`);

--
-- Indexes for table `role_details`
--
ALTER TABLE `role_details`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `tendor_req`
--
ALTER TABLE `tendor_req`
  ADD KEY `tei_id` (`tei_id`),
  ADD KEY `trd_id` (`trd_id`);

--
-- Indexes for table `vendor_details`
--
ALTER TABLE `vendor_details`
  ADD PRIMARY KEY (`vd_id`),
  ADD UNIQUE KEY `v_reg_no` (`v_reg_no`),
  ADD UNIQUE KEY `v_pan` (`v_pan`),
  ADD UNIQUE KEY `v_gst` (`v_gst`);

--
-- Indexes for table `vendor_file`
--
ALTER TABLE `vendor_file`
  ADD KEY `vendor_file_ibfk_1` (`vd_id`);

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
-- AUTO_INCREMENT for table `admin_detail`
--
ALTER TABLE `admin_detail`
  MODIFY `ad_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `d_id` tinyint NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `e_tender_details`
--
ALTER TABLE `e_tender_details`
  MODIFY `et_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;
--
-- AUTO_INCREMENT for table `e_tender_vendor`
--
ALTER TABLE `e_tender_vendor`
  MODIFY `etd_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `file_uri`
--
ALTER TABLE `file_uri`
  MODIFY `furi_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
--
-- AUTO_INCREMENT for table `log_in_details`
--
ALTER TABLE `log_in_details`
  MODIFY `login_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `st_id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `vendor_details`
--
ALTER TABLE `vendor_details`
  MODIFY `vd_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
--
-- AUTO_INCREMENT for table `v_contact_details`
--
ALTER TABLE `v_contact_details`
  MODIFY `vcd_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_detail`
--
ALTER TABLE `admin_detail`
  ADD CONSTRAINT `admin_detail_ibfk_1` FOREIGN KEY (`ad_dept_id`) REFERENCES `department` (`dept_id`),
  ADD CONSTRAINT `admin_detail_ibfk_2` FOREIGN KEY (`ad_org_id`) REFERENCES `org_details` (`org_id`);

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `states` (`st_id`);

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `states` (`st_id`);

--
-- Constraints for table `e_tender_details`
--
ALTER TABLE `e_tender_details`
  ADD CONSTRAINT `e_tender_details_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`);

--
-- Constraints for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD CONSTRAINT `payment_transactions_ibfk_1` FOREIGN KEY (`etd_id`) REFERENCES `e_tender_vendor` (`etd_id`);

--
-- Constraints for table `v_contact_details`
--
ALTER TABLE `v_contact_details`
  ADD CONSTRAINT `v_contact_details_ibfk_1` FOREIGN KEY (`vd_id`) REFERENCES `vendor_details` (`vd_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
