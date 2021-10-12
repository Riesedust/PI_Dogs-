const {Dog, Temperamento, Op} = require('../db')
const axios = require('axios')

function addDog (req, res, next){
    const {name, altura, peso, vida, temperamento} = req.body
    let perro = {
        name,
        altura,
        peso,
        vida,
    }
    Dog.create(perro)
    .then(perro => {
        perro.addTemperamento(temperamento)
        res.json({...perro, temperamento})
    })
    .catch(error =>{
        next(error)
    })
}

async function getDogs(req, res, next){
    try {
        const {name} = req.query
        if(!name || name==""){
            let dogsApi = axios.get('https://api.thedogapi.com/v1/breeds').data.results
        }
    } catch (error) {
        next(error)
    }
}









module.exports= {
    addDog,
    getDogs
}