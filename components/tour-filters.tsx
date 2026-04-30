"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const types = [
  { value: "BEACH", label: "Beach" },
  { value: "EXCURSION", label: "Excursion" },
  { value: "SKI", label: "Ski" },
  { value: "FAMILY", label: "Family" },
  { value: "CRUISE", label: "Cruise" },
  { value: "CUSTOM", label: "Custom" }
]

const priceRanges = [
  { id: "low", label: "Up to 25 000 ₴", min: 0, max: 25000 },
  { id: "mid", label: "25 000 – 40 000 ₴", min: 25000, max: 40000 },
  { id: "high", label: "From 40 000 ₴", min: 40000, max: 999999 }
]

export function TourFilters() {
  const router = useRouter()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const selectedTypes = new Set(params.getAll("type"))
  const minPrice = params.get("minPrice")
  const maxPrice = params.get("maxPrice")

  function update(next: URLSearchParams) {
    startTransition(() => {
      router.replace(`/tours?${next.toString()}`)
    })
  }

  function toggleType(type: string) {
    const next = new URLSearchParams(params)
    const current = next.getAll("type")
    next.delete("type")
    if (current.includes(type)) {
      current.filter((t) => t !== type).forEach((t) => next.append("type", t))
    } else {
      [...current, type].forEach((t) => next.append("type", t))
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

  function reset() {
    update(new URLSearchParams())
  }

  const hasFilters = params.toString().length > 0

  return (
    <aside className={`space-y-4 ${isPending ? "opacity-60" : ""}`}>
      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
          Tour type
        </h3>
        <div className="space-y-2">
          {types.map((t) => (
            <Label
              key={t.value}
              className="flex cursor-pointer items-center gap-2.5 text-sm font-normal"
            >
              <input
                type="checkbox"
                checked={selectedTypes.has(t.value)}
                onChange={() => toggleType(t.value)}
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {t.label}
            </Label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">
          Price
        </h3>
        <div className="space-y-2">
          {priceRanges.map((r) => {
            const isActive = minPrice === String(r.min) && maxPrice === String(r.max)
            return (
              <Label
                key={r.id}
                className="flex cursor-pointer items-center gap-2.5 text-sm font-normal"
              >
                <input
                  type="radio"
                  name="price"
                  checked={isActive}
                  onChange={() => setPriceRange(isActive ? null : r)}
                  className="h-4 w-4 accent-primary"
                />
                {r.label}
              </Label>
            )
          })}
        </div>
      </div>

      {hasFilters && (
        <Button variant="outline" className="w-full" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset filters
        </Button>
      )}
    </aside>
  )
}
