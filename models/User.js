// TODO: user 모델(-> 테이블 구조) 정의

const User = function(Sequelize, DataTypes) {
    return Sequelize.define('user', {
        // 	`user_id`	INT	NOT NULL	COMMENT '회원 index',
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // 	`id`	VARCHAR(15)	NOT NULL	COMMENT '회원아이디',
        id: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        // 	`pw`	VARCHAR(15)	NOT NULL	COMMENT '비밀번호',
        pw: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        // 	`user_name`	VARCHAR(15)	NOT NULL	COMMENT '회원의 성명',
        user_name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        // 	`user_email`	VARCHAR(15)	NOT NULL	COMMENT '회원이메일',
        user_email: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        // 	`prof_img_url`	TEXT	NULL	COMMENT '회원프로필 이미지 url'
        prof_img_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'user',
        freezeTableName: true,
        timestamps: true,
    });
};

module.exports = User;