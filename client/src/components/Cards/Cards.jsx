import React from 'react'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import './Cards.css'

function string(arr){
    let aa= arr.map(e => e.name).join(', ')
    return aa
}

export default function Cards({perros}) {
    return (perros.map(e => 
        <Link className="card-link" to={`/dogs/${e.id}`}>
            <Card 
                key={e.id}
                name={e.name}
                image={e.image}
                temperamentos={string(e.temperamentos)}
                peso={e.peso}
            />
        </Link>
    ))
}

