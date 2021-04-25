const axios = require('axios')
const clientId = "FREE_TRIAL_ACCOUNT";
const clientSecret = "PUBLIC_SECRET";

module.exports = async (req, res) => {
    var fromLang = "en";
    var toLang = "az";
    var jsonPayload = JSON.stringify({
        fromLang: fromLang,
        toLang: toLang,
        text: req.params.id,
    });
    const headers = {
        headers: {
            "Content-Type": "application/json",
            "X-WM-CLIENT-ID": clientId,
            "X-WM-CLIENT-SECRET": clientSecret,
            "Content-Length": Buffer.byteLength(jsonPayload)
        }
    }
    const chunk = await axios.post('http://api.whatsmate.net:80/v1/translation/translate', jsonPayload, headers)
    if(chunk){
        res.status(200).send(chunk.data)
    }
    else{
        res.status(408).send({msg:'Something went wrong ... Please try again'})
    }
}