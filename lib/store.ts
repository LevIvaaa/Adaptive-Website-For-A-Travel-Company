import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesState {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id)
            ? state.ids.filter((x) => x !== id)
            : [...state.ids, id]
        })),
      has: (id) => get().ids.includes(id)
    }),
    { name: "favorites" }
  )
)

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
