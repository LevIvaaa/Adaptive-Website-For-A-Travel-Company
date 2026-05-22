"use client"

// Блок «Популярні тури» на головній. Бере перші 6 турів із сортуванням «popular» (сортує hot-тури вгору)
import { useQuery } from "@tanstack/react-query"
import { TourCard } from "@/components/tour-card"
import type { Tour } from "@/lib/tours"

export function PopularTours() {
  const { data, isLoading } = useQuery<Tour[]>({
    queryKey: ["tours", "popular"],
    queryFn: async () => {
      const res = await fetch("/api/tours?sort=popular")
      if (!res.ok) throw new Error("Failed to load")
      return res.json()
    }
  })

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.slice(0, 6).map((tour) => <TourCard key={tour.id} tour={tour} />)}
    </div>
  )
}
