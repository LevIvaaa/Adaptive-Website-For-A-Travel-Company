"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FavoritesCount } from "@/components/favorites-count"
import { LocalizedText, LocalizedDate } from "@/components/localized-tour-fields"
import { useT } from "@/lib/i18n"
import { formatPrice, formatAmountInCurrency } from "@/lib/utils"
import type { Currency } from "@/lib/store"

interface Booking {
  id: string
  total: number
  displayTotal: number | null
  displayCurrency: string | null
  status: string
  departDate: string | Date
  adults: number
  children: number
  tour: {
    slug: string
    titleUk: string
    titleEn: string
    nights: number
  }
}

interface Props {
  firstName: string
  email: string
  bookingsCount: number
  bookings: Booking[]
}

export function AccountPageContent({ firstName, email, bookingsCount, bookings }: Props) {
  const T = useT()

  useEffect(() => {
    document.title = `${T.userMenu.account} · Travel Agency`
  }, [T])

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        {T.account.hi}, {firstName}!
      </h1>
      <p className="mt-2 text-muted-foreground">{email}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">{bookingsCount}</div>
          <div className="mt-1 text-sm text-muted-foreground">{T.account.bookings}</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">
            <FavoritesCount />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{T.account.favorites}</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">3%</div>
          <div className="mt-1 text-sm text-muted-foreground">{T.account.loyalty}</div>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-2xl font-bold">{T.account.recentBookings}</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/account/bookings">{T.account.allBookings}</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-4 rounded-xl border bg-card p-8 text-center text-muted-foreground">
          {T.account.noBookings}{" "}
          <Link href="/tours" className="text-primary hover:underline">
            {T.account.browseTours}
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between rounded-xl border bg-card p-4"
            >
              <div>
                <Link
                  href={`/tours/${b.tour.slug}`}
                  className="font-semibold hover:text-primary"
                >
                  <LocalizedText uk={b.tour.titleUk} en={b.tour.titleEn} />
                </Link>
                <div className="text-sm text-muted-foreground">
                  {T.bookings.departure}: <LocalizedDate date={b.departDate} /> · {b.tour.nights}{" "}
                  {T.bookings.nights} · {b.adults} {T.bookings.adults}
                  {b.children > 0 && `, ${b.children} ${T.bookings.children}`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {b.displayTotal != null && b.displayCurrency
                    ? formatAmountInCurrency(b.displayTotal, b.displayCurrency as Currency)
                    : formatPrice(b.total)}
                </div>
                <div className="text-xs uppercase text-muted-foreground">{b.status}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
