// POST /api/register — створення нового користувача.
// Логіну тут немає — після реєстрації клієнт окремо викличе signIn() з NextAuth.
import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

// Валідація форми реєстрації. Пароль обмежений 72 символами — обмеження bcrypt.
const schema = z.object({
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email(),
  phone: z.string().min(6).max(30).optional(),
  password: z.string().min(8).max(72)
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
  const email = data.email.toLowerCase()

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(data.password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      passwordHash
    },
    select: { id: true, email: true, firstName: true, lastName: true }
  })

  return NextResponse.json(user, { status: 201 })
}
