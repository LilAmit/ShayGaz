/* ===== Gallery Page Specific Scripts ===== */

// Gallery image lightbox - click to view full size
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:pointer;animation:fadeIn 0.3s ease';

            const fullImg = document.createElement('img');
            fullImg.src = this.src;
            fullImg.alt = this.alt;
            fullImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,0.5)';

            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function() {
                overlay.remove();
            });

            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    overlay.remove();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });
});
