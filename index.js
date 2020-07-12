const rp = require('request-promise');
const $ = require('cheerio');
const urls = [
    'https://www.amazon.nl/Izuki-Midoriya-origin-Kohei-Horikoshi/dp/1421582694/ref=pd_sbs_14_1/258-4964107-4661916?_encoding=UTF8&pd_rd_i=1421582694&pd_rd_r=ac84c2ee-5415-4994-a4e4-078ee6e5c0da&pd_rd_w=I48ee&pd_rd_wg=wBsvE&pf_rd_p=e57a6105-795e-47cc-83cd-88b65cf564d5&pf_rd_r=HQQ4BPR85AQ92A6JH9WX&psc=1&refRID=HQQ4BPR85AQ92A6JH9WX',
    'https://www.amazon.nl/DEMON-SLAYER-KIMETSU-NO-YAIBA/dp/1974700526/ref=rtpb_2/258-4964107-4661916?_encoding=UTF8&pd_rd_i=1974700526&pd_rd_r=ac84c2ee-5415-4994-a4e4-078ee6e5c0da&pd_rd_w=5Fw52&pd_rd_wg=wBsvE&pf_rd_p=639a3019-d84d-40c7-9577-b29557cc6acd&pf_rd_r=HQQ4BPR85AQ92A6JH9WX&psc=1&refRID=HQQ4BPR85AQ92A6JH9WX',
];

urls.forEach(url => {
    rp(url)
        .then(function(html){
            //success!
            console.log('');
            console.log($('#productTitle', html).text());
            console.log($('.offer-price', html).text());
            console.log('------------');
        })
        .catch(function(err){
            //handle error
        });
});