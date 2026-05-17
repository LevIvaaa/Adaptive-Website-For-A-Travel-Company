"use client"

import { useRouter } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TravelersPicker } from "@/components/travelers-picker"
import { DestinationPicker } from "@/components/destination-picker"
import { useT } from "@/lib/i18n"

// Поля форми пошуку. Замість одного date — діапазон dateFrom/dateTo.
interface FormValues {
  destination: string
  dateFrom: string
  dateTo: string
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
      dateFrom: "",
      dateTo: "",
      adults: 2,
      children: 0,
      infants: 0
    }
  })

  const destination = useWatch({ control, name: "destination" })
  const dateFrom = useWatch({ control, name: "dateFrom" })
  const dateTo = useWatch({ control, name: "dateTo" })
  const adults = useWatch({ control, name: "adults" })
  const children = useWatch({ control, name: "children" })
  const infants = useWatch({ control, name: "infants" })

  const today = new Date().toISOString().split("T")[0]
  const hasInput = Boolean(destination || dateFrom || dateTo)
  // Помилка діапазону дат — коли «до» раніше за «від». Показуємо одразу під полями.
  const datesInvalid = Boolean(dateFrom && dateTo && dateTo < dateFrom)
  const canSubmit = hasInput && !datesInvalid

  const onSubmit = (data: FormValues) => {
    const params = new URLSearchParams()
    if (data.destination) params.set("q", data.destination)
    if (data.dateFrom && data.dateFrom >= today) params.set("dateFrom", data.dateFrom)
    // dateTo має бути не раніше dateFrom — інакше відкидаємо.
    if (data.dateTo && data.dateTo >= today && (!data.dateFrom || data.dateTo >= data.dateFrom)) {
      params.set("dateTo", data.dateTo)
    }
    if (data.adults && data.adults !== 2) params.set("adults", String(data.adults))
    if (data.children && data.children > 0) params.set("children", String(data.children))
    if (data.infants && data.infants > 0) params.set("infants", String(data.infants))
    const qs = params.toString()
    router.push(qs ? `/tours?${qs}` : "/tours")
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 rounded-2xl bg-white p-4 text-slate-800 shadow-xl md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] md:items-end md:gap-2 md:p-3"
    >
      <DestinationPicker
        value={destination}
        onChange={(v) => setValue("destination", v)}
      />

      {/* Пара інпутів «від»/«до» — щоб юзер задавав інтервал поїздки. */}
      <label className="flex flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 md:bg-transparent">
        <span className="text-xs font-semibold uppercase text-slate-500">{T.search.dateFrom}</span>
        <input
          {...register("dateFrom")}
          type="date"
          min={today}
          onClick={(e) => {
            const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
            try { el.showPicker?.() } catch {}
          }}
          className="w-full cursor-pointer bg-transparent text-sm outline-none"
        />
      </label>

      <label className="flex flex-col gap-0.5 rounded-lg bg-muted/60 px-3 py-2 md:bg-transparent">
        <span className="text-xs font-semibold uppercase text-slate-500">{T.search.dateTo}</span>
        <input
          {...register("dateTo")}
          type="date"
          min={dateFrom || today}
          onClick={(e) => {
            const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
            try { el.showPicker?.() } catch {}
          }}
          aria-invalid={datesInvalid}
          className={`w-full cursor-pointer bg-transparent text-sm outline-none ${datesInvalid ? "text-destructive" : ""}`}
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

      {/* Якщо нічого не введено АБО діапазон дат невалідний — кнопка disabled. */}
      <Button
        type="submit"
        size="lg"
        className="md:self-stretch"
        disabled={!canSubmit}
        title={!canSubmit ? (datesInvalid ? T.search.datesInvalid : T.search.submitHint) : undefined}
      >
        <Search className="h-4 w-4" />
        {T.search.submit}
      </Button>

      {datesInvalid && (
        <p className="text-xs text-destructive md:col-span-5">{T.search.datesInvalid}</p>
      )}
    </form>
  )
}
