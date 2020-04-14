-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: aadharDB
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

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
-- Table structure for table `OTP`
--

DROP TABLE IF EXISTS `OTP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OTP` (
  `otpid` int(11) NOT NULL AUTO_INCREMENT,
  `aadharno` varchar(15) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `validtill` datetime NOT NULL,
  `isUsed` tinyint(4) NOT NULL,
  `reference_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`otpid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OTP`
--

LOCK TABLES `OTP` WRITE;
/*!40000 ALTER TABLE `OTP` DISABLE KEYS */;
INSERT INTO `OTP` VALUES (1,'123412341234','456123','2020-03-12 09:22:19',1,4),(8,'123412341234','117340','2020-03-12 16:45:17',1,1),(9,'123412341234','248001','2020-03-12 16:47:13',1,1),(10,'123412341234','782065','2020-03-12 16:49:50',1,1),(11,'123412341234','665279','2020-03-12 16:49:26',0,1),(12,'123412341234','674782','2020-03-12 16:52:10',0,1),(13,'456745674567','122786','2020-03-16 20:09:39',1,1),(14,'70707070707','792165','2020-04-03 06:30:42',1,1),(15,'70707070707','332303','2020-04-03 06:31:50',1,1),(16,'70707070707','745690','2020-04-03 06:33:28',1,1),(17,'70707070707','500541','2020-04-03 06:49:47',1,1),(18,'70707070707','306902','2020-04-03 06:52:28',1,1),(19,'70707070707','975346','2020-04-14 07:22:37',1,1),(20,'70707070707','568069','2020-04-14 07:23:09',1,1),(21,'70707070707','398173','2020-04-14 07:24:19',1,1);
/*!40000 ALTER TABLE `OTP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aadhar_details`
--

DROP TABLE IF EXISTS `aadhar_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `deletion_date` date DEFAULT NULL,
  PRIMARY KEY (`aadharno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aadhar_details`
--

LOCK TABLES `aadhar_details` WRITE;
/*!40000 ALTER TABLE `aadhar_details` DISABLE KEYS */;
INSERT INTO `aadhar_details` VALUES ('070707070707','9702717188','2000-05-13','Sanket Deshmukh','meetsanket24@gmail.com','Bhandup (W.), Mumbai - 400078','2020-03-12','2020-03-15',0,NULL),('456745674567','8976853955','2020-03-10','softman','softmandev123@gmail.com','b-300 sector-2','2020-03-12','2020-03-12',0,NULL);
/*!40000 ALTER TABLE `aadhar_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-14  7:33:06
