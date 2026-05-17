import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { FavoritesCount } from "@/components/favorites-count"
import { LocalizedText, LocalizedDate } from "@/components/localized-tour-fields"
import { formatPrice } from "@/lib/utils"

export default async function AccountPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/")

  const [user, bookings] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
        _count: { select: { bookings: true } }
      }
    }),
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: { tour: true },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ])

  if (!user) redirect("/")

  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        Hi, {user.firstName}!
      </h1>
      <p className="mt-2 text-muted-foreground">{user.email}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">{user._count.bookings}</div>
          <div className="mt-1 text-sm text-muted-foreground">Bookings</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">
            <FavoritesCount />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">Favorites</div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-3xl font-bold text-primary">3%</div>
          <div className="mt-1 text-sm text-muted-foreground">Loyalty cashback</div>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Recent bookings</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/account/bookings">All bookings</Link>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-4 rounded-xl border bg-card p-8 text-center text-muted-foreground">
          You don’t have bookings yet.{" "}
          <Link href="/tours" className="text-primary hover:underline">
            Browse tours
          </Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {bookings.map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
              <div>
                <Link
                  href={`/tours/${b.tour.slug}`}
                  className="font-semibold hover:text-primary"
                >
                  <LocalizedText uk={b.tour.titleUk} en={b.tour.titleEn} />
                </Link>
                <div className="text-sm text-muted-foreground">
                  Departure: <LocalizedDate date={b.departDate} /> · {b.adults} adult
                  {b.adults > 1 ? "s" : ""}
                  {b.children > 0 && `, ${b.children} child${b.children > 1 ? "ren" : ""}`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatPrice(b.total)}</div>
                <div className="text-xs uppercase text-muted-foreground">{b.status}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
