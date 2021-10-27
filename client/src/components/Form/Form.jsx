import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { createDog } from '../../actions/actions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { capitalize } from '../../actions/actions'

function validate(input){
    const errors = {}
    if(!input.name && input.name === ""){
        errors.name = 'Falta el nombreeee'
    }
    if(input.name.length < 3){
        errors.name = 'El nombre debe tener al menos tres caracteres'
    }
    if((!input.pesomin && !input.pesomax) || (!input.pesomin && input.pesomax) || (input.pesomin && !input.pesomax)){
        errors.peso = "Falta determinar el peso"
    }
    if(input.pesomin > input.pesomax)
        errors.peso = "El peso minimo no puede ser mayor que el peso maximo"
    
    if((!input.alturamin && !input.alturamax) || (!input.alturamin && input.alturamax) || (input.alturamin && !input.alturamax)){
        errors.altura = "Falta determinar la altura"
    }
    if(input.alturamin > input.alturamax)
        errors.altura = "La altura minima no puede ser mayor que la altura maxima"
    
    if((!input.vidamin && !input.vidamax) || (!input.vidamin && input.vidamax) || (input.vidamin && !input.vidamax)){
        errors.vida = "Falta determinar la vida"
    }
    if(input.vidamin > input.vidamax)
        errors.vida = "La vida minima no puede ser mayor que la vida maxima"
    
    if(input.temperamentos.length === 0){
        errors.temperamentos = 'Agregar al menos un temperamento'
    }

    console.log(input)
    return errors
}

function Form() {
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [temp, setTemp] = useState([])
    const [nameTemp, setNameTemp] = useState([])
    const [form, setForm] = useState({
        name: "",
        alturamin: "",
        alturamax: "",
        pesomin: "",
        pesomax: "",
        vidamin: "",
        vidamax: "",
        image: "https://static8.depositphotos.com/1001336/852/i/600/depositphotos_8525222-stock-photo-labrador-silhouette.jpg",
        temperamentos: [],
    })

    useEffect(() =>{
        async function getTemps() {
            let e = (await axios.get('http://localhost:3001/temp')).data;
            setTemp(e);
        }
        getTemps();
    },[])


    

    function onSubmit(e){
        e.preventDefault()
        
        if(Object.keys(error).length > 0 || (form.name ==="" || form.alturamin ==="" || form.alturamax === "" || form.pesomin ==="" || form.pesomax ==="" || form.vidamin==="" || form.vidamax ==="" || form.temperamentos.length === 0)){
            alert('faltan cosas')
        } else{
        dispatch(createDog(form))
        setForm({
            name: "",
            altura: "",
            peso: "",
            vida: "",
            image: "",
            temperamentos: [], 
        })
        setNameTemp([])}
    }

    function handleChange(e){
        setForm((prevForm) => {
            const newForm = {...prevForm, [e.target.name]: e.target.value}
            setError(validate(newForm))
            return newForm
        })
    }

    function handleTemp(e){
        let index = e.target.selectedIndex;
        setNameTemp((names) => [...names, e.target.options[index].text]);
        if (e.target.value) {

            if (!form.temperamentos.includes(e.target.value)) {
                setForm((prevForm) => {
                    const newForm = {...prevForm, temperamentos: [...prevForm.temperamentos, e.target.value]}
                    setError(validate(newForm))
                    return newForm
                })
            }
        }
    }



    return (
        <form onSubmit={onSubmit}>
            <Link to='/dogs'>Volver</Link>
            <hr></hr>
            <label >Nombre  </label>
            <input value={capitalize(form.name)} onChange={handleChange} name="name" type="text"/>
            <p>{error.name}</p>
            <hr></hr>
            <label >Altura  </label>
            <input value={form.altura} onChange={handleChange} name="alturamin" type="number" min="1" max="100" placeholder='Altura minima' />
            <input value={form.altura} onChange={handleChange} name="alturamax" type="number" min="2" max="100" placeholder='Altura maxima'/>
            <p>{error.altura}</p>
            <hr></hr>
            <label >Peso  </label>
            <input value={form.peso} onChange={handleChange} name="pesomin" type="number"  min="1" max="100" placeholder='Peso minimo'/>
            <input value={form.peso} onChange={handleChange} name="pesomax" type="number"  min="2" max="100" placeholder='Peso maximo'/>
            <p>{error.peso}</p>
            <hr></hr>
            <label>Años de vida: entre </label>
            <input value={form.vida} onChange={handleChange} name="vidamin" type="number"  min="1" max="20" placeholder='Años minimos'/>
            <label> y </label>
            <input value={form.vida} onChange={handleChange} name="vidamax" type="number"  min="2" max="20" placeholder='Años maximos'/>
            <label> años</label>
            <p>{error.vida}</p>
            <hr></hr>
            <label> Temperamentos  </label>
            <select onChange={handleTemp} name="temperamentos" value={nameTemp} >
                        <option value=''>Select temperaments</option>
                        {
                            temp.map((t) => (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            ))
                        }
            </select> 
            <p>{error.temperamentos}</p>
           <div>
            <h3>Selected temperaments: </h3>
            <ul>
              {nameTemp?.map((elem) => (
                <div>
                  <label>{elem}</label>
                </div>
              ))}
            </ul>
          </div>
            <hr></hr>
            <input type="submit" value="Create dog"/>
        </form>
    )
}

export default Form
