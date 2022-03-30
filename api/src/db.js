require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// const Country = require('./models/Country');
// const Continent = require('./models/Continent');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Activity, Continent, Capitals, Currencies, Timezones, Language } = sequelize.models;
//console.log(sequelize.models)
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Country.belongsToMany(Activity, { through: 'countries_activities' });
Activity.belongsToMany(Country, { through: 'countries_activities' });

Country.belongsToMany(Continent, { through: 'Country_Continents' });
Continent.belongsToMany(Country, { through: 'Country_Continents' });

Country.hasMany(Capitals, { foreignKey: 'country_id' });
Capitals.belongsTo(Country, { foreignKey: 'country_id' });

Country.hasMany(Currencies, { foreignKey: 'country_id' });
Currencies.belongsTo(Country, { foreignKey: 'country_id'});

Country.hasMany(Timezones, { foreignKey: 'country_id' });
Timezones.belongsTo(Country, { foreignKey: 'country_id' });

Country.hasMany(Language, { foreignKey: 'country_id' });
Language.belongsTo(Country, { foreignKey: 'country_id' });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
