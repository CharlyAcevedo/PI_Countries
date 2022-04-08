import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountryDetails } from '../../actions';
import loading from '../../img/loading-1.gif';
import './countryDetails.css';



export default function CountryDetails (props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetails(props.match.params.country_id)); // eslint-disable-next-line
    },[]);

    const countryData = useSelector(state => state.countryDetails)
    console.log('esto es countryData', countryData);

    return (
        <div className='details_container'>
            {!countryData ? <img src={loading} alt='loading'/> : 
            <>
            <h6>ISO 3166-1 alfa-3: {countryData.country_id}</h6>
            <h1 className='country_name'>País: {countryData.common_name}</h1>
            <h5 className='official'>Su nombre oficial es {countryData.official_name}</h5>
            <img className='flag' src={countryData.flag_image_svg} alt='flag' />
            <section className='data_section'>
                <div>Capital: {countryData.capital}</div>
                <div>Continente: {countryData.continent}</div>
                <div>Subregión: {countryData.subregion}</div>
                <div>Area: {countryData.area}</div>
                <div>Población: {countryData.population}</div>
                <div>Latitud: {countryData.lat}</div>
                <div>Longitud: {countryData.lng}</div>
                <div>Map: <a href={countryData.map} target="_blank" rel="noreferrer">{countryData.map}</a></div>
                </section>
                <h4 className="title_activities">Actividades turisticas en el País </h4>
                <div className='activities_container'>
            {
                countryData.Activities && countryData.Activities.map((a) => {
                    return (
                    <div key={a.activity_name} className='activities_holder'>
                    <div className='activity_prop'>Actividad: {a.activity_name}</div>
                    <div className='activity_prop'>Dificultad: {a.difficulty}</div>
                    <div className='activity_prop'>Duracion aproximada: {a.duration}</div>
                    <div className='activity_prop'>Temporada donde se puede practicar: {a.season}</div>
                    </div>)
                })
            }
                </div>
           

            </>
            }
        </div>
    )
}