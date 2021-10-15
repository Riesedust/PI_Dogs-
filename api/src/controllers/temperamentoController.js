const {Dog, Temperamento} = require('../db')
const axios = require('axios');

var id = 1

async function preTemperamentos(){
    try {
        let temperamentos = (await axios.get("https://api.thedogapi.com/v1/breeds?apikey=c8ec4503-71b9-4334-a3cb-f1384f9a4017")).data
        temperamentos = temperamentos.map(e =>{
            Temperamento.create({
                id: id++,
                name: e.temperament
            })
        })
        return "Temperamentos cargados"
    } catch (error) {
        return "No se pudieron cargar correctamente"
    }
}


async function getTemperamentos(req, res, next){
    try{
        const temp = await Temperamento.findAll();
        var listTemp = await temp.map(t =>{
          return t.name
        });
        listTemp = listTemp.filter(e => e != null)
        listTemp = listTemp.map(e => e.split(", ")).flat()
        let resultado = listTemp.filter((item,index)=>{
            return listTemp.indexOf(item) === index;
          })
        return res.json(resultado.sort());
      }
      catch(e){
        next(e)
      }
}

module.exports = {
    preTemperamentos,
    getTemperamentos
}