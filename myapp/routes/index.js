var express = require('express');
var router = express.Router();
const yelp = require('yelp-fusion');


// Obtain Yelp Fusion's OAuth 2.0 credentials
const clientId = 'LIl4RF7ksoI6I1Zw-vq8Aw';
const clientSecret = 'lu6J0xRME1GfROg0GK7SDOcIzqvvKqrzLGFQjqLKROyQ3wJrVmVCUvCEA1EWnpdK';

var searchRequest = {
    term: 'Four Barrel Coffee',
    location: 'san francisco, ca'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    // points to index.ejs (render index.ejs)
    res.render('index', {
        error: ""
    });
});

router.post('/search', function (req, res) {
    var result;
    if (!req.body.latitude || !req.body.longitude || !parseInt(req.body.latitude, 10) || !parseInt(req.body.longitude == null, 10)) {
        res.render('index', {
            error: "Please insert a valid longitude latitude pair."
      });
    } else {
        var search = {
            term: req.body.restSearchInput,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };


        yelp.accessToken(clientId, clientSecret).then(response => {
            const client = yelp.client(response.jsonBody.access_token);
            client.search(search).then(response => {
                const firstResult = response.jsonBody.businesses;
                res.render('search', {
                    result: firstResult,
                });
            });
        }).catch(e => {
            console.log(e);
        });
    }
});

module.exports = router;
