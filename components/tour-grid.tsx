"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { TourCard } from "@/components/tour-card"
import type { Tour } from "@/lib/tours"

export function TourGrid() {
  const params = useSearchParams()
  const router = useRouter()
  const query = params.toString()

  const { data, isLoading } = useQuery<Tour[]>({
    queryKey: ["tours", query],
    queryFn: async () => {
      const res = await fetch(`/api/tours?${query}`)
      if (!res.ok) throw new Error("Failed to load tours")
      return res.json()
    }
  })

  function setSort(value: string) {
    const next = new URLSearchParams(params)
    if (value === "popular") next.delete("sort")
    else next.set("sort", value)
    router.replace(`/tours?${next.toString()}`)
  }

  const currentSort = params.get("sort") ?? "popular"

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{data?.length ?? 0}</span> tours
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <select
            value={currentSort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            <option value="popular">Popular</option>
            <option value="price-asc">Cheapest first</option>
            <option value="price-desc">Most expensive first</option>
            <option value="rating">By rating</option>
          </select>
        </label>
      </div>

      {data && data.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-12 text-center">
          <p className="text-muted-foreground">No tours match the selected filters.</p>
        </div>
      )}
    </div>
  )
}
