const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validation = require('../Utils/validation')

module.exports = async (req, res) => {
    const { error } = validation.login(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const newUser = await userModel.findOne({ email:req.body.email})
    if (newUser !== null) {
        const match = bcrypt.compareSync(req.body.password, newUser.password)
        if(match){
            const token = await jwt.sign({ id: newUser.id }, process.env.SECRET_KEY)
            res.status(200).send(token)
        }
        else{
            res.status(404).send({msg:'Password is incorrect'});
        }
    }
    else {
        res.status(404).send({msg:'Username is incorrect'});
    }

}