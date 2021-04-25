const mongoose = require('mongoose')
const shortid = require('shortid')

const Users = mongoose.model('vocablary-user', new mongoose.Schema({
    id: { type: String, default: shortid.generate() },
    username: { type: String, min: 3, max: 250, required: true },
    email: { type: String, min: 6, max: 250, required: true },
    password: { type: String, min: 6, max: 250, required: true },
    date: Date,
    wordChoose: { type: Number, default: 1 },
    words: []
}))


module.exports = Users