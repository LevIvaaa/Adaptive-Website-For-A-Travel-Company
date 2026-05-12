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
  departDate: z.string().refine((v) => !Number.isNaN(Date.parse(v)), {
    message: "Invalid date"
  }),
  comment: z.string().max(1000).optional()
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

  const nights = parsed.data.nights ?? tour.nights
  const perNight = Math.round(tour.price / tour.nights)
  const total = Math.round(perNight * nights * (parsed.data.adults + 0.5 * parsed.data.children))

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      tourId: tour.id,
      adults: parsed.data.adults,
      children: parsed.data.children,
      departDate: new Date(parsed.data.departDate),
      total,
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
