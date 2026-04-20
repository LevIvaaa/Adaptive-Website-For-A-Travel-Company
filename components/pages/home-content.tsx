"use client"

import Image from "next/image"
import Link from "next/link"
import { HeartHandshake, ShieldCheck, Wallet } from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { TourCard } from "@/components/tour-card"
import { Button } from "@/components/ui/button"
import { tours } from "@/lib/tours"
import { useT } from "@/lib/i18n"

export function HomeContent() {
  const T = useT()

  return (
    <>
      <section className="relative">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt=""
          fill
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-hero" />

        <div className="container flex min-h-[520px] flex-col justify-center py-16 text-white">
          <h1 className="max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">
            {T.home.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-white/90">{T.home.heroDescription}</p>
          <div className="mt-8">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase text-primary">
                {T.home.popularEyebrow}
              </div>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">{T.home.popularTitle}</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/tours">{T.home.allTours}</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.slice(0, 6).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{T.home.featuresTitle}</h2>
            <p className="mt-3 text-muted-foreground">{T.home.featuresDesc}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature
              icon={<ShieldCheck className="h-6 w-6" />}
              title={T.home.featureLicensed}
              text={T.home.featureLicensedText}
            />
            <Feature
              icon={<Wallet className="h-6 w-6" />}
              title={T.home.featurePrice}
              text={T.home.featurePriceText}
            />
            <Feature
              icon={<HeartHandshake className="h-6 w-6" />}
              title={T.home.featureSupport}
              text={T.home.featureSupportText}
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">{T.home.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">{T.home.ctaDesc}</p>
            <div className="mt-6">
              <Button asChild size="lg" variant="accent">
                <Link href="/contacts">{T.home.ctaButton}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Feature({
  icon,
  title,
  text
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}
