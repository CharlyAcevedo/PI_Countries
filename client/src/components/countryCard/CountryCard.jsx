import React from 'react';

export default function CountryCard({ id, common, official, flag }) {    

    return (
        <div className="country_card">      
            <img className="country_flag" src={flag} alt="country flag" width="250px" height="200px"/>
            <p>Clave de Pais: {id}</p>
            <h5>Nombre comun: {common}</h5>
            <h6>Nombre Oficial: {official}</h6>
        </div>
    )
}