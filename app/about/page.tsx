import type { Metadata } from "next"
import { AboutContent } from "@/components/pages/about-content"

export const metadata: Metadata = {
  title: "Про нас"
}

export default function AboutPage() {
  return <AboutContent />
}
