const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Currencies, Languages, Timezones } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    const allActivities = await Activity.findAll()
    allActivities.length ? res.send(allActivities) : res.status(404).send('No Activities found in database')
})

router.post('/', async (req, res) => {
    const {activity_name, difficulty, duration, season, country} = req.body;
    console.log(activity_name, difficulty, duration, season, country);
    const activityCreated = await Activity.create({
        activity_name,
        difficulty,
        duration,
        season
    })    
    let countryFound = await Country.findAll({
        where: {
            common_name: country
        },
    })
    activityCreated.addCountry(countryFound);
    res.send("Activity has successfully created")
    
})

    
module.exports = router;