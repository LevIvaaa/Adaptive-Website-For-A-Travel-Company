import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" }
  })
  return NextResponse.json(articles)
}
