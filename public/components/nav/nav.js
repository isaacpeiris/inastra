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
    const mobileMenuBtn = document.querySelector('button#menu')
    const mobileMenuIcon = mobileMenuBtn.getElementsByClassName('material-icons')[0];
    const mobileMenuItems = document.querySelectorAll('.mobile-nav .nav-item');

    // function to open the mobile nav bar
    function openMobileNav() {
        mobileNav.classList.add('active');
        mobileMenuIcon.innerText = 'close';
        nav.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--c-secondary');
    }

    // function to close the mobile nav bar
    function closeMobileNav() {
        mobileNav.classList.remove('active');
        mobileMenuIcon.innerText = 'menu';
        nav.style.backgroundColor = 'transparent';
    }

    // on click of mobile nav button, if mobile nav is open then close it, otherwise open it
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    })

    // on click of mobile nav item, close the nav bar
    mobileMenuItems.forEach(e => {
        e.addEventListener('click', function() {
            closeMobileNav();
        })
    })
})