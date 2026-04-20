"use client"

import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { useT } from "@/lib/i18n"

export default function ContactsPage() {
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
            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{T.contacts.officeTitle}</h3>
                <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {T.contacts.officeLines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{T.contacts.phoneTitle}</h3>
                <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  <p>+38 (044) 123-45-67</p>
                  <p>+38 (067) 123-45-67</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{T.contacts.emailTitle}</h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  <p>info@travel-agency.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{T.contacts.scheduleTitle}</h3>
                <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {T.contacts.scheduleLines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            </div>
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
