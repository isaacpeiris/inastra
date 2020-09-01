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
    const mobileMenuItems = document.querySelectorAll('.mobile-nav a');

    // function to open the mobile nav bar
    function openMobileNav() {
        nav.classList.add('mobile-active');
        mobileMenuIcon.innerText = 'close';
    }

    // function to close the mobile nav bar
    function closeMobileNav() {
        nav.classList.remove('mobile-active');
        mobileMenuIcon.innerText = 'menu';
    }

    // on click of mobile nav button, if mobile nav is open then close it, otherwise open it
    mobileMenuBtn.addEventListener('click', function() {
        console.log('clicked')
        if (nav.classList.contains('mobile-active')) {
            console.log('close')
            closeMobileNav();
        } else {
            console.log('open')
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