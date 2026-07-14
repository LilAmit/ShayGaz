/* ===== Gallery Page Specific Scripts ===== */

// Gallery lightbox with navigation (arrows, keyboard, swipe)
document.addEventListener('DOMContentLoaded', function() {
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    if (!images.length) return;

    let currentIndex = 0;
    let overlay = null;
    let fullImg = null;
    let counter = null;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        if (fullImg) {
            fullImg.src = images[currentIndex].src;
            fullImg.alt = images[currentIndex].alt;
        }
        if (counter) {
            counter.textContent = (currentIndex + 1) + ' / ' + images.length;
        }
    }

    // עברית = RTL: התמונה הקודמת נמצאת מימין, התמונה הבאה נמצאת משמאל
    function showPrev() { showImage(currentIndex - 1); }
    function showNext() { showImage(currentIndex + 1); }

    function closeLightbox() {
        if (!overlay) return;
        document.removeEventListener('keydown', onKeydown);
        overlay.remove();
        overlay = null;
        fullImg = null;
        counter = null;
    }

    function onKeydown(e) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight') showPrev(); // חץ ימינה = תמונה קודמת (RTL)
        else if (e.key === 'ArrowLeft') showNext();  // חץ שמאלה = תמונה הבאה (RTL)
    }

    function openLightbox(index) {
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        fullImg = document.createElement('img');
        fullImg.className = 'lightbox-img';

        // כפתור חץ ימינה - צמוד לצד ימין של התמונה - מעבר לתמונה הקודמת
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-btn lightbox-prev';
        prevBtn.setAttribute('aria-label', 'התמונה הקודמת');
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        // כפתור חץ שמאלה - צמוד לצד שמאל של התמונה - מעבר לתמונה הבאה
        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-btn lightbox-next';
        nextBtn.setAttribute('aria-label', 'התמונה הבאה');
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

        content.appendChild(prevBtn);
        content.appendChild(fullImg);
        content.appendChild(nextBtn);

        // כפתור סגירה
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.setAttribute('aria-label', 'סגור');
        closeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

        // מונה תמונות
        counter = document.createElement('div');
        counter.className = 'lightbox-counter';

        overlay.appendChild(content);
        overlay.appendChild(closeBtn);
        overlay.appendChild(counter);
        document.body.appendChild(overlay);

        showImage(index);

        // ניווט בכפתורים
        prevBtn.addEventListener('click', function(e) { e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener('click', function(e) { e.stopPropagation(); showNext(); });
        closeBtn.addEventListener('click', closeLightbox);

        // לחיצה על הרקע הכהה סוגרת; לחיצה על התמונה עצמה לא
        overlay.addEventListener('click', closeLightbox);
        content.addEventListener('click', function(e) { e.stopPropagation(); });

        document.addEventListener('keydown', onKeydown);

        // החלקה באצבע במובייל
        let touchStartX = 0;
        let touchStartY = 0;
        content.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        content.addEventListener('touchend', function(e) {
            const deltaX = e.changedTouches[0].screenX - touchStartX;
            const deltaY = e.changedTouches[0].screenY - touchStartY;
            const threshold = 50;
            // התעלם מהחלקה אנכית (גלילה)
            if (Math.abs(deltaX) < threshold || Math.abs(deltaX) < Math.abs(deltaY)) return;
            if (deltaX < 0) {
                // החלקה שמאלה => תמונה הבאה (שמאל ב-RTL)
                showNext();
            } else {
                // החלקה ימינה => תמונה קודמת (ימין ב-RTL)
                showPrev();
            }
        }, { passive: true });
    }

    images.forEach(function(img, index) {
        img.addEventListener('click', function() {
            openLightbox(index);
        });
    });
});
