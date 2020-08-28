/* ==== */
/* INIT */
/* ==== */
document.addEventListener("DOMContentLoaded", function() {
    /* COLOURS */
    // get colour input
    const colourInput = {
        base: "#1f1832",
        blue: "#35bdee",
        purple: "#635aa7",
        green: "#46bc97",
        red: "#de350b",
        yellow: "#ffcd00"
    }

    // // Generate colours if required
    // generateColours(colourInput);

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
    const formItems = document.querySelectorAll('.item-wrapper');
    if (formItems.length > 0) {
        formItems.forEach(itemWrapper => {
            // let inputTag = itemWrapper.querySelector('.form-input').tagName.toLowerCase();
            // if (inputTag == 'input') {
            //     let inputType = itemWrapper.querySelector('.form-input').getAttribute('type').toLowerCase();
            //     itemWrapper.classList.add('type-' + inputTag + '-' + inputType);
            // } else {
            //     itemWrapper.classList.add('type-' + inputTag);
            // }

            checkValue(itemWrapper)

            itemWrapper.querySelector('.form-input').addEventListener('focus', function() {
                itemWrapper.classList.add('active')
            });

            itemWrapper.querySelector('.form-input').addEventListener('blur', function() {
                itemWrapper.classList.remove('active')
                checkValue(itemWrapper)
            })
        })
    }

    // select
    const selectItems = document.querySelectorAll('select');
    if (selectItems.length > 0) {
        selectItems.forEach(select => {
            select.insertAdjacentHTML('afterend','<span class="material-icons expand-indicator">expand_more</span>')
        })
    }

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

    /* MODALS */
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

    /* ACCORDIONS */
    const accordions = document.querySelectorAll('.accordion');
    if (accordions.length > 0) {
        accordions.forEach(accordion => {
            accordion.querySelectorAll('.accordion-item').forEach(item => {
                // Wrap item content
                let itemContent = item.innerHTML;
                item.innerHTML = `<div class="accordion-content">${itemContent}</div>`

                // Set shown header
                item.insertAdjacentHTML('afterbegin',`
                <div class="accordion-header">
                    <p class="accordion-header-text">${item.dataset.text}</p>
                    <span class="material-icons">expand_more</span>
                </div>
                `)

                // Toggle active class
                item.querySelector('.accordion-header').addEventListener('click', function() {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.querySelector('.accordion-header .material-icons').innerText = 'expand_more';
                    } else {
                        if (!accordion.classList.contains('expandable')) {
                            accordion.querySelectorAll('.accordion-item').forEach(item => {
                                item.classList.remove('active');
                                item.querySelector('.accordion-header .material-icons').innerText = 'expand_more';
                            })
                        }
                        item.classList.add('active');
                        item.querySelector('.accordion-header .material-icons').innerText = 'expand_less';
                    }
                })
            });
        })
    }

    /* TOOLTIPS */
    const tooltips = document.querySelectorAll('.tooltipped');
    if (tooltips.length > 0) {
        tooltips.forEach(t => {
            let tooltipId = Math.floor(100000 + Math.random() * 900000);
            let tooltipPosition = t.classList.value.match(/tooltip-(\w*?)\s/)[1];
            let el = document.createElement("span");
            el.classList.add('tooltip', `tooltip-${tooltipPosition}`)
            el.id = tooltipId;
            el.innerText = t.dataset.tooltip;
            document.body.appendChild(el);
            t.dataset.tooltipId = tooltipId;

            t.addEventListener('mouseover', function() {
                el.classList.add('tooltip-visible');
            })

            t.addEventListener('mouseout', function() {
                el.classList.remove('tooltip-visible')
            })
        })
    }

    /* TABLES */
    // sortable
    const sortableTables = document.querySelectorAll('.table.sortable');
    if (sortableTables.length > 0) {
        sortableTables.forEach(table => {
            table.querySelectorAll('th').forEach(th => {
                th.addEventListener('click', function() {
                    let array = [];
                    for (let i = 1; i < table.rows.length; i++) {
                        array.push(table.rows[i].cells[th.cellIndex].innerText);
                    }
                    console.log(array)
                })
            })
        })
    }
})

/* FUNCTIONS */
// colors
function rgbToHex(rgb) {
// adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }

function hexToRgb(hex) {
// adapted from https://dev.to/azettl/convert-hex-to-rgb-with-javascript-5h06
    let h = hex.replace('#','')
    var aRgbHex = h.match(/.{1,2}/g);
    var aRgb = {
        r:parseInt(aRgbHex[0], 16),
        g:parseInt(aRgbHex[1], 16),
        b:parseInt(aRgbHex[2], 16)
    };
    return aRgb;
}

function RgbToHsl(r,g,b) {
// adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    let aHsl = {
        h: h,
        s: +(s * 100).toFixed(1),
        l: +(l * 100).toFixed(1)
    }

    return aHsl
}

function generateColours(colourInput) {
    // convert colour input to array
    let colors = [];
    for (const [name, hex] of Object.entries(colourInput)) {
        let colorObj = new Object();
        colorObj.name = name;
        colorObj.hex = hex;
        colors.push(colorObj)
    }

    // Get design system stylesheet
    let stylesheet;
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == window.location.origin+"/stylesheets/master.css") {
            stylesheet = document.styleSheets[i]
        }
    }

    // set default array
    let rootValues = [
        "--c-black: #000000;",
        "--c-black-10: rgba(0,0,0,0.1);",
        "--c-black-20: rgba(0,0,0,0.2);",
        "--c-black-30: rgba(0,0,0,0.3);",
        "--c-black-40: rgba(0,0,0,0.4);",
        "--c-black-50: rgba(0,0,0,0.5);",
        "--c-black-60: rgba(0,0,0,0.6);",
        "--c-black-70: rgba(0,0,0,0.7);",
        "--c-black-80: rgba(0,0,0,0.8);",
        "--c-black-90: rgba(0,0,0,0.9);",
        "--c-white: #ffffff;",
        "--c-white-10: rgba(255,255,255,0.1);",
        "--c-white-20: rgba(255,255,255,0.2);",
        "--c-white-30: rgba(255,255,255,0.3);",
        "--c-white-40: rgba(255,255,255,0.4);",
        "--c-white-50: rgba(255,255,255,0.5);",
        "--c-white-60: rgba(255,255,255,0.6);",
        "--c-white-70: rgba(255,255,255,0.7);",
        "--c-white-80: rgba(255,255,255,0.8);",
        "--c-white-90: rgba(255,255,255,0.9);",
        "--c-grey-10:  hsl(0,0%,90%);",
        "--c-grey-20:  hsl(0,0%,80%);",
        "--c-grey-30:  hsl(0,0%,70%);",
        "--c-grey-40:  hsl(0,0%,60%);",
        "--c-grey-50:  hsl(0,0%,50%);",
        "--c-grey-60:  hsl(0,0%,40%);",
        "--c-grey-60:  hsl(0,0%,30%);",
        "--c-grey-80:  hsl(0,0%,20%);",
        "--c-grey-90:  hsl(0,0%,10%);"
    ];

    // For each colour in array
    colors.forEach(color => {
        // add standard hex value into array
        rootValues.push(`--c-${color.name}: ${color.hex}`);
        // get rgb from hex
        let rgb = hexToRgb(color.hex);
        // add rgba opacity 0.1-0.9 to array
        for (let i = 1; i < 10; i++) {
            rootValues.push(`--c-${color.name}-${i}0: rgba(${rgb.r},${rgb.g},${rgb.b},0.${i});`);
        }
        // get hsl from rgb
        let hsl = RgbToHsl(rgb.r,rgb.g,rgb.b);
        // set lighten values
        for (let i = 1, inc = (100 - hsl.l)/10, nu = hsl.l+inc; i < 10; i++, nu+=inc) {
            rootValues.push(`--c-${color.name}-light-${i}0: hsl(${hsl.h},${hsl.s}%,${nu}%)`);
        }
        // set darken values
        for (let i = 1, inc = hsl.l/10, nu = hsl.l-inc; i < 10; i++, nu-=inc) {
            rootValues.push(`--c-${color.name}-dark-${i}0: hsl(${hsl.h},${hsl.s}%,${nu}%)`);
        }
    });

    // set :root styles from array
    stylesheet.insertRule(`:root {
        ${rootValues.join(";\n")}
    }`);
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
    let itemInput = itemWrapper.querySelector('.form-input')
    if(itemInput.value != "" || itemInput.placeholder != "") {
        itemWrapper.classList.add('has-value')
    } else {
        itemWrapper.classList.remove('has-value')
    }
}

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

function toast(text, icon) {
    if (!document.querySelector('#toast-wrapper')) {
        let newWrapper = document.createElement('DIV');
        newWrapper.id = 'toast-wrapper'
        document.body.appendChild(newWrapper);
    }
    let toastWrapper = document.querySelector('#toast-wrapper');
    let newToast = document.createElement('DIV');
    newToast.classList.add('toast');
    if (icon) {
        let newToastIconWrapper = document.createElement('DIV');
        newToastIconWrapper.classList.add('toast-icon');
        let newToastIcon = document.createElement('SPAN');
        newToastIcon.classList.add('material-icons');
        newToastIcon.innerText = icon;
        newToastIconWrapper.appendChild(newToastIcon);
        newToast.appendChild(newToastIconWrapper);
    }
    let newToastContent = document.createElement('DIV');
    newToastContent.classList.add('toast-content');
    let newToastText = document.createElement('P');
    newToastText.innerText = text;
    newToastContent.appendChild(newToastText);
    newToast.appendChild(newToastContent);
    toastWrapper.appendChild(newToast)

    setTimeout(function() {
        newToast.classList.add('expired');
    }, 6000)
}