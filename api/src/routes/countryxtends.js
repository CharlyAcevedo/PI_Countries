const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Continents, Capitals, Currencies, Languages, Timezones } = require('../db');
const router = Router();

router.get('/', async (req, res) => { //currencies
    const getAllCurrencies = await Country.findAll(
        {            
            include: [
                { 
                    model: Capitals,
                    attributes: ['capital_name'],
                 },
                { 
                    model: Currencies,
                    attributes: ['currency_3letter', 'currency_name', 'symbol'],
                 },
                { 
                    model: Timezones,
                    attributes: ['timezone_name'],
                 },
                 { 
                    model: Activity,
                    attributes: ['activity_name', 'difficulty', 'duration', 'season'], 
                },
            ]
           
        }
    );
    getAllCurrencies ? res.send(getAllCurrencies) : res.status(404).send("Currencies not found");
    
});


module.exports = router;