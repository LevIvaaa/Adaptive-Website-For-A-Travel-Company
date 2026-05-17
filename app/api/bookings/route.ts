// POST /api/bookings — створити нове бронювання.
// GET  /api/bookings — список бронювань поточного юзера.
// Обидва ендпоінти вимагають авторизації.
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const schema = z.object({
  tourId: z.string().min(1),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
  nights: z.number().int().min(1).max(30).optional(),
  departDate: z.string().refine((v) => {
    if (Number.isNaN(Date.parse(v))) return false
    const today = new Date().toISOString().split("T")[0]
    return v >= today
  }, "Invalid or past date"),
  // Опціональна дата повернення — якщо передана, з неї перерахуємо nights.
  returnDate: z.string().optional(),
  comment: z.string().max(1000).optional(),
  // Валюта, в якій юзер бачив суму, та її значення — для збереження snapshot'у.
  displayCurrency: z.enum(["UAH", "USD", "EUR"]).optional(),
  displayTotal: z.number().int().nonnegative().optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const tour = await prisma.tour.findUnique({ where: { id: parsed.data.tourId } })
  if (!tour) {
    return NextResponse.json({ error: "Tour not found" }, { status: 404 })
  }

  // Спочатку пробуємо взяти nights з returnDate (якщо переданий діапазон).
  // Інакше — поле nights, інакше — базова тривалість туру.
  let nights = parsed.data.nights ?? tour.nights
  if (parsed.data.returnDate) {
    const ms = new Date(parsed.data.returnDate).getTime() - new Date(parsed.data.departDate).getTime()
    if (Number.isFinite(ms) && ms > 0) {
      const computed = Math.round(ms / 86400000)
      if (computed >= 1 && computed <= 30) nights = computed
    }
  }
  const total = Math.round(
    tour.price * (nights / tour.nights) * (parsed.data.adults + 0.5 * parsed.data.children)
  )

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      tourId: tour.id,
      adults: parsed.data.adults,
      children: parsed.data.children,
      departDate: new Date(parsed.data.departDate),
      total,
      // Snapshot того, що бачив юзер — щоб у списку бронювань ціна співпала з очікуваною.
      displayTotal: parsed.data.displayTotal ?? total,
      displayCurrency: parsed.data.displayCurrency ?? "UAH",
      comment: parsed.data.comment
    }
  })

  return NextResponse.json(booking, { status: 201 })
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { tour: true },
    orderBy: { createdAt: "desc" }
  })
  return NextResponse.json(bookings)
}
