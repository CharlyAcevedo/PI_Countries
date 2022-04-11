import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountriesData } from '../../../actions/index';
import loading from '../../../img/loading-1.gif';
import './countryBitCard.css'

export default function CountryBitCard({common}) {

    
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(getAllCountriesData()) // eslint-disable-next-line
    },[]);


    const allCountriesData = useSelector(state => state.allCountriesData)

    const countryData = allCountriesData.filter(country => country.common_name === common )

    const flag = countryData[0].flag_image_svg ? countryData[0].flag_image_svg : loading;
    const id = countryData[0].country_id ? countryData[0].country_id : 'loading...';

    console.log('esta es la biCard de country', countryData);
    return (
        <div className="country_bitCard" name={common}>
            <header className="country_bitHeder" name={common}>
                <img className="country_bitFlag" src={flag} alt="country flag" name={common}/>
            </header>
            <div className="country_bitText" name={common}>
                <p className="country_bitInside" id='country_id' name={common}>Code: {id}</p>
                <h4 className="country_bitInside" id='country_name' name={common}>{common}</h4>
            </div>
        </div>
    )
}