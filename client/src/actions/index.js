import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRIES_TO_HOME = 'GET_COUNTRIES_TO_HOME';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';
export const GET_ALL_COUNTRIES_DATA = 'GET_ALL_COUNTRIES_DATA';

export function getAllCountries () { 
    return async (dispatch) => {
        try {
            await axios.get('http://localhost:3001/countries')
            .then((response) =>{
                //console.log(response.data.allData)
                dispatch({
                    type:GET_ALL_COUNTRIES,
                    payload: response.data
                })
            })
        } catch {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: undefined
            });
        };
    };
};

export function getAllCountriesData () { 
    return async (dispatch) => {
        try {
            await axios.get('http://localhost:3001/countries/all')
            .then((response) =>{
                console.log(response.data)
                dispatch({
                    type:GET_ALL_COUNTRIES_DATA,
                    payload: response.data
                })
            })
        } catch {
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: undefined
            });
        };
    };
};