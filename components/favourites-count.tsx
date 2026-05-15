"use client"

import { useEffect, useState } from "react"
import { useFavorites } from "@/lib/store"

export function FavouritesCount() {
  const ids = useFavorites((s) => s.ids)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return <>{mounted ? ids.length : 0}</>
}
