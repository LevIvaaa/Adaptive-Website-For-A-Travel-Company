"use client"

// Клієнтський компонент для списку бронювань на /account/bookings.
// Виокремили саме його (а не всю сторінку), щоб тримати запит до БД серверним.
import Link from "next/link"
import { useT } from "@/lib/i18n"
import { LocalizedText, LocalizedDate } from "@/components/localized-tour-fields"
import { formatPrice, formatAmountInCurrency } from "@/lib/utils"
import type { Currency } from "@/lib/store"

interface Booking {
  id: string
  total: number
  displayTotal: number | null
  displayCurrency: string | null
  status: string
  departDate: string
  adults: number
  children: number
  comment: string | null
  tour: {
    slug: string
    titleUk: string
    titleEn: string
    countryUk: string
    countryEn: string
    cityUk: string
    cityEn: string
    hotelUk: string
    hotelEn: string
    nights: number
  }
}

export function BookingsList({ bookings }: { bookings: Booking[] }) {
  const T = useT()

  if (bookings.length === 0) {
    return (
      <div className="mt-6 rounded-xl border bg-card p-8 text-center text-muted-foreground">
        {T.bookings.empty}{" "}
        <Link href="/tours" className="text-primary hover:underline">
          {T.bookings.browse}
        </Link>
      </div>
    )
  }

  return (
    <ul className="mt-6 space-y-3">
      {bookings.map((b) => (
        <li key={b.id} className="rounded-xl border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href={`/tours/${b.tour.slug}`}
                className="text-lg font-semibold hover:text-primary"
              >
                <LocalizedText uk={b.tour.titleUk} en={b.tour.titleEn} />
              </Link>
              <div className="mt-1 text-sm text-muted-foreground">
                <LocalizedText uk={b.tour.countryUk} en={b.tour.countryEn} />,{" "}
                <LocalizedText uk={b.tour.cityUk} en={b.tour.cityEn} /> ·{" "}
                <LocalizedText uk={b.tour.hotelUk} en={b.tour.hotelEn} />
              </div>
              <div className="mt-2 text-sm">
                {T.bookings.departure}:{" "}
                <strong><LocalizedDate date={b.departDate} /></strong> · {b.tour.nights}{" "}
                {T.bookings.nights} · {b.adults} {T.bookings.adults}
                {b.children > 0 && `, ${b.children} ${T.bookings.children}`}
              </div>
              {b.comment && (
                <p className="mt-2 text-sm text-muted-foreground">“{b.comment}”</p>
              )}
            </div>
            <div className="text-right">
              {/* Якщо є snapshot — показуємо саме його (точна сума, яку бачив юзер при бронюванні). */}
              <div className="text-lg font-bold">
                {b.displayTotal != null && b.displayCurrency
                  ? formatAmountInCurrency(b.displayTotal, b.displayCurrency as Currency)
                  : formatPrice(b.total)}
              </div>
              <div className="mt-1 inline-flex rounded-full bg-muted px-2 py-1 text-xs font-medium">
                {b.status}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
