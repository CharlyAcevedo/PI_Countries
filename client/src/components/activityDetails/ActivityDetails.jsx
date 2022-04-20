import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getActivityDetails, getAllCountries } from '../../actions';
import CountryBitCard from '../activities/activityCards/CountryBitCard'
import turismundo from '../../img/turismundo.jpg'
import loading from '../../img/loading-1.gif';
import './activityDetails.css';



export default function ActivityDetails (props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivityDetails(props.match.params.id)); // eslint-disable-next-line
    },[]);

    const activityData = useSelector(state => state.activityDetails)
    
    // console.log('esto es params', props.match.params.id);
    // console.log('esto activitiesData', activityData)

    return (
        <div className='details_container'>
            {!activityData ? <img src={loading} alt='loading'/> : 
            <>
            <div className='id_and_name_activity'>
            <h6>Id: {activityData.id}</h6>
            <h1 className='country_name'>Actividad: {activityData.activity_name}</h1>
            <img className='flag' src={turismundo} alt='flag' />
            </div>
            <section className='data_section'>
                <div>Dificultad aproximada: {activityData.difficulty}</div>
                <div>Duración promedio: {activityData.duration}</div>
                <div>Subregión: {activityData.season}</div>
                <div>Area: {activityData.createdAt}</div>
                </section>
                <h4 className="title_country_container">Paises donde se puede practicar la actividad turística</h4>
                <div className='countries_container'>
            {
                activityData.Countries && activityData.Countries.map((c) => {
                    return (
                    <div key={c.country_id} className='countries_holder'>
                        <CountryBitCard common={c.common_name}/>
                    </div>)
                })
            }
                </div>
           

            </>
            }
            {/* <div className="nota_pie">Coded by: Charly, Creado en Henry como PI abril de 2022</div>  */}
        </div>
    )
}