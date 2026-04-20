import type { Locale } from "@/lib/store"

type Bi = { uk: string; en: string }
type BiList = { uk: string[]; en: string[] }

export interface Tour {
  id: string
  slug: string
  image: string
  nights: number
  price: number
  rating: number
  title: Bi
  country: Bi
  city: Bi
  hotel: Bi
  meal: Bi
  description: Bi
  included: BiList
}

export interface LocalizedTour {
  id: string
  slug: string
  image: string
  nights: number
  price: number
  rating: number
  title: string
  country: string
  city: string
  hotel: string
  meal: string
  description: string
  included: string[]
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "turkey-antalya",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80",
    nights: 7,
    price: 28900,
    rating: 4.8,
    title: {
      uk: "Анталія, готель Delphin Be Grand",
      en: "Antalya, Delphin Be Grand"
    },
    country: { uk: "Туреччина", en: "Turkey" },
    city: { uk: "Анталія", en: "Antalya" },
    hotel: { uk: "Delphin Be Grand 5★", en: "Delphin Be Grand 5★" },
    meal: { uk: "Ultra All Inclusive", en: "Ultra All Inclusive" },
    description: {
      uk: "Готель на першій береговій лінії. Три басейни, свій пляж, клуб і аніматори для дітей.",
      en: "Beachfront hotel with three pools, a private beach and a kids club with animators."
    },
    included: {
      uk: [
        "Переліт Київ — Анталія",
        "Трансфер з аеропорту",
        "Харчування Ultra All Inclusive",
        "Медична страховка"
      ],
      en: [
        "Flight Kyiv — Antalya",
        "Airport transfer",
        "Ultra All Inclusive meals",
        "Medical insurance"
      ]
    }
  },
  {
    id: "2",
    slug: "egypt-sharm",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80",
    nights: 10,
    price: 32500,
    rating: 4.7,
    title: {
      uk: "Шарм-ель-Шейх, Reef Oasis",
      en: "Sharm El Sheikh, Reef Oasis"
    },
    country: { uk: "Єгипет", en: "Egypt" },
    city: { uk: "Шарм-ель-Шейх", en: "Sharm El Sheikh" },
    hotel: { uk: "Reef Oasis Blue Bay 5★", en: "Reef Oasis Blue Bay 5★" },
    meal: { uk: "All Inclusive", en: "All Inclusive" },
    description: {
      uk: "Власний кораловий риф біля берега — ідеально для снорклінгу та дайвінгу.",
      en: "Private coral reef right at the shore — perfect for snorkelling and diving."
    },
    included: {
      uk: ["Переліт та трансфер", "10 ночей, All Inclusive", "Безкоштовна маска й ласти", "Медична страховка"],
      en: ["Flight and transfer", "10 nights, All Inclusive", "Free mask and fins", "Medical insurance"]
    }
  },
  {
    id: "3",
    slug: "greece-crete",
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
    nights: 8,
    price: 41200,
    rating: 4.9,
    title: {
      uk: "Крит, автотур на тиждень",
      en: "Crete, a week-long road trip"
    },
    country: { uk: "Греція", en: "Greece" },
    city: { uk: "Іракліон", en: "Heraklion" },
    hotel: { uk: "Бутік-готелі 3–4★", en: "Boutique 3–4★ hotels" },
    meal: { uk: "Сніданки", en: "Breakfast" },
    description: {
      uk: "Маршрут островом з групою до 8 осіб. Іракліон, Ханія, Ретимно, Елунда.",
      en: "Island route with a group of up to 8 people. Heraklion, Chania, Rethymno, Elounda."
    },
    included: {
      uk: ["Оренда авто", "Проживання в сімейних готелях", "Український гід-водій", "Гастровечір у селі Аногія"],
      en: ["Car rental", "Stay in family-run hotels", "Ukrainian-speaking guide-driver", "Food evening in Anogia village"]
    }
  },
  {
    id: "4",
    slug: "georgia-gudauri",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80",
    nights: 6,
    price: 21500,
    rating: 4.6,
    title: { uk: "Гудаурі, тиждень на схилах", en: "Gudauri, a week on the slopes" },
    country: { uk: "Грузія", en: "Georgia" },
    city: { uk: "Гудаурі", en: "Gudauri" },
    hotel: { uk: "Marco Polo Hotel 4★", en: "Marco Polo Hotel 4★" },
    meal: { uk: "Напівпансіон", en: "Half board" },
    description: {
      uk: "Катання на висоті 2200 м, широкі траси для початківців і фрірайдерів.",
      en: "Skiing at 2200 m elevation, wide slopes for beginners and freeriders."
    },
    included: {
      uk: ["Ski-pass на 5 днів", "Прокат на 3 дні", "Трансфер Тбілісі — Гудаурі", "Сауна в готелі"],
      en: ["5-day ski pass", "Gear rental for 3 days", "Tbilisi — Gudauri transfer", "Hotel sauna"]
    }
  },
  {
    id: "5",
    slug: "italy-rome",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80",
    nights: 5,
    price: 38700,
    rating: 4.8,
    title: { uk: "Рим і Флоренція", en: "Rome and Florence" },
    country: { uk: "Італія", en: "Italy" },
    city: { uk: "Рим", en: "Rome" },
    hotel: { uk: "Hotel Artemide 4★", en: "Hotel Artemide 4★" },
    meal: { uk: "Сніданки", en: "Breakfast" },
    description: {
      uk: "Ранкові екскурсії та вільний вечір. Музеї Ватикану, Уффіці, дегустація к’янті.",
      en: "Morning excursions and free evenings. Vatican Museums, Uffizi, Chianti tasting."
    },
    included: {
      uk: ["Авіаквитки Київ — Рим", "Поїзд між містами", "Екскурсії з гідами", "Квитки до Колізею та Уффіці"],
      en: ["Flight Kyiv — Rome", "Train between cities", "Guided tours", "Tickets to the Colosseum and Uffizi"]
    }
  },
  {
    id: "6",
    slug: "montenegro-budva",
    image:
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200&q=80",
    nights: 9,
    price: 26400,
    rating: 4.5,
    title: { uk: "Сімейна Будва", en: "Family Budva" },
    country: { uk: "Чорногорія", en: "Montenegro" },
    city: { uk: "Будва", en: "Budva" },
    hotel: { uk: "Hotel Slovenska Plaža 4★", en: "Hotel Slovenska Plaža 4★" },
    meal: { uk: "Напівпансіон", en: "Half board" },
    description: {
      uk: "Спокійний курорт, просторі пляжі, міні-клуб для дітей, старе місто поруч.",
      en: "Quiet resort, spacious beaches, kids mini-club, old town nearby."
    },
    included: {
      uk: ["Сніданок і вечеря", "Ранкова йога", "Анімація для дітей", "Водна гірка"],
      en: ["Breakfast and dinner", "Morning yoga", "Kids animation programme", "Water slide"]
    }
  }
]

export function localizeTour(tour: Tour, locale: Locale): LocalizedTour {
  return {
    id: tour.id,
    slug: tour.slug,
    image: tour.image,
    nights: tour.nights,
    price: tour.price,
    rating: tour.rating,
    title: tour.title[locale],
    country: tour.country[locale],
    city: tour.city[locale],
    hotel: tour.hotel[locale],
    meal: tour.meal[locale],
    description: tour.description[locale],
    included: tour.included[locale]
  }
}
