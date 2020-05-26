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