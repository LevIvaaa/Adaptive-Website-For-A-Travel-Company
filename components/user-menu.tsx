"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { ChevronDown, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/auth-dialog"
import { useT } from "@/lib/i18n"

export function UserMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "register">("login")
  const ref = useRef<HTMLDivElement>(null)
  const T = useT()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  if (status === "loading") {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
  }

  if (!session?.user) {
    return (
      <>
        <div className="hidden gap-2 md:flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setAuthTab("login")
              setAuthOpen(true)
            }}
          >
            {T.userMenu.logIn}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setAuthTab("register")
              setAuthOpen(true)
            }}
          >
            {T.userMenu.signUp}
          </Button>
        </div>
        <Button
          size="sm"
          className="md:hidden"
          onClick={() => {
            setAuthTab("login")
            setAuthOpen(true)
          }}
        >
          {T.userMenu.logIn}
        </Button>
        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} initialTab={authTab} />
      </>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium hover:bg-muted"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
          <User className="h-3.5 w-3.5" />
        </span>
        <span className="hidden max-w-[140px] truncate sm:inline">
          {session.user.name ?? session.user.email}
        </span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute right-0 top-11 z-50 min-w-[200px] overflow-hidden rounded-md border bg-background shadow-lg">
          <li className="border-b px-3 py-2 text-xs text-muted-foreground">
            {session.user.email}
          </li>
          <li>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm hover:bg-muted"
            >
              {T.userMenu.account}
            </Link>
          </li>
          <li>
            <Link
              href="/account/bookings"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm hover:bg-muted"
            >
              {T.userMenu.bookings}
            </Link>
          </li>
          <li>
            <Link
              href="/account/settings"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm hover:bg-muted"
            >
              {T.userMenu.settings}
            </Link>
          </li>
          <li className="border-t">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                signOut({ callbackUrl: "/" })
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              {T.userMenu.signOut}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
