CREATE DATABASE  IF NOT EXISTS `shopdienthoai` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopdienthoai`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: shopdienthoai
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `img_category` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698922471/r62grxcz8f3w7fo9mjxp.png','Samsung'),(16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698922640/lyaadiyft5feyx4o1dwq.jpg','Iphone'),(20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698922888/ctl9dl9l4xzg7oomy7y0.png','Xiaomi'),(21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698922956/sowei3gsn67kbenmawx2.png','Oppo'),(23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698923377/swftp8u33tcg89i3uhid.png','Nokia'),(24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698923444/lutfiy6u9jn7tsl9mhth.png','Vivo'),(26,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698923610/gkxsm4ikiy8qhk4vaqdq.png','Realme');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `details_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`details_id`),
  KEY `orders-id` (`order_id`),
  KEY `product-id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,3,27,4),(2,4,27,2),(3,5,23,4),(4,6,22,3);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` int NOT NULL,
  `address_order` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user-id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4,'2023-11-09 20:24:50',1080,''),(2,4,'2023-11-09 20:27:19',720,''),(3,4,'2023-11-09 20:28:49',5760,''),(4,4,'2023-11-09 20:30:16',2880,''),(5,3,'2023-11-16 09:15:20',4400,'123 nguyen, Phường Dương Nội, 268, 1'),(6,3,'2023-11-16 09:36:52',2397,'123, Xã Thái Sơn, Huyện Bảo Lâm, Tỉnh Cao Bằng');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `old_price` float NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `new_price` float NOT NULL,
  `promotion_id` int NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `stock` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_promotion` (`promotion_id`),
  KEY `proudct_category` (`category_id`),
  CONSTRAINT `product_promotion` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `proudct_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (22,'Samsung Galaxy S23 8GB 128GB',799,'ĐẶC ĐIỂM NỔI BẬT:\nHiệu năng vượt trội với con chip hàng đầu Qualcomm - Phục vụ tốt nhu cầu đa nhiệm ngày của người dùng.\nTrang bị bộ 3 ống kính với camera chính 50MP - Đem lại khả năng quay video và chụp ra những bức ảnh tốt, hài hòa, sống động hơn.\nNâng ',14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925178/psjtjnjzwid3getsvltt.webp',799,3,'0000-00-00 00:00:00',19),(23,'Samsung Galaxy S23 Ultra 256GB',1100,'ĐẶC ĐIỂM NỔI BẬT:\nThoả sức chụp ảnh, quay video chuyên nghiệp - Camera đến 200MP, chế độ chụp đêm cải tiến, bộ xử lí ảnh thông minh\nChiến game bùng nổ - chip Snapdragon 8 Gen 2 8 nhân tăng tốc độ xử lí, màn hình 120Hz, pin 5.000mAh\nNâng cao hiệu suất làm ',14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925318/ry6vd9pnfqtbojbr7nyu.webp',1100,3,'0000-00-00 00:00:00',16),(24,'Samsung Galaxy Z Flip5 256GB',1000,'ĐẶC ĐIỂM NỔI BẬT:\nThần thái nổi bật, cân mọi phong cách- Lấy cảm hứng từ thiên nhiên với màu sắc thời thượng, xu hướng\nThiết kế thu hút ánh nhìn - Gập không kẽ hỡ, dẫn đầu công nghệ bản lề Flex\nTuyệt tác selfie thoả sức sáng tạo - Camera sau hỗ trợ AI xử ',14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925413/ftvu461ws6ni6rstmc1q.webp',1000,3,'0000-00-00 00:00:00',30),(25,'Samsung Galaxy Z Fold5 12GB 256GB',2000,'ĐẶC ĐIỂM NỔI BẬT:\nThiết kế tinh tế với nếp gấp vô hình - Cải tiến nếp gấp thẩm mĩ hơn và gập không kẽ hở\nBền bỉ bất chấp mọi tình huống - Đạt chuẩn kháng bụi và nước IP68 cùng chất liệu nhôm Armor Aluminum giúp hạn chế cong và xước\nMở ra không gian giải t',14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925605/ab70oe5jdjm6ontdkvrg.webp',1400,4,'0000-00-00 00:00:00',10),(26,'Samsung Galaxy A34 5G 8GB 128GB',400,'ĐẶC ĐIỂM NỔI BẬT:\nThiết kế thu hút mọi góc nhìn với mặt lưng tráng gương cùng 3 gam màu hiện đại\nThoả sức chụp ảnh cùng cụm 3 camera chất lượng có độ phân giải lên đến 48 MP\nMàn hình Super AMOLED tràn viền vô cực mang đến không gian hiển thị tuyệt vời\nCân',14,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925732/tlydikewlzazmsv406ao.webp',360,2,'0000-00-00 00:00:00',0),(27,'iPhone 15 Pro Max 256GB | Chính hãng VN/A',1600,'ĐẶC ĐIỂM NỔI BẬT:\nThiết kế khung viền từ titan chuẩn hàng không vũ trụ - Cực nhẹ, bền cùng viền cạnh mỏng cầm nắm thoải mái\nHiệu năng Pro chiến game thả ga - Chip A17 Pro mang lại hiệu năng đồ họa vô cùng sống động và chân thực\nThoả sức sáng tạo và quay p',16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698925843/aqzbrbsgqlm2jr6i6zvp.webp',1440,2,'0000-00-00 00:00:00',0),(28,'iPhone 14 Pro Max 128GB | Chính hãng VN/A',1100,'ĐẶC ĐIỂM NỔI BẬT:\nMàn hình Dynamic Island - Sự biến mất của màn hình tai thỏ thay thế bằng thiết kế viên thuốc, OLED 6,7 inch, hỗ trợ always-on display\nCấu hình iPhone 14 Pro Max mạnh mẽ, hiệu năng cực khủng từ chipset A16 Bionic\nLàm chủ công nghệ nhiếp ả',16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926009/p0x1amfy3vcfqlxtivnr.webp',1100,3,'0000-00-00 00:00:00',7),(29,'iPhone 13 128GB | Chính hãng VN/A',800,'ĐẶC ĐIỂM NỔI BẬT:\nHiệu năng vượt trội - Chip Apple A15 Bionic mạnh mẽ, hỗ trợ mạng 5G tốc độ cao\nKhông gian hiển thị sống động - Màn hình 6.1\" Super Retina XDR độ sáng cao, sắc nét\nTrải nghiệm điện ảnh đỉnh cao - Camera kép 12MP, hỗ trợ ổn định hình ảnh q',16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926085/uknq1lswrlptsv2rhhre.webp',800,3,'0000-00-00 00:00:00',9),(30,'iPhone 12 64GB | Chính hãng VN/A',750,'ĐẶC ĐIỂM NỔI BẬT:\nMạnh mẽ, siêu nhanh với chip A14, RAM 4GB, mạng 5G tốc độ cao\nRực rỡ, sắc nét, độ sáng cao - Màn hình OLED cao cấp, Super Retina XDR hỗ trợ HDR10, Dolby Vision\nChụp đêm ấn tượng - Night Mode cho 2 camera, thuật toán Deep Fusion, Smart HD',16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926192/yqcv0cjyaqrsujxtwi9w.webp',750,3,'0000-00-00 00:00:00',100),(31,'iPhone 11 64GB | Chính hãng VN/A',500,'ĐẶC ĐIỂM NỔI BẬT:\nMàu sắc phù hợp cá tính - 6 màu sắc bắt mắt để lựa chọn\nHiệu năng mượt mà, ổn định - Chip A13, RAM 4GB\nBắt trọn khung hình - Camera kép hỗ trợ góc rộng, chế độ Night Mode\nYên tâm sử dụng - Kháng nước, kháng bụi IP68, kính cường lực Goril',16,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926279/ggrgjram9usnscgzqilc.webp',500,3,'0000-00-00 00:00:00',80),(32,'Xiaomi Redmi Note 12 8GB 128GB',250,'ĐẶC ĐIỂM NỔI BẬT:\nTrải nghiệm hình ảnh mượt mà và liền mạch nhờ tốc độ làm mới cao 120Hz.\nHiệu năng vượt trội và được tăng cường với chip xử lý Snapdragon® 685 6nm mạnh mẽ.\nNăng lượng cho cả ngày dài nhờ vào viên pin lên đến 5000mAh đi kèm sạc nhanh 33W\nB',20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926435/jcklxbnqizvmdrw9zubs.webp',250,3,'0000-00-00 00:00:00',60),(33,'Xiaomi 13T Pro 5G (12GB - 512GB)',800,'ĐẶC ĐIỂM NỔI BẬT:\nNhiếp ảnh chuyên ngiệp, nắm giữ tuyệt tác trong tầm tay - Cụm camera đến, ống kính Leica với 2 phong cách ảnh\nHiệu năng bất chấp mọi tác vụ - Bộ vi xử lý Dimensity 9200+ Ultra mạnh mẽ cùng RAM 12GB cho đa nhiệm mượt mà\nNăng lượng bất tận',20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926500/o5tbo8iuhcfz4zsncrpj.webp',800,3,'0000-00-00 00:00:00',70),(34,' Xiaomi Redmi Note 12 Pro 5G',400,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế hiện đại, trẻ trung với mặt lưng kính thời thượng và khung viền kim loại vuông vức sang trọng\nTấm nền AMOLED cho khả năng hiển thị rõ nét, tần số quét 120Hz giúp mọi thao tác trở nên mượt mà\nChinh chiến mọi tựa game, tha hồ đa nh',20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926566/r12dwurkjzgkjjplljv2.webp',400,3,'0000-00-00 00:00:00',20),(35,'Xiaomi Redmi 12C 4GB 64GB',100,'ĐẶC ĐIỂM NỔI BẬT\nỔn định hiệu năng - Chip MediaTek Helio G85 mạnh mẽ xử lí tốt các tác vụ thường ngày\nSử dụng đa nhiệm nhiều ứng dụng, thao tác cùng lúc tốt hơn - Hỗ trợ bộ nhớ mở rộng\nGiải trí thả ga - Màn hình 6.71\" HD+ cho khung hình rõ nét\nẢnh sắc nét',20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926644/oz5k1xcijyipz7ckdmr5.webp',90,2,'0000-00-00 00:00:00',40),(36,'Xiaomi 13 Lite',450,'ĐẶC ĐIỂM NỔI BẬT:\nHệ thống camera hàng đầu - Camera kép selfie cùng khung hình động đem lại những bức ảnh kiệt tác\nThiết kế mỏng nhẹ, đem lại sự thoải mái trong cầm nắm\nĐắm chìm vào không gian giải trí sống động - AMOLED 120Hz giúp thao tác cuộn mượt mà\nS',20,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926772/bg53bz9e9eyciutoe8vw.webp',450,3,'0000-00-00 00:00:00',50),(37,'OPPO Reno10 5G 8GB 256GB',500,'ĐẶC ĐIỂM NỔI BẬT\nChuyên gia chân dung thế hệ thứ 10 - Camera chân dung 32MP siêu nét, chụp xa từ 2X-5X không lo biến dạng khung hình\nThiết kế nổi bật, dẫn đầu xu hướng - Cạnh viền cong 3D, các phiên bản màu sắc phù hợp đa cá tính, thu hút mọi ánh nhìn\nĐa ',21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698926978/rhiswbnci4bpduwqwj4z.webp',500,3,'0000-00-00 00:00:00',80),(38,'OPPO Find N2 Flip',850,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế bền bỉ cho phép gập đến 400.000 lần, giúp dễ dàng gấp gọn và mang theo\nMàn hình phụ kích thước 3.26 inch cho khả năng hiển thị trực quan và nhiều chi tiết\nHệ thống ống kính chất lượng cao với cảm biến Sony IMX890 có độ phân giải ',21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927047/gf3rbvhnjxtcbwjydgjq.webp',850,3,'0000-00-00 00:00:00',90),(39,'OPPO Reno7 5G (8GB 256GB)',700,'ĐẶC ĐIỂM NỔI BẬT\nTrải nghiệm mọi tác vụ mượt mà - Chip MediaTek Dimensity 900 5G mạnh mẽ, RAM khủng 8 GB\nGhi lại những câu chuyện sống động màu sắc - Camera chính 64MP, camera selfie độ phân giải cao\nNăng lượng bền bỉ cho cả ngày dài - Viên pin lớn 4500 m',21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927140/xlh32oqbxodyejht231q.webp',490,4,'0000-00-00 00:00:00',30),(40,'OPPO Reno8 T 4G 256GB',350,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế thời thượng - Tràn viền, mỏng nhẹ đặc biệt phù hợp với các bạn trẻ, yêu khám phá xu hướng mới\nGiải trí ấn tượng - Màn hình 16 triệu màu, tần số quét 90Hz ấn tượng\nChụp ảnh chân dung chuyên nghiệp - Camera 100MP sắc nét đi kèm thu',21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927206/v3oovrpdzigzqwu1lfgn.webp',350,3,'0000-00-00 00:00:00',60),(41,'OPPO Reno6 5G',600,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế ấn tượng, màu sắc cá tính - Thiết kế tràn viền, mỏng nhẹ chỉ 182g\nTăng tốc kết nối, dẫn đầu xu hướng - Dimensity 900 5G (6 nm) mạnh mẽ, kết nối 5G siêu nhanh\nChuyên gia nhiếp ảnh chân dung - Bộ 3 camera lên tới 64 MP, sắc nét, ấn',21,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927740/lfymofatrprl2gwyivxw.webp',420,4,'0000-00-00 00:00:00',70),(42,'Nokia C21 Plus 2GB 32GB',75,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế tinh giản hiện đại, bền bỉ chắc chắn - Chất liệu khung nguyên khối và nhựa cứng\nGiải trí sắc nét, sống động từng chi tiết - Màn hình HD+ 6.52 inches\nCấu hình ổn định trong phân khúc - Chip Unisoc SC9863A, RAM 2GB\nBắt t',23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927873/lsi57mvroaj1rgrzing1.jpg',75,3,'0000-00-00 00:00:00',20),(43,'Điện thoại Nokia 8210 4G 128MB',70,'ĐẶC ĐIỂM NỔI BẬT\nNhỏ gọn, tinh tế đến từng chi tiết - Mặt lưng và khung máy được hoàn thiện từ nhựa Polycarbonate, có các màu sắc trẻ trung\nMàn hình hiển thị to rõ - Với kích thước 2.8\" cùng độ phân giải QVGA (240 x 320 pixels) đem lại chất lượng hiển thị',23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698927927/veyr3sj3klowk7o9by1c.webp',70,3,'0000-00-00 00:00:00',10),(44,'Nokia 5710 XpressAudio',80,'ĐẶC ĐIỂM NỔI BẬT\nLoa ngoài to rõ cho âm thanh sống động, nghe radio tiện lợi không cần kết nối tai nghe\nMàn hình lớn 2.4’ cùng thiết kế ấn tượng độc đáo với 2 màu sắc kết hợp tạo phong cách nổi bật thu hút\nCamera kèm đèn flash dễ dàng bắt trọn mọi',23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928119/jhfhdecmev8casywkm3v.webp',80,3,'0000-00-00 00:00:00',5),(45,'Nokia G22 4GB 128GB',150,'ĐẶC ĐIỂM NỔI BẬT\nTấm nền AMOLED mang đến chất lượng hiển thị rõ nét và chân thực\nBắt trọn mọi khoảnh khắc hàng ngày với camera chính lên đến 50MP\nThiết kế thanh lịch, trọng lượng nhẹ cùng chất liệu nhựa siêu bền bỉ\nChip Unisoc T606 cùng RAM 4GB giúp xử lý',23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928167/ixiuwwaz77zxgjxgavlr.webp',150,3,'0000-00-00 00:00:00',6),(46,'Nokia 105 4G Pro',30,'ĐẶC ĐIỂM NỔI BẬT\nMàn hình IPS, kích thước chữ lớn cho hiển thị tốt hơn\nThiết kế nhỏ gọn cùng bàn phím lớn, phím nổi với độ đàn hồi cao\nÂm lượng loa lớn hơn, thưởng thức đài FM không cần cắm tai nghe\nMặt lưng vân nhám giúp cầm nắm dễ dàng, màu sắc trẻ tru',23,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928231/o5sub8tpfxxk6n6kkqgh.webp',30,3,'0000-00-00 00:00:00',7),(47,'vivo V29E 8GB 256GB',400,'ĐẶC ĐIỂM NỔI BẬT\nHiệu năng vượt trội với chip Snapdragon 695 - Giúp bạn xử lý các tác vụ mượt mà không cần phải lo lắng có bị giật, lag.\nMàn hình Sunlight AMOLED 120Hz - Cho hình ảnh sắc nét, màu sắc tươi sáng, trung thực.\nPin khủng kèm sạc siêu siêu tốc ',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928430/rtscly3toihvsuln4giu.webp',400,3,'0000-00-00 00:00:00',2),(48,'vivo Y17s 4GB 128GB',200,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế trendy, màu sắc xu hướng - 2 màu sắc Tím Sao Băng, Xanh Rừng Sâu nổi bật phong cách của bạn\nHoàn hảo mọi góc chụp - Camera chính 50MP chụp chân dung và chụp đêm chuyên nghiệp, cho ảnh chất lượng cao\nĐa nhiệm mượt, xử lí nhanh - R',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928753/skkb5fpnr6raciu3e730.webp',200,3,'0000-00-00 00:00:00',0),(49,'vivo Y22S 8GB 128GB',270,'ĐẶC ĐIỂM NỔI BẬT\nMàn hình màu sắc rực rỡ, thoả sức lướt web, xem phim 6.55\"\", 1612x720 (HD+), 90Hz\nVận hành trơn tru và mượt mà - Bộ vi xử lý Snapdragon 680 8 nhân, RAM 8GB + Mở rộng 8GB\nGhi lại trọn vẹn khoảnh khắc đêm - Cụm camera sắc nét 50MP+2MP với đ',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928834/k6oqw69qdzedb7hre8rc.webp',270,3,'0000-00-00 00:00:00',80),(50,'vivo Y02t 4GB 64GB',150,'ĐẶC ĐIỂM NỔI BẬT\nCông nghệ hiện đại cùng thiết kế cổ điển, tạo nên cụm camera hoàn hảo với vẻ đẹp đơn giản, tinh tế.\nTạm biệt nỗi lo pin yếu với dung lượng pin lên đến 5000mAh.\nMàn hình tràn viền với độ phân giải HD+ giúp bạn có trải nghiệm thị giác rộng ',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928905/cdlx4c0bbstibbg2xxll.webp',150,3,'0000-00-00 00:00:00',60),(51,'vivo V25 5G 8GB 128GB',300,'ĐẶC ĐIỂM NỔI BẬT\nThiết kế tinh tế đầy sang trọng - Kính phủ đều hai mặt, 2 viền mỏng cùng màu sắc hết sức trẻ trung và hiện đại\nThoả sức chụp ảnh selfie chất lượng cao - Camera chính độ phân giải 64 MP đi kèm nhiều tính năng cao cấp\nTái hiện hình ảnh ',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1698928987/ozhq3yha4mkgjmfped9v.webp',270,2,'0000-00-00 00:00:00',50),(52,'asdfa',10,'asdfas',24,'https://res.cloudinary.com/dbjejtjkf/image/upload/v1699563138/tqooxvg25pwybzxpmbmu.png',9,2,'2023-11-09 20:53:13',35);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `discount` float NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `promotion_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (2,10,'2023-09-08','2023-09-30','NEW'),(3,0,'0000-00-00','0000-00-00','COST'),(4,30,'0000-00-00','0000-00-00','30');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `review_text` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `review_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'tran trong dinh','$2b$10$Z4z2BxaRjPWvxAOnsiwDduay8sCOOtKnwdXqs26azUpOQeNhGrL1u','trantrongdinh@gmail.com','tran trong dinh','bla bla',332603254),(4,'trantrongdinh022','$2b$10$oyrYdNqbRwPOmQhXjl01AO6Gbw1KF2AXlhVULLt80uvq4Ozk5lcRe','trantrongdinh0221@gmail.com','tran trong dinh','bla bla',332603256);
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

-- Dump completed on 2023-11-16 16:38:08
