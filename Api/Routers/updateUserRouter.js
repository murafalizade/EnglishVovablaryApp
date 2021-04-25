const express = require('express')
const router = express.Router()
const updateUserController = require('../Controllers/updateUserController')

router.put('/:id', updateUserController)

module.exports = router