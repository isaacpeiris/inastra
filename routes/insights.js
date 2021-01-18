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

function addData(posts) {
    posts.forEach(post => {
        post.id = post.guid.match(/(?<=p\/).*$/g)[0]
        post.author_id = post.author.toLowerCase().replace(/\s/g, '');
        post.date = post.pubDate.replace(/-/g, '/');
        let monthsArray = [
            { full: "January", abbr: "Jan", zeroNum: "01", num: "1" },
            { full: "February", abbr: "Feb", zeroNum: "02", num: "2" },
            { full: "March", abbr: "Mar", zeroNum: "03", num: "3" },
            { full: "April", abbr: "Apr", zeroNum: "04", num: "4" },
            { full: "May", abbr: "May", zeroNum: "05", num: "5" },
            { full: "June", abbr: "Jun", zeroNum: "06", num: "6" },
            { full: "July", abbr: "Jul", zeroNum: "07", num: "7" },
            { full: "August", abbr: "Aug", zeroNum: "08", num: "8" },
            { full: "September", abbr: "Sep", zeroNum: "09", num: "9" },
            { full: "October", abbr: "Oct", zeroNum: "10", num: "10" },
            { full: "November", abbr: "Nov", zeroNum: "11", num: "11" },
            { full: "December", abbr: "Dec", zeroNum: "12", num: "12" },
        ]
        let pubDate = new Date(post.pubDate);
        let dd = pubDate.getDate();
        let mm = monthsArray[pubDate.getMonth()].abbr;
        let yyyy = pubDate.getFullYear();
        if (dd < 10) { dd = '0' + dd };
        post.date = dd + ' ' + mm + ' ' + yyyy;
    });
}

module.exports = router;