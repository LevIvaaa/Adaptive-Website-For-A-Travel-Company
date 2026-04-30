import type { Metadata } from "next"
import { Suspense } from "react"
import { TourFilters } from "@/components/tour-filters"
import { TourGrid } from "@/components/tour-grid"

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
            All current offers of our agency.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[260px_1fr]">
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
