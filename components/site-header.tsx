"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Plane, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Plane className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold">Мандри Світу</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => {
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
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/login">Увійти</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border md:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="container flex flex-col gap-1 border-t py-3 md:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
            >
              {item.title}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <Link href="/login" onClick={() => setOpen(false)}>Увійти</Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
