const { Model, DataTypes } = require('sequelize');

class Continents extends Model {};

module.exports = (sequelize) => {
    return Continents.init(
        {
            continent: { 
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true
            },
            continent_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },{ sequelize, tableName: 'continents' }
    );
};