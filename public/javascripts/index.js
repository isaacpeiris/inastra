document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    nav.classList.add('transparent');

    window.addEventListener('scroll', function() {
        if (this.scrollY > 100) {
            nav.classList.remove('transparent');
        } else {
            nav.classList.add('transparent');
        }
    })
})