const express = require('express')
const router = express.Router()
const wordController = require('../Controllers/wordController')


router.get('/all',wordController)


module.exports = router;