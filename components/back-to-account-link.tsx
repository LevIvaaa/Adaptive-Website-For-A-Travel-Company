"use client"

// Локалізована «← Особистий кабінет» — використовуємо в server-сторінках через client-обгортку.
import Link from "next/link"
import { useT } from "@/lib/i18n"

export function BackToAccountLink() {
  const T = useT()
  return (
    <Link href="/account" className="text-sm text-muted-foreground hover:text-primary">
      {T.account.back}
    </Link>
  )
}
