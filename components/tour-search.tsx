"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { useLocale } from "@/lib/store"

export function TourSearch() {
  const router = useRouter()
  const params = useSearchParams()
  const { locale } = useLocale()
  const [value, setValue] = useState(params.get("q") ?? "")

  useEffect(() => {
    setValue(params.get("q") ?? "")
  }, [params])

  useEffect(() => {
    const handler = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (value) next.set("q", value)
      else next.delete("q")
      const current = params.get("q") ?? ""
      if (current !== value) {
        router.replace(`/tours?${next.toString()}`)
      }
    }, 300)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const placeholder = locale === "uk" ? "Пошук за країною, містом, готелем..." : "Search by country, city, hotel..."

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-input bg-background pl-10 pr-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear"
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
