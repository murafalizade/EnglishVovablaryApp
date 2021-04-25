const userModel = require('../Models/userModel')

module.exports =async(req,res)=>{
    const user = await userModel.findOne({id:req.params.id});
    let words = user.words;
    words.push(req.body.word);
    user.words = words;
    user.date = Date.now();
    user.selectWord = user.selectWord+1;
    await user.save();
    res.status(200).send({msg:`${user.username}'s words were updated`});
}