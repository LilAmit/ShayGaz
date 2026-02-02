// Page Loading
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 500);
});

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
const chatbotPatterns = [
    // ברכות ושיחת חולין
    {
        patterns: ['היי', 'שלום', 'הי', 'אהלן', 'הלו', 'בוקר טוב', 'ערב טוב', 'צהריים טובים', 'מה נשמע', 'מה קורה', 'מה העניינים', 'מה שלומך', 'מה שלומך?', 'שלום רב'],
        response: `שלום וברוכים הבאים! 👋

אני העוזר הווירטואלי של שי גז, שמח לעזור לך!
איך אפשר לסייע?

אתה יכול לשאול אותי על:
🔧 שירותי גז והתקנות
📍 אזורי שירות
💰 מחירים והצעות מחיר
📞 יצירת קשר
🚨 שירות חירום`
    },
    {
        patterns: ['מה אתה יודע', 'מה אתה עושה', 'מי אתה', 'מה תפקידך', 'עוזר'],
        response: `אני העוזר הווירטואלי של שי בן חלילי - טכנאי גז מוסמך! 🤖

אני יכול לעזור לך עם מידע על:
🔧 השירותים שאנחנו מציעים
📍 אזורי השירות שלנו
💼 הניסיון וההסמכות שלנו
📞 פרטי יצירת קשר
⏰ זמינות ושעות פעילות
🚨 מה לעשות במקרה חירום`
    },
    // שירותים
    {
        patterns: ['שירות', 'שירותים', 'מה אתם מציעים', 'מה אתם עושים', 'עבודות', 'סוגי עבודה', 'התקנ', 'תיקון', 'תחזוקה'],
        response: `אנחנו מציעים מגוון שירותי גז מקצועיים:

🔧 התקנת מערכות גז ביתיות ומסחריות
💧 התקנת והחלפת מחממי מים (דודים)
🔍 בדיקות גז תקופתיות (חובה על פי חוק!)
⚙️ תיקונים ותחזוקה שוטפת
🏠 ייעוץ מקצועי והמלצות
🚨 שירות חירום 24/7
📋 אישורים ותיעוד לרשויות

📞 לתיאום: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`
    },
    // אזורי שירות
    {
        patterns: ['אזור', 'איפה', 'ערים', 'עיר', 'מיקום', 'שרון', 'גוש דן', 'תל אביב', 'הרצליה', 'רעננה', 'כפר סבא', 'נתניה', 'פתח תקווה', 'מגיעים'],
        response: `אנחנו משרתים את כל אזור השרון וגוש דן! 📍

🏙️ ערים עיקריות:
• הוד השרון, רעננה, כפר סבא
• רמת השרון, הרצליה, רמת גן
• תל אביב, גבעתיים, פתח תקווה
• נתניה, רמלה, לוד ועוד!

✅ זמינים בכל האזור
🚗 הגעה מהירה
📞 התקשר לבדוק זמינות: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`
    },
    // ניסיון והסמכות
    {
        patterns: ['ניסיון', 'כמה זמן', 'הסמכ', 'תעודה', 'רישיון', 'מקצועי', 'מוסמך', 'אמין'],
        response: `שי בן חלילי - טכנאי גז מוסמך עם מעל 20 שנה ניסיון! 🎓

✅ הסמכות מלאות ממשרד האנרגיה
✅ תעודת הוכרה מהמוסד למדרג
✅ רישיון טכנאי גז מוסמך
✅ ביטוח מקצועי מלא
✅ אלפי לקוחות מרוצים

📸 ניתן לראות את ההסמכות בדף <a href="credentials.html" style="color: #FFD700; font-weight: bold;">הסמכות ולקוחות</a>`
    },
    // יצירת קשר
    {
        patterns: ['קשר', 'טלפון', 'להתקשר', 'וואצאפ', 'ווצאפ', 'whatsapp', 'מספר', 'פניה', 'דבר עם', 'לדבר'],
        response: `ניתן ליצור קשר בכמה דרכים:

📞 טלפון: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248 ← לחץ להתקשר</a>

💬 וואצאפ: <a href="https://wa.me/972532302248" target="_blank" style="color: #25D366; font-weight: bold;">לחץ כאן לשליחת הודעה ←</a>

⏰ זמינים 24/7 - גם בשבת ובחגים!
🚀 מענה מהיר תוך דקות!`
    },
    // מחירים
    {
        patterns: ['מחיר', 'עלות', 'כמה עולה', 'עולה', 'הצעת מחיר', 'תמחור', 'יקר', 'זול'],
        response: `לגבי מחירים 💰

✅ מחירים הוגנים ושקופים
✅ הצעת מחיר לפני כל עבודה
✅ ללא הפתעות - מה שסוכם זה המחיר
✅ אפשרות לתשלום במזומן/אשראי/ביט

📞 להצעת מחיר ללא התחייבות:
<a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>

💬 או בוואצאפ: <a href="https://wa.me/972532302248" target="_blank" style="color: #25D366; font-weight: bold;">לחץ כאן</a>`
    },
    // בדיקות גז
    {
        patterns: ['בדיקה', 'בדיקת גז', 'בדיקה תקופתית', 'תקופתי', 'בטיחות', 'תקן'],
        response: `בדיקת גז תקופתית 🔍

📋 חובה על פי חוק!
⏰ יש לבצע בדיקה אחת לשנה
✅ כולל תעודת בטיחות רשמית
🔧 בדיקה מקיפה של כל המערכת

מה כולל הבדיקה?
• בדיקת צנרת ומחברים
• בדיקת לחץ גז
• בדיקת דליפות
• בדיקת מכשירי גז
• הנפקת תעודה

📞 לקביעת בדיקה: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`
    },
    // חירום
    {
        patterns: ['חירום', 'דליפה', 'ריח גז', 'ריח', 'מסוכן', 'דחוף', 'בעיה', 'תקלה'],
        response: `⚠️ במקרה חירום - דליפת גז:

1️⃣ סגור מיד את ברז הגז הראשי
2️⃣ פתח חלונות ודלתות
3️⃣ אל תדליק אור או מכשיר חשמלי!
4️⃣ צא מהבית ואז התקשר

🚨 קו חירום 24/7:
<a href="tel:053-2302248" style="color: #ff4444; font-weight: bold; font-size: 18px;">053-2302248</a>

אנחנו זמינים תמיד - גם בשבת ובחגים!`
    },
    // מחממי מים / דוד
    {
        patterns: ['דוד', 'מחמם', 'מים חמים', 'בוילר', 'דוד שמש', 'דוד חשמלי'],
        response: `התקנת ותיקון מחממי מים 💧

🔧 שירותים שאנחנו מציעים:
• התקנת מחמם מים חדש
• החלפת מחמם ישן
• תיקון ותחזוקה
• חיבור לגז

✅ עובדים עם כל סוגי המחממים
✅ אחריות על העבודה
✅ חלקי חילוף מקוריים

📞 לתיאום: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`
    },
    // גלריה/עבודות
    {
        patterns: ['גלריה', 'תמונות', 'עבודות', 'דוגמאות', 'פרויקטים'],
        response: `רוצה לראות את העבודות שלנו? 📸

🖼️ בקר בדף הגלריה שלנו:
<a href="gallery.html" style="color: #FFD700; font-weight: bold;">לחץ כאן לגלריית עבודות</a>

שם תוכל לראות:
• התקנות חדשות
• עבודות תיקון
• פרויקטים מיוחדים
• לפני ואחרי`
    },
    // בלון גז
    {
        patterns: ['בלון', 'מיכל', 'מוכרים גז', 'למכור', 'קניית גז'],
        response: `שאלה טובה! ❌

⚠️ אנחנו לא מוכרים בלוני גז.

אנחנו מספקים שירותי טכנאות גז מקצועיים:
🔧 התקנות
🔍 בדיקות
⚙️ תיקונים
📋 אישורים

לרכישת בלון גז יש לפנות לספקי גז מורשים.

📞 לשירותי טכנאות: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`
    },
    // תודה/סיום
    {
        patterns: ['תודה', 'תודה רבה', 'מעולה', 'אחלה', 'סבבה', 'יופי', 'להתראות', 'ביי'],
        response: `בשמחה! 😊

נשמח לעזור תמיד!
אם יש עוד שאלות - אני כאן.

📞 לשירות מיידי: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>
💬 וואצאפ: <a href="https://wa.me/972532302248" target="_blank" style="color: #25D366; font-weight: bold;">לחץ כאן</a>

יום נעים! ☀️`
    },
    // זמינות
    {
        patterns: ['זמין', 'פנוי', 'מתי', 'שעות', 'שבת', 'חג', 'לילה'],
        response: `זמינות ושעות פעילות ⏰

✅ זמינים 24 שעות ביממה!
✅ 7 ימים בשבוע
✅ גם בשבתות וחגים
✅ שירות חירום מיידי

📞 התקשר עכשיו: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>

מגיעים מהר לכל האזור! 🚗`
    }
];

function toggleChatbot() {
    const chatbot = document.getElementById('chatbotWindow');
    if (chatbot) {
        chatbot.classList.toggle('active');
    }
}

function findBestResponse(userMessage) {
    const normalizedMessage = userMessage.toLowerCase().trim();

    for (const item of chatbotPatterns) {
        for (const pattern of item.patterns) {
            if (normalizedMessage.includes(pattern.toLowerCase())) {
                return item.response;
            }
        }
    }

    return `לא הצלחתי להבין את השאלה 🤔

אתה יכול לשאול אותי על:
• שירותי גז והתקנות
• אזורי שירות
• מחירים והצעות מחיר
• בדיקות גז תקופתיות
• יצירת קשר

📞 או פשוט התקשר: <a href="tel:053-2302248" style="color: #FFD700; font-weight: bold;">053-2302248</a>`;
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatbotInput');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Get bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = findBestResponse(message);
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
