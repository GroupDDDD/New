CREATE TABLE `board` (
	`article_id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT 'auto increment',
	`user_index`	INT	NOT NULL	COMMENT '회원 index',
	`title`	VARCHAR(100)	NOT NULL	COMMENT '게시글 제목',
	`parity`	VARCHAR(4)	NOT NULL	COMMENT 'ON 또는 OFF 선택값 저장',
	`member_num`	INT	NOT NULL	COMMENT '스터디멤버 수',
	`description`	VARCHAR(5000)	NOT NULL	COMMENT '스터디 내용',
	`expr_dt`	DATE	NOT NULL	COMMENT '게시글 만료일 (모집종료일)',
	`start_dt`	DATE	NOT NULL	COMMENT '스터디 시작일',
	`end_dt`	DATE	NOT NULL	COMMENT '스터디 종료일',
	`appo_time`	DATE	NOT NULL	COMMENT '스터디 진행 약속 시간',
	`appo_area`	VARCHAR(100)	NULL	COMMENT '스터디 진행 약속 장소',
	`createdAt`	DATETIME	NOT NULL	COMMENT '게시글 생성일자',
	`updatedAt`	DATETIME	NULL	COMMENT '게시글 수정일자',
	PRIMARY KEY(`article_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `chat_room` (
	`room_id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT 'PK 채팅방 Index',
	`article_id`	INT	NOT NULL	COMMENT 'auto increment',
	`contactor_id`	VARCHAR(15)	NOT NULL	COMMENT '채팅신청자 아이디',
	`chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: 1 , 그룹채팅방: 2',
	`createdAt`	DATETIME	NOT NULL	COMMENT '채팅방생성일자',
	`updatedAt`	DATETIME	NULL	COMMENT '수정일자',
	PRIMARY KEY(`room_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `user` (
	`user_index`	INT	NOT NULL	AUTO_INCREMENT	COMMENT '회원 index',
	`user_id`	VARCHAR(15)	NOT NULL	COMMENT '회원아이디',
	`user_pw`	VARCHAR(15)	NOT NULL	COMMENT '비밀번호',
	`user_name`	VARCHAR(15)	NOT NULL	COMMENT '회원의 성명',
	`user_email`	VARCHAR(35)	NOT NULL	COMMENT '회원이메일',
	`user_sido`	VARCHAR(15)	NULL	COMMENT '회원의 주소(시도)',
	`user_sigungu`	VARCHAR(15)	NULL	COMMENT '회원의 주소(시군구)',
	`user_bname`	VARCHAR(15)	NULL	COMMENT '회원의 주소(읍면동)',
	`user_roadname`	VARCHAR(15)	NULL	COMMENT '회원의 주소(도로명)',
	`prof_img_url`	TEXT	NULL	COMMENT '회원프로필 이미지 url',
	PRIMARY KEY (`user_index`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `chat_contents` (
	`content_id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT 'auto increment',
	`part_id`	INT	NOT NULL	COMMENT 'FK 참여자 index',
	`message`	VARCHAR(5000)	NOT NULL	COMMENT '채팅방에서 주고받은 메세지',
	`image`	TEXT	NULL	COMMENT '채팅 이미지url',
	`createdAt`	DATETIME	NOT NULL	COMMENT '채팅글 생성일자',
	`updatedAt`	DATETIME	NULL	COMMENT '업데이트 시간',
	PRIMARY KEY(`content_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `category` (
	`category_id`	INT	NOT NULL	COMMENT '카테고리 Index값',
	`category_img`	TEXT	NULL	COMMENT '카테고리 이미지',
	`category_name`	VARCHAR(20)	NOT NULL	COMMENT '카테고리이름',
	PRIMARY KEY(`category_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `aria` (
	`aria_id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT '활동지역 Index',
	`appo_aria`	VARCHAR(100)	NULL	COMMENT '스터디 진행 약속 장소',
	`Field`	VARCHAR(255)	NULL,
	PRIMARY KEY(`aria_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `attachment` (
	`id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT 'auto increment',
	`data_loc`	TEXT	NOT NULL,
	`file_name`	VARCHAR(255)	NOT NULL,
	PRIMARY KEY(`id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `chat_participants` (
	`part_id`	INT	NOT NULL	AUTO_INCREMENT	COMMENT 'PK 참여자table index',
	`room_id`	INT	NOT NULL	COMMENT 'FK 채팅방 index',
	`user_index`	INT	NOT NULL	COMMENT '회원 index',
	`pub_status`	INT	NOT NULL	COMMENT '게시자여부(1게시자 2비게시자)',
	`createdAt`	DATETIME	NOT NULL	COMMENT '생성일',
	`updatedAt`	DATETIME	NULL	COMMENT '수정일',
	PRIMARY KEY(`part_id`)
)engine=innodb auto_increment=1 default charset=utf8;

CREATE TABLE `cat_selected` (
	`category_id`	INT	NOT NULL	COMMENT '카테고리 Index값',
	`article_id`	INT	NOT NULL,
	PRIMARY KEY(`category_id`)gi
)engine=innodb auto_increment=1 default charset=utf8;


INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (1, '', '학교공부');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (2, '', '어학');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (3, '', '취업');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (4, '', '자격증');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (5, '', '공무원/임용');
INSERT INTO `category` (`category_id`, `category_img`, `category_name`) VALUES (6, '', '아무거나');

INSERT INTO `user` VALUES (1, 'admin', 'admin', 'admin', 'admin@admin.com', '', '', '', '', '');