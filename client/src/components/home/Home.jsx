import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, getAllCountriesData } from '../../actions'
import { Link } from 'react-router-dom';
import CountryCard from '../countryCard/CountryCard';
import Paginated from '../paginated/Paginated'
import './home.css';

export default function Home() {

    const dispatch = useDispatch();
    
    // const allCountriesData = useSelector(state => state.allCountriesData);
    const countriesToShow = useSelector(state => state.countriesToShow);
    // const countriesPage = useSelector(state => state.countries);
    // const totalCountries = useSelector(state => state.totalCountries);

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
    },[]) 
    

    
    return (
        <div className="home">
            <Paginated className='paginated' totalCountriesAll={countriesToShow} countriesXPage={countriesXPage} pagination={pagination}/>
            <div className="home_title">Bienvenidos a la App de Paises del Mundo con Actividades Turisticas</div>
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

