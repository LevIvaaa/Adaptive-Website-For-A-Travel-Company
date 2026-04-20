"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useT } from "@/lib/i18n"

interface FormValues {
  destination: string
  date: string
  travelers: string
}

export function SearchForm() {
  const router = useRouter()
  const T = useT()
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
      <Field label={T.search.destination}>
        <input
          {...register("destination")}
          type="text"
          placeholder={T.search.destinationPh}
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>
      <Field label={T.search.date}>
        <input
          {...register("date")}
          type="date"
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>
      <Field label={T.search.travelers}>
        <select {...register("travelers")} className="w-full bg-transparent text-sm outline-none">
          {T.search.options.map((opt, i) => (
            <option key={i} value={String(i + 1)}>{opt}</option>
          ))}
        </select>
      </Field>
      <Button type="submit" size="lg" className="md:self-stretch">
        <Search className="h-4 w-4" />
        {T.search.submit}
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
