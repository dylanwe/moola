const rp = require('request-promise');
const $ = require('cheerio');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
require('dotenv').config()

// 📬 send email
// step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});

// step 2
let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Moola Deals',
    text: '',
    html: ''
}

// step 3
function sendMail() {
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs: ', err);
        } else {
            console.log('Email send');
        }
    })
}

// turn price into a float
function priceToFloat(productPrice) {
    productPrice = productPrice.replace(',', '.');
    return parseFloat(productPrice.replace(/[^0-9\.-]+/g,""));
}

// compare prices and respond accordingly
function priceCheck(retail, desiredPirce, productName, productLink) {
    if (retail <= desiredPirce) {
        // turn retail into euro
        retail = retail.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })
        mailOptions.text += `pick ${productName} up for ${retail}\n`;
        mailOptions.html += `<strong>${retail}</strong> for <a href="${productLink}">${productName}</a><br>`;
    } else {
        console.log('price is still to high');
    }
}

// fetch sheet api from enviorment and log info
function fetchLog() {
    // reset mail text
    mailOptions.text = '';
    mailOptions.html = '';
    let counter = 0;
    fetch(process.env.SHEET_API)
        .then(res => res.json())
        .then(json => {
            json['sheet1'].forEach(product => {
                // set link in url var
                let url = product['productLink'];
                rp(url)
                .then(function(html){
                    // log name
                    console.log(`\n${product['productName']}`);
                    // check if site link is from amazon
                    if (url.includes('www.amazon')) {
                        let price;
                        if ($('.offer-price', html).text() !== '') {
                            price = $('.offer-price', html).text();
                        } else {
                            price = $('#price_inside_buybox', html).text();
                        }
                        priceCheck(priceToFloat(price), product['desiredPrice'], product['productName'], url);
                    } else if (url.includes('www.bookdepository')) {
                        let price;
                        if ($('.sale-price', html).text() !== '') {
                            price = $('.sale-price', html).text();
                        }
                        priceCheck(priceToFloat(price), product['desiredPrice'], product['productName'], url);
                    } else {
                        console.log('site not supported');                    
                    }
                    // add a counter to send on the last processed item
                    counter++;
                    console.log(counter);
                    if (counter === json['sheet1'].length) {
                        sendMail()
                    }
                    console.log('------------');
                })
                .catch(function(err){
                    //handle error
                });
            });
        });
}
fetchLog()
// Execute fetchLog function every 24 hours
setInterval(fetchLog, 1000 * 60 * 60 * 24);