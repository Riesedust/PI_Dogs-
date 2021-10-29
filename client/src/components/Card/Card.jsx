import React from 'react'
import './Card.css'



function Card({name, temperamentos, image, peso}) {

    var pesoMin = peso.split(' - ')[0]
    var pesoMax = peso.split(' - ')[1]

    var nombreCortado = name.slice(0, 26)


    return (
        <div className='card'>
            <div className='content'>
                <div className="dog-imagen">
                    <img className="perrito"src={image} alt={name}/>
                </div> 
                <div className="card-text">
                    <span className='raza'>Raza:</span>
                    <h2>{nombreCortado}</h2>
                    <span className='temp'>Temperamentos:</span>
                    {temperamentos.length !== 0 ?<p className="individual-temp">{temperamentos}</p>:
                    <p className="individual-temp">No se definieron temperamentos para esta raza :(</p>}
                </div>
                <div className="card-peso">Peso</div>
               <div className="card-status">
                    <div className="status">
                        {peso.includes('-' || '–') ? <div className="value">{pesoMin} Kg</div>: 
                        <div className="value">{peso} Kg</div>  }
                        <div className="key">minimo</div>
                    </div>
                    <div className="status">
                        <img className="image-kg"src="https://cdn-icons-png.flaticon.com/512/847/847345.png"/>
                    </div>
                    <div className="status">
                        {peso.includes('-' || '–') ? <div className="value">{pesoMax} Kg</div>:
                        <div className="value">{peso} Kg</div>}
                        <div className="key">maximo</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
