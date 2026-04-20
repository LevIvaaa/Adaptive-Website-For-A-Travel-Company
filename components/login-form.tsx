"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useT } from "@/lib/i18n"

type LoginInput = {
  email: string
  password: string
}

export function LoginForm() {
  const T = useT()

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email(T.loginPage.errEmail),
        password: z.string().min(8, T.loginPage.errPassword)
      }),
    [T]
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: zodResolver(schema) })

  return (
    <form
      onSubmit={handleSubmit((data) => console.log("login", data))}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="email">{T.loginPage.email}</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder={T.loginPage.emailPh}
          className="mt-1.5"
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">{T.loginPage.password}</Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder={T.loginPage.passwordPh}
          className="mt-1.5"
        />
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" size="lg">
        {T.loginPage.submit}
      </Button>
    </form>
  )
}
