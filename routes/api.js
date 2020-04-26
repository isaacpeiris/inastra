var express = require('express');
var router = express.Router();
const axios = require('axios').default;

//Add header to all axios requests
axios.defaults.headers.common['Content-type'] = 'application/json';

router.post('/contact-form', function(req, res, next) {
    axios.post('https://hooks.slack.com/services/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', {
        text: "New inbound lead 🔥",
        blocks: [
            {
                type:"section",
                text:{
                    type:"plain_text",
                    text:"New inbound lead 🔥"
                }
            },
            {
                type:"section",
                text:{
                    type:"mrkdwn",
                    text:"*Name:* " + req.body.name
                }
            },
            {
                type:"section",
                text:{
                    type:"mrkdwn",
                    text:"*Email:* " + req.body.email
                }
            },
            {
                type:"section",
                text:{
                    type:"mrkdwn",
                    text:"*Phone:* " + req.body.phone
                }
            },
            {
                type:"section",
                text:{
                    type:"mrkdwn",
                    text:"*Message:* " + req.body.message
                }
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Qualify Lead",
                            emoji: true
                        },
                        style: "primary",
                        value: "qualifylead"
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Disqualify Lead",
                            emoji: true
                        },
                        value: "disqualifylead"
                    }
                ]
            }
        ]
    }).catch(function(error) { console.log(error.response) });

    res.redirect('/confirmed');
});

router.post('/slack', function(req, res) {
    const payload = JSON.parse(req.body.payload);
    const information = payload.message.blocks;
    const action = payload.actions[0].value;
    axios.post(payload.response_url, {
        text: "Processing..."
    }).catch(function(error) { console.log(error.response) });

    if (action === 'qualifylead') {
        // POST TO HUBSPOT HERE
        axios.post(payload.response_url, {
            blocks: [
                information[0],
                information[1],
                information[2],
                information[3],
                information[4],
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `Successfully qualified by <@${payload.user.id}>`
                        }
                    ]
                }
            ]
        }).catch(function(error) { console.log(error.response) });
    } else if (action === 'disqualifylead') {
        axios.post(payload.response_url, {
            blocks: [
                information[0],
                information[1],
                information[2],
                information[3],
                information[4],
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `Lead disqualified by <@${payload.user.id}>`
                        }
                    ]
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Reset Lead",
                                emoji: true
                            },
                            value: "resetlead"
                        }
                    ]
                }
            ]
        }).catch(function(error) { console.log(error.response) });
    } else if (action === 'resetlead') {
        axios.post(payload.response_url, {
            blocks: [
                information[0],
                information[1],
                information[2],
                information[3],
                information[4],
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Qualify Lead",
                                emoji: true
                            },
                            style: "primary",
                            value: "qualifylead"
                        },
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Disqualify Lead",
                                emoji: true
                            },
                            value: "disqualifylead"
                        }
                    ]
                }
            ]
        }).catch(function(error) { console.log(error.response) });
    }
});

module.exports = router;