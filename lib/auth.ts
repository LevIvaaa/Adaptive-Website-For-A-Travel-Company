// Налаштування NextAuth: один CredentialsProvider (email + пароль), сесії через JWT.
// Пароль перевіряємо bcrypt'ом. id/role/phone кладемо в токен — щоб не ходити в БД на кожен запит.
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Перевірка вхідних даних перед запитом до БД.
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // Викликається при сабміті форми логіну. Має повернути об'єкт юзера або null.
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() }
        })
        if (!user) return null

        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!ok) return null

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          role: user.role,
          phone: user.phone
        }
      }
    })
  ],
  callbacks: {
    // Кладемо id, role, phone з User у JWT — щоб не ходити в БД на кожен рендер.
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id
        token.role = (user as { role?: string }).role
        token.phone = (user as { phone?: string | null }).phone
      }
      return token
    },
    // Прокидуємо ці ж поля з JWT у session.user — щоб клієнт міг їх читати.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string | undefined
        session.user.phone = token.phone as string | null | undefined
      }
      return session
    }
  }
}
