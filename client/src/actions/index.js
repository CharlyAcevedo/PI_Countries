import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_ALL_COUNTRIES_DATA = 'GET_ALL_COUNTRIES_DATA';
export const GET_COUNTRIES_TO_HOME = 'GET_COUNTRIES_TO_HOME';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';
export const GET_COUNTRIES_FILTER_AND_ORDER = 'GET_COUNTRIES_FILTER_AND_ORDER';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const FILTER_ACTIVITIES_X_COUNTRY = 'FILTER_ACTIVITIES_X_COUNTRY';
export const POST_ACTIVITIES = 'POST_ACTIVITIES';

export function getAllCountries(limit, offset) {
  return async (dispatch) => {
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    try {
      await axios.get(`http://localhost:3001/countries?limit=${limit}&offset=${offset}`)
        .then((response) => {
          dispatch({
            type: GET_ALL_COUNTRIES,
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

export function getAllCountriesData() {
  return async (dispatch) => {
    try {
      await axios.get('http://localhost:3001/countries/all')
        .then((response) => {
          console.log('esta es la respuesta a getAllCountriesData', response.data)
          dispatch({
            type: GET_ALL_COUNTRIES_DATA,
            payload: response.data
          })
        })
    } catch {
      dispatch({
        type: GET_ALL_COUNTRIES_DATA,
        payload: undefined
      });
    };
  };
};

export function countriesFiltersAndOrders(payload) {

  return async (dispatch) => {
    try {
      const field = payload.field ? payload.field : 'all';
      const filter = payload.filter ? payload.filter : 'all';
      const order = payload.order ? payload.order : 'ASC';
      const orderBy = payload.orderBy ? payload.orderBy : 'common_name';
      console.log('este es el payload que llega a action', payload)
      await axios.get(`http://localhost:3001/countries?field=${payload.field}&filter=${payload.filter}&order=${payload.order}&orderby=${payload.orderBy}`)
        .then(response => {
          console.log('este es el response', response.data)
          dispatch({
            type: GET_COUNTRIES_FILTER_AND_ORDER,
            payload: response.data
          })
        })
    } catch {
      dispatch({
        type: GET_COUNTRIES_FILTER_AND_ORDER,
        payload: undefined,
      })
    }
  }
};

export function searchCountries(payload) {
  return async (dispatch) => {
    console.log('este es el payload de actions', payload)
    try {
      if (!payload || payload.length === 0) {
        await axios.get(`http://localhost:3001/countries`)
          .then(response => {
            console.log('respuesta desde actions', response)
            dispatch({
              type: SEARCH_COUNTRY,
              payload: response.data
            })
          })
      } else {
        const name = payload;
        await axios.get(`http://localhost:3001/countries?name=${name}`)
          .then(response => {
            console.log('respuesta desde actions', response)
            dispatch({
              type: SEARCH_COUNTRY,
              payload: response.data
            })
          })
      }
    } catch {
      dispatch({
        type: SEARCH_COUNTRY,
        payload: payload
      })
    }
  }
};

export function getCountryDetails(payload) {
  return async (dispatch) => {
    try {
      const countryId = payload ? payload : 'MEX';
      await axios.get(`http://localhost:3001/countries/${countryId}`)
        .then(response => {
          console.log(response)
          dispatch({
            type: GET_COUNTRY_DETAILS,
            payload: response.data
          })
        })
    } catch {
      dispatch({
        type: GET_COUNTRY_DETAILS,
        payload: 'NO SE ENCONTRO INFORMACION'
      })
    }
  }
};

export function getAllActivities(){
  return async (dispatch) => {
    try {
      await axios.get('http://localhost:3001/activity')
        .then((response) => {
          // console.log('esta es la respuesta a getAllActivities', response)
          dispatch({
            type: GET_ALL_ACTIVITIES,
            payload: response.data
          })
        })
    } catch {
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: 'no se encontraron actividades',
      });
    };
  };
};

export function filterActivities(payload) {
  return async (dispatch) => {
    dispatch({
      type: FILTER_ACTIVITIES_X_COUNTRY,
      payload: payload
    })
  }
};

export function postActivities(payload) {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/activity', payload)
        .then((response) => {
          console.log(response);
          dispatch({
            type: POST_ACTIVITIES,
            payload: response
          })
        })
    } catch (err) {
      dispatch({
        type: POST_ACTIVITIES,
        payload: err
      })
    }
  }
}
