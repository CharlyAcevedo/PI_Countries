import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountriesData } from '../../actions';
import { Link } from 'react-router-dom';
import CountryCard from '../countryCard/CountryCard';
import Paginated from '../paginated/Paginated'
import './home.css';

export default function Home() {
 
    const dispatch = useDispatch();
    
    // const allCountriesData = useSelector(state => state.allCountriesData);
    const countriesToShow = useSelector(state => state.countriesToShow);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesXPage, setCountriesXPage] = useState(10);

    const limit = currentPage * countriesXPage;
    const offset = limit - countriesXPage;

    const countriesForShow = countriesToShow.slice(offset, limit);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    useEffect(() => { 
        // dispatch(getAllCountries()) 
        dispatch(getAllCountriesData()) // eslint-disable-next-line
    },[]);
    
    function handlePageSelect(e){
        e.preventDefault();
        setCountriesXPage(e.target.value)
    }
    
    return (
        <div className="home">
            <Paginated className='paginated' totalCountriesAll={countriesToShow} countriesXPage={countriesXPage} pagination={pagination}/>
            <select className='select_page' value={countriesXPage} onChange={(e) =>handlePageSelect(e)}>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
            </select>
            <label className='select_page_label'>Paises por pagina a mostrar:</label>
            <div className="home_title">Bienvenidos a la App de Paises del Mundo</div>
            <div className='card_container'>
            {countriesForShow.length && countriesForShow.map((c) => {
                return (
                    <React.Fragment key={c.country_id}>
                        <Link className="cards" to={`/home/country_detail/${c.country_id}`}>
                            <CountryCard className="country_card" id={c.country_id} common={c.common_name} continent={c.continent} flag={c.flag_image_svg} />
                        </Link>
                    </React.Fragment>
                );
            })
            }
            </div>
            <div className="nota_pie">Coded by: Charly, Creado en Henry como PI abril de 2022</div>
        </div>
    )
}

