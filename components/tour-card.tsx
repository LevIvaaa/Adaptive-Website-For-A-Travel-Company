"use client"

// Картка одного туру в каталозі. Показує фото, країну/місто, рейтинг, ціну.
// Сердечко зверху додає/прибирає тур з обраного + показує тост.
import Link from "next/link"
import { Clock, Heart, MapPin, Plane, Star } from "lucide-react"
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

  function onFavClick() {
    toggle(t.id)
    showToast(fav ? T.favorites.removed : T.favorites.added)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
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
        )}
        <button
          type="button"
          onClick={onFavClick}
          aria-label={fav ? T.favorites.remove : T.favorites.add}
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
          {t.country}, {t.city}
        </div>

        <h3 className="mt-1 text-lg font-semibold leading-snug">
          <Link href={`/tours/${t.slug}`} className="hover:text-primary">
            {t.title}
          </Link>
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
            <div className="text-xs text-muted-foreground">{T.card.from}</div>
            <div className="text-2xl font-bold">{formatPrice(t.price, currency)}</div>
          </div>
          <Button asChild size="sm">
            <Link href={`/tours/${t.slug}`}>{T.card.details}</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
