"use client"

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
import { formatPrice } from "@/lib/utils"

const schema = z.object({
  adults: z.coerce.number().int().min(1).max(10),
  children: z.coerce.number().int().min(0).max(10),
  nights: z.coerce.number().int().min(1).max(30),
  departDate: z
    .string()
    .min(1, "Pick a date")
    .refine((v) => {
      const d = new Date(v)
      if (Number.isNaN(d.getTime())) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return d >= today
    }, "Departure date can't be in the past"),
  comment: z.string().max(1000).optional()
})

const todayIso = () => new Date().toISOString().split("T")[0]
type FormInput = z.infer<typeof schema>

interface Props {
  tourId: string
  basePrice: number
  baseNights: number
}

export function BookingForm({ tourId, basePrice, baseNights }: Props) {
  const { data: session, status } = useSession()
  const { currency } = useCurrency()
  const T = useT()
  const [authOpen, setAuthOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 2, children: 0, nights: baseNights }
  })

  const rawAdults = useWatch({ control, name: "adults" })
  const rawChildren = useWatch({ control, name: "children" })
  const rawNights = useWatch({ control, name: "nights" })

  const adults = clampInt(rawAdults, 1, 10, 2)
  const children = clampInt(rawChildren, 0, 10, 0)
  const nights = clampInt(rawNights, 1, 30, baseNights)
  const inputsValid =
    isValidInt(rawAdults, 1, 10) &&
    isValidInt(rawChildren, 0, 10) &&
    isValidInt(rawNights, 1, 30)

  const total = Math.round(basePrice * (nights / baseNights) * (adults + 0.5 * children))

  const mutation = useMutation({
    mutationFn: async (data: FormInput) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId, ...data })
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

  return (
    <form
      onSubmit={handleSubmit((d) => mutation.mutate(d))}
      className="space-y-3"
    >
      <div>
        <Label htmlFor="departDate">{T.bookingForm.departure}</Label>
        <Input
          id="departDate"
          type="date"
          min={todayIso()}
          {...register("departDate")}
          onClick={(e) => {
            const el = e.currentTarget as HTMLInputElement & { showPicker?: () => void }
            el.showPicker?.()
          }}
          className="mt-1.5 cursor-pointer"
        />
        {errors.departDate && (
          <p className="mt-1 text-xs text-destructive">{errors.departDate.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="adults">{T.bookingForm.adults}</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            max={10}
            {...register("adults")}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="children">{T.bookingForm.children}</Label>
          <Input
            id="children"
            type="number"
            min={0}
            max={10}
            {...register("children")}
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="nights">{T.bookingForm.nights}</Label>
        <Input
          id="nights"
          type="number"
          min={1}
          max={30}
          {...register("nights")}
          className="mt-1.5"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {T.bookingForm.baseDuration(baseNights)}
        </p>
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
            {formatPrice(total, currency)}
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

function clampInt(value: unknown, min: number, max: number, fallback: number) {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

function isValidInt(value: unknown, min: number, max: number) {
  const n = Number(value)
  return Number.isInteger(n) && n >= min && n <= max
}
