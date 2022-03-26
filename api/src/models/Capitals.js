const { Model, DataTypes } = require('sequelize');

class Capitals extends Model {};

module.exports = (sequelize) => {
    return Capitals.init(
        {
            capital_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },{ sequelize, tableName: 'capitals' }
    );
};