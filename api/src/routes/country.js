const router = require('express').Router();
const { Op } = require('sequelize');
const { Country, Continents, Capitals, Currencies, Languages, Timezones } = require('../db');

const getCountries = async (offset, limit) => {
    if(offset && limit) {
        let countriesData = await Country.findAll({
            offset: 0,
            limit: 5
        });
        return countriesData;
    } else {
        let countriesData = await Country.findAll();
        return countriesData;
    };
};

const getAllData = async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;

    const allData = await getCountries(offset, limit);
    res.send('Hola si funciona esta parte')

}


module.exports = getAllData;