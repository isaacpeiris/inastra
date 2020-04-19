var express = require('express');
var router = express.Router();
const axios = require('axios').default;

router.get('/contact', function(req, res, next) {
    console.log(req.query);
    axios({
        method: 'POST',
        url: 'https://hooks.slack.com/services/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',
        data: {
            "text": "New inbound lead 🔥",
            "blocks":[
                {
                    "type":"section",
                    "text":{
                        "type":"plain_text",
                        "text":"New inbound lead 🔥"
                    }
                },
                {
                    "type":"section",
                    "text":{
                        "type":"mrkdwn",
                        "text":"*Name*: " + req.query.name
                    }
                },
                {
                    "type":"section",
                    "text":{
                        "type":"mrkdwn",
                        "text":"*Email*: " + req.query.email
                    }
                },
                {
                    "type":"section",
                    "text":{
                        "type":"mrkdwn",
                        "text":"*Phone*: " + req.query.phone
                    }
                },
                {
                    "type":"section",
                    "text":{
                        "type":"mrkdwn",
                        "text":"*Message*: " + req.query.message
                    }
                }
            ]
        }
    }).then(function() {
        res.redirect('/confirmed');
    });
});

module.exports = router;