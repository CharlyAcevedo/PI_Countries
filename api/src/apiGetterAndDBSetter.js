const axios = require('axios');
const { Country, Continent, Capitals, Currencies, Language, Timezones } = require('./db.js')



const getCountryData = async () => {
    
    try {

        const apiCountries = await axios.get('https://restcountries.com/v3/all'); //Se hace un get a la api para obtener toda la informacion de todos los paises disponibles la info queda guardada en apiCountries.data.
        //console.log(apiCountries.data[0])

        const getContinents = () => { //creo una funcion que crea un array conteniendo todos los continentes de la api y luego los vuelve unicos para alojarlos en la tabla continentes.

            let allContinents = [];
            let relationCountryContinent = [];
            apiCountries.data.map(country => { //mapea y agrega todos los continentes a un arreglo
                allContinents.push(...country.continents);
                country.continents.forEach(c => {
                    let newRelation = {
                        country_id: country.cca3,
                    }                    
                    let idContinent = () => {
                        switch (c) {
                            case 'Africa':
                                newRelation.continent_id = 1;
                                break;
                            case 'Europe':
                                newRelation.continent_id = 2;
                                break;
                            case 'Antartica':
                                newRelation.continent_id = 3;
                                break;
                            case 'Oceania':
                                newRelation.continent_id = 4;
                                break;
                            case 'Asia':
                                newRelation.continent_id = 5;
                                break;
                            case 'South America':
                                newRelation.continent_id = 6;
                                break;
                            case 'North America':
                                newRelation.continent_id = 7;
                                break;
                            default:
                                break;
                        }
                    }
                    idContinent();
                    relationCountryContinent.push(newRelation);
                })
            });
            //aqui se hacen unicos los valores al meterlos a un set.
            const uniqueContinents = new Set(allContinents); 
            //usar si se utiliza la funcion con Continents.findOrCreate
            //let arrayUnique = [...uniqueContinents];
            let arrayUnique = [];
            //si se utiliza bulkCreate se debe crear un arreglo con objetos como sigue
            uniqueContinents.forEach((c)=>{
                let newContinent = {
                    continent_name: c
                };
                arrayUnique.push(newContinent);
            })

            // console.log(relationCountryContinent)
            return [arrayUnique, relationCountryContinent]
        };
        //se obtienen las variables con los arreglos correspondientes a los continentes unicos y a las relaciones de continente con pais
        const [continentData, relationCountryContinent] = await getContinents();
        //console.log(continentData)
        const createContinents = Continent.bulkCreate(continentData) 
        //aqui se meten los valores a la base de datos en la tabla countries.

       
        // const createContinents = await Promise.all( //setea los valores en la tabla continents
        //     continentData.map((c) => {                
        //         Continents.findOrCreate({
        //             where: {
        //                 continent_name: c
        //             }
        //         })
        //     })
        // );        

        const getCountries = () => { //En esta función que crea un array de objetos con los datos necesarios tomados de la respuesta de la api para llenar la info del pais en la base de datos.
            let allCountries = []; // se crea la variable con un array vacio
            apiCountries.data.map(country => { //se recorren los datos con un map
                let newCountry = { // se crea el objeto que se inyectara al array de resultados
                    country_id: country.cca3, //se utiliza como id el codigo ISO 3166-1 alfa-3 que viene en la api con el campo cca3.

                    common_name: country.name.common, //en la api hay dos formas de nombre en cada pais, el nombre commun y el oficial, aqui pongo ambos en este campo el comun.

                    official_name: country.name.official, // en este otro el oficial.

                    flag_image_svg: country.flags[0], //hay igual dos archivos con la imagen de las banderas en la api, uno en formato svg y otro en formato png, aqui decidí tomar el svg ya que por ser una imagen vecorial se pueden hacer muchas cosas bonitas con esta imagen desde el front.

                    continent: country.region ? country.region : country.continent[0],
                    
                    capital: Array.isArray(country.capital) ? country.capital[0] : country.capital ? country.capital : `${country.name.common} has no capital listed`,
                    
                    subregion: country.subregion ? country.subregion : `${country.name.common} has no subregion listed`, //como se detecto que desde la api de paises existen paises que no tienen un dato valido de subregion y para cumplir con que este dato no sea nulo se hace una comprobacion si existe el dato se usa y de no existir se agrega un string con el nombre del pais y la leyenda que no se encontro en la lista.

                    area: country.area,
                    population: country.population,
                    lat: country.latlng[0],
                    lng: country.latlng[1],
                    map: country.maps.googleMaps
                    
                    // no estoy incluyendo en esta parte la info ni de capital ni de continente, ya que estos algunos paises tienen varios continentes o tienen mas de una capital, por ello las manejo en tablas adicionales y creo sus relaciones adelante en el codigo.
                };
                allCountries.push(newCountry); //aqui agrego el objeto creado por cada pais al arreglo final que sera devuelto.
            })
            return allCountries; //devuelve el arreglo ya con la info lista para ingresar a la api.
        };

        const countriesData = await getCountries();
        //console.log(countriesData);
        const createCountries = Country.bulkCreate(countriesData);        

        // const createCountries = await Promise.all( //setea los valores en la tabla Countries usando los valores devueltos por la funcion countries.
        //     apiContries.data.map((c) => { //mapea el array devuelto por getCountries                
        //         let countryCreated = Country.findOrCreate({ // buscando crear o en caso de existir no hacer nada cada pais del array
        //             where: {
        //                 country_id: c.country_id,
        //                 common_name: c.common_name,
        //                 official_name: c.official_name,
        //                 flag_image_svg: c.flag_image_svg,
        //                 subregion: c.subregion,
        //                 area: c.area,
        //                 population: c.population,
        //                 lat: c.lat,
        //                 lng: c.lng,
        //                 map: c.map,
        //                 continent: c.continent
        //             }
        //         });               
        //     })            
        // )       

        const getCapitals = () => { //creo una funcion que crea un array conteniendo las capitales de todos los paises de la api con el id unico de cada pais en forma de un objeto, para posteriormente setear la tabla capitales mediante estos objetos par valor. ejemplo es un array de este tipo de objetos { country_id: 'USA', capital_name: 'Washington, D.C.' }.

            let allCapitals = [];
            apiCountries.data.map(country => {
                if (country.capital) {
                    country.capital.map(capital => {
                        let newCapital = {
                            country_id: country.cca3,
                            capital_name: capital
                        };
                        allCapitals.push(newCapital);
                    });                    
                }else {
                    let newCapital = {
                        country_id: country.cca3,
                        capital_name: `${country.name.common} capital is not listed`
                    };
                    allCapitals.push(newCapital);
                }
            });
            return allCapitals;
        };
        const dataCapitals = await getCapitals()
        // const createCapitals = Capitals.bulkCreate(dataCapitals)


        const createCapitals = await Promise.all(
           dataCapitals.map((c) => {                
                Capitals.findOrCreate({
                    where: {
                        capital_name: c.capital_name,
                        country_id: c.country_id
                    }
                })
            })
        );

        const getCurrencies = () => {
            let allCurrencies = [];
            apiCountries.data.map(country => {
                if(typeof country.currencies === 'object' && !Array.isArray(country.currencies)) {
                    for(let currency in country.currencies) {
                        let newCurrency = {
                            currency_3letter: currency,
                            currency_name: country.currencies[currency].name,
                            symbol: country.currencies[currency]['symbol'] ? country.currencies[currency]['symbol'] : 'symbol is not listed',
                            country_id: country.cca3
                        };
                        allCurrencies.push(newCurrency);
                    };
                } else {
                    let newCurrency = {
                        currency_3letter: country.cca3,
                        currency_name: `${country.name.common} currency is not listed`,
                        symbol:"simbol is not listed",
                        country_id: country.cca3
                    };
                    allCurrencies.push(newCurrency);
                };
            });
            return allCurrencies;
        };
        const dataCurrencies = await getCurrencies();
        const createCurrencies = Currencies.bulkCreate(dataCurrencies);        


        const getLanguages = () => {
            let allLanguages = [];
            apiCountries.data.map(country => {
                if( typeof country.languages === 'object' && !Array.isArray(country.languages) ) {
                    for( let language in country.languages ) {
                        let newLanguage = {
                            language_code: language,
                            language_name: country.languages[language],
                            country_id: country.cca3
                        }
                        allLanguages.push(newLanguage);
                    }
                } else {
                    let newLanguage = {
                        language_code: country.cca3,
                        language_name: `${country.name.common} language is not listed`,
                        country_id: country.cca3
                    };
                };
            });
            return allLanguages;
        };
        const dataLanguages = await getLanguages();
        const createLanguages = Language.bulkCreate(dataLanguages)

        
        const getTimezones = () => {
            let allTimezones = [];
            apiCountries.data.map(country => {
                if(Array.isArray(country.timezones)) {
                    country.timezones.forEach(timezone => {
                        let newTimezone = {
                            timezone_name: timezone,
                            country_id: country.cca3
                        };
                        allTimezones.push(newTimezone);
                    })
                } else {
                    let newTimezone = {
                        timezone_name: 'no timezone listed',
                        country_id: country.cca3
                    };
                    allTimezones.push(newTimezone);
                }
            })
            return allTimezones;
        };
        
        const dataTimezone = await getTimezones();
        // console.log(dataTimezone);
        const createTimezones = Timezones.bulkCreate(dataTimezone)

        
    } catch (error) {
        console.error(error);
    }
};



module.exports = {
    getCountryData,     
}