import React from 'react';
import './paginated.css'

export default function Paginated({ totalCountriesAll, countriesXPage, pagination }) {

    const pages = [];

    // console.log('este es paginado', totalCountriesAll);

    const totalPages = totalCountriesAll.length/countriesXPage;

    for(let i = 1; i < totalPages; i++) {
        pages.push(i);
    };

    return (
        <nav>
            <ul className='pages_container'>
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