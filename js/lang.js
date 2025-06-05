
const translations = {
  ar: {
    title: "صقر العرب اليماني",
    welcome: "مرحبآ بكم في موقعي المتواضع، أخوكم صقر العرب اليماني يرحب بكم",
    home: "الرئيسية",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    chat: "شات الموقع",
    about: "من نحن"
  },
  en: {
    title: "Saqr Alarab Alyemeni",
    welcome: "Welcome to my humble website. Yours truly, Saqr Alarab Alyemeni welcomes you!",
    home: "Home",
    login: "Login",
    signup: "Sign Up",
    chat: "Site Chat",
    about: "About Us"
  }
};

function switchLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
