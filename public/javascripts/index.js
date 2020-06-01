document.addEventListener("DOMContentLoaded", function() {
    const waveElements = document.querySelectorAll('.wave path');
    waveElements.forEach(e => {
        let wave = wavify(e, {
            height: 72,
            bones: 3,
            amplitude: 36,
            color: 'rgba(255,255,255,1)',
            speed: .12
        });
    })
    const contactForm = document.querySelector('form#contact');
    contactForm.addEventListener('submit', function() {
        const formValues = {
            fullName: contactForm.elements[0].value,
            firstName: contactForm.elements[0].value.split(' ')[0],
            email: contactForm.elements[1].value,
            company: contactForm.elements[2].value,
            phone: contactForm.elements[3].value
        }
        localStorage.setItem('contact', JSON.stringify(formValues));
    });
    document.querySelector('#hero-cta').addEventListener('click', function() {
        setTimeout(function() {
            document.querySelector('form#contact input#name').focus();
        }, 0)
    })
});