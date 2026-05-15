"use client"

import { useFavorites } from "@/lib/store"

export function FavouritesCount() {
  const ids = useFavorites((s) => s.ids)
  return <>{ids.length}</>
}
