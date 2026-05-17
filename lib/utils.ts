import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency } from "@/lib/store"

// Об'єднує Tailwind-класи й автоматично заглушає конфлікти (typ. m-2 + m-4 → залишиться m-4).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Коефіцієнти UAH → інша валюта. Один і той самий набір використовується скрізь.
const rates = {
  UAH: 1,
  USD: 1 / 40,
  EUR: 1 / 43
}

// Форматує суму в гривнях у вибрану валюту (символ + округлене число).
export function formatPrice(amountUah: number, currency: Currency = "UAH") {
  const amount = Math.round(amountUah * rates[currency])
  return formatAmountInCurrency(amount, currency)
}

// Те ж саме, але вхідне значення вже в потрібній валюті — без додаткової конвертації.
// Використовується там, де розрахунок зроблено в display-валюті заздалегідь
// (напр. у формі бронювання, щоб per-person × N сходився з Total).
export function formatAmountInCurrency(amount: number, currency: Currency = "UAH") {
  const formatted = amount.toLocaleString("uk-UA")
  if (currency === "USD") return "$" + formatted
  if (currency === "EUR") return "€" + formatted
  return formatted + " ₴"
}
