var express = require('express');
var router = express.Router();
const axios = require('axios').default;

//Add header to all axios requests
axios.defaults.headers.common['Content-type'] = 'application/json';

// Receive post request from contact form
router.post('/contact-form', function(req, res, next) {
    // Post form content to #leads Slack channel
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
                block_id: "name",
                text:{
                    type:"mrkdwn",
                    text:"*Name:* " + req.body.name
                }
            },
            {
                type:"section",
                block_id: "company",
                text:{
                    type:"mrkdwn",
                    text:"*Company:* " + req.body.company
                }
            },
            {
                type:"section",
                block_id: "email",
                text:{
                    type:"mrkdwn",
                    text:"*Email:* " + req.body.email
                }
            },
            {
                type:"section",
                block_id: "phone",
                text:{
                    type:"mrkdwn",
                    text:"*Phone:* " + req.body.phone
                }
            },
            {
                type:"section",
                block_id: "message",
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

    // redirect to confirmation page
    res.redirect('/confirmed');
});

// Receive all payloads from Slack messages
router.post('/slack', async function(req, res, next) {
    // Convert payload from a string. Set above try, so it's accessible in catch
    const payload = JSON.parse(req.body.payload);
    // Slack message content
    const messageContent = payload.message.blocks;
    // Identifier of clicked button
    const buttonId = payload.actions[0].value;

    if (buttonId === 'url') {
        res.sendStatus(200);
    } else if (buttonId === 'qualifylead') {
        // To get around Slack 3 second rule send immediate confirmation once request is received
        axios.post(payload.response_url, { text: "Processing..." }).catch(function(error) { console.log(error.response) });
        try {

            // Regex to remove label from Slack message sections
            const messageLabel = /^.*\*\s/g

            // Create formInputs object with Slack message content
            const formInputs = {
                contactFullName: messageContent[1].text.text.replace(messageLabel,''),
                contactFirstName: messageContent[1].text.text.replace(messageLabel,'').split(' ')[0],
                contactLastName: messageContent[1].text.text.replace(messageLabel,'').split(' ')[1],
                contactCompany: messageContent[2].text.text.replace(messageLabel,''),
                contactCompanyDomain: messageContent[3].text.text.split('|')[1].split('>')[0].split('@')[1],
                contactEmail: messageContent[3].text.text.split('|')[1].split('>')[0],
                contactPhone: messageContent[4].text.text.replace(messageLabel,''),
                contactMessage: messageContent[5].text.text.replace(messageLabel,'')
            }

            // Calculate UTC timestamp at midnight of current day
            const d = new Date();
            const UTCMidnightTime = +d.setUTCHours(0,0,0,0);

            // Check if contact already exists
            let contactId = await getContactId(formInputs.contactEmail);

            // If contact doesn't exist, create them
            if (contactId === null) {
                const newContact = await createContact(formInputs);
                contactId = newContact.data.vid;
            }

            // Get the ID of the company after it has been auto created to allow the attachment of company to deal
            await timeout(300);
            const companyId = await getCompanyId(formInputs.contactCompanyDomain);

            // create deal and return dealId for adding note to deal
            const dealId = await createDeal(formInputs.contactCompany, companyId, contactId, UTCMidnightTime);

            // Add note to deal with message, associate with deal, contact and company
            await addNoteToDeal(dealId, contactId, companyId, formInputs);

            // Send confirmation back to slack
            axios.post(payload.response_url, {
                blocks: [
                    messageContent[0],
                    messageContent[1],
                    messageContent[2],
                    messageContent[3],
                    messageContent[4],
                    messageContent[5],
                    {
                        type: "context",
                        elements: [
                            {
                                type: "mrkdwn",
                                text: `Successfully qualified by <@${payload.user.id}>`
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
                                    text: "Email Contact",
                                    emoji: true
                                },
                                value: "url",
                                url: `mailto:${formInputs.contactEmail}?cc=marissa@inastra.co,isaac@inastra.co&bcc=7583679@bcc.hubspot.com`
                            }
                        ]
                    }
                ]
            }).catch(function(error) { console.log(error.response) });
        } catch (err) {
            console.log(err)
        }
    } else if (buttonId === 'disqualifylead') {
        // If lead was disqualified, return post to Slack
        axios.post(payload.response_url, {
            blocks: [
                messageContent[0],
                messageContent[1],
                messageContent[2],
                messageContent[3],
                messageContent[4],
                messageContent[5],
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
    } else if (buttonId === 'resetlead') {
        // Reset the lead message
        axios.post(payload.response_url, {
            blocks: [
                messageContent[0],
                messageContent[1],
                messageContent[2],
                messageContent[3],
                messageContent[4],
                messageContent[5],
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

/* ===================== */
/* HUBSPOT API FUNCTIONS */
/* ===================== */
// Get contact ID, return null if contact doesn't exist
async function getContactId(contactEmail) {
    let contactId;
    try {
        const contact = await axios({
            method: 'get',
            url: `https://api.hubapi.com/contacts/v1/contact/email/${contactEmail}/profile`,
            params: {
                hapikey: process.env.HUBSPOT_API_KEY
            }
        });
        contactId = contact.data.vid;
    } catch (err) {
        if (err.response.status === 404) {
            contactId = null;
        } else {
            console.log(err);
        }
    }
    return contactId;
};

// Create contact from form inputs
function createContact(formInputs) {
    return axios({
        method: 'post',
        url: 'https://api.hubapi.com/contacts/v1/contact',
        params: {
            hapikey: process.env.HUBSPOT_API_KEY
        },
        data: {
            "properties": [
                {
                    "property": "email",
                    "value": formInputs.contactEmail
                },
                {
                    "property": "firstname",
                    "value": formInputs.contactFirstName
                },
                {
                    "property": "lastname",
                    "value": formInputs.contactLastName
                },
                {
                    "property": "company",
                    "value": formInputs.contactCompany
                },
                {
                    "property": "phone",
                    "value": formInputs.contactPhone
                }
            ]
        }
    });
}

// Returns company ID for the domain
async function getCompanyId(companyDomain) {
    const company = await axios({
        method: 'post',
        url: `https://api.hubapi.com/companies/v2/domains/${companyDomain}/companies`,
        params: {
            hapikey: process.env.HUBSPOT_API_KEY
        },
        data: {
            "limit": 2,
            "requestOptions": {
                "properties": []
            }
        }
    });

    // If company exists, return ID. Otherwise, return null.
    return company.data.results[0] ? company.data.results[0].companyId : null;
}

// Create deal from created company, contact
async function createDeal(dealName, companyId, contactId, UTCMidnightTime) {
    const newDeal = await axios({
        method: 'post',
        url: 'https://api.hubapi.com/deals/v1/deal',
        params: {
            hapikey: process.env.HUBSPOT_API_KEY
        },
        data: {
            "associations": {
                "associatedCompanyIds": [companyId],
                "associatedVids": [contactId]
            },
            "properties": [
                {
                    "name": "dealname",
                    "value": dealName
                },
                {
                    "name": "dealstage",
                    "value": "2096391"
                },
                {
                    "name": "pipeline",
                    "value": "default"
                },
                {
                    "name": "createdate",
                    "value": UTCMidnightTime
                }
            ]
        }
    });

    return newDeal.data.dealId
}

// Add note to deal and associate with contact and company
function addNoteToDeal(dealId, contactId, companyId, formInputs) {
    return axios({
        method: 'post',
        url: 'https://api.hubapi.com/engagements/v1/engagements',
        params: {
            hapikey: process.env.HUBSPOT_API_KEY
        },
        data: {
            "engagement": {
                "active": true,
                "ownerId": 1,
                "type": "NOTE",
                "timestamp": new Date().getTime()
            },
            "associations": {
                "contactIds": [contactId],
                "companyIds": [companyId],
                "dealIds": [dealId],
                "ownerIds": [ ]
            },
            "metadata": {
                "body": `${formInputs.contactFullName} contacted through website: ${formInputs.contactMessage}`
            }
        }
    });
}

// setTimeout represented as a promise
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router;