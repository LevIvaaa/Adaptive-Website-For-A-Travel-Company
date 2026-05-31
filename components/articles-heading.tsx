"use client"

import { useEffect } from "react"
import { useT } from "@/lib/i18n"

export function ArticlesHeading() {
  const T = useT()

  useEffect(() => {
    document.title = `${T.articles.title} · Travel Agency`
  }, [T])

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">{T.articles.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{T.articles.description}</p>
    </>
  )
}
