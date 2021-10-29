import axios from 'axios'
import React,{useEffect} from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {string, separar} from '../../actions/actions'
import "./InfoDog.css"

function InfoDog({id}) {

    const [infodog, setInfodog] = useState()

    useEffect(() =>{
        axios.get(`http://localhost:3001/dogs/${id}`)
        .then(data => {
            setInfodog(data.data[0])
            })
    },[])

    return (
        infodog ?
        <div className="background">
            <Link className="button-back-info" to='/dogs'>Volver</Link>
            <div className="info-box">
                <h1>{infodog.name}</h1>
                <div className="image-box">
                    <img className="image-dog" alt="perro" src={infodog.image} />
                </div>
                <div className="temp-box">
                    <h3>Sus temperamentos pueden ser </h3>
                    <h3>{string(infodog.temperamentos)}</h3>
                </div>
                <div className="peso-box">
                    <div className="min">
                        <h4>Peso minimo: </h4>
                        {infodog.peso.includes('-'|| '–')? <h2>{separar(infodog.peso)[0]} Kg</h2>:
                        <h2>{infodog.peso} Kg</h2>}
                    </div>
                    <div className="imagekg-box">
                        <img className="image-kg" alt="kilos" src="https://cdn-icons-png.flaticon.com/512/847/847345.png"/>
                    </div>
                    <div className="max">
                        <h4>Peso maximo: </h4>
                        {infodog.peso.includes('-'|| '–')?<h2>{separar(infodog.peso)[1]} Kg</h2>:
                        <h2>{infodog.peso} Kg</h2>}
                    </div>
                </div>
                <div className="altura-box">
                    <div className="min">
                        <h4>Altura minima: </h4>
                        <h2>{separar(infodog.altura)[0]} Cm</h2>
                    </div>
                    <div className="imagerule-box">
                        <img className="image-rule" alt="regla" src="https://www.pngall.com/wp-content/uploads/8/Rule-PNG-Photo.png"/>
                    </div>
                    <div className="max">
                        <h4>Altura maxima: </h4>
                        <h2>{separar(infodog.altura)[1]} Cm</h2>
                    </div>
                </div>
                <div className="vida-box">
                    <div className="imageheart-box">
                        <img className="image-heart" alt="vida" src="https://www.pngall.com/wp-content/uploads/4/Heart-Symbol-Transparent.png"/>
                    </div>
                    <div>
                   {infodog.vida.includes('-' || '–') ?  
                    <h4>Vive entre {separar(infodog.vida)[0]} y {separar(infodog.vida)[1].split(' years')[0]} años </h4>: 
                    <h4>Vive {infodog.vida.split(' years')[0]} años </h4> }
                    </div>
                    <div className="imageheart-box">
                        <img  className="image-heart" alt="vida" src="https://www.pngall.com/wp-content/uploads/4/Heart-Symbol-Transparent.png"/>
                    </div>               
                </div>
            </div>
        </div>:
        
        <div className="loading">
        <h1> Cargando... </h1> 
        <img src="https://pa1.narvii.com/6288/3606a2f96864024e460335397db78c7b2381a131_hq.gif"></img>
        </div>
    ) 
}

export default InfoDog
