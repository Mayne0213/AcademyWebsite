-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: AcademyDB
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_AdminToAcademy`
--

DROP TABLE IF EXISTS `_AdminToAcademy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_AdminToAcademy` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_AdminToAcademy_AB_unique` (`A`,`B`),
  KEY `_AdminToAcademy_B_index` (`B`),
  CONSTRAINT `_AdminToAcademy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Academy` (`academyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_AdminToAcademy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Admin` (`memberId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_AdminToAcademy`
--

LOCK TABLES `_AdminToAcademy` WRITE;
/*!40000 ALTER TABLE `_AdminToAcademy` DISABLE KEYS */;
/*!40000 ALTER TABLE `_AdminToAcademy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_AnnouncementToAcademy`
--

DROP TABLE IF EXISTS `_AnnouncementToAcademy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_AnnouncementToAcademy` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_AnnouncementToAcademy_AB_unique` (`A`,`B`),
  KEY `_AnnouncementToAcademy_B_index` (`B`),
  CONSTRAINT `_AnnouncementToAcademy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Academy` (`academyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_AnnouncementToAcademy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Announcement` (`announcementId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_AnnouncementToAcademy`
--

LOCK TABLES `_AnnouncementToAcademy` WRITE;
/*!40000 ALTER TABLE `_AnnouncementToAcademy` DISABLE KEYS */;
/*!40000 ALTER TABLE `_AnnouncementToAcademy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('06f8c3da-55c9-4979-851d-dd428638e600','dd2bb8646e261bf453f40905d33dc40ac1ed3f7de68d230f55b5db599ac4e177','2025-07-04 17:48:22.945','20250704174822_remove_academy_requirement_in_announcement',NULL,NULL,'2025-07-04 17:48:22.919',1),('085f581e-c9a6-43c6-a255-dec34157f6ef','f174b99df44f8648bdccbc117bda57fe1d917144daf3a7e3da11fac8c0d38e9a','2025-07-09 04:42:34.108','20250709044234_add_academy_relation_to_announcement',NULL,NULL,'2025-07-09 04:42:34.069',1),('0d17d723-8ec4-44c5-b899-a3556112f187','3900cd72b56db8ba7144659a3342ecf260b36cc8a754005740f1f76e825c9e56','2025-07-09 00:58:51.055','20250709005851_remove_developer_table',NULL,NULL,'2025-07-09 00:58:51.034',1),('23d38031-1f75-4a54-9540-595ed10004cc','d70ef2a79f79fd8aca19a68afa6de52e4fe955c3366095d8fe000f021ddda174','2025-07-07 06:34:32.637','20250707063432_add_announcemtn_asset_board',NULL,NULL,'2025-07-07 06:34:32.631',1),('30af4397-7dde-49e5-a289-efbb01250a3a','74b0b82d98a96193e4ffcc9e44575579b21ab9056b2f45f8c2050754b1fc3123','2025-07-05 09:54:10.040','20250705095410_change_cascade_authrority',NULL,NULL,'2025-07-05 09:54:10.013',1),('40c48476-50da-451e-ac15-8023d0157297','833d7a63759c9a799e1874ab4497106e5514354da7bf93705d688c0ea5715508','2025-07-10 10:44:28.059','20250710104428_nullable',NULL,NULL,'2025-07-10 10:44:28.022',1),('4e1f82f6-49eb-4973-85a0-645606f13a4b','a7dbe36ab294b8a13b5ef4f2afc50a6db610d929eeafd5bb3e1e446d6a19fcff','2025-07-10 09:02:57.323','20250710090257_add_academy_images',NULL,NULL,'2025-07-10 09:02:57.295',1),('4f336fc4-83a2-4f3d-a70b-eea663427a43','4929b017c4acd55a32ac45a44f1303ea3ac26853f182314dc4c4ee20330e25d2','2025-07-02 03:25:17.807','20250702032517_init',NULL,NULL,'2025-07-02 03:25:17.753',1),('5c14dce0-8a83-42ca-bb92-f9bff7885e33','25df9831211dab19f0f46764ed7c5852b6a82906bcf01560cfad29e30e115a6c','2025-07-05 16:29:34.933','20250705162934_add_imageurlforqna',NULL,NULL,'2025-07-05 16:29:34.925',1),('687d9d8f-3d88-43a6-a924-97e3bcada3f0','f8d4c95aba9986095478ae6b7c6729570c25b16bac821a5ee5312488328a1ca0','2025-07-02 14:29:14.003','20250702142913_add_developer_enum',NULL,NULL,'2025-07-02 14:29:13.990',1),('69ef42e9-83d7-4eeb-9441-4816d5c08124','410ae5a76b3383b14be4d80ffd30347a3399024a3528d565a363632588cbfaae','2025-07-02 14:12:44.977','20250702141244_add_developer',NULL,NULL,'2025-07-02 14:12:44.968',1),('6fcd1aa9-0177-4c01-886e-cd37dc8ff5ff','5d61ee1dd11b0c603476973824e5a943512ce34961a549a6af176311dc743410','2025-07-02 03:56:58.586','20250702035658_id',NULL,NULL,'2025-07-02 03:56:58.481',1),('7fd72319-87c2-43d1-b23e-b77e7839aba7','e93c4c5acb4b04c9793dbaf102ed1cfad6e7e2f31f85cd3c82e6b4ad7cdf8888','2025-07-08 12:47:08.446','20250708124708_add_announce_files',NULL,NULL,'2025-07-08 12:47:08.432',1),('8c36e070-e88d-493f-ac53-3a907823e41b','5a47facdb5d951dbf8abd574fb2c7c99beedeb729a476f493f372555f93b1f24','2025-07-06 18:19:18.830','20250706181918_add_removing_text_limits',NULL,NULL,'2025-07-06 18:19:18.804',1),('9a4996d7-3615-4cfa-a68b-38f7e0ecde1e','e21980fa70c9395d59b5d3d4510a45cc49dceb3e49a897b0961c18edef84ec2d','2025-07-08 13:15:13.800','20250708131513_add_announcement_files',NULL,NULL,'2025-07-08 13:15:13.765',1),('d8389eab-494d-4483-8327-4434764895f7','aee392675ddb0f095b4dfb9cac749231e719ade4d0674e43a90c795de471d496','2025-07-08 13:01:32.404','20250708130132_cancel_previous_filsadd',NULL,NULL,'2025-07-08 13:01:32.399',1),('e77903e6-4be9-4ddc-a125-db27305390c4','f703eb02c9e1f7e2e7432590ec3207254c88bfc4b84aef7f30ef77597870ef88','2025-07-10 09:35:11.407','20250710093511_make_academy_image_name_nullable',NULL,NULL,'2025-07-10 09:35:11.402',1),('ee9d47b3-c998-4ef7-b0ca-3d87080fb610','7ddc42b108878393d3eb6e348556309849928a333cb5d67597e5aa4911c62c31','2025-07-05 03:13:07.322','20250705031307_add_qna_function',NULL,NULL,'2025-07-05 03:13:07.236',1),('ff2a394c-d9e1-43de-b6ae-05f7f95e2188','ed455ed040e259d71cdf8824c254b6927d84e86e8a7537d0e75d136b66dfe0db','2025-07-06 02:56:48.484','20250706025648_add_image_url_announcement',NULL,NULL,'2025-07-06 02:56:48.475',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Academy`
--

DROP TABLE IF EXISTS `Academy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Academy` (
  `academyId` int NOT NULL AUTO_INCREMENT,
  `academyName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academyPhone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academyAddress` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `academyMainImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`academyId`),
  UNIQUE KEY `Academy_academyName_key` (`academyName`),
  UNIQUE KEY `Academy_academyPhone_key` (`academyPhone`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Academy`
--

LOCK TABLES `Academy` WRITE;
/*!40000 ALTER TABLE `Academy` DISABLE KEYS */;
INSERT INTO `Academy` VALUES (30,'[대치] 대치예섬학원 본관','번호 없음4','서울특별시 강남구 도곡로 418 3층 303호','2025-07-06 10:35:26.942',NULL),(33,'[대치] 대치명인학원 대치캠퍼스','번호없음3','서울 특별시 강남구 도곡로 408 디마크 빌딩 6층 1강의실','2025-07-09 04:55:02.267',NULL),(34,'[마포] 대치명인학원 마포캠퍼스','번호없음','서울 마포구 서강대길 3 4층 1강의실','2025-07-09 05:16:48.472',NULL),(35,'[목동] 사과나무학원','번호 없음','서울시 양천구 목동동로 423 이화프라자 5층 1강의실','2025-07-09 08:15:31.102',NULL),(51,'[중계] 중계 학림학원','번호 없음5','서울시 노원구 중계로 225 청구종합상가 2층 212호','2025-07-10 09:54:21.589',NULL),(52,'[선릉] 상상 독학학원','번호 없음6','서울 강남구 선릉로 416 2층','2025-07-10 09:54:53.129',NULL);
/*!40000 ALTER TABLE `Academy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AcademyImage`
--

DROP TABLE IF EXISTS `AcademyImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AcademyImage` (
  `academyImageId` int NOT NULL AUTO_INCREMENT,
  `academyImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academyId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `academyImageName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`academyImageId`),
  KEY `AcademyImage_academyId_fkey` (`academyId`),
  CONSTRAINT `AcademyImage_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy` (`academyId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AcademyImage`
--

LOCK TABLES `AcademyImage` WRITE;
/*!40000 ALTER TABLE `AcademyImage` DISABLE KEYS */;
/*!40000 ALTER TABLE `AcademyImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `adminName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adminPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberId` int NOT NULL,
  PRIMARY KEY (`memberId`),
  UNIQUE KEY `Admin_adminPhone_key` (`adminPhone`),
  CONSTRAINT `Admin_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User` (`memberId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('주혜연','1',75),('최형석','2',76),('김경진','3',78),('김민조','01088705364',79),('백재은','4',80),('김유찬','5',81),('하예원','6',82),('유승현','7',83),('김도경','8',84),('김현호','9',85);
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Announcement`
--

DROP TABLE IF EXISTS `Announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcement` (
  `announcementId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` int DEFAULT NULL,
  `isItAssetAnnouncement` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`announcementId`),
  KEY `Announcement_authorId_fkey` (`authorId`),
  CONSTRAINT `Announcement_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin` (`memberId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcement`
--

LOCK TABLES `Announcement` WRITE;
/*!40000 ALTER TABLE `Announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `Announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AnnouncementFile`
--

DROP TABLE IF EXISTS `AnnouncementFile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AnnouncementFile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `originalName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `announcementId` int NOT NULL,
  `uploadedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AnnouncementFile_announcementId_fkey` (`announcementId`),
  CONSTRAINT `AnnouncementFile_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `Announcement` (`announcementId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnnouncementFile`
--

LOCK TABLES `AnnouncementFile` WRITE;
/*!40000 ALTER TABLE `AnnouncementFile` DISABLE KEYS */;
/*!40000 ALTER TABLE `AnnouncementFile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QnABoard`
--

DROP TABLE IF EXISTS `QnABoard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QnABoard` (
  `qnaId` int NOT NULL AUTO_INCREMENT,
  `qnaTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qnaContent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `qnaUserId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `qnaImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`qnaId`),
  KEY `QnABoard_qnaUserId_fkey` (`qnaUserId`),
  CONSTRAINT `QnABoard_qnaUserId_fkey` FOREIGN KEY (`qnaUserId`) REFERENCES `User` (`memberId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QnABoard`
--

LOCK TABLES `QnABoard` WRITE;
/*!40000 ALTER TABLE `QnABoard` DISABLE KEYS */;
/*!40000 ALTER TABLE `QnABoard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QnABoardComment`
--

DROP TABLE IF EXISTS `QnABoardComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QnABoardComment` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `commentContent` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentUserId` int NOT NULL,
  `qnaId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `QnABoardComment_qnaId_fkey` (`qnaId`),
  KEY `QnABoardComment_commentUserId_fkey` (`commentUserId`),
  CONSTRAINT `QnABoardComment_commentUserId_fkey` FOREIGN KEY (`commentUserId`) REFERENCES `User` (`memberId`) ON DELETE CASCADE,
  CONSTRAINT `QnABoardComment_qnaId_fkey` FOREIGN KEY (`qnaId`) REFERENCES `QnABoard` (`qnaId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QnABoardComment`
--

LOCK TABLES `QnABoardComment` WRITE;
/*!40000 ALTER TABLE `QnABoardComment` DISABLE KEYS */;
/*!40000 ALTER TABLE `QnABoardComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `academyId` int NOT NULL,
  `studentName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentPhone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studentHighschool` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `studentBirthYear` int NOT NULL,
  `studentMemo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `memberId` int NOT NULL,
  PRIMARY KEY (`memberId`),
  UNIQUE KEY `Student_studentPhone_key` (`studentPhone`),
  KEY `Student_academyId_fkey` (`academyId`),
  CONSTRAINT `Student_academyId_fkey` FOREIGN KEY (`academyId`) REFERENCES `Academy` (`academyId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Student_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User` (`memberId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userPassword` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `role` enum('DEVELOPER','ADMIN','STUDENT') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'STUDENT',
  `memberId` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`memberId`),
  UNIQUE KEY `User_userId_key` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('bluemayne','$2b$10$OLZk3P8R9DT9QkITALu4nOrFMYRf4VRA74rlxHSDaJ9Z0Ze8COLc6','2025-07-03 10:43:57.438','DEVELOPER',18),('joossameng','$2b$10$DCQX9uKSv3mONsKRgCx7uuRcKhzOoQHxt0gEc3oPwmwPVLcG/yyAu','2025-07-10 16:40:16.167','ADMIN',75),('joossameng02','$2b$10$0FxOO3VCexpYA3oYUdSTOur5bcVoCi9xTQnk2Q2rKYYhqL7RoNrtK','2025-07-10 16:41:01.850','ADMIN',76),('joossameng01@','$2b$10$EjYq/4aov73rsgRHQ74Yjegwu196KrmGP7kA1MQYVMXWzNeqCFExi','2025-07-10 16:42:42.045','ADMIN',78),('joossameng02@','$2b$10$kcPxJ0949fRQJFepEYfTAOnYF.pUOu0ZkDy1AknLBk6Fv2LEG3Ssi','2025-07-10 16:43:03.856','ADMIN',79),('joossameng03@','$2b$10$EQJTweTaAc1uYajYnl.Q8.d8IPaTj4dTBW5PTL0HmrWgRWZFbpbJm','2025-07-10 16:43:33.410','ADMIN',80),('joossameng04@','$2b$10$AK8wB6BRcFTLMzL7LTJSC.9.yEg2Ul/t7TN8YFH2zhnbOvA18BsPu','2025-07-10 16:44:41.434','ADMIN',81),('joossameng05@','$2b$10$P0jZguoeMkjZ.BIiecY50e3Dr4ELeugQRiuYEpbJqEuVLFsXyofX2','2025-07-10 16:45:27.357','ADMIN',82),('joossameng06@','$2b$10$pUCjL401L4/VKBZo/aLsxOkhzPRMGH.CeG0/1fDJn.DEESv.nG9s6','2025-07-10 16:45:53.888','ADMIN',83),('joossameng07@','$2b$10$c/mf9xzSfDHYOAbVJgJ8fuHqIJtdeDVaQG4XZZjup6tr9/hsUhYs6','2025-07-10 16:46:22.680','ADMIN',84),('joossameng08@','$2b$10$tNKpz0eEyqSlvIRMlHdmXeN6MLqGYzoZZ0YVsNvYissKoKJz7Qtrm','2025-07-10 16:46:51.329','ADMIN',85);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'AcademyDB'
--

--
-- Dumping routines for database 'AcademyDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-11  1:59:42
