const cheerio = require('cheerio');
const axios = require('axios');

const getHTML = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
};

class GetGitController {
    async getGit(req, res) {
        try {
            const {name, dayCount} = req.query;
            dayCount > 366 && res.send({message: "Only one year..!"})
            let userName = name;
            let days = dayCount;
            
            let points = 0;
            
            const selector = await getHTML(`https://github.com/users/${userName}/contributions`);
            for (let i = selector('rect').length - 1; i >= selector('rect').length - days; i--){
                selector('rect')[i].attribs['data-count'] ? points += Number(selector('rect')[i].attribs['data-level']) : days++;
            }
    
            return res.json({
                points: points
            })
    
        } catch (e) {
            console.log(e);
            res.send({message: "Server error"})
        }
    }
}

module.exports = new GetGitController()