document.addEventListener('DOMContentLoaded', function() {
    // still background if reduced motion
    const particleJsElement = document.querySelector('#particle-js');
    if (particleJsElement) {
        if (document.documentElement.classList.contains('reduced-motion')) {
            particlesJS.load('particle-js', window.location.origin + '/components/particles-js/particlesjs-config_reduced-motion.json');
        } else {
            particlesJS.load('particle-js', window.location.origin + '/components/particles-js/particlesjs-config.json');
        };
    }

    // Get contact information from local storage
    const contact = JSON.parse(window.localStorage.getItem('contact'));
});

apiUrl = window.location.protocol + '//' + window.location.host + '/api';

function apiReq(options) {
    let newReq = new XMLHttpRequest();
    newReq.open(options.method.toUpperCase(), options.url);
    newReq.setRequestHeader('Content-Type', 'application/json');
    if (options.body) {
        newReq.send(options.body);
    } else {
        newReq.send();
    }
    return newReq;
}