"use client"

import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TravelersPicker } from "@/components/travelers-picker"
import { useT } from "@/lib/i18n"

interface FormValues {
  destination: string
  date: string
  adults: number
  children: number
  infants: number
}

export function SearchForm() {
  const router = useRouter()
  const T = useT()
  const { register, handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      destination: "",
      date: "",
      adults: 2,
      children: 0,
      infants: 0
    }
  })

  const adults = useWatch({ control, name: "adults" })
  const children = useWatch({ control, name: "children" })
  const infants = useWatch({ control, name: "infants" })

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()
    if (data.destination) params.set("q", data.destination)
    router.push(`/tours?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 rounded-2xl bg-white p-4 text-slate-800 shadow-xl md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end md:gap-2 md:p-3"
    >
      <Field label={T.search.destination}>
        <input
          {...register("destination")}
          type="text"
          placeholder={T.search.destinationPh}
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
        />
      </Field>

      <Field label={T.search.date}>
        <input
          {...register("date")}
          type="date"
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>

      <TravelersPicker
        value={{ adults, children, infants }}
        onChange={(v) => {
          setValue("adults", v.adults)
          setValue("children", v.children)
          setValue("infants", v.infants)
        }}
      />

      <Button type="submit" size="lg" className="md:self-stretch">
        <Search className="h-4 w-4" />
        {T.search.submit}
      </Button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 md:bg-transparent">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      {children}
    </label>
  )
}
