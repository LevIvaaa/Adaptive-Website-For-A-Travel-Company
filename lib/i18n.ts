import { useLocale, type Locale } from "@/lib/store"

export const translations = {
  uk: {
    nav: {
      home: "Головна",
      tours: "Тури",
      about: "Про нас",
      contacts: "Контакти"
    },
    login: "Увійти",
    footer: {
      menu: "Меню",
      contacts: "Контакти",
      tagline: "Туристична компанія. Перевірені готелі, чесні ціни, супровід 24/7.",
      rights: "Усі права захищені."
    }
  },
  en: {
    nav: {
      home: "Home",
      tours: "Tours",
      about: "About",
      contacts: "Contacts"
    },
    login: "Log in",
    footer: {
      menu: "Menu",
      contacts: "Contacts",
      tagline: "Travel agency. Trusted hotels, fair prices, 24/7 support.",
      rights: "All rights reserved."
    }
  }
} as const

export function useT() {
  const { locale } = useLocale()
  return translations[locale]
}

export function t(locale: Locale) {
  return translations[locale]
}
