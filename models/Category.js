// TODO: category 모델(테이블 구조) 정의

// CREATE TABLE `category` (
// 	`category_id`	INT	NOT NULL	COMMENT '카테고리 Index값',
// 	`board_id`	INT	NOT NULL	COMMENT 'auto increment',
// 	`category_img`	TEXT	NULL	COMMENT '카테고리 이미지',
// 	`category_name`	VARCHAR(20)	NOT NULL	COMMENT '카테고리이름'
// );

const Category = function(Sequelize, DataTypes) {
    'category',
    {
        // 	`category_id`	INT	NOT NULL	COMMENT '카테고리 Index값',
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // 	`board_id`	INT	NOT NULL	COMMENT 'auto increment',
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // 	`category_img`	TEXT	NULL	COMMENT '카테고리 이미지',
        category_img: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // 	`category_name`	VARCHAR(20)	NOT NULL	COMMENT '카테고리이름'
        category_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: 'category',
        freezeTableName: true,
        timestamps: false,
    }
    return model;
}

module.exports = Category;