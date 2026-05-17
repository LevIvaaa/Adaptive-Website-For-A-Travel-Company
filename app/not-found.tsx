"use client"

// Кастомна сторінка 404. App Router показує її автоматично, коли
// будь-яка сторінка викликає notFound() або шлях не знайдено.
// Шапка/футер успадковуються з кореневого layout — не дублюємо їх тут.
import Link from "next/link"
import { useEffect } from "react"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/lib/i18n"

export default function NotFound() {
  const T = useT()

  useEffect(() => {
    document.title = `404 · Travel Agency`
  }, [])

  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="text-4xl font-bold md:text-5xl">404</h1>
      <p className="max-w-md text-muted-foreground">{T.notFound.description}</p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href="/">{T.notFound.home}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tours">{T.notFound.tours}</Link>
        </Button>
      </div>
    </section>
  )
}
