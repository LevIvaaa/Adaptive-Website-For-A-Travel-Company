import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Серверна перевірка форми контактів. Дублює клієнтську — щоб ніхто не міг
// обійти валідацію curl'ом і вставити HTML/JS в ім'я.
const schema = z.object({
  name: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[\p{L}\s'\-]+$/u, "Invalid characters in name"),
  email: z.string().email(),
  phone: z.string().min(6).max(30).optional().or(z.literal("")),
  message: z.string().min(5).max(2000)
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data
  const created = await prisma.contactRequest.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message
    }
  })
  return NextResponse.json({ id: created.id }, { status: 201 })
}
