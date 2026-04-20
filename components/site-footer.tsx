"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Plane } from "lucide-react"
import { useT } from "@/lib/i18n"

export function SiteFooter() {
  const T = useT()

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="container grid gap-8 py-12 md:grid-cols-2">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary">
              <Plane className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">{T.brand}</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-slate-400">{T.footer.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">{T.footer.contacts}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {T.footer.address}
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+380441234567" className="hover:text-white">+38 (044) 123-45-67</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@travel-agency.com" className="hover:text-white">info@travel-agency.com</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
