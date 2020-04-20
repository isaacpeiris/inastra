document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (this.scrollY > 100) {
            nav.classList.remove('transparent');
        } else {
            nav.classList.add('transparent');
        }
    });

    const heroSection = document.querySelector('section#hero');
    heroSection.addEventListener('mousemove', function(event) {
        let mouseXpercentage = Math.round(event.pageX / heroSection.offsetWidth * 100);
        let mouseYpercentage = Math.round(event.pageY / heroSection.offsetHeight * 100);
        heroSection.style.cssText = `background: radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, var(--c-secondary), var(--c-background));`
    })
})