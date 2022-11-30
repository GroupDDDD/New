const Category = function(Sequelize, DataTypes) {
    const model = Sequelize.define(
        'Category', {
            // 	`category_id`	INT	NOT NULL	COMMENT '카테고리 Index값',
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
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
        }, {
            tableName: 'category',
            freezeTableName: true,
            timestamps: false,
        }
    );
    return model;
}

module.exports = Category;