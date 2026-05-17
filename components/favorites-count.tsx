"use client"

import { useFavorites } from "@/lib/store"

export function FavoritesCount() {
  const ids = useFavorites((s) => s.ids)
  return <>{ids.length}</>
}
