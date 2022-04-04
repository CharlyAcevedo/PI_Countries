import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCountries, getAllCountriesData } from '../../actions/index';
import './landing.css';


class Landing extends Component {

    componentDidMount(){
        this.setState([this.props.getAllCountries(), this.props.getAllCountriesData()])
    };
    
    render() {        
        return (
            <div className='landing_page'>
                <h2 className="title_app">App de Paises del Mundo con Actividades Turísticas</h2>
                <h4 className="subtitle_app">Para ingresar por favor da click en el siguiente boton</h4>
                <Link className='link_Nav' to="/home" >
                    <button className='btn_w'>Bienvenidos</button>
                    </Link>
                <div className='img_container'></div>           
            </div>
        );
    };
};

export const mapDispatchToProps = function(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        getAllCountriesData: () => dispatch(getAllCountriesData())
    }
};

export default connect(null, mapDispatchToProps)(Landing);