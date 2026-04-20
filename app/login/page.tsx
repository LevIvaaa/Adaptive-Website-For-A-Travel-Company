"use client"

import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { useT } from "@/lib/i18n"

export default function LoginPage() {
  const T = useT()

  return (
    <section className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-bold">{T.loginPage.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {T.loginPage.subtitle}{" "}
          <Link href="/contacts" className="font-medium text-primary hover:underline">
            {T.loginPage.contactLink}
          </Link>
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
