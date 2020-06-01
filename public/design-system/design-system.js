/* ==== */
/* INIT */
/* ==== */
document.addEventListener("DOMContentLoaded", function() {
    // Reduced motion
    const hasReduceMotionOn = window.matchMedia('(prefers-reduced-motion)').matches;
    if (hasReduceMotionOn) {
        document.documentElement.classList.add('reduced-motion');
    };

    /* Fade Elements */
    // Select all fade elements
    const fadeElements = document.querySelectorAll('.fade-in');
    // Run fade in function on page load
    fadeIn(fadeElements);
    // Run fade in function on scroll
    window.addEventListener("scroll", function() { fadeIn(fadeElements) });

    /* FORMS */
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

    const requiredItems = document.querySelectorAll('form .item-wrapper.required');
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
            }
        })
    });
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

function validateEmail(value) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

function validateFullName(value) {
    if(/^[a-zA-Z]+ [a-zA-Z]+$/.test(value)) {
        return true;
    } else {
        return false;
    }
}