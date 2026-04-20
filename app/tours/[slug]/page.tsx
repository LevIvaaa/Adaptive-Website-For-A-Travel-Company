import { notFound } from "next/navigation"
import { TourView } from "./tour-view"
import { tours } from "@/lib/tours"

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = tours.find((t) => t.slug === params.slug)
  if (!tour) notFound()
  return <TourView tour={tour} />
}
