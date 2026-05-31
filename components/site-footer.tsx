"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone, Plane, Send } from "lucide-react"
import { useT } from "@/lib/i18n"
import { navItems } from "@/lib/navigation"

export function SiteFooter() {
  const T = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary">
              <Plane className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">{T.brand}</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm text-slate-400">{T.footer.tagline}</p>

          <div className="mt-4 flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Telegram"
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 hover:bg-primary"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
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
          <h4 className="mb-3 font-semibold text-white">{T.footer.legal}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-white">
                {T.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                {T.footer.terms}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                {T.footer.cookies}
              </Link>
            </li>
          </ul>
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
              <a href="tel:+380441234567" className="hover:text-white">
                +38 (044) 123-45-67
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@travel-agency.com" className="hover:text-white">
                info@travel-agency.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container py-4 text-xs text-slate-500">
          © {year} {T.brand}. {T.footer.rights}
        </div>
      </div>
    </footer>
  )
}
