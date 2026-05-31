"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { MapPin, Search, X } from "lucide-react"
import { useLocale } from "@/lib/store"

interface Country {
  uk: string
  en: string
}

export function TourSearch() {
  const router = useRouter()
  const params = useSearchParams()
  const { locale } = useLocale()

  const [value, setValue] = useState(params.get("q") ?? "")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const lastPushedRef = useRef(params.get("q") ?? "")

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("/api/countries")
      return res.json()
    }
  })

  useEffect(() => {
    const urlValue = params.get("q") ?? ""
    if (urlValue !== lastPushedRef.current) {
      setValue(urlValue)
      lastPushedRef.current = urlValue
    }
  }, [params])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      const live = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(params)
      const current = live.get("q") ?? ""
      if (current === value) return
      if (value) live.set("q", value)
      else live.delete("q")
      lastPushedRef.current = value
      router.replace(`/tours?${live.toString()}`)
    }, 300)
    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const filtered = useMemo(() => {
    if (!countries) return []
    const q = value.trim().toLowerCase()
    if (!q) return countries
    return countries.filter(
      (c) => c.en.toLowerCase().includes(q) || c.uk.toLowerCase().includes(q)
    )
  }, [countries, value])

  function pick(c: Country) {
    setOpen(false)
    setValue("")
    lastPushedRef.current = ""
    const live = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams(params)
    live.delete("q")
    live.delete("country")
    live.append("country", c.en)
    router.replace(`/tours?${live.toString()}`)
  }

  const placeholder =
    locale === "uk" ? "Пошук за країною, містом, готелем..." : "Search by country, city, hotel..."

  return (
    <div className="relative" ref={ref}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value.slice(0, 80))
          if (!open) setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        maxLength={80}
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

      {open && filtered.length > 0 && (
        <ul className="absolute left-0 top-[calc(100%+8px)] z-50 max-h-80 w-full overflow-y-auto rounded-xl border border-border bg-background shadow-xl">
          {filtered.map((c) => (
            <li key={c.en}>
              <button
                type="button"
                onClick={() => pick(c)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted"
              >
                <MapPin className="h-4 w-4 text-primary" />
                {locale === "uk" ? c.uk : c.en}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
