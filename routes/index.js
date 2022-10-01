var express = require('express');
var router = express.Router();
const caseStudies = require('../content/case-studies.json');

router.use(function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.hostname.match(/^www/)) {
        res.redirect('https://www.inastra.co' + req.path);
    }
    next();
})

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Inastra | Transdisciplinary Innovation',
        caseStudy: caseStudies[0]
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Inastra | About' });
});

router.get('/services/change-management', function(req, res, next) {
    res.render('services/change-management', { title: 'Change Management | Inastra' });
});

router.get('/services/creative-capabilities', function(req, res, next) {
    res.render('services/creative-capabilities', { title: 'Creative Capabilites | Inastra' });
});

router.get('/services/solution-design', function(req, res, next) {
    res.render('services/solution-design', { title: 'Solution Design | Inastra' });
});

router.get('/confirmed', function(req, res, next) {
    res.render('confirmed', { title: 'Thank You' });
});

router.get('/legal/privacy-policy', function(req, res, next) {
    res.render('legal/privacy-policy', { title: 'Inastra | Privacy Policy' });
});

router.get('/case-studies/:id', function(req, res, next) {
    const doc = caseStudies.find(obj => {
        return obj.id === req.params.id
    });
    if (doc) {
        res.render('case-studies', {
            title: doc.organisation.name + " | Inastra",
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