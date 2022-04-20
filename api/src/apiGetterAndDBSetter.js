const axios = require('axios');
const { Country, Capitals, Currencies, Language, Timezones } = require('./db.js')



const getCountryData = async () => {
    
    try {

        const check = await Country.findAll();

        if (Array.isArray(check) && check.length > 0) return console.log('Database is set and ready to serve!!  :)');

        const apiCountries = await axios.get('https://restcountries.com/v3.1/all'); //Se hace un get a la api para obtener toda la informacion de todos los paises disponibles la info queda guardada en apiCountries.data.
 
        const getCountries = () => { //En esta función que crea un array de objetos con los datos necesarios tomados de la respuesta de la api para llenar la info del pais en la base de datos.
            let allCountries = []; // se crea la variable con un array vacio
            apiCountries.data.map(country => { //se recorren los datos con un map
                let newCountry = { // se crea el objeto que se inyectara al array de resultados
                    country_id: country.cca3, //se utiliza como id el codigo ISO 3166-1 alfa-3 que viene en la api con el campo cca3.

                    common_name: country.name.common, //en la api hay dos formas de nombre en cada pais, el nombre commun y el oficial, aqui pongo ambos en este campo el comun.

                    official_name: country.name.official, // en este otro el oficial.
                    
                    flag_image_svg: country.flags.svg, //hay igual dos archivos con la imagen de las banderas en la api, uno en formato svg y otro en formato png, aqui decidí tomar el svg ya que por ser una imagen vecorial se pueden hacer muchas cosas bonitas con esta imagen desde el front.
                                        
                    continent: country.continents[0], //agrego como continent el primer elemento del array que viene de la api con los continentes del pais
                    
                    capital: Array.isArray(country.capital) ? country.capital[0] : country.capital ? country.capital : `${country.name.common} has no capital listed`, // se detecto que existen paises en la api que no tienen una capital, o que los datos vienen estructurados de diferente forma, algunos como un array otros como texto, por lo que aqui pongo un ternario que pregunta el tipo de datos que vienen elen campo y dependiendo de su contenido agrega el dato a la base, si no existe agrega un texto aclarativo que dice que no se encontro capital para ese pais.
                    
                    subregion: country.subregion ? country.subregion : `${country.name.common} has no subregion listed`, //como se detecto que desde la api de paises existen paises que no tienen un dato valido de subregion y para cumplir con que este dato no sea nulo se hace una comprobacion si existe el dato se usa y de no existir se agrega un string con el nombre del pais y la leyenda que no se encontro en la lista.

                    area: country.area, // se agrega el area del pais
                    population: country.population, //se agrega el dato de poblacion del pais
                    lat: country.latlng[0], // se agrega el dato de latitud donde se encuentra el pais, tomado del arreglo en su posicion 0 donde vienen latitud y longitud.
                    lng: country.latlng[1], // se agrega el dato de longitud donde se encuentra el pais, tomado del arreglo en su posicion 1 donde vienen latitud y longitud.
                    map: country.maps.googleMaps // se agrega el dato del mapa del pais como un vinculo al sitio googlemaps
                };
                allCountries.push(newCountry); //aqui agrego el objeto creado por cada pais al arreglo final que sera devuelto.
            })
            return allCountries; //devuelve el arreglo ya con la info lista para ingresar a la api.
        };

        const countriesData = getCountries(); //se ejecuta la funcion anterior y se guarda el resultado en la variable para su uso posteior al crear todos los paises en la base de datos.
        const createCountries = await Country.bulkCreate(countriesData); // con esta instruccion se crean todos los paises de una con el metodo bulkCreate usando la variable con los datos obtenidos en la funcion anterior.
  

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
        const dataCurrencies = getCurrencies();
         const createCurrencies = await Currencies.bulkCreate(dataCurrencies);        


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
        const dataLanguages = getLanguages();
        const createLanguages = await Language.bulkCreate(dataLanguages)

        
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
        
        const dataTimezone = getTimezones();
        const createTimezones = await Timezones.bulkCreate(dataTimezone)        
    } catch (error) {
        console.error(error);
    }
};
module.exports = {
    getCountryData,     
}