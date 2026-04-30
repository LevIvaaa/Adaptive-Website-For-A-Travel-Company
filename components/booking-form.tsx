"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthDialog } from "@/components/auth-dialog"

const schema = z.object({
  adults: z.coerce.number().int().min(1).max(10),
  children: z.coerce.number().int().min(0).max(10),
  departDate: z.string().min(1, "Pick a date"),
  comment: z.string().max(1000).optional()
})
type Input = z.infer<typeof schema>

export function BookingForm({ tourId }: { tourId: string }) {
  const { data: session } = useSession()
  const [authOpen, setAuthOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Input>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 2, children: 0 }
  })

  const mutation = useMutation({
    mutationFn: async (data: Input) => {
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
        <Input id="departDate" type="date" {...register("departDate")} className="mt-1.5" />
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
        <Label htmlFor="comment">Comment</Label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={3}
          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          placeholder="Any preferences? (optional)"
        />
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
