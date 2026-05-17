"use client"

// Шапка сайту: лого, навігація, перемикач валюти/мови, обране, меню юзера.
// Прилипає до верху (sticky), на мобільних — гамбургер-меню.
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Plane, X } from "lucide-react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { CurrencySwitcher } from "@/components/currency-switcher"
import { UserMenu } from "@/components/user-menu"
import { FavoritesIcon } from "@/components/favorites-icon"
import { navItems } from "@/lib/navigation"
import { useT } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const T = useT()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Plane className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold">{T.brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  active ? "text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                {T.nav[item.id]}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CurrencySwitcher />
          <LocaleSwitcher />
          <FavoritesIcon />
          <UserMenu />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <FavoritesIcon />
          <UserMenu />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container flex flex-col gap-1 border-t py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              {T.nav[item.id]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
