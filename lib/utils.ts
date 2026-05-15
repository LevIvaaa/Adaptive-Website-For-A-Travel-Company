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

const symbols: Record<Currency, string> = {
  UAH: "₴",
  USD: "$",
  EUR: "€"
}

export function formatPrice(amountUah: number, currency: Currency = "UAH") {
  const amount = Math.round(amountUah * rates[currency])
  const numberPart = new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(amount)
  return currency === "UAH" ? `${numberPart} ${symbols.UAH}` : `${symbols[currency]}${numberPart}`
}
