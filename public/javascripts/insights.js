document.addEventListener("DOMContentLoaded", function() {
    // Open any external link in new tab
    document.querySelectorAll('.post_content a').forEach(link => {
        link.classList.add('intext-link')
        if (!link.href.match('inastra.co')) {
            link.target = "_blank"
        }
    })
})