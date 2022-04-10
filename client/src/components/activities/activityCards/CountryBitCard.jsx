import React from 'react';
import { useSelector } from 'react-redux';
import './countryBitCard.css'

export default function CountryBitCard({common}) {    

    const allCountriesData = useSelector(state => state.allCountriesData)

    const countryData = allCountriesData.filter(country => country.common_name === common )

    return (
        <div className="country_bitCard" name={common}>
            <header className="country_bitHeder" name={common}>
                <img className="country_bitFlag" src={countryData[0].flag_image_svg} alt="country flag" name={common}/>
            </header>
            <div className="country_bitText" name={common}>
                <p className="country_bitInside" id='country_id' name={common}>Code: {countryData[0].country_id}</p>
                <h4 className="country_bitInside" id='country_name' name={common}>{common}</h4>
            </div>
        </div>
    )
}