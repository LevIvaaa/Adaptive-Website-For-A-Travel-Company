// Стори стану на Zustand: обране, локаль, валюта.
// Кожен зберігається в localStorage через persist — переживає перезавантаження сторінки.
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Обране користувача. Для анонімних — лише в localStorage.
// Для залогінених — синхронізується з БД через /api/favorites
interface FavoritesState {
  ids: string[]
  authenticated: boolean
  toggle: (id: string) => void
  has: (id: string) => boolean
  setAuthenticated: (v: boolean) => void
  setAll: (ids: string[]) => void
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      authenticated: false,
      toggle: (id) => {
        const state = get()
        const isFav = state.ids.includes(id)
        set({
          ids: isFav ? state.ids.filter((x) => x !== id) : [...state.ids, id]
        })
        if (state.authenticated && typeof window !== "undefined") {
          fetch("/api/favorites", {
            method: isFav ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tourId: id })
          }).catch(() => {})
        }
      },
      has: (id) => get().ids.includes(id),
      setAuthenticated: (v) => set({ authenticated: v }),
      setAll: (ids) => set({ ids })
    }),
    { name: "favorites", partialize: (s) => ({ ids: s.ids }) }
  )
)

// Мова інтерфейсу. За замовчуванням — українська.
export type Locale = "uk" | "en"

interface LocaleState {
  locale: Locale
  toggle: () => void
  setLocale: (l: Locale) => void
}

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "uk",
      toggle: () => set((s) => ({ locale: s.locale === "uk" ? "en" : "uk" })),
      setLocale: (l) => set({ locale: l })
    }),
    { name: "locale" }
  )
)

// Валюта відображення. У БД ціни завжди в UAH; цей стор обирає, як їх показувати.
export type Currency = "UAH" | "USD" | "EUR"

interface CurrencyState {
  currency: Currency
  setCurrency: (c: Currency) => void
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "UAH",
      setCurrency: (c) => set({ currency: c })
    }),
    { name: "currency" }
  )
)
