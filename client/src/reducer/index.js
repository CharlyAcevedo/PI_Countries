import {
    GET_COUNTRY_DETAILS,
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_FILTER_AND_ORDER,
    SEARCH_COUNTRY,
    GET_ALL_ACTIVITIES,
    FILTER_ACTIVITIES_X_COUNTRY,
    POST_ACTIVITIES,
    GET_ACTIVITY_DETAILS
} from "../actions";

const initialState = {
    countries: [],
    totalCountries: 0,
    countriesToShow: [],
    countryDetails: {},
    totalActivities: 0,
    allActivities: [],
    activitiesToShow: [],
    activityDetails: {},
    countriesWhitActivities: [],
    postMessage: '',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_COUNTRIES:
      if (payload.error)
        return {
          ...state,
          postMessage: payload.error,
        };
      return {
        ...state,
        countries: [...payload.allData],
        totalCountries: payload.totalCountries,
        countriesToShow: payload.allData,
      };
    case GET_COUNTRIES_FILTER_AND_ORDER:
      if (payload.error)
        return {
          ...state,
          postMessage: payload.error,
        };
      return {
        ...state,
        totalCountries: payload.totalCountries,
        countriesToShow: payload.allData,
      };
    case SEARCH_COUNTRY:
      if (payload.error)
        return {
          ...state,
          postMessage: payload.error,
        };
      return {
        ...state,
        totalCountries: payload.totalCountries,
        countriesToShow: payload.allData,
      };
    case GET_COUNTRY_DETAILS:
      if (payload.error)
        return {
          ...state,
          postMessage: payload.error,
        };
      return {
        ...state,
        countryDetails: payload,
      };
    case GET_ALL_ACTIVITIES:
        if (payload.error)
        return {
          ...state,
          postMessage: payload,
        };
      return {
        ...state,
        totalActivities: payload.totalActivities,
        allActivities: payload.allData,
        activitiesToShow: payload.allData,
      };
    case FILTER_ACTIVITIES_X_COUNTRY:
      if (typeof payload === "string" && payload.length > 0) {
        let activitiesFiltered = state.allCountriesData.filter((pais) => {
          if (pais.Activities.find((e) => e.activity_name === "Shoping"))
            return pais;
          else return false;
        });
        return {
          ...state,
          countriesWhitActivities: activitiesFiltered,
        };
      }
      return state;
    case POST_ACTIVITIES:
      return {
        ...state,
        postMessage: payload.data,
      };
    case GET_ACTIVITY_DETAILS:
      return {
        ...state,
        activityDetails: payload,
      };
    default:
      return state;
  }
};

export default rootReducer;