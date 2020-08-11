document.addEventListener('DOMContentLoaded', function() {
    // still background if reduced motion
    const particleJsElement = document.querySelector('#particle-js');
    if (particleJsElement) {
        if (document.documentElement.classList.contains('reduced-motion')) {
            particlesJS.load('particle-js', './components/particles-js/particlesjs-config_reduced-motion.json');
        } else {
            particlesJS.load('particle-js', './components/particles-js/particlesjs-config.json');
        };
    }

    // Get contact information from local storage
    const contact = JSON.parse(window.localStorage.getItem('contact'));
});