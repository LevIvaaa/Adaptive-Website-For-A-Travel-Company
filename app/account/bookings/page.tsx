import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { formatPrice } from "@/lib/utils"
import { LocalizedText, LocalizedDate } from "@/components/localized-tour-fields"
import { BookingsPageHeading } from "@/components/bookings-page-heading"

// Сторінка «Мої бронювання». Серверна — тягне дані напряму через Prisma.
export default async function BookingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/")

  // Бронювання тільки поточного юзера, від нових до старих.
  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { tour: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <section className="container py-10">
      <Link href="/account" className="text-sm text-muted-foreground hover:text-primary">
        ← Account
      </Link>
      <BookingsPageHeading />

      {bookings.length === 0 ? (
        <div className="mt-6 rounded-xl border bg-card p-8 text-center text-muted-foreground">
          No bookings yet.{" "}
          <Link href="/tours" className="text-primary hover:underline">
            Browse tours
          </Link>
        </div>
      ) : (
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
                    Departure: <strong><LocalizedDate date={b.departDate} /></strong> ·{" "}
                    {b.tour.nights} night{b.tour.nights > 1 ? "s" : ""} ·{" "}
                    {b.adults} adult{b.adults > 1 ? "s" : ""}
                    {b.children > 0 && `, ${b.children} child${b.children > 1 ? "ren" : ""}`}
                  </div>
                  {b.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">“{b.comment}”</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatPrice(b.total)}</div>
                  <div className="mt-1 inline-flex rounded-full bg-muted px-2 py-1 text-xs font-medium">
                    {b.status}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
