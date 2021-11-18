document.addEventListener("DOMContentLoaded", function() {

    VanillaTilt.init(document.querySelector(".hero-text"), {
        max: 12,
        speed: 200,
        perspective: 1000,
        "full-page-listening": true
    });

    const contactForms = document.querySelectorAll('form.contact');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Don't submit form if inputs are invalid
            e.preventDefault();
            grecaptcha.ready(function() {
                grecaptcha.execute('6LeC7NAZAAAAABIsbKfVQqByaoasCNBnFHhissS1', { action: 'submit' }).then(function(token) {
                    let verifyReq = apiReq({
                        url: apiUrl + '/recaptcha-verify',
                        method: 'POST',
                        body: JSON.stringify({ token: token })
                    });

                    verifyReq.onload = function() {
                        let verifyRes = JSON.parse(verifyReq.responseText);
                        let valid;
                        let errorIndex;

                        let inputArray = form.querySelectorAll('.eos-input');
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

                            let leadInfo = formValues;
                            leadInfo.message = form.elements[4].value;
                            leadInfo.recaptcha = verifyRes;

                            let leadReq = apiReq({
                                url: apiUrl + '/contact-form',
                                method: 'POST',
                                body: JSON.stringify(leadInfo)
                            })

                            leadReq.onload = function() {
                                window.location.pathname = '/confirmed'
                            }
                        } else {
                            inputArray[errorIndex].querySelector('input').focus();
                        }
                    }
                });
            });
        });
    });
});