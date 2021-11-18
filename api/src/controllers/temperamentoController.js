const {Dog, Temperamento} = require('../db')
const axios = require('axios');


async function preTemperamentos(){
    try {
        const temperamentos = (await axios.get("https://api.thedogapi.com/v1/breeds?apikey=c8ec4503-71b9-4334-a3cb-f1384f9a4017")).data
        const temperamentosDb = temperamentos.map( el => el.temperament ).join().split(',')
        const temperamentosTrim = temperamentosDb.map( el => el.trim())
        let resultado = temperamentosTrim.filter((item,index)=>{
            return temperamentosTrim.indexOf(item) === index;
          })
        resultado.forEach(e => {
            if(e !== ''){
                Temperamento.findOrCreate({where: { name: e}})
            }
        })
        return "Temperamentos cargados"
    } catch (error) {
        return "No se pudieron cargar correctamente"
    }
}


async function getTemperamentos(req, res, next){
    try{
        const temp = await Temperamento.findAll();
        return res.json(temp);
      }
      catch(e){
        next(e)
      }
}

async function newTemperamento(req, res, next){
    const {name} = req.body
    let temp={
        name
    }
    let newTemp= await Temperamento.create(temp)
    res.send(newTemp)
}

module.exports = {
    preTemperamentos,
    getTemperamentos,
    newTemperamento
}