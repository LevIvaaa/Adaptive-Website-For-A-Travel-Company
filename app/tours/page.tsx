import type { Metadata } from "next"
import { Suspense } from "react"
import { TourFilters } from "@/components/tour-filters"
import { TourGrid } from "@/components/tour-grid"
import { TourSearch } from "@/components/tour-search"
import { ToursPageHeading } from "@/components/tours-page-heading"

export const metadata: Metadata = {
  title: "Tour catalogue"
}

export const dynamic = "force-dynamic"

export default function ToursPage() {
  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-10">
          <ToursPageHeading />
          <div className="mt-6 max-w-2xl">
            <Suspense fallback={<div className="h-11 animate-pulse rounded-md bg-muted" />}>
              <TourSearch />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[280px_1fr]">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" />}>
            <TourFilters />
          </Suspense>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" />}>
            <TourGrid />
          </Suspense>
        </div>
      </section>
    </>
  )
}
