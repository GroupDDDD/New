const Chat = function(Sequelize, DataTypes) {
    const model = Sequelize.define(
        "chat_room", {
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
        }, {
            tableName: "chat_room",
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};

module.exports = Chat;