const { Router } = require('express');
const router = Router();
const {getTemperamentos, newTemperamento} = require('../controllers/temperamentoController')


router.get("/", getTemperamentos)
router.post("/add", newTemperamento )

module.exports = router;