document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector("nav");
    const navToggle = document.querySelector("button#mobile-menu");
    const activeClass = "mobile-nav__visible";

    navToggle.addEventListener("click", function() {
        if (nav.classList.contains(activeClass)) {
            nav.classList.remove(activeClass);
            navToggle.innerText = "menu";
            navToggle.setAttribute('aria-expanded', false);
        } else {
            nav.classList.add(activeClass);
            navToggle.innerText = "clear";
            navToggle.setAttribute('aria-expanded', true);
        }
    });

    window.addEventListener('scroll', function() {
        if (this.scrollY > 24) {
            document.querySelector('header').classList.add("header-background");
        } else {
            document.querySelector('header').classList.remove("header-background");
        }
    })
})