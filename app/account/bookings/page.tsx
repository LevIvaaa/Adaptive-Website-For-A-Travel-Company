import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { BookingsPageHeading } from "@/components/bookings-page-heading"
import { BookingsList } from "@/components/bookings-list"
import { BackToAccountLink } from "@/components/back-to-account-link"

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/")

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { tour: true },
    orderBy: { createdAt: "desc" }
  })

  const serialized = bookings.map((b) => ({
    id: b.id,
    total: b.total,
    displayTotal: b.displayTotal,
    displayCurrency: b.displayCurrency,
    status: b.status,
    departDate: b.departDate.toISOString(),
    adults: b.adults,
    children: b.children,
    comment: b.comment,
    tour: {
      slug: b.tour.slug,
      titleUk: b.tour.titleUk,
      titleEn: b.tour.titleEn,
      countryUk: b.tour.countryUk,
      countryEn: b.tour.countryEn,
      cityUk: b.tour.cityUk,
      cityEn: b.tour.cityEn,
      hotelUk: b.tour.hotelUk,
      hotelEn: b.tour.hotelEn,
      nights: b.tour.nights
    }
  }))

  return (
    <section className="container py-10">
      <BackToAccountLink />
      <BookingsPageHeading />
      <BookingsList bookings={serialized} />
    </section>
  )
}
