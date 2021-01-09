document.addEventListener("DOMContentLoaded", function() {
    // Open any external link in new tab
    document.querySelectorAll('.post-content a').forEach(link => {
        if (!link.href.match('inastra.co')) {
            link.target = "_blank"
        }
    })
})