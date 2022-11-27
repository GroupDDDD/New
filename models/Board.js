const Board = function(Sequelize, DataTypes) {
    // Sequelize.define(param1, param2, param3)
    // param1: 모델 이름 설정 -> ''
    // param2: 컬럼 정의 -> {}
    // param3: 모델 옵션 정의 -> {}
    const model = Sequelize.define(
        // param1: 모델 이름 설정
        'Board',
        // param2: 컬럼 정의
        {
            // `article_id`	INT	NOT NULL	COMMENT 'auto increment'
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // `user_id`	INT	NOT NULL	COMMENT 'user index'
            user_index: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // `title`	VARCHAR(100)	NOT NULL	COMMENT '게시글 제목'
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            // `parity`	VARCHAR(2)	NOT NULL	DEFAULT OFF	COMMENT 'ON 또는 OFF 선택값 저장',
            parity: {
                type: DataTypes.STRING(4),
                allowNull: false,
                defaultValue: 'OFF',
            },
            // `member_num`	INT	NOT NULL	COMMENT '스터디멤버 수',
            member_num: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // `description`	VARCHAR(5000)	NOT NULL	COMMENT '스터디 내용',
            description: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            // `expr_dt`	DATA	NOT NULL	COMMENT '게시글 만료일 (모집종료일)',
            expr_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            // `start_dt`	DATE	NOT NULL	COMMENT '스터디 시작일',
            start_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            // `end_dt`	DATE	NOT NULL	COMMENT '스터디 종료일',
            end_dt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            // `appo_time`	INTERVAL_DAY	NOT NULL	COMMENT '스터디 진행 약속 시간',
            appo_time: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            // `appo_aria`	VARCHAR(100)	NULL	COMMENT '스터디 진행 약속 장소'
            appo_aria: { // appo_aria >> appo_area로 수정
                type: DataTypes.STRING(100),
                allowNull: true,
            }
        },
        // param3: 모델 옵션 정의 
        {
            tableName: 'board', // 실제 DB의 테이블 이름
            freezeTableName: true, // 테이블 이름 고정
            timestamps: true, // 데이터가 추가/수정 시간을 자동으로 컬럼 만들어서 기록
        }
    );
    return model;
};
module.exports = Board;