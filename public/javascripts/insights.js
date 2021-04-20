document.addEventListener("DOMContentLoaded", function() {
    // Open any external link in new tab
    document.querySelectorAll('.post__content a').forEach(link => {
        link.classList.add('eos-link--intext');
        if (!link.href.match('inastra.co')) {
            link.target = "_blank"
        }
    })
})