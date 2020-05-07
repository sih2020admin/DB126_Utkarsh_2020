-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: e_tender
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_token`
--

DROP TABLE IF EXISTS `access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_token` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `access` varchar(45) NOT NULL,
  `refresh` varchar(45) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_token`
--

LOCK TABLES `access_token` WRITE;
/*!40000 ALTER TABLE `access_token` DISABLE KEYS */;
INSERT INTO `access_token` VALUES (1,'Sanket','c2728c1b0b0291e3a686f9ad1a77885605d1d286','4bb6d560adcc6df86d4a255fc151d9f3ed7d08a1','4/5/2020','11:49:55'),(7,'Sanket','ce500d34312bb4faa53cbafd5df11b37801d840b','49094755806e529f107547a7de8138276b985574','16/4/2020','19:30:59'),(19,'Sanket','601666782a7aeaf93919b7ebb45da7e0ac3625af','38348971960c5f9deac59774ea205447bbf16169','7/5/2020','11:45:42'),(22,'Sanket','0c2330c67805242f28475ad69d72d7bf15dbd329','72f89adee796ba151dfa00e3bdfc176aa8023452','7/5/2020','11:12:51'),(23,'Sanket','5ec253fe1df813273b395b695d7a87b6b2b5722b','35db9c073c5960e45211b1915a2444f0b7436d86','7/5/2020','12:8:6');
/*!40000 ALTER TABLE `access_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_detail`
--

DROP TABLE IF EXISTS `admin_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_detail` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `ad_name` varchar(30) NOT NULL,
  `ad_contact` varchar(10) NOT NULL,
  `ad_email` varchar(25) NOT NULL,
  `ad_dept_id` int(11) NOT NULL,
  `ad_addr` varchar(30) NOT NULL,
  `ad_org_id` int(11) NOT NULL,
  PRIMARY KEY (`ad_id`),
  KEY `ad_dept_id` (`ad_dept_id`),
  KEY `ad_org_id` (`ad_org_id`),
  CONSTRAINT `admin_detail_ibfk_1` FOREIGN KEY (`ad_dept_id`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `admin_detail_ibfk_2` FOREIGN KEY (`ad_org_id`) REFERENCES `org_details` (`org_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_detail`
--

LOCK TABLES `admin_detail` WRITE;
/*!40000 ALTER TABLE `admin_detail` DISABLE KEYS */;
INSERT INTO `admin_detail` VALUES (1,'admin','7894561230','admintest@gmail.com',1,'kurla',1),(2,'sankey_admin','9876543210','meetsankey@gmail.com',1,'bhandup',2),(3,'afif','9876543210','meetafif@gmail.com',2,'bhandup',2);
/*!40000 ALTER TABLE `admin_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `c_id` int(11) NOT NULL,
  `c_name` varchar(30) NOT NULL,
  `st_id` tinyint(4) NOT NULL,
  KEY `st_id` (`st_id`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `states` (`st_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (101,'Alipur',1),(102,'Andaman Island',1),(103,'Anderson Island',1),(104,'Arainj-Laka-Punga',1),(105,'Austinabad',1),(106,'Bamboo Flat',1),(107,'Barren Island',1),(108,'Beadonabad',1),(109,'Betapur',1),(110,'Bindraban',1),(111,'Bonington',1),(112,'Brookesabad',1),(113,'Cadell Point',1),(114,'Calicut',1),(115,'Chetamale',1),(116,'Cinque Islands',1),(117,'Defence Island',1),(118,'Digilpur',1),(119,'Dolyganj',1),(120,'Flat Island',1),(121,'Geinyale',1),(122,'Great Coco Island',1),(123,'Haddo',1),(124,'Havelock Island',1),(125,'Henry Lawrence Island',1),(126,'Herbertabad',1),(127,'Hobdaypur',1),(128,'Ilichar',1),(129,'Ingoie',1),(130,'Inteview Island',1),(131,'Jangli Ghat',1),(132,'Jhon Lawrence Island',1),(133,'Karen',1),(134,'Kartara',1),(135,'KYD Islannd',1),(136,'Landfall Island',1),(137,'Little Andmand',1),(138,'Little Coco Island',1),(139,'Long Island',1),(140,'Maimyo',1),(141,'Malappuram',1),(142,'Manglutan',1),(143,'Manpur',1),(144,'Mitha Khari',1),(145,'Neill Island',1),(146,'Nicobar Island',1),(147,'North Brother Island',1),(148,'North Passage Island',1),(149,'North Sentinel Island',1),(150,'Nothen Reef Island',1),(151,'Outram Island',1),(152,'Pahlagaon',1),(153,'Palalankwe',1),(154,'Passage Island',1),(155,'Phaiapong',1),(156,'Phoenix Island',1),(157,'Port Blair',1),(158,'Preparis Island',1),(159,'Protheroepur',1),(160,'Rangachang',1),(161,'Rongat',1),(162,'Rutland Island',1),(163,'Sabari',1),(164,'Saddle Peak',1),(165,'Shadipur',1),(166,'Smith Island',1),(167,'Sound Island',1),(168,'South Sentinel Island',1),(169,'Spike Island',1),(170,'Tarmugli Island',1),(171,'Taylerabad',1),(172,'Titaije',1),(173,'Toibalawe',1),(174,'Tusonabad',1),(175,'West Island',1),(176,'Wimberleyganj',1),(177,'Yadita',1),(201,'Adilabad',2),(202,'Anantapur',2),(203,'Chittoor',2),(204,'Cuddapah',2),(205,'East Godavari',2),(206,'Guntur',2),(207,'Hyderabad',2),(208,'Karimnagar',2),(209,'Khammam',2),(210,'Krishna',2),(211,'Kurnool',2),(212,'Mahabubnagar',2),(213,'Medak',2),(214,'Nalgonda',2),(215,'Nellore',2),(216,'Nizamabad',2),(217,'Prakasam',2),(218,'Rangareddy',2),(219,'Srikakulam',2),(220,'Visakhapatnam',2),(221,'Vizianagaram',2),(222,'Warangal',2),(223,'West Godavari',2),(301,'Anjaw',3),(302,'Changlang',3),(303,'Dibang Valley',3),(304,'East Kameng',3),(305,'East Siang',3),(306,'Itanagar',3),(307,'Kurung Kumey',3),(308,'Lohit',3),(309,'Lower Dibang Valley',3),(310,'Lower Subansiri',3),(311,'Papum Pare',3),(312,'Tawang',3),(313,'Tirap',3),(314,'Upper Siang',3),(315,'Upper Subansiri',3),(316,'West Kameng',3),(317,'West Siang',3),(401,'Barpeta',4),(402,'Bongaigaon',4),(403,'Cachar',4),(404,'Darrang',4),(405,'Dhemaji',4),(406,'Dhubri',4),(407,'Dibrugarh',4),(408,'Goalpara',4),(409,'Golaghat',4),(410,'Guwahati',4),(411,'Hailakandi',4),(412,'Jorhat',4),(413,'Kamrup',4),(414,'Karbi Anglong',4),(415,'Karimganj',4),(416,'Kokrajhar',4),(417,'Lakhimpur',4),(418,'Marigaon',4),(419,'Nagaon',4),(420,'Nalbari',4),(421,'North Cachar Hills',4),(422,'Silchar',4),(423,'Sivasagar',4),(424,'Sonitpur',4),(425,'Tinsukia',4),(426,'Udalguri',4),(501,'Araria',5),(502,'Aurangabad',5),(503,'Banka',5),(504,'Begusarai',5),(505,'Bhagalpur',5),(506,'Bhojpur',5),(507,'Buxar',5),(508,'Darbhanga',5),(509,'East Champaran',5),(510,'Gaya',5),(511,'Gopalganj',5),(512,'Jamshedpur',5),(513,'Jamui',5),(514,'Jehanabad',5),(515,'Kaimur (Bhabua)',5),(516,'Katihar',5),(517,'Khagaria',5),(518,'Kishanganj',5),(519,'Lakhisarai',5),(520,'Madhepura',5),(521,'Madhubani',5),(522,'Munger',5),(523,'Muzaffarpur',5),(524,'Nalanda',5),(525,'Nawada',5),(526,'Patna',5),(527,'Purnia',5),(528,'Rohtas',5),(529,'Saharsa',5),(530,'Samastipur',5),(531,'Saran',5),(532,'Sheikhpura',5),(533,'Sheohar',5),(534,'Sitamarhi',5),(535,'Siwan',5),(536,'Supaul',5),(537,'Vaishali',5),(538,'West Champaran',5),(601,'Chandigarh',6),(602,'Mani Marja',6),(701,'Bastar',7),(702,'Bhilai',7),(703,'Bijapur',7),(704,'Bilaspur',7),(705,'Dhamtari',7),(706,'Durg',7),(707,'Janjgir-Champa',7),(708,'Jashpur',7),(709,'Kabirdham-Kawardha',7),(710,'Korba',7),(711,'Korea',7),(712,'Mahasamund',7),(713,'Narayanpur',7),(714,'Norh Bastar-Kanker',7),(715,'Raigarh',7),(716,'Raipur',7),(717,'Rajnandgaon',7),(718,'South Bastar-Dantewada',7),(719,'Surguja',7),(801,'Amal',8),(802,'Amli',8),(803,'Bedpa',8),(804,'Chikhli',8),(805,'Dadra & Nagar Haveli',8),(806,'Dahikhed',8),(807,'Dolara',8),(808,'Galonda',8),(809,'Kanadi',8),(810,'Karchond',8),(811,'Khadoli',8),(812,'Kharadpada',8),(813,'Kherabari',8),(814,'Kherdi',8),(815,'Kothar',8),(816,'Luari',8),(817,'Mashat',8),(818,'Rakholi',8),(819,'Rudana',8),(820,'Saili',8),(821,'Sili',8),(822,'Silvassa',8),(823,'Sindavni',8),(824,'Udva',8),(825,'Umbarkoi',8),(826,'Vansda',8),(827,'Vasona',8),(828,'Velugam',8),(901,'Brancavare',9),(902,'Dagasi',9),(903,'Daman',9),(904,'Diu',9),(905,'Magarvara',9),(906,'Nagwa',9),(907,'Pariali',9),(908,'Passo Covo',9),(1001,'Central Delhi',10),(1002,'East Delhi',10),(1003,'New Delhi',10),(1004,'North Delhi',10),(1005,'North East Delhi',10),(1006,'North West Delhi',10),(1007,'Old Delhi',10),(1008,'South Delhi',10),(1009,'South West Delhi',10),(1010,'West Delhi',10),(1101,'Canacona',11),(1102,'Candolim',11),(1103,'Chinchinim',11),(1104,'Cortalim',11),(1105,'Goa',11),(1106,'Jua',11),(1107,'Madgaon',11),(1108,'Mahem',11),(1109,'Mapuca',11),(1110,'Marmagao',11),(1111,'Panji',11),(1112,'Ponda',11),(1113,'Sanvordem',11),(1114,'Terekhol',11),(1201,'Ahmedabad',12),(1202,'Amreli',12),(1203,'Anand',12),(1204,'Banaskantha',12),(1205,'Baroda',12),(1206,'Bharuch',12),(1207,'Bhavnagar',12),(1208,'Dahod',12),(1209,'Dang',12),(1210,'Dwarka',12),(1211,'Gandhinagar',12),(1212,'Jamnagar',12),(1213,'Junagadh',12),(1214,'Kheda',12),(1215,'Kutch',12),(1216,'Mehsana',12),(1217,'Nadiad',12),(1218,'Narmada',12),(1219,'Navsari',12),(1220,'Panchmahals',12),(1221,'Patan',12),(1222,'Porbandar',12),(1223,'Rajkot',12),(1224,'Sabarkantha',12),(1225,'Surat',12),(1226,'Surendranagar',12),(1227,'Vadodara',12),(1228,'Valsad',12),(1229,'Vapi',12),(1301,'Ambala',13),(1302,'Bhiwani',13),(1303,'Faridabad',13),(1304,'Fatehabad',13),(1305,'Gurgaon',13),(1306,'Hisar',13),(1307,'Jhajjar',13),(1308,'Jind',13),(1309,'Kaithal',13),(1310,'Karnal',13),(1311,'Kurukshetra',13),(1312,'Mahendragarh',13),(1313,'Mewat',13),(1314,'Panchkula',13),(1315,'Panipat',13),(1316,'Rewari',13),(1317,'Rohtak',13),(1318,'Sirsa',13),(1319,'Sonipat',13),(1320,'Yamunanagar',13),(1401,'Bilaspur',14),(1402,'Chamba',14),(1403,'Dalhousie',14),(1404,'Hamirpur',14),(1405,'Kangra',14),(1406,'Kinnaur',14),(1407,'Kullu',14),(1408,'Lahaul & Spiti',14),(1409,'Mandi',14),(1410,'Shimla',14),(1411,'Sirmaur',14),(1412,'Solan',14),(1413,'Una',14),(1501,'Anantnag',15),(1502,'Baramulla',15),(1503,'Budgam',15),(1504,'Doda',15),(1505,'Jammu',15),(1506,'Kargil',15),(1507,'Kathua',15),(1508,'Kupwara',15),(1509,'Leh',15),(1510,'Poonch',15),(1511,'Pulwama',15),(1512,'Rajauri',15),(1513,'Srinagar',15),(1514,'Udhampur',15),(1601,'Bokaro',16),(1602,'Chatra',16),(1603,'Deoghar',16),(1604,'Dhanbad',16),(1605,'Dumka',16),(1606,'East Singhbhum',16),(1607,'Garhwa',16),(1608,'Giridih',16),(1609,'Godda',16),(1610,'Gumla',16),(1611,'Hazaribag',16),(1612,'Jamtara',16),(1613,'Koderma',16),(1614,'Latehar',16),(1615,'Lohardaga',16),(1616,'Pakur',16),(1617,'Palamu',16),(1618,'Ranchi',16),(1619,'Sahibganj',16),(1620,'Seraikela',16),(1621,'Simdega',16),(1622,'West Singhbhum',16),(1701,'Bagalkot',17),(1702,'Bangalore',17),(1703,'Bangalore Rural',17),(1704,'Belgaum',17),(1705,'Bellary',17),(1706,'Bhatkal',17),(1707,'Bidar',17),(1708,'Bijapur',17),(1709,'Chamrajnagar',17),(1710,'Chickmagalur',17),(1711,'Chikballapur',17),(1712,'Chitradurga',17),(1713,'Dakshina Kannada',17),(1714,'Davanagere',17),(1715,'Dharwad',17),(1716,'Gadag',17),(1717,'Gulbarga',17),(1718,'Hampi',17),(1719,'Hassan',17),(1720,'Haveri',17),(1721,'Hospet',17),(1722,'Karwar',17),(1723,'Kodagu',17),(1724,'Kolar',17),(1725,'Koppal',17),(1726,'Madikeri',17),(1727,'Mandya',17),(1728,'Mangalore',17),(1729,'Manipal',17),(1730,'Mysore',17),(1731,'Raichur',17),(1732,'Shimoga',17),(1733,'Sirsi',17),(1734,'Sringeri',17),(1735,'Srirangapatna',17),(1736,'Tumkur',17),(1737,'Udupi',17),(1738,'Uttara Kannada',17),(1801,'Alappuzha',18),(1802,'Alleppey',18),(1803,'Alwaye',18),(1804,'Ernakulam',18),(1805,'Idukki',18),(1806,'Kannur',18),(1807,'Kasargod',18),(1808,'Kochi',18),(1809,'Kollam',18),(1810,'Kottayam',18),(1811,'Kovalam',18),(1812,'Kozhikode',18),(1813,'Malappuram',18),(1814,'Palakkad',18),(1815,'Pathanamthitta',18),(1816,'Perumbavoor',18),(1817,'Thiruvananthapuram',18),(1818,'Thrissur',18),(1819,'Trichur',18),(1820,'Trivandrum',18),(1821,'Wayanad',18),(1901,'Agatti Island',19),(1902,'Bingaram Island',19),(1903,'Bitra Island',19),(1904,'Chetlat Island',19),(1905,'Kadmat Island',19),(1906,'Kalpeni Island',19),(1907,'Kavaratti Island',19),(1908,'Kiltan Island',19),(1909,'Lakshadweep Sea',19),(1910,'Minicoy Island',19),(1911,'North Island',19),(1912,'South Island',19),(2001,'Anuppur',20),(2002,'Ashoknagar',20),(2003,'Balaghat',20),(2004,'Barwani',20),(2005,'Betul',20),(2006,'Bhind',20),(2007,'Bhopal',20),(2008,'Burhanpur',20),(2009,'Chhatarpur',20),(2010,'Chhindwara',20),(2011,'Damoh',20),(2012,'Datia',20),(2013,'Dewas',20),(2014,'Dhar',20),(2015,'Dindori',20),(2016,'Guna',20),(2017,'Gwalior',20),(2018,'Harda',20),(2019,'Hoshangabad',20),(2020,'Indore',20),(2021,'Jabalpur',20),(2022,'Jagdalpur',20),(2023,'Jhabua',20),(2024,'Katni',20),(2025,'Khandwa',20),(2026,'Khargone',20),(2027,'Mandla',20),(2028,'Mandsaur',20),(2029,'Morena',20),(2030,'Narsinghpur',20),(2031,'Neemuch',20),(2032,'Panna',20),(2033,'Raisen',20),(2034,'Rajgarh',20),(2035,'Ratlam',20),(2036,'Rewa',20),(2037,'Sagar',20),(2038,'Satna',20),(2039,'Sehore',20),(2040,'Seoni',20),(2041,'Shahdol',20),(2042,'Shajapur',20),(2043,'Sheopur',20),(2044,'Shivpuri',20),(2045,'Sidhi',20),(2046,'Tikamgarh',20),(2047,'Ujjain',20),(2048,'Umaria',20),(2049,'Vidisha',20),(2101,'Ahmednagar',21),(2102,'Akola',21),(2103,'Amravati',21),(2104,'Aurangabad',21),(2105,'Beed',21),(2106,'Bhandara',21),(2107,'Buldhana',21),(2108,'Chandrapur',21),(2109,'Dhule',21),(2110,'Gadchiroli',21),(2111,'Gondia',21),(2112,'Hingoli',21),(2113,'Jalgaon',21),(2114,'Jalna',21),(2115,'Kolhapur',21),(2116,'Latur',21),(2117,'Mahabaleshwar',21),(2118,'Mumbai',21),(2119,'Mumbai City',21),(2120,'Mumbai Suburban',21),(2121,'Nagpur',21),(2122,'Nanded',21),(2123,'Nandurbar',21),(2124,'Nashik',21),(2125,'Osmanabad',21),(2126,'Parbhani',21),(2127,'Pune',21),(2128,'Raigad',21),(2129,'Ratnagiri',21),(2130,'Sangli',21),(2131,'Satara',21),(2132,'Sholapur',21),(2133,'Sindhudurg',21),(2134,'Thane',21),(2135,'Wardha',21),(2136,'Washim',21),(2137,'Yavatmal',21),(2201,'Bishnupur',22),(2202,'Chandel',22),(2203,'Churachandpur',22),(2204,'Imphal East',22),(2205,'Imphal West',22),(2206,'Senapati',22),(2207,'Tamenglong',22),(2208,'Thoubal',22),(2209,'Ukhrul',22),(2301,'East Garo Hills',23),(2302,'East Khasi Hills',23),(2303,'Jaintia Hills',23),(2304,'Ri Bhoi',23),(2305,'Shillong',23),(2306,'South Garo Hills',23),(2307,'West Garo Hills',23),(2308,'West Khasi Hills',23),(2401,'Aizawl',24),(2402,'Champhai',24),(2403,'Kolasib',24),(2404,'Lawngtlai',24),(2405,'Lunglei',24),(2406,'Mamit',24),(2407,'Saiha',24),(2408,'Serchhip',24),(2501,'Dimapur',25),(2502,'Kohima',25),(2503,'Mokokchung',25),(2504,'Mon',25),(2505,'Phek',25),(2506,'Tuensang',25),(2507,'Wokha',25),(2508,'Zunheboto',25),(2601,'Angul',26),(2602,'Balangir',26),(2603,'Balasore',26),(2604,'Baleswar',26),(2605,'Bargarh',26),(2606,'Berhampur',26),(2607,'Bhadrak',26),(2608,'Bhubaneswar',26),(2609,'Boudh',26),(2610,'Cuttack',26),(2611,'Deogarh',26),(2612,'Dhenkanal',26),(2613,'Gajapati',26),(2614,'Ganjam',26),(2615,'Jagatsinghapur',26),(2616,'Jajpur',26),(2617,'Jharsuguda',26),(2618,'Kalahandi',26),(2619,'Kandhamal',26),(2620,'Kendrapara',26),(2621,'Kendujhar',26),(2622,'Khordha',26),(2623,'Koraput',26),(2624,'Malkangiri',26),(2625,'Mayurbhanj',26),(2626,'Nabarangapur',26),(2627,'Nayagarh',26),(2628,'Nuapada',26),(2629,'Puri',26),(2630,'Rayagada',26),(2631,'Rourkela',26),(2632,'Sambalpur',26),(2633,'Subarnapur',26),(2634,'Sundergarh',26),(2701,'Bahur',27),(2702,'Karaikal',27),(2703,'Mahe',27),(2704,'Pondicherry',27),(2705,'Purnankuppam',27),(2706,'Valudavur',27),(2707,'Villianur',27),(2708,'Yanam',27),(2801,'Amritsar',28),(2802,'Barnala',28),(2803,'Bathinda',28),(2804,'Faridkot',28),(2805,'Fatehgarh Sahib',28),(2806,'Ferozepur',28),(2807,'Gurdaspur',28),(2808,'Hoshiarpur',28),(2809,'Jalandhar',28),(2810,'Kapurthala',28),(2811,'Ludhiana',28),(2812,'Mansa',28),(2813,'Moga',28),(2814,'Muktsar',28),(2815,'Nawanshahr',28),(2816,'Pathankot',28),(2817,'Patiala',28),(2818,'Rupnagar',28),(2819,'Sangrur',28),(2820,'SAS Nagar',28),(2821,'Tarn Taran',28),(2901,'Ajmer',29),(2902,'Alwar',29),(2903,'Banswara',29),(2904,'Baran',29),(2905,'Barmer',29),(2906,'Bharatpur',29),(2907,'Bhilwara',29),(2908,'Bikaner',29),(2909,'Bundi',29),(2910,'Chittorgarh',29),(2911,'Churu',29),(2912,'Dausa',29),(2913,'Dholpur',29),(2914,'Dungarpur',29),(2915,'Hanumangarh',29),(2916,'Jaipur',29),(2917,'Jaisalmer',29),(2918,'Jalore',29),(2919,'Jhalawar',29),(2920,'Jhunjhunu',29),(2921,'Jodhpur',29),(2922,'Karauli',29),(2923,'Kota',29),(2924,'Nagaur',29),(2925,'Pali',29),(2926,'Pilani',29),(2927,'Rajsamand',29),(2928,'Sawai Madhopur',29),(2929,'Sikar',29),(2930,'Sirohi',29),(2931,'Sri Ganganagar',29),(2932,'Tonk',29),(2933,'Udaipur',29),(3001,'Barmiak',30),(3002,'Be',30),(3003,'Bhurtuk',30),(3004,'Chhubakha',30),(3005,'Chidam',30),(3006,'Chubha',30),(3007,'Chumikteng',30),(3008,'Dentam',30),(3009,'Dikchu',30),(3010,'Dzongri',30),(3011,'Gangtok',30),(3012,'Gauzing',30),(3013,'Gyalshing',30),(3014,'Hema',30),(3015,'Kerung',30),(3016,'Lachen',30),(3017,'Lachung',30),(3018,'Lema',30),(3019,'Lingtam',30),(3020,'Lungthu',30),(3021,'Mangan',30),(3022,'Namchi',30),(3023,'Namthang',30),(3024,'Nanga',30),(3025,'Nantang',30),(3026,'Naya Bazar',30),(3027,'Padamachen',30),(3028,'Pakhyong',30),(3029,'Pemayangtse',30),(3030,'Phensang',30),(3031,'Rangli',30),(3032,'Rinchingpong',30),(3033,'Sakyong',30),(3034,'Samdong',30),(3035,'Singtam',30),(3036,'Siniolchu',30),(3037,'Sombari',30),(3038,'Soreng',30),(3039,'Sosing',30),(3040,'Tekhug',30),(3041,'Temi',30),(3042,'Tsetang',30),(3043,'Tsomgo',30),(3044,'Tumlong',30),(3045,'Yangang',30),(3046,'Yumtang',30),(3101,'Chennai',31),(3102,'Chidambaram',31),(3103,'Chingleput',31),(3104,'Coimbatore',31),(3105,'Courtallam',31),(3106,'Cuddalore',31),(3107,'Dharmapuri',31),(3108,'Dindigul',31),(3109,'Erode',31),(3110,'Hosur',31),(3111,'Kanchipuram',31),(3112,'Kanyakumari',31),(3113,'Karaikudi',31),(3114,'Karur',31),(3115,'Kodaikanal',31),(3116,'Kovilpatti',31),(3117,'Krishnagiri',31),(3118,'Kumbakonam',31),(3119,'Madurai',31),(3120,'Mayiladuthurai',31),(3121,'Nagapattinam',31),(3122,'Nagarcoil',31),(3123,'Namakkal',31),(3124,'Neyveli',31),(3125,'Nilgiris',31),(3126,'Ooty',31),(3127,'Palani',31),(3128,'Perambalur',31),(3129,'Pollachi',31),(3130,'Pudukkottai',31),(3131,'Rajapalayam',31),(3132,'Ramanathapuram',31),(3133,'Salem',31),(3134,'Sivaganga',31),(3135,'Sivakasi',31),(3136,'Thanjavur',31),(3137,'Theni',31),(3138,'Thoothukudi',31),(3139,'Tiruchirappalli',31),(3140,'Tirunelveli',31),(3141,'Tirupur',31),(3142,'Tiruvallur',31),(3143,'Tiruvannamalai',31),(3144,'Tiruvarur',31),(3145,'Trichy',31),(3146,'Tuticorin',31),(3147,'Vellore',31),(3148,'Villupuram',31),(3149,'Virudhunagar',31),(3150,'Yercaud',31),(3201,'Agartala',32),(3202,'Ambasa',32),(3203,'Bampurbari',32),(3204,'Belonia',32),(3205,'Dhalai',32),(3206,'Dharam Nagar',32),(3207,'Kailashahar',32),(3208,'Kamal Krishnabari',32),(3209,'Khopaiyapara',32),(3210,'Khowai',32),(3211,'Phuldungsei',32),(3212,'Radha Kishore Pur',32),(3213,'Tripura',32),(101,'Alipur',1),(102,'Andaman Island',1),(103,'Anderson Island',1),(104,'Arainj-Laka-Punga',1),(105,'Austinabad',1),(106,'Bamboo Flat',1),(107,'Barren Island',1),(108,'Beadonabad',1),(109,'Betapur',1),(110,'Bindraban',1),(111,'Bonington',1),(112,'Brookesabad',1),(113,'Cadell Point',1),(114,'Calicut',1),(115,'Chetamale',1),(116,'Cinque Islands',1),(117,'Defence Island',1),(118,'Digilpur',1),(119,'Dolyganj',1),(120,'Flat Island',1),(121,'Geinyale',1),(122,'Great Coco Island',1),(123,'Haddo',1),(124,'Havelock Island',1),(125,'Henry Lawrence Island',1),(126,'Herbertabad',1),(127,'Hobdaypur',1),(128,'Ilichar',1),(129,'Ingoie',1),(130,'Inteview Island',1),(131,'Jangli Ghat',1),(132,'Jhon Lawrence Island',1),(133,'Karen',1),(134,'Kartara',1),(135,'KYD Islannd',1),(136,'Landfall Island',1),(137,'Little Andmand',1),(138,'Little Coco Island',1),(139,'Long Island',1),(140,'Maimyo',1),(141,'Malappuram',1),(142,'Manglutan',1),(143,'Manpur',1),(144,'Mitha Khari',1),(145,'Neill Island',1),(146,'Nicobar Island',1),(147,'North Brother Island',1),(148,'North Passage Island',1),(149,'North Sentinel Island',1),(150,'Nothen Reef Island',1),(151,'Outram Island',1),(152,'Pahlagaon',1),(153,'Palalankwe',1),(154,'Passage Island',1),(155,'Phaiapong',1),(156,'Phoenix Island',1),(157,'Port Blair',1),(158,'Preparis Island',1),(159,'Protheroepur',1),(160,'Rangachang',1),(161,'Rongat',1),(162,'Rutland Island',1),(163,'Sabari',1),(164,'Saddle Peak',1),(165,'Shadipur',1),(166,'Smith Island',1),(167,'Sound Island',1),(168,'South Sentinel Island',1),(169,'Spike Island',1),(170,'Tarmugli Island',1),(171,'Taylerabad',1),(172,'Titaije',1),(173,'Toibalawe',1),(174,'Tusonabad',1),(175,'West Island',1),(176,'Wimberleyganj',1),(177,'Yadita',1),(201,'Adilabad',2),(202,'Anantapur',2),(203,'Chittoor',2),(204,'Cuddapah',2),(205,'East Godavari',2),(206,'Guntur',2),(207,'Hyderabad',2),(208,'Karimnagar',2),(209,'Khammam',2),(210,'Krishna',2),(211,'Kurnool',2),(212,'Mahabubnagar',2),(213,'Medak',2),(214,'Nalgonda',2),(215,'Nellore',2),(216,'Nizamabad',2),(217,'Prakasam',2),(218,'Rangareddy',2),(219,'Srikakulam',2),(220,'Visakhapatnam',2),(221,'Vizianagaram',2),(222,'Warangal',2),(223,'West Godavari',2),(301,'Anjaw',3),(302,'Changlang',3),(303,'Dibang Valley',3),(304,'East Kameng',3),(305,'East Siang',3),(306,'Itanagar',3),(307,'Kurung Kumey',3),(308,'Lohit',3),(309,'Lower Dibang Valley',3),(310,'Lower Subansiri',3),(311,'Papum Pare',3),(312,'Tawang',3),(313,'Tirap',3),(314,'Upper Siang',3),(315,'Upper Subansiri',3),(316,'West Kameng',3),(317,'West Siang',3),(401,'Barpeta',4),(402,'Bongaigaon',4),(403,'Cachar',4),(404,'Darrang',4),(405,'Dhemaji',4),(406,'Dhubri',4),(407,'Dibrugarh',4),(408,'Goalpara',4),(409,'Golaghat',4),(410,'Guwahati',4),(411,'Hailakandi',4),(412,'Jorhat',4),(413,'Kamrup',4),(414,'Karbi Anglong',4),(415,'Karimganj',4),(416,'Kokrajhar',4),(417,'Lakhimpur',4),(418,'Marigaon',4),(419,'Nagaon',4),(420,'Nalbari',4),(421,'North Cachar Hills',4),(422,'Silchar',4),(423,'Sivasagar',4),(424,'Sonitpur',4),(425,'Tinsukia',4),(426,'Udalguri',4),(501,'Araria',5),(502,'Aurangabad',5),(503,'Banka',5),(504,'Begusarai',5),(505,'Bhagalpur',5),(506,'Bhojpur',5),(507,'Buxar',5),(508,'Darbhanga',5),(509,'East Champaran',5),(510,'Gaya',5),(511,'Gopalganj',5),(512,'Jamshedpur',5),(513,'Jamui',5),(514,'Jehanabad',5),(515,'Kaimur (Bhabua)',5),(516,'Katihar',5),(517,'Khagaria',5),(518,'Kishanganj',5),(519,'Lakhisarai',5),(520,'Madhepura',5),(521,'Madhubani',5),(522,'Munger',5),(523,'Muzaffarpur',5),(524,'Nalanda',5),(525,'Nawada',5),(526,'Patna',5),(527,'Purnia',5),(528,'Rohtas',5),(529,'Saharsa',5),(530,'Samastipur',5),(531,'Saran',5),(532,'Sheikhpura',5),(533,'Sheohar',5),(534,'Sitamarhi',5),(535,'Siwan',5),(536,'Supaul',5),(537,'Vaishali',5),(538,'West Champaran',5),(601,'Chandigarh',6),(602,'Mani Marja',6),(701,'Bastar',7),(702,'Bhilai',7),(703,'Bijapur',7),(704,'Bilaspur',7),(705,'Dhamtari',7),(706,'Durg',7),(707,'Janjgir-Champa',7),(708,'Jashpur',7),(709,'Kabirdham-Kawardha',7),(710,'Korba',7),(711,'Korea',7),(712,'Mahasamund',7),(713,'Narayanpur',7),(714,'Norh Bastar-Kanker',7),(715,'Raigarh',7),(716,'Raipur',7),(717,'Rajnandgaon',7),(718,'South Bastar-Dantewada',7),(719,'Surguja',7),(801,'Amal',8),(802,'Amli',8),(803,'Bedpa',8),(804,'Chikhli',8),(805,'Dadra & Nagar Haveli',8),(806,'Dahikhed',8),(807,'Dolara',8),(808,'Galonda',8),(809,'Kanadi',8),(810,'Karchond',8),(811,'Khadoli',8),(812,'Kharadpada',8),(813,'Kherabari',8),(814,'Kherdi',8),(815,'Kothar',8),(816,'Luari',8),(817,'Mashat',8),(818,'Rakholi',8),(819,'Rudana',8),(820,'Saili',8),(821,'Sili',8),(822,'Silvassa',8),(823,'Sindavni',8),(824,'Udva',8),(825,'Umbarkoi',8),(826,'Vansda',8),(827,'Vasona',8),(828,'Velugam',8),(901,'Brancavare',9),(902,'Dagasi',9),(903,'Daman',9),(904,'Diu',9),(905,'Magarvara',9),(906,'Nagwa',9),(907,'Pariali',9),(908,'Passo Covo',9),(1001,'Central Delhi',10),(1002,'East Delhi',10),(1003,'New Delhi',10),(1004,'North Delhi',10),(1005,'North East Delhi',10),(1006,'North West Delhi',10),(1007,'Old Delhi',10),(1008,'South Delhi',10),(1009,'South West Delhi',10),(1010,'West Delhi',10),(1101,'Canacona',11),(1102,'Candolim',11),(1103,'Chinchinim',11),(1104,'Cortalim',11),(1105,'Goa',11),(1106,'Jua',11),(1107,'Madgaon',11),(1108,'Mahem',11),(1109,'Mapuca',11),(1110,'Marmagao',11),(1111,'Panji',11),(1112,'Ponda',11),(1113,'Sanvordem',11),(1114,'Terekhol',11),(1201,'Ahmedabad',12),(1202,'Amreli',12),(1203,'Anand',12),(1204,'Banaskantha',12),(1205,'Baroda',12),(1206,'Bharuch',12),(1207,'Bhavnagar',12),(1208,'Dahod',12),(1209,'Dang',12),(1210,'Dwarka',12),(1211,'Gandhinagar',12),(1212,'Jamnagar',12),(1213,'Junagadh',12),(1214,'Kheda',12),(1215,'Kutch',12),(1216,'Mehsana',12),(1217,'Nadiad',12),(1218,'Narmada',12),(1219,'Navsari',12),(1220,'Panchmahals',12),(1221,'Patan',12),(1222,'Porbandar',12),(1223,'Rajkot',12),(1224,'Sabarkantha',12),(1225,'Surat',12),(1226,'Surendranagar',12),(1227,'Vadodara',12),(1228,'Valsad',12),(1229,'Vapi',12),(1301,'Ambala',13),(1302,'Bhiwani',13),(1303,'Faridabad',13),(1304,'Fatehabad',13),(1305,'Gurgaon',13),(1306,'Hisar',13),(1307,'Jhajjar',13),(1308,'Jind',13),(1309,'Kaithal',13),(1310,'Karnal',13),(1311,'Kurukshetra',13),(1312,'Mahendragarh',13),(1313,'Mewat',13),(1314,'Panchkula',13),(1315,'Panipat',13),(1316,'Rewari',13),(1317,'Rohtak',13),(1318,'Sirsa',13),(1319,'Sonipat',13),(1320,'Yamunanagar',13),(1401,'Bilaspur',14),(1402,'Chamba',14),(1403,'Dalhousie',14),(1404,'Hamirpur',14),(1405,'Kangra',14),(1406,'Kinnaur',14),(1407,'Kullu',14),(1408,'Lahaul & Spiti',14),(1409,'Mandi',14),(1410,'Shimla',14),(1411,'Sirmaur',14),(1412,'Solan',14),(1413,'Una',14),(1501,'Anantnag',15),(1502,'Baramulla',15),(1503,'Budgam',15),(1504,'Doda',15),(1505,'Jammu',15),(1506,'Kargil',15),(1507,'Kathua',15),(1508,'Kupwara',15),(1509,'Leh',15),(1510,'Poonch',15),(1511,'Pulwama',15),(1512,'Rajauri',15),(1513,'Srinagar',15),(1514,'Udhampur',15),(1601,'Bokaro',16),(1602,'Chatra',16),(1603,'Deoghar',16),(1604,'Dhanbad',16),(1605,'Dumka',16),(1606,'East Singhbhum',16),(1607,'Garhwa',16),(1608,'Giridih',16),(1609,'Godda',16),(1610,'Gumla',16),(1611,'Hazaribag',16),(1612,'Jamtara',16),(1613,'Koderma',16),(1614,'Latehar',16),(1615,'Lohardaga',16),(1616,'Pakur',16),(1617,'Palamu',16),(1618,'Ranchi',16),(1619,'Sahibganj',16),(1620,'Seraikela',16),(1621,'Simdega',16),(1622,'West Singhbhum',16),(1701,'Bagalkot',17),(1702,'Bangalore',17),(1703,'Bangalore Rural',17),(1704,'Belgaum',17),(1705,'Bellary',17),(1706,'Bhatkal',17),(1707,'Bidar',17),(1708,'Bijapur',17),(1709,'Chamrajnagar',17),(1710,'Chickmagalur',17),(1711,'Chikballapur',17),(1712,'Chitradurga',17),(1713,'Dakshina Kannada',17),(1714,'Davanagere',17),(1715,'Dharwad',17),(1716,'Gadag',17),(1717,'Gulbarga',17),(1718,'Hampi',17),(1719,'Hassan',17),(1720,'Haveri',17),(1721,'Hospet',17),(1722,'Karwar',17),(1723,'Kodagu',17),(1724,'Kolar',17),(1725,'Koppal',17),(1726,'Madikeri',17),(1727,'Mandya',17),(1728,'Mangalore',17),(1729,'Manipal',17),(1730,'Mysore',17),(1731,'Raichur',17),(1732,'Shimoga',17),(1733,'Sirsi',17),(1734,'Sringeri',17),(1735,'Srirangapatna',17),(1736,'Tumkur',17),(1737,'Udupi',17),(1738,'Uttara Kannada',17),(1801,'Alappuzha',18),(1802,'Alleppey',18),(1803,'Alwaye',18),(1804,'Ernakulam',18),(1805,'Idukki',18),(1806,'Kannur',18),(1807,'Kasargod',18),(1808,'Kochi',18),(1809,'Kollam',18),(1810,'Kottayam',18),(1811,'Kovalam',18),(1812,'Kozhikode',18),(1813,'Malappuram',18),(1814,'Palakkad',18),(1815,'Pathanamthitta',18),(1816,'Perumbavoor',18),(1817,'Thiruvananthapuram',18),(1818,'Thrissur',18),(1819,'Trichur',18),(1820,'Trivandrum',18),(1821,'Wayanad',18),(1901,'Agatti Island',19),(1902,'Bingaram Island',19),(1903,'Bitra Island',19),(1904,'Chetlat Island',19),(1905,'Kadmat Island',19),(1906,'Kalpeni Island',19),(1907,'Kavaratti Island',19),(1908,'Kiltan Island',19),(1909,'Lakshadweep Sea',19),(1910,'Minicoy Island',19),(1911,'North Island',19),(1912,'South Island',19),(2001,'Anuppur',20),(2002,'Ashoknagar',20),(2003,'Balaghat',20),(2004,'Barwani',20),(2005,'Betul',20),(2006,'Bhind',20),(2007,'Bhopal',20),(2008,'Burhanpur',20),(2009,'Chhatarpur',20),(2010,'Chhindwara',20),(2011,'Damoh',20),(2012,'Datia',20),(2013,'Dewas',20),(2014,'Dhar',20),(2015,'Dindori',20),(2016,'Guna',20),(2017,'Gwalior',20),(2018,'Harda',20),(2019,'Hoshangabad',20),(2020,'Indore',20),(2021,'Jabalpur',20),(2022,'Jagdalpur',20),(2023,'Jhabua',20),(2024,'Katni',20),(2025,'Khandwa',20),(2026,'Khargone',20),(2027,'Mandla',20),(2028,'Mandsaur',20),(2029,'Morena',20),(2030,'Narsinghpur',20),(2031,'Neemuch',20),(2032,'Panna',20),(2033,'Raisen',20),(2034,'Rajgarh',20),(2035,'Ratlam',20),(2036,'Rewa',20),(2037,'Sagar',20),(2038,'Satna',20),(2039,'Sehore',20),(2040,'Seoni',20),(2041,'Shahdol',20),(2042,'Shajapur',20),(2043,'Sheopur',20),(2044,'Shivpuri',20),(2045,'Sidhi',20),(2046,'Tikamgarh',20),(2047,'Ujjain',20),(2048,'Umaria',20),(2049,'Vidisha',20),(2101,'Ahmednagar',21),(2102,'Akola',21),(2103,'Amravati',21),(2104,'Aurangabad',21),(2105,'Beed',21),(2106,'Bhandara',21),(2107,'Buldhana',21),(2108,'Chandrapur',21),(2109,'Dhule',21),(2110,'Gadchiroli',21),(2111,'Gondia',21),(2112,'Hingoli',21),(2113,'Jalgaon',21),(2114,'Jalna',21),(2115,'Kolhapur',21),(2116,'Latur',21),(2117,'Mahabaleshwar',21),(2118,'Mumbai',21),(2119,'Mumbai City',21),(2120,'Mumbai Suburban',21),(2121,'Nagpur',21),(2122,'Nanded',21),(2123,'Nandurbar',21),(2124,'Nashik',21),(2125,'Osmanabad',21),(2126,'Parbhani',21),(2127,'Pune',21),(2128,'Raigad',21),(2129,'Ratnagiri',21),(2130,'Sangli',21),(2131,'Satara',21),(2132,'Sholapur',21),(2133,'Sindhudurg',21),(2134,'Thane',21),(2135,'Wardha',21),(2136,'Washim',21),(2137,'Yavatmal',21),(2201,'Bishnupur',22),(2202,'Chandel',22),(2203,'Churachandpur',22),(2204,'Imphal East',22),(2205,'Imphal West',22),(2206,'Senapati',22),(2207,'Tamenglong',22),(2208,'Thoubal',22),(2209,'Ukhrul',22),(2301,'East Garo Hills',23),(2302,'East Khasi Hills',23),(2303,'Jaintia Hills',23),(2304,'Ri Bhoi',23),(2305,'Shillong',23),(2306,'South Garo Hills',23),(2307,'West Garo Hills',23),(2308,'West Khasi Hills',23),(2401,'Aizawl',24),(2402,'Champhai',24),(2403,'Kolasib',24),(2404,'Lawngtlai',24),(2405,'Lunglei',24),(2406,'Mamit',24),(2407,'Saiha',24),(2408,'Serchhip',24),(2501,'Dimapur',25),(2502,'Kohima',25),(2503,'Mokokchung',25),(2504,'Mon',25),(2505,'Phek',25),(2506,'Tuensang',25),(2507,'Wokha',25),(2508,'Zunheboto',25),(2601,'Angul',26),(2602,'Balangir',26),(2603,'Balasore',26),(2604,'Baleswar',26),(2605,'Bargarh',26),(2606,'Berhampur',26),(2607,'Bhadrak',26),(2608,'Bhubaneswar',26),(2609,'Boudh',26),(2610,'Cuttack',26),(2611,'Deogarh',26),(2612,'Dhenkanal',26),(2613,'Gajapati',26),(2614,'Ganjam',26),(2615,'Jagatsinghapur',26),(2616,'Jajpur',26),(2617,'Jharsuguda',26),(2618,'Kalahandi',26),(2619,'Kandhamal',26),(2620,'Kendrapara',26),(2621,'Kendujhar',26),(2622,'Khordha',26),(2623,'Koraput',26),(2624,'Malkangiri',26),(2625,'Mayurbhanj',26),(2626,'Nabarangapur',26),(2627,'Nayagarh',26),(2628,'Nuapada',26),(2629,'Puri',26),(2630,'Rayagada',26),(2631,'Rourkela',26),(2632,'Sambalpur',26),(2633,'Subarnapur',26),(2634,'Sundergarh',26),(2701,'Bahur',27),(2702,'Karaikal',27),(2703,'Mahe',27),(2704,'Pondicherry',27),(2705,'Purnankuppam',27),(2706,'Valudavur',27),(2707,'Villianur',27),(2708,'Yanam',27),(2801,'Amritsar',28),(2802,'Barnala',28),(2803,'Bathinda',28),(2804,'Faridkot',28),(2805,'Fatehgarh Sahib',28),(2806,'Ferozepur',28),(2807,'Gurdaspur',28),(2808,'Hoshiarpur',28),(2809,'Jalandhar',28),(2810,'Kapurthala',28),(2811,'Ludhiana',28),(2812,'Mansa',28),(2813,'Moga',28),(2814,'Muktsar',28),(2815,'Nawanshahr',28),(2816,'Pathankot',28),(2817,'Patiala',28),(2818,'Rupnagar',28),(2819,'Sangrur',28),(2820,'SAS Nagar',28),(2821,'Tarn Taran',28),(2901,'Ajmer',29),(2902,'Alwar',29),(2903,'Banswara',29),(2904,'Baran',29),(2905,'Barmer',29),(2906,'Bharatpur',29),(2907,'Bhilwara',29),(2908,'Bikaner',29),(2909,'Bundi',29),(2910,'Chittorgarh',29),(2911,'Churu',29),(2912,'Dausa',29),(2913,'Dholpur',29),(2914,'Dungarpur',29),(2915,'Hanumangarh',29),(2916,'Jaipur',29),(2917,'Jaisalmer',29),(2918,'Jalore',29),(2919,'Jhalawar',29),(2920,'Jhunjhunu',29),(2921,'Jodhpur',29),(2922,'Karauli',29),(2923,'Kota',29),(2924,'Nagaur',29),(2925,'Pali',29),(2926,'Pilani',29),(2927,'Rajsamand',29),(2928,'Sawai Madhopur',29),(2929,'Sikar',29),(2930,'Sirohi',29),(2931,'Sri Ganganagar',29),(2932,'Tonk',29),(2933,'Udaipur',29),(3001,'Barmiak',30),(3002,'Be',30),(3003,'Bhurtuk',30),(3004,'Chhubakha',30),(3005,'Chidam',30),(3006,'Chubha',30),(3007,'Chumikteng',30),(3008,'Dentam',30),(3009,'Dikchu',30),(3010,'Dzongri',30),(3011,'Gangtok',30),(3012,'Gauzing',30),(3013,'Gyalshing',30),(3014,'Hema',30),(3015,'Kerung',30),(3016,'Lachen',30),(3017,'Lachung',30),(3018,'Lema',30),(3019,'Lingtam',30),(3020,'Lungthu',30),(3021,'Mangan',30),(3022,'Namchi',30),(3023,'Namthang',30),(3024,'Nanga',30),(3025,'Nantang',30),(3026,'Naya Bazar',30),(3027,'Padamachen',30),(3028,'Pakhyong',30),(3029,'Pemayangtse',30),(3030,'Phensang',30),(3031,'Rangli',30),(3032,'Rinchingpong',30),(3033,'Sakyong',30),(3034,'Samdong',30),(3035,'Singtam',30),(3036,'Siniolchu',30),(3037,'Sombari',30),(3038,'Soreng',30),(3039,'Sosing',30),(3040,'Tekhug',30),(3041,'Temi',30),(3042,'Tsetang',30),(3043,'Tsomgo',30),(3044,'Tumlong',30),(3045,'Yangang',30),(3046,'Yumtang',30),(3101,'Chennai',31),(3102,'Chidambaram',31),(3103,'Chingleput',31),(3104,'Coimbatore',31),(3105,'Courtallam',31),(3106,'Cuddalore',31),(3107,'Dharmapuri',31),(3108,'Dindigul',31),(3109,'Erode',31),(3110,'Hosur',31),(3111,'Kanchipuram',31),(3112,'Kanyakumari',31),(3113,'Karaikudi',31),(3114,'Karur',31),(3115,'Kodaikanal',31),(3116,'Kovilpatti',31),(3117,'Krishnagiri',31),(3118,'Kumbakonam',31),(3119,'Madurai',31),(3120,'Mayiladuthurai',31),(3121,'Nagapattinam',31),(3122,'Nagarcoil',31),(3123,'Namakkal',31),(3124,'Neyveli',31),(3125,'Nilgiris',31),(3126,'Ooty',31),(3127,'Palani',31),(3128,'Perambalur',31),(3129,'Pollachi',31),(3130,'Pudukkottai',31),(3131,'Rajapalayam',31),(3132,'Ramanathapuram',31),(3133,'Salem',31),(3134,'Sivaganga',31),(3135,'Sivakasi',31),(3136,'Thanjavur',31),(3137,'Theni',31),(3138,'Thoothukudi',31),(3139,'Tiruchirappalli',31),(3140,'Tirunelveli',31),(3141,'Tirupur',31),(3142,'Tiruvallur',31),(3143,'Tiruvannamalai',31),(3144,'Tiruvarur',31),(3145,'Trichy',31),(3146,'Tuticorin',31),(3147,'Vellore',31),(3148,'Villupuram',31),(3149,'Virudhunagar',31),(3150,'Yercaud',31),(3201,'Agartala',32),(3202,'Ambasa',32),(3203,'Bampurbari',32),(3204,'Belonia',32),(3205,'Dhalai',32),(3206,'Dharam Nagar',32),(3207,'Kailashahar',32),(3208,'Kamal Krishnabari',32),(3209,'Khopaiyapara',32),(3210,'Khowai',32),(3211,'Phuldungsei',32),(3212,'Radha Kishore Pur',32),(3213,'Tripura',32);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `dept_id` int(11) NOT NULL,
  `dept_name` varchar(30) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0,'All'),(1,'IT'),(2,'COMP'),(3,'EXTC');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `districts` (
  `d_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `d_name` varchar(25) NOT NULL,
  `st_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`d_id`),
  KEY `st_id` (`st_id`),
  CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`st_id`) REFERENCES `states` (`st_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `doc_id` int(11) NOT NULL,
  `doc_name` varchar(20) NOT NULL,
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'Aadhar'),(2,'PAN');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `e_tender_details`
--

DROP TABLE IF EXISTS `e_tender_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `e_tender_details` (
  `et_id` int(11) NOT NULL AUTO_INCREMENT,
  `et_title` text NOT NULL,
  `et_tender_fee` varchar(10) NOT NULL,
  `et_tender_ref_no` varchar(10) NOT NULL,
  `et_tender_desc` text NOT NULL,
  `et_last_date_apply` date NOT NULL,
  `et_bidding_date` date NOT NULL,
  `et_file_uri` text,
  `is_delete` tinyint(4) NOT NULL,
  `dept_id` int(4) NOT NULL,
  `is_approved` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`et_id`),
  KEY `dept_id` (`dept_id`),
  CONSTRAINT `e_tender_details_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_tender_details`
--

LOCK TABLES `e_tender_details` WRITE;
/*!40000 ALTER TABLE `e_tender_details` DISABLE KEYS */;
INSERT INTO `e_tender_details` VALUES (123,'Procurement of computers','1200','ITC123','Procurement of Computers, Software and Services. The purpose of this policy is to provide a defined process for both the new and recurring procurement (through purchase or lease) of computer hardware, software and services using Washington University funds or grant funds administered by Washington University.','2020-04-15','2020-04-16','https://www.youtube.com/watch?v=u8XFFTWwSvY&feature=youtu.be',0,1,1),(124,'hello titleU','1200','ITC56U','hello descriptionU','2020-03-02','2020-03-04','https://www.youtube.com/watch?v=fyMhvkC3A84U',1,1,0),(143,'TEST','100','ITC6969','TEST','2020-03-05','2020-04-05','ashjkl',0,1,1),(144,'Payment','101','250998','How\'s the Josh.......High sir!!!\nHow\'s the Josh.......High sir!!!\nHow\'s the Josh.......High sir!!!','2020-09-25','2020-10-27','',0,1,0),(145,'testing','12','456','asdfghjkl','2020-05-04','2020-05-05','asdfjkl',0,1,0),(146,'testing from sanket login 5','12','51','dfgm 5','2000-05-31','2020-05-05','asdfghjk',1,1,0),(147,'Lockdown 3.0','20000','123567','This is another minimal theme for desktop. I tried to keep it kind of simple to match the beautiful wallpaper. I hope you guys like it.','2020-05-19','2020-05-25','https://www.youtube.com/watch?v=xHj0juUACFk',0,2,0),(148,'Lockdown 3.0','2000','1234567','This is another minimal theme for desktop. I tried to keep it kind of simple to match the beautiful wallpaper. Hope you guys like it.','2020-05-05','2020-05-04','https://www.youtube.com/watch?v=xHj0juUACFk',0,2,0),(149,'srfws','8651','845','xcgedgd','2020-05-07','2020-05-16','tesdex',0,1,0);
/*!40000 ALTER TABLE `e_tender_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `e_tender_vendor`
--

DROP TABLE IF EXISTS `e_tender_vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `e_tender_vendor` (
  `etd_id` int(11) NOT NULL AUTO_INCREMENT,
  `et_id` int(11) NOT NULL,
  `vd_id` int(11) NOT NULL,
  `vcd_id` int(11) NOT NULL,
  `bidding_amt` varchar(10) NOT NULL,
  `is_approved` varchar(1) NOT NULL DEFAULT '0',
  `date_of_approval` varchar(10) DEFAULT NULL,
  `status` varchar(5) NOT NULL DEFAULT '100',
  PRIMARY KEY (`etd_id`),
  KEY `et_id` (`et_id`),
  KEY `vd_id` (`vd_id`),
  KEY `vcd_id` (`vcd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_tender_vendor`
--

LOCK TABLES `e_tender_vendor` WRITE;
/*!40000 ALTER TABLE `e_tender_vendor` DISABLE KEYS */;
INSERT INTO `e_tender_vendor` VALUES (1,123,1,1,'1200','1','','110'),(5,124,1,1,'12000','0','','100'),(21,123,57,19,'12000','0',NULL,'100'),(22,143,1,1,'12000','0',NULL,'110'),(24,144,1,1,'12000','0',NULL,'110'),(25,143,57,19,'12000','0',NULL,'100'),(26,143,60,21,'12000','0',NULL,'100'),(27,143,60,21,'12000','0',NULL,'100'),(28,143,60,21,'12000','0',NULL,'100'),(29,143,63,22,'12000','1',NULL,'111'),(30,143,63,22,'12000','0',NULL,'100'),(31,143,63,22,'12000','0',NULL,'100'),(32,144,57,19,'12000','0',NULL,'111'),(33,147,91,23,'12000','0',NULL,'111'),(34,145,57,19,'12000','0',NULL,'110'),(35,147,96,24,'12000','0',NULL,'110'),(36,144,63,22,'12000','0',NULL,'110'),(37,147,57,19,'12000','0',NULL,'111'),(38,147,60,21,'12000','0',NULL,'100'),(39,144,60,21,'12000','0',NULL,'100'),(40,144,96,24,'12000','0',NULL,'100'),(41,147,1,1,'12000','0',NULL,'110'),(42,147,1,1,'12000','0',NULL,'100'),(43,147,1,1,'12000','0',NULL,'100'),(44,147,1,1,'12000','0',NULL,'100'),(45,147,1,1,'12000','0',NULL,'100'),(46,148,91,23,'12000','0',NULL,'111'),(47,148,96,24,'12000','0',NULL,'100'),(48,148,57,19,'12000','0',NULL,'110'),(49,149,57,19,'12000','0',NULL,'110'),(50,149,96,24,'12000','0',NULL,'110'),(51,149,57,19,'12000','0',NULL,'100'),(52,144,91,23,'12000','0',NULL,'110'),(53,149,63,22,'12000','0',NULL,'110');
/*!40000 ALTER TABLE `e_tender_vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_uri`
--

DROP TABLE IF EXISTS `file_uri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_uri` (
  `furi_id` int(11) NOT NULL AUTO_INCREMENT,
  `furi1` text,
  `furi2` text,
  `etd_id` int(11) NOT NULL,
  `f_type` varchar(50) NOT NULL,
  PRIMARY KEY (`furi_id`),
  UNIQUE KEY `etd_id` (`etd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_uri`
--

LOCK TABLES `file_uri` WRITE;
/*!40000 ALTER TABLE `file_uri` DISABLE KEYS */;
INSERT INTO `file_uri` VALUES (1,'https://www.youtube.com/watch?v=yKNxeF4KMsY','https://stackoverflow.com/questions/57548512/sql-query-to-find-all-combinations-of-grouped-values',1,'link'),(2,'https://www.youtube.com/watch?v=yKNxeF4KMsY','https://stackoverflow.com/questions/57548512/sql-query-to-find-all-combinations-of-grouped-values',2,'link'),(4,'https://www.youtube.com/watch?v=yKNxeF4KMsY','https://stackoverflow.com/questions/57548512/sql-query-to-find-all-combinations-of-grouped-values',4,'link'),(5,'uri1','uri2',10,'link'),(7,'uri1','uri2',11,'link'),(8,'uri1','uri2',29,'link'),(9,NULL,NULL,34,'link'),(10,NULL,NULL,33,'link'),(11,NULL,NULL,36,'link'),(28,'in.gov.digilocker-OTHER-1c101c18904b44fd06b260b9a6889e42',NULL,48,'link'),(29,'in.gov.digilocker-OTHER-c0df47b58048793906e4903f528c8046',NULL,46,'link'),(31,'in.gov.digilocker-OTHER-3cef77c6b53465dc38bc51e4f0d9712c',NULL,51,'link'),(38,'in.gov.digilocker-OTHER-0d41eec5175d23b9e7c7cdc0787b35af','in.gov.digilocker-OTHER-2bb315fe5df3db4accaafa7b31f17472',52,'link'),(42,'in.gov.digilocker-OTHER-974a4488f4c16f446e483be9caa4ca22','in.gov.digilocker-OTHER-cc64f13b0e8b7412485b1aa0d5e99095',35,'link'),(46,'in.gov.digilocker-OTHER-a95670616cb3b196126f59c8ed0b8494','in.gov.digilocker-OTHER-7f59363f116fc6ed27cdab603305ee9e',53,'link'),(48,'in.gov.digilocker-OTHER-2eb3e3d172b07ea1d5bb4a01c5ed5cae','in.gov.digilocker-OTHER-88c5ccb6d9f8425c80b39105aec6908b',49,'link');
/*!40000 ALTER TABLE `file_uri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `legal_status_details`
--

DROP TABLE IF EXISTS `legal_status_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `legal_status_details` (
  `l_id` tinyint(4) NOT NULL,
  `l_name` varchar(15) NOT NULL,
  PRIMARY KEY (`l_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `legal_status_details`
--

LOCK TABLES `legal_status_details` WRITE;
/*!40000 ALTER TABLE `legal_status_details` DISABLE KEYS */;
INSERT INTO `legal_status_details` VALUES (0,'Others'),(1,'Limited Company'),(2,'Undertaking'),(3,'Jointventure'),(4,'Partnership');
/*!40000 ALTER TABLE `legal_status_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_in_details`
--

DROP TABLE IF EXISTS `log_in_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_in_details` (
  `login_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role_id` tinyint(4) NOT NULL,
  `vcd_id` int(11) DEFAULT NULL,
  `ad_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_name_2` (`user_name`),
  KEY `v_id` (`vcd_id`),
  KEY `ad_id` (`ad_id`),
  CONSTRAINT `log_in_details_ibfk_1` FOREIGN KEY (`vcd_id`) REFERENCES `v_contact_details` (`vcd_id`),
  CONSTRAINT `log_in_details_ibfk_2` FOREIGN KEY (`ad_id`) REFERENCES `admin_detail` (`ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_in_details`
--

LOCK TABLES `log_in_details` WRITE;
/*!40000 ALTER TABLE `log_in_details` DISABLE KEYS */;
INSERT INTO `log_in_details` VALUES (1,'winu','winu',2,1,NULL),(10,'admin','admin',1,NULL,1),(11,'sankey123','1234567',2,19,NULL),(12,'sankey_admin','1234567',1,NULL,2),(13,'afif','9876543210',1,NULL,3),(15,'priya99','priya',2,21,NULL),(16,'viraj456','1234567',2,22,NULL),(17,'100rabhyadav98','250998',2,23,NULL),(18,'winston99','qwerty',2,24,NULL);
/*!40000 ALTER TABLE `log_in_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `org_details`
--

DROP TABLE IF EXISTS `org_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `org_details` (
  `org_id` int(11) NOT NULL,
  `org_name` varchar(25) NOT NULL,
  `org_contact` varchar(15) NOT NULL,
  `org_email` varchar(25) NOT NULL,
  `org_addr` varchar(30) NOT NULL,
  `org_state` varchar(40) NOT NULL,
  `org_dist` varchar(5) NOT NULL,
  `org_pin` varchar(6) NOT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_details`
--

LOCK TABLES `org_details` WRITE;
/*!40000 ALTER TABLE `org_details` DISABLE KEYS */;
INSERT INTO `org_details` VALUES (1,'Tripura Inst of Techno','7894561230','tiot@gmail.com','Tripura','Tripura','a','456123'),(2,'Don Bosco Inst of Tech','9876543210','dbit@gmail.com','Kurla','Maharashtra','Mumba','400070');
/*!40000 ALTER TABLE `org_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_transactions`
--

DROP TABLE IF EXISTS `payment_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_transactions` (
  `etd_id` int(11) NOT NULL,
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
  `payment_mode` varchar(10) NOT NULL,
  KEY `etd_id` (`etd_id`),
  CONSTRAINT `payment_transactions_ibfk_1` FOREIGN KEY (`etd_id`) REFERENCES `e_tender_vendor` (`etd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_transactions`
--

LOCK TABLES `payment_transactions` WRITE;
/*!40000 ALTER TABLE `payment_transactions` DISABLE KEYS */;
INSERT INTO `payment_transactions` VALUES (1,'20200415111212800110168578401467177','ORD4483446283','1200.00','TXN_SUCCESS','01','0.00','2020-04-15 19:55:40.0','777001075408515','HDFC','Bank','DC'),(22,'20200418111212800110168135101464148','ORD67799611','100.00','TXN_SUCCESS','01','0.00','2020-04-18 17:37:45.0','777001317925377','HDFC','Bank','DC'),(24,'20200418111212800110168952101448203','ORD1614919355','101.00','TXN_SUCCESS','01','0.00','2020-04-18 18:02:33.0','777001314779128','HDFC','Bank','DC'),(1,'20200424111212800110168285901481333','ORD2716104451','1200.00','TXN_SUCCESS','01','0.00','2020-04-24 22:38:40.0','777001212985127','HDFC','Bank of Bahrain and Kuwait','DC'),(29,'20200504111212800110168549801490826','ORD4763326651','100.00','TXN_SUCCESS','01','0.00','2020-05-04 11:49:25.0','777001680335387','HDFC','Bank of Bahrain and Kuwait','DC'),(29,'20200504111212800110168549801490826','ORD4763326651','100.00','TXN_SUCCESS','01','0.00','2020-05-04 11:49:25.0','777001680335387','HDFC','Bank of Bahrain and Kuwait','DC'),(32,'20200504111212800110168411801500377','ORD8672028146','101.00','TXN_SUCCESS','01','0.00','2020-05-04 17:25:04.0','777001030806540','HDFC','Bank of Bahrain and Kuwait','DC'),(33,'20200504111212800110168076601507314','ORD4614618640','20000.00','TXN_SUCCESS','01','0.00','2020-05-04 19:42:04.0','777001052938800','HDFC','Bank of Bahrain and Kuwait','DC'),(34,'20200504111212800110168721601533234','ORD2096940788','12.00','TXN_SUCCESS','01','0.00','2020-05-04 19:57:52.0','777001339258128','HDFC','Bank of Bahrain and Kuwait','DC'),(35,'20200504111212800110168306501595363','ORD145294840','20000.00','TXN_SUCCESS','01','0.00','2020-05-04 20:01:07.0','777001778185378','HDFC','Bank of Bahrain and Kuwait','DC'),(35,'20200504111212800110168306501595363','ORD145294840','20000.00','TXN_SUCCESS','01','0.00','2020-05-04 20:01:07.0','777001778185378','HDFC','Bank of Bahrain and Kuwait','DC'),(36,'20200505111212800110168600901504481','ORD1781242141','101.00','TXN_SUCCESS','01','0.00','2020-05-05 11:13:28.0','777001625537001','HDFC','Bank of Bahrain and Kuwait','DC'),(37,'20200505111212800110168466601517046','ORD1163760418','20000.00','TXN_SUCCESS','01','0.00','2020-05-05 11:48:12.0','777001863942072','HDFC','Bank of Bahrain and Kuwait','DC'),(41,'20200505111212800110168205501509053','ORD6992552340','20000.00','TXN_SUCCESS','01','0.00','2020-05-05 16:14:24.0','777001157372823','HDFC','Bank of Bahrain and Kuwait','DC'),(48,'20200505111212800110168303801596642','ORD7851913508','2000.00','TXN_SUCCESS','01','0.00','2020-05-05 17:58:54.0','777001900183488','HDFC','Bank of Bahrain and Kuwait','DC'),(46,'20200505111212800110168255501507386','ORD4539973453','2000.00','TXN_SUCCESS','01','0.00','2020-05-05 20:16:10.0','777001769027516','HDFC','Bank of Bahrain and Kuwait','DC'),(51,'20200506111212800110168471401504503','ORD1074744782','8651.00','TXN_SUCCESS','01','0.00','2020-05-06 13:41:24.0','777001203999392','HDFC','Bank of Bahrain and Kuwait','DC'),(49,'20200506111212800110168977801524459','ORD4691705110','8651.00','TXN_SUCCESS','01','0.00','2020-05-06 17:02:09.0','777001494471983','HDFC','Bank of Bahrain and Kuwait','DC'),(52,'20200506111212800110168278501515214','ORD6277750790','101.00','TXN_SUCCESS','01','0.00','2020-05-06 22:12:03.0','777001439519861','HDFC','Bank of Bahrain and Kuwait','DC'),(53,'20200506111212800110168510801721931','ORD4470802148','8651.00','TXN_SUCCESS','01','0.00','2020-05-06 22:11:49.0','777001623342677','HDFC','Bank of Bahrain and Kuwait','DC'),(53,'20200507111212800110168675901508953','ORD1443098049','8651.00','TXN_SUCCESS','01','0.00','2020-05-07 11:35:03.0','777001030848977','HDFC','Bank of Bahrain and Kuwait','DC');
/*!40000 ALTER TABLE `payment_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_details`
--

DROP TABLE IF EXISTS `role_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_details` (
  `role_id` tinyint(4) NOT NULL,
  `role_name` varchar(11) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_details`
--

LOCK TABLES `role_details` WRITE;
/*!40000 ALTER TABLE `role_details` DISABLE KEYS */;
INSERT INTO `role_details` VALUES (0,'Super Admin'),(1,'Dept. Admin'),(2,'Vendor');
/*!40000 ALTER TABLE `role_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `st_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `st_name` varchar(40) NOT NULL,
  PRIMARY KEY (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Andaman and Nicobar [AN]'),(2,'Andhra Pradesh [AP]'),(3,'Arunachal Pradesh [AR]'),(4,'Assam [AS]'),(5,'Bihar [BH]'),(6,'Chandigarh [CH]'),(7,'Chhattisgarh [CG]'),(8,'Dadra and Nagar Haveli [DN]'),(9,'Daman and Diu [DD]'),(10,'Delhi [DL]'),(11,'Goa [GO]'),(12,'Gujarat [GU]'),(13,'Haryana [HR]'),(14,'Himachal Pradesh [HP]'),(15,'Jammu and Kashmir [JK]'),(16,'Jharkhand [JH]'),(17,'Karnataka [KR]'),(18,'Kerala [KL]'),(19,'Lakshadweep [LD]'),(20,'Madhya Pradesh [MP]'),(21,'Maharashtra [MH]'),(22,'Manipur [MN]'),(23,'Meghalaya [ML]'),(24,'Mizoram [MM]'),(25,'Nagaland [NL]'),(26,'Orissa OR'),(27,'Pondicherry [PC]'),(28,'Punjab [PJ]'),(29,'Rajasthan [RJ]'),(30,'Sikkim [SK]'),(31,'Tamil Nadu [TN]'),(32,'Tripura [TR]'),(33,'Uttaranchal [UP]'),(34,'Uttar Pradesh [UT]'),(35,'West Bengal [WB]');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tendor_req`
--

DROP TABLE IF EXISTS `tendor_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tendor_req` (
  `tei_id` int(11) NOT NULL,
  `trd_id` int(11) NOT NULL,
  KEY `tei_id` (`tei_id`),
  KEY `trd_id` (`trd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tendor_req`
--

LOCK TABLES `tendor_req` WRITE;
/*!40000 ALTER TABLE `tendor_req` DISABLE KEYS */;
/*!40000 ALTER TABLE `tendor_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v_contact_details`
--

DROP TABLE IF EXISTS `v_contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v_contact_details` (
  `vcd_id` int(11) NOT NULL AUTO_INCREMENT,
  `vcd_name` varchar(20) NOT NULL,
  `vcd_title` varchar(15) NOT NULL,
  `vcd_dob` varchar(10) NOT NULL,
  `vcd_aadhar` varchar(12) NOT NULL,
  `vcd_contact` varchar(10) NOT NULL,
  `vcd_email` varchar(30) DEFAULT NULL,
  `vcd_designation` varchar(20) NOT NULL,
  `vd_id` int(11) NOT NULL,
  `digi_access` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vcd_id`),
  KEY `vd_id` (`vd_id`),
  CONSTRAINT `v_contact_details_ibfk_1` FOREIGN KEY (`vd_id`) REFERENCES `vendor_details` (`vd_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v_contact_details`
--

LOCK TABLES `v_contact_details` WRITE;
/*!40000 ALTER TABLE `v_contact_details` DISABLE KEYS */;
INSERT INTO `v_contact_details` VALUES (1,'winston sequeria','Mr.','16-6-1999','456745674567','8975647845','winstonsequeria@gmail.com','CEO',1,0),(19,'Sanket Deshmukh','Mr','2000-05-13','070707070707','9702717188','meetsanket24@gmail.com','CEO',57,1),(20,'asdfghj','Mr','2020-05-25','123412341234','8976853951','v@gmail.com','ceo',58,0),(21,'Priya Singh','Ms','1999-10-27','147147147147','8329779783','spriya1252012@gmail.com','Operations manager',60,0),(22,'asdfghj','Mr','2020-05-25','123412341234','8976853951','v@gmail.com','ceo',63,1),(23,'Saurabh Yadav','Sri','1998-09-25','369369369369','9640278397','yadavsaurabh2509@gmail.com','Managing Director',91,1),(24,'Winston Sequeira','Dr','1999-06-19','753753753753','9987039417','winstonsequeira@gmail.com','Company Executive',96,0);
/*!40000 ALTER TABLE `v_contact_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_details`
--

DROP TABLE IF EXISTS `vendor_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_details` (
  `vd_id` int(11) NOT NULL AUTO_INCREMENT,
  `v_name` varchar(20) NOT NULL,
  `v_address` varchar(35) NOT NULL,
  `v_yoe` varchar(4) NOT NULL,
  `v_email` varchar(25) NOT NULL,
  `v_mobile` varchar(12) NOT NULL,
  `v_reg_no` varchar(10) NOT NULL,
  `v_state_id` tinyint(4) NOT NULL,
  `v_dist_id` tinyint(4) NOT NULL,
  `v_city_id` smallint(4) NOT NULL,
  `v_pincode` varchar(6) NOT NULL,
  `v_legal_id` varchar(1) NOT NULL,
  `v_pan` varchar(10) NOT NULL,
  `v_is_verified` varchar(1) NOT NULL,
  `v_gst` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`vd_id`),
  UNIQUE KEY `v_reg_no` (`v_reg_no`),
  UNIQUE KEY `v_pan` (`v_pan`),
  UNIQUE KEY `v_gst` (`v_gst`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_details`
--

LOCK TABLES `vendor_details` WRITE;
/*!40000 ALTER TABLE `vendor_details` DISABLE KEYS */;
INSERT INTO `vendor_details` VALUES (1,'sequeria industry','andheri east','1999','ws@gmail.com','7894561230','D123N67',5,4,10,'400706','1','Rf234Rt','0','789456'),(57,'sankey soln','bhandup','2000','meetsanket24@gmail.com','9702717188','9876543210',21,-1,2120,'400078','0','4654867465','0','548454365748654'),(58,'fghjk','dfghjk','2020','v@gmail.com','7894561230','werty',21,-1,2127,'456789','0','7894561230','0','789456123012345'),(60,'ABC','near vidyavihar stn.','2010','abc@gmail.com','8329779783','123456',21,-1,2118,'421005','4','ABCD123456','0','123456789012345'),(63,'fghjk','dfghjk','2020','v@gmail.com','7894561230','bhunji',21,-1,2127,'456789','0','6894561230','0','789456123012352'),(91,'Sky Info Tech Ltd.','Near Gateway Of India,Colaba','1998','skytech2509@gmail.com','9876543210','DOB250998',21,-1,2119,'400005','1','ASDFG25099','0','27AAAAA0000A1Z5'),(96,'Sequiera L&T ','Near Band Stand,Bandra','1999','generixteam2019@gmaii.com','9876543210','DOB190699',17,-1,1728,'123456','2','QWERT19069','0','27AAAAA0000A1Z6');
/*!40000 ALTER TABLE `vendor_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_file`
--

DROP TABLE IF EXISTS `vendor_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_file` (
  `vd_id` int(11) NOT NULL,
  `file_uri` varchar(35) NOT NULL,
  `file_type` varchar(35) NOT NULL,
  KEY `vendor_file_ibfk_1` (`vd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_file`
--

LOCK TABLES `vendor_file` WRITE;
/*!40000 ALTER TABLE `vendor_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-07  6:48:25
