// TODO: create connection between temp_board table and sequelize
const TBoard = function(Sequelize, Datatypes) {
    const model = Sequelize.define(
        'TBoard', {
            article_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Datatypes.STRING(100),
                allowNull: false,
            },
            parity: {
                type: Datatypes.ENUM('ONLINE', 'OFFLINE', ''),
                allowNull: false,
                defaultValue: 'OFF',
            },
            member_number: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: Datatypes.STRING(5000),
                allowNull: false,
            },
            expr_dt: {
                type: Datatypes.DATE,
                allowNull: false,
            },
            start_dt: {
                type: Datatypes.DATE,
                allowNull: false,
            },
            end_dt: {
                type: Datatypes.DATE,
                allowNull: false,
            },
        }, {
            tableName: 'temp_board',
            timestamps: true,
        }
    );
    return model;
}

module.exports = TBoard;