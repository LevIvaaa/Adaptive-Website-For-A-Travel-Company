"use client"

import { useLocale } from "@/lib/store"

export function LocalizedText({ uk, en }: { uk: string; en: string }) {
  const { locale } = useLocale()
  return <>{locale === "uk" ? uk : en}</>
}

export function LocalizedDate({ date }: { date: Date | string }) {
  const { locale } = useLocale()
  const d = typeof date === "string" ? new Date(date) : date
  return <>{d.toLocaleDateString(locale === "en" ? "en-US" : "uk-UA")}</>
}
