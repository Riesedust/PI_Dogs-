import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { createDog } from '../../actions/actions'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { capitalize } from '../../actions/actions'
import './Form.css'

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
            let e = (await axios.get('/temp')).data;
            setTemp(e);
        }
        getTemps();
    },[])


    

    function onSubmit(e){
        e.preventDefault()
        
        if(Object.keys(error).length > 0 || (form.name ==="" || form.alturamin ==="" || form.alturamax === "" || form.pesomin ==="" || form.pesomax ==="" || form.vidamin==="" || form.vidamax ==="" || form.temperamentos.length === 0)){
            alert('Faltan datos')
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
        setNameTemp([])
        alert('Raza creada correctamente!')
        window.location.replace('dogs')
        }
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
        <form className="all-box" onSubmit={onSubmit}>
            <Link className="button-back-form" to='/dogs'>Volver</Link>
            <div className="form-box">
            <div className="boxs-form">
            <h3 className="title-input" >Nombre  </h3>
            <input value={capitalize(form.name)} onChange={handleChange} name="name" type="text"/>
            <p className= "error-msg">{error.name}</p>
            </div>
            <div className="boxs-form">
                <div className="inputs-box">
                    <h3 className="title-input" >Altura  </h3>
                    <input className="individual-inputs" value={form.altura} onChange={handleChange} name="alturamin" type="number" min="1" max="100" placeholder='Minimo' />
                    <p>  -  </p>
                    <input className="individual-inputs" value={form.altura} onChange={handleChange} name="alturamax" type="number" min="2" max="100" placeholder='Maximo'/>
                </div>
                <p className="error-msg">{error.altura}</p>
            </div>
            <div className="boxs-form">
                <div className="inputs-box">
                    <h3 className="title-input" >Peso  </h3>
                    <input className="individual-inputs" value={form.peso} onChange={handleChange} name="pesomin" type="number"  min="1" max="100" placeholder='Minimo'/>
                    <p className="separation">   -   </p>
                    <input className="individual-inputs" value={form.peso} onChange={handleChange} name="pesomax" type="number"  min="2" max="100" placeholder='Maximo'/>
                </div>
                <p className="error-msg" >{error.peso}</p>
            </div>
            <div className="boxs-form">
                <div className="inputs-box-vida">
                    <h3 className="title-input">Años de vida: </h3>
                    <p>Entre </p>
                    <input className="individual-inputs" value={form.vida} onChange={handleChange} name="vidamin" type="number"  min="1" max="20" placeholder='Minimo'/>
                    <label> y </label>
                    <input className="individual-inputs" value={form.vida} onChange={handleChange} name="vidamax" type="number"  min="2" max="20" placeholder='Maximo'/>
                    <label> años</label>
                </div>
                <p className="error-msg" >{error.vida}</p>
            </div>
            <div className="boxs-form">
            <h3 className="title-input"> Temperamentos  </h3>
            <select onChange={handleTemp} name="temperamentos" value={nameTemp} >
                        <option value=''>Select temperaments</option>
                        {
                            temp.map((t) => (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            ))
                        }
            </select> 
            <p className="error-msg">{error.temperamentos}</p>
           </div>
           <h3>Selected temperaments: </h3>
            <div className="selected-temp-box">
            <ul>
              {nameTemp?.map((elem) => (
                <div>
                  <p className="selected-temp">{elem}</p>
                </div>
              ))}
            </ul>
          </div>
            <input className="a-button" type="submit" value="Create dog"/>
            </div>
        </form>
    )
}

export default Form
