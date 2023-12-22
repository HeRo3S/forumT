-- MySQL dump 10.19  Distrib 10.3.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: forumT
-- ------------------------------------------------------
-- Server version	10.3.38-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('465ad277-6e53-4406-be87-b3c63ee83129','bf7256804b958ec00c7cd28ec71a39218db5bed2828785380bfdf4b1443d1ae2','2023-04-10 04:33:43.452','20230410043343_',NULL,NULL,'2023-04-10 04:33:43.287',1),('e253126c-c277-46c0-b919-ae1f0ce3a337','36ce18e1efc888a20d9fd3d86e3ff9284b06b89f71dcb4b8641bf9cb0da58aa6','2023-04-10 04:33:12.977','20230226144159_init',NULL,NULL,'2023-04-10 04:33:12.231',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` mediumtext NOT NULL,
  `postID` int(11) NOT NULL,
  `type` enum('PNG','JPEG','MP4','DOCX') NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `attachments_id_key` (`id`),
  KEY `attachments_postID_idx` (`postID`),
  CONSTRAINT `attachments_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (1,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1681101939115-2301_LAP_WALL_1920x1080_loxjfu.jpg',2,'PNG','2023-04-10 04:45:39.133','2023-12-22 06:28:33.716',NULL),(4,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1682592424705-2023_04_24_014050_vrjlhj.jpg',9,'PNG','2023-04-27 10:47:04.720','2023-12-22 06:28:33.268',NULL),(5,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226520/forumt/1695959931706-puzzle-is-probably-the-most-underrated-genre-with-some-of-v0-me08fztnjzqb1_uvwpyf.jpg',26,'PNG','2023-09-29 03:58:51.833','2023-12-22 06:28:41.906',NULL),(6,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226511/forumt/1695960040681-oot_oc5rzz.jpg',29,'PNG','2023-09-29 04:00:40.683','2023-12-22 06:28:32.293',NULL),(7,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1695960078128-hard-to-believe-this-is-a-screenshot-i-just-took-of-v0-at4z1dw8buqb1_tcj0kr.jpg',30,'PNG','2023-09-29 04:01:18.172','2023-12-22 06:28:33.506',NULL),(8,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1695960124884-i-was-lucky-enough-to-find-this-masterpiece-today-at-the-v0-8c422obi92rb1_sr6yhe.jpg',31,'PNG','2023-09-29 04:02:04.896','2023-12-22 06:28:33.756',NULL),(9,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1695960154805-enjoying-a-walk-through-ireland-on-assassins-creed-valhalla-v0-jp6u3qdcq2rb1_yrhcsi.jpg',32,'PNG','2023-09-29 04:02:34.852','2023-12-22 06:28:33.924',NULL),(10,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1695971353981-homemade-pasta-with-tomato-sauce-v0-3tnjf5fp02rb1_qjaq9g.jpg',36,'PNG','2023-09-29 07:09:13.993','2023-12-22 06:28:33.476',NULL),(12,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703226512/forumt/1700677854873-easy-choice-v0-1wmtibip5u1c1_chwyne.png',46,'PNG','2023-11-22 18:30:54.921','2023-12-22 06:28:33.249',NULL);
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_reactions`
--

DROP TABLE IF EXISTS `comment_reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `commentID` int(11) NOT NULL,
  `reaction` enum('DOWNVOTE','NONE','UPVOTE') NOT NULL DEFAULT 'NONE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `comment_reactions_id_key` (`id`),
  KEY `comment_reactions_username_commentID_idx` (`username`,`commentID`),
  KEY `comment_reactions_commentID_fkey` (`commentID`),
  CONSTRAINT `comment_reactions_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_reactions_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_reactions`
--

LOCK TABLES `comment_reactions` WRITE;
/*!40000 ALTER TABLE `comment_reactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_reports`
--

DROP TABLE IF EXISTS `comment_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `commentID` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` enum('APPROVE','UNHANDLED','BAN') NOT NULL DEFAULT 'UNHANDLED',
  `bannedReason` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comment_reports_id_key` (`id`),
  KEY `comment_reports_status_commentID_bannedReason_idx` (`status`,`commentID`,`bannedReason`),
  KEY `comment_reports_commentID_fkey` (`commentID`),
  KEY `comment_reports_username_fkey` (`username`),
  CONSTRAINT `comment_reports_commentID_fkey` FOREIGN KEY (`commentID`) REFERENCES `comments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_reports_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_reports`
--

LOCK TABLES `comment_reports` WRITE;
/*!40000 ALTER TABLE `comment_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `parentPostID` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `parentGroupname` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `comments_id_key` (`id`),
  KEY `comments_parentPostID_username_idx` (`parentPostID`,`username`),
  KEY `comments_username_fkey` (`username`),
  KEY `comments_parentGroupname_fkey` (`parentGroupname`),
  CONSTRAINT `comments_parentGroupname_fkey` FOREIGN KEY (`parentGroupname`) REFERENCES `groups` (`groupname`) ON UPDATE CASCADE,
  CONSTRAINT `comments_parentPostID_fkey` FOREIGN KEY (`parentPostID`) REFERENCES `posts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comments_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'<p>Hi bạn! Bài viết hay quá</p>',2,'john','2023-04-10 10:56:12.360','2023-04-10 10:56:12.360',NULL,'gaming'),(2,'<p>Bài viết hay!</p>',2,'abc','2023-04-12 23:44:22.737','2023-04-12 23:44:22.737',NULL,'gaming'),(4,'<p>Bài viết hay quá</p>',2,'test1','2023-07-14 14:59:26.267','2023-07-14 14:59:26.267',NULL,'gaming'),(5,'<p>Agree!</p>',1,'test1','2023-07-14 15:01:16.854','2023-07-14 15:01:16.854',NULL,'gaming'),(6,'<p><span style=\"color: rgb(28, 28, 28);\">You don\'t. I love my job and still hate working. I would rather be doing chores around the house or even the yard over working. This is why the antiwork sub is so popular</span></p>',15,'john','2023-09-29 02:49:03.506','2023-09-29 02:49:03.506',NULL,'jobs'),(7,'<p><span style=\"color: rgb(19, 19, 19);\">Making yourself look busy is like 80% of an office job.</span></p>',16,'john','2023-09-29 02:50:03.205','2023-09-29 02:50:03.205',NULL,'jobs'),(8,'<p><span style=\"color: rgb(28, 28, 28);\">You are not alone. It has only been one month and it is quite a shock. It will take quite awhile but your life is not over. You will find pockets of time, and you have some great advice given here. A lot of it has to do with the attitude you take and the attitudes people have around you. You don’t have to accept that “life is over.” It isn’t. When you started college, that was a learning curve. So is this. It will take awhile to find your way, but you will. Take it a day at a time, make sure you are getting sleep, and I’m glad you don’t have a job you hate. I hope things look better in a few months!</span></p>',15,'superadmin','2023-09-29 03:17:11.076','2023-09-29 03:17:11.076',NULL,'jobs'),(9,'<p><span style=\"color: rgb(19, 19, 19);\">While that probably won\'t happen I can see them doing a play first on Gamepass type thing where it\'s available a week early only on gamepass or something.</span></p>',25,'test1','2023-09-29 03:57:27.702','2023-09-29 03:57:27.702',NULL,'gaming'),(10,'<p><span style=\"color: rgb(19, 19, 19);\">Ocean on all sides.</span></p>',34,'john','2023-09-29 07:06:38.136','2023-09-29 07:06:38.136',NULL,'askanything'),(11,'<p>For many jobs, the most difficult part is just getting through a day because it\'s incredibly mundane or tedious, not actually difficult.</p>',35,'john','2023-09-29 07:07:00.561','2023-09-29 07:07:00.561',NULL,'askanything'),(12,'<p>Bài viết hay quá!</p>',45,'john','2023-09-29 15:15:20.735','2023-09-29 15:15:20.735',NULL,'testgroup2'),(13,'<p>Good choice. Really nice!</p>',46,'john','2023-12-06 02:32:25.053','2023-12-06 02:32:25.053',NULL,'gaming'),(15,'<p>Bài viết hay quá!</p>',46,'test7','2023-12-06 07:41:31.337','2023-12-06 07:41:31.337',NULL,'gaming');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(191) NOT NULL,
  `displayname` varchar(191) DEFAULT NULL,
  `ownername` varchar(191) NOT NULL,
  `description` mediumtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  `avatarURL` mediumtext DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','BANNED') NOT NULL DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_id_key` (`id`),
  UNIQUE KEY `groups_groupname_key` (`groupname`),
  KEY `groups_groupname_displayname_idx` (`groupname`,`displayname`),
  KEY `groups_ownername_fkey` (`ownername`),
  CONSTRAINT `groups_ownername_fkey` FOREIGN KEY (`ownername`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'gaming','gaming','john','Nhóm thảo luận về game!','2023-04-10 04:35:27.029','2023-12-22 06:42:44.130',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227363/forumt/1693024726078-gamingLogo_uqd0bl.png','ACTIVE'),(2,'vietnam','Việt Nam','john',NULL,'2023-04-13 11:46:57.041','2023-12-22 06:42:44.232',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227363/forumt/1695976393393-Flag_of_Vietnam.svg_l7njyr.png','ACTIVE'),(3,'food','Ẩm thực','john',NULL,'2023-04-13 11:52:23.439','2023-12-22 06:42:45.837',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227364/forumt/1695976360054-homemade-pasta-with-tomato-sauce-v0-3tnjf5fp02rb1_y4riqo.jpg','ACTIVE'),(4,'jobs','jobs','test1',NULL,'2023-09-29 02:46:00.089','2023-09-29 15:30:07.267',NULL,NULL,'BANNED'),(5,'hoivadap','Hỏi và đáp','superadmin',NULL,'2023-09-29 03:23:23.627','2023-12-06 03:14:01.508',NULL,NULL,'ACTIVE'),(6,'askanything','Ask anything!','superadmin',NULL,'2023-09-29 03:24:05.168','2023-12-06 03:14:41.465',NULL,NULL,'ACTIVE'),(7,'testinggroup1','Testing Group 1','test2',NULL,'2023-09-29 13:41:12.003','2023-12-22 06:42:44.476',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227363/forumt/1695996915086-Flag_of_Vietnam.svg_hut11w.png','ACTIVE'),(8,'testgroup2','Test group 2','test2',NULL,'2023-09-29 15:04:17.192','2023-09-29 15:04:17.192',NULL,NULL,'ACTIVE'),(9,'testinggroup2','testing group 2','test7',NULL,'2023-12-06 03:07:37.826','2023-12-22 06:42:45.302',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227364/forumt/1701847332917-izumo_icon_a2sftr.jpg','ACTIVE');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_reactions`
--

DROP TABLE IF EXISTS `post_reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `postID` int(11) NOT NULL,
  `reaction` enum('DOWNVOTE','NONE','UPVOTE') NOT NULL DEFAULT 'NONE',
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_reactions_id_key` (`id`),
  KEY `post_reactions_username_postID_idx` (`username`,`postID`),
  KEY `post_reactions_postID_fkey` (`postID`),
  CONSTRAINT `post_reactions_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `post_reactions_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_reactions`
--

LOCK TABLES `post_reactions` WRITE;
/*!40000 ALTER TABLE `post_reactions` DISABLE KEYS */;
INSERT INTO `post_reactions` VALUES (1,'john',2,'UPVOTE'),(2,'john',1,'UPVOTE'),(3,'abc',2,'UPVOTE'),(7,'test1',9,'UPVOTE'),(8,'john',9,'UPVOTE'),(9,'test1',2,'NONE'),(10,'test1',1,'NONE'),(11,'test1',17,'UPVOTE'),(12,'test1',16,'NONE'),(13,'test1',15,'UPVOTE'),(14,'john',16,'UPVOTE'),(15,'john',15,'UPVOTE'),(16,'test1',25,'UPVOTE'),(17,'john',25,'UPVOTE'),(18,'john',17,'DOWNVOTE'),(19,'john',35,'NONE'),(20,'john',34,'NONE'),(21,'john',36,'UPVOTE'),(24,'john',39,'NONE'),(25,'john',45,'DOWNVOTE'),(26,'test7',46,'UPVOTE'),(27,'john',46,'NONE');
/*!40000 ALTER TABLE `post_reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_reports`
--

DROP TABLE IF EXISTS `post_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `postID` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `status` enum('APPROVE','UNHANDLED','BAN') NOT NULL DEFAULT 'UNHANDLED',
  `bannedReason` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_reports_id_key` (`id`),
  KEY `post_reports_status_postID_bannedReason_idx` (`status`,`postID`,`bannedReason`),
  KEY `post_reports_postID_fkey` (`postID`),
  KEY `post_reports_username_fkey` (`username`),
  CONSTRAINT `post_reports_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `posts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `post_reports_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_reports`
--

LOCK TABLES `post_reports` WRITE;
/*!40000 ALTER TABLE `post_reports` DISABLE KEYS */;
INSERT INTO `post_reports` VALUES (1,'john',1,'2023-08-12 02:41:25.485','2023-08-12 02:41:25.485','UNHANDLED','spam'),(2,'john',1,'2023-08-12 02:41:49.922','2023-08-12 02:41:49.922','UNHANDLED','miss-info'),(3,'john',1,'2023-08-12 02:46:11.753','2023-08-12 02:46:11.753','UNHANDLED','spam'),(6,'test1',32,'2023-09-29 15:26:47.950','2023-09-29 15:26:47.950','UNHANDLED','miss-info'),(8,'test2',30,'2023-12-14 16:08:13.238','2023-12-14 16:08:13.238','UNHANDLED','spam');
/*!40000 ALTER TABLE `post_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `groupname` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `type` enum('DEFAULT','MEDIA','ATTACHMENT','LINK','POLL') NOT NULL DEFAULT 'DEFAULT',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_id_key` (`id`),
  KEY `posts_title_groupname_username_idx` (`title`,`groupname`,`username`),
  KEY `posts_groupname_fkey` (`groupname`),
  KEY `posts_username_fkey` (`username`),
  CONSTRAINT `posts_groupname_fkey` FOREIGN KEY (`groupname`) REFERENCES `groups` (`groupname`) ON UPDATE CASCADE,
  CONSTRAINT `posts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Đâu là tựa game tệ nhất 2023?','<p>Chắc chắn phải là Babylon\'s fall</p>','gaming','john','DEFAULT','2023-04-10 04:35:50.975','2023-04-10 04:35:50.975',NULL),(2,'Cyanotype Daydream new PV','','gaming','john','MEDIA','2023-04-10 04:45:38.866','2023-04-10 04:45:38.866',NULL),(9,'Who needs a waifu when you can create one yourself?','','gaming','test1','MEDIA','2023-04-27 10:47:04.512','2023-04-27 10:47:04.512',NULL),(15,'How to get used to working a 40 hour week after university?','<p>I graduated last month and have been working full time and I’m still having a hard time adjusting. I loved university as I love learning and studying and I honestly loved classes. I also went to a university that doesn’t have classes Fridays so the last four years were only 4 day weeks. The switch to working full time has been really difficult. I only actually spent about 20 hours on campus a week and while I did spend hours studying I oddly enough love studying so it never really felt like work. My new job however is exhausting. For the first time in years I’m working 5 days a week 8 hours a day and honestly I hate it. 2 days of rest is just not enough after working 5 days. The weekends go by so fast and just like that I’m thrown back into the work week without actually feeling like I got any rest because the 2 days I have are spent cleaning and doing all the chores I’ve neglected during the week. I don’t even hate my job but still every Sunday I want to cry thinking about the week ahead of me.</p><p>How long does it take to get used to full time work?</p><p>Edit: I know a 40 hour work week is normal and I know I just have to suck it up. I was just wondering if you get used to the idea of working 9-5, 5 days a week for the next 40 years and how to make it seem less bleak</p>','jobs','test1','DEFAULT','2023-09-29 02:46:18.648','2023-09-29 02:46:18.648',NULL),(16,'When entering the workforce for the first time, what did you find most surprising?','','jobs','test1','DEFAULT','2023-09-29 02:47:58.434','2023-09-29 02:47:58.434',NULL),(17,'What’s the weirdest thing a medical professional has casually said to you?','','askanything','test1','DEFAULT','2023-09-29 03:25:08.179','2023-09-29 03:25:08.179',NULL),(25,'Games Won\'t Become Xbox Game Pass Exclusive, Phil Spencer says.','https://insider-gaming.com/games-wont-become-xbox-game-pass-exclusive-phil-spencer-says/','gaming','john','LINK','2023-09-29 03:53:49.453','2023-09-29 03:53:49.453',NULL),(26,'Puzzle is probably the most underrated genre with some of the best gaming experiences out there ❤️','','gaming','test1','MEDIA','2023-09-29 03:58:51.684','2023-09-29 03:58:51.684',NULL),(27,'Is it just me, or does it feel like the “console war” was almost gone and suddenly came back?','<p>I frankly always thought the console wars was dumb, just play where your friends are that’s probably the biggest factor of choosing a console.</p><p>However, I have noticed that after the initial few years of the PS4/Xbox generation, this discourse really died down. I really didn’t see a ton of debating or fighting for some time. Everyone was excited for cross play coming to gaming and uniting everyone. The idea of crossplay was unheard of, it was a pipe dream that I could play with all my friends. When it came out, also at the time it felt like there was a lot more friendly competition between developers and console makers. The new consoles came out and there really wasn’t a big measuring contest at least compared with the PS4 and Xbox One.</p><p>Then the past couple of years it suddenly started showing up again. Xbox buying companies, PlayStation buying others seemingly in return, and suddenly the population of trolls and “console fanboys” seemed to skyrocket.</p><p>I won’t say which side I’m on because I’m really not on one. Both companies buying up studios really isn’t good for anyone. I’m sure the last thing the consumers need is for every major game studio to be owned by just a few companies, who are much more likely to axe anything that isn’t in line with everything else.</p>','gaming','test1','DEFAULT','2023-09-29 03:59:24.366','2023-09-29 03:59:24.366',NULL),(28,'How is Insomniac so prolific?','<p>In the time between the release of Marvel\'s Spider-Man and now Insomniac games has released 3 DLCs, an explanation pack sequel for Spiderman, a Ratchet and Clank game, began preprduction on a Wolverine game, and completed the sequel for Marvel\'s Spider-man. Many studies haven\'t even finished one game in that same time. How does Insomniac do it?</p>','gaming','test1','DEFAULT','2023-09-29 03:59:59.425','2023-09-29 03:59:59.425',NULL),(29,'Core gaming memory unlocked.','','gaming','test1','MEDIA','2023-09-29 04:00:40.623','2023-09-29 04:00:40.623',NULL),(30,'Hard to believe this is a screenshot I just took of Cyberpunk and not concept art','','gaming','test1','MEDIA','2023-09-29 04:01:18.109','2023-09-29 04:01:18.109',NULL),(31,'I was lucky enough to find this masterpiece today at the video game store in my city\'s mall.','','gaming','john','MEDIA','2023-09-29 04:02:04.874','2023-09-29 04:02:04.874',NULL),(32,'Enjoying A Walk Through Ireland On Assassins Creed Valhalla.','','gaming','john','MEDIA','2023-09-29 04:02:34.794','2023-09-29 04:02:34.794',NULL),(34,'What does Japan have that Korea doesn\'t have?','','askanything','test1','DEFAULT','2023-09-29 07:05:49.183','2023-09-29 07:05:49.183',NULL),(35,'What profession always acts like they have the hardest job on earth (but it actually isn’t all that bad)?','','askanything','test1','DEFAULT','2023-09-29 07:06:14.000','2023-09-29 07:06:14.000',NULL),(36,'[Homemade] Pasta with tomato sauce','','food','test1','MEDIA','2023-09-29 07:09:13.955','2023-09-29 07:09:13.955',NULL),(39,'Hello!','','testinggroup1','test2','DEFAULT','2023-09-29 13:48:15.628','2023-09-29 13:48:15.628',NULL),(45,'Hello from main account!','<h1><strong>Hello!</strong></h1>','testgroup2','test2','DEFAULT','2023-09-29 15:11:33.891','2023-10-07 12:22:50.644',NULL),(46,'Easy choice','','gaming','john','MEDIA','2023-11-22 18:30:54.595','2023-11-22 18:30:54.595',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_follow_groups`
--

DROP TABLE IF EXISTS `user_follow_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_follow_groups` (
  `username` varchar(191) NOT NULL,
  `groupname` varchar(191) NOT NULL,
  `role` enum('OWNER','MODERATOR','USER','SOFTBANNED','BANNED') NOT NULL DEFAULT 'USER',
  `timeUnbanned` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  UNIQUE KEY `user_follow_groups_username_groupname_key` (`username`,`groupname`),
  KEY `user_follow_groups_username_groupname_role_idx` (`username`,`groupname`,`role`),
  KEY `user_follow_groups_groupname_fkey` (`groupname`),
  CONSTRAINT `user_follow_groups_groupname_fkey` FOREIGN KEY (`groupname`) REFERENCES `groups` (`groupname`) ON UPDATE CASCADE,
  CONSTRAINT `user_follow_groups_username_fkey` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follow_groups`
--

LOCK TABLES `user_follow_groups` WRITE;
/*!40000 ALTER TABLE `user_follow_groups` DISABLE KEYS */;
INSERT INTO `user_follow_groups` VALUES ('abc','food','USER','2023-04-13 11:57:34.866'),('abc','gaming','SOFTBANNED','2023-09-29 15:22:56.915'),('john','askanything','USER','2023-09-29 03:39:23.437'),('john','food','OWNER','2023-04-13 11:52:23.605'),('john','gaming','OWNER','2023-04-10 04:35:27.241'),('john','jobs','USER','2023-09-29 02:49:21.300'),('john','testgroup2','USER','2023-09-29 15:19:30.260'),('john','testinggroup1','MODERATOR','2023-09-29 14:10:44.644'),('john','vietnam','OWNER','2023-04-13 11:46:57.202'),('superadmin','askanything','OWNER','2023-09-29 03:24:05.176'),('superadmin','hoivadap','OWNER','2023-09-29 03:23:23.634'),('test1','askanything','USER','2023-09-29 03:24:35.134'),('test1','gaming','SOFTBANNED','2023-09-29 15:22:58.432'),('test1','jobs','OWNER','2023-09-29 02:46:00.100'),('test1','vietnam','USER','2023-09-01 08:28:01.710'),('test2','food','USER','2023-09-29 13:46:56.882'),('test2','testgroup2','OWNER','2023-09-29 15:04:17.200'),('test2','testinggroup1','USER','2023-09-29 13:41:12.009'),('test3','gaming','SOFTBANNED','2023-12-05 07:46:27.131'),('test4','gaming','SOFTBANNED','2023-12-05 07:47:24.877'),('test5','gaming','SOFTBANNED','2023-12-05 07:47:48.176'),('test6','gaming','SOFTBANNED','2023-12-05 08:33:06.217'),('test7','gaming','USER','2023-12-12 15:35:05.334'),('test7','testinggroup2','OWNER','2023-12-06 03:07:37.832');
/*!40000 ALTER TABLE `user_follow_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `displayname` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` mediumtext NOT NULL,
  `userType` enum('SUPERADMIN','USER') NOT NULL DEFAULT 'USER',
  `description` mediumtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deletedAt` datetime(3) DEFAULT NULL,
  `avatarURL` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_id_key` (`id`),
  UNIQUE KEY `users_username_key` (`username`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_displayname_idx` (`displayname`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john','john','john@gmail.com','50f8a6953712223a412e8b2dc8d090cb:47bc732818d16b33dbd859a15bbf85e0f69ee1bafda79c46579c1a89ff3a2574b6887786b56840a9670dc2c69f2ebb7c62239d070c70b5cd30a79aa82cf9ec57','USER','null','2023-04-10 04:35:11.041',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227363/forumt/1693008865488-title_icon_zv9udo.jpg'),(2,'abc',NULL,'abc@gmail.com','d78a1244a0ea7a9b4b058f6c1d125566:02ef94d573d1878a54a1c954a4ca71944371567c76bef7d0b165be4ede3b7472d748e4f72bffe8c255bf6e5ffb2dca4f7968b952a211d82b47f97c39816be986','USER',NULL,'2023-04-12 21:37:37.190',NULL,NULL),(3,'test1','aaa','test1@gmail.com','46634975d7ff50575f5065ef0c950a35:6dd935e6e52574b78124b10d926585e8d9ccf3c86f30e92fb2637afc8270cbfa16ebccca533674761ca3ffb3c5a981907469579d08b1c928a6efc6cfdf40ae7a','USER','null','2023-04-27 09:30:29.731',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227363/forumt/1687689419904-john_icon_omrwdr.jpg'),(4,'superadmin',NULL,'superadmin@forumT.com','c53b984dc35133fa71b847cbffc3eba5:268ab26dff6860a375cafb65d4215cc7c3fd883c3443fe8d91dbf0cf7ce5dd246dfa212d8e3f00de18d7f8a604fa73a01b076d2d807a37150e13e0ad2b67a971','SUPERADMIN',NULL,'2023-09-06 08:09:14.330',NULL,NULL),(7,'test2',NULL,'test2@gmail.com','76be95df8ec8ee03137a9b657d4fb894:1fd9b7058991a1550ac3b19e50f1c28a8b73e90500481b6237f53c93ba213207ab488ceb3c26b045ab7c54ff3670b032e92b428976b4659c5420be19a3ea33b5','USER',NULL,'2023-09-29 13:40:41.249',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227368/forumt/1702395237607-2301_LAP_WALL_1920x1080_j4eydu.jpg'),(8,'test3',NULL,'test3@gmail.com','d17a4443ac640345c4eb13aceda0d5f6:c6ef52f5aa6a0436483dd4d0fd737f1fa3945e82d73a84a4f4b1ebeec2926f9d7945b3a82716a0a7a70d1c79e1407ddfaca036f53b4bb62bc0ca0f6b93155378','USER',NULL,'2023-12-05 07:46:10.068',NULL,NULL),(9,'test4',NULL,'test4@gmail.com','5a5085762785a4e7f6ec10ad42ec139c:d4985e67727ea6c1eb357fb0a5cd2f844795979262d4b08a5c507284a2c92ca58c678d72ed341b9c932a9f2cb56921cb54ac8f1880a6d3c91839230ef5ba05ad','USER',NULL,'2023-12-05 07:46:47.532',NULL,NULL),(10,'test5',NULL,'test5@gmail.com','2191c8b58b551bae6db5ad753aa50ba0:5e96c96f6179de2a1de5516a39f79140e45b49c08cd4295619de65f74ce8f9ccfdc2ff254ad7fdd7fbe7a3468c08084c302d24e98dbc033e26f8944fef36ee94','USER',NULL,'2023-12-05 07:47:44.647',NULL,NULL),(11,'test6',NULL,'test6@gmail.com','906e4b571ad0d790971b828a84625525:df94a91ab99a70af1f56646ad99ba1b1495a4cb7a8db18b20f4d74d60dafdbf52b7ec51c617649e626040fe9b23e644fcd6f92dee9c26cc6b4b0f8919dc0f234','USER',NULL,'2023-12-05 08:32:41.293',NULL,NULL),(12,'test7','test7','test7@gmail.com','a9c8842cf4fa89368a8c4edbfdc660cb:a17b4318b3d3023a90c21806d818310097518a1eb560c48bc1c12f82ce5d7a40433fae6d5163b4d8014c598dda7f2e1f48e3f77f8511c330164aa106aae7ceac','USER',NULL,'2023-12-05 08:33:20.548',NULL,'https://res.cloudinary.com/dt37pjjs9/image/upload/v1703227366/forumt/1702395316834-2301_LAP_WALL_1920x1080_kn4igv.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-22 14:03:06
