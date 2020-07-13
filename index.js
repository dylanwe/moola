// checklist
// ❌ send email if price is low enough

const rp = require('request-promise');
const $ = require('cheerio');
const fetch = require('node-fetch');
require('dotenv').config()

// turn price into a float
function priceToFloat(productPrice) {
    productPrice = productPrice.replace(',', '.');
    return parseFloat(productPrice.replace(/[^0-9\.-]+/g,""));
}
// fetch sheet api from enviorment and log info
fetch(process.env.SHEET_API)
    .then(res => res.json())
    .then(json => {
        json['sheet1'].forEach(product => {
            // set link in url var
            let url = product['productLink'];
            rp(url)
            .then(function(html){
                console.log('');
                // log name
                console.log(product['productName']);
                // check if site link is from amazon
                if (url.includes('www.amazon')) {
                    let price;
                    if ($('.offer-price', html).text() !== '') {
                        price = $('.offer-price', html).text();
                    } else {
                        price = $('#price_inside_buybox', html).text();
                    }
                    console.log(priceToFloat(price));
                } else if (url.includes('www.bookdepository')) {
                    let price;
                    if ($('.sale-price', html).text() !== '') {
                        price = $('.sale-price', html).text();
                    }
                    console.log(priceToFloat(price));
                } else {
                    console.log('site not supported');                    
                }
                console.log('------------');
            })
            .catch(function(err){
                //handle error
            });
        });
    });

