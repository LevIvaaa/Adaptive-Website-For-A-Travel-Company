import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourView } from "./tour-view"
import { prisma } from "@/lib/prisma"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } })
  return tour ? { title: tour.titleUk } : {}
}

export default async function TourPage({ params }: Props) {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } })
  if (!tour) notFound()
  return <TourView tour={tour} />
}
