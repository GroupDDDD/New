// TODO: cat_selected 테이블 구조 정의

const { Model } = require("sequelize");

const SCategory = (sequelize, DataTypes) => {
    const model = sequelize.define('SCategory', {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        article_id: {
            tableName: 'cat_selected',
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return model;
}

module.exports = SCategory;