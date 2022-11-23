const Sign = function(Sequelize, DataTypes){ 
    const model = Sequelize.define(
        'user',
        {
            user_index: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id:{
                type: DataTypes.STRING(15),
                allowNull: false,
                unique: true,
            },
            user_pw: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            user_email: {
                type: DataTypes.STRING(35),
                allowNull: false,
                unique: true,
            },
            // user_adr: {
            //     type: DataTypes.STRING(50),
            //     allowNull: false,
            // },
            user_Lat: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            user_Lon: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
            prof_img_url: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return model;
}


module.exports = Sign;