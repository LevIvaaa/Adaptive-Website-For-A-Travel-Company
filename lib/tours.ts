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
  title: string
  country: string
  city: string
  hotel: string
  meal: string
  description: string
  included: string[]
}

export function localizeTour(tour: Tour, locale: Locale): LocalizedTour {
  return {
    id: tour.id,
    slug: tour.slug,
    nights: tour.nights,
    price: tour.price,
    rating: tour.rating,
    type: tour.type,
    isHot: tour.isHot,
    title: locale === "uk" ? tour.titleUk : tour.titleEn,
    country: locale === "uk" ? tour.countryUk : tour.countryEn,
    city: locale === "uk" ? tour.cityUk : tour.cityEn,
    hotel: locale === "uk" ? tour.hotelUk : tour.hotelEn,
    meal: locale === "uk" ? tour.mealUk : tour.mealEn,
    description: locale === "uk" ? tour.descriptionUk : tour.descriptionEn,
    included: locale === "uk" ? tour.includedUk : tour.includedEn
  }
}
