import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountryDetails } from '../../actions';
import loading from '../../img/loading-1.gif';
import ActivityCard from '../activities/activityCards/ActivityCard';
import './countryDetails.css';

export default function CountryDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetails(props.match.params.country_id)); // eslint-disable-next-line
  }, []);

  const countryData = useSelector((state) => state.countryDetails);

  console.log(countryData.Currencies);

  return (
    <div className="details_container">
      {!countryData ? (
        <img src={loading} alt="loading" />
      ) : (
        <>
          <div className="titles_container">
            <h6 className='titles_labels' id="label_country_id">
              Codigo ISO 3166-1 alfa-3: 
              <div className='titles_values' id="country_id">{countryData.country_id}</div>
            </h6>
            <h1 className='titles_labels' id="label_country_name">
              <div className='titles_values' id="country_name">{countryData.common_name}</div></h1>
            <h5 className='titles_labels' id="label_official">
              Nombre oficial: 
              <div className='titles_values' id="country_official">{countryData.official_name}</div>
            </h5>
          </div>
          <img className="flag" src={countryData.flag_image_svg} alt="flag" />          
          <section className="data_section">
            <div className="labels_data" id="label_capital">
              Capital:{" "}
              <div className="data_inside" id="data_capital">
                {countryData.capital}
              </div>
            </div>
            <div className="labels_data" id="label_continent">
              Continente:{" "}
              <div className="data_inside" id="data_continent">
                {countryData.continent}
              </div>
            </div>
            <div className="labels_data" id="label_subregion">
              Subregión:{" "}
              <div className="data_inside" id="data_subregion">
                {countryData.subregion}
              </div>
            </div>
            <div className="labels_data" id="label_area">
              Area:{" "}
              <div className="data_inside" id="data_area">
                {countryData.area}
              </div>
            </div>
            <div className="labels_data" id="label_population">
              Población:{" "}
              <div className="data_inside" id="data_population">
                {countryData.population}
              </div>
            </div>
            <div className="labels_data" id="label_lat">
              Lat:{" "}
              <div className="data_inside" id="data_lat">
                {countryData.lat}
              </div>
            </div>
            <div className="labels_data" id="label_lng">
              Long:{" "}
              <div className="data_inside" id="data_lng">
                {countryData.lng}
              </div>
            </div>
            <div className="labels_data" id="label_map">
              Map:{" "}
              <div className="data_inside" id="data_map"><a
                href={countryData.map}
                target="_blank"
                rel="noreferrer"
              >
                {countryData.map}
              </a></div>
            </div>
          </section>
          <section className='section_currencies'>
            <div>Monedas oficiales en el pais</div>
            <div className='currencies_container'>
            {
              countryData.Currencies && countryData.Currencies.map((c) => {
                return (
                  <div  key={c.id}>
                    <div>{c.symbol} -- {c.currency_name} -- {c.currency_3letter}</div>
                  </div>
                )
              })
            }
            </div>
          </section>
          <section className='section_timezones'>
            <div>Zonas horarias:</div>
            <div className='timezones_container'>
            {
              countryData.Timezones && countryData.Timezones.map((t) => {
                return (
                  <div  key={t.id}>
                    <div>{t.timezone_name}</div>
                  </div>
                )
              })
            }
            </div>
          </section>
          <section className='section_languages'>
            <div>Lenguajes:</div>
            <div className='languages_container'>
            {
              countryData.Languages && countryData.Languages.map((l) => {
                return (
                  <div  key={l.language_id}>
                    <div>{l.language_code} --- {l.language_name}</div>
                  </div>
                )
              })
            }
            </div>
          </section>
          <h4 className="title_activities">
            Actividades turisticas en el País{" "}
          </h4>
          <div className="activities_container">
            {countryData.Activities &&
              countryData.Activities.map((a) => {
                return (
                  <Link
                    className="activities_holder"
                    to={`/home/activity_details/${a.id}`}
                    key={a.activity_name}
                  >
                    <ActivityCard
                      activity_name={a.activity_name}
                      difficulty={a.difficulty}
                      duration={a.duration}
                      season={a.season}
                    />
                  </Link>
                );
              })}
          </div>
        </>
      )}
      <footer className="footer1">
        Coded by: Charly, Creado en Henry como PI abril de 2022
      </footer>
    </div>
  );
}