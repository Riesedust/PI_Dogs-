const {Dog, Temperamento} = require('../db')
const {Op} = require('sequelize')
const axios = require('axios')

function tempObj(str){
    let arrTemp= str.join().split(', ').map((e => e.trim()))
    let objTemp = arrTemp.map(e => {return {name: e}})
    return objTemp
}

async function getDogs(req, res, next){
    try {
        let dogsApi;
        let dogsDB;
        let allDogs
        const {name} = req.query
        if(!name || name==""){
            var response = (await axios.get('https://api.thedogapi.com/v1/breeds?apikey=c8ec4503-71b9-4334-a3cb-f1384f9a4017')).data 
            dogsApi = response.map(e =>{ 
                return{
                    id: e.id,
                    name: e.name,
                    image: e.image.url, 
                    peso: e.weight.metric,
                    temperamentos: tempObj([e.temperament])
                }
            })
            dogsDB = await Dog.findAll({include: {
                model: Temperamento,
                attributes: [ 'name' ],
                through: {
                    attributes: [],
                }
             },
                attributes: ['id', 'name', 'image', 'peso']    
            }) 

            allDogs = dogsDB.concat(dogsApi)
            res.send(allDogs) 
        }
        else{
            var response = (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data
            dogsApi = response.map(e =>{
                return {
                    id: e.id,
                    name: e.name,
                    peso: e.weight.metric,
                    temperamentos: tempObj([e.temperament]),
                }
            })

            dogsDB= await Dog.findAll({
                where: {
                    name:{
                        [Op.iLike]: `%${name}%`
                    }
                }
            }) 

            allDogs = dogsDB.concat(dogsApi)

            res.send(allDogs)
        }
    } catch (error) {
        next(error)
    }
}

async function getDogsById(req, res, next){
    try {
        const {id} = req.params
        let perro;
        if(isNaN(id)){
            perro = await Dog.findByPk(id,{include: {model: Temperamento, attributes: ['name'],through: {attributes: []}}})
            res.send([perro])
        }
        else{
            let response =(await axios.get("https://api.thedogapi.com/v1/breeds?apikey=c8ec4503-71b9-4334-a3cb-f1384f9a4017")).data
            let dato = response.filter(element => id == element.id)
            if(!dato.length){ return res.json([{error: 'No se encontró perro'}])}
            perro = dato.map(e =>{
                return{
                        id: e.id,
                        name: e.name,
                        image: e.image.url,
                        peso: e.weight.metric,
                        altura: e.height.metric,
                        vida: e.life_span,
                        temperamentos: tempObj([e.temperament]),
                    }
            })
            res.send(perro)
        }
    } catch (error) {
        next(error)
    }
}



module.exports= {
    getDogs,
    getDogsById
}