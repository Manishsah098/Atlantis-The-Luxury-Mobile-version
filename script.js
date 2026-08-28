/* --------------------------------------------------------------------------
   ATLANTIS THE ROYAL - LUXURY MOBILE APPLICATION INTERACTIVE ENGINE
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCountrySelector();
  initLanguageSelector();
  initOtpVerification();
  initDeviceFrameToggle();
  initFrontDeskModal();
});

/* --------------------------------------------------------------------------
   1. PAGE NAVIGATION
   -------------------------------------------------------------------------- */
function initNavigation() {
  const splashPage = document.getElementById('pageSplash');
  const welcomePage = document.getElementById('pageWelcome');
  const verifyPage = document.getElementById('pageVerify');
  
  const btnEnterApp = document.getElementById('btnEnterApp');
  const splashLoader = document.getElementById('splashLoader');
  const progressFill = document.getElementById('progressFill');
  
  const startCheckinCard = document.getElementById('startCheckinCard');
  const backToWelcomeBtn = document.getElementById('backToWelcomeBtn');

  // Splash Screen Entry Sequence
  if (btnEnterApp) {
    btnEnterApp.addEventListener('click', () => {
      // Deactivate enter button with slide fade
      btnEnterApp.style.pointerEvents = 'none';
      btnEnterApp.style.opacity = '0';
      setTimeout(() => {
        btnEnterApp.style.display = 'none';
        // Activate golden progress loader
        splashLoader.style.display = 'flex';
      }, 300);
      
      // Animate golden progress loader
      setTimeout(() => {
        let progress = 0;
        const intervalTime = 20; // ms
        const duration = 2200; // 2.2 seconds total processing time
        const increment = (100 / (duration / intervalTime));
        
        const progressInterval = setInterval(() => {
          progress += increment;
          if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Smoothly transition from Splash page to Welcome page
            splashPage.classList.remove('active');
            setTimeout(() => {
              welcomePage.classList.add('active');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 400); // Allow scale-out transitions to finish
          }
          if (progressFill) {
            progressFill.style.width = `${progress}%`;
          }
        }, intervalTime);
      }, 400);
    });
  }

  // Navigate to Page 2
  startCheckinCard.addEventListener('click', () => {
    welcomePage.classList.remove('active');
    setTimeout(() => {
      verifyPage.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  });

  // Navigate back to Page 1
  backToWelcomeBtn.addEventListener('click', () => {
    verifyPage.classList.remove('active');
    setTimeout(() => {
      welcomePage.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  });
}

function resetToWelcome() {
  closeOtpModal();
  document.getElementById('otpSuccessState').style.display = 'none';
  document.getElementById('otpBodyContent').style.display = 'flex';
  
  const welcomePage = document.getElementById('pageWelcome');
  const verifyPage = document.getElementById('pageVerify');
  verifyPage.classList.remove('active');
  welcomePage.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
   2. COUNTRY SELECTOR & SEARCH
   -------------------------------------------------------------------------- */
const countries = [
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳' },
  { name: 'Saudi Arabia', code: 'SA', dial: '+966', flag: '🇸🇦' },
  { name: 'Qatar', code: 'QA', dial: '+974', flag: '🇶🇦' },
  { name: 'Kuwait', code: 'KW', dial: '+965', flag: '🇰🇼' },
  { name: 'Oman', code: 'OM', dial: '+968', flag: '🇴🇲' },
  { name: 'Bahrain', code: 'BH', dial: '+973', flag: '🇧🇭' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'Russia', code: 'RU', dial: '+7', flag: '🇷🇺' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳' },
  { name: 'Japan', code: 'JP', dial: '+81', flag: '🇯🇵' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Singapore', code: 'SG', dial: '+65', flag: '🇸🇬' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭' }
];

let selectedCountry = countries[0];

function initCountrySelector() {
  const countryBtn = document.getElementById('countrySelectBtn');
  const countryModal = document.getElementById('countryModal');
  const countryList = document.getElementById('countryList');
  const searchInput = document.getElementById('countrySearchInput');

  renderCountryList(countries);

  countryBtn.addEventListener('click', () => {
    countryModal.classList.add('open');
    searchInput.value = '';
    renderCountryList(countries);
    setTimeout(() => searchInput.focus(), 200);
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = countries.filter(c => 
      c.name.toLowerCase().includes(query) || c.dial.includes(query)
    );
    renderCountryList(filtered);
  });
}

function renderCountryList(list) {
  const countryList = document.getElementById('countryList');
  if (list.length === 0) {
    countryList.innerHTML = '<div style="padding:15px; text-align:center; color:#94a3b8; font-size:13px;">No country found</div>';
    return;
  }

  countryList.innerHTML = list.map(c => `
    <div class="country-item" onclick="selectCountry('${c.code}')">
      <div class="country-item-left">
        <span>${c.flag}</span>
        <span>${c.name}</span>
      </div>
      <span class="dial">${c.dial}</span>
    </div>
  `).join('');
}

function selectCountry(code) {
  const found = countries.find(c => c.code === code);
  if (found) {
    selectedCountry = found;
    document.getElementById('selectedFlag').textContent = found.flag;
    document.getElementById('selectedDialCode').textContent = found.dial;
  }
  closeCountryModal();
}

function closeCountryModal() {
  document.getElementById('countryModal').classList.remove('open');
}

/* --------------------------------------------------------------------------
   3. LANGUAGE SELECTOR DICTIONARY
   -------------------------------------------------------------------------- */
const translations = {
  en: {
    splashTagline: "Where luxury meets the horizon",
    beginExperience: "Begin Experience",
    securingConnection: "Securing luxury connection...",
    selectLanguage: "Select Language",
    welcome: "Welcome",
    welcomeSub: "Your luxury stay begins here",
    checkin: "Check-in",
    checkinDesc: "Already have a booking?\nCheck-in and access your stay.",
    dining: "Delicious Dining",
    spa: "Spa & Wellness",
    services: "World Class Services",
    experiences: "Memorable Experiences",
    footerMsg: "We're here to make your stay exceptional.",
    thankYou: "Thank You!",
    checkinHeading: "Check-in",
    checkinSub: "Let's get you checked in",
    verifyTitle: "Verify Your Mobile Number",
    verifyDesc: "We will send a verification code to your WhatsApp to complete your check-in.",
    mobileLabel: "Mobile Number",
    waTitle: "We'll send the code to your WhatsApp",
    waSub: "Make sure you have WhatsApp installed",
    sendCode: "Send Code on WhatsApp",
    secureNote: "Your information is secure and encrypted",
    needHelp: "Need help?",
    contactDesk: "Contact Front Desk",
    selectCountry: "Select Country Code",
    chooseLanguage: "Choose Language",
    otpTitle: "WhatsApp Verification Code"
  },
  ar: {
    splashTagline: "حيث تلتقي الفخامة بالأفق",
    beginExperience: "ابدأ التجربة",
    securingConnection: "جاري تأمين اتصالك الفاخر...",
    selectLanguage: "اختر اللغة",
    welcome: "أهلاً بك",
    welcomeSub: "إقامتك الفاخرة تبدأ هنا",
    checkin: "تسجيل الوصول",
    checkinDesc: "لديك حجز بالفعل؟\nسجل وصولك واستمتع بإقامتك.",
    dining: "مطاعم فاخرة",
    spa: "السبا والعافية",
    services: "خدمات عالمية",
    experiences: "تجارب لا تُنسى",
    footerMsg: "نحن هنا لجعل إقامتك استثنائية.",
    thankYou: "شكراً لك!",
    checkinHeading: "تسجيل الوصول",
    checkinSub: "دعنا نساعدك في تسجيل الوصول",
    verifyTitle: "تأكيد رقم الهاتف المحمول",
    verifyDesc: "سنرسل رمز التحقق إلى حساب الواتساب الخاص بك لتأكيد تسجيل الوصول.",
    mobileLabel: "رقم المحمول",
    waTitle: "سنرسل الرمز عبر واتساب",
    waSub: "تأكد من تثبيت تطبيق واتساب",
    sendCode: "إرسال الرمز عبر واتساب",
    secureNote: "معلوماتك آمنة ومشفرة بالكامل",
    needHelp: "هل تحتاج مساعدة؟",
    contactDesk: "تواصل مع الاستقبال",
    selectCountry: "اختر رمز الدولة",
    chooseLanguage: "اختر اللغة",
    otpTitle: "رمز التحقق عبر واتساب"
  },
  fr: {
    splashTagline: "Où le luxe rencontre l'horizon",
    beginExperience: "Commencer l'expérience",
    securingConnection: "Sécurisation de la connexion de luxe...",
    selectLanguage: "Choisir la langue",
    welcome: "Bienvenue",
    welcomeSub: "Votre séjour de luxe commence ici",
    checkin: "Enregistrement",
    checkinDesc: "Vous avez une réservation ?\nEnregistrez-vous et accédez à votre séjour.",
    dining: "Gastronomie",
    spa: "Spa & Bien-être",
    services: "Services d'Exception",
    experiences: "Expériences Inoubliables",
    footerMsg: "Nous sommes là pour rendre votre séjour exceptionnel.",
    thankYou: "Merci !",
    checkinHeading: "Enregistrement",
    checkinSub: "Procédons à votre enregistrement",
    verifyTitle: "Vérifiez Votre Numéro Mobile",
    verifyDesc: "Nous enverrons un code de vérification sur votre WhatsApp pour finaliser l'enregistrement.",
    mobileLabel: "Numéro de Mobile",
    waTitle: "Nous enverrons le code sur WhatsApp",
    waSub: "Assurez-vous d'avoir WhatsApp installé",
    sendCode: "Envoyer le code sur WhatsApp",
    secureNote: "Vos informations sont sécurisées et cryptées",
    needHelp: "Besoin d'aide ?",
    contactDesk: "Contacter la Réception",
    selectCountry: "Sélectionnez le code pays",
    chooseLanguage: "Choisir la Langue",
    otpTitle: "Code de Vérification WhatsApp"
  },
  de: {
    splashTagline: "Wo Luxus auf den Horizont trifft",
    beginExperience: "Erlebnis beginnen",
    securingConnection: "Sicherung der Luxusverbindung...",
    selectLanguage: "Sprache wählen",
    welcome: "Willkommen",
    welcomeSub: "Ihr Luxusaufenthalt beginnt hier",
    checkin: "Check-in",
    checkinDesc: "Haben Sie bereits gebucht?\nChecken Sie ein und genießen Sie Ihren Aufenthalt.",
    dining: "Exquisite Gastronomie",
    spa: "Spa & Wellness",
    services: "Erstklassiger Service",
    experiences: "Unvergessliche Erlebnisse",
    footerMsg: "Wir sind hier, um Ihren Aufenthalt außergewöhnlich zu machen.",
    thankYou: "Vielen Dank!",
    checkinHeading: "Check-in",
    checkinSub: "Lassen Sie uns einchecken",
    verifyTitle: "Handynummer bestätigen",
    verifyDesc: "Wir senden Ihnen einen Bestätigungscode per WhatsApp, um Ihren Check-in abzuschließen.",
    mobileLabel: "Handynummer",
    waTitle: "Wir senden den Code per WhatsApp",
    waSub: "Stellen Sie sicher, dass WhatsApp installiert ist",
    sendCode: "Code per WhatsApp senden",
    secureNote: "Ihre Daten sind sicher und verschlüsselt",
    needHelp: "Brauchen Sie Hilfe?",
    contactDesk: "Rezeption kontaktieren",
    selectCountry: "Ländervorwahl auswählen",
    chooseLanguage: "Sprache Auswählen",
    otpTitle: "WhatsApp Bestätigungscode"
  },
  ru: {
    splashTagline: "Где роскошь встречается с горизонтом",
    beginExperience: "Начать путешествие",
    securingConnection: "Безопасное люксовое подключение...",
    selectLanguage: "Выберите язык",
    welcome: "Добро пожаловать",
    welcomeSub: "Ваш роскошный отдых начинается здесь",
    checkin: "Регистрация",
    checkinDesc: "У вас уже есть бронирование?\nЗарегистрируйтесь для доступа к услугам.",
    dining: "Изысканная кухня",
    spa: "Спа и оздоровление",
    services: "Первоклассный сервис",
    experiences: "Незабываемые впечатления",
    footerMsg: "Мы здесь, чтобы сделать ваш отдых незабываемым.",
    thankYou: "Спасибо!",
    checkinHeading: "Регистрация",
    checkinSub: "Давайте оформим ваше прибытие",
    verifyTitle: "Подтвердите номер телефона",
    verifyDesc: "Мы отправим код подтверждения в WhatsApp для завершения регистрации.",
    mobileLabel: "Номер мобильного",
    waTitle: "Мы отправим код в WhatsApp",
    waSub: "Убедитесь, что у вас установлен WhatsApp",
    sendCode: "Отправить код в WhatsApp",
    secureNote: "Ваша информация защищена и зашифрована",
    needHelp: "Нужна помощь?",
    contactDesk: "Связаться с ресепшн",
    selectCountry: "Выберите код страны",
    chooseLanguage: "Выберите язык",
    otpTitle: "Код подтверждения WhatsApp"
  }
};

let currentLang = 'en';

function initLanguageSelector() {
  const langBtn1 = document.getElementById('langBtn1');
  const langBtn2 = document.getElementById('langBtn2');
  const langModal = document.getElementById('langModal');

  const openLangModal = () => langModal.classList.add('open');
  langBtn1.addEventListener('click', openLangModal);
  langBtn2.addEventListener('click', openLangModal);
}

function closeLangModal() {
  document.getElementById('langModal').classList.remove('open');
}

function setLanguage(langKey) {
  currentLang = langKey;
  const dict = translations[langKey] || translations['en'];

  // Update flags & names
  const flags = { en: '🇬🇧', ar: '🇦🇪', fr: '🇫🇷', de: '🇩🇪', ru: '🇷🇺' };
  const names = { en: 'English', ar: 'العربية', fr: 'Français', de: 'Deutsch', ru: 'Русский' };

  document.getElementById('currentFlag1').textContent = flags[langKey];
  document.getElementById('currentLang1').textContent = names[langKey];
  document.getElementById('currentLang2').textContent = names[langKey];

  // Update i18n DOM elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT') {
        el.placeholder = dict[key];
      } else {
        el.innerText = dict[key];
      }
    }
  });

  // Handle RTL for Arabic
  if (langKey === 'ar') {
    document.body.style.direction = 'rtl';
  } else {
    document.body.style.direction = 'ltr';
  }

  closeLangModal();
}

/* --------------------------------------------------------------------------
   4. WHATSAPP OTP VERIFICATION ENGINE
   -------------------------------------------------------------------------- */
let countdownTimer;

function initOtpVerification() {
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  const phoneInput = document.getElementById('mobileNumberInput');
  const phoneInputBox = document.getElementById('phoneInputBox');
  const otpModal = document.getElementById('otpModal');

  sendCodeBtn.addEventListener('click', () => {
    const rawVal = phoneInput.value.trim();
    if (rawVal.length < 5) {
      // Highlight error
      phoneInputBox.style.borderColor = '#ef4444';
      phoneInputBox.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.4)';
      setTimeout(() => {
        phoneInputBox.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        phoneInputBox.style.boxShadow = 'none';
      }, 1800);
      return;
    }

    // Display formatted phone in OTP dialog
    const fullPhone = `${selectedCountry.dial} ${rawVal}`;
    document.getElementById('otpDisplayPhone').textContent = fullPhone;

    // Show modal & start timer
    otpModal.classList.add('open');
    startOtpCountdown();

    // Clear inputs and focus first box
    const otpDigits = document.querySelectorAll('.otp-digit');
    otpDigits.forEach(input => input.value = '');
    setTimeout(() => otpDigits[0].focus(), 250);
  });

  // Auto-advancing OTP digit inputs
  const otpDigits = document.querySelectorAll('.otp-digit');
  otpDigits.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.length === 1 && idx < otpDigits.length - 1) {
        otpDigits[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && idx > 0) {
        otpDigits[idx - 1].focus();
      }
    });
  });

  // Confirm OTP Button
  document.getElementById('confirmOtpBtn').addEventListener('click', () => {
    let pin = '';
    otpDigits.forEach(box => pin += box.value);
    
    if (pin.length < 4) {
      otpDigits.forEach(box => {
        box.style.borderColor = '#ef4444';
      });
      setTimeout(() => {
        otpDigits.forEach(box => box.style.borderColor = 'rgba(255, 255, 255, 0.15)');
      }, 1500);
      return;
    }

    // Show Success State
    document.getElementById('otpBodyContent').style.display = 'none';
    document.getElementById('otpSuccessState').style.display = 'flex';
    clearInterval(countdownTimer);
  });

  // Resend Button listener
  document.getElementById('resendBtn').addEventListener('click', function() {
    if (!this.disabled) {
      startOtpCountdown();
    }
  });
}

function startOtpCountdown() {
  let seconds = 45;
  const timerDisplay = document.getElementById('timerCountdown');
  const resendBtn = document.getElementById('resendBtn');
  
  resendBtn.disabled = true;
  resendBtn.className = 'btn-resend-disabled';
  timerDisplay.textContent = seconds;

  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    seconds--;
    timerDisplay.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      resendBtn.disabled = false;
      resendBtn.className = 'btn-resend-active';
    }
  }, 1000);
}

function closeOtpModal() {
  document.getElementById('otpModal').classList.remove('open');
  clearInterval(countdownTimer);
}

/* --------------------------------------------------------------------------
   5. FEATURE MODALS (DINING, SPA, SERVICES, EXPERIENCES)
   -------------------------------------------------------------------------- */
const featureDetails = {
  dining: {
    title: "Delicious Dining",
    icon: "🍽️",
    desc: "Savor Extraordinary Culinary Creations: Experience 17 world-class restaurants, including signature dining by celebrity chefs Nobu Matsuhisa, Heston Blumenthal, and José Andrés."
  },
  spa: {
    title: "Spa & Wellness",
    icon: "🧘‍♀️",
    desc: "AWAKEN Wellness: Rejuvenate body and mind at our 5,000 sq m holistic spa featuring VIP treatment suites, hammam rituals, sound baths, and infinity wellness pools."
  },
  services: {
    title: "World Class Services",
    icon: "🧳",
    desc: "Royal Butler Service: Enjoy 24/7 personalized butler care, private airport limousine transfers, personal shopping concierges, and instant check-in assistance."
  },
  experiences: {
    title: "Memorable Experiences",
    icon: "✨",
    desc: "Cloud 22 & Aquaventure: Bask at our sky-high infinity pool overlooking the Dubai skyline, enjoy private beach cabanas, and complimentary access to Aquaventure Waterpark."
  }
};

function openFeatureModal(key) {
  const info = featureDetails[key];
  if (!info) return;

  document.getElementById('featureModalTitle').textContent = info.title;
  document.getElementById('featureModalIcon').textContent = info.icon;
  document.getElementById('featureModalDesc').textContent = info.desc;

  document.getElementById('featureModal').classList.add('open');
}

function closeFeatureModal() {
  document.getElementById('featureModal').classList.remove('open');
}

/* --------------------------------------------------------------------------
   6. FRONT DESK ASSISTANCE MODAL
   -------------------------------------------------------------------------- */
function initFrontDeskModal() {
  const trigger = document.getElementById('frontDeskTrigger');
  const modal = document.getElementById('frontDeskModal');

  trigger.addEventListener('click', () => {
    modal.classList.add('open');
  });
}

function closeFrontDeskModal() {
  document.getElementById('frontDeskModal').classList.remove('open');
}

function simulateFrontDeskAction(actionType) {
  closeFrontDeskModal();
  if (actionType === 'call') {
    alert("Connecting to Atlantis The Royal Concierge Priority Line (+971 4 426 0000)...");
  } else if (actionType === 'chat') {
    alert("Opening WhatsApp Royal Butler Live Chat...");
  } else if (actionType === 'callback') {
    alert("In-Person Greeting Request Sent! A Royal Host will meet you at the Lobby.");
  }
}

/* --------------------------------------------------------------------------
   7. DESKTOP DEVICE FRAME TOGGLE
   -------------------------------------------------------------------------- */
function initDeviceFrameToggle() {
  const toggleBtn = document.getElementById('toggleFrameBtn');
  const toggleText = document.getElementById('toggleText');

  // Default to frame-mode on desktop
  if (window.innerWidth > 600) {
    document.body.classList.add('frame-mode');
    toggleText.textContent = "Fullscreen View";
  }

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('frame-mode')) {
      document.body.classList.remove('frame-mode');
      document.body.classList.add('full-mode');
      toggleText.textContent = "Mobile Frame View";
    } else {
      document.body.classList.remove('full-mode');
      document.body.classList.add('frame-mode');
      toggleText.textContent = "Fullscreen View";
    }
  });
}
