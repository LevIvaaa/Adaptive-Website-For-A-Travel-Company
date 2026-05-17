"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useFavorites } from "@/lib/store"
import { useT } from "@/lib/i18n"
import { TourCard } from "@/components/tour-card"
import type { Tour } from "@/lib/tours"

export default function FavoritesPage() {
  const T = useT()
  const ids = useFavorites((s) => s.ids)
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `${T.favorites.title} · Travel Agency`
  }, [T])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch("/api/tours")
      .then((r) => r.json())
      .then((all: Tour[]) => {
        if (cancelled) return
        setTours(all.filter((t) => ids.includes(t.id)))
        setLoading(false)
      })
      .catch(() => setLoading(false))
    return () => { cancelled = true }
  }, [ids])

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold md:text-4xl">{T.favorites.title}</h1>
      <p className="mt-2 text-muted-foreground">{T.favorites.description}</p>

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : tours.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border bg-card p-12 text-center">
          <Heart className="h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">{T.favorites.empty}</p>
          <Link href="/tours" className="text-sm font-medium text-primary hover:underline">
            {T.favorites.browse}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t) => <TourCard key={t.id} tour={t} />)}
        </div>
      )}
    </section>
  )
}
