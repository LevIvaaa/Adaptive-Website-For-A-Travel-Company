import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourView } from "./tour-view"
import { prisma } from "@/lib/prisma"

interface Props {
  params: { slug: string }
}

// Серверний title для початкового рендеру/SSR/SEO. Далі клієнт перепише його
// відповідно до вибраної локалі (див. useEffect у TourView).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } })
  if (!tour) return {}
  // Беремо англомовну назву — нейтральніше для SEO, ніж захардкоджена українська.
  return { title: tour.titleEn }
}

// Серверний компонент сторінки конкретного туру за slug.
export default async function TourPage({ params }: Props) {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } })
  if (!tour) notFound()
  return <TourView tour={tour} />
}
