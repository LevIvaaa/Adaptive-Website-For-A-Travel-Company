"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useQuery } from "@tanstack/react-query"
import { Flame, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/store"

const types = [
  { value: "BEACH", uk: "Пляжний", en: "Beach" },
  { value: "EXCURSION", uk: "Екскурсійний", en: "Excursion" },
  { value: "SKI", uk: "Гірськолижний", en: "Ski" },
  { value: "FAMILY", uk: "Сімейний", en: "Family" },
  { value: "CRUISE", uk: "Круїз", en: "Cruise" },
  { value: "CUSTOM", uk: "Індивідуальний", en: "Custom" }
]

const priceRanges = [
  { id: "low", labelUk: "До 25 000 ₴", labelEn: "Up to 25 000 ₴", min: 0, max: 25000 },
  { id: "mid", labelUk: "25 000 – 50 000 ₴", labelEn: "25 000 – 50 000 ₴", min: 25000, max: 50000 },
  { id: "high", labelUk: "50 000 – 100 000 ₴", labelEn: "50 000 – 100 000 ₴", min: 50000, max: 100000 },
  { id: "lux", labelUk: "Понад 100 000 ₴", labelEn: "100 000 ₴+", min: 100000, max: 999999 }
]

const nightRanges = [
  { id: "short", labelUk: "3–5 ночей", labelEn: "3–5 nights", min: 3, max: 5 },
  { id: "week", labelUk: "6–8 ночей", labelEn: "6–8 nights", min: 6, max: 8 },
  { id: "long", labelUk: "9+ ночей", labelEn: "9+ nights", min: 9, max: 30 }
]

interface Country {
  uk: string
  en: string
}

export function TourFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const { locale } = useLocale()

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("/api/countries")
      return res.json()
    }
  })

  const selectedTypes = new Set(params.getAll("type"))
  const selectedCountries = new Set(params.getAll("country"))
  const minPrice = params.get("minPrice")
  const maxPrice = params.get("maxPrice")
  const minNights = params.get("minNights")
  const maxNights = params.get("maxNights")
  const isHot = params.get("hot") === "1"

  function update(next: URLSearchParams) {
    startTransition(() => {
      router.replace(`/tours?${next.toString()}`)
    })
  }

  function toggleMulti(key: "type" | "country", value: string) {
    const next = new URLSearchParams(params)
    const current = next.getAll(key)
    next.delete(key)
    if (current.includes(value)) {
      current.filter((t) => t !== value).forEach((t) => next.append(key, t))
    } else {
      [...current, value].forEach((t) => next.append(key, t))
    }
    update(next)
  }

  function setPriceRange(range: { min: number; max: number } | null) {
    const next = new URLSearchParams(params)
    next.delete("minPrice")
    next.delete("maxPrice")
    if (range) {
      next.set("minPrice", String(range.min))
      next.set("maxPrice", String(range.max))
    }
    update(next)
  }

  function setNightRange(range: { min: number; max: number } | null) {
    const next = new URLSearchParams(params)
    next.delete("minNights")
    next.delete("maxNights")
    if (range) {
      next.set("minNights", String(range.min))
      next.set("maxNights", String(range.max))
    }
    update(next)
  }

  function toggleHot() {
    const next = new URLSearchParams(params)
    if (isHot) next.delete("hot")
    else next.set("hot", "1")
    update(next)
  }

  function reset() {
    update(new URLSearchParams())
  }

  const t = (uk: string, en: string) => (locale === "uk" ? uk : en)
  const hasFilters = ["type", "country", "minPrice", "maxPrice", "minNights", "maxNights", "hot", "q"].some((k) => params.has(k))

  return (
    <aside className={`space-y-4 ${isPending ? "opacity-60" : ""}`}>
      <button
        type="button"
        onClick={toggleHot}
        className={`flex w-full items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
          isHot ? "border-red-300 bg-red-50 text-red-700" : "border-border bg-card hover:bg-muted"
        }`}
      >
        <Flame className="h-4 w-4" />
        {t("Тільки гарячі тури", "Hot tours only")}
      </button>

      <Group title={t("Тип відпочинку", "Tour type")}>
        {types.map((tp) => (
          <Row
            key={tp.value}
            label={t(tp.uk, tp.en)}
            checked={selectedTypes.has(tp.value)}
            onChange={() => toggleMulti("type", tp.value)}
            type="checkbox"
          />
        ))}
      </Group>

      <Group title={t("Країна", "Country")}>
        <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
          {countries?.map((c) => (
            <Row
              key={c.en}
              label={t(c.uk, c.en)}
              checked={selectedCountries.has(c.en)}
              onChange={() => toggleMulti("country", c.en)}
              type="checkbox"
            />
          ))}
        </div>
      </Group>

      <Group title={t("Ціна", "Price")}>
        {priceRanges.map((r) => {
          const isActive = minPrice === String(r.min) && maxPrice === String(r.max)
          return (
            <Row
              key={r.id}
              label={t(r.labelUk, r.labelEn)}
              checked={isActive}
              onChange={() => setPriceRange(isActive ? null : r)}
              type="radio"
              name="price"
            />
          )
        })}
      </Group>

      <Group title={t("Тривалість", "Duration")}>
        {nightRanges.map((r) => {
          const isActive = minNights === String(r.min) && maxNights === String(r.max)
          return (
            <Row
              key={r.id}
              label={t(r.labelUk, r.labelEn)}
              checked={isActive}
              onChange={() => setNightRange(isActive ? null : r)}
              type="radio"
              name="nights"
            />
          )
        })}
      </Group>

      {hasFilters && (
        <Button variant="outline" className="w-full" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          {t("Скинути фільтри", "Reset filters")}
        </Button>
      )}
    </aside>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({
  label,
  checked,
  onChange,
  type,
  name
}: {
  label: string
  checked: boolean
  onChange: () => void
  type: "checkbox" | "radio"
  name?: string
}) {
  return (
    <Label className="flex cursor-pointer items-center gap-2.5 text-sm font-normal">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </Label>
  )
}
