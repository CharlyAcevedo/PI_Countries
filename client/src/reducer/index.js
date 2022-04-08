import {
    GET_COUNTRY_DETAILS,
    GET_ALL_COUNTRIES,
    GET_ALL_COUNTRIES_DATA,
    GET_COUNTRIES_FILTER_AND_ORDER,
    SEARCH_COUNTRY
} from "../actions";

const initialState = {
    countries: [],
    totalCountries: 0,
    totalCountriesAll: 0,
    allCountriesData: [],
    countriesToShow: [],
    countryDetails: {},
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
                countriesToShow: [...payload]
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
        default:
            return state;
    }

}

export default rootReducer;