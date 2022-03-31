const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Continents, Capitals, Currencies, Languages, Timezones } = require('../db');
const router = Router();

router.get('/all', async (req, res) => {
    const allCountriesData = await Country.findAll({
        include: {
            model: Activity,
            attributes: ['activity_name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            },
        },
    });
    allCountriesData ? res.send(allCountriesData) : res.status(404).send('No data found');
})


router.get('/', async (req, res) => {
    let { limit, offset, name, order, orderby } = req.query;
    let { field, filter } = req.body;
    !limit ? limit = 10 : limit = limit;
    !offset ? offset = 0 : offset = offset;
    !order ? order = 'ASC' : order = order;
    !orderby ? orderby = 'common_name' : orderby = orderby;


    if (typeof name === 'string' && name !== "") {
        //console.log('si paso el name', name);
        const allData = await Country.findAll({
            where: {
                common_name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            order: [[orderby, order]],
            include: {
                model: Activity,
                attributes: ['activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },
            offset: offset,
            limit: limit,
        })
        allData ?
            res.send(allData)
            : res.status(404).send("sorry, we have not found anything with that name in our database");

    } else if (typeof field === "string" && field !== "") {
        console.log('pasa por aqui', field)
        if (typeof filter === "string" && filter !== "") {
            switch (field) {
                case "continent":
                    const allData1 = await Country.findAll({
                        where: {
                            continent: {
                                [Op.like]: filter,
                            },
                        },
                        order: [[orderby, order]],
                        include: {
                            model: Activity,
                            attributes: ['activity_name', 'difficulty', 'duration', 'season'],
                            through: {
                                attributes: [],
                            },
                        },
                        offset: offset,
                        limit: limit,
                    });
                    allData1 ?
                    res.send(allData1) : res.status(404).send('No data for that query in database');
                    break;
                case "subregion":
                    const allData2 = await Country.findAll({
                        where: {
                            subregion: {
                                [Op.iLike]: `%${filter}%`,
                            },
                        },
                        order: [[orderby, order]],
                        include: {
                            model: Activity,
                            attributes: ['activity_name', 'difficulty', 'duration', 'season'],
                            through: {
                                attributes: [],
                            },
                        },
                        offset: offset,
                        limit: limit,
                    });
                    allData2 ?
                    res.send(allData2) : res.status(404).send('No data for that query in database');
                    break;
                default:
                    break;

            }

        }
    } else {
        console.log('paso directo al final', field, filter)
        const allData = await Country.findAll({
            order: [[orderby, order]],
            include: {
                model: Activity,
                attributes: ['activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },
            offset: offset,
            limit: limit,
        });
        res.send(allData);
    }


});

router.get('/:idCountry', async (req, res) => {
    const { idCountry } = req.params;
    console.log(idCountry)
    const countryById = await Country.findByPk(
        idCountry.toUpperCase(),
        {
            include: {
                model: Activity,
                attributes: ['activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            }
        });
    if(countryById) {
        res.send(countryById);
    } else {
        res.status(404).send("Sorry, that country is'nt in our list");
    }
});




module.exports = router;