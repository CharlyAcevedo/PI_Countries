import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountryDetails } from '../../actions';
import loading from '../../img/loading-1.gif';
import ActivityCard from '../activities/activityCards/ActivityCard';
import './countryDetails.css';

export default function CountryDetails (props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetails(props.match.params.country_id)); // eslint-disable-next-line
    },[]);

    const countryData = useSelector(state => state.countryDetails)

    console.log(countryData)

    return (
        <div className='details_container'>
            {!countryData ? <img src={loading} alt='loading'/> : 
            <>
            <div className='titles_container'>
            <h6 className='country_id'>ISO 3166-1 alfa-3: {countryData.country_id}</h6>
            <h1 className='country_name'>País: {countryData.common_name}</h1>
            <h5 className='official'>Su nombre oficial es {countryData.official_name}</h5>
            </div>
            <img className='flag' src={countryData.flag_image_svg} alt='flag' />      
            <section className='data_section'>
                <div className='labels_data' id='label_capital'>Capital: <div className='data_inside' id='data_capital'>{countryData.capital}</div></div>
                <div className='labels_data' id='label_capital'>Continente: <div className='data_inside' id='data_continent'>{countryData.continent}</div></div>
                <div className='labels_data' id='label_capital'>Subregión: <div className='data_inside' id='data_subregion'>{countryData.subregion}</div></div>
                <div className='labels_data' id='label_capital'>Area: <div className='data_inside' id='data_area'>{countryData.area}</div></div>
                <div className='labels_data' id='label_capital'>Población: <div className='data_inside' id='data_population'>{countryData.population}</div></div>
                <div className='labels_data' id='label_capital'>Latitud: <div className='data_inside' id='data_lat'>{countryData.lat}</div></div>
                <div className='labels_data' id='label_capital'>Longitud: <div className='data_inside' id='data_lng'>{countryData.lng}</div></div>
                <div className='labels_data' id='label_capital'>Map: <a className='data_inside' id='data_map' href={countryData.map} target="_blank" rel="noreferrer">{countryData.map}</a></div>
                </section>
                <h4 className="title_activities">Actividades turisticas en el País </h4>
                <div className='activities_container'>
            {
                countryData.Activities && countryData.Activities.map((a) => {
                    return (
                    <Link className='activities_holder' to={`/home/activity_details/${a.id}`} key={a.activity_name}>
                        <ActivityCard 
                        activity_name={a.activity_name} 
                        difficulty={a.difficulty} 
                        duration={a.duration} season={a.season} />
                    </Link>)
                })
            }
                </div>
            </>
            }
            <footer className="nota_pie1">Coded by: Charly, Creado en Henry como PI abril de 2022</footer>
        </div>
    )
}