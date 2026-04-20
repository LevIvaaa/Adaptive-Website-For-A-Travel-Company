export interface Tour {
  id: string
  slug: string
  title: string
  country: string
  city: string
  image: string
  nights: number
  price: number
  rating: number
  hotel: string
  meal: string
  description: string
  included: string[]
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "turkey-antalya",
    title: "Анталія, готель Delphin Be Grand",
    country: "Туреччина",
    city: "Анталія",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80",
    nights: 7,
    price: 28900,
    rating: 4.8,
    hotel: "Delphin Be Grand 5★",
    meal: "Ultra All Inclusive",
    description:
      "Готель на першій береговій лінії. Три басейни, свій пляж, клуб і аніматори для дітей.",
    included: [
      "Переліт Київ — Анталія",
      "Трансфер з аеропорту",
      "Харчування Ultra All Inclusive",
      "Медична страховка"
    ]
  },
  {
    id: "2",
    slug: "egypt-sharm",
    title: "Шарм-ель-Шейх, Reef Oasis",
    country: "Єгипет",
    city: "Шарм-ель-Шейх",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80",
    nights: 10,
    price: 32500,
    rating: 4.7,
    hotel: "Reef Oasis Blue Bay 5★",
    meal: "All Inclusive",
    description:
      "Власний кораловий риф біля берега — ідеально для снорклінгу та дайвінгу.",
    included: [
      "Переліт та трансфер",
      "10 ночей, All Inclusive",
      "Безкоштовна маска й ласти",
      "Медична страховка"
    ]
  },
  {
    id: "3",
    slug: "greece-crete",
    title: "Крит, автотур на тиждень",
    country: "Греція",
    city: "Іракліон",
    image:
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80",
    nights: 8,
    price: 41200,
    rating: 4.9,
    hotel: "Бутік-готелі 3–4★",
    meal: "Сніданки",
    description:
      "Маршрут островом з групою до 8 осіб. Іракліон, Ханія, Ретимно, Елунда.",
    included: [
      "Оренда авто",
      "Проживання в сімейних готелях",
      "Український гід-водій",
      "Гастровечір у селі Аногія"
    ]
  },
  {
    id: "4",
    slug: "georgia-gudauri",
    title: "Гудаурі, тиждень на схилах",
    country: "Грузія",
    city: "Гудаурі",
    image:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80",
    nights: 6,
    price: 21500,
    rating: 4.6,
    hotel: "Marco Polo Hotel 4★",
    meal: "Напівпансіон",
    description:
      "Катання на висоті 2200 м, широкі траси для початківців і фрірайдерів.",
    included: [
      "Ski-pass на 5 днів",
      "Прокат на 3 дні",
      "Трансфер Тбілісі — Гудаурі",
      "Сауна в готелі"
    ]
  },
  {
    id: "5",
    slug: "italy-rome",
    title: "Рим і Флоренція",
    country: "Італія",
    city: "Рим",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1200&q=80",
    nights: 5,
    price: 38700,
    rating: 4.8,
    hotel: "Hotel Artemide 4★",
    meal: "Сніданки",
    description:
      "Ранкові екскурсії та вільний вечір. Музеї Ватикану, Уффіці, дегустація к’янті.",
    included: [
      "Авіаквитки Київ — Рим",
      "Поїзд між містами",
      "Екскурсії з гідами",
      "Квитки до Колізею та Уффіці"
    ]
  },
  {
    id: "6",
    slug: "montenegro-budva",
    title: "Сімейна Будва",
    country: "Чорногорія",
    city: "Будва",
    image:
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200&q=80",
    nights: 9,
    price: 26400,
    rating: 4.5,
    hotel: "Hotel Slovenska Plaža 4★",
    meal: "Напівпансіон",
    description:
      "Спокійний курорт, просторі пляжі, міні-клуб для дітей, старе місто поруч.",
    included: [
      "Сніданок і вечеря",
      "Ранкова йога",
      "Анімація для дітей",
      "Водна гірка"
    ]
  }
]
