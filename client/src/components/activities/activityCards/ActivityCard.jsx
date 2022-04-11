import React from 'react';
import spring from '../../../img/spring.jpg';
import summer from '../../../img/summer.jpg';
import fall from '../../../img/fall.jpg';
import winter from '../../../img/winter.jpg';
import './activityCard.css'

export default function ActivityCard({ activity_name, difficulty, duration, season }) {    

const imageToShow = season === 'Primavera' ? spring : season === 'Verano' ? summer : season === 'Otoño' ? fall : winter;

    return (
        <div className="activity_card_container" >
            <header className="activity_heder" >
                <img className="activity_image" src={imageToShow} />
            </header>
            <div className="activity_text" >
                <h5 className="activity_inside" id='activity_name'>{activity_name}</h5>
                <div className="activity_inside" id='difficulty'>Dificultad: {difficulty}</div>
                <div className="activity_inside" id='duration'>Duración: {duration}</div>
                <div className="activity_inside" id='season'>Temporada: {season}</div>                
            </div>
        </div>
    )
}