"use client"

import { Globe } from "lucide-react"
import { useLocale } from "@/lib/store"

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, toggle } = useLocale()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language"
      className={`inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium hover:bg-muted ${className ?? ""}`}
    >
      <Globe className="h-4 w-4" />
      {locale === "uk" ? "UA" : "EN"}
    </button>
  )
}
