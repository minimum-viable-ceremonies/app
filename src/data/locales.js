import locales  from "i18next"
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

locales
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    interpolation: { escapeValue: false },
    react: { wait: true },
    backend: {
      loadPath: `${process.env.FUNCTIONS_HOST}/mvc-translations`
    }
  })

locales.languages = ['en']

export default locales
