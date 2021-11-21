import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import ruCommon from './locales/ru/common.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  },
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: { common: enCommon },
    ru: { common: ruCommon }
  }
});

export default i18n;
