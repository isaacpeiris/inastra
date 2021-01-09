var express = require('express');
var router = express.Router();
const axios = require('axios').default;

//Add header to all axios requests
axios.defaults.headers.common['Content-type'] = 'application/json';

const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40isaacpeiris'

router.get('', async function(req, res, next) {
    const mediumBlog = await axios.get(feedUrl);
    addData(mediumBlog.data.items)
    res.render('blog', {
        title: 'Blog',
        posts: mediumBlog.data.items
    });
});

router.get('/p/:id', async function(req, res, next) {
    const mediumBlog = await axios.get(feedUrl);
    addData(mediumBlog.data.items)
    const post = mediumBlog.data.items.find(p => p.id === req.params.id);
    res.render('blog-post', {
        title: post.title,
        post: post
    });
});

function addData(posts) {
    posts.forEach(post => {
        post.id = post.guid.match(/(?<=p\/).*$/g)[0]
        post.author_id = post.author.toLowerCase().replace(/\s/g, '');
        post.date = new Date(post.pubDate.replace(/-/g, '/'));
    });
}

module.exports = router;