const Board = function(Sequelize, DataTypes) {
    const model = Sequelize.define(
        'Board', {
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            parity: {
                type: DataTypes.STRING(4),
                allowNull: false,
                defaultValue: 'OFF',
            },
            member_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            expr_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            start_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            appo_area: {
                type: DataTypes.STRING(100),
                allowNull: true,
            }
        }, {
            tableName: 'board',
            freezeTableName: true,
            timestamps: true
        }
    );
    return model;
};
module.exports = Board;