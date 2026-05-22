"use client"

// Клієнтський рендер однієї статті
import { useEffect } from "react"
import Link from "next/link"
import { useLocale } from "@/lib/store"
import { useT } from "@/lib/i18n"
import { LocalizedDate } from "@/components/localized-tour-fields"

interface Props {
  titleUk: string
  titleEn: string
  bodyUk: string
  bodyEn: string
  cover: string | null
  publishedAt: string
}

export function ArticleView({ titleUk, titleEn, bodyUk, bodyEn, cover, publishedAt }: Props) {
  const { locale } = useLocale()
  const T = useT()
  const title = locale === "uk" ? titleUk : titleEn
  const body = locale === "uk" ? bodyUk : bodyEn

  useEffect(() => {
    document.title = `${title} · Travel Agency`
  }, [title])

  return (
    <article className="container max-w-3xl py-10">
      <Link href="/articles" className="text-sm text-muted-foreground hover:text-primary">
        ← {T.articles.backToList}
      </Link>

      <h1 className="mt-4 text-3xl font-bold md:text-4xl">{title}</h1>
      <div className="mt-2 text-sm text-muted-foreground">
        <LocalizedDate date={publishedAt} />
      </div>

      {cover && (
        <img
          src={cover}
          alt=""
          className="mt-6 aspect-[16/9] w-full rounded-xl object-cover"
        />
      )}

      <div className="prose mt-6 max-w-none text-foreground/90">
        <p>{body}</p>
      </div>
    </article>
  )
}
