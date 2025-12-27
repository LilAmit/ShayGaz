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

// Chatbot functionality
const chatbotKnowledge = {
    'מה השירותים שאתם מציעים?': `אנחנו מציעים מגוון שירותי גז מקצועיים:
        
🔧 התקנת מערכות גז
💧 התקנת מחממי מים
🔍 בדיקות תקופתיות
⚙️ תיקונים ותחזוקה
🏠 ייעוץ מקצועי
🚨 שירות חירום 24/7
📋 אישורים ותיעוד`,
    
    'באיזה אזורים אתם משרתים?': `אנחנו משרתים את כל אזור השרון וגוש דן! 📍

כולל: הוד השרון, רעננה, כפר סבא, רמת השרון, הרצליה, תל אביב, פתח תקווה, נתניה ועוד!`,
    
    'כמה ניסיון יש לכם?': `יש לנו מעל 20 שנה של ניסיון בתחום! 🎓

✅ טכנאי גז מוסמך ומקצועי
✅ הסמכות מלאות מהמוסד למדרג
✅ תעודת הוכרה והצטיינות
✅ אלפי לקוחות מרוצים`,
    
    'איך ליצור קשר?': `ניתן ליצור קשר בכמה דרכים:

📞 טלפון: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold; text-decoration: underline;">053-2302248 ← לחץ כאן להתקשר</a>

💬 ווצאפ: <a href="https://wa.me/972532302248" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: underline;">לחץ כאן לשליחת הודעה בווצאפ ←</a>

⏰ זמינים 24/7 גם בשבת!`,
    
    'כמה עולה השירות?': `המחירים משתנים לפי סוג השירות:

💰 המחיר מותאם לכל עבודה
✅ מחירים הוגנים ושקופים
📞 התקשר לקבלת הצעת מחיר: 053-2302248`,
    
    'מתי צריך לעשות בדיקת גז?': `בדיקת גז תקופתית:

✅ חובה על פי חוק
⏰ מומלץ אחת לשנה
📋 כולל תעודת בטיחות
🔍 בדיקה מקיפה של כל המערכת`,
    
    'יש שירות חירום?': `⚠️ במקרה חירום:

1️⃣ סגור את הברז הראשי
2️⃣ פתח חלונות
3️⃣ התקשר מיד: 053-2302248
🚨 זמינים 24/7!`,
    
    'אתם מתקינים מחממי מים?': `התקנת מחממי מים:

💧 התקנה מקצועית
🔧 תיקון ותחזוקה
✅ כל סוגי המחממים
📞 התקשר: 053-2302248`
};

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWindow');
    chatbot.classList.toggle('active');
}

function askQuestion(question) {
    // Add user message
    addMessage(question, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = chatbotKnowledge[question] || 'מצטער, לא מצאתי תשובה לשאלה זו.';
        addMessage(response, 'bot');
    }, 800);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}
