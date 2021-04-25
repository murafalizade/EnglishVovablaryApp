const mongoose = require('mongoose')
require('dotenv').config()

module.exports = () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("Connect is succesfull")
    }
    catch {
        console.log("Connect is failed");
    }
}
