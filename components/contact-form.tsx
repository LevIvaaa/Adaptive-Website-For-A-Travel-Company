"use client"

import { useMemo } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useT } from "@/lib/i18n"

type ContactInput = {
  name: string
  phone: string
  email: string
  message: string
}

const NAME_REGEX = /^[\p{L}\s'\-]+$/u

export function ContactForm() {
  const T = useT()

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, T.contactForm.errName)
          .max(80)
          .regex(NAME_REGEX, T.contactForm.errNameChars),
        phone: z.string().min(6, T.contactForm.errPhone),
        email: z
          .string()
          .min(1, T.contactForm.errEmailEmpty)
          .email(T.contactForm.errEmail),
        message: z.string().min(5, T.contactForm.errMessage)
      }),
    [T]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? "Failed to send request")
      }
      return res.json()
    },
    onSuccess: () => reset()
  })

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
        <Check className="h-10 w-10 text-emerald-600" />
        <h3 className="text-lg font-semibold">{T.contactForm.successTitle}</h3>
        <p className="text-sm text-muted-foreground">{T.contactForm.successDesc}</p>
        <Button variant="outline" onClick={() => mutation.reset()}>
          {T.contactForm.successAgain}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="grid gap-4 sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="name">{T.contactForm.name}</Label>
        <Input id="name" {...register("name")} placeholder={T.contactForm.namePh} className="mt-1.5" />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="phone">{T.contactForm.phone}</Label>
        <Input id="phone" {...register("phone")} type="tel" placeholder={T.contactForm.phonePh} className="mt-1.5" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="email">{T.contactForm.email}</Label>
        <Input id="email" {...register("email")} type="email" placeholder={T.contactForm.emailPh} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">{T.contactForm.message}</Label>
        <textarea
          id="message"
          {...register("message")}
          className="mt-1.5 min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder={T.contactForm.messagePh}
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" className="sm:col-span-2" disabled={mutation.isPending}>
        {mutation.isPending ? T.contactForm.submitting : T.contactForm.submit}
      </Button>
    </form>
  )
}
