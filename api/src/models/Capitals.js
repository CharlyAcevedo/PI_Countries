const { Model, DataTypes } = require('sequelize');

class Capitals extends Model {};

module.exports = (sequelize) => {
    return Capitals.init(
        {
            capital_id: {
                type: DataTypes.INTEGER,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            capital_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },{ sequelize, timestamps: false, tableName: 'capitals' }
    );
};