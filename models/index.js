"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        console.log("model list >>", model);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


const { Sign, Board, Category, SCategory, Chat, Part, Chatcont } = db;​
db.Sign.hasMany(Board, { foreignKey: 'user_id', sourceKey: 'user_index' });
db.Board.belongsTo(Sign, { foreignKey: 'user_id', targetKey: 'user_index' });

db.Board.hasMany(SCategory, {
    foreignKey: "article_id",
    sourceKey: "article_id",
});
db.SCategory.belongsTo(Board, {
    foreignKey: "article_id",
    targetKey: "article_id",
});

db.Category.hasMany(SCategory, { foreignKey: 'category_id', sourceKey: 'category_id' });
db.SCategory.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'category_id' });​

db.Sign.hasMany(Part, { foreignKey: 'user_id', sourceKey: 'user_index' });
db.Part.belongsTo(Sign, { foreignKey: 'user_id', targetKey: 'user_index' });

db.Chat.hasOne(Part, { foreignKey: 'room_id', sourceKey: 'room_id' });​
db.Part.belongsTo(Chat, { foreignKey: 'room_id', targetKey: 'room_id' });

db.Part.hasOne(Chatcont, { foreignKey: 'part_id', sourceKey: 'part_id' });
db.Chatcont.belongsTo(Part, { foreignKey: 'part_id', targetKey: 'part_id' });

db.Sign.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})
db.Board.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})
db.Category.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})​
db.SCategory.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})​
db.Part.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})​
db.Chat.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})
db.Chatcont.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})​
db.sequelize = sequelize;
db.Sequelize = Sequelize;​
module.exports = db;\