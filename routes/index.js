var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Transdisciplinary Innovation' });
});

router.get('/confirmed', function(req, res, next) {
    res.render('confirmed', { title: 'Thank You' });
});

router.get('/legal/privacy-policy', function(req, res, next) {
    res.render('legal/privacy-policy', { title: 'Privacy Policy' });
});

router.get('/case-studies/ihg', function(req, res, next) {
    res.render('case-studies/ihg', { title: 'IHG' });
});

module.exports = router;