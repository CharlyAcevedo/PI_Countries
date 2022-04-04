const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Continents, Capitals, Currencies, Languages, Timezones } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require('./country.js');
const activity = require('./activity.js');
const countryExtends = require('./countryxtends.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {    
    res.send('to get info from this api please go to "http://localhost:/countries" or "http://localhost:/activity');
});

//GET /countries 'todas las rutas de countries se redirige al modulo country en routes
router.use('/countries', country);
//GET y POST /activity 'todas las rutas de activity se redirige al modulo activity en routes
router.use('/activity', activity);
//ruta adicional para traer todas las monedas y monedas por pais.
router.use('/countryxtends', countryExtends);

module.exports = router;
