"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Check, Clock, MapPin, Plane, Star, Utensils } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { SimilarTours } from "@/components/similar-tours"
import { localizeTour, type Tour } from "@/lib/tours"
import { useLocale, useCurrency } from "@/lib/store"
import { useT, pluralNights } from "@/lib/i18n"
import { formatPrice } from "@/lib/utils"

export function TourView({ tour }: { tour: Tour }) {
  const { locale } = useLocale()
  const { currency } = useCurrency()
  const T = useT()
  const t = localizeTour(tour, locale)

  // Title вкладки оновлюємо на клієнті — щоб він реагував на зміну локалі.
  // (Серверний generateMetadata встановлює його лише на початковий рендер.)
  useEffect(() => {
    document.title = `${t.title} · Travel Agency`
  }, [t.title, locale])

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">{T.tourDetail.breadcrumbHome}</Link> /{" "}
          <Link href="/tours" className="hover:text-primary">{T.tourDetail.breadcrumbTours}</Link> /{" "}
          <Link
            href={`/tours?country=${encodeURIComponent(tour.countryEn)}`}
            className="hover:text-primary"
          >
            {t.country}
          </Link>
        </div>
      </section>

      <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {t.country}, {t.city}
          </div>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{t.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{t.rating}</span>
            </span>
            <span className="text-muted-foreground">{t.hotel}</span>
          </div>

          <div className="relative mt-6 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
            {t.image ? (
              <img
                src={t.image}
                alt={t.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Plane className="h-20 w-20 text-primary/30" />
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border bg-card p-5 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">{T.tourDetail.duration}</div>
                <div className="text-sm font-semibold">
                  {t.nights} {pluralNights(t.nights, locale)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Utensils className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">{T.tourDetail.meal}</div>
                <div className="text-sm font-semibold">{t.meal}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Star className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">{T.tourDetail.rating}</div>
                <div className="text-sm font-semibold">{t.rating}/5</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">{T.tourDetail.about}</h2>
            <p className="mt-3 text-foreground/90">{t.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">{T.tourDetail.included}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {t.included.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-md">
            <div className="text-sm text-muted-foreground">{T.tourDetail.priceFrom}</div>
            <div className="mt-1 text-3xl font-bold">{formatPrice(t.price, currency)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{T.tourDetail.priceNote}</div>

            <div className="mt-5">
              <BookingForm tourId={t.id} basePrice={t.price} baseNights={t.nights} />
            </div>
          </div>
        </aside>
      </section>

      <SimilarTours currentSlug={tour.slug} country={tour.countryEn} />
    </>
  )
}
