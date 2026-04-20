"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { contactSchema, type ContactInput } from "@/lib/validation"

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  const mutation = useMutation({
    mutationFn: async (data: ContactInput) => {
      await new Promise((r) => setTimeout(r, 600))
      return data
    },
    onSuccess: () => reset()
  })

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
        <Check className="h-10 w-10 text-emerald-600" />
        <h3 className="text-lg font-semibold">Заявку прийнято</h3>
        <p className="text-sm text-muted-foreground">
          Менеджер зв’яжеться з вами протягом 15 хвилин.
        </p>
        <Button variant="outline" onClick={() => mutation.reset()}>
          Надіслати ще одну
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
        <Label htmlFor="name">Ваше ім’я</Label>
        <Input id="name" {...register("name")} placeholder="Олена" className="mt-1.5" />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Телефон</Label>
        <Input id="phone" {...register("phone")} type="tel" placeholder="+380 __ ___ __ __" className="mt-1.5" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" {...register("email")} type="email" placeholder="you@example.com" className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">Повідомлення</Label>
        <textarea
          id="message"
          {...register("message")}
          className="mt-1.5 min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Напишіть, куди хочете поїхати та на скільки днів"
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" className="sm:col-span-2" disabled={mutation.isPending}>
        {mutation.isPending ? "Надсилаємо..." : "Надіслати заявку"}
      </Button>
    </form>
  )
}
