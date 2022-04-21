import React from 'react';
import './countryCard.css'

export default function CountryCard({ id, common, continent, flag }) {    

    return (
        <div className="country_card">
            <header className="country_heder">
                <img className="country_flag" src={flag} alt="country flag"/>
            </header>
            <div className="country_text">
                <p className="country_inside_card" id='country_id_card'>Code: {id}</p>
                <h4 className="country_inside_card" id='country_name_card'>{common}</h4>
                <h5 className="country_inside_card" id='country_continent_card'>{continent}</h5>
            </div>
        </div>
    )
}