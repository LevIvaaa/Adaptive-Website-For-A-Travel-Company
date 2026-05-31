"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useT } from "@/lib/i18n"

interface Profile {
  firstName: string
  lastName: string
  phone: string | null
  email: string
}

export default function SettingsPage() {
  const T = useT()
  const router = useRouter()
  const { status } = useSession()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    document.title = `${T.settings.title} · Travel Agency`
  }, [T])

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/")
  }, [status, router])

  const { data: profile } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const r = await fetch("/api/user")
      if (!r.ok) throw new Error()
      return r.json()
    },
    enabled: status === "authenticated"
  })

  const schema = z.object({
    firstName: z.string().min(2, T.settings.errFirst),
    lastName: z.string().min(2, T.settings.errLast),
    phone: z.string().optional().or(z.literal(""))
  })
  type Values = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Values>({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone ?? ""
      })
    }
  }, [profile, reset])

  const mutation = useMutation({
    mutationFn: async (data: Values) => {
      const r = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!r.ok) throw new Error()
      return r.json()
    },
    onSuccess: () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  })

  if (!profile) {
    return (
      <section className="container py-10">
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
      </section>
    )
  }

  return (
    <section className="container max-w-xl py-10">
      <Link href="/account" className="text-sm text-muted-foreground hover:text-primary">
        {T.account.back}
      </Link>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">{T.settings.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{T.settings.description}</p>

      <form
        onSubmit={handleSubmit((d) => mutation.mutate(d))}
        className="mt-6 space-y-4 rounded-xl border bg-card p-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName">{T.settings.firstName}</Label>
            <Input id="firstName" {...register("firstName")} className="mt-1.5" />
            {errors.firstName && (
              <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">{T.settings.lastName}</Label>
            <Input id="lastName" {...register("lastName")} className="mt-1.5" />
            {errors.lastName && (
              <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="phone">{T.settings.phone}</Label>
          <Input id="phone" type="tel" {...register("phone")} className="mt-1.5" />
        </div>

        <div>
          <Label htmlFor="email">{T.settings.email}</Label>
          <Input id="email" type="email" value={profile.email} readOnly className="mt-1.5 bg-muted" />
        </div>

        {saved && (
          <p className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <Check className="h-4 w-4" /> {T.settings.saved}
          </p>
        )}

        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? T.settings.saving : T.settings.save}
        </Button>
      </form>
    </section>
  )
}
