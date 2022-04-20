import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRIES_TO_HOME = 'GET_COUNTRIES_TO_HOME';
export const GET_COUNTRY_DETAILS = 'GET_COUNTRY_DETAILS';
export const GET_COUNTRIES_FILTER_AND_ORDER = 'GET_COUNTRIES_FILTER_AND_ORDER';
export const SEARCH_COUNTRY = 'SEARCH_COUNTRY';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const FILTER_ACTIVITIES_X_COUNTRY = 'FILTER_ACTIVITIES_X_COUNTRY';
export const POST_ACTIVITIES = 'POST_ACTIVITIES';
export const GET_ACTIVITY_DETAILS = 'GET_ACTIVITY_DETAILS'

export function getAllCountries(limit, offset) {
  return async (dispatch) => {
    if (!limit) limit = 250;
    if (!offset) offset = 0;
    try {
      await axios.get(`/countries?limit=${limit}&offset=${offset}`)
        .then((response) => {
          dispatch({
            type: GET_ALL_COUNTRIES,
            payload: response.data
          })
        })
    } catch (error) {
      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: { error: error.message }
      });
    };
  };
};

export function countriesFiltersAndOrders(payload) {

  return async (dispatch) => {
    try {
      await axios.get(`/countries?field=${payload.field}&filter=${payload.filter}&order=${payload.order}&orderby=${payload.orderBy}`)
        .then(response => {
          dispatch({
            type: GET_COUNTRIES_FILTER_AND_ORDER,
            payload: response.data
          })
        })
    } catch (error) {
      dispatch({
        type: GET_COUNTRIES_FILTER_AND_ORDER,
        payload: { error: error.message },
      })
    }
  }
};

export function searchCountries(payload) {
  return async (dispatch) => {
    try {
      if (!payload || payload.length === 0) {
        await axios.get(`/countries`)
          .then(response => {
            dispatch({
              type: SEARCH_COUNTRY,
              payload: response.data
            })
          })
      } else {
        const name = payload;
        await axios.get(`/countries?name=${name}`)
          .then(response => {
            dispatch({
              type: SEARCH_COUNTRY,
              payload: response.data
            })
          })
      }
    } catch (error) {
      dispatch({
        type: SEARCH_COUNTRY,
        payload: { error: error.message }
      })
    }
  }
};

export function getCountryDetails(payload) {
  return async (dispatch) => {
    try {
      const countryId = payload ? payload : 'MEX';
      await axios.get(`/countries/${countryId}`)
        .then(response => {
          dispatch({
            type: GET_COUNTRY_DETAILS,
            payload: response.data
          })
        })
    } catch (error) {
      dispatch({
        type: GET_COUNTRY_DETAILS,
        payload: { error: error.message }
      })
    }
  }
};

export function getAllActivities(limit, offset){
  return async (dispatch) => {
    if (!limit) limit = 250;
    if (!offset) offset = 0;
    try {
      await axios.get(`/activity?limit=${limit}&offset=${offset}`)
        .then((response) => {
          console.log('esta es la respuesta desde acciones', response)
          dispatch({
            type: GET_ALL_ACTIVITIES,
            payload: response.data
          })
        })
    } catch (error) { 
      console.log('este es el mensaje', error)
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: { error: error.message },
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
      await axios.post('/activity', payload)
        .then((response) => {
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

export function getActivityDetails(payload) {
  return async (dispatch) => {
    try {
      const id = payload
      await axios.get(`/activity/${id}`)
      .then(response => {
        dispatch({
          type: GET_ACTIVITY_DETAILS,
          payload: response.data
        })
      })
    } catch (err) {
      dispatch({
        type: GET_ACTIVITY_DETAILS,
        payload: err
      })
    }
  }
}
