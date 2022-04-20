const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country, Currencies, Language, Timezones } = require('../db');
const router = Router();

router.get('/all', async (req, res) => {

    const countCountries = await Country.count();
    const allCountriesData = await Country.findAll({
        order: [['common_name', 'ASC']],
        include: [{
            model: Activity,
            attributes: [ 'id', 'activity_name', 'difficulty', 'duration', 'season' ],
            through: {
                attributes: [],
            },
        }, {
            model: Currencies,
        }, {
            model: Language,
        }, {
            model: Timezones,
        },
        ],
    });
    const response = {
        totalCountries: countCountries,
        allData: allCountriesData,
    }
    response ? res.send(response) : res.status(404).send('No data found');
})


router.get('/', async (req, res) => {
    let { name, limit, offset, order, orderby, field, filter } = req.query;
    !limit ? limit = 10 : limit;
    !offset ? offset = 0 : offset;
    !order ? order = 'ASC' : order;
    !orderby ? orderby = 'common_name' : orderby;
    !field ? field = 'none' : field;
    !filter ? filter = 'all' : filter;
    // console.log(req.body)

    if (typeof name === 'string' && name !== "") {
        console.log('aqui pasa si hay un name x query', name);
        const countCountries = await Country.count({
            where: {
                common_name: {
                    [Op.iLike]: `%${name}%`,
                },
            }
        })
        const allData = await Country.findAll({
            where: {
                common_name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            order: [[orderby, order]],
            include: [{
                model: Activity,
                attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            }, {
                model: Currencies,
            }, {
                model: Language,
            }, {
                model: Timezones,
            }]
        })
        const response = {
            totalCountries: countCountries,
            allData: allData
        }
        allData && countCountries ?
            res.send(response)
            : res.status(404).send("Sorry, we haven't found a country with that name in our database");
    } else if (typeof field === "string" && field !== "none") {
        // console.log('aqui llega siempre que no hay name pero hay un field')
        if (typeof filter === "string" && filter !== "all") {
            // console.log('aqui pasa si hay un filter y un field correctos')
            switch (field) {
                case "continent":
                    console.log('se filtra por continente')
                    const counts1 = await Country.count({
                        where: {
                            continent: {
                                [Op.like]: filter,
                            },
                        }
                    });
                    const allData1 = await Country.findAll({
                        where: {
                            continent: {
                                [Op.like]: filter,
                            },
                        },
                        order: [[orderby, order]],
                        include: [{
                            model: Activity,
                            attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                            through: {
                                attributes: [],
                            },
                        }, {
                            model: Currencies,
                        }, {
                            model: Language,
                        }, {
                            model: Timezones,
                        }]
                    });
                    const response1 = {
                        totalCountries: counts1,
                        allData: allData1
                    }
                    response1 ?
                        res.send(response1) : res.status(404).send('No data for that query in database');
                    break;
                case "subregion":
                    console.log('se filtra por subregion')
                    const counts2 = await Country.count({
                        where: {
                            subregion: {
                                [Op.like]: filter,
                            },
                        }
                    });
                    const allData2 = await Country.findAll({
                        where: {
                            subregion: {
                                [Op.like]: filter,
                            },
                        },
                        order: [[orderby, order]],
                        include: [{
                            model: Activity,
                            attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                            through: {
                                attributes: [],
                            },
                        }, {
                            model: Currencies,
                        }, {
                            model: Language,
                        }, {
                            model: Timezones,
                        }]
                    });
                    const response2 = {
                        totalCountries: counts2,
                        allData: allData2
                    }
                    response2 ?
                        res.send(response2) : res.status(404).send('No data for that query in database');
                    break;
                default:
                    break;
            }
        } else {
            console.log('aqui pasa si no hay filter o es all')
            const countCountries = await Country.count()
            const allData = await Country.findAll({
                order: [[orderby, order]],
                include: [{
                    model: Activity,
                    attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: [],
                    },
                }, {
                    model: Currencies,
                }, {
                    model: Language,
                }, {
                    model: Timezones,
                }],
            });
            const response = {
                totalCountries: countCountries,
                allData: allData
            }
            res.send(response);
        }
    } else {
        console.log('aqui pasa si no hay field ni name')
        const countCountries = await Country.count()
        const allData = await Country.findAll({
            order: [[orderby, order]],
            include: [{
                model: Activity,
                attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            }, {
                model: Currencies,
            }, {
                model: Language,
            }, {
                model: Timezones,
            },
            ],
        });
        console.log('respuesta a all', countCountries)
        const response = {
            totalCountries: countCountries,
            allData: allData
        }
        res.send(response);
    }
});

router.get('/:idCountry', async (req, res) => {
    const { idCountry } = req.params;
    console.log(idCountry)
    const countryById = await Country.findByPk(
        idCountry.toUpperCase(),
        {
            include:[ {
                model: Activity,
                attributes: ['id', 'activity_name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            },{
                model: Currencies,            
            },{
                model: Language,            
            },{
                model: Timezones,            
            },
        ],
        });
    if(countryById) {
        res.send(countryById);
    } else {
        res.status(404).send("Sorry, that country is'nt in our list");
    }
});




module.exports = router;