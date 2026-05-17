// Singleton-обгортка Prisma-клієнта.
// У dev Next.js перезавантажує модулі при HMR — без цього на кожне збереження файлу
// створювався б новий PrismaClient → купа неоплачених підключень.
// Тримаємо інстанс в globalThis, перевикористовуємо.
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
