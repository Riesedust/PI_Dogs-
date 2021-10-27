import axios from 'axios'
import React,{useEffect} from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {string} from '../../actions/actions'
import "./InfoDog.css"

function InfoDog({id}) {

    const [infodog, setInfodog] = useState()

    useEffect(() =>{
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then(data => {
            setInfodog(data.data[0])
            })
    },[])

    function separar(str){
        if(str.includes('–')){
            return str.split(' – ')
        }
        if(str.includes('-')){
            return str.split(' - ')
        }
        else return str
    }

    return (
        infodog ?
        <div>
            <Link to='/dogs'>Volver</Link>
            <div className="info-box">
                <h1>{infodog.name}</h1>
                <div className="image-box">
                    <img className="image-dog" src={infodog.image} />
                </div>
                <div className="temp-box">
                    <h3>Sus temperamentos pueden ser </h3>
                    <h3>{string(infodog.temperamentos)}</h3>
                </div>
                <div className="peso-box">
                    <div className="min">
                        <p>Peso minimo: </p>
                        <h4>{separar(infodog.peso)[0]} Kg</h4>
                    </div>
                    <div className="imagekg-box">
                        <img className="image-kg"src="https://cdn-icons-png.flaticon.com/512/847/847345.png"/>
                    </div>
                    <div className="max">
                        <p>Peso maximo: </p>
                        <h4>{separar(infodog.peso)[1]} Kg</h4>
                    </div>
                </div>
                <div className="altura-box">
                    <div className="min">
                        <p>Altura minima: </p>
                        <h4>{separar(infodog.altura)[0]} Cm</h4>
                    </div>
                    <div className="imagerule-box">
                        <img className="image-rule" src="https://www.pngall.com/wp-content/uploads/8/Rule-PNG-Photo.png"/>
                    </div>
                    <div className="max">
                        <p>Altura maxima: </p>
                        <h4>{separar(infodog.altura)[1]} Cm</h4>
                    </div>
                </div>
                {infodog.vida.includes('-' || '–') ? 
                <p>Vive entre {separar(infodog.vida)[0]} y {separar(infodog.vida)[1].split(' years')[0]} años </p>: 
                <p>Vive {infodog.vida.split(' years')[0]} años </p>} 
            </div>
        </div>:
        
        <div>
        <h1> Cargando... </h1> 
        <img className="loading" src="https://pa1.narvii.com/6288/3606a2f96864024e460335397db78c7b2381a131_hq.gif"></img>
        </div>
    ) 
}

export default InfoDog
