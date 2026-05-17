import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const schema = z.object({ tourId: z.string().min(1) })

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json([])

  const favs = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { tourId: true }
  })
  return NextResponse.json(favs.map((f) => f.tourId))
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }

  await prisma.favorite.upsert({
    where: { userId_tourId: { userId: session.user.id, tourId: parsed.data.tourId } },
    create: { userId: session.user.id, tourId: parsed.data.tourId },
    update: {}
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }

  await prisma.favorite.deleteMany({
    where: { userId: session.user.id, tourId: parsed.data.tourId }
  })

  return NextResponse.json({ ok: true })
}
