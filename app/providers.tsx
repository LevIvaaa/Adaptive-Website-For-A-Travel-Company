"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { useState, type ReactNode } from "react"
import { FavoritesSync } from "@/components/favorites-sync"

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
        <FavoritesSync />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
