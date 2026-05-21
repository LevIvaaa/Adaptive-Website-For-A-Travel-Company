"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Coins } from "lucide-react"
import { useCurrency, type Currency } from "@/lib/store"

const options: { value: Currency; symbol: string }[] = [
  { value: "UAH", symbol: "₴" },
  { value: "USD", symbol: "$" },
  { value: "EUR", symbol: "€" }
]

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-border px-3 text-sm font-medium hover:bg-muted"
      >
        <Coins className="h-4 w-4 shrink-0" />
        {currency}
        <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-50 min-w-[140px] overflow-hidden rounded-md border border-border bg-background shadow-lg"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={currency === o.value}
                onClick={() => {
                  setCurrency(o.value)
                  setOpen(false)
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-muted ${
                  currency === o.value ? "bg-muted font-semibold" : ""
                }`}
              >
                {o.symbol} {o.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
