import type { Metadata } from "next"
import { TourCard } from "@/components/tour-card"
import { tours } from "@/lib/tours"

export const metadata: Metadata = {
  title: "Каталог турів"
}

export default function ToursPage() {
  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-10">
          <h1 className="text-3xl font-bold md:text-4xl">Каталог турів</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Усі актуальні пропозиції нашої компанії.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Знайдено <span className="font-semibold text-foreground">{tours.length}</span> турів
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Сортувати:</span>
              <select className="rounded-md border border-input bg-background px-2 py-1.5 text-sm">
                <option>Популярні</option>
                <option>Спершу дешеві</option>
                <option>Спершу дорогі</option>
                <option>За рейтингом</option>
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
