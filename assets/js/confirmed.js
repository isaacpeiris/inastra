document.addEventListener("DOMContentLoaded", function() {
    // Get contact information from local storage
    const contact = JSON.parse(window.localStorage.getItem('contact'));
    document.querySelector('.firstName').innerText = contact.firstName;
});