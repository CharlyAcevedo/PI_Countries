import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, postActivities } from '../../actions';
import CountryBitCard from './activityCards/CountryBitCard'
import './createActivity.css';

export default function CreateActivity() {

    const dispatch = useDispatch();

    const allCountries = useSelector(state => state.countries);
    const warnings = useSelector(state => state.postMessage)

    const [dataForm, setDataForm] = useState({
        activity_name: '',
        difficulty: '',
        duration: '',
        season: '',
        country: [],
        countryCardsData: [],
    });
    const [actSelCount, setActSelCount] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState({
        difficulty: false,
        duration: false,
        season: false,
        country: false,
    });

    useEffect(() => {
        setErrors(validateForm(dataForm));
        dispatch(getAllCountries()) // eslint-disable-next-line
    },[]);

    const countrySelector = allCountries.map(country => {
        return {
            common: country.common_name,
            flag: country.flag_image_svg,
            id: country.country_id,
        }
    });
    

    function handleChangeForm(e){
        if(e.target.name === 'country') {
            setDisabled((prevState) => {
                return {
                    ...prevState,
                    country: true,
                }
            })
            setActSelCount(e.target.value);
        }
        setDataForm((prevState)=>{
            if(e.target.name === 'country') {
                const newBitCardData = countrySelector.filter(country => country.common === e.target.value)
                              
                const newState = {
                    ...prevState,
                    country: prevState.country.includes(e.target.value) ? [...prevState.country]: [...prevState.country, e.target.value],
                    countryCardsData: prevState.countryCardsData.includes(newBitCardData) ? [...prevState.countryCardsData] : [...prevState.countryCardsData, newBitCardData]
                }
                setDisabled((prevState) => {
                    return {
                        ...prevState,
                        country: true,
                    }
                })                
                setErrors(validateForm(newState));
                return newState;
            } else {
                const newState = {
                    ...prevState,
                    [e.target.name]: e.target.value,
                }
                setDisabled((prevState) => {
                    return {
                        ...prevState,
                        [e.target.name]: true,
                    }
                })
                setErrors(validateForm(newState));
                return newState;
            }
        })
    };

    function handleUnselectCountry(e){
        e.preventDefault();
        if(e.target.name !== undefined){
            const newCountryState = dataForm.country.filter((c) => c !== e.target.name);
            const newBitCardDataState = dataForm.countryCardsData.filter(c => c[0].common !== e.target.name)
            setDataForm((prevState) => {
                return {
                    ...prevState,
                    country: newCountryState,
                    countryCardsData: newBitCardDataState,
                }
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validateForm(dataForm));
        //meter if para validar
        setDisabled(() => {
            return {
                difficulty: false,
                duration: false,
                season: false,
                country: false,
            }
        })
        setDataForm((prevState)=>{
            return {
                activity_name: '',
                difficulty: '',
                duration: '',
                season: '',
                country: [],
                countryCardsData: [],
            }
        })
        dispatch(postActivities(dataForm))
    };

    // console.log(warnings)

    return (
        <div className='home'>
            <section className='text_container'>
                <div className="create_title">Hola aqui puedes crear una nueva actividad para varios paises</div>
                <p className='text_p'>Por favor llena todos los campos y selecciona los paises en donde se pueda practicar dicha actividad</p>
            { warnings.length > 0 && <div className='warnings'>{warnings}</div>}
            </section>
            <form className='form_container'>
                <button type='submit' className='btn_submit' onClick={handleSubmit} disabled={Object.keys(errors).length}>Crear Actividad</button>
                <label className='label_form'>Nombre de la actividad: </label>
                <input 
                className='input_form act_name' 
                type='text' 
                placeholder='Escribe una actividad aqui...'
                name='activity_name'
                value={dataForm.activity_name}
                onChange={handleChangeForm}
                />
                <label className='label_form'>A tu parecer que dificultad tiene esta actividad para realizarse: </label>
                <select 
                className='select_form' 
                id='select_difficulty'
                placeholder='Seleccione una dificultad de la lista...'
                name='difficulty'
                value={dataForm.difficulty}
                onChange={handleChangeForm}
                >
                    <option id='desabilitar' selected disabled={disabled.difficulty}>Seleccione la dificultad aquí</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <label className='label_form'>Seleccione de la lista una duracion aproximada que estime toma realizar esta actividad: </label>
                <select 
                className='select_form' 
                id='select_duration'
                name='duration'
                value={dataForm.duration}
                onChange={handleChangeForm}
                >
                    <option id='desabilitar' selected disabled={disabled.duration}>Seleccione la duración aquí</option>
                    <option value="10 minutos">10 minutos</option>
                    <option value="20 minutos">20 minutos</option>
                    <option value="30 minutos">30 minutos</option>
                    <option value="40 minutos">40 minutos</option>
                    <option value="50 minutos">50 minutos</option>
                    <option value="60 minutos">60 minutos</option>
                    <option value="90 minutos">90 minutos</option>
                    <option value="120 minutos">120 minutos</option>
                    <option value="mas de 2 horas">mas de 2 horas</option>
                    <option value="Todo el día">Todo el día</option>
                </select>
                <br />
                <label className='label_form'>Seleccione de la lista una estacion del año donde usted recomiende practicar la actividad: </label>
                <select 
                className='select_form' 
                id='select_season'
                name='season'
                value={dataForm.season}
                onChange={handleChangeForm}
                >
                    <option id='desabilitar' selected disabled={disabled.season}>Seleccione la estación del año aquí</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                </select>
                <br />                
                <label className='label_form'>Seleccione de la lista los paises donde usted recomiende practicar la actividad: </label>
                <select 
                className='select_form' 
                id='select_country'
                name='country'
                value={actSelCount}
                onChange={handleChangeForm}
                >
                    <option id='desabilitar' selected disabled={disabled.country}>Seleccione el pais aqui</option>
                    {
                        countrySelector && countrySelector.map((c) => {
                           return ( <option key={c.common} value={c.common}>{c.common}</option> );
                        })
                    }
                </select>
                <br />
            {
                dataForm.countryCardsData && dataForm.countryCardsData.map( (c) =>{
                    console.log('CardsData desde el map',c[0].common)
                    return (<div className='bit_container' key={c[0].id} name={c[0].common}>
                    <button className='bit_btn' onClick={handleUnselectCountry} id={c[0].id} name={c[0].common}><CountryBitCard  common={c[0].common} flag={c[0].flag} id={c[0].id} name={c[0].common}/></button>
                    </div>)
                })
            }
            </form>
        </div>
    )
}

export function validateForm(input){
    let errors = {};
    if(!input.activity_name){ //hacer una regular exrpresion para validar que no haya solo numeros
        errors.activity_name = 'Debe escribir un nombre para la actividad para habilitar la creación';
    } else if(input.activity_name.length < 3) {
        errors.activity_name = 'El nombre de la actividad debe tener por lo menos 3 letras';
    };

    if(!input.difficulty){
        errors.difficulty = 'Se debe seleccionar una dificultad para poder habilitar la creación'
    }

    if(!input.duration){
        errors.duration = 'Se debe seleccionar una duración aproximada de la actividad para poder crearla'
    }

    if(!input.season){
        errors.season = 'Se debe seleccionar una estación del año para poder crear una actividad'
    }

    if(input.country.length <= 0){
        errors.country = 'Se debe seleccionar por lo menos un pais antes de poder crear la actividad'
    }
    return errors;
}