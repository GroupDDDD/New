const Part = function(Sequelize, DataTypes) {
    const model = Sequelize.define(
        "chat_participants", {
            // `part_id`	INT	NOT NULL	COMMENT 'PK 참여자 index',
            part_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // `room_id`	INT	NOT NULL	COMMENT 'FK 채팅방 index',
            room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // `user_id`	INT	NOT NULL	COMMENT 'FK 유저 아이디'
            user_index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            pub_status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
            tableName: "chat_participants",
            freezeTableName: true,
            timestamps: true,
        }
    );
    return model;
};

module.exports = Part;