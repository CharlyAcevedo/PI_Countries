import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllActivities, getAllCountriesData } from '../../actions'
import PaginActivity from '../paginatedActivity/PaginActivity'
import ActivityCard from './activityCards/ActivityCard'
import activityT1 from '../../img/activityT1.png';
import activitySecT from '../../img/activitySecT.webp'
import './activities.css';

export default function Activities() {

    const dispatch = useDispatch();

    const activitiesToShow = useSelector(state => state.activitiesToShow);

    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage, setActivitiesPerPage] = useState(5);

    const limit = currentPage * activitiesPerPage;
    const offset = limit - activitiesPerPage;

    console.log('desde activities to show', activitiesToShow)

    const showActivities = activitiesToShow.slice(offset, limit);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() =>{
        dispatch(getAllCountriesData())
        dispatch(getAllActivities()); // eslint-disable-next-line
    },[]);
    // console.log(showActivities[0])
    return (
        <div className='home'>
            <section className='head_container'>
                <img className='img_activities1' src={activitySecT} />
                <img className='img_activities2' src={activityT1} />
            <h2 className='activity_title'>Actividades Turisticas</h2>
            <p className='p_activity'>Aqui encontrarás las actividades turísticas que nuestros usuarios han posteado con los paises donde se pueden realizar.</p>
            <p className='p_activity'>Si quieres incluir alguna actividad que conozcas que se puede realizar en uno o varios paises, por favor hazlo, solo da click en el boton que encontraras a conticuacion de este parrafo o ve al menu en actividades en la opcion crear. </p>
            <PaginActivity className='paginated1' activitiesToShow={activitiesToShow} activitiesPerPage={activitiesPerPage} pagination={pagination}/>
            </section>
            <section className='activities_container1'>
            {
                showActivities.length >= 0 && showActivities.map((a)=>{
                    return (                            
                                <Link 
                                className='card_container1'
                                key={a.id}
                                to={`/home/activities/${a.id}`}>
                                    <ActivityCard className='activity_card' 
                                    activity_name={a.activity_name} 
                                    difficulty={a.difficulty}
                                    duration={a.duration}
                                    season={a.season}/>
                                </Link>                         
                    )
                })
            }
            </section>
            <div className="nota_pie">Coded by: Charly, Creado en Henry como PI abril de 2022</div>
        </div>
    )

}
