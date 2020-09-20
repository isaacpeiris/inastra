document.addEventListener("DOMContentLoaded", function() {
    const contactForms = document.querySelectorAll('form.contact');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Don't submit form if inputs are invalid
            e.preventDefault();
            let valid;
            let errorIndex;

            let inputArray = form.querySelectorAll('.item-wrapper');
            for (let i = 0; i < inputArray.length; i++) {
                let classList = inputArray[i].classList.toString();
                if (classList.match(/error/g)) {
                    valid = false;
                    errorIndex = i;
                    break;
                } else {
                    valid = true;
                }
            }

            if (valid) {
                const formValues = {
                    fullName: form.elements[0].value,
                    firstName: form.elements[0].value.split(' ')[0],
                    email: form.elements[1].value,
                    company: form.elements[2].value,
                    phone: formatMobileNumber(form.elements[3].value)
                }
                localStorage.setItem('contact', JSON.stringify(formValues));
                return true;
            } else {
                inputArray[errorIndex].querySelector('input').focus();
                return false;
            }
        });
    });

    // Focus on form when link is clicked
    document.querySelector('#hero-cta').addEventListener('click', function() {
        setTimeout(function() {
            document.querySelector('form#contact input#name').focus();
        }, 0)
    })
});