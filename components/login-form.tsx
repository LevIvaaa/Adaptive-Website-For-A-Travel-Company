"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, type LoginInput } from "@/lib/validation"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  return (
    <form
      onSubmit={handleSubmit((data) => console.log("login", data))}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" {...register("email")} type="email" placeholder="you@example.com" className="mt-1.5" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" {...register("password")} type="password" placeholder="••••••••" className="mt-1.5" />
        {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" size="lg">
        Увійти
      </Button>
    </form>
  )
}
