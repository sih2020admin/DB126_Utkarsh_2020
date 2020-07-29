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
INSERT INTO `access_token` VALUES (33,'Sanket','c35b85da4972b25555ba6910bac52e9fe70b043e','5acda9e5645e60f7c0f254be3860c41b47f6fc83','28/7/2020','17:26:57'),(34,'Sanket','3ca8a4dbe01dd6680ca2788418b6705600aecb6b','daa4c37584ba5ecf3b835ce69be9bb828eeb986a','29/7/2020','20:32:43'),(36,'Sanket','6277eab7dabc624bc1c4298aca4babbf158a27f4','56ff5895c9d7b23164b70305eda4b52fe44618f4','29/7/2020','12:17:22'),(37,'Sanket','c011feb8d1ae6e85879cf6bf37734e0c2212f4e6','5f1c93e2352b025a2cf6c121a15ee9d66d757173','28/7/2020','17:13:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_detail`
--

LOCK TABLES `admin_detail` WRITE;
/*!40000 ALTER TABLE `admin_detail` DISABLE KEYS */;
INSERT INTO `admin_detail` VALUES (1,'admin','7894561230','admintest@gmail.com',1,'kurla',1),(2,'Sanjay Jadhav','7412589630','asdfg@gmail.com',6,'Mumbai ',1),(3,'Nana patekar','7412589630','asdfg@gmail.com',4,'Mumbai ',1),(4,'Devenfra F.','7412589630','asdfg@gmail.com',5,'Mumbai ',1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (0,'All'),(1,'IT'),(4,'AGRI'),(5,'ELEC'),(6,'JAL');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
  `et_title` varchar(100) DEFAULT NULL,
  `et_tender_fee` varchar(10) NOT NULL,
  `et_tender_ref_no` varchar(30) DEFAULT NULL,
  `et_tender_desc` varchar(400) DEFAULT NULL,
  `et_last_date_apply` date NOT NULL,
  `et_bidding_date` date NOT NULL,
  `et_file_uri` text,
  `is_delete` tinyint(4) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `is_approved` tinyint(4) NOT NULL DEFAULT '0',
  `maximum_bid` int(11) DEFAULT NULL,
  PRIMARY KEY (`et_id`),
  KEY `dept_id` (`dept_id`),
  CONSTRAINT `e_tender_details_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_tender_details`
--

LOCK TABLES `e_tender_details` WRITE;
/*!40000 ALTER TABLE `e_tender_details` DISABLE KEYS */;
INSERT INTO `e_tender_details` VALUES (178,'PipeLine upgrade','1000','2020/178/IT178','Replacement of existing 140mm PVC 4 KSC pipe with 160mm O-PVC pipe','2020-07-21','2020-07-24','uploads/sample.zip',0,1,3,500000),(179,'Insulators procurement','4500','2020/179/IT179','supply of 11 KV 45 KN Polymer composite disc insulators','2020-07-22','2020-07-23','uploads/sample.zip',0,1,0,500000),(180,'Radiology medical euipments','7000','2020/180/IT180','	International Competitive Bidding For Supply And Installation Of Radiology Medical Equipment For Medical College Hospitals And Districts Headquarters Hospitals','2020-07-25','2020-07-26','uploads/sample.zip',0,1,0,500000),(182,'Digital Travels','200','2020/181/IT181','Selection of a mobile app technology partner to develop and operate the common mobility app for integrated ticketing system in mumbai metropolitan region.','2020-07-31','2020-07-31','uploads/sample.zip',0,1,0,100000),(183,'Smart Systems','250','2020/183/IT183','Implementation of integrated online solution for automation of various activities.','2020-07-31','2020-07-31','uploads/sample.zip',0,1,0,500000),(184,'Update Aadhaar','199','2020/184/IT184','Quality assurance work relating to processing applications of residents for aadhaar enrollment and update of their aadhaar related demographic data and photo recorded with it.','2020-07-31','2020-07-31','uploads/sample.zip',0,1,0,500000),(185,'Agriculture1','800','2020/185/Agriculture185','SELECTION OF AGENCY TO LEASE OUT ESTABLISHED TWO MT PER HOUR CAPACITY RICE MILL AT UDAIPUR UNDER DEPTT OF AGRI AND F W','2020-07-28','2020-07-29','uploads/sample.zip',0,4,0,50000),(186,'Agriculture2','1000','2020/186/Agriculture186','Installation of 01 one no Small Bore Deep tubewell of 150 mm X 100mm size with 3 HP submersible pump having capacity 2000 GPH at 40 Mtr head at 3000 MT fertilizer godown at Padmabil under Khowai District','2020-07-28','2020-07-29','uploads/sample.zip',0,4,0,10000),(187,'Agriculture3`','500','2020/187/Agriculture187','Request for Proposal for operation of Project Management Unit (PMU) for preparation of terms of resource management, procurement, MIS, capacity building etc in the Department of Agriculture and Farmers Welfare, Tripura','2020-07-28','2020-07-29','uploads/sample.zip',0,4,0,25000),(188,'Project/Protection of Shanti Pali','500','2020/188/Water Supply dept188','MGNREGA Project/Protection of shanti pali from erosion of Manu River under Manu VC within the jurisdiction of Manu R.D. Block during the year 2019-20/ Bank Revetment work by CC block (1-4-8), L- 90.00 M. / SH- Supply of River Sand.','2020-07-28','2020-07-29','uploads/120626973980.zip',0,6,0,1000),(189,'Household Tap Connection','500','2020/189/JAL189','JJM Schemes under South Tripura District/ S.H.- Providing Functional Household Tap Connection (FHTC) to individual house hold at different habitations of Satchand RD Block under Atal Jaladhara Yojana during the year 2020-21 (Group-III).','2020-07-29','2020-07-29','uploads/120628135123258.zip',0,6,0,100),(190,'Development of Wells','1000','2020/190/JAL190','Drilling Development of 08(Eight) Nos Deep Tube Wells with Contractor Own Direct Rotary Rig and other machineries and equipments in different locations of Gomati District under DWS Udaipur Division during the year 2020-21.','2020-07-27','2020-07-28','uploads/12062814618973.zip',0,6,0,2000),(191,'Smart Road','500','2020/191/ELEC191','Construction of smart roads including underground utilities electrification, junction improvement and smart street features and associated works in saharanpur with five year of o and m period including dlp under smart city mission','2020-07-30','2020-07-31','uploads/sample.zip',0,5,0,500000),(192,'Galvanization','200','2020/192/ELEC192','Hot dip galvanization of 11745 mt electric line materials such as cross arms, clamps, stay rods etc and lattice tower parts, fabricated at the mechanical facilities of kseb ltd. for the year 2020-21.','2020-07-30','2020-07-30','uploads/sample.zip',0,5,0,1000000),(193,'Hydro Electric Project','300','2020/193/ELEC193','Tender for chinnar small hydro electric project (24mw/ 76.45 mu) ‚Äì phase ii - construction of power house, valve house, tail race, switch yard and hydro mechanical & electro mechanical works.','2020-07-30','2020-07-31','uploads/sample.zip',0,5,0,1000000),(194,'Construction of Hand Basins','900','2020/194/JAL194','CONSTRUCTION OF 05 NoS. WASH BASIN AND ATTACHED TOILET FOR DIFFERENT AWC CENTRE OF Durgacherra VC, North Longtharai VC, West CMN, East Govindbari VC of CMN RD Block.','2020-07-30','2020-07-30','uploads/12062912163073.zip',0,6,0,1000);
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
  `bidding_amt` varbinary(255) NOT NULL,
  `is_approved` varbinary(255) NOT NULL,
  `date_of_approval` varchar(10) DEFAULT NULL,
  `status` varbinary(255) NOT NULL,
  `location` varbinary(255) DEFAULT NULL,
  `timestamp` varchar(50) DEFAULT NULL,
  `time_period` varbinary(255) DEFAULT NULL,
  `reasons` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`etd_id`),
  KEY `et_id` (`et_id`),
  KEY `vd_id` (`vd_id`),
  KEY `vcd_id` (`vcd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_tender_vendor`
--

LOCK TABLES `e_tender_vendor` WRITE;
/*!40000 ALTER TABLE `e_tender_vendor` DISABLE KEYS */;
INSERT INTO `e_tender_vendor` VALUES (116,178,63,22,_binary 'è†d†u\0{E0M',_binary 'kAÉé\«¡B\ÕÒP/[aê\ﬂ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-19T12:25:10.321Z',_binary '∞Ñ”Ω\ÕW≤¶Úîhæ~_\"¡',_binary '\¬\nπêùkQwzÇlÄvπ]'),(117,179,63,22,_binary 'ä1\Ï¶^k LG∑Ñ',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary 'JT\Õ\ÏP\‡πÒ3/|W\‡HT¶6Ù¢_j©œ†\ÿ√áx\Á','2020-07-18T12:25:10.321Z\r\n',_binary '∏;+§Ä\‚≥\Óü\rP\Â?',NULL),(118,180,63,22,_binary '˚œû\–\Î!]qø˝Åd∑Ù',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-17T12:25:10.321Z\r\n',_binary '∞Ñ”Ω\ÕW≤¶Úîhæ~_\"¡',NULL),(119,178,1,1,_binary '\œ9R\‹\…π=Ä¿Ñ',_binary '\Ì#ˆ\Èm\›,qU\Ã<á\ÿ>',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-17T12:25:10.321Z\r\n',_binary '\‰˝\Œﬁ≤I-“£\…7\Ô9',_binary '5Ñ¥`í\\G¶D›ïÕ¶\¬@'),(120,179,1,1,_binary '•\‹˙.NQ\ ‰®∏üàü',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-20T12:25:10.321Z\r\n',_binary '\‰˝\Œﬁ≤I-“£\…7\Ô9',NULL),(121,180,1,1,_binary '•\‹˙.NQ\ ‰®∏üàü',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-17T12:25:10.321Z\r\n',_binary '\‰˝\Œﬁ≤I-“£\…7\Ô9',NULL),(122,184,109,33,_binary 'C\œ!˚ìPßV\Õ\…4˘Œ∞D',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '/\≈mEóù8É¶\·Ú\Ë',NULL,NULL,_binary '†O\\à˝˙ZF/\Â˜°',NULL),(123,183,111,35,_binary 'n´\Î¯\Ï€É\ \≈\›Y:\‰',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary 'W>\»eˇÖ…πõÛ\\E\'?Ûû',NULL,NULL,_binary '\ÃQÇå˛cLîE≠4Y>Û',NULL),(124,182,109,33,_binary 'OöT®~∏:UÖMçÜFú\÷',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '∞\Áò°ì©\«\Œ.¯√ò¥Ú','2020-07-28T10:38:55.504Z',_binary 'ÅH.i—´Sı\”[Æ\€H∑',NULL),(125,182,111,35,_binary 'Wa\ ‘∑\Ô\Í76˜V€ÇrB',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary 'W>\»eˇÖ…πõÛ\\E\'?Ûû',NULL,NULL,_binary '\ÃQÇå˛cLîE≠4Y>Û',NULL),(126,188,109,33,_binary '\«Vè	©6¥≥≤º\‚',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '/\≈mEóù8É¶\·Ú\Ë',NULL,NULL,_binary '\03u\≈\‡≥c\rY?\Ó\—R∂7˜',NULL),(127,183,109,33,_binary 'cK:Oò\ÃHŒ´Y\’`õ~',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\nÜ`∞∏\ﬂ}m\ $GßHµ\„',NULL,NULL,_binary 'Ûòø±\È\Á∞…êÜ0ñ.-',NULL),(128,182,113,37,_binary '\œ´)ıSo\Ãy\“\€5=',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary 'ñ¯æ5IÇ†ø/âpy\‚ya¡‹†`Å\Ãdó\n\„Ob\Í','2020-07-28T11:58:47.409Z',_binary '\03u\≈\‡≥c\rY?\Ó\—R∂7˜',NULL),(129,182,110,34,_binary 'géë?/Ç;)j\… 0ãÉ¶',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary 'Eª¶D\“nz	é_3äéY=','2020-07-29T08:04:35.224Z',_binary '}rVˆ\·qàO\’ﬂèJ\À',NULL),(130,183,114,38,_binary 'cK:Oò\ÃHŒ´Y\’`õ~',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary 'W>\»eˇÖ…πõÛ\\E\'?Ûû',NULL,NULL,_binary '\ÃQÇå˛cLîE≠4Y>Û',NULL),(131,182,114,38,_binary 'Wa\ ‘∑\Ô\Í76˜V€ÇrB',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '/\≈mEóù8É¶\·Ú\Ë',NULL,NULL,_binary ' ¶¢c3Ò‘πIã0Ñc\ÁÄ',NULL),(132,189,109,33,_binary '\"\Ì*e™Û\≈[*Ÿë',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary 'W>\»eˇÖ…πõÛ\\E\'?Ûû',NULL,NULL,_binary 'C“á~ÑT\„\‘Sä\·',NULL),(133,189,110,34,_binary '\Ô¸tÄfr\“kBÆû/ˆ?',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary 'Eª¶D\“nz	é_3äéY=','2020-07-29T07:56:55.787Z',_binary 'kAÉé\«¡B\ÕÒP/[aê\ﬂ',NULL),(134,183,112,36,_binary 'cK:Oò\ÃHŒ´Y\’`õ~',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '	ÏΩ°\≈N†\È& ¯¯≥ÔÉé','2020-07-29T06:54:29.453Z',_binary ' É0\"bu‘ÖBA¿l\ﬁ¯8',NULL),(135,189,112,36,_binary '\"\Ì*e™Û\≈[*Ÿë',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '	ÏΩ°\≈N†\È& ¯¯≥ÔÉé','2020-07-29T07:14:00.416Z',_binary '˛>\…ì\È-m\∆TX¡ı.®D',NULL),(136,190,112,36,_binary 'A\ZJ\ÿ\‚8¯e\ÏßR=¨',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '\‹U\⁄;\ŒY\rΩ˙¡ãÆù]','2020-07-29T07:17:34.191Z',_binary ')ı\÷m°†\ÀB\Îï	3x',NULL),(137,191,112,36,_binary ')\Ô˘˛\ÓE;%\È\Œ\ƒvk/',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '\“Díw˙v\ZVóEù2UZ}','2020-07-29T07:20:15.745Z',_binary '›µØ<ßº>ù‰∂É\‚µK\»',NULL),(138,192,112,36,_binary '∂∂\≈E1s¨n≠HF$pV9',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary '	ÏΩ°\≈N†\È& ¯¯≥ÔÉé','2020-07-29T07:22:55.951Z',_binary 'E\ƒ˚º=Vü°2RE∂C6ì',NULL),(140,190,110,34,_binary 'A\ZJ\ÿ\‚8¯e\ÏßR=¨',_binary '∞…Æ≥\'ˆ[í¯êÇ¥»Æ',NULL,_binary '\Ê†\nD_\√#Æ\ÃHCl',_binary 'Eª¶D\“nz	é_3äéY=','2020-07-29T12:08:14.736Z',_binary '\ÃQÇå˛cLîE≠4Y>Û',NULL);
/*!40000 ALTER TABLE `e_tender_vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `email_address` varchar(50) NOT NULL,
  `feedback` text NOT NULL,
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_uri`
--

DROP TABLE IF EXISTS `file_uri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_uri` (
  `furi_id` int(11) NOT NULL AUTO_INCREMENT,
  `furi1` varbinary(255) DEFAULT NULL,
  `furi2` varbinary(255) DEFAULT NULL,
  `etd_id` int(11) NOT NULL,
  `f_type` varchar(50) NOT NULL,
  PRIMARY KEY (`furi_id`),
  UNIQUE KEY `etd_id` (`etd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_uri`
--

LOCK TABLES `file_uri` WRITE;
/*!40000 ALTER TABLE `file_uri` DISABLE KEYS */;
INSERT INTO `file_uri` VALUES (90,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',116,'doc'),(91,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',117,'doc'),(92,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',118,'doc'),(93,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',119,'doc'),(94,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',120,'doc'),(95,_binary '1oàF˙]EÛ|¶4%XÄS¢\Ë4\Ó†B˝G\À3¨–ìÖÄê\ÿ#¸mbZÖÉht˛má¯\—wd¬πwdã\È\∆&h',_binary '1oàF˙]EÛ|¶4%XÄÆd›ö\'P®¡¢(ø±Ø%\"a#7\ ¸#zÑø\‡ñ`≥NGjª:PG!y¸äH˛',121,'doc'),(96,_binary '1oàF˙]EÛ|¶4%XÄüëE˜oY\·0|ávT6+Ÿ©ª`\ÃE\‹\ÔÒG£\‰{\Ô\—G\Ÿw§Æ\€\\…≥^D±áu',_binary '1oàF˙]EÛ|¶4%XÄö§¢mmen?¿\'˘ïˆMì∞¡ë.,3Û[q ∞Y≤\–h∞*V\›ˇ¡çs6ö}',124,'link'),(97,_binary '1oàF˙]EÛ|¶4%XÄ˙ª*#mófÕ∑=¥ê|jÙñ\01lD¢»ãπ\Œ¿\¬^\n\È\⁄¸\œƒ∑Û-cB\Íﬂ°û',_binary '1oàF˙]EÛ|¶4%XÄ∞ãEåG®\‹Il\€Ÿü0ä.ø¥¬Ç\…ÙÒqfø\‚∂}V\Ïù\ ≥.ŸØ~;',127,'link'),(99,_binary '1oàF˙]EÛ|¶4%XÄLâæcA\ﬁTcÖú#¨≈≠!úQ\Ÿ]\r8\Ëi%$BF\”\∆Dñò\Zc\Ãu\ƒ∆ôRÜ\–\‘\È\„W',_binary '1oàF˙]EÛ|¶4%XÄ.®õÇÆæª¯@úë+\05S˘6[\ÂQbÑ¿\·\':*µ¸oúy\ÊMâ\nF¿≈ãåãO',128,'link'),(101,_binary '1oàF˙]EÛ|¶4%XÄ\›m¡:\⁄\ÁS\»\\Wı≥_ΩâVOrè)∞∫Æ]ÉT\\\„:Ç2µQo∫¥Û\Ó-ﬁ¢',_binary '1oàF˙]EÛ|¶4%XÄ8ÄZåà\0òÆ|µV\0}zL\ÁÆ¯øI\ æÙ\Îã¡ß*d\ÃYR)]\Ê\Îù\Ÿ\ƒ‘Ñ^c_ù˚',129,'link'),(103,_binary '1oàF˙]EÛ|¶4%XÄ¥\ &Ê≤∂\ﬁCõ±\“\∆_™ò\œ>£í7¶\⁄Z¯Ãöù±»ìôV´\⁄\ M\È◊∏Ö',_binary '1oàF˙]EÛ|¶4%XÄf-X}æ4S¨óî\‹1q\Óπ\'Ñ@ö≠\ÿ\ﬁM&é˝1S#°á¯…ërï:Ö\"\Ó?',134,'link'),(105,_binary '1oàF˙]EÛ|¶4%XÄºn¿à}˙áÉ(ı8ãAˆyÌö†∑SßX˙M\ Cˇ\ÂUT%á˜√Ææ¨†\ÂáB',_binary '1oàF˙]EÛ|¶4%XÄ∆æ)˝CXDQ‡º†`ò{\Z£¿\Ô*ì\Zè¨≥XÄïÖ\Î§w\ÿ˚ªõ1Ç¥˛^˙',135,'link'),(107,_binary '1oàF˙]EÛ|¶4%XÄ˛]û¯ÙkBd¸\»hûs0\—kV\ÀfYH`{£z˛Ûq\Ï˝\¬\Ï¿.<ßì\‘IÑz+',_binary '1oàF˙]EÛ|¶4%XÄN\‡¥	õ\ÏN\À»´ö\«q|t∫#8\ﬁbo!V.DÛÛÇ/\'2+Ò€Ω-:\ÊM\÷Uúøú',133,'link'),(109,_binary '1oàF˙]EÛ|¶4%XÄAza¿Ú\n9x~2\Ë/wÑxMS\ P\—:F≠\€DA6“õ\Z≈éö\\P#5†˛*$≥',_binary '1oàF˙]EÛ|¶4%XÄ˘∑5^\”Vø\›\Ìg\Ó\÷QI\—?ª’´1∂\Íë,ï.rı]Zpy^¶:≤\∆DkyK•1Ò',140,'link');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
  `login_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` text NOT NULL,
  `role_id` tinyint(4) NOT NULL,
  `vcd_id` int(11) DEFAULT NULL,
  `ad_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `user_name_2` (`user_name`),
  KEY `v_id` (`vcd_id`),
  KEY `ad_id` (`ad_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_in_details`
--

LOCK TABLES `log_in_details` WRITE;
/*!40000 ALTER TABLE `log_in_details` DISABLE KEYS */;
INSERT INTO `log_in_details` VALUES (1,'winu','70f6ec26715872ea8e0d590f34bd0ac387dec6cbf2eb89043c52e4b2285ce5aa9cef67db4273a83488150e2c9ed5f926d4b5eadc50e303362a1f03588a2150d0',2,1,NULL),(10,'admin','1d255920ada6ac787656b393e9e0b5845aa1d975f1db4015f80904da4c232786444e6dc87e719981bd4d8596b4d0f937d6e464cbd7424a3a0aff6059fa0caee1',1,NULL,1),(16,'viraj456','e13efc991a9bf44bbb4da87cdbb725240184585ccaf270523170e008cf2a3b85f45f86c3da647f69780fb9e971caf5437b3d06d418355a68c9760c70a31d05c7',2,22,NULL),(28,'water_admin','c22e8b9af4e85e9cc2443eb3d369e5d89bcf153a566810f101f5644f6cfcb7173b26924ef4c6dacbf37f56382c223c95af4cb62dc840085794c5382226ee07a6',1,NULL,2),(29,'agro123','84348aeb0ed5c663e8237b6b1b11c83d52ff16a3920c9514473474c9b60a0b6d88d10ab125da43d0d0bdc78fd6f0db446cddfc13734e0e7f928143185784da1d',1,NULL,3),(30,'elec123','359075b4bd66ffb751f7b5c3a8d8e9615418ce79f173bb49227615385635c57c9491024f1caf5c21022ecf0d97738448bfbf1de11f0711a4e23cfb661dfff44f',1,NULL,4),(31,'virajsoln','27d667481d07b2e1f467a4dea4a5367427a6f0b2934e6845a86b09a2d7f88264dc9fdcaf7ebff5db6bdc7354108a9cabb90d71d0c746a5b8734cf07da5c946a6',2,33,NULL),(32,'100rabhyadav98','64379d30b05e5c7eb6747771f28b255b2989341214d2fa04dd787cab6f76430c56cfdb51c0140249e7b092a68af37754f02206c42d3c4054276b1ed4fa6360f7',2,34,NULL),(33,'deshmukhsanket','f92c403534424ca40516196063c7de425c141f6ea16a9b141adb8b4da82edf1fb0ee7d6ffe28cd8592b3b1474c2dbfffc7075f78b2fc6e574cdee264230bb861',2,35,NULL),(34,'priii99','9473544c8e206b2795418b6e0c759337bba9888c25e2e06b7326b2af215defb88ee82fae2175f164af44ba79bc06c3f8fddb9705dbc8be3d02524480634f7f80',2,36,NULL),(35,'afif2000','63621ff8cae0216e95056c678b8d2fed2b13363c2ddb17834e92cd56b9c31a27db8a619eecb11e18b034364c4eefa37b81229aa376350796a949c3e6b4aeb845',2,37,NULL),(36,'deshmukhsanky','f92c403534424ca40516196063c7de425c141f6ea16a9b141adb8b4da82edf1fb0ee7d6ffe28cd8592b3b1474c2dbfffc7075f78b2fc6e574cdee264230bb861',2,38,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_details`
--

LOCK TABLES `org_details` WRITE;
/*!40000 ALTER TABLE `org_details` DISABLE KEYS */;
INSERT INTO `org_details` VALUES (1,'Goverment Of India','7894561230','tiot@gmail.com','delhi','delhi','a','456123'),(2,'Don Bosco Inst of Tech','9876543210','dbit@gmail.com','Kurla','Maharashtra','Mumba','400070');
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
INSERT INTO `payment_transactions` VALUES (116,'20200717111212800110168243601725628','ORD272677257','1000','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(119,'20200717111212800110168243601725628','ORD272677257','1000','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(117,'20200717111212800110168243601725628','ORD272677257','4500','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(120,'20200717111212800110168243601725628','ORD272677257','4500','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(118,'20200717111212800110168243601725628','ORD272677257','7000','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(121,'20200717111212800110168243601725628','ORD272677257','7000','TXN_SUCCESS','01','0','2020-07-17 17:02:33.0','777001676985216','HDFC','Bank of Bahrain and Kuwait','DC'),(124,'20200728111212800110168595501772255','ORD1851005327','200.00','TXN_SUCCESS','01','0.00','2020-07-28 14:25:14.0','777001221122469','HDFC','Bank of Bahrain and Kuwait','DC'),(126,'20200728111212800110168848101737578','ORD5510553526','500.00','TXN_SUCCESS','01','0.00','2020-07-28 17:05:05.0','777001084615250','HDFC','Bank of Bahrain and Kuwait','DC'),(127,'20200728111212800110168870801746302','ORD55935755','250.00','TXN_SUCCESS','01','0.00','2020-07-28 17:07:00.0','777001652443866','HDFC','Bank of Bahrain and Kuwait','DC'),(128,'20200728111212800110168325301781630','ORD6881720407','200.00','TXN_SUCCESS','01','0.00','2020-07-28 17:11:37.0','777001953733556','HDFC','Bank of Bahrain and Kuwait','DC'),(129,'20200728111212800110168385301747192','ORD1754236421','200.00','TXN_SUCCESS','01','0.00','2020-07-28 17:11:59.0','777001450562776','HDFC','Bank of Bahrain and Kuwait','DC'),(128,'20200728111212800110168208301749560','ORD7176385422','200.00','TXN_SUCCESS','01','0.00','2020-07-28 17:12:17.0','777001533692433','HDFC','Bank of Bahrain and Kuwait','DC'),(122,'20200728111212800110168627103160633','ORD7378411820','199.00','TXN_SUCCESS','01','0.00','2020-07-28 17:12:21.0','777001875285825','HDFC','Bank of Bahrain and Kuwait','DC'),(128,'20200728111212800110168568301774164','ORD9094076552','200.00','TXN_SUCCESS','01','0.00','2020-07-28 17:12:56.0','777001105951833','HDFC','Bank of Bahrain and Kuwait','DC'),(131,'20200729111212800110168686101749447','ORD1531590443','200.00','TXN_SUCCESS','01','0.00','2020-07-29 11:21:26.0','777001222542069','HDFC','Bank of Bahrain and Kuwait','DC'),(133,'20200729111212800110168576601768788','ORD5116265499','500.00','TXN_SUCCESS','01','0.00','2020-07-29 11:57:51.0','777001575498013','HDFC','Bank of Bahrain and Kuwait','DC'),(133,'20200729111212800110168206901751439','ORD2499912045','500.00','TXN_SUCCESS','01','0.00','2020-07-29 12:00:01.0','777001999891203','HDFC','Bank of Bahrain and Kuwait','DC'),(134,'20200729111212800110168475301755511','ORD6517337082','250.00','TXN_SUCCESS','01','0.00','2020-07-29 11:58:27.0','777001981660461','HDFC','Bank of Bahrain and Kuwait','DC'),(134,'20200729111212800110168475301755511','ORD6517337082','250.00','TXN_SUCCESS','01','0.00','2020-07-29 11:58:27.0','777001981660461','HDFC','Bank of Bahrain and Kuwait','DC'),(135,'20200729111212800110168054601766314','ORD6011978806','500.00','TXN_SUCCESS','01','0.00','2020-07-29 12:40:26.0','777001257864793','HDFC','Bank of Bahrain and Kuwait','DC'),(136,'20200729111212800110168692501752496','ORD7904280587','1000.00','TXN_SUCCESS','01','0.00','2020-07-29 12:44:52.0','777001639745193','HDFC','Bank of Bahrain and Kuwait','DC'),(137,'20200729111212800110168257901754856','ORD6184825538','500.00','TXN_SUCCESS','01','0.00','2020-07-29 12:48:36.0','777001146785053','HDFC','Bank of Bahrain and Kuwait','DC'),(138,'20200729111212800110168546801752747','ORD4743192076','200.00','TXN_SUCCESS','01','0.00','2020-07-29 12:51:24.0','777001983662700','HDFC','Bank of Bahrain and Kuwait','DC'),(140,'20200729111212800110168051101766324','ORD2312856588','1000.00','TXN_SUCCESS','01','0.00','2020-07-29 17:27:21.0','777001503567693','HDFC','Bank of Bahrain and Kuwait','DC');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1ea2e26a-8ea3-4f1c-baba-027fc4cf9189',1596035594,'{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2020-07-29T15:13:10.990Z\",\"httpOnly\":true,\"path\":\"/\"},\"vd_id\":110,\"vcd_id\":34,\"digi_access\":1}'),('ad77dcd8-cbd0-4c5a-8d40-fd7501c6702d',1596041117,'{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2020-07-29T15:37:16.611Z\",\"httpOnly\":true,\"path\":\"/\"},\"ad_id\":2,\"ad_org_id\":1,\"ad_dept_id\":6,\"vd_id\":113,\"vcd_id\":37,\"digi_access\":1}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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
  `vcd_email` varchar(320) DEFAULT NULL,
  `vcd_designation` varchar(20) NOT NULL,
  `vd_id` int(11) NOT NULL,
  `digi_access` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vcd_id`),
  KEY `vd_id` (`vd_id`),
  CONSTRAINT `v_contact_details_ibfk_1` FOREIGN KEY (`vd_id`) REFERENCES `vendor_details` (`vd_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v_contact_details`
--

LOCK TABLES `v_contact_details` WRITE;
/*!40000 ALTER TABLE `v_contact_details` DISABLE KEYS */;
INSERT INTO `v_contact_details` VALUES (1,'Winston','Mr.','2020-06-09','456745674567','8975647845','winstonsequeria@gmail.com','CEO',1,0),(22,'asdfghj','Mr','2020-05-25','123412341234','8976853951','v@gmail.com','ceo',63,1),(33,'Viraj Tandel','Mr','2020-07-01','123412341234','8976853951','virajtandel72@gmail.com','CEO',109,1),(34,'Saurabh Yadav','Mr','1998-09-25','369369369369','9640278397','survir44@gmail.com','Senior Developer',110,1),(35,'Sanket Deshmukh','Mr','2000-05-13','070707070707','9702717188','meetsanket24@gmail.com','CEO',111,0),(36,'Priya Singh','Ms','1999-04-08','147147147147','8329779783','spriya1252012@gmail.com','CEO',112,1),(37,'Vijay Kumar','Mr','1980-10-30','258258258258','9632014587','vijay@denton.com','Vice Manager',113,1),(38,'Sanket Deshmukh','Mr','2000-05-13','070707070707','9702717188','meetsanket24@gmail.com','CEO',114,0);
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
  `v_name` varchar(50) DEFAULT NULL,
  `v_address` varchar(100) DEFAULT NULL,
  `v_yoe` varchar(4) NOT NULL,
  `v_email` varchar(320) NOT NULL,
  `v_mobile` varchar(12) NOT NULL,
  `v_reg_no` varchar(25) NOT NULL,
  `v_state_id` varchar(30) NOT NULL,
  `v_dist_id` varchar(30) NOT NULL,
  `v_city_id` varchar(30) NOT NULL,
  `v_pincode` varchar(6) NOT NULL,
  `v_legal_id` varchar(20) NOT NULL,
  `v_pan` varchar(10) NOT NULL,
  `v_is_verified` varchar(1) NOT NULL,
  `v_gst` varchar(25) DEFAULT NULL,
  `schemes` varchar(100) DEFAULT NULL,
  `staff` int(11) DEFAULT NULL,
  `equipment` int(11) DEFAULT NULL,
  `india_equipment` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`vd_id`),
  UNIQUE KEY `v_reg_no` (`v_reg_no`),
  UNIQUE KEY `v_pan` (`v_pan`),
  UNIQUE KEY `v_gst` (`v_gst`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_details`
--

LOCK TABLES `vendor_details` WRITE;
/*!40000 ALTER TABLE `vendor_details` DISABLE KEYS */;
INSERT INTO `vendor_details` VALUES (1,'sequeria industry','andheri east','1772','ws@gmail.com','7894561230','D123N67','Himachal Pradesh [HP]','4','Bilaspur','400706','Limited Company','Rf234Rt','0','789456',NULL,NULL,NULL,NULL,NULL),(63,'fghjk','dfghjk','2020','v@gmail.com','7894561230','bhunji','Chandigarh [CH]','-1','Chandigarh','456789','Jointventure','6894561230','0','789456123012352',NULL,NULL,NULL,NULL,NULL),(109,'surya solutions','B-200 sector-2 Airoli','2016','virajtandel72@gmail.com','8976853951','A12345B56789087','Maharashtra [MH]','-1','Mumbai City','400708','Limited Company','9563214785','0','652398741258963','MSME scheme',461,66,40,NULL),(110,'Sky Info Tech Pvt Ltd','Ramchhaya 4577/15,Agarwal Road,Darya Ganj','1971','yadavsaurabh2509@gmail.com','9640278397','L27100MH1907PLC000260','Delhi [DL]','-1','New Delhi','110011','Limited Company','SKYPE2509P','0','22SKYPE2509P1Z5','Pradhan Mantri Mudra Yojana',50,30,15,NULL),(111,'Sanky Pvt Ltd','J.M. Road, Bangalore','2000','sanketdeshmukh880@gmail.com','9082171403','U26532MH2000PLC951357','Karnataka [KR]','-1','Bangalore','400078','Limited Company','DESCD8462S','0','27DESCD8462S1Z7','Stand Up India',500,25,20,NULL),(112,'Budding Techies','Building A, Plot No. EL-102/2, ','1960','contact@gmail.com','8888999900','U21000MH1960PLC123456','Maharashtra [MH]','-1','Mumbai','400008','Limited Company','AAAPZ1234C','0','27AAAPZ1234C1Z5','Made In India',200000,210000,210000,NULL),(113,'Denton','20341 Whitworth Institute 405 Whitworth Seattle WA 98052','2000','denton@mail.com','9087654321','L27100MH1907PLC000262','Maharashtra [MH]','-1','Mumbai','400070','Limited Company','A0B1C2D3E4','0','27DDDDD0000B1W5','MSME Business Loans, MUDRA Loans',200,500,250,NULL),(114,'SanDesh Pvt Ltd','Near Shivaji Talao, M. G. Road, Jalgaon','2000','sanketdeshmukh880@gmail.com','9082171403','L13579MH2000PLC741963','Maharashtra [MH]','-1','Jalgaon','412005','Limited Company','SEDCD6842X','0','27SEDCD6842X2Z9','Stand Up India',1000,120,92,NULL);
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
  `file_uri` varbinary(255) NOT NULL,
  `file_type` varchar(35) NOT NULL,
  KEY `vendor_file_ibfk_1` (`vd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;
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

-- Dump completed on 2020-07-29 15:11:04
