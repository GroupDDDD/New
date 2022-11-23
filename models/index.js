'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const process = require('process');
const basename = path.basename(__filename);
// const config = require(__dirname + '/../config/config.json')[env];
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize = new Sequelize( //위에서 sequelize를 불러온 Sequelize 객체. 그리고 그 객체를 담는 sequelize 변수.
  config.database, 
  config.username,
  config.password, 
  config
  );

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; //여기서 sequelize는 위에서 let sequelize
db.Sequelize = Sequelize; //여기서 Sequllize는 위에서 new Sequelize
//db = {sequelize: sequelize, Sequelize : Sequelize}

db.Sign = require('./Sign')(sequelize, Sequelize);

module.exports = db;
