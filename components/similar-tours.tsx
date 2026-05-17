"use client"

import { useEffect, useState } from "react"
import { TourCard } from "@/components/tour-card"
import { useT } from "@/lib/i18n"
import type { Tour } from "@/lib/tours"

interface Props {
  currentSlug: string
  country: string
}

export function SimilarTours({ currentSlug, country }: Props) {
  const T = useT()
  const [tours, setTours] = useState<Tour[]>([])

  useEffect(() => {
    fetch(`/api/tours?country=${encodeURIComponent(country)}`)
      .then((r) => r.json())
      .then((all: Tour[]) => {
        setTours(all.filter((t) => t.slug !== currentSlug).slice(0, 3))
      })
      .catch(() => setTours([]))
  }, [currentSlug, country])

  if (tours.length === 0) return null

  return (
    <section className="border-t bg-muted/30 section-padding">
      <div className="container">
        <h2 className="text-2xl font-bold md:text-3xl">{T.tourDetail.similar}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t) => <TourCard key={t.id} tour={t} />)}
        </div>
      </div>
    </section>
  )
}
