import axios from 'axios'
import {GET_DOGS, RESET, SIGUIENTE_PAG, ANTERIOR_PAG, ALFABETICO, PESO, FILTRAR_TEMP, BUSCADOR, CREATE_DOG, FILTRAR_API} from "./types"

export function getDogs(){
    return (dispatch, getState) =>{
        axios.get("http://localhost:3001/dogs")
        .then((response)=> {
            dispatch({
            type: GET_DOGS,
            payload: response.data
        })})
        .catch((error) => {
            console.log(error)
        })
    }
}

export function createDog({name,image, pesomin, pesomax, alturamin, alturamax, vidamin, vidamax, temperamentos}){
    return (dispatch) => { 
        axios.post(`http://localhost:3001/add` ,{
            name,
            image,
            peso: pesomin + " - " + pesomax,
            altura: alturamin + " - " + alturamax,
            vida: vidamin + " - " + vidamax + " years",
            temperamentos,
        })
        .then(dispatch({
            type: CREATE_DOG
        }))
    }
}

export function siguientePag(){
    return{
        type: SIGUIENTE_PAG
    }
}

export function anteriorPag(){
    return{
        type: ANTERIOR_PAG
    }   
}

export function reset(){
    return{
        type: RESET
    }
}

export function ordenAl(data){
    return{
        type: ALFABETICO,
        payload: data
    }
}

export function ordenPeso(data){
    return{
        type: PESO,
        payload: data
    }
}

export function filtrarTemp(data){
    return{
        type: FILTRAR_TEMP,
        payload: data
    }
}

export function filtrarApi(data){
    return{
        type: FILTRAR_API,
        payload: data
    }
}

export function buscador(data){
    return{
        type: BUSCADOR,
        payload: data
    }
}



//----------------------------------------------------------------------
export function string(arr){
    let aa= arr.map(e => e.name).join(', ')
    return aa
}

export function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

export function separar(str){
    if(str.includes('–')){
        return str.split(' – ')
    }
    if(str.includes('-')){
        return str.split(' - ')
    }
    else return str
}
