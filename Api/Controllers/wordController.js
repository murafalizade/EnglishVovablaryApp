const axios = require('axios')
const cheerio = require('cheerio')
const englishWords = []


module.exports = async (req,res) => {
        words = await axios.get(`https://www.rong-chang.com/wordlists/wordlist0${1}.htm`)
        if(words){
            let $ = cheerio.load(words.data);
            $("body > div > table > tbody > tr > td > font > p").each((index, element) => {
                let word = $(element).text();
                englishWords.push(word);
            });
        }
        else{
            res.send({msg:"Words can't find"})
        }

    res.status(200).send(englishWords)

}