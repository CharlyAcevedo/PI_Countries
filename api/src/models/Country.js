const { Model, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Country extends Model {};

module.exports = (sequelize) => {
  // defino el modelo
  return Country.init(
    {
      country_id: {
        type: DataTypes.STRING(3),
       // type: DataTypes.INTEGER,
        //autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
        type: DataTypes.STRING,
        allowNull: false
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false
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
      lat: {
        type: DataTypes.FLOAT,
      },
      lng: {
        type: DataTypes.FLOAT,
      },
      map: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        }
      }     
    }, { 
      hooks: {
        beforeValidate: (country, options) => {
            country.country_id.toUpperCase()
          }
      },
      sequelize, 
      tableName: 'country' });
};

