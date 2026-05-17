// Тур із БД має пари полів titleUk/titleEn, countryUk/countryEn тощо.
// LocalizedTour — це той самий тур, але вже з полями в одній мові, готовий до показу.
import type { Locale } from "@/lib/store"
import type { Tour as DbTour } from "@prisma/client"

export type Tour = DbTour

export interface LocalizedTour {
  id: string
  slug: string
  nights: number
  price: number
  rating: number
  type: string
  isHot: boolean
  image: string | null
  title: string
  country: string
  city: string
  hotel: string
  meal: string
  description: string
  included: string[]
}

// SQLite не вміє масивів, тож в БД списки «що включено» лежать як JSON-рядок.
// Безпечно парсимо й повертаємо порожній масив, якщо щось пішло не так.
function parseList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

// Конвертує DB-тур у вже локалізовану форму — обираючи Uk- або En-поле залежно від мови.
export function localizeTour(tour: Tour, locale: Locale): LocalizedTour {
  return {
    id: tour.id,
    slug: tour.slug,
    nights: tour.nights,
    price: tour.price,
    rating: tour.rating,
    type: tour.type,
    isHot: tour.isHot,
    image: tour.image,
    title: locale === "uk" ? tour.titleUk : tour.titleEn,
    country: locale === "uk" ? tour.countryUk : tour.countryEn,
    city: locale === "uk" ? tour.cityUk : tour.cityEn,
    hotel: locale === "uk" ? tour.hotelUk : tour.hotelEn,
    meal: locale === "uk" ? tour.mealUk : tour.mealEn,
    description: locale === "uk" ? tour.descriptionUk : tour.descriptionEn,
    included: parseList(locale === "uk" ? tour.includedUk : tour.includedEn)
  }
}
