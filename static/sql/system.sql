-- DB생성:project2

CREATE DATABASE project2 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

SHOW databases;

USE project2;
/* 회원정보 */
CREATE TABLE `user` (
 `user_index` INT NOT NULL auto_increment COMMENT '회원 index',
 `user_id` VARCHAR(15) NOT NULL UNIQUE COMMENT '회원아이디',
 `user_pw` VARCHAR(15) NOT NULL COMMENT '비밀번호',
 `user_name` VARCHAR(15) NOT NULL COMMENT '회원의 성명',
 `user_email` VARCHAR(35) NOT NULL COMMENT '회원이메일',
 `user_Lat` DOUBLE NULL COMMENT '위도',
 `user_Lon` DOUBLE NULL COMMENT '경도',
 `prof_img_url` TEXT NULL COMMENT '회원프로필 이미지 url',
 createdAt DATETIME NOT NULL COMMENT '생성일',
 updatedAt DATETIME NOT NULL COMMENT '수정일',
 PRIMARY KEY (`user_index`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
insert into user(user_id, user_pw, user_name, user_email) values('admin', '1234', '관리자', 'admin@example.com');

/* 스터디 모집글 카테고리 */
CREATE TABLE `category` (
 `category_id` INT NOT NULL auto_increment COMMENT '카테고리 Index값',
 `category_img` TEXT NULL COMMENT '카테고리 이미지',
 `category_name` VARCHAR(20) NOT NULL COMMENT '카테고리이름',
 PRIMARY KEY (`category_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* 그룹원 모집글 */
CREATE TABLE `board` (
    `article_id`    INT NOT NULL    auto_increment,
    `user_index`   INT NOT NULL    COMMENT '회원 index',
    `title` VARCHAR(100)    NOT NULL    COMMENT '게시글 제목',
    `parity`    VARCHAR(4)   NOT NULL    DEFAULT ''  COMMENT 'ON 또는 OFF 선택값 저장',
    `category_id`   INT NOT NULL    COMMENT '카테고리 index',
    `member_num`    INT NOT NULL    COMMENT '스터디멤버 수',
    `description`   VARCHAR(5000)   NOT NULL    COMMENT '스터디 내용',
    `expr_dt`   DATE    NOT NULL    COMMENT '게시글 만료일 (모집종료일)',
    `start_dt`  DATE    NOT NULL    COMMENT '스터디 시작일',
    `end_dt`    DATE    NOT NULL    COMMENT '스터디 종료일',
    `appo_area` VARCHAR(100)    NULL    COMMENT '스터디 진행 약속 장소',
    createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME    NOT NULL    COMMENT '수정일',
    PRIMARY KEY (`article_id`),
    FOREIGN KEY (`user_index`) REFERENCES `user`(`user_index`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* 채팅방 */
CREATE TABLE `chat_room` (
    `room_id`   INT NOT NULL    auto_increment  COMMENT 'PK 채팅방 Index',
    `article_id`    INT NOT NULL    COMMENT 'FK',
    `contactor_id`  VARCHAR(15) NOT NULL    COMMENT '채팅신청자 아이디',
    `chat_kind` INT NOT NULL    COMMENT '1:1채팅방: 1 , 그룹채팅방: 2',
    createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME    NOT NULL    COMMENT '수정일',
    PRIMARY KEY (`room_id`),
    FOREIGN KEY (`article_id`) REFERENCES `board`(`article_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


/* 채팅방 참여자 */
CREATE TABLE `chat_participants` (
    `part_id`   INT NOT NULL    auto_increment  COMMENT 'PK 참여자 index',
    `room_id`   INT NOT NULL    COMMENT 'FK 채팅방 index',
    `user_index`   INT NOT NULL    COMMENT 'FK 유저 아이디',
    `pub_status` INT NOT NULL   COMMENT '게시자여부(1게시자 2비게시자)',
	createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME  COMMENT '수정일',
    PRIMARY KEY (`part_id`),
    FOREIGN KEY (`room_id`) REFERENCES `chat_room`(`room_id`),
    FOREIGN KEY (`user_index`) REFERENCES `user`(`user_index`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* 채팅방 메세지 내역 저장 */
 CREATE TABLE `chat_contents` (
 `content_id` INT NOT NULL auto_increment COMMENT 'auto increment',
`part_id` INT NOT NULL COMMENT 'FK 참여자 index',
 `message` VARCHAR(5000) NOT NULL COMMENT '채팅방에서 주고받은 메세지',
 `image` TEXT NULL COMMENT '채팅 이미지url',
 createdAt DATETIME NOT NULL COMMENT '생성일',
 updatedAt DATETIME NOT NULL COMMENT '수정일',
 PRIMARY KEY (`content_id`),
 FOREIGN KEY (`part_id`) REFERENCES `chat_participants`(`part_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (1, '/static/img/react.png', 'React');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (2, '/static/img/java.png', 'JAVA');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (3, '/static/img/nodejs.png', 'NODE.js');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (4, '/static/img/typescript.png', 'Typescript');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (5, '/static/img/spring.png', 'spring');