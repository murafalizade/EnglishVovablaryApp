const express = require('express') 
const app = express() 
const bodyParser = require('body-parser')
const cors = require('cors')
const translateRouter = require('./Routers/translateRouter')
const wordRouter = require('./Routers/wordRouter')
const registerRouter = require('./Routers/register&login')
const updateUserRouter = require('./Routers/updateUserRouter')
const db = require('./Database/db.config')
require('dotenv').config()
const PORT = process.env.PORT

//database
db();


//middlewares 
app.use(cors())
app.use(bodyParser.json())

//routers
app.use('/api/v1/words', wordRouter)
app.use('/api/v1', translateRouter)
app.use('/api/v1/users', registerRouter)
app.use('/api/v1/users', updateUserRouter)


app.listen(PORT,()=>console.log('server was listining in http://localhost:8080')) 
