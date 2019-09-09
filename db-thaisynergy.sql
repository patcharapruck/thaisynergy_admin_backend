-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 09, 2019 at 04:36 AM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `THAISYNERGY`
--
CREATE DATABASE IF NOT EXISTS `THAISYNERGY` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `THAISYNERGY`;

-- --------------------------------------------------------

--
-- Table structure for table `ADDRESS`
--

CREATE TABLE `ADDRESS` (
  `ADDRESS_ID` int(11) NOT NULL,
  `ADDRESS_HOUSE_NUMBER` varchar(10) NOT NULL,
  `ADDRESS_VILLAGE_NUMBER` varchar(10) DEFAULT NULL,
  `ADDRESS_LANE` varchar(255) DEFAULT NULL,
  `ADDRESS_STREET` varchar(255) DEFAULT NULL,
  `ADDRESS_LOCALITY` varchar(255) DEFAULT NULL,
  `ADDRESS_POSTAL_CODE` varchar(5) NOT NULL,
  `ADDRESS_LATITUDE` decimal(10,7) DEFAULT NULL,
  `ADDRESS_LONGITUDE` decimal(10,7) DEFAULT NULL,
  `SUBDISTRICT_ID` int(11) DEFAULT NULL,
  `ADDRESS_STATUS_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ADDRESS`
--

INSERT INTO `ADDRESS` (`ADDRESS_ID`, `ADDRESS_HOUSE_NUMBER`, `ADDRESS_VILLAGE_NUMBER`, `ADDRESS_LANE`, `ADDRESS_STREET`, `ADDRESS_LOCALITY`, `ADDRESS_POSTAL_CODE`, `ADDRESS_LATITUDE`, `ADDRESS_LONGITUDE`, `SUBDISTRICT_ID`, `ADDRESS_STATUS_ID`) VALUES
(1, '2', NULL, NULL, 'ถนนเฟื่องนคร', NULL, '10200', '14.8746503', '100.7686738', 3, 1),
(2, '2', NULL, NULL, 'ถนนเฟื่องนคร', NULL, '10200', NULL, NULL, 3, 2),
(3, '1', '1', '1', '1', '1', '1', NULL, NULL, 1, 1),
(4, '1', '1', '1', '1', '1', '1', '1.0000000', '1.0000000', 1, 2),
(5, 'test', 'test', 'test', 'test', 'test', 'test', NULL, NULL, 1, 1),
(6, '1', '1', '1', '1', '1', '1', NULL, NULL, 1, 1),
(7, '1', '1', '1', '1', '1', '1', '1.0000000', '1.0000000', 1, 2),
(8, 'test', 'test', 'test', 'test', 'test', 'test', NULL, NULL, 1, 1),
(9, '1', '1', '1', '1', '1', '1', NULL, NULL, 1, 1),
(10, '1', '1', '1', '1', '1', '1', '1.0000000', '1.0000000', 1, 2),
(11, 'test', 'test', 'test', 'test', 'test', 'test', NULL, NULL, 1, 1),
(12, '5', '21', 'rsdf', 'dsdvs', '5', '45986', NULL, NULL, 1, 1),
(13, '54', '5', 'dvfdvd', 'fddf', '54', '54545', '1.0000000', '1.0000000', 2, 2),
(14, '5', '21', 'rsdf', 'dsdvs', '5', '45986', NULL, NULL, 1, 1),
(15, '54', '5', 'dvfdvd', 'fddf', '54', '54545', '1.0000000', '1.0000000', 2, 2),
(16, '5', '21', 'rsdf', 'dsdvs', '5', '45986', NULL, NULL, 1, 1),
(17, '54', '5', 'dvfdvd', 'fddf', '54', '54545', '1.0000000', '1.0000000', 2, 2),
(18, '5', '21', 'rsdf', 'dsdvs', '5', '45986', NULL, NULL, 1, 1),
(19, '54', '5', 'dvfdvd', 'fddf', '54', '54545', '1.0000000', '1.0000000', 2, 2),
(20, '5', '21', 'rsdf', 'dsdvs', '5', '45986', NULL, NULL, 1, 1),
(21, '54', '5', 'dvfdvd', 'fddf', '54', '45112', '1.0000000', '1.0000000', 2, 2),
(22, '65', '5', 'fdvbdf', 'cfvsfv', 'dvdfbvdf', '12336', NULL, NULL, 2, 1),
(23, '11', '1', 'dfd', 'dd', '11', '11111', NULL, NULL, 2, 1),
(24, '11', '1', 'fdf', 'ff', '11', '11111', '1.0000000', '1.0000000', 2, 2),
(25, '11', '1', 'fff', 'vgv', 'ggg', '11111', NULL, NULL, 3, 1),
(26, '', '', '', '', '', '', NULL, NULL, 2, 1),
(27, '', '', '', '', '', '', '1.0000000', '1.0000000', 2, 2),
(28, '', '', '', '', '', '', NULL, NULL, 2, 1),
(29, '', '', '', '', '', '', '1.0000000', '1.0000000', 2, 2),
(30, '', '', '', '', '', '', NULL, NULL, 2, 1),
(31, '', '', '', '', '', '', '1.0000000', '1.0000000', 2, 2),
(32, '', '', '', '', '', '', NULL, NULL, 2, 1),
(33, '', '', '', '', '', '', '1.0000000', '1.0000000', 2, 2),
(36, 'test', 'test', 'test', 'test', 'test', 'test', NULL, NULL, 1, 1),
(37, '1', '1', '1', '1', '1', '1', NULL, NULL, 1, 1),
(38, '1', '1', '1', '1', '1', '1', '1.0000000', '1.0000000', 1, 2),
(39, 'test', 'test', 'test', 'test', 'test', 'test', NULL, NULL, 1, 1),
(40, '135', '11', 'fff', 'j', '135', '45122', NULL, NULL, 2, 1),
(41, '135', '11', 'fff', 'j', '135', '45122', '1.0000000', '1.0000000', 2, 2),
(42, '55', '5', 'jhjkh', 'khkuhuih', 'huihuih', '', NULL, NULL, 2, 1),
(43, '45', '5', 'jhjk', 'hjjkhjkh', '45', '45011', NULL, NULL, 1, 1),
(44, '45', '5', 'jhjk', 'hjjkhjkh', '45', '45011', '1.0000000', '1.0000000', 1, 2),
(45, '564', '5', 'jiohkjuh', 'hukjiohu', 'uhuih', '46225', NULL, NULL, 2, 1),
(46, '54', '5', 'iyg', 'yiygyiu', '54', '65655', NULL, NULL, 2, 1),
(47, '54', '5', 'iyg', 'yiygyiu', '54', '65655', '1.0000000', '1.0000000', 2, 2),
(48, '65', '5', 'jgfghjg', 'jhjkuhui', 'kuyhjukhui', '', NULL, NULL, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ADDRESS_STATUS`
--

CREATE TABLE `ADDRESS_STATUS` (
  `ADDRESS_STATUS_ID` int(11) NOT NULL,
  `ADDRESS_STATUS_NAME` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ADDRESS_STATUS`
--

INSERT INTO `ADDRESS_STATUS` (`ADDRESS_STATUS_ID`, `ADDRESS_STATUS_NAME`) VALUES
(1, 'ที่อยู่ตามทะเบียนบ้าน'),
(2, 'ที่อยู่ปัจจุบัน');

-- --------------------------------------------------------

--
-- Table structure for table `CARETAKER`
--

CREATE TABLE `CARETAKER` (
  `CARETAKER_ID` int(11) NOT NULL,
  `CARETAKER_REQUIREMENT` tinyint(1) NOT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `CARETAKER`
--

INSERT INTO `CARETAKER` (`CARETAKER_ID`, `CARETAKER_REQUIREMENT`, `MEMBER_ID`) VALUES
(3, 1, 2),
(5, 1, 9),
(10, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `DISABILITY`
--

CREATE TABLE `DISABILITY` (
  `DISABILITY_ID` int(11) NOT NULL,
  `DISABILITY_NAME` varchar(255) NOT NULL,
  `DISABILITY_INPUT_TYPE` varchar(255) DEFAULT NULL,
  `DISABILITY_TYPE_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `DISABILITY`
--

INSERT INTO `DISABILITY` (`DISABILITY_ID`, `DISABILITY_NAME`, `DISABILITY_INPUT_TYPE`, `DISABILITY_TYPE_ID`) VALUES
(1, 'ตาบอด 2 ข้าง', NULL, 1),
(2, 'ตาบอดข้างเดียว', NULL, 1),
(3, 'อื่นๆ', 'text', 1),
(4, 'หูหนวกทั้ง 2 ข้าง', NULL, 2),
(5, 'หูหนวกข้างเดียว', NULL, 2),
(6, 'อื่นๆ', 'text', 2),
(7, 'อัมพาต/อัมพฤกษ์', NULL, 3),
(8, 'สมองพิการ(ซีพี.)', NULL, 3),
(9, 'กล้ามเนื้ออ่อนแรง', NULL, 3),
(10, 'แขน/ขาขาด', NULL, 3),
(11, 'อื่นๆ', 'text', 3),
(12, 'เป็นผู้ป่วยทางจิต', NULL, 4),
(13, 'อื่นๆ', 'text', 4),
(14, 'ฝึกให้ช่วยตนเองไม่ได้ ต้องมีผู้ดูแล', NULL, 5),
(15, 'ฝึกอาชีพได้ด้วยตนเอง', NULL, 5),
(16, 'ระดับความสามารถ', 'text', 5),
(17, 'อื่นๆ', 'text', 5),
(18, 'ปัญหาทางการเรียนรู้', '', 6),
(19, 'การอ่าน', NULL, 6),
(20, 'การเขียน', NULL, 6),
(21, 'การคำนวณ/คณิตศาสตร์', NULL, 6),
(22, 'การฟัง/การจับความ', NULL, 6),
(23, 'อื่นๆ', 'text', 6),
(24, 'ความบกพร่องทางพัฒนาการด้านสังคม', NULL, 7),
(25, 'ภาษา/การสื่อความหมาย', NULL, 7),
(26, 'พฤติกรรมและอารมณ์', NULL, 7),
(27, 'อื่นๆ', 'text', 7);

-- --------------------------------------------------------

--
-- Table structure for table `DISABILITY_TYPE`
--

CREATE TABLE `DISABILITY_TYPE` (
  `DISABILITY_TYPE_ID` int(11) NOT NULL,
  `DISABILITY_TYPE_NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `DISABILITY_TYPE`
--

INSERT INTO `DISABILITY_TYPE` (`DISABILITY_TYPE_ID`, `DISABILITY_TYPE_NAME`) VALUES
(1, 'ทางการมองเห็น'),
(2, 'ทางการได้ยิน'),
(3, 'ทางการเคลื่อนไหว/ทางร่างกาย'),
(4, 'ทางจิตใจ/ทางพฤติกรรม'),
(5, 'ทางสติปัญญา'),
(6, 'ทางการเรียนรู้'),
(7, 'ทางออทิสติก');

-- --------------------------------------------------------

--
-- Table structure for table `DISTRICT`
--

CREATE TABLE `DISTRICT` (
  `DISTRICT_ID` int(11) NOT NULL,
  `DISTRICT_CODE` int(11) NOT NULL,
  `DISTRICT_NAME_TH` varchar(150) NOT NULL,
  `DISTRICT_NAME_EN` varchar(150) NOT NULL,
  `PROVINCE_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `DISTRICT`
--

INSERT INTO `DISTRICT` (`DISTRICT_ID`, `DISTRICT_CODE`, `DISTRICT_NAME_TH`, `DISTRICT_NAME_EN`, `PROVINCE_ID`) VALUES
(1, 1001, 'เขต พระนคร', 'Phra Nakhon', 1);

-- --------------------------------------------------------

--
-- Table structure for table `EQUIPMENT`
--

CREATE TABLE `EQUIPMENT` (
  `EQUIPMENT_ID` int(11) NOT NULL,
  `EQUIPMENT_WALKER` tinyint(1) NOT NULL,
  `EQUIPMENT_PROSTHESES` tinyint(1) NOT NULL,
  `EQUIPMENT_STANDARD_TRICYCLE` tinyint(1) NOT NULL,
  `EQUIPMENT_WHITE_CANE` tinyint(1) NOT NULL,
  `EQUIPMENT_SLATE` tinyint(1) NOT NULL,
  `EQUIPMENT_STYLUS` tinyint(1) NOT NULL,
  `EQUIPMENT_HEARING_AIDS` tinyint(1) NOT NULL,
  `EQUIPMENT_OTHER` varchar(255) DEFAULT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EQUIPMENT`
--

INSERT INTO `EQUIPMENT` (`EQUIPMENT_ID`, `EQUIPMENT_WALKER`, `EQUIPMENT_PROSTHESES`, `EQUIPMENT_STANDARD_TRICYCLE`, `EQUIPMENT_WHITE_CANE`, `EQUIPMENT_SLATE`, `EQUIPMENT_STYLUS`, `EQUIPMENT_HEARING_AIDS`, `EQUIPMENT_OTHER`, `MEMBER_ID`) VALUES
(3, 1, 1, 1, 1, 1, 1, 1, 'test', 2),
(5, 1, 1, 1, 1, 1, 1, 1, 'test', 9),
(10, 1, 0, 0, 0, 0, 0, 0, 'dsdvsdv', 12);

-- --------------------------------------------------------

--
-- Table structure for table `ETHNICITY`
--

CREATE TABLE `ETHNICITY` (
  `ETHNICITY_ID` int(11) NOT NULL,
  `ETHNICITY_CODE` varchar(3) NOT NULL,
  `ETHNICITY_NAME_TH` varchar(255) NOT NULL,
  `ETHNICITY_NAME_EN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ETHNICITY`
--

INSERT INTO `ETHNICITY` (`ETHNICITY_ID`, `ETHNICITY_CODE`, `ETHNICITY_NAME_TH`, `ETHNICITY_NAME_EN`) VALUES
(1, 'A01', 'อัฟกัน', 'AFGHAN'),
(2, 'A02', 'แอฟริกัน', 'AFRICAN');

-- --------------------------------------------------------

--
-- Table structure for table `ICE_CONTACT`
--

CREATE TABLE `ICE_CONTACT` (
  `ICE_CONTACT_ID` int(11) NOT NULL,
  `ICE_CONTACT_FIRST_NAME` varchar(50) NOT NULL,
  `ICE_CONTACT_LAST_NAME` varchar(50) NOT NULL,
  `ICE_CONTACT_PHONE_NUMBER` varchar(10) DEFAULT NULL,
  `ICE_CONTACT_MOBILE_PHONE_NUMBER` varchar(10) DEFAULT NULL,
  `ICE_CONTACT_FAX_NUMBER` varchar(10) DEFAULT NULL,
  `ICE_CONTACT_EMAIL` varchar(255) DEFAULT NULL,
  `ICE_CONTACT_LINE_ID` varchar(255) DEFAULT NULL,
  `ICE_CONTACT_FACEBOOK_ID` varchar(255) DEFAULT NULL,
  `NAME_TITLE_ID` int(11) DEFAULT NULL,
  `ADDRESS_ID` int(11) DEFAULT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ICE_CONTACT`
--

INSERT INTO `ICE_CONTACT` (`ICE_CONTACT_ID`, `ICE_CONTACT_FIRST_NAME`, `ICE_CONTACT_LAST_NAME`, `ICE_CONTACT_PHONE_NUMBER`, `ICE_CONTACT_MOBILE_PHONE_NUMBER`, `ICE_CONTACT_FAX_NUMBER`, `ICE_CONTACT_EMAIL`, `ICE_CONTACT_LINE_ID`, `ICE_CONTACT_FACEBOOK_ID`, `NAME_TITLE_ID`, `ADDRESS_ID`, `MEMBER_ID`) VALUES
(2, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, 5, 2),
(3, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, 8, 3),
(4, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, 11, 4),
(5, 'vsdfv', 'fdvdfvdf', '645564564', '54564564', '65456456', 'fbdfbdb', 'vdfvdff', 'fdfbdfb', 2, 13, 4),
(6, 'vsdfv', 'fdvdfvdf', '645564564', '54564564', '65456456', 'fbdfbdb', 'vdfvdff', 'fdfbdfb', 2, 15, 4),
(7, 'vsdfv', 'fdvdfvdf', '645564564', '54564564', '65456456', 'fbdfbdb', 'vdfvdff', 'fdfbdfb', 2, 17, 4),
(8, 'vsdfv', 'fdvdfvdf', '645564564', '54564564', '65456456', 'fbdfbdb', 'vdfvdff', 'fdfbdfb', 2, 5, 5),
(9, 'vsdfv', 'fdvdfvdf', '645564564', '54564564', '65456456', 'fbdfbdb', 'vdfvdff', 'fdfbdfb', 2, 22, 6),
(10, 'ee', 'ee', '11111', '11111', '11111', '11111', '11111', '11111', 2, 25, 7),
(12, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, 39, 9),
(13, 'kjklj', 'kljkljlk', '6454', '244244', '545345', '54', '5345', '454', 2, 42, 10),
(14, 'iuio', 'hkjnhkljhi', '6546854', '354564564', '564564564', '5456', '54564', '54564', 2, 45, 11),
(15, 'kjhgyu', 'hgyuyu', '54564', '5456456', '654564564', '455465', '56456456', '54564564', 2, 48, 12);

-- --------------------------------------------------------

--
-- Table structure for table `MEDICAL_CARE`
--

CREATE TABLE `MEDICAL_CARE` (
  `MEDICAL_CARE_ID` int(11) NOT NULL,
  `MEDICAL_CARE_NHSO_DISABLED` tinyint(1) NOT NULL,
  `MEDICAL_CARE_NHSO_UC` tinyint(1) NOT NULL,
  `MEDICAL_CARE_PENSION` tinyint(1) NOT NULL,
  `MEDICAL_CARE_VETERAN` tinyint(1) NOT NULL,
  `MEDICAL_CARE_SOCIAL_SECURITY` tinyint(1) NOT NULL,
  `MEDICAL_CARE_LIFE_INSURANCE` tinyint(1) NOT NULL,
  `MEDICAL_CARE_SELF` tinyint(1) NOT NULL,
  `MEDICAL_OTHER` varchar(255) DEFAULT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MEDICAL_CARE`
--

INSERT INTO `MEDICAL_CARE` (`MEDICAL_CARE_ID`, `MEDICAL_CARE_NHSO_DISABLED`, `MEDICAL_CARE_NHSO_UC`, `MEDICAL_CARE_PENSION`, `MEDICAL_CARE_VETERAN`, `MEDICAL_CARE_SOCIAL_SECURITY`, `MEDICAL_CARE_LIFE_INSURANCE`, `MEDICAL_CARE_SELF`, `MEDICAL_OTHER`, `MEMBER_ID`) VALUES
(3, 1, 1, 1, 1, 1, 1, 1, 'test', 2),
(5, 1, 1, 1, 1, 1, 1, 1, 'test', 9),
(10, 0, 0, 1, 0, 0, 1, 0, 'sdvVD', 12);

-- --------------------------------------------------------

--
-- Table structure for table `MEMBER`
--

CREATE TABLE `MEMBER` (
  `MEMBER_ID` int(11) NOT NULL,
  `MEMBER_IDENTIFICATION_NUMBER` varchar(13) NOT NULL,
  `MEMBER_FIRST_NAME` varchar(50) NOT NULL,
  `MEMBER_LAST_NAME` varchar(50) NOT NULL,
  `MEMBER_IMAGE` varchar(255) DEFAULT NULL,
  `MEMBER_BIRTH_DATE` date NOT NULL,
  `MEMBER_ISSUE_BY` varchar(255) NOT NULL,
  `MEMBER_ISSUE_DATE` date NOT NULL,
  `MEMBER_EXPIRY_DATE` date NOT NULL,
  `MEMBER_PHONE_NUMBER` varchar(10) DEFAULT NULL,
  `MEMBER_MOBILE_PHONE_NUMBER` varchar(10) DEFAULT NULL,
  `MEMBER_FAX_NUMBER` varchar(10) DEFAULT NULL,
  `MEMBER_EMAIL` varchar(255) DEFAULT NULL,
  `MEMBER_LINE_ID` varchar(255) DEFAULT NULL,
  `MEMBER_FACEBOOK_ID` varchar(255) DEFAULT NULL,
  `MEMBER_WEIGHT` decimal(4,1) NOT NULL,
  `MEMBER_HEIGHT` decimal(4,1) NOT NULL,
  `MEMBER_WAISTLINE` decimal(4,2) NOT NULL,
  `MEMBER_BMI` decimal(3,1) NOT NULL,
  `MEMBER_SYSTOLIC_BLOOD_PRESSURE` int(3) NOT NULL,
  `MEMBER_DIASTOLIC_BLOOD_PRESSURE` int(3) NOT NULL,
  `MEMBER_FASTING_BLOOD_SUGAR` int(3) NOT NULL,
  `MEMBER_DISABLED_CARD` tinyint(1) NOT NULL,
  `NAME_TITLE_ID` int(11) DEFAULT NULL,
  `BIRTHPLACE_PROVINCE_ID` int(11) DEFAULT NULL,
  `PERMANENT_ADDRESS_ID` int(11) DEFAULT NULL,
  `CURRENT_ADDRESS_ID` int(11) DEFAULT NULL,
  `NATIONALITY_ID` int(11) DEFAULT NULL,
  `ETHNICITY_ID` int(11) DEFAULT NULL,
  `RELIGION_ID` int(11) DEFAULT NULL,
  `MEMBER_STATUS_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MEMBER`
--

INSERT INTO `MEMBER` (`MEMBER_ID`, `MEMBER_IDENTIFICATION_NUMBER`, `MEMBER_FIRST_NAME`, `MEMBER_LAST_NAME`, `MEMBER_IMAGE`, `MEMBER_BIRTH_DATE`, `MEMBER_ISSUE_BY`, `MEMBER_ISSUE_DATE`, `MEMBER_EXPIRY_DATE`, `MEMBER_PHONE_NUMBER`, `MEMBER_MOBILE_PHONE_NUMBER`, `MEMBER_FAX_NUMBER`, `MEMBER_EMAIL`, `MEMBER_LINE_ID`, `MEMBER_FACEBOOK_ID`, `MEMBER_WEIGHT`, `MEMBER_HEIGHT`, `MEMBER_WAISTLINE`, `MEMBER_BMI`, `MEMBER_SYSTOLIC_BLOOD_PRESSURE`, `MEMBER_DIASTOLIC_BLOOD_PRESSURE`, `MEMBER_FASTING_BLOOD_SUGAR`, `MEMBER_DISABLED_CARD`, `NAME_TITLE_ID`, `BIRTHPLACE_PROVINCE_ID`, `PERMANENT_ADDRESS_ID`, `CURRENT_ADDRESS_ID`, `NATIONALITY_ID`, `ETHNICITY_ID`, `RELIGION_ID`, `MEMBER_STATUS_ID`) VALUES
(2, '1234561234', 'Piyawat', 'Chadee', 'xxx/xxx/xxx.png', '2019-08-12', 'Piyawat', '2019-08-12', '2019-08-12', '0624289983', '0624289983', '0624289983', 'piyawat.cha@terminal8.co.th', 'piyawat', 'piyawat', '70.0', '175.0', '86.00', '27.0', 50, 50, 50, 1, 1, 1, 3, 4, 1, 1, 1, 1),
(3, '1234561234', 'Piyawat', 'Chadee', 'xxx/xxx/xxx.png', '2019-08-12', 'Piyawat', '2019-08-12', '2019-08-12', '0624289983', '0624289983', '0624289983', 'piyawat.cha@terminal8.co.th', 'piyawat', 'piyawat', '70.0', '175.0', '86.00', '27.0', 50, 50, 50, 1, 1, 1, 6, 7, 1, 1, 1, 1),
(4, '1234561234', 'Piyawat', 'Chadee', 'xxx/xxx/xxx.png', '2019-08-12', 'Piyawat', '2019-08-12', '2019-08-12', '0624289983', '0624289983', '0624289983', 'piyawat.cha@terminal8.co.th', 'piyawat', 'piyawat', '70.0', '175.0', '86.00', '27.0', 50, 50, 50, 1, 1, 1, 9, 10, 1, 1, 1, 1),
(5, '1235645845125', 'asas', 'asas', 'undefined', '2002-03-05', 'as', '2019-09-03', '2019-09-10', '09155454', '545454626', '65646565', 'dfdfbd@email.com', 'undefined', 'undefined', '45.0', '156.0', '32.00', '52.0', 70, 140, 60, 1, 2, 1, 18, 19, 2, 2, 2, 1),
(6, '1235645845125', 'asas', 'asas', 'undefined', '2002-03-05', 'as', '2019-09-03', '2019-09-10', '09155454', '545454626', '65646565', 'dfdfbd@email.com', 'undefined', 'undefined', '45.0', '156.0', '32.00', '52.0', 70, 140, 60, 1, 2, 1, 20, 21, 2, 2, 2, 1),
(7, 'ddd', 'ddd', 'ddd', 'undefined', '2019-09-19', 'ddd', '2019-09-04', '2019-09-02', '11111', '11111', '11111', '11111', 'undefined', 'undefined', '22.0', '11.0', '22.00', '22.0', 22, 22, 22, 1, 2, 1, 23, 24, 2, 1, 2, 1),
(9, '1234561234', 'Piyawat', 'Chadee', 'xxx/xxx/xxx.png', '2019-08-12', 'Piyawat', '2019-08-12', '2019-08-12', '0624289983', '0624289983', '0624289983', 'piyawat.cha@terminal8.co.th', 'piyawat', 'piyawat', '70.0', '175.0', '86.00', '27.0', 50, 50, 50, 1, 1, 1, 37, 38, 1, 1, 1, 1),
(10, '1455454', 'bfg', 'fgfg', 'undefined', '2019-09-08', '4545', '2019-09-08', '2019-09-08', '65415', '5415', '5231', '351', 'undefined', 'undefined', '50.0', '156.0', '12.00', '12.0', 12, 2, 212, 1, 2, 1, 40, 41, 2, 1, 2, 1),
(11, '54154564', 'fujhuj', 'juh', 'undefined', '2019-09-08', 'uh', '2019-09-08', '2019-09-08', '456456', '4654654', '6546544', '4644', 'undefined', 'undefined', '56.0', '170.0', '23.00', '5.0', 51, 21, 62, 1, 2, 1, 43, 44, 2, 1, 2, 1),
(12, 'ygui', 'jg', 'g', NULL, '2019-09-08', 'gug', '2019-09-08', '2019-09-08', '456465', '4654564', '35214536', '5456', NULL, NULL, '122.0', '160.0', '54.00', '45.0', 45, 60, 45, 1, 3, 1, 46, 47, 2, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `MEMBER_HAS_DISABILITY`
--

CREATE TABLE `MEMBER_HAS_DISABILITY` (
  `MEMBER_HAS_DISABILITY_ID` int(11) NOT NULL,
  `MEMBER_HAS_DISABILITY_LEVEL` int(1) DEFAULT NULL,
  `MEMBER_HAS_DISABILITY_DETAIL` varchar(255) DEFAULT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL,
  `DISABILITY_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MEMBER_HAS_DISABILITY`
--

INSERT INTO `MEMBER_HAS_DISABILITY` (`MEMBER_HAS_DISABILITY_ID`, `MEMBER_HAS_DISABILITY_LEVEL`, `MEMBER_HAS_DISABILITY_DETAIL`, `MEMBER_ID`, `DISABILITY_ID`) VALUES
(8, NULL, 'aaa', 9, 1),
(13, NULL, 'bbb', 9, 4),
(14, NULL, '', 9, 1),
(15, NULL, '', 9, 4);

-- --------------------------------------------------------

--
-- Table structure for table `MEMBER_HAS_RESIDENCE`
--

CREATE TABLE `MEMBER_HAS_RESIDENCE` (
  `MEMBER_HAS_RESIDENCE_ID` int(11) NOT NULL,
  `MEMBER_HAS_RESIDENCE_DETAIL` varchar(255) DEFAULT NULL,
  `MEMBER_ID` int(11) DEFAULT NULL,
  `RESIDENCE_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MEMBER_HAS_RESIDENCE`
--

INSERT INTO `MEMBER_HAS_RESIDENCE` (`MEMBER_HAS_RESIDENCE_ID`, `MEMBER_HAS_RESIDENCE_DETAIL`, `MEMBER_ID`, `RESIDENCE_ID`) VALUES
(19, '', 9, 1),
(20, '62', 12, 5);

-- --------------------------------------------------------

--
-- Table structure for table `MEMBER_STATUS`
--

CREATE TABLE `MEMBER_STATUS` (
  `MEMBER_STATUS_ID` int(11) NOT NULL,
  `MEMBER_STATUS_NAME` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MEMBER_STATUS`
--

INSERT INTO `MEMBER_STATUS` (`MEMBER_STATUS_ID`, `MEMBER_STATUS_NAME`) VALUES
(1, 'มีชีวิต'),
(2, 'เสีียชีวิ');

-- --------------------------------------------------------

--
-- Table structure for table `NAME_TITLE`
--

CREATE TABLE `NAME_TITLE` (
  `NAME_TITLE_ID` int(11) NOT NULL,
  `NAME_TITLE_NAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `NAME_TITLE`
--

INSERT INTO `NAME_TITLE` (`NAME_TITLE_ID`, `NAME_TITLE_NAME`) VALUES
(1, 'นาย'),
(2, 'นางสาว'),
(3, 'นาง');

-- --------------------------------------------------------

--
-- Table structure for table `NATIONALITY`
--

CREATE TABLE `NATIONALITY` (
  `NATIONALITY_ID` int(11) NOT NULL,
  `NATIONALITY_CODE` varchar(3) NOT NULL,
  `NATIONALITY_NAME_TH` varchar(255) NOT NULL,
  `NATIONALITY_NAME_EN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `NATIONALITY`
--

INSERT INTO `NATIONALITY` (`NATIONALITY_ID`, `NATIONALITY_CODE`, `NATIONALITY_NAME_TH`, `NATIONALITY_NAME_EN`) VALUES
(1, 'A01', 'อัฟกัน', 'AFGHAN'),
(2, 'A02', 'แอฟริกัน', 'AFRICAN');

-- --------------------------------------------------------

--
-- Table structure for table `PROVINCE`
--

CREATE TABLE `PROVINCE` (
  `PROVINCE_ID` int(11) NOT NULL,
  `PROVINCE_CODE` int(11) NOT NULL,
  `PROVINCE_NAME_TH` varchar(150) NOT NULL,
  `PROVINCE_NAME_EN` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `PROVINCE`
--

INSERT INTO `PROVINCE` (`PROVINCE_ID`, `PROVINCE_CODE`, `PROVINCE_NAME_TH`, `PROVINCE_NAME_EN`) VALUES
(1, 10, 'กรุงเทพมหานคร', 'Bangkok');

-- --------------------------------------------------------

--
-- Table structure for table `RELIGION`
--

CREATE TABLE `RELIGION` (
  `RELIGION_ID` int(11) NOT NULL,
  `RELIGION_NAME` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RELIGION`
--

INSERT INTO `RELIGION` (`RELIGION_ID`, `RELIGION_NAME`) VALUES
(1, 'พุทธ'),
(2, 'คริสต์');

-- --------------------------------------------------------

--
-- Table structure for table `RESIDENCE`
--

CREATE TABLE `RESIDENCE` (
  `RESIDENCE_ID` int(11) NOT NULL,
  `RESIDENCE_NAME` varchar(255) NOT NULL,
  `RESIDENCE_INPUT_TYPE` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `RESIDENCE`
--

INSERT INTO `RESIDENCE` (`RESIDENCE_ID`, `RESIDENCE_NAME`, `RESIDENCE_INPUT_TYPE`) VALUES
(1, 'อยู่คนเดียว', NULL),
(2, 'อยู่กับคู่สมรส', NULL),
(3, 'อยู่กับบิดา/มารดา', NULL),
(4, 'อยู่กับบุตร จำนวน (คน)', 'text'),
(5, 'อยู่กับญาติ จำนวน (คน)', 'text'),
(6, 'อยู่กับผู้ดูแลที่ไม่ใช่ญาติ จำนวน (คน)', 'text'),
(7, 'อยู่กับนายจ้าง จำนวน (คน)', 'text'),
(8, 'อื่นๆ', 'text');

-- --------------------------------------------------------

--
-- Table structure for table `SUBDISTRICT`
--

CREATE TABLE `SUBDISTRICT` (
  `SUBDISTRICT_ID` int(11) NOT NULL,
  `SUBDISTRICT_CODE` int(11) NOT NULL,
  `SUBDISTRICT_NAME_TH` varchar(150) NOT NULL,
  `SUBDISTRICT_NAME_EN` varchar(150) NOT NULL,
  `SUBDISTRICT_POSTCODE` varchar(5) NOT NULL,
  `SUBDISTRICT_LATITUDE` decimal(6,3) NOT NULL,
  `SUBDISTRICT_LONGITUDE` decimal(6,3) NOT NULL,
  `DISTRICT_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SUBDISTRICT`
--

INSERT INTO `SUBDISTRICT` (`SUBDISTRICT_ID`, `SUBDISTRICT_CODE`, `SUBDISTRICT_NAME_TH`, `SUBDISTRICT_NAME_EN`, `SUBDISTRICT_POSTCODE`, `SUBDISTRICT_LATITUDE`, `SUBDISTRICT_LONGITUDE`, `DISTRICT_ID`) VALUES
(1, 100101, 'พระบรมมหาราชวัง', 'Phra Borom Maha Ratchawang', '10200', '13.751', '100.492', 1),
(2, 100102, 'วังบูรพาภิรมย์', 'Wang Burapha Phirom', '10200', '13.744', '100.499', 1),
(3, 100103, 'วัดราชบพิธ', 'Wat Ratchabophit', '10200', '13.750', '100.499', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ADDRESS`
--
ALTER TABLE `ADDRESS`
  ADD PRIMARY KEY (`ADDRESS_ID`),
  ADD KEY `SUBDISTRICT_ID` (`SUBDISTRICT_ID`),
  ADD KEY `ADDRESS_STATUS_ID` (`ADDRESS_STATUS_ID`);

--
-- Indexes for table `ADDRESS_STATUS`
--
ALTER TABLE `ADDRESS_STATUS`
  ADD PRIMARY KEY (`ADDRESS_STATUS_ID`);

--
-- Indexes for table `CARETAKER`
--
ALTER TABLE `CARETAKER`
  ADD PRIMARY KEY (`CARETAKER_ID`),
  ADD UNIQUE KEY `MEMBER_ID` (`MEMBER_ID`);

--
-- Indexes for table `DISABILITY`
--
ALTER TABLE `DISABILITY`
  ADD PRIMARY KEY (`DISABILITY_ID`),
  ADD KEY `DISABILITY_TYPE_ID` (`DISABILITY_TYPE_ID`);

--
-- Indexes for table `DISABILITY_TYPE`
--
ALTER TABLE `DISABILITY_TYPE`
  ADD PRIMARY KEY (`DISABILITY_TYPE_ID`);

--
-- Indexes for table `DISTRICT`
--
ALTER TABLE `DISTRICT`
  ADD PRIMARY KEY (`DISTRICT_ID`),
  ADD KEY `PROVINCE_ID` (`PROVINCE_ID`);

--
-- Indexes for table `EQUIPMENT`
--
ALTER TABLE `EQUIPMENT`
  ADD PRIMARY KEY (`EQUIPMENT_ID`),
  ADD UNIQUE KEY `MEMBER_ID` (`MEMBER_ID`);

--
-- Indexes for table `ETHNICITY`
--
ALTER TABLE `ETHNICITY`
  ADD PRIMARY KEY (`ETHNICITY_ID`),
  ADD UNIQUE KEY `ETHNICITY_CODE` (`ETHNICITY_CODE`),
  ADD UNIQUE KEY `ETHNICITY_NAME_TH` (`ETHNICITY_NAME_TH`),
  ADD UNIQUE KEY `ETHNICITY_NAME_EN` (`ETHNICITY_NAME_EN`);

--
-- Indexes for table `ICE_CONTACT`
--
ALTER TABLE `ICE_CONTACT`
  ADD PRIMARY KEY (`ICE_CONTACT_ID`),
  ADD KEY `NAME_TITLE_ID` (`NAME_TITLE_ID`),
  ADD KEY `ADDRESS_ID` (`ADDRESS_ID`),
  ADD KEY `MEMBER_ID` (`MEMBER_ID`);

--
-- Indexes for table `MEDICAL_CARE`
--
ALTER TABLE `MEDICAL_CARE`
  ADD PRIMARY KEY (`MEDICAL_CARE_ID`),
  ADD UNIQUE KEY `MEMBER_ID` (`MEMBER_ID`);

--
-- Indexes for table `MEMBER`
--
ALTER TABLE `MEMBER`
  ADD PRIMARY KEY (`MEMBER_ID`),
  ADD KEY `NAME_TITLE_ID` (`NAME_TITLE_ID`),
  ADD KEY `BIRTHPLACE_PROVINCE_ID` (`BIRTHPLACE_PROVINCE_ID`),
  ADD KEY `NATIONALITY_ID` (`NATIONALITY_ID`),
  ADD KEY `ETHNICITY_ID` (`ETHNICITY_ID`),
  ADD KEY `RELIGION_ID` (`RELIGION_ID`),
  ADD KEY `MEMBER_STATUS_ID` (`MEMBER_STATUS_ID`),
  ADD KEY `member_ibfk_3` (`PERMANENT_ADDRESS_ID`),
  ADD KEY `member_ibfk_4` (`CURRENT_ADDRESS_ID`);

--
-- Indexes for table `MEMBER_HAS_DISABILITY`
--
ALTER TABLE `MEMBER_HAS_DISABILITY`
  ADD PRIMARY KEY (`MEMBER_HAS_DISABILITY_ID`),
  ADD KEY `MEMBER_ID` (`MEMBER_ID`),
  ADD KEY `DISABILITY_ID` (`DISABILITY_ID`);

--
-- Indexes for table `MEMBER_HAS_RESIDENCE`
--
ALTER TABLE `MEMBER_HAS_RESIDENCE`
  ADD PRIMARY KEY (`MEMBER_HAS_RESIDENCE_ID`),
  ADD UNIQUE KEY `MEMBER_ID` (`MEMBER_ID`),
  ADD KEY `RESIDENCE_ID` (`RESIDENCE_ID`);

--
-- Indexes for table `MEMBER_STATUS`
--
ALTER TABLE `MEMBER_STATUS`
  ADD PRIMARY KEY (`MEMBER_STATUS_ID`);

--
-- Indexes for table `NAME_TITLE`
--
ALTER TABLE `NAME_TITLE`
  ADD PRIMARY KEY (`NAME_TITLE_ID`);

--
-- Indexes for table `NATIONALITY`
--
ALTER TABLE `NATIONALITY`
  ADD PRIMARY KEY (`NATIONALITY_ID`),
  ADD UNIQUE KEY `NATIONALITY_CODE` (`NATIONALITY_CODE`),
  ADD UNIQUE KEY `NATIONALITY_NAME_TH` (`NATIONALITY_NAME_TH`),
  ADD UNIQUE KEY `NATIONALITY_NAME_EN` (`NATIONALITY_NAME_EN`);

--
-- Indexes for table `PROVINCE`
--
ALTER TABLE `PROVINCE`
  ADD PRIMARY KEY (`PROVINCE_ID`);

--
-- Indexes for table `RELIGION`
--
ALTER TABLE `RELIGION`
  ADD PRIMARY KEY (`RELIGION_ID`);

--
-- Indexes for table `RESIDENCE`
--
ALTER TABLE `RESIDENCE`
  ADD PRIMARY KEY (`RESIDENCE_ID`);

--
-- Indexes for table `SUBDISTRICT`
--
ALTER TABLE `SUBDISTRICT`
  ADD PRIMARY KEY (`SUBDISTRICT_ID`),
  ADD KEY `DISTRICT_ID` (`DISTRICT_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ADDRESS`
--
ALTER TABLE `ADDRESS`
  MODIFY `ADDRESS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `ADDRESS_STATUS`
--
ALTER TABLE `ADDRESS_STATUS`
  MODIFY `ADDRESS_STATUS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `CARETAKER`
--
ALTER TABLE `CARETAKER`
  MODIFY `CARETAKER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `DISABILITY`
--
ALTER TABLE `DISABILITY`
  MODIFY `DISABILITY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `DISABILITY_TYPE`
--
ALTER TABLE `DISABILITY_TYPE`
  MODIFY `DISABILITY_TYPE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `DISTRICT`
--
ALTER TABLE `DISTRICT`
  MODIFY `DISTRICT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `EQUIPMENT`
--
ALTER TABLE `EQUIPMENT`
  MODIFY `EQUIPMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ETHNICITY`
--
ALTER TABLE `ETHNICITY`
  MODIFY `ETHNICITY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ICE_CONTACT`
--
ALTER TABLE `ICE_CONTACT`
  MODIFY `ICE_CONTACT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `MEDICAL_CARE`
--
ALTER TABLE `MEDICAL_CARE`
  MODIFY `MEDICAL_CARE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `MEMBER`
--
ALTER TABLE `MEMBER`
  MODIFY `MEMBER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `MEMBER_HAS_DISABILITY`
--
ALTER TABLE `MEMBER_HAS_DISABILITY`
  MODIFY `MEMBER_HAS_DISABILITY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `MEMBER_HAS_RESIDENCE`
--
ALTER TABLE `MEMBER_HAS_RESIDENCE`
  MODIFY `MEMBER_HAS_RESIDENCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `MEMBER_STATUS`
--
ALTER TABLE `MEMBER_STATUS`
  MODIFY `MEMBER_STATUS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `NAME_TITLE`
--
ALTER TABLE `NAME_TITLE`
  MODIFY `NAME_TITLE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `NATIONALITY`
--
ALTER TABLE `NATIONALITY`
  MODIFY `NATIONALITY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `PROVINCE`
--
ALTER TABLE `PROVINCE`
  MODIFY `PROVINCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `RELIGION`
--
ALTER TABLE `RELIGION`
  MODIFY `RELIGION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `RESIDENCE`
--
ALTER TABLE `RESIDENCE`
  MODIFY `RESIDENCE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `SUBDISTRICT`
--
ALTER TABLE `SUBDISTRICT`
  MODIFY `SUBDISTRICT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ADDRESS`
--
ALTER TABLE `ADDRESS`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`SUBDISTRICT_ID`) REFERENCES `SUBDISTRICT` (`SUBDISTRICT_ID`),
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`ADDRESS_STATUS_ID`) REFERENCES `ADDRESS_STATUS` (`ADDRESS_STATUS_ID`);

--
-- Constraints for table `CARETAKER`
--
ALTER TABLE `CARETAKER`
  ADD CONSTRAINT `caretaker_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`);

--
-- Constraints for table `DISABILITY`
--
ALTER TABLE `DISABILITY`
  ADD CONSTRAINT `disability_ibfk_1` FOREIGN KEY (`DISABILITY_TYPE_ID`) REFERENCES `DISABILITY_TYPE` (`DISABILITY_TYPE_ID`);

--
-- Constraints for table `DISTRICT`
--
ALTER TABLE `DISTRICT`
  ADD CONSTRAINT `district_ibfk_1` FOREIGN KEY (`PROVINCE_ID`) REFERENCES `PROVINCE` (`PROVINCE_ID`);

--
-- Constraints for table `EQUIPMENT`
--
ALTER TABLE `EQUIPMENT`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`);

--
-- Constraints for table `ICE_CONTACT`
--
ALTER TABLE `ICE_CONTACT`
  ADD CONSTRAINT `ice_contact_ibfk_1` FOREIGN KEY (`NAME_TITLE_ID`) REFERENCES `NAME_TITLE` (`NAME_TITLE_ID`),
  ADD CONSTRAINT `ice_contact_ibfk_2` FOREIGN KEY (`ADDRESS_ID`) REFERENCES `ADDRESS` (`ADDRESS_ID`),
  ADD CONSTRAINT `ice_contact_ibfk_3` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`);

--
-- Constraints for table `MEDICAL_CARE`
--
ALTER TABLE `MEDICAL_CARE`
  ADD CONSTRAINT `medical_care_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`);

--
-- Constraints for table `MEMBER`
--
ALTER TABLE `MEMBER`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`NAME_TITLE_ID`) REFERENCES `NAME_TITLE` (`NAME_TITLE_ID`),
  ADD CONSTRAINT `member_ibfk_2` FOREIGN KEY (`BIRTHPLACE_PROVINCE_ID`) REFERENCES `PROVINCE` (`PROVINCE_ID`),
  ADD CONSTRAINT `member_ibfk_3` FOREIGN KEY (`PERMANENT_ADDRESS_ID`) REFERENCES `ADDRESS` (`ADDRESS_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `member_ibfk_4` FOREIGN KEY (`CURRENT_ADDRESS_ID`) REFERENCES `ADDRESS` (`ADDRESS_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `member_ibfk_5` FOREIGN KEY (`NATIONALITY_ID`) REFERENCES `NATIONALITY` (`NATIONALITY_ID`),
  ADD CONSTRAINT `member_ibfk_6` FOREIGN KEY (`ETHNICITY_ID`) REFERENCES `ETHNICITY` (`ETHNICITY_ID`),
  ADD CONSTRAINT `member_ibfk_7` FOREIGN KEY (`RELIGION_ID`) REFERENCES `RELIGION` (`RELIGION_ID`),
  ADD CONSTRAINT `member_ibfk_8` FOREIGN KEY (`MEMBER_STATUS_ID`) REFERENCES `MEMBER_STATUS` (`MEMBER_STATUS_ID`);

--
-- Constraints for table `MEMBER_HAS_DISABILITY`
--
ALTER TABLE `MEMBER_HAS_DISABILITY`
  ADD CONSTRAINT `member_has_disability_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`),
  ADD CONSTRAINT `member_has_disability_ibfk_2` FOREIGN KEY (`DISABILITY_ID`) REFERENCES `DISABILITY` (`DISABILITY_ID`);

--
-- Constraints for table `MEMBER_HAS_RESIDENCE`
--
ALTER TABLE `MEMBER_HAS_RESIDENCE`
  ADD CONSTRAINT `member_has_residence_ibfk_1` FOREIGN KEY (`MEMBER_ID`) REFERENCES `MEMBER` (`MEMBER_ID`),
  ADD CONSTRAINT `member_has_residence_ibfk_2` FOREIGN KEY (`RESIDENCE_ID`) REFERENCES `RESIDENCE` (`RESIDENCE_ID`);

--
-- Constraints for table `SUBDISTRICT`
--
ALTER TABLE `SUBDISTRICT`
  ADD CONSTRAINT `subdistrict_ibfk_1` FOREIGN KEY (`DISTRICT_ID`) REFERENCES `DISTRICT` (`DISTRICT_ID`);
