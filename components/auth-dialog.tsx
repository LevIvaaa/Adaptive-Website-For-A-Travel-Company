"use client"

// Модалка авторизації з двома вкладками: «Увійти» та «Реєстрація».
// Логін — через NextAuth signIn. Реєстрація — POST /api/register, потім автологін.
// + чекбокс згоди з обробкою персональних даних (GDPR/ЗУ "Про захист персональних даних").
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useT } from "@/lib/i18n"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTab?: "login" | "register"
}

export function AuthDialog({ open, onOpenChange, initialTab = "login" }: Props) {
  const T = useT()
  const [tab, setTab] = useState<"login" | "register">(initialTab)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          {tab === "login" ? T.authDialog.welcomeBack : T.authDialog.createAccount}
        </DialogTitle>
        <DialogDescription>
          {tab === "login" ? T.authDialog.loginDesc : T.authDialog.registerDesc}
        </DialogDescription>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{T.authDialog.loginTab}</TabsTrigger>
            <TabsTrigger value="register">{T.authDialog.registerTab}</TabsTrigger>
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
  const T = useT()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // «Запам'ятати мене» — нічого складного не робимо, просто прапорець (NextAuth cookies живуть 30 днів за замовч.)
  const [remember, setRemember] = useState(true)

  // Схема залежить від локалі (повідомлення про помилки) — обгортаємо в useMemo.
  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(T.authDialog.errEmail),
        password: z.string().min(8, T.authDialog.errPassword)
      }),
    [T]
  )
  type LoginInput = z.infer<typeof loginSchema>

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
      setError(T.authDialog.errWrong)
      return
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label htmlFor="login-email">{T.authDialog.email}</Label>
        <Input id="login-email" type="email" {...register("email")} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="login-password">{T.authDialog.password}</Label>
        <Input id="login-password" type="password" {...register("password")} className="mt-1.5" />
        {errors.password && (
          <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-3.5 w-3.5 accent-primary"
          />
          {T.authDialog.rememberMe}
        </label>
        <button
          type="button"
          onClick={() => alert(T.authDialog.forgotInfo)}
          className="text-primary hover:underline"
        >
          {T.authDialog.forgotPassword}
        </button>
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? T.authDialog.submittingLogin : T.authDialog.submitLogin}
      </Button>
    </form>
  )
}

function RegisterPanel({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const T = useT()
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const registerSchema = useMemo(
    () =>
      z
        .object({
          firstName: z.string().min(2, T.authDialog.errRequired),
          lastName: z.string().min(2, T.authDialog.errRequired),
          email: z.string().email(T.authDialog.errEmail),
          phone: z.string().min(6, T.authDialog.errRequired),
          password: z.string().min(8, T.authDialog.errPassword),
          confirm: z.string(),
          // Згода з обробкою персональних даних — обов'язкове поле.
          consent: z.literal(true, {
            errorMap: () => ({ message: T.authDialog.errConsent })
          })
        })
        .refine((v) => v.password === v.confirm, {
          path: ["confirm"],
          message: T.authDialog.errPasswordsMismatch
        }),
    [T]
  )
  type RegisterInput = z.infer<typeof registerSchema>

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
    setError(
      body.error === "Email already in use"
        ? T.authDialog.errEmailUsed
        : body.error ?? T.authDialog.registrationFailed
    )
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="reg-first">{T.authDialog.firstName}</Label>
          <Input id="reg-first" {...register("firstName")} className="mt-1.5" />
          {errors.firstName && (
            <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-last">{T.authDialog.lastName}</Label>
          <Input id="reg-last" {...register("lastName")} className="mt-1.5" />
          {errors.lastName && (
            <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="reg-email">{T.authDialog.email}</Label>
        <Input id="reg-email" type="email" {...register("email")} className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="reg-phone">{T.authDialog.phone}</Label>
        <Input id="reg-phone" type="tel" {...register("phone")} className="mt-1.5" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="reg-password">{T.authDialog.password}</Label>
          <Input id="reg-password" type="password" {...register("password")} className="mt-1.5" />
          {errors.password && (
            <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-confirm">{T.authDialog.repeat}</Label>
          <Input id="reg-confirm" type="password" {...register("confirm")} className="mt-1.5" />
          {errors.confirm && (
            <p className="mt-1 text-xs text-destructive">{errors.confirm.message}</p>
          )}
        </div>
      </div>

      {/* Згода з обробкою персональних даних — обов'язково для відповідності законодавству. */}
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-0.5 h-3.5 w-3.5 accent-primary"
        />
        <span>{T.authDialog.consent}</span>
      </label>
      {errors.consent && (
        <p className="text-xs text-destructive">{errors.consent.message as string}</p>
      )}

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
          {error === T.authDialog.errEmailUsed && (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="ml-2 underline"
            >
              {T.authDialog.loginTab}
            </button>
          )}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? T.authDialog.submittingRegister : T.authDialog.submitRegister}
      </Button>
    </form>
  )
}
