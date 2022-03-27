const { Model, DataTypes } = require('sequelize');

class Continents extends Model {};

module.exports = (sequelize) => {
    return Continents.init(
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
        },{ sequelize, timestamps: false, tableName: 'continents' }
    );
};