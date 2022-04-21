import React from 'react';
import './countryBitCard.css'

export default function CountryBitCard({common, flag, id}) {

    return (
        <div className="country_bitCard" name={common}>
            <header className="country_bitHeder" name={common}>
                <img className="country_bitFlag" src={flag} alt="country flag" name={common}/>
            </header>
            <div className="country_bitText" name={common}>
                <p className="country_bitInside" id='country_id_bitCard' name={common}>Code: {id}</p>
                <h4 className="country_bitInside" id='country_name_bitCard' name={common}>{common}</h4>
            </div>
        </div>
    )
}