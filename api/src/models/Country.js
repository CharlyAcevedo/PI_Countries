const { Model, DataTypes } = require('sequelize');
const Continent = require('./Continent');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

class Country extends Model {};

module.exports = (sequelize) => {
  // defino el modelo
  return Country.init(
    {
      country_id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          isAlpha: true,
          len: [2,4]
        }
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
      currencies: {
        type: DataTypes.STRING,
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

// Country.beforeValidate((country, options) => {
//   country.country_id.toUpperCase()
// })