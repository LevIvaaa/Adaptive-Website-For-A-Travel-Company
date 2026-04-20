"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Plane } from "lucide-react"
import { navItems } from "@/lib/navigation"
import { useT } from "@/lib/i18n"

export function SiteFooter() {
  const T = useT()

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary">
              <Plane className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">Мандри Світу</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-slate-400">{T.footer.tagline}</p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">{T.footer.menu}</h4>
          <ul className="space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {T.nav[item.id]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">{T.footer.contacts}</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              м. Київ, вул. Саксаганського 28
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+380441234567" className="hover:text-white">+38 (044) 123-45-67</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:hello@mandry-svitu.ua" className="hover:text-white">hello@mandry-svitu.ua</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Мандри Світу. {T.footer.rights}
      </div>
    </footer>
  )
}
