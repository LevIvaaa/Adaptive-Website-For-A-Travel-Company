import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

interface SeedInput {
  slug: string
  ukCountry: string
  enCountry: string
  ukCity: string
  enCity: string
  ukHotel: string
  enHotel: string
  type: "BEACH" | "EXCURSION" | "SKI" | "CRUISE" | "FAMILY" | "CUSTOM"
  nights: number
  price: number
  rating: number
  image: string
  meal?: string
  isHot?: boolean
  ukDescription?: string
  enDescription?: string
  ukIncluded?: string[]
  enIncluded?: string[]
}

const defaultMeal = {
  BEACH: "All Inclusive",
  EXCURSION: "Сніданки",
  SKI: "Напівпансіон",
  CRUISE: "Повний пансіон",
  FAMILY: "All Inclusive",
  CUSTOM: "Сніданки"
}

const defaultIncludedUk = ["Переліт у обидва боки", "Трансфер з аеропорту", "Проживання у готелі", "Страхування подорожуючих"]
const defaultIncludedEn = ["Return flight", "Airport transfer", "Hotel accommodation", "Travel insurance"]

function mk(t: SeedInput) {
  return {
    slug: t.slug,
    titleUk: `${t.ukCity}, ${t.ukHotel}`,
    titleEn: `${t.enCity}, ${t.enHotel}`,
    countryUk: t.ukCountry,
    countryEn: t.enCountry,
    cityUk: t.ukCity,
    cityEn: t.enCity,
    hotelUk: t.ukHotel,
    hotelEn: t.enHotel,
    mealUk: t.meal ?? defaultMeal[t.type],
    mealEn: t.meal ?? defaultMeal[t.type],
    descriptionUk:
      t.ukDescription ??
      `Тур у ${t.ukCity} (${t.ukCountry}). Перевірений готель ${t.ukHotel}, зручний трансфер та підтримка 24/7.`,
    descriptionEn:
      t.enDescription ??
      `Tour to ${t.enCity} (${t.enCountry}). Verified hotel ${t.enHotel}, comfortable transfer and 24/7 support.`,
    includedUk: JSON.stringify(t.ukIncluded ?? defaultIncludedUk),
    includedEn: JSON.stringify(t.enIncluded ?? defaultIncludedEn),
    type: t.type,
    nights: t.nights,
    price: t.price,
    rating: t.rating,
    image: t.image,
    isHot: t.isHot ?? false
  }
}

const tours: SeedInput[] = [
  // Туреччина (7)
  { slug: "turkey-antalya-delphin", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Анталія", enCity: "Antalya", ukHotel: "Delphin Be Grand 5★", enHotel: "Delphin Be Grand 5★", type: "BEACH", nights: 7, price: 28900, rating: 4.8, image: "/tours/turkey-antalya-delphin.png", meal: "Ultra All Inclusive", isHot: true },
  { slug: "turkey-bodrum-vogue", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Бодрум", enCity: "Bodrum", ukHotel: "Vogue Hotel 5★", enHotel: "Vogue Hotel 5★", type: "BEACH", nights: 10, price: 35200, rating: 4.7, image: "/tours/turkey-bodrum-vogue.jpg" },
  { slug: "turkey-belek-rixos", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Белек", enCity: "Belek", ukHotel: "Rixos Premium 5★", enHotel: "Rixos Premium 5★", type: "BEACH", nights: 7, price: 42100, rating: 4.9, image: "/tours/turkey-belek-rixos.jpg", isHot: true },
  { slug: "turkey-side-crystal", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Сіде", enCity: "Side", ukHotel: "Crystal Sunrise 5★", enHotel: "Crystal Sunrise 5★", type: "FAMILY", nights: 10, price: 31400, rating: 4.6, image: "/tours/turkey-side-crystal.jpg" },
  { slug: "turkey-kemer-sungate", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Кемер", enCity: "Kemer", ukHotel: "Sungate Port Royal 5★", enHotel: "Sungate Port Royal 5★", type: "FAMILY", nights: 7, price: 26800, rating: 4.5, image: "/tours/turkey-kemer-sungate.jpg" },
  { slug: "turkey-alanya-saphir", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Аланія", enCity: "Alanya", ukHotel: "Saphir Hotel 4★", enHotel: "Saphir Hotel 4★", type: "BEACH", nights: 14, price: 24500, rating: 4.3, image: "/tours/turkey-alanya-saphir.webp" },
  { slug: "turkey-marmaris-grand", ukCountry: "Туреччина", enCountry: "Turkey", ukCity: "Мармарис", enCity: "Marmaris", ukHotel: "Grand Yazici 5★", enHotel: "Grand Yazici 5★", type: "BEACH", nights: 7, price: 23900, rating: 4.4, image: "/tours/turkey-marmaris-grand.jpg" },

  // Єгипет (5)
  { slug: "egypt-sharm-reef", ukCountry: "Єгипет", enCountry: "Egypt", ukCity: "Шарм-ель-Шейх", enCity: "Sharm El Sheikh", ukHotel: "Reef Oasis Blue Bay 5★", enHotel: "Reef Oasis Blue Bay 5★", type: "BEACH", nights: 10, price: 32500, rating: 4.7, image: "/tours/egypt-sharm-reef.jpg" },
  { slug: "egypt-hurghada-steigenberger", ukCountry: "Єгипет", enCountry: "Egypt", ukCity: "Хургада", enCity: "Hurghada", ukHotel: "Steigenberger Aldau 5★", enHotel: "Steigenberger Aldau 5★", type: "BEACH", nights: 7, price: 27800, rating: 4.6, image: "/tours/egypt-hurghada-steigenberger.jpg", isHot: true },
  { slug: "egypt-marsa-alam-royal", ukCountry: "Єгипет", enCountry: "Egypt", ukCity: "Марса-Алам", enCity: "Marsa Alam", ukHotel: "Royal Tulip Beach 5★", enHotel: "Royal Tulip Beach 5★", type: "BEACH", nights: 10, price: 29600, rating: 4.5, image: "/tours/egypt-marsa-alam-royal.jpg" },
  { slug: "egypt-dahab-coral", ukCountry: "Єгипет", enCountry: "Egypt", ukCity: "Дахаб", enCity: "Dahab", ukHotel: "Coral Coast 4★", enHotel: "Coral Coast 4★", type: "BEACH", nights: 8, price: 22300, rating: 4.4, image: "/tours/egypt-dahab-coral.jpg" },
  { slug: "egypt-taba-mosaique", ukCountry: "Єгипет", enCountry: "Egypt", ukCity: "Таба", enCity: "Taba", ukHotel: "Mosaique Beach 5★", enHotel: "Mosaique Beach 5★", type: "BEACH", nights: 14, price: 36700, rating: 4.6, image: "/tours/egypt-taba-mosaique.jpg" },

  // Греція (6)
  { slug: "greece-crete-roadtrip", ukCountry: "Греція", enCountry: "Greece", ukCity: "Іракліон", enCity: "Heraklion", ukHotel: "Бутік-готелі 3–4★", enHotel: "Boutique 3–4★", type: "EXCURSION", nights: 8, price: 41200, rating: 4.9, image: "/tours/greece-crete-roadtrip.jpg" },
  { slug: "greece-rhodes-mitsis", ukCountry: "Греція", enCountry: "Greece", ukCity: "Родос", enCity: "Rhodes", ukHotel: "Mitsis Grand 5★", enHotel: "Mitsis Grand 5★", type: "BEACH", nights: 7, price: 38400, rating: 4.7, image: "/tours/greece-rhodes-mitsis.jpg" },
  { slug: "greece-santorini-vista", ukCountry: "Греція", enCountry: "Greece", ukCity: "Санторіні", enCity: "Santorini", ukHotel: "Vista Caldera 4★", enHotel: "Vista Caldera 4★", type: "EXCURSION", nights: 5, price: 52000, rating: 4.9, image: "/tours/greece-santorini-vista.jpg", isHot: true },
  { slug: "greece-mykonos-myconian", ukCountry: "Греція", enCountry: "Greece", ukCity: "Міконос", enCity: "Mykonos", ukHotel: "Myconian Imperial 5★", enHotel: "Myconian Imperial 5★", type: "BEACH", nights: 7, price: 58900, rating: 4.8, image: "/tours/greece-mykonos-myconian.jpg" },
  { slug: "greece-corfu-grecotel", ukCountry: "Греція", enCountry: "Greece", ukCity: "Корфу", enCity: "Corfu", ukHotel: "Grecotel Daphnila 4★", enHotel: "Grecotel Daphnila 4★", type: "FAMILY", nights: 10, price: 33800, rating: 4.5, image: "/tours/greece-corfu-grecotel.jpg" },
  { slug: "greece-athens-acropolis", ukCountry: "Греція", enCountry: "Greece", ukCity: "Афіни", enCity: "Athens", ukHotel: "Acropolian Spirit 3★", enHotel: "Acropolian Spirit 3★", type: "EXCURSION", nights: 4, price: 24600, rating: 4.4, image: "/tours/greece-athens-acropolis.jpg" },

  // Італія (5)
  { slug: "italy-rome-artemide", ukCountry: "Італія", enCountry: "Italy", ukCity: "Рим", enCity: "Rome", ukHotel: "Hotel Artemide 4★", enHotel: "Hotel Artemide 4★", type: "EXCURSION", nights: 5, price: 38700, rating: 4.8, image: "/tours/italy-rome-artemide.jpg" },
  { slug: "italy-florence-savoy", ukCountry: "Італія", enCountry: "Italy", ukCity: "Флоренція", enCity: "Florence", ukHotel: "Hotel Savoy 5★", enHotel: "Hotel Savoy 5★", type: "EXCURSION", nights: 6, price: 47200, rating: 4.9, image: "/tours/italy-florence-savoy.avif" },
  { slug: "italy-venice-danieli", ukCountry: "Італія", enCountry: "Italy", ukCity: "Венеція", enCity: "Venice", ukHotel: "Hotel Danieli 5★", enHotel: "Hotel Danieli 5★", type: "EXCURSION", nights: 4, price: 62500, rating: 4.9, image: "/tours/italy-venice-danieli.jpg", isHot: true },
  { slug: "italy-sicily-grand", ukCountry: "Італія", enCountry: "Italy", ukCity: "Сицилія", enCity: "Sicily", ukHotel: "Grand Hotel Timeo 5★", enHotel: "Grand Hotel Timeo 5★", type: "BEACH", nights: 8, price: 49800, rating: 4.7, image: "/tours/italy-sicily-grand.jpg" },
  { slug: "italy-cruise-mediterranean", ukCountry: "Італія", enCountry: "Italy", ukCity: "Чівітавекк'я", enCity: "Civitavecchia", ukHotel: "MSC Splendida круїз", enHotel: "MSC Splendida cruise", type: "CRUISE", nights: 7, price: 44900, rating: 4.6, image: "/tours/italy-cruise-mediterranean.jpg" },

  // Іспанія (5)
  { slug: "spain-barcelona-arts", ukCountry: "Іспанія", enCountry: "Spain", ukCity: "Барселона", enCity: "Barcelona", ukHotel: "Hotel Arts 5★", enHotel: "Hotel Arts 5★", type: "EXCURSION", nights: 5, price: 41200, rating: 4.8, image: "/tours/spain-barcelona-arts.jpg" },
  { slug: "spain-madrid-villa", ukCountry: "Іспанія", enCountry: "Spain", ukCity: "Мадрид", enCity: "Madrid", ukHotel: "Villa Magna 5★", enHotel: "Villa Magna 5★", type: "EXCURSION", nights: 4, price: 36800, rating: 4.7, image: "/tours/spain-madrid-villa.jpg" },
  { slug: "spain-mallorca-iberostar", ukCountry: "Іспанія", enCountry: "Spain", ukCity: "Мальорка", enCity: "Mallorca", ukHotel: "Iberostar Playa 4★", enHotel: "Iberostar Playa 4★", type: "BEACH", nights: 7, price: 34500, rating: 4.6, image: "/tours/spain-mallorca-iberostar.jpg" },
  { slug: "spain-tenerife-bahia", ukCountry: "Іспанія", enCountry: "Spain", ukCity: "Тенеріфе", enCity: "Tenerife", ukHotel: "Bahia Principe 5★", enHotel: "Bahia Principe 5★", type: "BEACH", nights: 10, price: 42800, rating: 4.7, image: "/tours/spain-tenerife-bahia.avif", isHot: true },
  { slug: "spain-valencia-melia", ukCountry: "Іспанія", enCountry: "Spain", ukCity: "Валенсія", enCity: "Valencia", ukHotel: "Melia Plaza 4★", enHotel: "Melia Plaza 4★", type: "EXCURSION", nights: 5, price: 29400, rating: 4.4, image: "/tours/spain-valencia-melia.jpg" },

  // Грузія (4)
  { slug: "georgia-gudauri-marco-polo", ukCountry: "Грузія", enCountry: "Georgia", ukCity: "Гудаурі", enCity: "Gudauri", ukHotel: "Marco Polo 4★", enHotel: "Marco Polo 4★", type: "SKI", nights: 6, price: 21500, rating: 4.6, image: "/tours/georgia-gudauri-marco-polo.webp", isHot: true },
  { slug: "georgia-bakuriani-rooms", ukCountry: "Грузія", enCountry: "Georgia", ukCity: "Бакуріані", enCity: "Bakuriani", ukHotel: "Rooms Hotel 4★", enHotel: "Rooms Hotel 4★", type: "SKI", nights: 7, price: 19800, rating: 4.5, image: "/tours/georgia-bakuriani-rooms.jpg" },
  { slug: "georgia-tbilisi-stamba", ukCountry: "Грузія", enCountry: "Georgia", ukCity: "Тбілісі", enCity: "Tbilisi", ukHotel: "Stamba Hotel 5★", enHotel: "Stamba Hotel 5★", type: "EXCURSION", nights: 5, price: 25900, rating: 4.8, image: "/tours/georgia-tbilisi-stamba.avif" },
  { slug: "georgia-batumi-radisson", ukCountry: "Грузія", enCountry: "Georgia", ukCity: "Батумі", enCity: "Batumi", ukHotel: "Radisson Blu 5★", enHotel: "Radisson Blu 5★", type: "BEACH", nights: 8, price: 22700, rating: 4.5, image: "/tours/georgia-batumi-radisson.jpg" },

  // Чорногорія (3)
  { slug: "montenegro-budva-slovenska", ukCountry: "Чорногорія", enCountry: "Montenegro", ukCity: "Будва", enCity: "Budva", ukHotel: "Slovenska Plaža 4★", enHotel: "Slovenska Plaža 4★", type: "FAMILY", nights: 9, price: 26400, rating: 4.5, image: "/tours/montenegro-budva-slovenska.jpg" },
  { slug: "montenegro-kotor-cattaro", ukCountry: "Чорногорія", enCountry: "Montenegro", ukCity: "Котор", enCity: "Kotor", ukHotel: "Cattaro 4★", enHotel: "Cattaro 4★", type: "EXCURSION", nights: 5, price: 28900, rating: 4.6, image: "/tours/montenegro-kotor-cattaro.avif" },
  { slug: "montenegro-tivat-regent", ukCountry: "Чорногорія", enCountry: "Montenegro", ukCity: "Тіват", enCity: "Tivat", ukHotel: "Regent Porto 5★", enHotel: "Regent Porto 5★", type: "BEACH", nights: 7, price: 43200, rating: 4.8, image: "/tours/montenegro-tivat-regent.jpg" },

  // Хорватія (3)
  { slug: "croatia-dubrovnik-excelsior", ukCountry: "Хорватія", enCountry: "Croatia", ukCity: "Дубровник", enCity: "Dubrovnik", ukHotel: "Excelsior 5★", enHotel: "Excelsior 5★", type: "BEACH", nights: 7, price: 47900, rating: 4.7, image: "/tours/croatia-dubrovnik-excelsior.jpg" },
  { slug: "croatia-split-radisson", ukCountry: "Хорватія", enCountry: "Croatia", ukCity: "Спліт", enCity: "Split", ukHotel: "Radisson Blu 4★", enHotel: "Radisson Blu 4★", type: "BEACH", nights: 6, price: 34800, rating: 4.5, image: "/tours/croatia-split-radisson.jpg" },
  { slug: "croatia-hvar-amfora", ukCountry: "Хорватія", enCountry: "Croatia", ukCity: "Хвар", enCity: "Hvar", ukHotel: "Amfora Resort 4★", enHotel: "Amfora Resort 4★", type: "BEACH", nights: 5, price: 31200, rating: 4.4, image: "/tours/croatia-hvar-amfora.jpg" },

  // Австрія (3)
  { slug: "austria-innsbruck-hilton", ukCountry: "Австрія", enCountry: "Austria", ukCity: "Інсбрук", enCity: "Innsbruck", ukHotel: "Hilton Innsbruck 4★", enHotel: "Hilton Innsbruck 4★", type: "SKI", nights: 7, price: 49500, rating: 4.7, image: "/tours/austria-innsbruck-hilton.avif" },
  { slug: "austria-salzburg-imlauer", ukCountry: "Австрія", enCountry: "Austria", ukCity: "Зальцбург", enCity: "Salzburg", ukHotel: "IMLAUER Hotel 4★", enHotel: "IMLAUER Hotel 4★", type: "EXCURSION", nights: 5, price: 38400, rating: 4.6, image: "/tours/austria-salzburg-imlauer.jpg" },
  { slug: "austria-vienna-sacher", ukCountry: "Австрія", enCountry: "Austria", ukCity: "Відень", enCity: "Vienna", ukHotel: "Hotel Sacher 5★", enHotel: "Hotel Sacher 5★", type: "EXCURSION", nights: 4, price: 45200, rating: 4.9, image: "/tours/austria-vienna-sacher.jpg", isHot: true },

  // ОАЕ (3)
  { slug: "uae-dubai-atlantis", ukCountry: "ОАЕ", enCountry: "UAE", ukCity: "Дубай", enCity: "Dubai", ukHotel: "Atlantis The Palm 5★", enHotel: "Atlantis The Palm 5★", type: "BEACH", nights: 7, price: 78900, rating: 4.9, image: "/tours/uae-dubai-atlantis.jpg", isHot: true },
  { slug: "uae-abu-dhabi-emirates", ukCountry: "ОАЕ", enCountry: "UAE", ukCity: "Абу-Дабі", enCity: "Abu Dhabi", ukHotel: "Emirates Palace 5★", enHotel: "Emirates Palace 5★", type: "BEACH", nights: 6, price: 89200, rating: 4.9, image: "/tours/uae-abu-dhabi-emirates.webp" },
  { slug: "uae-ras-al-khaimah-rixos", ukCountry: "ОАЕ", enCountry: "UAE", ukCity: "Рас-аль-Хайма", enCity: "Ras Al Khaimah", ukHotel: "Rixos Bab Al Bahr 5★", enHotel: "Rixos Bab Al Bahr 5★", type: "FAMILY", nights: 10, price: 65400, rating: 4.7, image: "/tours/uae-ras-al-khaimah-rixos.jpg" },

  // Мальдіви (2)
  { slug: "maldives-male-paradise", ukCountry: "Мальдіви", enCountry: "Maldives", ukCity: "Мале", enCity: "Male", ukHotel: "Paradise Island 5★", enHotel: "Paradise Island 5★", type: "BEACH", nights: 7, price: 124000, rating: 4.9, image: "/tours/maldives-male-paradise.jpg", isHot: true },
  { slug: "maldives-baa-soneva", ukCountry: "Мальдіви", enCountry: "Maldives", ukCity: "Баа Атол", enCity: "Baa Atoll", ukHotel: "Soneva Fushi 5★", enHotel: "Soneva Fushi 5★", type: "BEACH", nights: 10, price: 198500, rating: 5.0, image: "/tours/maldives-baa-soneva.jpg" },

  // Таїланд (2)
  { slug: "thailand-phuket-banyan", ukCountry: "Таїланд", enCountry: "Thailand", ukCity: "Пхукет", enCity: "Phuket", ukHotel: "Banyan Tree 5★", enHotel: "Banyan Tree 5★", type: "BEACH", nights: 10, price: 56800, rating: 4.8, image: "/tours/thailand-phuket-banyan.jpg" },
  { slug: "thailand-bangkok-shangri", ukCountry: "Таїланд", enCountry: "Thailand", ukCity: "Бангкок", enCity: "Bangkok", ukHotel: "Shangri-La 5★", enHotel: "Shangri-La 5★", type: "EXCURSION", nights: 5, price: 41700, rating: 4.7, image: "/tours/thailand-bangkok-shangri.jpg" },

  // Чехія (1)
  { slug: "czech-prague-pachtuv", ukCountry: "Чехія", enCountry: "Czech Republic", ukCity: "Прага", enCity: "Prague", ukHotel: "Pachtuv Palace 5★", enHotel: "Pachtuv Palace 5★", type: "EXCURSION", nights: 4, price: 27500, rating: 4.6, image: "/tours/czech-prague-pachtuv.webp" },

  // Болгарія (1)
  { slug: "bulgaria-sunny-beach-melia", ukCountry: "Болгарія", enCountry: "Bulgaria", ukCity: "Сонячний берег", enCity: "Sunny Beach", ukHotel: "Melia Sunny Beach 4★", enHotel: "Melia Sunny Beach 4★", type: "FAMILY", nights: 10, price: 23400, rating: 4.3, image: "/tours/bulgaria-sunny-beach-melia.jpg" }
]

// Демо-статті для блогу.
const articles = [
  {
    slug: "top-5-hotels-turkey-2026",
    titleUk: "ТОП-5 готелів Туреччини на сезон 2026",
    titleEn: "Top 5 hotels in Turkey for 2026 season",
    excerptUk: "Перевірені нашими менеджерами п'ять готелів, які варто бронювати першими.",
    excerptEn: "Five hotels personally inspected by our managers — book these first.",
    bodyUk: "Кожного сезону ми особисто перевіряємо новинки і повертаємось до перевірених фаворитів. У 2026 році ставку робимо на сімейні all-inclusive в Анталії та преміум-сегмент у Бодрумі. Detalхnі огляди — у наших менеджерів.",
    bodyEn: "Every season we personally inspect new properties and revisit verified favourites. For 2026 we recommend family all-inclusive resorts in Antalya and the premium segment in Bodrum. Detailed reviews available from our managers.",
    cover: "/tours/turkey-belek-rixos.jpg"
  },
  {
    slug: "maldives-when-to-go",
    titleUk: "Мальдіви: коли краще їхати?",
    titleEn: "Maldives: when is the best time to go?",
    excerptUk: "Сухий і вологий сезон, ціни, погода — повний гайд для планування.",
    excerptEn: "Dry and wet seasons, prices, weather — a complete planning guide.",
    bodyUk: "Найкращий сезон на Мальдівах — з грудня по квітень: мало дощу, спокійне море, ідеальна видимість для дайвінгу. Високий сезон — і високі ціни. Якщо хочеться зекономити, дивіться травень/листопад — це shoulder season.",
    bodyEn: "The best season in the Maldives is December–April: minimal rain, calm sea, perfect diving visibility. High season means high prices. To save, look at May or November — these are shoulder months.",
    cover: "/tours/maldives-baa-soneva.jpg"
  },
  {
    slug: "winter-georgia-ski",
    titleUk: "Гудаурі взимку: чому обрати Грузію для лиж",
    titleEn: "Gudauri in winter: why pick Georgia for skiing",
    excerptUk: "Стабільний сніг, помірні ціни, фрірайд і кавказька кухня — все в одному турі.",
    excerptEn: "Reliable snow, moderate prices, freeride and Caucasian cuisine — all in one trip.",
    bodyUk: "Гудаурі — один із найбільш недооцінених гірськолижних курортів у регіоні. Снігу багато з грудня по березень, ціни на проживання й ski-pass нижчі за Альпи в кілька разів, а вечорами — справжня грузинська кухня з вином.",
    bodyEn: "Gudauri is one of the most underrated ski resorts in the region. Plenty of snow from December to March, lodging and ski-pass prices are several times lower than in the Alps, and your evenings end with real Georgian cuisine and wine.",
    cover: "/tours/georgia-gudauri-marco-polo.webp"
  }
]

async function main() {
  console.log(`Seeding ${tours.length} tours...`)

  const validSlugs = tours.map((t) => t.slug)
  const stale = await prisma.tour.findMany({
    where: { slug: { notIn: validSlugs } },
    select: { id: true }
  })
  if (stale.length) {
    await prisma.booking.deleteMany({ where: { tourId: { in: stale.map((t) => t.id) } } })
    await prisma.favorite.deleteMany({ where: { tourId: { in: stale.map((t) => t.id) } } })
    await prisma.tour.deleteMany({ where: { id: { in: stale.map((t) => t.id) } } })
    console.log(`Removed ${stale.length} obsolete tours.`)
  }

  for (const tour of tours) {
    const data = mk(tour)
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: data,
      create: data
    })
  }

  const adminEmail = "admin@travel-agency.com"
  const exists = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!exists) {
    console.log("Creating admin user...")
    await prisma.user.create({
      data: {
        email: adminEmail,
        firstName: "Admin",
        lastName: "User",
        passwordHash: await bcrypt.hash("admin12345", 10),
        role: "ADMIN"
      }
    })
  }

  // Засіваємо статті блогу.
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: article,
      create: article
    })
  }

  const totalTours = await prisma.tour.count()
  const totalUsers = await prisma.user.count()
  const totalArticles = await prisma.article.count()
  console.log(`Done. Tours: ${totalTours}, Users: ${totalUsers}, Articles: ${totalArticles}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
