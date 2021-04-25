const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validation = require('../Utils/validation')

module.exports.post = async (req, res) => {
    const { username,email, password } = req.body;
    const { error } = validation.register(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const solt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, solt)
    const user = {
        username,
        password: newPassword,
        email,
        date: Date.now(),
        words: []
    }

    const newUser = new userModel(user)
    const saveUser = await newUser.save()
    console.log(saveUser)
    const token = await jwt.sign({ id: saveUser.id }, process.env.SECRET_KEY)
    res.header('Header-Token', token).send(token)
}

module.exports.getAll = async (req, res) => {
    const allUsers = await userModel.find({})
    res.send(allUsers)
}

module.exports.getOne = async(req,res)=>{
    const User = await userModel.findOne({id:req.params.id})
    if(!User) return res.status(404).send('Not Founded')
    res.send(User)
}


module.exports.deleteALL = async (req, res) => {
    const deletedUser = await userModel.deleteMany()
    console.log(deletedUser)
    res.send({ msg: "succes" })
}
module.exports.deleteOne = async (req, res) => {
    const deletedUser = await userModel.deleteOne({ id: req.params.id })
    console.log(deletedUser)
    res.end({ msg: "succes" })
}