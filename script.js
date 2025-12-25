// Page Loading
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 500);
});

// Accessibility State
let accessibilityState = {
    fontSize: 100,
    highContrast: false,
    grayscale: false,
    underlineLinks: false,
    readableFont: false,
    lineHeight: false,
    letterSpacing: false
};

// Load saved accessibility settings
function loadAccessibilitySettings() {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
        accessibilityState = JSON.parse(saved);
        applyAccessibilitySettings();
    }
}

// Save accessibility settings
function saveAccessibilitySettings() {
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilityState));
}

// Apply all accessibility settings
function applyAccessibilitySettings() {
    // Font size
    document.body.className = document.body.className.replace(/font-size-\d+/g, '');
    if (accessibilityState.fontSize !== 100) {
        document.body.classList.add(`font-size-${accessibilityState.fontSize}`);
    }
    updateFontButtons();

    // Other settings
    document.body.classList.toggle('high-contrast', accessibilityState.highContrast);
    document.body.classList.toggle('grayscale', accessibilityState.grayscale);
    document.body.classList.toggle('underline-links', accessibilityState.underlineLinks);
    document.body.classList.toggle('readable-font', accessibilityState.readableFont);
    document.body.classList.toggle('line-height-increased', accessibilityState.lineHeight);
    document.body.classList.toggle('letter-spacing-increased', accessibilityState.letterSpacing);

    updateButtonStates();
}

// Update font size button states
function updateFontButtons() {
    ['100', '110', '120', '130', '140'].forEach(size => {
        const btn = document.getElementById(`font${size}`);
        if (btn) {
            btn.classList.toggle('active', accessibilityState.fontSize === parseInt(size));
        }
    });
}

// Update all button states
function updateButtonStates() {
    document.getElementById('contrastBtn')?.classList.toggle('active', accessibilityState.highContrast);
    document.getElementById('grayscaleBtn')?.classList.toggle('active', accessibilityState.grayscale);
    document.getElementById('underlineBtn')?.classList.toggle('active', accessibilityState.underlineLinks);
    document.getElementById('fontBtn')?.classList.toggle('active', accessibilityState.readableFont);
    document.getElementById('lineHeightBtn')?.classList.toggle('active', accessibilityState.lineHeight);
    document.getElementById('letterSpacingBtn')?.classList.toggle('active', accessibilityState.letterSpacing);
}

// Toggle accessibility panel
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    const overlay = document.getElementById('accessibilityOverlay');
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close accessibility panel
function closeAccessibilityPanel() {
    document.getElementById('accessibilityPanel').classList.remove('active');
    document.getElementById('accessibilityOverlay').classList.remove('active');
}

// Set font size
function setFontSize(size) {
    accessibilityState.fontSize = size;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle contrast
function toggleContrast() {
    accessibilityState.highContrast = !accessibilityState.highContrast;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle grayscale
function toggleGrayscale() {
    accessibilityState.grayscale = !accessibilityState.grayscale;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle underline links
function toggleUnderlineLinks() {
    accessibilityState.underlineLinks = !accessibilityState.underlineLinks;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle readable font
function toggleReadableFont() {
    accessibilityState.readableFont = !accessibilityState.readableFont;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle line height
function toggleLineHeight() {
    accessibilityState.lineHeight = !accessibilityState.lineHeight;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Toggle letter spacing
function toggleLetterSpacing() {
    accessibilityState.letterSpacing = !accessibilityState.letterSpacing;
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Reset all accessibility settings
function resetAccessibility() {
    accessibilityState = {
        fontSize: 100,
        highContrast: false,
        grayscale: false,
        underlineLinks: false,
        readableFont: false,
        lineHeight: false,
        letterSpacing: false
    };
    saveAccessibilitySettings();
    applyAccessibilitySettings();
}

// Back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard accessibility for accessibility button
document.querySelector('.accessibility-float-btn').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccessibilityPanel();
    }
});

// Close accessibility panel with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAccessibilityPanel();
    }
});

// Load accessibility settings on page load
loadAccessibilitySettings();

// Announce page load to screen readers
window.addEventListener('load', function() {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'הדף נטען בהצלחה';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
});
