create table temp_board (
    article_id int not null auto_increment,
    title varchar(100) not null,
    parity ENUM('ONLINE', 'OFFLINE', '') not null,
    member_number int not null,
    description varchar(5000) not null,
    expr_dt date not null,
    start_dt date not null,
    end_dt date not null,
    createdAt	DATETIME	NOT NULL	COMMENT '생성일',
	updatedAt	DATETIME	NOT NULL	COMMENT '수정일',
    primary key (article_id)
) engine=innodb auto_increment=1 default charset=utf8;

ALTER TABLE `temp_board` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `temp_board` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `user` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `user` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `board` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `board` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `chat_room` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `chat_room` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `chat_participants` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `chat_participants` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `chat_contents` ADD `createdAt` DATETIME NOT NULL;
ALTER TABLE `chat_contents` ADD `updatedAt` DATETIME NOT NULL;

ALTER TABLE `chat_room` MODIFY `updatedAt` DATETIME;
ALTER TABLE `chat_participants` MODIFY `updatedAt` DATETIME;
ALTER TABLE `chat_contents` MODIFY `updatedAt` DATETIME;
ALTER TABLE `user` MODIFY `updatedAt` DATETIME;
ALTER TABLE `board` MODIFY `updatedAt` DATETIME;
ALTER TABLE `temp_board` MODIFY `updatedAt` DATETIME;