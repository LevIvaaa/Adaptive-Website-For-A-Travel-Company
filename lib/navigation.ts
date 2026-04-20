export type NavId = "home" | "tours" | "about" | "contacts"

export const navItems: { id: NavId; href: string }[] = [
  { id: "home", href: "/" },
  { id: "tours", href: "/tours" },
  { id: "about", href: "/about" },
  { id: "contacts", href: "/contacts" }
]
