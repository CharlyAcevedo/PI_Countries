import {
    GET_COUNTRY_DETAILS,
    GET_ALL_COUNTRIES,
    GET_ALL_COUNTRIES_DATA,
    GET_COUNTRIES_FILTER_AND_ORDER,
    SEARCH_COUNTRY,
    GET_ALL_ACTIVITIES,
    FILTER_ACTIVITIES_X_COUNTRY,
    POST_ACTIVITIES
} from "../actions";

const initialState = {
    countries: [],
    totalCountries: 0,
    totalCountriesAll: 0,
    allCountriesData: [],
    countriesToShow: [],
    countryDetails: {},
    totalActivities: 0,
    allActivities: [],
    activitiesToShow: [],
    countriesWhitActivities: [],
    postMessage: '',
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES: return {
            ...state,
            countries: [...payload.allData],
            totalCountries: payload.totalCountries,
            countriesToShow: payload.allData,
        }
        case GET_ALL_COUNTRIES_DATA: return {
            ...state,
            allCountriesData: [...payload.allData],
            totalCountriesAll: payload.totalCountries,
            countriesToShow: payload.allData,
        }
        case GET_COUNTRIES_FILTER_AND_ORDER:
            console.log('si llega al reducer', payload)
            return {
                ...state,
                totalCountries: payload.totalCountries,
                countriesToShow: payload.allData
            }
        case SEARCH_COUNTRY:
            return {
                ...state,
                totalCountries: payload.totalCountries,
                countriesToShow: payload.allData
            }
        case GET_COUNTRY_DETAILS:
            console.log('llega al reducer', payload)
            if (payload) {
                console.log('payload desde reducer', payload)
                return {
                    ...state,
                    countryDetails: payload,
                }
            } else if (typeof payload === 'string' && payload.length === 3) {
                let countryToShow = state.countriesToShow.filter(country => country.country_id === payload)
                return {
                    ...state,
                    countryDetails: countryToShow
                }
            } else {
                return state
            }
        case GET_ALL_ACTIVITIES: return {
            ...state,
            totalActivities: payload.totalActivities,
            allActivities: payload.allData,
            activitiesToShow: payload.allData
        }
        case FILTER_ACTIVITIES_X_COUNTRY:
            if (typeof payload === 'string' && payload.length > 0) {
                let activitiesFiltered = state.allCountriesData.filter(pais => {
                    if (pais.Activities.find((e) => e.activity_name === 'Shoping')) return pais;
                    else return false;
                })
                console.log('este es filter desde reducer', activitiesFiltered);
                return {
                    ...state,
                    countriesWhitActivities: activitiesFiltered
                }
            }
            return state
        case POST_ACTIVITIES:
            console.log('este es el payload desde el reducer', payload)
            return {
                ...state,
                postMessage: payload.data
            }
        default:
            return state;
    }

}

export default rootReducer;