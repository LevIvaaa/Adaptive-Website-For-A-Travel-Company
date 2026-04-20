import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, Clock, MapPin, Star, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tours } from "@/lib/tours"
import { formatPrice } from "@/lib/utils"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tour = tours.find((t) => t.slug === params.slug)
  return tour ? { title: tour.title } : {}
}

export default function TourPage({ params }: Props) {
  const tour = tours.find((t) => t.slug === params.slug)
  if (!tour) notFound()

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Головна</Link> /{" "}
          <Link href="/tours" className="hover:text-primary">Тури</Link> / {tour.country}
        </div>
      </section>

      <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {tour.country}, {tour.city}
          </div>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{tour.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{tour.rating}</span>
            </span>
            <span className="text-muted-foreground">{tour.hotel}</span>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width:1024px) 700px, 100vw"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border bg-card p-5 sm:grid-cols-3">
            <Fact icon={<Clock />} label="Тривалість" value={`${tour.nights} ночей`} />
            <Fact icon={<Utensils />} label="Харчування" value={tour.meal} />
            <Fact icon={<Star />} label="Рейтинг" value={`${tour.rating}/5`} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Про тур</h2>
            <p className="mt-3 text-foreground/90">{tour.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Що включено</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {tour.included.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-md">
            <div className="text-sm text-muted-foreground">Ціна від</div>
            <div className="mt-1 text-3xl font-bold">{formatPrice(tour.price)}</div>
            <div className="mt-1 text-xs text-muted-foreground">на 2 дорослих з перельотом</div>

            <Button asChild className="mt-5 w-full" size="lg">
              <Link href="/contacts">Забронювати</Link>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/contacts">Запитати менеджера</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  )
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  )
}
