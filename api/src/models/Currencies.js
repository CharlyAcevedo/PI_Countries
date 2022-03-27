const { Model, DataTypes } = require('sequelize');

class Currencies extends Model {};

module.exports = (sequelize) => {
    return Currencies.init(
        {
            currency_id: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
                validate: {
                    isAlpha: true,
                    len: [2,4]
                }
            },
            currency_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            symbol: {
                type: DataTypes.STRING,
            }
        },{ sequelize, timestamps: false, tableName: 'currencies' }
    );
};