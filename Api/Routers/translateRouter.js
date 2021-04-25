const express = require('express')
const router = express.Router()
const translateController = require('../Controllers/translateController')


router.get('/:id', translateController)
 

module.exports = router;