import React from 'react';
import './paginated.css'

export default function Paginated({ totalCountriesAll, countriesXPage, pagination }) {

    const pages = [];

    // console.log('este es paginado', totalCountriesAll);

    const totalPages = Math.ceil(totalCountriesAll.length/countriesXPage +1);

    for(let i = 1; i < totalPages; i++) {
        pages.push(i);
    };

    return (
        <div className='pages_container'>
            <ul className='ul_container'>
                {
                    pages ? pages.map(page => (
                        <li className='boton_paginado' key={page}>
                            <button className='btn_primary'onClick={() => pagination(page)}>{page}</button>
                        </li>
                    )) : <li>0</li>
                }
            </ul>
        </div>
    )
}