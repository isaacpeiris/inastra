/* DROPDOWN */
document.addEventListener("DOMContentLoaded", function() {
	const dropdownTriggers = document.querySelectorAll('[data-dropdown-target]');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener("mouseover", function() {
          openDropdown(trigger.dataset.dropdownTarget);
        });
        trigger.addEventListener("mouseout", function() {
			closeDropdown(trigger.dataset.dropdownTarget);
        });
        document.getElementById(trigger.dataset.dropdownTarget).addEventListener("mouseover", function() {
          openDropdown(trigger.dataset.dropdownTarget);
        });
        document.getElementById(trigger.dataset.dropdownTarget).addEventListener("mouseout", function() {
			closeDropdown(trigger.dataset.dropdownTarget);
        });
    });
})

function openDropdown(id) {
  const dropdown = document.getElementById(id);
  const trigger = document.querySelector(`[data-dropdown-target="${id}"]`);

  dropdown.setAttribute("aria-expanded", true);

  dropdown.style.top = trigger.offsetTop + trigger.offsetHeight - 2 + 'px';
  dropdown.style.left = trigger.offsetLeft + 'px';
  // if overflow bottom, position bottom of dropdown to top of trigger
  if (dropdown.offsetTop + dropdown.offsetHeight > window.innerHeight) {
	console.log(dropdown.id + " overflow bottom")
	dropdown.style.top = trigger.offsetTop - dropdown.offsetHeight + 'px';
  }
  // if overflow right, position left of dropdown to right of trigger
  if (dropdown.offsetLeft + dropdown.offsetWidth > window.innerWidth - 16) {
	console.log(dropdown.id + " overflow right")
	dropdown.style.left = trigger.offsetLeft + trigger.offsetWidth - dropdown.offsetWidth + 'px';
  }
}

function closeDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.setAttribute("aria-expanded", false);
}

/* REDUCED MOTION */
document.addEventListener("DOMContentLoaded", function() {
    if (window.matchMedia('(prefers-reduced-motion)').matches) {
        document.documentElement.classList.add('reduced-motion');
    };
})