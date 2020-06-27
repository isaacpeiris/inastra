document.addEventListener("DOMContentLoaded", function() {
    const contactForms = document.querySelectorAll('form.contact');
    contactForms.forEach(form => {
        form.addEventListener('submit', function() {
            console.log('submitted')
            const formValues = {
                fullName: form.elements[0].value,
                firstName: form.elements[0].value.split(' ')[0],
                email: form.elements[1].value,
                company: form.elements[2].value,
                phone: form.elements[3].value
            }
            localStorage.setItem('contact', JSON.stringify(formValues));
        });
    });

    // Focus on form when link is clicked
    document.querySelector('#hero-cta').addEventListener('click', function() {
        setTimeout(function() {
            document.querySelector('form#contact input#name').focus();
        }, 0)
    })
});