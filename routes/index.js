var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/confirmed', function(req, res, next) {
  res.render('confirmed', { title: 'Thank You' });
});

module.exports = router;
