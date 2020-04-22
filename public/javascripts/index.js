document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (this.scrollY > 100) {
            nav.classList.remove('transparent');
        } else {
            nav.classList.add('transparent');
        }
    });

    particlesJS.load('hero', 'components/particles-js/particlesjs-config.json');
})