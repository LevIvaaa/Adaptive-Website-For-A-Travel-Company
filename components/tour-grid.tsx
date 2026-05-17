"use client"

// Сітка карток на /tours. Тягне дані через TanStack Query, ключ кешу залежить від URL —
// тож зміна будь-якого фільтру в адресі автоматично робить новий запит.
import { useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { TourCard } from "@/components/tour-card"
import { ActiveFilters } from "@/components/active-filters"
import { useLocale } from "@/lib/store"
import type { Tour } from "@/lib/tours"

export function TourGrid() {
  const params = useSearchParams()
  const router = useRouter()
  const { locale } = useLocale()
  const query = params.toString()

  const { data, isLoading } = useQuery<Tour[]>({
    queryKey: ["tours", query],
    queryFn: async () => {
      const res = await fetch(`/api/tours?${query}`)
      if (!res.ok) throw new Error("Failed to load tours")
      return res.json()
    },
    // Тримаємо старі результати поки тягнемо нові — щоб skeleton не мерехтів при зміні фільтра.
    placeholderData: (prev) => prev
  })

  function setSort(value: string) {
    const next = new URLSearchParams(params)
    if (value === "popular") next.delete("sort")
    else next.set("sort", value)
    router.replace(`/tours?${next.toString()}`)
  }

  const currentSort = params.get("sort") ?? "popular"
  const t = (uk: string, en: string) => (locale === "uk" ? uk : en)

  function pluralTours(n: number) {
    if (locale === "en") return n === 1 ? "tour" : "tours"
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return "тур"
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "тури"
    return "турів"
  }

  const sortOptions = [
    { value: "popular", label: t("Популярні", "Popular") },
    { value: "price-asc", label: t("Спершу дешеві", "Cheapest first") },
    { value: "price-desc", label: t("Спершу дорогі", "Most expensive first") },
    { value: "rating", label: t("За рейтингом", "By rating") },
    { value: "nights-asc", label: t("За тривалістю", "By duration") }
  ]

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <ActiveFilters />
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {t("Знайдено", "Found")}{" "}
          <span className="font-semibold text-foreground">{data?.length ?? 0}</span>{" "}
          {pluralTours(data?.length ?? 0)}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="hidden text-muted-foreground sm:inline">
            {t("Сортувати:", "Sort by:")}
          </span>
          <select
            value={currentSort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {data && data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            {t("За вашими фільтрами турів не знайдено.", "No tours match the selected filters.")}
          </p>
          <button
            type="button"
            onClick={() => router.replace("/tours")}
            className="mt-4 inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {t("Скинути фільтри", "Reset filters")}
          </button>
        </div>
      )}
    </div>
  )
}
