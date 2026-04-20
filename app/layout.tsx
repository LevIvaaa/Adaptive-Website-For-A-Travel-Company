import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import { Providers } from "./providers"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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
    default: "Туристическая компания",
    template: "%s · Туристическая компания"
  },
  description: "Підбираємо подорожі до Туреччини, Єгипту, Греції та інших країн."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
