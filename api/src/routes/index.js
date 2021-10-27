const { Router } = require('express');
const axios = require('axios')
const router = Router();
const dogs = require('./dog')
const temperamento = require('./temperamento')
const {addDog} = require("../controllers/addController")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


router.post("/add", addDog)
router.use("/dogs", dogs)
router.use("/temp", temperamento)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
