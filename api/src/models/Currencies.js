const { Model, DataTypes } = require('sequelize');

class Currencies extends Model {};

module.exports = (sequelize) => {
    return Currencies.init(
        {
            currency_3letter: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            currency_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            symbol: {
                type: DataTypes.STRING,
            },
            country_id: {
                type: DataTypes.STRING
            }
        },{ sequelize, timestamps: false, tableName: 'currencies' }
    );
};