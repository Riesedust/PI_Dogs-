import { GET_DOGS, RESET, ANTERIOR_PAG, SIGUIENTE_PAG, ALFABETICO, PESO, FILTRAR_TEMP, BUSCADOR, CREATE_DOG, FILTRAR_API } from "../actions/types";
import { string } from "../actions/actions";

const initialState ={
    text: '',
    filteredDogs: [],
    listDogs: [],
    backupDogs: [],
    page: 0,
    orden: ''
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {...state, listDogs: action.payload, backupDogs: action.payload}
        case CREATE_DOG:
            return{...state}
        case RESET:
            return {...state, page: 0}
        case SIGUIENTE_PAG:
            return {...state, page: state.page + 8}
        case ANTERIOR_PAG:
            if(state.page === 0) return state;
            else return {...state, page: state.page - 8}
        case ALFABETICO:
            if(action.payload === 'az'){
                state.listDogs.sort((a, b) =>{
                    if(a.name < b.name){return -1}
                    if(a.name > b.name){return 1}
                    return 0;
                })
            }
            if(action.payload === 'za'){
                state.listDogs.sort((a, b) =>{
                    if(b.name < a.name){return -1}
                    if(b.name > a.name){return 1}
                    return 0;
                })
            }
            return {...state, orden: action.payload}
        case PESO:
            if(action.payload === 'default'){
                return {...state}
            }
            if(action.payload === 'menor'){
                state.listDogs= state.backupDogs
                state.listDogs.sort((a, b) =>{
                    if (parseInt(a.peso.split(" - ")[0]) > parseInt(b.peso.split(" - ")[0])) {return 1}
                    if (parseInt(b.peso.split(" - ")[0]) > parseInt(a.peso.split(" - ")[0])) {return -1}
                    return 0;
                })
            }
            if(action.payload === 'mayor'){
                state.listDogs= state.backupDogs
                state.listDogs.sort((a, b) =>{
                    if (parseInt(a.peso.split(" - ")[1]) > parseInt(b.peso.split(" - ")[1])) {return -1}
                    if (parseInt(b.peso.split(" - ")[1]) > parseInt(a.peso.split(" - ")[1])) {return 1}
                    return 0;
                })
            }
            return{...state, orden: action.payload}
        case FILTRAR_TEMP:
            if(action.payload !== 'all'){
                state.listDogs= state.backupDogs
                state.listDogs = state.listDogs.filter(e => string(e.temperamentos) != null)
                state.filteredDogs = state.listDogs.filter(e => string(e.temperamentos).includes(action.payload))
                return {...state, listDogs: state.filteredDogs};
            } else return {...state, listDogs: state.backupDogs}
        case FILTRAR_API:
            if(action.payload !== 'all'){
                state.listDogs= state.backupDogs
                if(action.payload === 'db'){
                    state.filteredDogs= state.listDogs.filter(e => isNaN(e.id))
                    return {...state, listDogs: state.filteredDogs}
                } 
                if(action.payload === 'api'){
                    state.filteredDogs= state.listDogs.filter(e => Number(e.id))
                    return {...state, listDogs: state.filteredDogs}
                } 
            } else return {...state, listDogs: state.backupDogs}
        case BUSCADOR:
            state.listDogs= state.backupDogs
            state.filteredDogs= state.listDogs.filter(e => e.name.includes(action.payload))
            return {...state, listDogs: state.filteredDogs}
        
        default:
            return state;
    }
}