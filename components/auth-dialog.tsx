"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters")
})
type LoginInput = z.infer<typeof loginSchema>

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Required"),
    lastName: z.string().min(2, "Required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(6, "Required"),
    password: z.string().min(8, "Min 8 characters"),
    confirm: z.string()
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match"
  })
type RegisterInput = z.infer<typeof registerSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTab?: "login" | "register"
}

export function AuthDialog({ open, onOpenChange, initialTab = "login" }: Props) {
  const [tab, setTab] = useState<"login" | "register">(initialTab)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{tab === "login" ? "Welcome back" : "Create account"}</DialogTitle>
        <DialogDescription>
          {tab === "login"
            ? "Sign in to see your bookings and favourites."
            : "Register to save tours and manage your bookings."}
        </DialogDescription>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginPanel onClose={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="register">
            <RegisterPanel onSwitchToLogin={() => setTab("login")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function LoginPanel({ onClose }: { onClose: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginInput) {
    setError(null)
    setSubmitting(true)
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })
    setSubmitting(false)
    if (res?.error) {
      setError("Wrong email or password")
      return
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" {...register("email")} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          {...register("password")}
          className="mt-1.5"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Signing in..." : "Log in"}
      </Button>
    </form>
  )
}

function RegisterPanel({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: RegisterInput) {
    setError(null)
    setSubmitting(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password
      })
    })

    if (res.ok) {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password
      })
      window.location.reload()
      return
    }

    const body = await res.json().catch(() => ({}))
    setError(body.error ?? "Registration failed")
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="reg-first">First name</Label>
          <Input id="reg-first" {...register("firstName")} className="mt-1.5" />
          {errors.firstName && (
            <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-last">Last name</Label>
          <Input id="reg-last" {...register("lastName")} className="mt-1.5" />
          {errors.lastName && (
            <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="reg-email">Email</Label>
        <Input id="reg-email" type="email" {...register("email")} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="reg-phone">Phone</Label>
        <Input id="reg-phone" type="tel" {...register("phone")} className="mt-1.5" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="reg-password">Password</Label>
          <Input
            id="reg-password"
            type="password"
            {...register("password")}
            className="mt-1.5"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-confirm">Repeat</Label>
          <Input
            id="reg-confirm"
            type="password"
            {...register("confirm")}
            className="mt-1.5"
          />
          {errors.confirm && (
            <p className="mt-1 text-xs text-destructive">{errors.confirm.message}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
          {error === "Email already in use" && (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="ml-2 underline"
            >
              Log in
            </button>
          )}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Creating..." : "Create account"}
      </Button>
    </form>
  )
}
