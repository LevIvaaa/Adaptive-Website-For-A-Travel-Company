"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, Clock, MapPin, Star, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { localizeTour, type Tour } from "@/lib/tours"
import { useLocale } from "@/lib/store"
import { useT, pluralNights } from "@/lib/i18n"
import { formatPrice } from "@/lib/utils"

export function TourView({ tour }: { tour: Tour }) {
  const { locale } = useLocale()
  const T = useT()
  const t = localizeTour(tour, locale)

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">{T.tourDetail.breadcrumbHome}</Link> /{" "}
          <Link href="/tours" className="hover:text-primary">{T.tourDetail.breadcrumbTours}</Link> /{" "}
          {t.country}
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

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={t.image}
              alt={t.title}
              fill
              priority
              sizes="(min-width:1024px) 700px, 100vw"
              className="object-cover"
            />
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
            <div className="mt-1 text-3xl font-bold">{formatPrice(t.price)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{T.tourDetail.priceNote}</div>

            <Button asChild className="mt-5 w-full" size="lg">
              <Link href="/contacts">{T.tourDetail.book}</Link>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/contacts">{T.tourDetail.askManager}</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  )
}
