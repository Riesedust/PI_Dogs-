const { Router } = require('express');
const axios = require('axios')
const router = Router();
const {getDogs, addDog, getDogsById} = require('../controllers/dogController')


router.get("/", getDogs)
router.get("/:id", getDogsById)


module.exports = router;