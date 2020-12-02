// function to open the mobile nav bar
function openMobileNav(nav, mobileMenuIcon) {
    nav.classList.add('mobile-active', 'transparent');
    mobileMenuIcon.innerText = 'close';
}

// function to close the mobile nav bar
function closeMobileNav(nav, mobileMenuIcon) {
    nav.classList.remove('mobile-active', 'transparent');
    mobileMenuIcon.innerText = 'menu';
}

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

    // Mobile navigation variables
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuBtn = document.querySelector('button#mobile-menu')
    const mobileMenuIcon = mobileMenuBtn.getElementsByClassName('material-icons')[0];
    const mobileMenuItems = document.querySelectorAll('.mobile-nav a');

    // on click of mobile nav button, if mobile nav is open then close it, otherwise open it
    mobileMenuBtn.addEventListener('click', function() {
        if (nav.classList.contains('mobile-active')) {
            closeMobileNav(nav, mobileMenuIcon);
        } else {
            openMobileNav(nav, mobileMenuIcon);
        }
    })

    // on click of mobile nav item, close the nav bar
    mobileMenuItems.forEach(e => {
        e.addEventListener('click', function() {
            closeMobileNav(nav, mobileMenuIcon);
        })
    })
})