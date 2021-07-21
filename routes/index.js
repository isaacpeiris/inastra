var express = require('express');
var router = express.Router();
const caseStudies = require('../content/case-studies.json');
const services = require('../content/services.json');

router.use(function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.hostname.match(/^www/)) {
        res.redirect('https://www.inastra.co' + req.path);
    }
    next();
})

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Transdisciplinary Innovation',
        caseStudy: caseStudies[0],
        services: services
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services' });
});

router.get('/confirmed', function(req, res, next) {
    res.render('confirmed', { title: 'Thank You' });
});

router.get('/legal/privacy-policy', function(req, res, next) {
    res.render('legal/privacy-policy', { title: 'Privacy Policy' });
});

router.get('/case-studies/:id', function(req, res, next) {
    const doc = caseStudies.find(obj => {
        return obj.id === req.params.id
    });
    if (doc) {
        res.render('case-studies', {
            title: doc.organisation.name,
            caseStudy: doc
        });
    } else {
        res.render('error', {
            title: '404 Not Found',
            error: {
                status: 404
            },
            message: "Not Found"
        });
    }
});

module.exports = router;