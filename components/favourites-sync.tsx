"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useFavorites } from "@/lib/store"

export function FavouritesSync() {
  const { status } = useSession()
  const setAuthenticated = useFavorites((s) => s.setAuthenticated)
  const setAll = useFavorites((s) => s.setAll)

  useEffect(() => {
    if (status === "authenticated") {
      const localIds = useFavorites.getState().ids
      Promise.all(
        localIds.map((id) =>
          fetch("/api/favourites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tourId: id })
          }).catch(() => {})
        )
      ).then(() =>
        fetch("/api/favourites")
          .then((r) => r.json())
          .then((ids: string[]) => {
            setAll(ids)
            setAuthenticated(true)
          })
          .catch(() => setAuthenticated(true))
      )
    } else if (status === "unauthenticated") {
      setAuthenticated(false)
    }
  }, [status, setAll, setAuthenticated])

  return null
}
