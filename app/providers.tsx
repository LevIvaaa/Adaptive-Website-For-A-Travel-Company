"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { useState, type ReactNode } from "react"
import { FavouritesSync } from "@/components/favourites-sync"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false }
        }
      })
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <FavouritesSync />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
