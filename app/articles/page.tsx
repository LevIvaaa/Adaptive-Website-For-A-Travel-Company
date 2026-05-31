import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ArticlesHeading } from "@/components/articles-heading"
import { LocalizedText, LocalizedDate } from "@/components/localized-tour-fields"

export const dynamic = "force-dynamic"

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" }
  })

  const items = articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    titleUk: a.titleUk,
    titleEn: a.titleEn,
    excerptUk: a.excerptUk,
    excerptEn: a.excerptEn,
    cover: a.cover,
    publishedAt: a.publishedAt.toISOString()
  }))

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-10">
          <ArticlesHeading />
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={`/articles/${a.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {a.cover && (
                    <img
                      src={a.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground">
                    <LocalizedDate date={a.publishedAt} />
                  </div>
                  <h2 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary">
                    <LocalizedText uk={a.titleUk} en={a.titleEn} />
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <LocalizedText uk={a.excerptUk} en={a.excerptEn} />
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
