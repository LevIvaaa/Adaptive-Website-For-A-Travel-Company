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
import { formatPrice } from "@/lib/utils"

const schema = z.object({
  adults: z.coerce.number().int().min(1).max(10),
  children: z.coerce.number().int().min(0).max(10),
  nights: z.coerce.number().int().min(1).max(30),
  departDate: z.string().min(1, "Pick a date"),
  comment: z.string().max(1000).optional()
})
type FormInput = z.infer<typeof schema>

interface Props {
  tourId: string
  basePrice: number
  baseNights: number
}

export function BookingForm({ tourId, basePrice, baseNights }: Props) {
  const { data: session } = useSession()
  const { currency } = useCurrency()
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

  const adults = useWatch({ control, name: "adults" }) ?? 2
  const children = useWatch({ control, name: "children" }) ?? 0
  const nights = useWatch({ control, name: "nights" }) ?? baseNights

  const perNight = Math.round(basePrice / baseNights)
  const total = Math.round(perNight * nights * (Number(adults) + 0.5 * Number(children)))

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

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-center">
        <Check className="h-10 w-10 text-emerald-600" />
        <h3 className="font-semibold">Booking received</h3>
        <p className="text-sm text-muted-foreground">
          A manager will contact you within 15 minutes to confirm details.
        </p>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <>
        <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          Sign in to book this tour.
        </p>
        <Button className="mt-3 w-full" onClick={() => setAuthOpen(true)}>
          Log in / Sign up
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
        <Label htmlFor="departDate">Departure date</Label>
        <Input
          id="departDate"
          type="date"
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
          <Label htmlFor="adults">Adults</Label>
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
          <Label htmlFor="children">Children</Label>
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
        <Label htmlFor="nights">Nights</Label>
        <Input
          id="nights"
          type="number"
          min={1}
          max={30}
          {...register("nights")}
          className="mt-1.5"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Base tour duration: {baseNights} nights
        </p>
      </div>

      <div>
        <Label htmlFor="comment">Comment</Label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={3}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Any preferences? (optional)"
        />
      </div>

      <div className="rounded-lg bg-primary/5 p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatPrice(total, currency)}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {Number(adults)} adult{Number(adults) > 1 ? "s" : ""}
          {Number(children) > 0 && `, ${children} child${Number(children) > 1 ? "ren" : ""}`} · {nights} night{Number(nights) > 1 ? "s" : ""}
        </p>
      </div>

      {mutation.isError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {(mutation.error as Error).message}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
        {mutation.isPending ? "Booking..." : "Book now"}
      </Button>
    </form>
  )
}
