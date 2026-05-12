import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

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
  const country = searchParams.get("country")
  const minPrice = parseInt(searchParams.get("minPrice") ?? "")
  const maxPrice = parseInt(searchParams.get("maxPrice") ?? "")
  const minNights = parseInt(searchParams.get("minNights") ?? "")
  const maxNights = parseInt(searchParams.get("maxNights") ?? "")
  const sort = searchParams.get("sort") ?? "popular"
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const where: Prisma.TourWhereInput = {}
  if (types.length) where.type = { in: types }
  if (country) {
    where.OR = [{ countryEn: country }, { countryUk: country }]
  }
  if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
    where.price = {}
    if (!Number.isNaN(minPrice)) where.price.gte = minPrice
    if (!Number.isNaN(maxPrice)) where.price.lte = maxPrice
  }
  if (!Number.isNaN(minNights) || !Number.isNaN(maxNights)) {
    where.nights = {}
    if (!Number.isNaN(minNights)) where.nights.gte = minNights
    if (!Number.isNaN(maxNights)) where.nights.lte = maxNights
  }

  const orderBy: Prisma.TourOrderByWithRelationInput =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
        ? { price: "desc" }
        : sort === "rating"
          ? { rating: "desc" }
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
