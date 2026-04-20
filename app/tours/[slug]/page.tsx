import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourDetailContent } from "@/components/pages/tour-detail-content"
import { tours } from "@/lib/tours"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tour = tours.find((t) => t.slug === params.slug)
  return tour ? { title: tour.title.uk } : {}
}

export default function TourPage({ params }: Props) {
  const tour = tours.find((t) => t.slug === params.slug)
  if (!tour) notFound()
  return <TourDetailContent tour={tour} />
}
