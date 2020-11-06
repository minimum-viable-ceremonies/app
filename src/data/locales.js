import locales  from "i18next"
import { initReactI18next } from 'react-i18next';

locales
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translations: require('../locales/app/en.yml') }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    interpolation: { escapeValue: false },
    react: { wait: true }
  })

locales.languages = ['en']

export default locales
