const express = require('express')
const router = express.Router()
const registerController = require('../Controllers/registerController')
const loginController = require('../Controllers/loginController')
const verify = require('../Utils/verify')

router.post('/register-user', registerController.post)
router.post('/login-user',loginController)
router.get('/all',registerController.getAll)
router.get('/:id', verify, registerController.getOne)
router.delete('/all',registerController.deleteALL)
router.delete('/:id', registerController.deleteOne)


module.exports = router