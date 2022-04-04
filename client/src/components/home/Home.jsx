import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryCard from '../countryCard/CountryCard';
import './home.css';

export default function Home() {
    
    const allCountries = useSelector(state => state.allCountriesData);
    const tenCountries = useSelector(state => state.countries);
    
    console.log('este es allCountries', allCountries);
    console.log('este es tenCountries', tenCountries);
    return (
        <div className="home">
            <div>Bienvenidos a la App de Paises del Mundo con Actividades Turisticas</div>
            <div>{tenCountries[0].common_name}</div>
            {tenCountries && tenCountries.map((c) => {
                return (
                    <React.Fragment key={c.country_id}>
                        <Link to='/country_detail'>
                            <CountryCard className="country_card" id={c.country_id} common={c.common_name} official={c.official_name} flag={c.flag_image_svg} />
                        </Link>
                    </React.Fragment>
                );
            })
            }

        </div>
    )
}

// function mapStateToProps(state) {
//     return {
//         countries: state.countries,
//     };
// };

// export default connect(mapStateToProps)(Home);
