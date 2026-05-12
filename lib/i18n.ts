import { useLocale, type Locale } from "@/lib/store"

export const translations = {
  uk: {
    brand: "Туристична компанія",
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
      rights: "Усі права захищені.",
      address: "м. Київ, вул. Саксаганського 28"
    },
    home: {
      heroTitle: "Подорож, яку хочеться згадувати роками",
      heroDescription:
        "Підбираємо тури до Туреччини, Єгипту, Греції та інших країн. Понад 180 напрямків, супровід 24/7.",
      popularEyebrow: "Пропозиції тижня",
      popularTitle: "Популярні тури",
      allTours: "Всі тури",
      featuresTitle: "Чому обирають нас",
      featuresDesc: "Понад 12 років на ринку, більше 40 000 щасливих клієнтів.",
      featureLicensed: "Ліцензована компанія",
      featureLicensedText: "Працюємо за ліцензією ДААС із 2012 року.",
      featurePrice: "Гарантія ціни",
      featurePriceText: "Знайдете дешевше — повернемо різницю.",
      featureSupport: "Менеджер 24/7",
      featureSupportText: "На зв’язку від бронювання до повернення додому."
    },
    search: {
      destination: "Куди",
      destinationPh: "Країна або курорт",
      date: "Дата",
      travelers: "Туристів",
      submit: "Шукати",
      travelersPicker: {
        title: "Кількість туристів",
        adults: "Дорослі",
        adultsHint: "12 років і старше",
        children: "Діти",
        childrenHint: "Від 2 до 11 років",
        infants: "Немовлята",
        infantsHint: "Молодші 2 років",
        done: "Готово",
        summary: (n: number) => {
          const mod10 = n % 10
          const mod100 = n % 100
          if (mod10 === 1 && mod100 !== 11) return `${n} турист`
          if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} туристи`
          return `${n} туристів`
        }
      }
    },
    card: {
      from: "від",
      details: "Детальніше"
    },
    toursPage: {
      title: "Каталог турів",
      description: "Усі актуальні пропозиції нашої компанії.",
      foundBefore: "Знайдено",
      foundAfter: "турів",
      sortLabel: "Сортувати:",
      sortOptions: ["Популярні", "Спершу дешеві", "Спершу дорогі", "За рейтингом"]
    },
    tourDetail: {
      breadcrumbHome: "Головна",
      breadcrumbTours: "Тури",
      duration: "Тривалість",
      meal: "Харчування",
      rating: "Рейтинг",
      about: "Про тур",
      included: "Що включено",
      priceFrom: "Ціна від",
      priceNote: "на 2 дорослих з перельотом",
      book: "Забронювати",
      askManager: "Запитати менеджера"
    },
    about: {
      title: "Про компанію",
      description:
        "Організовуємо подорожі з 2012 року. Знаємо регіони з перших рук, самі зупиняємось у готелях перш ніж пропонувати їх.",
      stats: {
        years: "років на ринку",
        destinations: "напрямків",
        clients: "клієнтів",
        rating: "середня оцінка"
      },
      storyTitle: "Наша історія",
      storyPar1:
        "У 2012 році троє друзів поверталися з поїздки на Крит і не могли знайти туроператора, який сам побував у готелі, куди відправляє клієнтів. Саме з цього питання починалася компанія «Мандри Світу».",
      storyPar2:
        "Сьогодні у нас 23 людини в команді, понад 180 напрямків у каталозі, і головне — кожен готель перевірений особисто менеджером або постійним клієнтом.",
      storyPar3:
        "Ми не продаємо «коти в мішку» — якщо не були в готелі самі, прямо кажемо про це та допомагаємо знайти альтернативу з відгуками."
    },
    contacts: {
      title: "Контакти",
      description: "Заходьте в офіс або пишіть у зручному месенджері.",
      officeTitle: "Офіс",
      officeLines: ["м. Київ", "вул. Саксаганського 28, офіс 14"],
      phoneTitle: "Телефон",
      emailTitle: "Пошта",
      scheduleTitle: "Графік",
      scheduleLines: ["Пн–Пт: 9:00 — 19:00", "Сб: 10:00 — 16:00"],
      formTitle: "Напишіть нам",
      formDesc: "Опишіть очікування від відпочинку — менеджер підбере варіанти."
    },
    contactForm: {
      name: "Ваше ім’я",
      namePh: "Олена",
      phone: "Телефон",
      phonePh: "+380 __ ___ __ __",
      email: "E-mail",
      emailPh: "you@example.com",
      message: "Повідомлення",
      messagePh: "Напишіть, куди хочете поїхати та на скільки днів",
      submit: "Надіслати заявку",
      submitting: "Надсилаємо...",
      successTitle: "Заявку прийнято",
      successDesc: "Менеджер зв’яжеться з вами протягом 15 хвилин.",
      successAgain: "Надіслати ще одну",
      errName: "Вкажіть ім’я",
      errPhone: "Вкажіть телефон",
      errEmail: "Невірний e-mail",
      errMessage: "Опишіть ваш запит"
    },
    loginPage: {
      title: "Вхід в особистий кабінет",
      subtitle: "Ще не маєте акаунта?",
      contactLink: "Зв’яжіться з нами",
      email: "E-mail",
      emailPh: "you@example.com",
      password: "Пароль",
      passwordPh: "••••••••",
      submit: "Увійти",
      errEmail: "Невірний e-mail",
      errPassword: "Мінімум 8 символів"
    }
  },

  en: {
    brand: "Travel Agency",
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
      rights: "All rights reserved.",
      address: "Kyiv, Saksahanskoho St. 28"
    },
    home: {
      heroTitle: "A trip you will remember for years",
      heroDescription:
        "We pick tours to Turkey, Egypt, Greece and other countries. Over 180 destinations, 24/7 support.",
      popularEyebrow: "Deals of the week",
      popularTitle: "Popular tours",
      allTours: "All tours",
      featuresTitle: "Why travellers choose us",
      featuresDesc: "12+ years on the market, more than 40,000 happy clients.",
      featureLicensed: "Licensed agency",
      featureLicensedText: "Operating under the state travel licence since 2012.",
      featurePrice: "Best price guarantee",
      featurePriceText: "Find a cheaper offer and we will refund the difference.",
      featureSupport: "24/7 manager",
      featureSupportText: "In touch from booking until you are back home."
    },
    search: {
      destination: "Where",
      destinationPh: "Country or resort",
      date: "Date",
      travelers: "Travellers",
      submit: "Search",
      travelersPicker: {
        title: "Number of travellers",
        adults: "Adults",
        adultsHint: "12 years and older",
        children: "Children",
        childrenHint: "Age 2 – 11",
        infants: "Infants",
        infantsHint: "Under 2 years",
        done: "Done",
        summary: (n: number) => (n === 1 ? "1 traveller" : `${n} travellers`)
      }
    },
    card: {
      from: "from",
      details: "Details"
    },
    toursPage: {
      title: "Tour catalogue",
      description: "All current offers of our agency.",
      foundBefore: "Found",
      foundAfter: "tours",
      sortLabel: "Sort by:",
      sortOptions: ["Popular", "Cheapest first", "Most expensive first", "By rating"]
    },
    tourDetail: {
      breadcrumbHome: "Home",
      breadcrumbTours: "Tours",
      duration: "Duration",
      meal: "Meals",
      rating: "Rating",
      about: "About the tour",
      included: "What is included",
      priceFrom: "Price from",
      priceNote: "for 2 adults, flight included",
      book: "Book now",
      askManager: "Ask a manager"
    },
    about: {
      title: "About the company",
      description:
        "Arranging trips since 2012. We know our destinations first-hand and stay at the hotels ourselves before offering them to you.",
      stats: {
        years: "years on the market",
        destinations: "destinations",
        clients: "clients",
        rating: "average rating"
      },
      storyTitle: "Our story",
      storyPar1:
        "In 2012 three friends came back from Crete and couldn’t find a travel agency whose staff had actually stayed in the hotels they were selling. That question became the starting point of Mandry Svitu.",
      storyPar2:
        "Today we are a team of 23, with more than 180 destinations in the catalogue — and, most importantly, every hotel has been personally verified by a manager or a returning client.",
      storyPar3:
        "We don’t sell cats in a bag. If we haven’t been to the hotel ourselves, we say so and help you pick a verified alternative."
    },
    contacts: {
      title: "Contacts",
      description: "Drop by our office or message us on any messenger.",
      officeTitle: "Office",
      officeLines: ["Kyiv", "Saksahanskoho St. 28, office 14"],
      phoneTitle: "Phone",
      emailTitle: "Email",
      scheduleTitle: "Opening hours",
      scheduleLines: ["Mon–Fri: 9:00 — 19:00", "Sat: 10:00 — 16:00"],
      formTitle: "Write to us",
      formDesc: "Describe your expectations — a manager will put together options for you."
    },
    contactForm: {
      name: "Your name",
      namePh: "Jane",
      phone: "Phone",
      phonePh: "+1 ___ ___ __ __",
      email: "Email",
      emailPh: "you@example.com",
      message: "Message",
      messagePh: "Tell us where and for how long you want to go",
      submit: "Send request",
      submitting: "Sending...",
      successTitle: "Request received",
      successDesc: "A manager will contact you within 15 minutes.",
      successAgain: "Send another",
      errName: "Please enter your name",
      errPhone: "Please enter your phone",
      errEmail: "Invalid email",
      errMessage: "Please describe your request"
    },
    loginPage: {
      title: "Sign in to your account",
      subtitle: "Don’t have an account yet?",
      contactLink: "Contact us",
      email: "Email",
      emailPh: "you@example.com",
      password: "Password",
      passwordPh: "••••••••",
      submit: "Log in",
      errEmail: "Invalid email",
      errPassword: "At least 8 characters"
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

export function pluralNights(n: number, locale: Locale) {
  if (locale === "en") return n === 1 ? "night" : "nights"
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return "ніч"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "ночі"
  return "ночей"
}
