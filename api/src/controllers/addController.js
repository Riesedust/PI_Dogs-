const {Dog} =require('../db')

async function addDog (req, res, next){
    const {name, image, altura, peso, vida, temperamentos} = req.body
    let perro = {
        image: image,
        name,
        altura,
        peso,
        vida,
        temperamentos
    }
    await Dog.create(perro)
    .then(perro => {
        perro.addTemperamento(temperamentos) 
        res.json(perro)
    })
    .catch(error =>{
        next(error)
    })
}

module.exports={ addDog}