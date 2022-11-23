'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const { User, Category, Board, Comment } = db;

User.hasMany(Board, { foreignKey: 'user_id', sourceKey: 'user_id' });
Board.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });


Board.hasMany(Category, { foreignKey: 'category_id', sourceKey: 'category_id' });
Category.belongsTo(Board, { foreignKey: 'category_id', targetKey: 'category_id' });

User.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음 
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})

Category.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})

Board.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true: (drop) table 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true', // 개발 끝나면 false로 바꿔야함
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;