const { Model, DataTypes } = require('sequelize');

class Timezones extends Model {};

module.exports = (sequelize) => {
    return Timezones.init(
        {
            timezone_id: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true                
            },
            timezone_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }           
        },{ sequelize, timestamps: false, tableName: 'timezones' }
    );
};