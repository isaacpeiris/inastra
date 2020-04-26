document.addEventListener('DOMContentLoaded', function() {
    // fade in
    const fadeElement = document.querySelectorAll('.fade-in');
    function fadeIn() {
        let windowHeight = window.innerHeight;
        let fadeInPoint = windowHeight * (1 - 0.12);
        fadeElement.forEach(function(i) {
            let objTop = i.getBoundingClientRect().top;
            if (objTop < fadeInPoint) {
                i.classList.add('visible')
            } else {
                i.classList.remove('visible')
            }
        })
    };
    fadeIn()
    window.addEventListener("scroll", function() {
        fadeIn()
    });

    // still background if reduced motion
    const hasReduceMotionOn = window.matchMedia('(prefers-reduced-motion)').matches;
    if (hasReduceMotionOn) {
        particlesJS.load('particle-js', './components/particles-js/particlesjs-config_reduced-motion.json');
        document.documentElement.classList.add('reduced-motion');
    } else {
        particlesJS.load('particle-js', './components/particles-js/particlesjs-config.json');
    }
})