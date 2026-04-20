import type { Metadata } from "next"
import { ToursContent } from "@/components/pages/tours-content"

export const metadata: Metadata = {
  title: "Каталог турів"
}

export default function ToursPage() {
  return <ToursContent />
}
