"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useFavorites } from "@/lib/store"

export function FavouritesIcon() {
  const count = useFavorites((s) => s.ids.length)
  return (
    <Link
      href="/favourites"
      aria-label="Favourites"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
    >
      <Heart className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-[1rem] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
    </Link>
  )
}
