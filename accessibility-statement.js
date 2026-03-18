/* ===== Accessibility Statement Page Specific Scripts ===== */

// Smooth scroll to sections within the accessibility statement
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.accessibility-statement-content a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
