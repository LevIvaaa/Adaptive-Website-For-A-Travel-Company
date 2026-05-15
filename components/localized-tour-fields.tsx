"use client"

import { useEffect, useState } from "react"
import { useLocale } from "@/lib/store"

interface Pair {
  uk: string
  en: string
}

export function LocalizedText({ uk, en }: Pair) {
  const { locale } = useLocale()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <>{uk}</>
  return <>{locale === "uk" ? uk : en}</>
}

export function LocalizedDate({ date }: { date: Date | string }) {
  const { locale } = useLocale()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const d = typeof date === "string" ? new Date(date) : date
  const fmt = mounted && locale === "en" ? "en-US" : "uk-UA"
  return <>{d.toLocaleDateString(fmt)}</>
}
