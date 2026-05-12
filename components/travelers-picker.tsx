"use client"

import { useEffect, useRef, useState } from "react"
import { Minus, Plus, Users } from "lucide-react"
import { useT } from "@/lib/i18n"

interface Value {
  adults: number
  children: number
  infants: number
}

interface Props {
  value: Value
  onChange: (next: Value) => void
}

export function TravelersPicker({ value, onChange }: Props) {
  const T = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const total = value.adults + value.children + value.infants
  const summary = T.search.travelersPicker.summary(total)

  function update(key: keyof Value, delta: number) {
    const next = { ...value, [key]: Math.max(key === "adults" ? 1 : 0, value[key] + delta) }
    if (next.adults + next.children + next.infants > 10) return
    onChange(next)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 text-left md:bg-transparent"
      >
        <span className="text-xs font-semibold uppercase text-slate-500">
          {T.search.travelers}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-slate-900">
          <Users className="h-3.5 w-3.5 text-slate-500" />
          {summary}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[300px] rounded-xl border border-border bg-background p-4 shadow-xl">
          <div className="mb-3 text-sm font-semibold">
            {T.search.travelersPicker.title}
          </div>

          <Row
            title={T.search.travelersPicker.adults}
            hint={T.search.travelersPicker.adultsHint}
            value={value.adults}
            min={1}
            onDec={() => update("adults", -1)}
            onInc={() => update("adults", 1)}
          />
          <Row
            title={T.search.travelersPicker.children}
            hint={T.search.travelersPicker.childrenHint}
            value={value.children}
            min={0}
            onDec={() => update("children", -1)}
            onInc={() => update("children", 1)}
          />
          <Row
            title={T.search.travelersPicker.infants}
            hint={T.search.travelersPicker.infantsHint}
            value={value.infants}
            min={0}
            onDec={() => update("infants", -1)}
            onInc={() => update("infants", 1)}
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {T.search.travelersPicker.done}
          </button>
        </div>
      )}
    </div>
  )
}

function Row({
  title,
  hint,
  value,
  min,
  onDec,
  onInc
}: {
  title: string
  hint: string
  value: number
  min: number
  onDec: () => void
  onInc: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDec}
          disabled={value <= min}
          aria-label="Decrease"
          className="grid h-8 w-8 place-items-center rounded-full bg-muted text-slate-700 hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-6 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={onInc}
          aria-label="Increase"
          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
