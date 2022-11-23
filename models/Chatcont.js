// CREATE TABLE `chat_room` (
// 	`room_id`	INT	NOT NULL	AUTO_INCREMENT COMMENT 'PK 채팅방 Index',
// 	`board_id`	VARCHAR(255)	NULL	COMMENT 'FK',
// 	`contactor_id`	VARCHAR(15)	NOT NULL	COMMENT '채팅신청자 아이디',
// 	`created_dt`	DATE	NOT NULL	COMMENT '채팅방생성일자',
// 	`chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: '1' , 그룹채팅방: '2''
// );

// chat_room 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const Chatcont = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "chat_contents",
    {
      // `content_id`	INT	NOT NULL	COMMENT 'auto increment',
      content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // `part_id`	INT	NOT NULL	COMMENT 'FK 참여자 index',
      part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // `message`	VARCHAR(5000)	NOT NULL	COMMENT '채팅방에서 주고받은 메세지',
      message: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "chat_contents", // 실제 DB의 테이블 이름
      freezeTableName: true, // 테이블 이름 고정
      timestamps: true, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
    }
  );
  return model;
};
module.exports = Chatcont;
