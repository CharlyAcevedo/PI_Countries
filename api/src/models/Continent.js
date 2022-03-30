const { Model, DataTypes } = require('sequelize');

class Continent extends Model {};

module.exports = (sequelize) => {
    return Continent.init(
        {
            continent_id: { 
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            continent_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },{ sequelize, timestamps: false, tableName: 'continent' }
    );
};