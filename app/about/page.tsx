"use client"

import { useEffect } from "react"
import { useT } from "@/lib/i18n"

export default function AboutPage() {
  const T = useT()

  useEffect(() => {
    document.title = `${T.about.title} · Travel Agency`
  }, [T])

  const yearsOnMarket = new Date().getFullYear() - 2012
  const stats = [
    { value: `${yearsOnMarket}+`, label: T.about.stats.years },
    { value: "180", label: T.about.stats.destinations },
    { value: "42 000", label: T.about.stats.clients },
    { value: "4.9", label: T.about.stats.rating }
  ]

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold md:text-4xl">{T.about.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{T.about.description}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl space-y-5 text-foreground/90">
          <h2 className="text-2xl font-bold">{T.about.storyTitle}</h2>
          <p>{T.about.storyPar1}</p>
          <p>{T.about.storyPar2}</p>
          <p>{T.about.storyPar3}</p>
        </div>
      </section>
    </>
  )
}
