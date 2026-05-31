import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AccountPageContent } from "@/components/account-page-content"

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

  const serializedBookings = bookings.map((b) => ({
    id: b.id,
    total: b.total,
    displayTotal: b.displayTotal,
    displayCurrency: b.displayCurrency,
    status: b.status,
    departDate: b.departDate.toISOString(),
    adults: b.adults,
    children: b.children,
    tour: {
      slug: b.tour.slug,
      titleUk: b.tour.titleUk,
      titleEn: b.tour.titleEn,
      nights: b.tour.nights
    }
  }))

  return (
    <AccountPageContent
      firstName={user.firstName}
      email={user.email}
      bookingsCount={user._count.bookings}
      bookings={serializedBookings}
    />
  )
}
