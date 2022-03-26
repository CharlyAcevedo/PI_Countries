const { Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Country extends Model {};

module.exports = (sequelize) => {
  // defino el modelo
  return Country.init(
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      common_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      official_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      flag_image_svg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      continent: {
        type: DataTypes.INTEGER,
      },
      capital: {
        type: DataTypes.INTEGER,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT,
      },
      population: {
        type: DataTypes.INTEGER,
      },
    }, { sequelize, tableName: 'country' });
};
