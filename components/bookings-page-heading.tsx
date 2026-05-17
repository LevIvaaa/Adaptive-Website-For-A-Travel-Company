"use client"

import { useEffect } from "react"
import { useT } from "@/lib/i18n"

// Невеликий клієнтський компонент: ставить локалізований <title> та виводить H1.
// Без нього сервер-сторінка /account/bookings отримує дефолтний "Travel Agency" у вкладці.
export function BookingsPageHeading() {
  const T = useT()

  useEffect(() => {
    document.title = `${T.bookings.title} · Travel Agency`
  }, [T])

  return (
    <h1 className="mt-3 text-3xl font-bold md:text-4xl">{T.bookings.title}</h1>
  )
}
