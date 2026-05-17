// GET /api/tours — список турів з фільтрами в query params:
// type, country (multi), minPrice/maxPrice (+priceCurrency), minNights/maxNights,
// dateFrom/dateTo (інтервал поїздки), hot, sort, q (текстовий пошук).
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

// Білий список типів — все, що не в ньому, ігнорується (захист від сміття в URL).
const allowedTypes = new Set([
  "BEACH",
  "EXCURSION",
  "SKI",
  "CRUISE",
  "FAMILY",
  "CUSTOM"
])

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const types = searchParams.getAll("type").filter((t) => allowedTypes.has(t))
  const countries = searchParams.getAll("country").filter(Boolean)
  const minPriceRaw = parseInt(searchParams.get("minPrice") ?? "")
  const maxPriceRaw = parseInt(searchParams.get("maxPrice") ?? "")
  // Параметри ціни в URL у валюті користувача. Переводимо в UAH для фільтру по БД.
  const priceCurrency = searchParams.get("priceCurrency") ?? "UAH"
  const priceRate = priceCurrency === "USD" ? 40 : priceCurrency === "EUR" ? 43 : 1
  const minPrice = Number.isNaN(minPriceRaw) ? NaN : Math.round(minPriceRaw * priceRate)
  const maxPrice = Number.isNaN(maxPriceRaw) ? NaN : Math.round(maxPriceRaw * priceRate)
  const minNights = parseInt(searchParams.get("minNights") ?? "")
  const maxNights = parseInt(searchParams.get("maxNights") ?? "")
  const hot = searchParams.get("hot") === "1"
  const sort = searchParams.get("sort") ?? "popular"
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  // Якщо передано dateFrom/dateTo з hero — рахуємо кількість ночей у вибраному інтервалі
  // і додаємо фільтр: тур має «вміщуватися» — кількість його ночей не більша за інтервал.
  const dateFromStr = searchParams.get("dateFrom") ?? ""
  const dateToStr = searchParams.get("dateTo") ?? ""
  let intervalNights = NaN
  if (dateFromStr && dateToStr) {
    const from = new Date(dateFromStr).getTime()
    const to = new Date(dateToStr).getTime()
    if (Number.isFinite(from) && Number.isFinite(to) && to >= from) {
      intervalNights = Math.round((to - from) / (1000 * 60 * 60 * 24))
    }
  }

  // Якщо фільтр позначив себе невалідним — повертаємо порожній список, щоб користувач бачив empty state.
  if (searchParams.get("_invalid") === "1") {
    return NextResponse.json([])
  }

  const where: Prisma.TourWhereInput = {}
  if (types.length) where.type = { in: types }
  if (countries.length) {
    where.OR = countries.flatMap((c) => [{ countryEn: c }, { countryUk: c }])
  }
  if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
    where.price = {}
    if (!Number.isNaN(minPrice)) where.price.gte = minPrice
    if (!Number.isNaN(maxPrice)) where.price.lte = maxPrice
  }
  // Фільтр по ночам комбінуємо з тривалістю інтервалу з hero — беремо найжорсткіший maxNights.
  const effectiveMaxNights = Number.isFinite(intervalNights)
    ? (Number.isNaN(maxNights) ? intervalNights : Math.min(maxNights, intervalNights))
    : maxNights
  if (!Number.isNaN(minNights) || !Number.isNaN(effectiveMaxNights)) {
    where.nights = {}
    if (!Number.isNaN(minNights)) where.nights.gte = minNights
    if (!Number.isNaN(effectiveMaxNights)) where.nights.lte = effectiveMaxNights
  }
  if (hot) where.isHot = true

  const orderBy: Prisma.TourOrderByWithRelationInput =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : sort === "rating"
          ? { rating: "desc" }
          : sort === "nights-asc"
            ? { nights: "asc" }
            : { isHot: "desc" }

  let tours = await prisma.tour.findMany({ where, orderBy })

  if (q) {
    tours = tours.filter((t) =>
      [t.titleEn, t.titleUk, t.countryEn, t.countryUk, t.cityEn, t.cityUk, t.hotelEn, t.hotelUk]
        .some((field) => field.toLowerCase().includes(q))
    )
  }

  return NextResponse.json(tours)
}
