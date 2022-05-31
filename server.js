// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.



const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const request = require("request");
const cheerio = require("cheerio");
const async = require("async");
var rp = require('request-promise');
const db = require('./db');
var cors = require("cors");
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async function(req, res) {
   // db.get('listSt').remove().write()
    let page = req.body.page
    var url = `https://123truyen.com/danh-sach/truyen-moi?page=${page}`;
        let listST = []
      await rp(url)
            .then(function (htmlString) {
                const $ = cheerio.load(htmlString);
                $('.list-new .row').each((i, el)=>{
                    const nm = $(el).find('a').attr('title')
                    const hf = $(el).find('a').attr('href')
                    const im = $(el).find('a img').attr('src')
                    listST.push({nm,hf,im})
                })
            })
            .catch(function (err) {
                console.log(err)
            });
        await res.json(listST)
});


app.get('/comicv', (req, next)=>{
    num_page = 50; 
    var concurrency = 30;
    async function getLinkOnPage(page, cb) {
        let listCp = [] 
       await rp(`https://123truyen.com/vo-dich-kiem-hon?page=${page}#list-chapter`)
            .then(function (htmlString) {
                const $ = cheerio.load(htmlString);
                $('.list-chapter li').each((i, el)=>{
                    const nm = $(el).find('a').attr('title')
                    const hf = $(el).find('a').attr('href')
                    const cp = $(el).find('a span').text()
                    listCp.push({nm,hf,cp})
                }) 
                console.log('done page ' + page);
            })
            .catch(function (err) {
                console.log(err)
            });
    } 

    let loopPage = async () => {
        for(let i = 1; i <= 50; i++ ){
            await getLinkOnPage(i)
    }

    }
   loopPage()
})


app.get('/chap', (req, next)=>{
    var url = 'https://123truyen.com/vo-dich-kiem-hon/chuong-1';
        rp(url)
            .then(function (htmlString) {
                const $ = cheerio.load(htmlString);
                const ab = $('.chapter-content').text()
                console.log(ab)
            })
            .catch(function (err) {
                console.log(err)
            });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
