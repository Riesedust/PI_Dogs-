import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="fondo">
            <div className="title">
                <h1 >dogs app</h1>
            </div>
            <Link to='/dogs'>
                <h1 className="home">Home</h1>
            </Link>
        </div>
    )
}

export default Home
