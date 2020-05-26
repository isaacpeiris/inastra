document.addEventListener('DOMContentLoaded', function() {
    // still background if reduced motion
    const hasReduceMotionOn = window.matchMedia('(prefers-reduced-motion)').matches;
    if (hasReduceMotionOn) {
        particlesJS.load('particle-js', './components/particles-js/particlesjs-config_reduced-motion.json');
        document.documentElement.classList.add('reduced-motion');
    } else {
        particlesJS.load('particle-js', './components/particles-js/particlesjs-config.json');
    };

    // Get contact information from local storage
    const contact = JSON.parse(window.localStorage.getItem('contact'));
})