import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';

const savedLang = localStorage.getItem('fci_language') || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    lng: savedLang,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

// Apply dir and lang immediately on load
document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLang;

// Persist language and apply dir/lang on every language change
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('fci_language', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
