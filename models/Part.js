// CREATE TABLE `participants` (
// 	`part_id`	INT	NOT NULL	COMMENT 'PK 참여자 index',
// 	`room_id`	INT	NOT NULL	COMMENT 'FK 채팅방 index',
// 	`user_id`	INT	NOT NULL	COMMENT 'FK 유저 아이디'
// );

// chat_room 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const part = function (Sequelize, DataTypes) {
  // Sequelize: models/index.js 의 sequelize
  // DataTypes: models/index.js 의 Sequelize
  // Sequelize.define(param1, param2, param3)
  // param1: 모델 이름 설정 -> ''
  // param2: 컬럼 정의 -> {}
  // param3: 모델 옵션 정의 -> {}
  const model = Sequelize.define(
    "participants",
    {
      // `part_id`	INT	NOT NULL	COMMENT 'PK 참여자 index',
      part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // `room_id`	INT	NOT NULL	COMMENT 'FK 채팅방 index',
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      // `user_id`	INT	NOT NULL	COMMENT 'FK 유저 아이디'
      user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      tableName: "participants", // 실제 DB의 테이블 이름
      freezeTableName: true, // 테이블 이름 고정
      timestamps: true, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
    }
  );
  return model;
};

module.exports = Part;
