"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { useLocale, type Locale } from "@/lib/store"

const options: { value: Locale; label: string; short: string }[] = [
  { value: "uk", label: "Українська", short: "UA" },
  { value: "en", label: "English", short: "EN" }
]

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const current = options.find((o) => o.value === locale)!

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium hover:bg-muted"
      >
        <Globe className="h-4 w-4" />
        {current.short}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-background shadow-lg"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={locale === o.value}
                onClick={() => {
                  setLocale(o.value)
                  setOpen(false)
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-muted ${
                  locale === o.value ? "bg-muted font-semibold" : ""
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
