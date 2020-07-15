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
    const innerItems = document.querySelectorAll('.inner-label .item-wrapper');
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

    // form validation
    const requiredItems = document.querySelectorAll('.item-wrapper.required');
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

    // modals
    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
        document.body.insertAdjacentHTML('beforeend','<div class="modal-background"></div>');
        modals.forEach(modal => {
            modal.insertAdjacentHTML('afterbegin',`
            <div class="modal-header">
                <h3 class="modal-title">${modal.dataset.title}</h3>
                <button class="btn btn-flat icon-only close-modal"><span class="material-icons">close</span></button>
            </div>
            `)
            modal.querySelector('.close-modal').addEventListener('click', function() {
                closeModal(modal.id);
            })
        })
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                modals.forEach(modal => {
                    closeModal(modal.id);
                });
                openModal(trigger.dataset.target);
            })
        })
    }
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

function validateMobileNumber(value) {
    if(/^\+61\s\d{3}\s\d{3}\s\d{3}$/.test(value)) {
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

function closeModal(modal_id) {
    document.querySelector('.modal-background').style.display = 'none';
    document.getElementById(modal_id).style.display = 'none';
}

function openModal(modal_id) {
    document.querySelector('.modal-background').style.display = 'block';
    document.getElementById(modal_id).style.display = 'block';
    document.querySelector('.modal-background').addEventListener('click', function() { closeModal(modal_id) });
}