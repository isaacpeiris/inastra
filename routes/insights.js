var express = require('express');
var router = express.Router();
const axios = require('axios').default;

//Add header to all axios requests
axios.defaults.headers.common['Content-type'] = 'application/json';

const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://www.inastra.co/api'

router.get('', async function(req, res, next) {
    const posts = await axios.get(apiUrl + '/insights');
    res.render('insights', {
        title: 'Insights',
        posts: posts.data
    });
});

router.get('/:id', async function(req, res, next) {
    const post = await axios.get(apiUrl + '/insights/' + req.params.id);
    res.render('insights-post', {
        title: post.data.title,
        post: post.data
    });
});

module.exports = router;