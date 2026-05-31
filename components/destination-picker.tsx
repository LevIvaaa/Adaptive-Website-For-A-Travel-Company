"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { MapPin } from "lucide-react"
import { useLocale } from "@/lib/store"
import { useT } from "@/lib/i18n"

interface Country {
  uk: string
  en: string
}

interface Props {
  value: string
  onChange: (next: string) => void
}

export function DestinationPicker({ value, onChange }: Props) {
  const T = useT()
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("/api/countries")
      return res.json()
    }
  })

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const filtered = useMemo(() => {
    if (!countries) return []
    const q = value.trim().toLowerCase()
    if (!q) return countries
    return countries.filter(
      (c) => c.en.toLowerCase().includes(q) || c.uk.toLowerCase().includes(q)
    )
  }, [countries, value])

  function pick(c: Country) {
    onChange(locale === "uk" ? c.uk : c.en)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <label className="flex flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 md:bg-transparent">
        <span className="text-xs font-semibold uppercase text-slate-500">
          {T.search.destination}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value.slice(0, 80))
            if (!open) setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          maxLength={80}
          placeholder={T.search.destinationPh}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
      </label>

      {open && filtered.length > 0 && (
        <ul className="absolute left-0 top-[calc(100%+8px)] z-50 max-h-80 w-full min-w-[200px] overflow-y-auto rounded-xl border border-border bg-background shadow-xl sm:w-[280px]">
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
