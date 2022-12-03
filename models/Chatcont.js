const Chatcont = function(Sequelize, DataTypes) {
    const model = Sequelize.define(
        "chat_contents", {
            content_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            part_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }, {
            tableName: "chat_contents",
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};
module.exports = Chatcont;