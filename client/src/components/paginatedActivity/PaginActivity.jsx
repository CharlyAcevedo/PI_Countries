import React from 'react';
import './paginActivity.css'

export default function Paginated({ activitiesToShow, activitiesPerPage, pagination }) {

    const pages = [];

    // console.log('este es paginado', activitiesToShow);

    const totalPages = Math.ceil(activitiesToShow.length/activitiesPerPage + 1);

    for(let i = 1; i < totalPages; i++) {
        pages.push(i);
    };

    return (
        <nav>
            <ul className='pages_container1'>
                {
                    pages ? pages.map(page => (
                        <li className='boton_paginado' key={page}>
                            <button className='btn_primary'onClick={() => pagination(page)}>{page}</button>
                        </li>
                    )) : <li>0</li>
                }
            </ul>
        </nav>
    )
}