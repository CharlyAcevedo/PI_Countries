const { Model, DataTypes } = require('sequelize');

class Activity extends Model {};

module.exports = (sequelize) => {
    return Activity.init(
        {           
            activity_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            difficulty: {
                type: DataTypes.ENUM('1', '2', '3', '4', '5')
            },
            duration: { 
                type: DataTypes.STRING
            },
            season: { 
                type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
            }
        }, { sequelize, timestamps: true, tableName: 'activity' }
    );
};