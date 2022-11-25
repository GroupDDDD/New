// sequelize-cli 자동 생성한 파일
"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
// const a = require(__dirname + '/../config/config.json');
// const a = {
//   "development": { "username": "user", "password": "1234", "database": "kdt", "host": "127.0.0.1", "dialect": "mysql" },
//   "test": {},
//   "production": {}
// }
// const config = a["development"];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
// sequelize 객체 선언시 매개변수로 정보들을 받음

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db = { sequelize: sequelize, Sequelize: Sequelize }
// 잠깐주석처리!!!
db.Sign = require('./Sign')(sequelize, Sequelize);
db.Board = require("./Board")(sequelize, Sequelize);
db.Category = require("./Category")(sequelize, Sequelize);
db.SCategory = require("./SCategory")(sequelize, Sequelize);
db.Chat = require("./Chat")(sequelize, Sequelize);
db.Chatcont = require("./Chatcont")(sequelize, Sequelize);
db.Part = require("./Part")(sequelize, Sequelize);
// models/Visitor.js 정의한 model이 db.Visitor에 들어감
// db = { sequelize: sequelize, Sequelize: Sequelize, Visitor: model }

// Sign : Board = 1 : N
db.Sign.hasMany(db.Board, {
    foreignKey: "user_index",
    sourceKey: "user_index",
});
db.Board.belongsTo(db.Sign, {
    foreignKey: "user_index",
    targetKey: "user_index",
});

// Board : SCategory = 1 : N
db.Board.hasMany(db.SCategory, {
    foreignKey: "article_id",
});
db.SCategory.belongsTo(db.Board, {
    foreignKey: "article_id",
});

// Category : SCategory = 1 : N
db.Category.hasMany(db.SCategory, {
    foreignKey: "category_id",
});
db.SCategory.belongsTo(db.Category, {
    foreignKey: "category_id",
});

// Board : Chat -> 1:N
db.Board.hasMany(db.Chat, {
    foreignKey: "article_id",
});
db.Chat.belongsTo(db.Board, {
    foreignKey: "article_id",
});

// Chat : Part -> 1:N
db.Chat.hasMany(db.Part, {
    foreignKey: "room_id",
});
db.Part.belongsTo(db.Chat, {
    foreignKey: "room_id",
});

// Part : Chatcont -> 1:N
db.Part.hasMany(db.Chatcont, {
    foreignKey: "part_id",
});
db.Chatcont.belongsTo(db.Part, {
    foreignKey: "part_id",
});

// User : Part -> 1:N
db.Sign.hasMany(db.Part, {
    foreignKey: "user_index",
});
db.Part.belongsTo(db.Sign, {
    foreignKey: "user_index",
});

// Part : Chatcont -> 1:N
db.Part.hasMany(db.Chatcont, {
    foreignKey: "part_id",
});
db.Chatcont.belongsTo(db.Part, {
    foreignKey: "part_id",
});

module.exports = db;
// db 변수 내보냄 -> 다른 파일에서 사용하기 때문