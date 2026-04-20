import type { Metadata } from "next"
import { ContactsContent } from "@/components/pages/contacts-content"

export const metadata: Metadata = {
  title: "Контакти"
}

export default function ContactsPage() {
  return <ContactsContent />
}
