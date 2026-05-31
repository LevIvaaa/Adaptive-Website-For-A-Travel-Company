"use client"

import { useEffect } from "react"
import { useT } from "@/lib/i18n"

export function BookingsPageHeading() {
  const T = useT()

  useEffect(() => {
    document.title = `${T.bookings.title} · Travel Agency`
  }, [T])

  return (
    <h1 className="mt-3 text-3xl font-bold md:text-4xl">{T.bookings.title}</h1>
  )
}
