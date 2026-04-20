"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormValues {
  destination: string
  date: string
  travelers: string
}

export function SearchForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { destination: "", date: "", travelers: "2" }
  })

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()
    if (data.destination) params.set("q", data.destination)
    router.push(`/tours?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 rounded-2xl bg-white/95 p-4 text-slate-800 shadow-xl backdrop-blur md:grid-cols-[1.2fr_1fr_1fr_auto] md:gap-2"
    >
      <Field label="Куди">
        <input
          {...register("destination")}
          type="text"
          placeholder="Країна або курорт"
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>
      <Field label="Дата">
        <input
          {...register("date")}
          type="date"
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>
      <Field label="Туристів">
        <select {...register("travelers")} className="w-full bg-transparent text-sm outline-none">
          <option value="1">1 дорослий</option>
          <option value="2">2 дорослих</option>
          <option value="2+1">2 дорослих + 1 дитина</option>
          <option value="2+2">2 дорослих + 2 дитини</option>
        </select>
      </Field>
      <Button type="submit" size="lg" className="md:self-stretch">
        <Search className="h-4 w-4" />
        Шукати
      </Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-0.5 rounded-lg bg-muted/50 px-3 py-2 md:bg-transparent">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      {children}
    </label>
  )
}
