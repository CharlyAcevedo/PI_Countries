const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Continents, Capitals, Currencies, Languages, Timezones } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllData = require('./country.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {    
    res.send('aqui va la landing page del back end');
});

//GET /countries

router.get('/countries', async (req, res) => {
    const { limit, offset, name } = req.query;

    if (!name) {
        const allData = await Country.findAll({
            include: Activity,
            offset: offset,
            limit: limit,
        });
        res.send(allData);
    } else {
        const allData = await Country.findAll({
            where: {
                common_name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: Activity,
            offset: offset,
            limit: limit,
        })
        res.send(allData);
    }

});

router.get('/countries/:idCountry', async (req, res) => {
    const {idCountry} = req.params;

    const countryById = await Country.findByPk(idCountry.toUpperCase());
    res.send(countryById)
});




module.exports = router;
