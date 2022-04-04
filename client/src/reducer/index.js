import { GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_DATA } from "../actions";

const initialState = {
    countries: [],
    totalCountries: 0,
    totalCountriesAll: 0,
    allCountriesData: []
  };

  const rootReducer = (state = initialState, { type, payload }) => {
      switch(type) { 
          case GET_ALL_COUNTRIES: return {
              ...state,
              countries: [...payload.allData],
              totalCountries: payload.totalCountries
          }
          case GET_ALL_COUNTRIES_DATA: return {
              ...state,
              allCountriesData: [...payload.data],
              totalCountriesAll: payload.totalCountries
          }
          default:
              return state;
      }

  }

  export default rootReducer;