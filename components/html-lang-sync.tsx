"use client"

import { useEffect } from "react"
import { useLocale } from "@/lib/store"

export function HtmlLangSync() {
  const { locale } = useLocale()
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
