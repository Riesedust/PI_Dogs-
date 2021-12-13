import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import './Bar.css'
import * as actionCreator from '../../actions/actions.js'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Bar.css'

function Bar(props) {
    const [temp, setTemp] = useState([]) 

    useEffect(() =>{
        async function getTemps() {
            let e = (await axios.get('/temp')).data;
            setTemp(e);
        }
        getTemps();
    },[])


    function capitalize(string) {
        return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    function alChange(e){
        props.reset()
        props.ordenAl(e.target.value)
    }
    function pesoChange(e){
        props.reset()
        props.ordenPeso(e.target.value)
    }

    function tempChange(e){
        props.reset()
        props.filtrarTemp(e.target.value)
    }
    function filterChange(e){
        props.reset()
        props.filtrarApi(e.target.value)
    }

    function buscadorChange(e){
        props.reset()
        props.buscador(capitalize(e.target.value))
    }

    
    return (
        <div className="bar-box">
            <h1 className="title-body">Dogs app</h1>
            <div className="background-bar">
                <ul key="ordenar" className="div1">
                    <h4>Ordenar:</h4>
                    <select onChange={alChange} className="select-css"> 
                        <option value="default">Alfabeticamente</option>
                        <option value="az"> A - Z </option>
                        <option value="za"> Z - A </option>
                    </select>
                    <select onChange={pesoChange} className="select-css"> 
                        <option value="default">Peso</option>
                        <option value="menor"> Minimo </option>
                        <option value="mayor"> Maximo </option>
                    </select>
                </ul>
                <ul key="filtrar" className="div2">
                    <h4>Filtrar:</h4>
                    <select onChange={tempChange}>
                        <option value='all'>Todos los temperamentos</option>
                        {temp ? temp.map(e => <option>{e.name}</option>) : <h1>Hubo problemas :S</h1> }
                    </select>
                </ul>
                <ul key="razanew" className="div3">
                    <Link to='/add' className="button-go-form"><p>Crear raza</p></Link>
                </ul>
                <ul key="botones" className="div4">
                    <button className="buttons-filter-dogs" onClick={filterChange}value="all">Todos los perros</button>
                    <button className="buttons-filter-dogs" onClick={filterChange}value='db'> Perros creados </button>
                    <button className="buttons-filter-dogs" onClick={filterChange}value='api'> Perros locales </button>
                </ul>
                <ul className="div5">
                <input className="buscador" type='text' placeholder='Buscar raza...' onChange={buscadorChange}></input>
                </ul> 
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        pages: state.page,
        orden: state.orden,
        texto: state.text
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreator, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Bar)