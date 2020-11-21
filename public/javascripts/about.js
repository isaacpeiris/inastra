document.addEventListener("DOMContentLoaded", function() {
    const valuesBtns = document.querySelectorAll('button.value');
    const valuesDescriptions = document.querySelector('.values-description').children;
    const descriptionArray = Array.prototype.slice.call(valuesDescriptions);
    const values = document.querySelector('.values-wrapper').children;
    const valuesArray = Array.prototype.slice.call(values);
    const timerDuration = 12000;

    let valuesTimer = setInterval(valuesCounter, timerDuration);

    valuesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            btn.blur();
            clearInterval(valuesTimer);
            valuesArray.forEach(v => { v.classList.remove('active') });
            btn.classList.add('active');
            valuesDescription();
            valuesTimer = setInterval(valuesCounter, timerDuration);
        })
    })

    function valuesCounter() {
        let currentIndex = valuesArray.indexOf(document.querySelector('.value.active'));
        valuesArray.forEach(v => { v.classList.remove('active') })
        if (currentIndex < 3) {
            valuesArray[currentIndex + 1].classList.add('active');
        } else {
            valuesArray[0].classList.add('active');
        }
        valuesDescription();
    }

    function valuesDescription() {
        descriptionArray.forEach(d => { d.classList.remove('active') })
        for (let i = 0; i < descriptionArray.length; i++) {
            if (descriptionArray[i].dataset.value === document.querySelector('.value.active').dataset.value) {
                descriptionArray[i].classList.add('active')
                break
            }

        }
    }
});