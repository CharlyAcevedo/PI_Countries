import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { countriesFiltersAndOrders, searchCountries, getAllCountriesData } from '../../actions/index';
import giramundoblaco from './giramundoblaco.gif';
// import pagination from '../home/Home'
import search from './search.svg';
import arrow from './arrow.svg';
import './Nav.css';

export default function Nav() {

  const dispatch = useDispatch();


  const [continentFilter, setContinentFilter] = useState('all');
  const [subregionFilter, setSubregionFilter] = useState('all');
  const [currentOrder, setCurrentOrder] = useState('ASC');
  const [currentOrderBy, setCurrentOrderBy] = useState('common_name');
  const [currentField, setCurrentField] = useState('continent');
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSearch, setCurrentSearch] = useState('')
  const [orderPrevious, setOrderPrevious] = useState('ASC')
  const [byPrevious, setByPrevious] = useState('common_name')

  const allCountries = useSelector(state => state.allCountriesData)

  const allSubregions = allCountries.map(country => country.subregion)
  const uniqueSubs = new Set(allSubregions)
  const uniqueSubregions = [...uniqueSubs]

  console.log(currentFilter, currentField)

  const handleOrder = (e) => {
    let payload = {};
    if(e.target.name === 'order') {
      payload = {
        field: currentField,
        filter: currentFilter,
        order: e.target.value,
        orderBy: currentOrderBy
      }
      setOrderPrevious(currentOrder)
      setCurrentOrder(e.target.value)
      console.log('se cambio el orden de', orderPrevious, ' a ', currentOrder)
    } else if(e.target.name === 'orderBy') {
      payload = {
        field: currentField,
        filter: currentFilter,
        order: currentOrder,
        orderBy: e.target.value
      }
      setByPrevious(currentOrderBy)
      setCurrentOrderBy(e.target.value)
      console.log('se cambio el orden de', byPrevious, ' a ', currentOrderBy)
    }
    dispatch(countriesFiltersAndOrders(payload));
  }


  const handleFilter = (e) => {
    const payload = {
      field: e.target.name,
      filter: e.target.value,
      order: currentOrder,
      orderBy: currentOrderBy
    }
    if(e.target.name === 'continent'){
      setContinentFilter(e.target.value);    
      setSubregionFilter('all');
      setCurrentField(e.target.name);
      setCurrentFilter(e.target.value);
    } else if(e.target.name === 'subregion'){
      setSubregionFilter(e.target.value);
      setContinentFilter('all');      
      setCurrentField(e.target.name);
      setCurrentFilter(e.target.value);
    }
    dispatch(countriesFiltersAndOrders(payload));
  }

  
  
  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.value === '') {
      setCurrentSearch(e.target.value)
      dispatch(getAllCountriesData())
    } else {
      setCurrentSearch(e.target.value)
      console.log('aqui llega', e.target.value)
      dispatch(searchCountries(e.target.value))

    }
  }

  return (
    <nav className='nav_Bar'>
      <section className='nav_container'>
        <img className='nav_Icon' src={giramundoblaco} alt="" />
        <p className='nav_title'>App de Paises del Mundo</p>
        <input onChange={(e) => handleChange(e)} className='nav_input' type="search" value={currentSearch}/>
        <img className='img_search' src={search} alt='search' />
        <ul className='nav_links'>
          <li className='nav_link'>
            <Link className='link_Nav' to="/home" >Inicio</Link>
          </li>
          <li className='nav_link'>
            <p className='link_Nav' >Actividades<img className='menu_arrow' src={arrow} alt='an arrow' /></p>
            <ul className='nav_nesting_menu'>
              <li className='nav_link nav_link_inside'>
                <Link className='link_Nav nav_link_inside' to="/home/activities" >Todas</Link>
              </li>
              <li className='nav_link nav_link_inside'>
                <Link className='link_Nav nav_link_inside' to="/home/activities/create_activity" >Crear</Link>
              </li>
            </ul>
          </li>
          <li className='nav_link'>
            <p className='link_Nav' >Orden<img className='menu_arrow' src={arrow} alt='an arrow' /></p>
            <ul className='nav_nesting_menu'>
              <li className='nav_link nav_link_inside'>Orden:
                <select onChange={e => handleOrder(e)} className='select_nav' name="order" value={currentOrder}>
                  <option value='ASC'>Ascendente</option>
                  <option value='DESC'>Descendente</option>
                </select></li>
              <li className='nav_link nav_link_inside'>Ordenar por:
                <select onChange={e => handleOrder(e)} className='select_nav' name="orderBy" value={currentOrderBy}>
                  <option value='common_name'>Pais</option>
                  <option value='continent'>Continente</option>
                  <option value='subregion'>Subregion</option>
                  <option value='area'>Area</option>
                  <option value='population'>Población</option>
                </select></li>
            </ul>
          </li>
          <li className='nav_link nav_link_show'>
            <p className='link_Nav'>Filtros<img className='menu_arrow' src={arrow} alt='an arrow' /></p>
            <ul className='nav_nesting_menu'>
              <li className='nav_link nav_link_inside'>Por Continente:
                <select onChange={e => handleFilter(e)} className='select_nav' name="continent" value={continentFilter}>
                  <option value='all'>Todos</option>
                  <option value='Africa'>Africa</option>
                  <option value='Asia'>Asia</option>
                  <option value='Antarctica'>Antarctica</option>
                  <option value='Europe'>Europe</option>
                  <option value='North America'>North America</option>
                  <option value='South America'>South America</option>
                  <option value='Oceania'>Oceania</option>
                </select></li>
              <li className='nav_link nav_link_inside'>Por Subregión:
                <select onChange={e => handleFilter(e)} className='select_nav' name="subregion" value={subregionFilter}>
                  <option value='all'>Todos</option>
                  {
                    uniqueSubregions && uniqueSubregions.map((sub) => {
                      return (<option key={sub} value={sub}>{sub}</option>)
                    })
                  }
                </select></li>
            </ul>
          </li>
        </ul>
      </section>
    </nav>
  );

};
