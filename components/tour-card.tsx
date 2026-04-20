"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, Heart, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice, cn } from "@/lib/utils"
import { useFavorites } from "@/lib/store"
import type { Tour } from "@/lib/tours"

export function TourCard({ tour }: { tour: Tour }) {
  const { has, toggle } = useFavorites()
  const fav = has(tour.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(min-width:1024px) 380px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => toggle(tour.id)}
          aria-label="В обране"
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur",
            fav ? "text-red-500" : "text-slate-600 hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {tour.country}, {tour.city}
        </div>

        <h3 className="mt-1 text-lg font-semibold leading-snug">
          <Link href={`/tours/${tour.slug}`} className="hover:text-primary">
            {tour.title}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {tour.nights} ночей
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            {tour.rating}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <div className="text-xs text-muted-foreground">від</div>
            <div className="text-2xl font-bold">{formatPrice(tour.price)}</div>
          </div>
          <Button asChild size="sm">
            <Link href={`/tours/${tour.slug}`}>Детальніше</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
