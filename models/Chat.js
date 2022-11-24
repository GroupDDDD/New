// chat_room 모델(-> 테이블 구조) 정의
// 시퀄라이즈 모델이랑 mysql table 연결
const Chat = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "chat_room",
    {
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contactor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chat_kind: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
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
