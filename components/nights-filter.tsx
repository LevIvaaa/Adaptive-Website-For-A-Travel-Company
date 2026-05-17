"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RangeSlider } from "@/components/range-slider"
import { useLocale } from "@/lib/store"

const NIGHTS_MIN = 1
const NIGHTS_MAX = 21
const NIGHTS_STEP = 1

export function NightsFilter() {
  const router = useRouter()
  const params = useSearchParams()
  const { locale } = useLocale()

  const urlMin = parseInt(params.get("minNights") ?? "")
  const urlMax = parseInt(params.get("maxNights") ?? "")
  const initialMin = Number.isNaN(urlMin) ? NIGHTS_MIN : urlMin
  const initialMax = Number.isNaN(urlMax) ? NIGHTS_MAX : urlMax

  const [range, setRange] = useState<[number, number]>([initialMin, initialMax])

  useEffect(() => {
    setRange([initialMin, initialMax])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("minNights"), params.get("maxNights")])

  useEffect(() => {
    if (range[0] > range[1]) return
    const handler = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (range[0] === NIGHTS_MIN) next.delete("minNights")
      else next.set("minNights", String(range[0]))
      if (range[1] === NIGHTS_MAX) next.delete("maxNights")
      else next.set("maxNights", String(range[1]))
      const target = `/tours?${next.toString()}`
      if (`${window.location.pathname}${window.location.search}` !== target) {
        router.replace(target)
      }
    }, 350)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  const t = (uk: string, en: string) => (locale === "uk" ? uk : en)

  const invalid = range[0] > range[1]

  function setMin(v: number) {
    const next = Math.max(NIGHTS_MIN, Math.min(NIGHTS_MAX, v))
    setRange([next, range[1]])
  }
  function setMax(v: number) {
    const next = Math.max(NIGHTS_MIN, Math.min(NIGHTS_MAX, v))
    setRange([range[0], next])
  }

  return (
    <div className="rounded-xl border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
        {t("Тривалість", "Duration")}
      </h3>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <NumberInput label={t("від (ночей)", "from (nights)")} value={range[0]} onChange={setMin} />
        <NumberInput label={t("до (ночей)", "to (nights)")} value={range[1]} onChange={setMax} />
      </div>

      <RangeSlider
        min={NIGHTS_MIN}
        max={NIGHTS_MAX}
        step={NIGHTS_STEP}
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
