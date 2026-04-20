import type { Metadata } from "next"
import { LoginContent } from "@/components/pages/login-content"

export const metadata: Metadata = {
  title: "Вхід"
}

export default function LoginPage() {
  return <LoginContent />
}
