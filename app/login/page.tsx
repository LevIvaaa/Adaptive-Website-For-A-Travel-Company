import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export const metadata: Metadata = {
  title: "Вхід"
}

export default function LoginPage() {
  return (
    <section className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Вхід в особистий кабінет</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ще не маєте акаунта?{" "}
          <Link href="/contacts" className="font-medium text-primary hover:underline">
            Зв’яжіться з нами
          </Link>
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
