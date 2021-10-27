import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="fondo">
            <h1 className="title">dogs</h1>
            <Link to='/dogs'>
                <h1 className="home">Home</h1>
            </Link>
        </div>
    )
}

export default Home
