import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Вкажіть ім’я"),
  phone: z.string().min(6, "Вкажіть телефон"),
  email: z.string().email("Невірний e-mail"),
  message: z.string().min(5, "Опишіть ваш запит")
})
export type ContactInput = z.infer<typeof contactSchema>

export const loginSchema = z.object({
  email: z.string().email("Невірний e-mail"),
  password: z.string().min(8, "Мінімум 8 символів")
})
export type LoginInput = z.infer<typeof loginSchema>
