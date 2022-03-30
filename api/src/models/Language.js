const { Model, DataTypes } = require('sequelize');

class Language extends Model { };

module.exports = (sequelize) => {
    return Language.init(
        {
            language_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            language_code: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            language_name: {
                type: DataTypes.STRING
            },
            country_id: {
                type: DataTypes.STRING
            }
        },{ sequelize, timestamps: false, tableName: 'language' }
    );
};
