import { PrismaClient, TourType } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const tours = [
  {
    slug: "turkey-antalya",
    titleUk: "Анталія, готель Delphin Be Grand",
    titleEn: "Antalya, Delphin Be Grand",
    countryUk: "Туреччина",
    countryEn: "Turkey",
    cityUk: "Анталія",
    cityEn: "Antalya",
    hotelUk: "Delphin Be Grand 5★",
    hotelEn: "Delphin Be Grand 5★",
    mealUk: "Ultra All Inclusive",
    mealEn: "Ultra All Inclusive",
    descriptionUk:
      "Готель на першій береговій лінії. Три басейни, свій пляж, клуб і аніматори для дітей.",
    descriptionEn:
      "Beachfront hotel with three pools, a private beach and a kids club with animators.",
    includedUk: [
      "Переліт Київ — Анталія",
      "Трансфер з аеропорту",
      "Харчування Ultra All Inclusive",
      "Медична страховка"
    ],
    includedEn: [
      "Flight Kyiv — Antalya",
      "Airport transfer",
      "Ultra All Inclusive meals",
      "Medical insurance"
    ],
    type: TourType.BEACH,
    nights: 7,
    price: 28900,
    rating: 4.8,
    isHot: true
  },
  {
    slug: "egypt-sharm",
    titleUk: "Шарм-ель-Шейх, Reef Oasis",
    titleEn: "Sharm El Sheikh, Reef Oasis",
    countryUk: "Єгипет",
    countryEn: "Egypt",
    cityUk: "Шарм-ель-Шейх",
    cityEn: "Sharm El Sheikh",
    hotelUk: "Reef Oasis Blue Bay 5★",
    hotelEn: "Reef Oasis Blue Bay 5★",
    mealUk: "All Inclusive",
    mealEn: "All Inclusive",
    descriptionUk: "Власний кораловий риф біля берега — ідеально для снорклінгу та дайвінгу.",
    descriptionEn:
      "Private coral reef right at the shore — perfect for snorkelling and diving.",
    includedUk: [
      "Переліт та трансфер",
      "10 ночей, All Inclusive",
      "Безкоштовна маска й ласти",
      "Медична страховка"
    ],
    includedEn: [
      "Flight and transfer",
      "10 nights, All Inclusive",
      "Free mask and fins",
      "Medical insurance"
    ],
    type: TourType.BEACH,
    nights: 10,
    price: 32500,
    rating: 4.7
  },
  {
    slug: "greece-crete",
    titleUk: "Крит, автотур на тиждень",
    titleEn: "Crete, a week-long road trip",
    countryUk: "Греція",
    countryEn: "Greece",
    cityUk: "Іракліон",
    cityEn: "Heraklion",
    hotelUk: "Бутік-готелі 3–4★",
    hotelEn: "Boutique 3–4★ hotels",
    mealUk: "Сніданки",
    mealEn: "Breakfast",
    descriptionUk: "Маршрут островом з групою до 8 осіб. Іракліон, Ханія, Ретимно, Елунда.",
    descriptionEn:
      "Island route with a group of up to 8 people. Heraklion, Chania, Rethymno, Elounda.",
    includedUk: [
      "Оренда авто",
      "Проживання в сімейних готелях",
      "Український гід-водій",
      "Гастровечір у селі Аногія"
    ],
    includedEn: [
      "Car rental",
      "Stay in family-run hotels",
      "Ukrainian-speaking guide-driver",
      "Food evening in Anogia village"
    ],
    type: TourType.EXCURSION,
    nights: 8,
    price: 41200,
    rating: 4.9
  },
  {
    slug: "georgia-gudauri",
    titleUk: "Гудаурі, тиждень на схилах",
    titleEn: "Gudauri, a week on the slopes",
    countryUk: "Грузія",
    countryEn: "Georgia",
    cityUk: "Гудаурі",
    cityEn: "Gudauri",
    hotelUk: "Marco Polo Hotel 4★",
    hotelEn: "Marco Polo Hotel 4★",
    mealUk: "Напівпансіон",
    mealEn: "Half board",
    descriptionUk: "Катання на висоті 2200 м, широкі траси для початківців і фрірайдерів.",
    descriptionEn: "Skiing at 2200 m elevation, wide slopes for beginners and freeriders.",
    includedUk: [
      "Ski-pass на 5 днів",
      "Прокат на 3 дні",
      "Трансфер Тбілісі — Гудаурі",
      "Сауна в готелі"
    ],
    includedEn: [
      "5-day ski pass",
      "Gear rental for 3 days",
      "Tbilisi — Gudauri transfer",
      "Hotel sauna"
    ],
    type: TourType.SKI,
    nights: 6,
    price: 21500,
    rating: 4.6,
    isHot: true
  },
  {
    slug: "italy-rome",
    titleUk: "Рим і Флоренція",
    titleEn: "Rome and Florence",
    countryUk: "Італія",
    countryEn: "Italy",
    cityUk: "Рим",
    cityEn: "Rome",
    hotelUk: "Hotel Artemide 4★",
    hotelEn: "Hotel Artemide 4★",
    mealUk: "Сніданки",
    mealEn: "Breakfast",
    descriptionUk: "Ранкові екскурсії та вільний вечір. Музеї Ватикану, Уффіці, дегустація к’янті.",
    descriptionEn:
      "Morning excursions and free evenings. Vatican Museums, Uffizi, Chianti tasting.",
    includedUk: [
      "Авіаквитки Київ — Рим",
      "Поїзд між містами",
      "Екскурсії з гідами",
      "Квитки до Колізею та Уффіці"
    ],
    includedEn: [
      "Flight Kyiv — Rome",
      "Train between cities",
      "Guided tours",
      "Tickets to the Colosseum and Uffizi"
    ],
    type: TourType.EXCURSION,
    nights: 5,
    price: 38700,
    rating: 4.8
  },
  {
    slug: "montenegro-budva",
    titleUk: "Сімейна Будва",
    titleEn: "Family Budva",
    countryUk: "Чорногорія",
    countryEn: "Montenegro",
    cityUk: "Будва",
    cityEn: "Budva",
    hotelUk: "Hotel Slovenska Plaža 4★",
    hotelEn: "Hotel Slovenska Plaža 4★",
    mealUk: "Напівпансіон",
    mealEn: "Half board",
    descriptionUk: "Спокійний курорт, просторі пляжі, міні-клуб для дітей, старе місто поруч.",
    descriptionEn: "Quiet resort, spacious beaches, kids mini-club, old town nearby.",
    includedUk: ["Сніданок і вечеря", "Ранкова йога", "Анімація для дітей", "Водна гірка"],
    includedEn: ["Breakfast and dinner", "Morning yoga", "Kids animation programme", "Water slide"],
    type: TourType.FAMILY,
    nights: 9,
    price: 26400,
    rating: 4.5
  }
]

async function main() {
  console.log("Seeding tours...")
  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: tour,
      create: tour
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

  console.log("Done.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
