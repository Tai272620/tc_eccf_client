import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './translation/en';
import vi from './translation/vi';
import jp from './translation/jp';

function setLocalLanguage(): string {
  let locales = localStorage.getItem("locales");
  return locales ? locales : 'en'
}

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  lng: setLocalLanguage(),
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
    jp: {
      translation: jp,
    },
  },
});

export default i18n