// CREATE TABLE `chat_room` (
// 	`room_id`	INT	NOT NULL	AUTO_INCREMENT COMMENT 'PK 채팅방 Index',
// 	`board_id`	VARCHAR(255)	NULL	COMMENT 'FK',
// 	`contactor_id`	VARCHAR(15)	NOT NULL	COMMENT '채팅신청자 아이디',
// 	`created_dt`	DATE	NOT NULL	COMMENT '채팅방생성일자',
// 	`chat_kind`	INT	NOT NULL	COMMENT '1:1채팅방: '1' , 그룹채팅방: '2''
// );

// chat_room 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const User = function (Sequelize, DataTypes) {
  // Sequelize: models/index.js 의 sequelize
  // DataTypes: models/index.js 의 Sequelize
  // Sequelize.define(param1, param2, param3)
  // param1: 모델 이름 설정 -> ''
  // param2: 컬럼 정의 -> {}
  // param3: 모델 옵션 정의 -> {}
  const model = Sequelize.define(
    "user",
    {
      // 	`user_id`	INT	NOT NULL	COMMENT '회원 index',
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // 	`id`	VARCHAR(15)	NOT NULL	COMMENT '회원아이디',
      id: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      // 	`pw`	VARCHAR(15)	NOT NULL	COMMENT '비밀번호',
      pw: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      // 	`user_name`	VARCHAR(15)	NOT NULL	COMMENT '회원의 성명',
      user_name: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      // 	`user_email`	VARCHAR(15)	NOT NULL	COMMENT '회원이메일',
      user_email: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      // 	`prof_img_url`	TEXT	NULL	COMMENT '회원프로필 이미지 url'
      prof_img_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // `created_dt`    DATE    NOT NULL    COMMENT '회원가입일자',
      created_dt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return model;
};

module.exports = User;
