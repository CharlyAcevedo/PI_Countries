import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllActivities, filterActivities } from '../../actions'
import './activities.css';

export default function Activities() {

    const dispatch = useDispatch();

    const activitiesToShow = useSelector(state => state.activitiesToShow);

    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage, setActivitiesPerPage] = useState(10);

    const limit = currentPage * activitiesPerPage;
    const offset = limit - activitiesPerPage;

    // console.log(activitiesToShow)

    const showActivities = activitiesToShow.slice(offset, limit);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() =>{
        dispatch(getAllActivities()); // eslint-disable-next-line
    },[]);
    useEffect(() =>{
        dispatch(filterActivities('visitar el desierto'))
    },[]);
    // console.log(showActivities[0])
    return (
        <div className='page_activities_container'>
            <h2 className='activity_title'>Actividades Turisticas</h2>
            <p className='p_activity'>Aqui encontrarás las actividades turísticas que nuestros usuarios han posteado con los paises donde se pueden realizar.</p>
            <p className='p_activity'>Si quieres incluir alguna actividad que conozcas que se puede realizar en uno o varios paises, por favor hazlo, solo da click en el boton que encontraras a conticuacion de este parrafo o ve al menu en actividades </p>
            {
                showActivities.length >= 0 && showActivities.map((a)=>{
                    return (
                        <section className='activity_main' key={a.id}>
                            <h5>{a.activity_name}</h5>
                            <div>Dificultad: {a.difficulty}</div>
                            <div>Duración: {a.duration}</div>
                            <div>Temporada: {a.season}</div>                            
                        </section>
                    )
                })
            }
        </div>
    )

}
