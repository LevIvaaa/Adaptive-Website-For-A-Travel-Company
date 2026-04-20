import type { Metadata } from "next"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Контакти"
}

export default function ContactsPage() {
  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold md:text-4xl">Контакти</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Заходьте в офіс або пишіть у зручному месенджері.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-3">
            <Card icon={<MapPin />} title="Офіс" lines={["м. Київ", "вул. Саксаганського 28, офіс 14"]} />
            <Card icon={<Phone />} title="Телефон" lines={["+38 (044) 123-45-67", "+38 (067) 123-45-67"]} />
            <Card icon={<Mail />} title="Пошта" lines={["hello@mandry-svitu.ua"]} />
            <Card icon={<Clock />} title="Графік" lines={["Пн–Пт: 9:00 — 19:00", "Сб: 10:00 — 16:00"]} />
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Напишіть нам</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Опишіть очікування від відпочинку — менеджер підбере варіанти.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Card({
  icon,
  title,
  lines
}: {
  icon: React.ReactNode
  title: string
  lines: string[]
}) {
  return (
    <div className="flex gap-4 rounded-xl border bg-card p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
