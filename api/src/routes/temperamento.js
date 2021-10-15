const { Router } = require('express');
const axios = require('axios')
const router = Router();
const {getTemperamentos} = require('../controllers/temperamentoController')


router.get("/", getTemperamentos)

module.exports = router;