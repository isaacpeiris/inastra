document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    nav.classList.add('transparent');

    const navBtns = document.querySelectorAll('.nav-right .eos-btn:not(.eos-btn--filled)');
    console.log(navBtns)

    window.addEventListener('scroll', function() {
        if (this.scrollY > 100) {
            nav.classList.remove('transparent');
            navBtns.forEach(b => { b.classList.remove('eos-btn--white') });
        } else {
            nav.classList.add('transparent');
            navBtns.forEach(b => { b.classList.add('eos-btn--white') });
        }
    })

    document.querySelector('.menu-icon button').addEventListener('click', function() {
        this.blur();
    })
})