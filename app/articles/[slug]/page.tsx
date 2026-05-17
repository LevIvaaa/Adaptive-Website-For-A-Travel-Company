// Сторінка окремої статті по slug. Серверна — рендеримо вміст одразу.
import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ArticleView } from "./article-view"

export const dynamic = "force-dynamic"

interface Props {
  params: { slug: string }
}

export default async function ArticlePage({ params }: Props) {
  const article = await prisma.article.findUnique({ where: { slug: params.slug } })
  if (!article) notFound()

  return (
    <ArticleView
      titleUk={article.titleUk}
      titleEn={article.titleEn}
      bodyUk={article.bodyUk}
      bodyEn={article.bodyEn}
      cover={article.cover}
      publishedAt={article.publishedAt.toISOString()}
    />
  )
}
