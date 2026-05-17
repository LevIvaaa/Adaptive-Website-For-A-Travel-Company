// GET /api/countries — унікальний список країн із усіх турів (для фільтрів і автодоповнення).
// force-dynamic щоб не кешувалось (хоча для дипломної можна було б і кешувати).
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const tours = await prisma.tour.findMany({
    select: { countryEn: true, countryUk: true },
    distinct: ["countryEn"]
  })
  const list = tours
    .map((t) => ({ en: t.countryEn, uk: t.countryUk }))
    .sort((a, b) => a.en.localeCompare(b.en))
  return NextResponse.json(list)
}
