var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { response } = require('../../../app');

router.get('/', async function (req, res) {
    var url = new URL(`http://localhost:3000/api/country`);
    const response = await fetch(url.href);
    const result = await response.json();
    console.log(result)
    res.render('pages/countryUi/countryList', { result })

})

router.get('/addCountry/', function (req, res) {
    res.render('pages/countryUi/addCountry', { result: {} });
});

router.get('/edit/:sno/',async function (req,res){
    id = req.params.sno;
    var url = new URL('http://localhost:3000/api/country/'+id);
    const response = await fetch(url.href)
    const result = await response.json();
    res.render('pages/countryUi/addCountry',{result})

})

module.exports = router;