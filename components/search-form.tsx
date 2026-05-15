"use client"

import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TravelersPicker } from "@/components/travelers-picker"
import { DestinationPicker } from "@/components/destination-picker"
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

  const destination = useWatch({ control, name: "destination" })
  const adults = useWatch({ control, name: "adults" })
  const children = useWatch({ control, name: "children" })
  const infants = useWatch({ control, name: "infants" })

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()
    if (data.destination) params.set("q", data.destination)
    if (data.date) params.set("date", data.date)
    if (data.adults && data.adults !== 2) params.set("adults", String(data.adults))
    if (data.children && data.children > 0) params.set("children", String(data.children))
    if (data.infants && data.infants > 0) params.set("infants", String(data.infants))
    const qs = params.toString()
    router.push(qs ? `/tours?${qs}` : "/tours")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 rounded-2xl bg-white p-4 text-slate-800 shadow-xl md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end md:gap-2 md:p-3"
    >
      <DestinationPicker
        value={destination}
        onChange={(v) => setValue("destination", v)}
      />

      <label className="flex flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 md:bg-transparent">
        <span className="text-xs font-semibold uppercase text-slate-500">{T.search.date}</span>
        <input
          {...register("date")}
          type="date"
          onClick={(e) => {
            const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
            el.showPicker?.()
          }}
          onFocus={(e) => {
            const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
            el.showPicker?.()
          }}
          className="w-full cursor-pointer bg-transparent text-sm outline-none"
        />
      </label>

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
