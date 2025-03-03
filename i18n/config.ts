import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from './locales/en';
import es from './locales/es';

// Configure i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

export default i18next;
