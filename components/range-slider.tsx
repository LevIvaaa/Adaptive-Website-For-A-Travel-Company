"use client"

interface Props {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (next: [number, number]) => void
}

export function RangeSlider({ min, max, step = 1, value, onChange }: Props) {
  const [low, high] = value
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100))

  return (
    <div className="relative h-6">
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted" />
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(e) => {
          const v = Math.min(Number(e.target.value), high - step)
          onChange([v, high])
        }}
        className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
        aria-label="Minimum value"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(e) => {
          const v = Math.max(Number(e.target.value), low + step)
          onChange([low, v])
        }}
        className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
        aria-label="Maximum value"
      />
    </div>
  )
}
