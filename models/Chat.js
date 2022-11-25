// CREATE TABLE `chat_room` (
// 	`room_id`	INT	NOT NULL	AUTO_INCREMENT COMMENT 'PK 채팅방 Index',
// 	`board_id`	VARCHAR(255)	NULL	COMMENT 'FK',
// 	`contactor_id`	VARCHAR(15)	NOT NULL	COMMENT '채팅신청자 아이디',
// 	`created_dt`	DATE	NOT NULL	COMMENT '채팅방생성일자',
// 	`chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: '1' , 그룹채팅방: '2''
// );

// chat_room 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const Chat = function (Sequelize, DataTypes) {
  // Sequelize: models/index.js 의 sequelize
  // DataTypes: models/index.js 의 Sequelize
  // Sequelize.define(param1, param2, param3)
  // param1: 모델 이름 설정 -> ''
  // param2: 컬럼 정의 -> {}
  // param3: 모델 옵션 정의 -> {}
  const model = Sequelize.define(
    "chat_room",
    {
      // `room_id`	INT	NOT NULL	COMMENT 'PK 채팅방 Index',
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // `board_id`	VARCHAR(255)	NULL	COMMENT 'FK',
      article_id: {
        type: DataTypes.INT,
        allowNull: false,
      },
      // `contactor_id`	VARCHAR(15)	NOT NULL	COMMENT '채팅신청자 아이디',
      contactor_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      // `created_dt`	DATE	NOT NULL	COMMENT '채팅방생성일자',
      chat_kind: {
        type: DataTypes.INT,
        allowNull: false,
      },
      // `chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: '1' , 그룹채팅방: '2''
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // `chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: '1' , 그룹채팅방: '2''
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "chat_room", // 실제 DB의 테이블 이름
      freezeTableName: true, // 테이블 이름 고정
      timestamps: true, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
    }
  );
  return model;
};

module.exports = Chat;
