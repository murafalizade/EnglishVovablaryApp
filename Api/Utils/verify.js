const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    const token = req.header('Header-Token')
    if(!token) return res.status(401).send('Access Denied')
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verify
        next()
    }
    catch(err){
        res.status(400).send('Invalid Token')
    }
}