document.addEventListener("DOMContentLoaded", function() {
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
});