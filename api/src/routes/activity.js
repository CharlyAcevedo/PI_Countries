const { Router } = require('express');
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { Activity, Country } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const countActivities = await Activity.count()
        const allActivities = await Activity.findAll({
            include: {
                model: Country,
                attributes: ['country_id', 'common_name', 'flag_image_svg', 'continent', 'capital'],
                through: {
                    attributes:[]
                }
            }
        })
        const response = {
            totalActivities: countActivities,
            allData: allActivities
        }
        res.send(response)
    } catch (error) {
        res.status(404).send({ 'error': 'Lo sentimos no se hemos encontrado nada en la base de datos con esos parametros de busqueda' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    // console.log(idCountry)
    const activityById = await Activity.findByPk(
        id,
        {
            include:[ {
                model: Country,
                attributes: ['country_id', 'common_name', 'flag_image_svg', 'continent', 'capital'],
                through: {
                    attributes: [], 
                },
            } 
        ],
        });
    if(activityById) {
        res.send(activityById);
    } else {
        res.status(404).send("Sorry, that activity is'nt in our list");
    }
});


router.post("/", async (req, res) => {
  const { activity_name, difficulty, duration, season, country } = req.body;
  if (typeof activity_name !== "string" || activity_name.length <= 2)
    return res
      .status(404)
      .send(
        "No se ha creado la actividad por que no se envio un nombre correcto para la actividad"
      );
  if (
    typeof difficulty !== "string" ||
    difficulty.length <= 0 ||
    difficulty.length >= 2
  )
    return res
      .status(404)
      .send(
        "No se ha creado la actividad por que no se envio dificultad o no es un dato correcto"
      );
  if (
    difficulty !== "2" &&
    difficulty !== "1" &&
    difficulty !== "3" &&
    difficulty !== "4" &&
    difficulty !== "5"
  )
    return res
      .status(404)
      .send(
        "No se hacreado la actividad por que dificultad no es un dato valido"
      );
  if (typeof duration !== "string" || duration.length <= 1)
    return res
      .status(404)
      .send(
        "No se creo la actividad por que no se envio una duracion correcta"
      );
  if (typeof season !== "string" && season.length <= 4)
    return res
      .status(404)
      .send(
        "No se creo la actividad por que no se envio un dato season valido"
      );
  if (
    season !== "Invierno" &&
    season !== "Primavera" &&
    season !== "Verano" &&
    season !== "Otoño"
  )
    return res
      .status(404)
      .send(
        "No se ha creado la actividad por que no se envio un dato season valido"
      );
  if (!Array.isArray(country) || country.length === 0)
    return res
      .status(404)
      .send(
        "No se creo la actividad por que no se han enviado datos del pais para vincularla"
      );
  const activityCreated = await Activity.create({
    activity_name,
    difficulty,
    duration,
    season,
  });
  let countryFound = await Country.findAll({
    where: {
      common_name: country,
    },
  });
  activityCreated.addCountry(countryFound);
  res.send("La actividad ha sido creada satisfactoriamente");
});

// router.get('/countries', async (req, res) =>{
//     Country.findByPk(req.query.country_id)
//     .then((country) => {
       
//     })
// })

    
module.exports = router;