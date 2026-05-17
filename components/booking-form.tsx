"use client"

// Форма бронювання туру. Доступна тільки залогіненим (інакше показує блок «Sign in to book»).
// Total рахується live при зміні дорослих/дітей/ночей, ціни — у вибраній валюті.
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthDialog } from "@/components/auth-dialog"
import { useCurrency } from "@/lib/store"
import { useT } from "@/lib/i18n"
import { formatAmountInCurrency } from "@/lib/utils"

const schema = z.object({
  adults: z.coerce.number().int().min(1).max(10),
  children: z.coerce.number().int().min(0).max(10),
  dateFrom: z.string().min(1, "Pick a date").refine((v) => {
    const today = new Date().toISOString().split("T")[0]
    return v >= today
  }, "Departure date can't be in the past"),
  dateTo: z.string().min(1, "Pick a return date"),
  comment: z.string().max(1000).optional()
}).refine((d) => d.dateTo > d.dateFrom, {
  path: ["dateTo"],
  message: "Return date must be after departure"
})

function todayIso() {
  return new Date().toISOString().split("T")[0]
}

// Скільки ночей між двома датами у форматі YYYY-MM-DD.
function nightsBetween(from: string, to: string) {
  if (!from || !to) return 0
  const ms = new Date(to).getTime() - new Date(from).getTime()
  if (!Number.isFinite(ms) || ms <= 0) return 0
  return Math.round(ms / 86400000)
}

type FormInput = z.infer<typeof schema>

interface Props {
  tourId: string
  basePrice: number
  baseNights: number
  // Дефолти, прокинуті зі сторінки туру, коли користувач прийшов з пошуку на головній.
  presetAdults?: number
  presetChildren?: number
  presetDate?: string
  presetDateTo?: string
  presetNights?: number
}

export function BookingForm({
  tourId,
  basePrice,
  baseNights,
  presetAdults,
  presetChildren,
  presetDate,
  presetDateTo,
  presetNights
}: Props) {
  const { data: session, status } = useSession()
  const { currency } = useCurrency()
  const T = useT()
  const [authOpen, setAuthOpen] = useState(false)

  // Рахуємо дефолтний dateTo: presetDateTo якщо є, інакше dateFrom + baseNights днів.
  const defaultDateTo = (() => {
    if (presetDateTo) return presetDateTo
    if (presetDate) {
      const d = new Date(presetDate)
      d.setDate(d.getDate() + (presetNights ?? baseNights))
      return d.toISOString().split("T")[0]
    }
    return ""
  })()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      adults: presetAdults && presetAdults >= 1 && presetAdults <= 10 ? presetAdults : 2,
      children: presetChildren && presetChildren >= 0 && presetChildren <= 10 ? presetChildren : 0,
      dateFrom: presetDate ?? "",
      dateTo: defaultDateTo
    }
  })

  const rawAdults = Number(useWatch({ control, name: "adults" }))
  const rawChildren = Number(useWatch({ control, name: "children" }))
  const dateFrom = useWatch({ control, name: "dateFrom" }) || ""
  const dateTo = useWatch({ control, name: "dateTo" }) || ""

  const adults = Math.max(1, Math.min(10, Number.isFinite(rawAdults) ? rawAdults : 2))
  const children = Math.max(0, Math.min(10, Number.isFinite(rawChildren) ? rawChildren : 0))
  // Ночі рахуємо з обраного діапазону. Якщо невалідно — fallback на базову тривалість туру.
  const computedNights = nightsBetween(dateFrom, dateTo)
  const nights = computedNights >= 1 && computedNights <= 30 ? computedNights : baseNights

  const adultsError = Number.isFinite(rawAdults) && (rawAdults < 1 || rawAdults > 10)
  const childrenError = Number.isFinite(rawChildren) && (rawChildren < 0 || rawChildren > 10)
  // Помилка дат: «до» має бути пізніше «від» і не пізніше ніж +30 ночей.
  const datesError = Boolean(dateFrom && dateTo && (dateTo <= dateFrom || computedNights > 30))
  const inputsValid = !adultsError && !childrenError && !datesError && Boolean(dateFrom && dateTo)

  // Total для відображення: рахуємо у валюті користувача через ОКРУГЛЕНУ ціну за людину.
  // Інакше «$723 × 2» давало б 1446, а ми показували 1445 (через round тільки на фінальному UAH).
  // Тепер $723 × 2 → $1446 — як інтуїтивно очікує користувач.
  const displayRates = { UAH: 1, USD: 1 / 40, EUR: 1 / 43 }
  const rate = displayRates[currency]
  const perPersonDisplay = Math.round(basePrice * rate)
  const total = Math.round(perPersonDisplay * (nights / baseNights) * (adults + 0.5 * children))

  const mutation = useMutation({
    mutationFn: async (data: FormInput) => {
      // Передаємо обчислені ночі + departDate (для зворотньої сумісності з API) +
      // snapshot displayTotal/displayCurrency, щоб у /account/bookings ціна збігалась.
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId,
          adults: data.adults,
          children: data.children,
          nights,
          departDate: data.dateFrom,
          returnDate: data.dateTo,
          comment: data.comment,
          displayTotal: total,
          displayCurrency: currency
        })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? "Booking failed")
      }
      return res.json()
    }
  })

  if (status === "loading") {
    return (
      <div className="space-y-3">
        <div className="h-9 animate-pulse rounded-md bg-muted" />
        <div className="h-9 animate-pulse rounded-md bg-muted" />
        <div className="h-9 animate-pulse rounded-md bg-muted" />
        <div className="h-20 animate-pulse rounded-md bg-muted" />
      </div>
    )
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center">
        <Check className="h-10 w-10 text-emerald-600" />
        <h3 className="font-semibold">{T.bookingForm.successTitle}</h3>
        <p className="text-sm text-muted-foreground">{T.bookingForm.successDesc}</p>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <>
        <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          {T.bookingForm.signInPrompt}
        </p>
        <Button className="mt-3 w-full" onClick={() => setAuthOpen(true)}>
          {T.bookingForm.signInButton}
        </Button>
        <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      </>
    )
  }

  const phone = session.user.phone
  const email = session.user.email

  return (
    <form
      onSubmit={handleSubmit((d) => mutation.mutate(d))}
      className="space-y-3"
    >
      {/* Показуємо контакти юзера — щоб він знав, як з ним зв'яжеться менеджер. */}
      <div className="rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
        {phone ? (
          <>
            {T.bookingForm.contactNote} <span className="font-semibold text-foreground">{phone}</span>
          </>
        ) : (
          <>
            {T.bookingForm.contactNoPhone} <span className="font-semibold text-foreground">{email}</span>
          </>
        )}
      </div>

      {/* Пара інпутів дат — як у hero-формі. Ночі рахуються з різниці і показуються readonly. */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="dateFrom">{T.bookingForm.dateFrom}</Label>
          <Input
            id="dateFrom"
            type="date"
            min={todayIso()}
            {...register("dateFrom")}
            onClick={(e) => {
              const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
              try { el.showPicker?.() } catch {}
            }}
            className="mt-1.5 cursor-pointer"
          />
          {errors.dateFrom && (
            <p className="mt-1 text-xs text-destructive">{errors.dateFrom.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="dateTo">{T.bookingForm.dateTo}</Label>
          <Input
            id="dateTo"
            type="date"
            min={dateFrom || todayIso()}
            {...register("dateTo")}
            onClick={(e) => {
              const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
              try { el.showPicker?.() } catch {}
            }}
            className="mt-1.5 cursor-pointer"
          />
          {errors.dateTo && (
            <p className="mt-1 text-xs text-destructive">{errors.dateTo.message}</p>
          )}
        </div>
      </div>

      {/* Підказка з обчисленою тривалістю поїздки. */}
      {dateFrom && dateTo && !datesError && (
        <p className="text-xs text-muted-foreground">
          {T.bookingForm.computedNights(nights)}
        </p>
      )}
      {datesError && (
        <p className="text-xs text-destructive">{T.bookingForm.datesError}</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="adults">{T.bookingForm.adults}</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            max={10}
            {...register("adults")}
            onBlur={(e) => {
              // Коли користувач виходить з поля — клампимо число в межі [1..10]
              const v = Number(e.currentTarget.value)
              if (!Number.isFinite(v) || v < 1) setValue("adults", 1, { shouldValidate: true })
              else if (v > 10) setValue("adults", 10, { shouldValidate: true })
            }}
            className="mt-1.5"
          />
          {adultsError && (
            <p className="mt-1 text-xs text-destructive">{T.bookingForm.adultsError}</p>
          )}
        </div>
        <div>
          <Label htmlFor="children">{T.bookingForm.children}</Label>
          <Input
            id="children"
            type="number"
            min={0}
            max={10}
            {...register("children")}
            onBlur={(e) => {
              const v = Number(e.currentTarget.value)
              if (!Number.isFinite(v) || v < 0) setValue("children", 0, { shouldValidate: true })
              else if (v > 10) setValue("children", 10, { shouldValidate: true })
            }}
            className="mt-1.5"
          />
          {childrenError && (
            <p className="mt-1 text-xs text-destructive">{T.bookingForm.childrenError}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="comment">{T.bookingForm.comment}</Label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={3}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder={T.bookingForm.commentPh}
        />
      </div>

      <div className="rounded-lg bg-primary/5 p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">{T.bookingForm.total}</span>
          <span className="text-2xl font-bold text-primary">
            {formatAmountInCurrency(total, currency)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {T.bookingForm.breakdown(adults, children, nights)}
        </p>
      </div>

      {mutation.isError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {(mutation.error as Error).message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={mutation.isPending || !inputsValid}
      >
        {mutation.isPending ? T.bookingForm.submitting : T.bookingForm.submit}
      </Button>
    </form>
  )
}
