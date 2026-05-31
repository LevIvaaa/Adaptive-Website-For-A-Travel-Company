"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Clock, Flame, Heart, MapPin, Plane, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice, cn } from "@/lib/utils"
import { useFavorites, useLocale, useCurrency } from "@/lib/store"
import { useT, pluralNights } from "@/lib/i18n"
import { localizeTour, type Tour } from "@/lib/tours"
import { useToast } from "@/components/toast"

export function TourCard({ tour }: { tour: Tour }) {
  const { has, toggle } = useFavorites()
  const { locale } = useLocale()
  const { currency } = useCurrency()
  const T = useT()
  const showToast = useToast((s) => s.show)
  const t = localizeTour(tour, locale)
  const fav = has(t.id)

  const params = useSearchParams()
  const urlAdults = parseInt(params.get("adults") ?? "")
  const urlChildren = parseInt(params.get("children") ?? "")
  const adults = Number.isFinite(urlAdults) && urlAdults >= 1 && urlAdults <= 10 ? urlAdults : 2
  const children = Number.isFinite(urlChildren) && urlChildren >= 0 && urlChildren <= 10 ? urlChildren : 0
  const customized = adults !== 2 || children !== 0
  const displayPrice = customized
    ? Math.round((t.price * (adults + 0.5 * children)) / 2)
    : t.price

  function onFavClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggle(t.id)
    showToast(fav ? T.favorites.removed : T.favorites.added)
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><Link
        href={`/tours/${t.slug}`}
        aria-label={t.title}
        className="absolute inset-0 z-0"
      />

      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/15 to-primary/5">
        {t.image ? (
          <img
            src={t.image}
            alt={t.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <Plane className="h-14 w-14 text-primary/30" />
        )}{t.isHot && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <Flame className="h-3 w-3" />
            {T.card.hot}
          </span>
        )}

        <button
          type="button"
          onClick={onFavClick}
          aria-label={fav ? T.favorites.remove : T.favorites.add}
          className={cn(
            "absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur",
            fav ? "text-red-500" : "text-slate-600 hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 pointer-events-none">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {t.country}, {t.city}
        </div>

        <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary">
          {t.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {t.nights} {pluralNights(t.nights, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500" />
            {t.rating}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <div className="text-xs text-muted-foreground">
              {customized ? T.card.forGuests(adults, children) : T.card.from}
            </div>
            <div className="text-2xl font-bold">{formatPrice(displayPrice, currency)}</div>
          </div>
          <Button asChild size="sm" className="pointer-events-auto">
            <Link href={`/tours/${t.slug}`}>{T.card.details}</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
