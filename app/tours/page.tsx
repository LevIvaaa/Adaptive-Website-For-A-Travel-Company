import type { Metadata } from "next"
import { Suspense } from "react"
import { TourFilters } from "@/components/tour-filters"
import { TourGrid } from "@/components/tour-grid"
import { TourSearch } from "@/components/tour-search"

export const metadata: Metadata = {
  title: "Tour catalogue"
}

export const dynamic = "force-dynamic"

export default function ToursPage() {
  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-10">
          <h1 className="text-3xl font-bold md:text-4xl">Tour catalogue</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Browse all current offers, search by destination and filter to find your match.
          </p>
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
