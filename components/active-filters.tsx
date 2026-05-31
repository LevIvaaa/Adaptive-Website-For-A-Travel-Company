"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import { useT } from "@/lib/i18n"

interface Chip {
  key: string
  label: string
  remove: () => void
}

export function ActiveFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const T = useT()

  const chips: Chip[] = []

  function removeOne(key: string, value?: string) {
    return () => {
      const next = new URLSearchParams(params)
      if (value === undefined) {
        next.delete(key)
      } else {
        const all = next.getAll(key).filter((v) => v !== value)
        next.delete(key)
        all.forEach((v) => next.append(key, v))
      }
      if ((key === "minPrice" || key === "maxPrice") && !next.get("minPrice") && !next.get("maxPrice")) {
        next.delete("priceCurrency")
      }
      router.replace(`/tours?${next.toString()}`)
    }
  }

  const types = params.getAll("type")
  types.forEach((t) =>
    chips.push({ key: `type:${t}`, label: T.activeFilters.type[t as keyof typeof T.activeFilters.type] ?? t, remove: removeOne("type", t) })
  )

  params.getAll("country").forEach((c) => {
    chips.push({ key: `country:${c}`, label: c, remove: removeOne("country", c) })
  })

  if (params.get("hot") === "1") {
    chips.push({ key: "hot", label: T.activeFilters.hot, remove: removeOne("hot") })
  }

  const q = params.get("q")
  if (q) chips.push({ key: "q", label: `"${q}"`, remove: removeOne("q") })

  const minPrice = params.get("minPrice")
  const maxPrice = params.get("maxPrice")
  const priceCurrency = params.get("priceCurrency") ?? "UAH"
  if (minPrice || maxPrice) {
    const symbol = priceCurrency === "USD" ? "$" : priceCurrency === "EUR" ? "€" : "₴"
    chips.push({
      key: "price",
      label: `${symbol}${minPrice ?? "0"}–${symbol}${maxPrice ?? "∞"}`,
      remove: () => {
        const next = new URLSearchParams(params)
        next.delete("minPrice")
        next.delete("maxPrice")
        next.delete("priceCurrency")
        router.replace(`/tours?${next.toString()}`)
      }
    })
  }

  const minNights = params.get("minNights")
  const maxNights = params.get("maxNights")
  if (minNights || maxNights) {
    chips.push({
      key: "nights",
      label: `${minNights ?? "1"}–${maxNights ?? "21"} ${T.bookings.nights}`,
      remove: () => {
        const next = new URLSearchParams(params)
        next.delete("minNights")
        next.delete("maxNights")
        router.replace(`/tours?${next.toString()}`)
      }
    })
  }

  const dateFrom = params.get("dateFrom")
  const dateTo = params.get("dateTo")
  if (dateFrom || dateTo) {
    chips.push({
      key: "date",
      label: `${dateFrom ?? "—"} → ${dateTo ?? "—"}`,
      remove: () => {
        const next = new URLSearchParams(params)
        next.delete("dateFrom")
        next.delete("dateTo")
        router.replace(`/tours?${next.toString()}`)
      }
    })
  }

  const adults = params.get("adults")
  if (adults && adults !== "2") {
    chips.push({
      key: "adults",
      label: `${adults} ${T.bookings.adults}`,
      remove: removeOne("adults")
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase text-muted-foreground">{T.activeFilters.label}:</span>
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          className="inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1 text-xs hover:bg-muted"
        >
          {c.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={() => router.replace("/tours")}
        className="text-xs text-primary hover:underline"
      >
        {T.activeFilters.clearAll}
      </button>
    </div>
  )
}
