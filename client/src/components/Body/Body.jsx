import React, {useEffect} from 'react'
import Cards from '../Cards/Cards'
import {connect} from 'react-redux'
import { getDogs, anteriorPag, siguientePag } from '../../actions/actions'
import './Body.css'

const Body = ({getDogs, anteriorPag, siguientePag, perros, pages}) =>{
    useEffect(() =>{
        getDogs()
    },[getDogs])


    function siguiente(){
        if(pages / 8 < perros.length / 8 - 1){
            siguientePag()
        } else return pages
    }

    return(
        perros?
        <div className="background">
            <div className="buttons-pagination-box">
                <button className="buttons-pagination" onClick={anteriorPag}>🡸 Anterior</button>
                <button className="buttons-pagination" onClick={siguiente}>Siguiente 🡺</button>
            </div>
            <div className='cards-container'>
                <Cards perros={perros.slice(pages, pages + 8)} />
            </div>
        </div>:

        <div>
            <h1>cargando</h1>
        </div>
    )
}

function mapStateToProps(state){
    return {
        perros: state.listDogs,
        pages: state.page,
        orden: state.orden
    }
}

export default connect(mapStateToProps,{getDogs, anteriorPag, siguientePag})(Body)
