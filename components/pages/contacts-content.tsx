"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { useT } from "@/lib/i18n"

export function ContactsContent() {
  const T = useT()

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold md:text-4xl">{T.contacts.title}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{T.contacts.description}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-3">
            <Card icon={<MapPin />} title={T.contacts.officeTitle} lines={[...T.contacts.officeLines]} />
            <Card icon={<Phone />} title={T.contacts.phoneTitle} lines={["+38 (044) 123-45-67", "+38 (067) 123-45-67"]} />
            <Card icon={<Mail />} title={T.contacts.emailTitle} lines={["hello@mandry-svitu.ua"]} />
            <Card icon={<Clock />} title={T.contacts.scheduleTitle} lines={[...T.contacts.scheduleLines]} />
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">{T.contacts.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{T.contacts.formDesc}</p>
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
