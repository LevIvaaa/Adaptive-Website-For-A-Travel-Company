import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency } from "@/lib/store"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const rates = {
  UAH: 1,
  USD: 1 / 40,
  EUR: 1 / 43
}

export function formatPrice(amountUah: number, currency: Currency = "UAH") {
  const amount = Math.round(amountUah * rates[currency])
  const formatted = amount.toLocaleString("uk-UA")
  if (currency === "USD") return "$" + formatted
  if (currency === "EUR") return "€" + formatted
  return formatted + " ₴"
}
