const express = require('express')
const app = express()
const port = 3000
const request = require("request");
const cheerio = require("cheerio");
const async = require("async");
var rp = require('request-promise');

app.get('/', (req, next)=>{
    num_page = 50;
    var concurrency = 30;
    var url = 'https://123truyen.com/danh-sach/truyen-moi?page=';
  function getLinkOnPage(page, cb) {
    	let listST = []
        // không dùng request dc k ? dùng axios?c lieen quan j axio ddaau ủa
        // thằng này m truytruurl vào rõ ràng đang call api mà
        rp(url + page)
            .then(function (htmlString) {

                 const $ = cheerio.load(htmlString);

                $('.list-new .row').each((i, el)=>{
                    const nm = $(el).find('a').attr('title')
                    const hf = $(el).find('a').attr('href')
                    const im = $(el).find('a img').attr('src')
                    listST.push({nm,hf,im})
                })
                console.log('done page ' + page);
            })
            .catch(function (err) {
                // Crawling failed...
            });
            // ddungs k ta
            //chay thu birt

            // run thu di
    //    request(url + page, function(err, res, body) { 
    //         if (!err && res.statusCode == 200) {
    //             const $ = cheerio.load(body);

    //             $('.list-new .row').each((i, el)=>{
				// 	const nm = $(el).find('a').attr('title')
				// 	const hf = $(el).find('a').attr('href')
				// 	const im = $(el).find('a img').attr('src')
				// 	listST.push({nm,hf,im})
				// })
    //         }
    //         // console.log(listST)
    //         console.log('done page ' + page);
    //         cb();
    //     })
       // dm de t

        //t co thu sai npm async nhug van run đi
    } // cục này làm gì
    //chạy cái getLinkOnPage tu 1-50
    //kiểu t mún nó chạy 1-2-3-4
    //chứ k fai 1-3-40-2
    //ki
   //getLinkOnPage nay t bo vong lap, má t vẫn chưa hiểu luông chạy :v
   // thấy dòng số log k
   // đãng lẽ chạy từ 1 đến 50

     function worker(page, cb) { getLinkOnPage(page, cb)}


    // var queue = async.queue(worker, concurrency);

    // queue.drain = function() {console.log('Done All !')};

    for (let i = 1; i <= num_page; i++){
        worker(i)
    };
        // thang nay chay cai j z
    //chay tu page 1 - page 50
    //hk thi xoa no lam cai moi xem
    // cc j z ta :))
    //haha

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












//one note

// app.get('/', (req, res) => {
// 	let listST = []
//   request('https://123truyen.com/danh-sach/truyen-moi?page=2', (err,
// 		res, html) =>{
// 		if(!err && res.statusCode == 200){
// 			const $ = cheerio.load(html)
// 			$('.list-new .row').each((i, el)=>{
// 				const nm = $(el).find('a').attr('title')
// 				const hf = $(el).find('a').attr('href')
// 				const im = $(el).find('a img').attr('src')
// 				const ar =  {nm,hf,im}
// 				listST.push(ar)

// 			})

// 		}
// 		console.log(listST)
// 	})
// })