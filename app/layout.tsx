// Кореневий layout App Router'а. Тут визначаємо <html>/<body>, шрифти, шапку, футер, тости.
// Метадані (title template, OG, favicon) теж тут — успадковуються всіма сторінками.
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { Providers } from "./providers"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HtmlLangSync } from "@/components/html-lang-sync"
import { ToastViewport } from "@/components/toast"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
})

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "Travel Agency",
    template: "%s · Travel Agency"
  },
  description: "Travel agency — tours to Turkey, Egypt, Greece and other countries.",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    title: "Travel Agency",
    description: "Travel agency — tours to Turkey, Egypt, Greece and other countries.",
    type: "website",
    siteName: "Travel Agency"
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Agency",
    description: "Travel agency — tours to Turkey, Egypt, Greece and other countries."
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <HtmlLangSync />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ToastViewport />
        </Providers>
      </body>
    </html>
  )
}
