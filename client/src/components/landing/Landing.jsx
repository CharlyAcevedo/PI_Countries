import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCountries } from '../../actions/index';
import giramundo from '../../img/giramundo.gif'
import './landing.css';


class Landing extends Component {

    componentDidMount(){
        this.setState(this.props.getAllCountries())
    };
    
    render() {        
        return (
            <div className='landing_page'>
                <div className="title_app">Bienvenido a la App de Paises del Mundo con Actividades Turísticas</div>
                <h4 className="subtitle_app">Para ingresar por favor da click en el siguiente boton</h4>
                <Link className='link_Home' to="/home" >
                    <button className='btn_w'>Bienvenidos</button>
                    </Link>
                <div className='img_container'><img className='world_image' src={giramundo} alt='Mundo' /></div>
            </div>
        );
    };
};

export const mapDispatchToProps = function(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries())
    }
};

export default connect(null, mapDispatchToProps)(Landing);