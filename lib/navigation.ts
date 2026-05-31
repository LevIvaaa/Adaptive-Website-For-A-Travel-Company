export type NavId = "home" | "tours" | "articles" | "about" | "contacts"

export const navItems: { id: NavId; href: string }[] = [
  { id: "home", href: "/" },
  { id: "tours", href: "/tours" },
  { id: "articles", href: "/articles" },
  { id: "about", href: "/about" },
  { id: "contacts", href: "/contacts" }
]
