// Простий i18n: словник UK/EN. Хук useT() читає поточну локаль зі стору й повертає потрібну гілку.
// Окремих файлів на мову робити не став — для дипломної досить одного об'єкта.
import { useLocale, type Locale } from "@/lib/store"

export const translations = {
  uk: {
    brand: "Туристична компанія",
    nav: {
      home: "Головна",
      tours: "Тури",
      articles: "Блог",
      about: "Про нас",
      contacts: "Контакти"
    },
    articles: {
      title: "Блог",
      description: "Поради, гайди й новини з туристичного світу.",
      backToList: "Усі статті"
    },
    login: "Увійти",
    footer: {
      menu: "Меню",
      contacts: "Контакти",
      legal: "Документи",
      privacy: "Політика конфіденційності",
      terms: "Договір оферти",
      cookies: "Cookie",
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
      featuresDesc: "Понад 12 років на ринку, більше 42 000 щасливих клієнтів.",
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
      dateFrom: "Виїзд з",
      dateTo: "Поверн. до",
      datesInvalid: "Дата повернення має бути не раніше дати виїзду",
      travelers: "Туристів",
      submit: "Шукати",
      submitHint: "Виберіть країну або дату",
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
      details: "Детальніше",
      hot: "Гарячий"
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
      askManager: "Запитати менеджера",
      similar: "Схожі тури"
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
      namePh: "Ваше ім’я",
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
      errNameChars: "Тільки літери, пробіл, дефіс, апостроф",
      errPhone: "Вкажіть телефон",
      errEmailEmpty: "Вкажіть e-mail",
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
    },
    bookings: {
      title: "Мої бронювання",
      empty: "Бронювань поки немає.",
      browse: "Переглянути каталог",
      backToAccount: "← Особистий кабінет",
      departure: "Виїзд",
      nights: "ноч.",
      adults: "доросл.",
      children: "діт."
    },
    account: {
      hi: "Вітаємо",
      bookings: "Бронювання",
      favorites: "Обране",
      loyalty: "Кешбек лояльності",
      recentBookings: "Останні бронювання",
      allBookings: "Усі бронювання",
      noBookings: "Бронювань ще немає.",
      browseTours: "Переглянути тури",
      back: "← Особистий кабінет",
      settings: "Налаштування профілю"
    },
    settings: {
      title: "Налаштування профілю",
      description: "Тут можна оновити ім'я, прізвище та номер телефону.",
      firstName: "Ім'я",
      lastName: "Прізвище",
      phone: "Телефон",
      email: "E-mail (не редагується)",
      save: "Зберегти",
      saving: "Зберігаємо...",
      saved: "Дані оновлено",
      errFirst: "Вкажіть ім'я",
      errLast: "Вкажіть прізвище"
    },
    notFound: {
      description: "Цю сторінку не знайдено. Можливо, тур уже зняли з продажу.",
      home: "На головну",
      tours: "Дивитись каталог"
    },
    activeFilters: {
      label: "Активні фільтри",
      clearAll: "Скинути все",
      hot: "Тільки гарячі",
      type: {
        BEACH: "Пляжний",
        EXCURSION: "Екскурсійний",
        SKI: "Гірськолижний",
        FAMILY: "Сімейний",
        CRUISE: "Круїз",
        CUSTOM: "Індивідуальний"
      }
    },
    favorites: {
      title: "Обране",
      description: "Тури, які ви зберегли.",
      empty: "Поки що немає збережених турів.",
      browse: "Переглянути каталог →",
      added: "Додано в обране",
      removed: "Видалено з обраного",
      add: "Додати в обране",
      remove: "Видалити з обраного"
    },
    userMenu: {
      logIn: "Увійти",
      signUp: "Реєстрація",
      account: "Особистий кабінет",
      bookings: "Мої бронювання",
      settings: "Налаштування",
      signOut: "Вийти"
    },
    authDialog: {
      welcomeBack: "З поверненням",
      createAccount: "Створіть акаунт",
      loginDesc: "Увійдіть, щоб бачити бронювання та обране.",
      registerDesc: "Зареєструйтесь, щоб зберігати тури та керувати бронюваннями.",
      loginTab: "Увійти",
      registerTab: "Реєстрація",
      email: "E-mail",
      password: "Пароль",
      repeat: "Повторіть пароль",
      firstName: "Ім'я",
      lastName: "Прізвище",
      phone: "Телефон",
      submitLogin: "Увійти",
      submittingLogin: "Входимо...",
      submitRegister: "Створити акаунт",
      submittingRegister: "Створюємо...",
      errEmail: "Невірний e-mail",
      errPassword: "Мінімум 8 символів",
      errRequired: "Обов'язкове поле",
      errPasswordsMismatch: "Паролі не співпадають",
      errWrong: "Невірний e-mail або пароль",
      errEmailUsed: "E-mail вже використовується",
      errConsent: "Потрібна згода на обробку персональних даних",
      registrationFailed: "Не вдалось зареєструватись",
      rememberMe: "Запам'ятати мене",
      forgotPassword: "Забули пароль?",
      forgotInfo: "Зв'яжіться з менеджером — він допоможе скинути пароль.",
      consent: "Я погоджуюсь з обробкою моїх персональних даних відповідно до Політики конфіденційності."
    },
    bookingForm: {
      departure: "Дата виїзду",
      adults: "Дорослі",
      children: "Діти",
      nights: "Ночей",
      baseDuration: (n: number) => `Базова тривалість туру: ${n} ноч.`,
      comment: "Коментар",
      commentPh: "Маєте побажання? (необов’язково)",
      total: "Разом",
      breakdown: (adults: number, children: number, nights: number) => {
        // Складаємо рядок без зайвих пробілів. Для UA — повні слова замість «доросл./діт.».
        const adultsWord = adults === 1 ? "дорослий" : "дорослих"
        const childrenWord = children === 1 ? "дитина" : children >= 2 && children <= 4 ? "дитини" : "дітей"
        const parts = [`${adults} ${adultsWord}`]
        if (children > 0) parts.push(`${children} ${childrenWord}`)
        parts.push(`${nights} ${nights === 1 ? "ніч" : nights >= 2 && nights <= 4 ? "ночі" : "ночей"}`)
        return parts.join(" · ")
      },
      signInPrompt: "Увійдіть, щоб забронювати цей тур.",
      signInButton: "Увійти / Зареєструватися",
      submit: "Забронювати",
      submitting: "Бронюємо...",
      successTitle: "Заявку прийнято",
      successDesc: "Менеджер зв’яжеться з вами протягом 15 хвилин для підтвердження.",
      adultsError: "Від 1 до 10",
      childrenError: "Від 0 до 10",
      nightsError: "Від 1 до 30",
      contactNote: "Менеджер зателефонує на:",
      contactNoPhone: "У вашому профілі немає телефону. Менеджер напише на e-mail.",
      dateFrom: "Виїзд з",
      dateTo: "Повернення до",
      datesError: "Перевірте діапазон дат (макс. 30 ночей)",
      computedNights: (n: number) => `Тривалість поїздки: ${n} ${n === 1 ? "ніч" : n >= 2 && n <= 4 ? "ночі" : "ночей"}`
    }
  },

  en: {
    brand: "Travel Agency",
    nav: {
      home: "Home",
      tours: "Tours",
      articles: "Blog",
      about: "About",
      contacts: "Contacts"
    },
    articles: {
      title: "Blog",
      description: "Tips, guides and news from the travel world.",
      backToList: "All articles"
    },
    login: "Log in",
    footer: {
      menu: "Menu",
      contacts: "Contacts",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookies",
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
      featuresDesc: "12+ years on the market, more than 42,000 happy clients.",
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
      dateFrom: "From",
      dateTo: "To",
      datesInvalid: "Return date must be on or after the departure date",
      travelers: "Travellers",
      submit: "Search",
      submitHint: "Pick a destination or date",
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
      details: "Details",
      hot: "Hot"
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
      askManager: "Ask a manager",
      similar: "Similar tours"
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
        "In 2012 three friends came back from Crete and couldn’t find a travel agency whose staff had actually stayed in the hotels they were selling. That question became the starting point of our company.",
      storyPar2:
        "Today we are a team of 23, with more than 180 destinations in the catalogue — and, most importantly, every hotel has been personally verified by a manager or a returning client.",
      storyPar3:
        "We don’t sell sight-unseen. If we haven’t stayed at the hotel ourselves, we say so up front and help you pick a verified alternative."
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
      namePh: "Your name",
      phone: "Phone",
      phonePh: "+380 __ ___ __ __",
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
      errNameChars: "Letters, spaces, hyphens and apostrophes only",
      errPhone: "Please enter your phone",
      errEmailEmpty: "Please enter your email",
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
    },
    bookings: {
      title: "My bookings",
      empty: "No bookings yet.",
      browse: "Browse tours",
      backToAccount: "← Account",
      departure: "Departure",
      nights: "nights",
      adults: "adults",
      children: "children"
    },
    account: {
      hi: "Hi",
      bookings: "Bookings",
      favorites: "Favorites",
      loyalty: "Loyalty cashback",
      recentBookings: "Recent bookings",
      allBookings: "All bookings",
      noBookings: "You don't have bookings yet.",
      browseTours: "Browse tours",
      back: "← Account",
      settings: "Profile settings"
    },
    settings: {
      title: "Profile settings",
      description: "Update your first name, last name and phone here.",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      email: "Email (read-only)",
      save: "Save",
      saving: "Saving...",
      saved: "Profile updated",
      errFirst: "Enter your first name",
      errLast: "Enter your last name"
    },
    notFound: {
      description: "We couldn’t find this page. The tour may have been removed.",
      home: "Back to home",
      tours: "Browse tours"
    },
    activeFilters: {
      label: "Active filters",
      clearAll: "Clear all",
      hot: "Hot only",
      type: {
        BEACH: "Beach",
        EXCURSION: "Excursion",
        SKI: "Ski",
        FAMILY: "Family",
        CRUISE: "Cruise",
        CUSTOM: "Custom"
      }
    },
    favorites: {
      title: "Favorites",
      description: "Tours you have saved.",
      empty: "No saved tours yet.",
      browse: "Browse catalogue →",
      added: "Added to favorites",
      removed: "Removed from favorites",
      add: "Add to favorites",
      remove: "Remove from favorites"
    },
    userMenu: {
      logIn: "Log in",
      signUp: "Sign up",
      account: "My account",
      bookings: "My bookings",
      settings: "Settings",
      signOut: "Sign out"
    },
    authDialog: {
      welcomeBack: "Welcome back",
      createAccount: "Create account",
      loginDesc: "Sign in to see your bookings and favorites.",
      registerDesc: "Register to save tours and manage your bookings.",
      loginTab: "Log in",
      registerTab: "Register",
      email: "Email",
      password: "Password",
      repeat: "Repeat password",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone",
      submitLogin: "Log in",
      submittingLogin: "Signing in...",
      submitRegister: "Create account",
      submittingRegister: "Creating...",
      errEmail: "Invalid email",
      errPassword: "Min 8 characters",
      errRequired: "Required",
      errPasswordsMismatch: "Passwords do not match",
      errWrong: "Wrong email or password",
      errEmailUsed: "Email already in use",
      errConsent: "You must consent to processing of personal data",
      registrationFailed: "Registration failed",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      forgotInfo: "Contact our manager — they will help you reset the password.",
      consent: "I agree to the processing of my personal data per the Privacy Policy."
    },
    bookingForm: {
      departure: "Departure date",
      adults: "Adults",
      children: "Children",
      nights: "Nights",
      baseDuration: (n: number) => `Base tour duration: ${n} night${n === 1 ? "" : "s"}`,
      comment: "Comment",
      commentPh: "Any preferences? (optional)",
      total: "Total",
      breakdown: (adults: number, children: number, nights: number) =>
        `${adults} adult${adults === 1 ? "" : "s"}${children > 0 ? `, ${children} child${children === 1 ? "" : "ren"}` : ""} · ${nights} night${nights === 1 ? "" : "s"}`,
      signInPrompt: "Sign in to book this tour.",
      signInButton: "Log in / Sign up",
      submit: "Book now",
      submitting: "Booking...",
      successTitle: "Booking received",
      successDesc: "A manager will contact you within 15 minutes to confirm details.",
      adultsError: "Between 1 and 10",
      childrenError: "Between 0 and 10",
      nightsError: "Between 1 and 30",
      contactNote: "The manager will call you at:",
      contactNoPhone: "No phone in your profile — the manager will email you.",
      dateFrom: "Departure",
      dateTo: "Return",
      datesError: "Check date range (max 30 nights)",
      computedNights: (n: number) => `Trip duration: ${n} night${n === 1 ? "" : "s"}`
    }
  }
} as const

// Хук для компонентів: повертає словник для активної локалі.
export function useT() {
  const { locale } = useLocale()
  return translations[locale]
}

// Не-хуковий варіант — для серверних утиліт, де хуки недоступні.
export function t(locale: Locale) {
  return translations[locale]
}

// Узгодження «ніч / ночі / ночей» по українському. Для EN — просто s/no s.
export function pluralNights(n: number, locale: Locale) {
  if (locale === "en") return n === 1 ? "night" : "nights"
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return "ніч"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "ночі"
  return "ночей"
}
