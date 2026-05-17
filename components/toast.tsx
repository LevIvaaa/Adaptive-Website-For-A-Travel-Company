"use client"

import { useEffect, useState } from "react"
import { create } from "zustand"
import { Check, Heart } from "lucide-react"

interface ToastState {
  message: string | null
  show: (msg: string) => void
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (msg) => {
    set({ message: msg })
    setTimeout(() => set({ message: null }), 2500)
  }
}))

export function ToastViewport() {
  const message = useToast((s) => s.message)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || !message) return null

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg">
        <Heart className="h-4 w-4 fill-current" />
        {message}
      </div>
    </div>
  )
}
