import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          'Welcome to React.js': 'Welcome to React.js!',
        },
      },
      ru: {
        translations: {
          'Welcome to React.js': 'Добро пожаловать в React!',
          Ukraine: 'Украина',
        },
      },
      uk: {
        translations: {
          'Welcome to React.js': 'Ласкаво просимо в React!',
          Ukraine: 'Україна',
        },
      },
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

export default i18n;
