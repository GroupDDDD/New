-- DB생성:project2

CREATE DATABASE project2 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

SHOW databases;

USE project2;


/* 게시글 */

/* 회원정보 */
/* 회원정보 */
CREATE TABLE `user` (
    `user_id`   INT NOT NULL    auto_increment  COMMENT '회원 index',
    `id`    VARCHAR(15) NOT NULL    COMMENT '회원아이디',
    `pw`    VARCHAR(15) NOT NULL    COMMENT '비밀번호',
    `user_name` VARCHAR(15) NOT NULL    COMMENT '회원의 성명',
    `user_email`    VARCHAR(15) NOT NULL    COMMENT '회원이메일',
    `prof_img_url`  TEXT    NULL    COMMENT '회원프로필 이미지 url',
    `created_dt`    DATE    NOT NULL    COMMENT '회원가입일자',
    createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME    NOT NULL    COMMENT '수정일',
    PRIMARY KEY (`user_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 그룹원 모집글 */
CREATE TABLE `board` (
    `article_id`    INT NOT NULL    auto_increment,
    `user_id`   INT NOT NULL    COMMENT '회원 index',
    `title` VARCHAR(100)    NOT NULL    COMMENT '게시글 제목',
    `parity`    ENUM('ONLINE', 'OFFLINE', '')   NOT NULL    DEFAULT ''  COMMENT 'ON 또는 OFF 선택값 저장',
    `member_num`    INT NOT NULL    COMMENT '스터디멤버 수',
    `description`   VARCHAR(5000)   NOT NULL    COMMENT '스터디 내용',
    `expr_dt`   DATE    NOT NULL    COMMENT '게시글 만료일 (모집종료일)',
    `start_dt`  DATE    NOT NULL    COMMENT '스터디 시작일',
    `end_dt`    DATE    NOT NULL    COMMENT '스터디 종료일',
    `appo_time` DATE    NULL    COMMENT '스터디 진행 약속 시간',
    `appo_aria` VARCHAR(100)    NULL    COMMENT '스터디 진행 약속 장소',
    createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME    NOT NULL    COMMENT '수정일',
    PRIMARY KEY (`article_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
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
    `user_id`   INT NOT NULL    COMMENT 'FK 유저 아이디',
    'pub_status' INT NOT NULL   COMMENT '게시자여부(1게시자 2비게시자)',
createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME  COMMENT '수정일',
    PRIMARY KEY (`part_id`),
    FOREIGN KEY (`room_id`) REFERENCES `chat_room`(`room_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 채팅방 메세지 내역 저장 */
CREATE TABLE `chat_contents` (
    `content_id`    INT NOT NULL    auto_increment  COMMENT 'auto increment',
    `part_id`   INT NOT NULL    COMMENT 'FK 참여자 index',
    `message`   VARCHAR(5000)   NOT NULL    COMMENT '채팅방에서 주고받은 메세지',
    `image` TEXT    NULL    COMMENT '채팅 이미지url',
    createdAt   DATETIME    NOT NULL    COMMENT '생성일',
    updatedAt   DATETIME    NOT NULL    COMMENT '수정일',
    PRIMARY KEY (`content_id`),
    FOREIGN KEY (`part_id`) REFERENCES `chat_participants`(`part_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 스터디 모집글 카테고리 */
CREATE TABLE `category` (
    `category_id`   INT NOT NULL    auto_increment  COMMENT '카테고리 Index값',
    `category_img`  TEXT    NULL    COMMENT '카테고리 이미지',
    `category_name` VARCHAR(20) NOT NULL    COMMENT '카테고리이름',
    PRIMARY KEY (`category_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 스터디 모집글 카테고리 (선택됨) */
CREATE TABLE `cat_selected` (
    `category_id`   INT NOT NULL    COMMENT '카테고리 Index값',
    `article_id`    INT NULL    COMMENT 'auto increment',
    PRIMARY KEY (`category_id`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`),
    FOREIGN KEY (`article_id`) REFERENCES `board`(`article_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 활동지역 */
CREATE TABLE `aria` (
    `aria_id`   INT NOT NULL    auto_increment  COMMENT '활동지역 Index',
    `appo_aria` VARCHAR(100)    NULL    COMMENT '스터디 진행 약속 장소',
    `Field` VARCHAR(255)    NULL,
    PRIMARY KEY (`aria_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/* 첨부파일 */
CREATE TABLE `attachment` (
    `id`    INT NOT NULL    auto_increment  COMMENT 'auto increment',
    `data_loc`  TEXT    NOT NULL,
    `file_name` VARCHAR(255)    NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
desc user;

CREATE TABLE `chat_room` (
    `room_id`   INT NOT NULL    auto_increment  COMMENT 'PK 채팅방 Index',
    `article_id`    INT NOT NULL    COMMENT 'FK',
    `contactor_id`  VARCHAR(15) NOT NULL    COMMENT '채팅신청자 아이디',
    `chat_kind` 
-- INSERT문
-- user테이블 테스트 데이터 입력
   INSERT INTO user (user_id, user_pw, user_name, user_email, prof_img_url) VALUES('publisher1', '1111', '게시자1', 'test@test.com','https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg');
   
   INSERT INTO user (user_id, user_pw, user_name, user_email, prof_img_url) VALUES('contactor1', '1111', '채팅신청자1', 'test@test.com','https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg');

   INSERT INTO user (user_id, user_pw, user_name, user_email, prof_img_url) VALUES('contactor2', '1111', '채팅신청자2', 'test@test.com','https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg');



INSERT INTO board (user_index,title, parity,member_num,description,expr_dt,start_dt,end_dt,appo_time,appo_aria,createdAt, updatedAt) VALUES ('1', '테스트1', 'OFF', '5', '스터디 내용','20221122','20221130','20221201','20221201','염리동','20221122','20221121');

-- chat_room테이블 테스트 데이터 입력
INSERT INTO chat_room (article_id, contactor_id, chat_kind, createdAt, updatedAt) VALUES ('1', '2', '1', '20221122', '20221122');

INSERT INTO chat_room (article_id, contactor_id, chat_kind, createdAt, updatedAt) VALUES ('1', '3', '1', '20221122', '20221122');

-- chat_participants테이블 테스트 데이터 입력
INSERT INTO chat_participants (room_id, user_index, pub_status, createdAt) VALUES ('1', '1', '1', '20221122');

INSERT INTO chat_participants (room_id, user_index, pub_status, createdAt) VALUES ('1', '2', '2', '20221122');

INSERT INTO chat_participants (room_id, user_index,  pub_status, createdAt) VALUES ('1', '3', '2', '20221122');

-- chat_contents테이블 테스트 데이터 입력
INSERT INTO chat_contents (part_id, message, createdAt, updatedAt) VALUES ('2', '안녕하세요.', '20221122', '20221122');

INSERT INTO chat_contents (part_id, message, createdAt, updatedAt) VALUES ('1', '안녕하세요', '20221122', '20221122');

INSERT INTO chat_contents (part_id, message, createdAt, updatedAt) VALUES ('2', '스터디참가하고싶습니다.', '20221122', '20221122');

INSERT INTO chat_contents (part_id, message, createdAt, updatedAt) VALUES ('1', '누구세요', '20221122', '20221122');

-- DROP테이블( 순서대로 )
drop table chat_contents;

drop table chat_participants;

drop table chat_room;

drop table cat_selected;

drop table aria;

drop table attachment;

drop table category;

drop table board;

drop table user;

-- 테이블 수정( updatedAt null로 수정)

alter table chat_room modify column contactor_id INT	NOT NULL;

alter table board modify column createdAt datetime NOT NULL;

ALTER TABLE board ADD createdAt datetime AFTER appo_aria;

ALTER TABLE board ADD updatedAt datetime AFTER createdAt;

ALTER TABLE board DROP created_dt;

alter table chat_participants modify column pub_status int NOT NULL;

ALTER TABLE chat_participants DROP pub_status;



-- chat_participants pub_status
ALTER TABLE chat_participants ADD pub_status int NOT NULL AFTER user_id;

UPDATE chat_participants SET pub_status='2' WHERE part_id ='2';

-- 채팅방리스트 조회


  SELECT u.prof_img_url, r.user_name, b.title  
  FROM chat_room AS r
  
  JOIN board AS b
  ON r.article_id = b.article_id
  
  JOIN chat_participants AS p
  ON r.room_id = p.room_id

  JOIN user AS u
  ON r.contactor_id = u.user_index
  
  WHERE p.pub_status = '2' 
  and b.user_index = '1';

  UPDATE chat_participants SET pub_status = '2' where part_id ='3';


-- 채팅방내용 조회
-- '2' 채팅신청자 아이디
-- '1' 게시글작성자 아이디

  SELECT *  
  FROM chat_contents AS c
  
  JOIN chat_participants AS p
  ON c.part_id = p.part_id
  
  JOIN user AS u
  ON p.user_index = u.user_index

  WHERE (p.room_id = '1'
  and p.user_index ='2') or (p.room_id = '1'
  and p.user_index ='1')
  ORDER BY c.createdAt desc;


    SELECT * 
  FROM chat_room AS r
  
  JOIN board AS b
  ON r.article_id = b.article_id
  
  JOIN chat_participants AS p
  ON r.room_id = p.room_id

  JOIN user AS u
  ON r.contactor_id = u.user_index
  
  WHERE p.pub_status = '2' 
  and b.user_index = '1';


--   채팅방리스트조회 최종

  SELECT r.room_id, u.prof_img_url, u.user_name, b.title  
  FROM chat_room AS r
  
  JOIN board AS b
  ON r.article_id = b.article_id

  JOIN user AS u
  ON r.contactor_id = u.user_index
  
  WHERE b.user_index = '1';


--   채팅방 있는지 여부조회 게시자용


 SELECT *
    ->   FROM chat_room AS r
    ->
    ->   JOIN board AS b
    ->   ON r.article_id = b.article_id
    ->
    ->   WHERE r.article_id ='1'
    ->   and b.user_index='1';

    -- 채팅방 있는지 조회(채팅신청자용)

  SELECT *  
  FROM chat_room 
  
  WHERE article_id ='1'
  and contactor_id='2';
  



