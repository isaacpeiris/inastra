document.addEventListener("DOMContentLoaded", function() {
    // C19
    // let params = getParams();
    // if (params) {
    //     if (params.utm_campaign == 'c19') {
    //         setTimeout(function() {
    //             openModal('linkedin-contact')
    //         }, 6000)
    //     }
    // }
});

function getParams() {
    // Get params from current url
    const paramString = window.location.search.replace('?', '')
    if (paramString != '') {
        let paramObj = {};
        paramString.split('&').forEach(param => {
            let split = param.split('=');
            paramObj[split[0]] = split[1];
        });
        return paramObj;
    } else {
        return null;
    }
}