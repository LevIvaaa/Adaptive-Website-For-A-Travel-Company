"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RangeSlider } from "@/components/range-slider"
import { useCurrency, useLocale, type Currency } from "@/lib/store"

const PRICE_MIN_UAH = 0
const PRICE_MAX_UAH = 200000
const PRICE_STEP_UAH = 1000

const rates: Record<Currency, number> = { UAH: 1, USD: 40, EUR: 43 }
const symbols: Record<Currency, string> = { UAH: "₴", USD: "$", EUR: "€" }

export function PriceFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const { currency } = useCurrency()
  const { locale } = useLocale()

  const rate = rates[currency]
  const symbol = symbols[currency]

  const urlMin = parseInt(params.get("minPrice") ?? "")
  const urlMax = parseInt(params.get("maxPrice") ?? "")
  const initialMin = Number.isNaN(urlMin) ? PRICE_MIN_UAH : urlMin
  const initialMax = Number.isNaN(urlMax) ? PRICE_MAX_UAH : urlMax

  const [range, setRange] = useState<[number, number]>([initialMin, initialMax])

  useEffect(() => {
    setRange([initialMin, initialMax])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("minPrice"), params.get("maxPrice")])

  useEffect(() => {
    if (range[0] > range[1]) return
    const handler = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (range[0] === PRICE_MIN_UAH) next.delete("minPrice")
      else next.set("minPrice", String(range[0]))
      if (range[1] === PRICE_MAX_UAH) next.delete("maxPrice")
      else next.set("maxPrice", String(range[1]))
      const target = `/tours?${next.toString()}`
      if (`${window.location.pathname}${window.location.search}` !== target) {
        router.replace(target)
      }
    }, 350)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  const displayMin = Math.round(range[0] / rate)
  const displayMax = Math.round(range[1] / rate)

  const invalid = range[0] > range[1]

  function setDisplayMin(v: number) {
    const uah = Math.max(PRICE_MIN_UAH, Math.min(PRICE_MAX_UAH, Math.round(v * rate)))
    setRange([uah, range[1]])
  }
  function setDisplayMax(v: number) {
    const uah = Math.max(PRICE_MIN_UAH, Math.min(PRICE_MAX_UAH, Math.round(v * rate)))
    setRange([range[0], uah])
  }

  const t = (uk: string, en: string) => (locale === "uk" ? uk : en)

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
        {t("Ціна", "Price")}
      </h3>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <NumberInput
          label={t("від", "from") + ` ${symbol}`}
          value={displayMin}
          onChange={setDisplayMin}
        />
        <NumberInput
          label={t("до", "to") + ` ${symbol}`}
          value={displayMax}
          onChange={setDisplayMax}
        />
      </div>

      <RangeSlider
        min={PRICE_MIN_UAH}
        max={PRICE_MAX_UAH}
        step={PRICE_STEP_UAH}
        value={range}
        onChange={setRange}
      />

      {invalid && (
        <p className="mt-2 text-xs text-destructive">
          {t("«від» має бути ≤ «до»", "“from” must be ≤ “to”")}
        </p>
      )}
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label className="flex flex-col gap-0.5 rounded-md border border-input bg-background px-2.5 py-1.5">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const num = Number(e.target.value)
          if (!Number.isNaN(num)) onChange(num)
        }}
        className="w-full bg-transparent text-sm font-medium outline-none"
      />
    </label>
  )
}
