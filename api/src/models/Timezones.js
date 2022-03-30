const { Model, DataTypes } = require('sequelize');

class Timezones extends Model {};

module.exports = (sequelize) => {
    return Timezones.init(
        {           
            timezone_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country_id: {
                type: DataTypes.STRING
            }
        },{ sequelize, timestamps: false, tableName: 'timezones' }
    );
};