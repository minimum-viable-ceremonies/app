import locales from 'i18next'
import { initReactI18next } from 'react-i18next'

export default file => {
  locales
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources: {
        en: { translations: require(`../locales/${file}/en.yml`) }
      },
      ns: ['translations'],
      defaultNS: 'translations',
      returnObjects: true,
      interpolation: { escapeValue: false },
      react: { wait: true }
    })
  locales.languages = ['en']
}
