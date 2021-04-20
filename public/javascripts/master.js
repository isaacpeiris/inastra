document.addEventListener('DOMContentLoaded', function() {
    // still background if reduced motion
    const particleJsElement = document.querySelector('#particle-js');
    if (particleJsElement) {
        if (document.documentElement.classList.contains('reduced-motion')) {
            particlesJS.load('particle-js', window.location.origin + '/components/particles-js/particlesjs-config_reduced-motion.json');
        } else {
            particlesJS.load('particle-js', window.location.origin + '/components/particles-js/particlesjs-config.json');
        };
    }

    // Get contact information from local storage
    const contact = JSON.parse(window.localStorage.getItem('contact'));

    const buttons = document.querySelectorAll('.btn.waves-effect');
    buttons.forEach(btn => {
        btn.addEventListener('click', createRipple)
    });

    // Reduced motion
    const hasReduceMotionOn = window.matchMedia('(prefers-reduced-motion)').matches;
    if (hasReduceMotionOn) {
        document.documentElement.classList.add('reduced-motion');
    };

    /* FADE EFFECT */
    // Select all fade elements
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements) {
        // Run fade in function on page load
        fadeIn(fadeElements);
        // Run fade in function on scroll
        window.addEventListener("scroll", function() { fadeIn(fadeElements) });
    }

    /* FORMS */
    const formItems = document.querySelectorAll('.input-wrapper');
    if (formItems.length > 0) {
        formItems.forEach(inputWrapper => {

            checkValue(inputWrapper)

            inputWrapper.querySelectorAll('input, textarea, select').forEach(inp => {
                inp.addEventListener('focus', function() {
                    inputWrapper.classList.add('active')
                });
                inp.addEventListener('blur', function() {
                    inputWrapper.classList.remove('active')
                    checkValue(inputWrapper)
                });
            })

            if (inputWrapper.classList.contains('compact')) {
                inputWrapper.querySelectorAll('.btn').forEach(btn => {
                    btn.classList.add('compact')
                })
            }
        })
    }

    // select
    const selectItems = document.querySelectorAll('select');
    if (selectItems.length > 0) {
        selectItems.forEach(select => {
            select.insertAdjacentHTML('afterend', '<span class="material-icons expand-indicator">expand_more</span>')
        })
    }

    // form validation
    const requiredItems = document.querySelectorAll('.input-wrapper.required');
    if (requiredItems.length > 0) {
        requiredItems.forEach(itemWrapper => {
            let input = itemWrapper.querySelector('.form-input');
            input.required = true;
            input.addEventListener('blur', function() {
                if (input.value === "") {
                    itemWrapper.classList.remove('error-invalid');
                    itemWrapper.classList.add('error-empty');
                } else {
                    itemWrapper.classList.remove('error-empty')
                    if (itemWrapper.classList.contains('validate-email')) {
                        let emailResult = validateEmail(input.value);
                        if (emailResult === false) {
                            itemWrapper.classList.add('error-invalid');
                        } else {
                            itemWrapper.classList.remove('error-invalid');
                        }
                    }
                    if (itemWrapper.classList.contains('validate-fullName')) {
                        let nameResult = validateFullName(input.value);
                        if (nameResult === false) {
                            itemWrapper.classList.add('error-invalid');
                        } else {
                            itemWrapper.classList.remove('error-invalid');
                        }
                    }
                    if (itemWrapper.classList.contains('validate-mobileNumber')) {
                        let numberFormat = formatMobileNumber(input.value);
                        let numberResult = validateMobileNumber(numberFormat);
                        if (numberResult === false) {
                            itemWrapper.classList.add('error-invalid');
                        } else {
                            itemWrapper.classList.remove('error-invalid');
                        }
                    }
                }
            })
        });
    }
});

apiUrl = window.location.protocol + '//' + window.location.host + '/api';

function apiReq(options) {
    let newReq = new XMLHttpRequest();
    newReq.open(options.method.toUpperCase(), options.url);
    newReq.setRequestHeader('Content-Type', 'application/json');
    if (options.body) {
        newReq.send(options.body);
    } else {
        newReq.send();
    }
    return newReq;
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("SPAN");
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = event.clientX - (button.offsetLeft + radius) + 'px';
    circle.style.top = event.clientY - (button.offsetTop + radius) + 'px';
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle)
}

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

function checkValue(itemWrapper) {
    let itemInput = itemWrapper.querySelectorAll('input, textarea')
    itemInput.forEach(inp => {
        if (inp.value != "" || inp.placeholder != "") {
            itemWrapper.classList.add('has-value')
        } else {
            itemWrapper.classList.remove('has-value')
        }
    })
}

function validateEmail(value) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

function validateFullName(value) {
    if (/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

function validateMobileNumber(value) {
    if (/^\+61\s\d{3}\s\d{3}\s\d{3}$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

function formatMobileNumber(phoneInput) {
    let phoneObj = phoneInput.replace(/\s/g, '').replace(/^0/g, '+61').match(/(\+61)(\d{3})(\d{3})(\d{3})/);
    try {
        return phoneObj[1] + ' ' + phoneObj[2] + ' ' + phoneObj[3] + ' ' + phoneObj[4];
    } catch {
        return phoneInput;
    }
}