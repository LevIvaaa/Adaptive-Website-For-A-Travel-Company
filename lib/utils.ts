import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency } from "@/lib/store"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const rates: Record<Currency, number> = {
  UAH: 1,
  USD: 1 / 40,
  EUR: 1 / 43
}

export function formatPrice(amountUah: number, currency: Currency = "UAH") {
  const amount = Math.round(amountUah * rates[currency])
  const locale = currency === "UAH" ? "uk-UA" : "en-US"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount)
}
