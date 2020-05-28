/* ==== */
/* INIT */
/* ==== */
document.addEventListener("DOMContentLoaded", function() {
    /* Fade Elements */
    // Select all fade elements
    const fadeElements = document.querySelectorAll('.fade-in');
    // Run fade in function on page load
    fadeIn(fadeElements);
    // Run fade in function on scroll
    window.addEventListener("scroll", function() { fadeIn(fadeElements) });

    // FORMS
    const innerItems = document.querySelectorAll('form.inner-label .item-wrapper');
    innerItems.forEach(itemWrapper => {
        let inputType = itemWrapper.querySelector('.form-input').tagName.toLowerCase();
        itemWrapper.classList.add('type-' + inputType);

        itemWrapper.querySelector('.form-input').addEventListener('focus', function() {
            itemWrapper.classList.add('active')
        })
        itemWrapper.querySelector('.form-input').addEventListener('blur', function() {
            itemWrapper.classList.remove('active')
            if(this.value != "") {
                itemWrapper.classList.add('has-value')
            } else {
                itemWrapper.classList.remove('has-value')
            }
        })
    })
})

/* FUNCTIONS */
function fadeIn(fadeElements) {
    let windowHeight = window.innerHeight;
    let fadeInPoint = windowHeight * (1 - 0.12);
    fadeElements.forEach(function(i) {
        let objTop = i.getBoundingClientRect().top;
        if (objTop < fadeInPoint) {
            i.classList.add('visible')
        } else {
            i.classList.remove('visible')
        }
    })
};