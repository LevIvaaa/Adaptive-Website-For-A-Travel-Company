// Пункти головного меню. Тексти беремо з i18n за id (T.nav[item.id]).
// Винесено окремо, щоб і шапка, і футер, і мобільне меню використовували один масив.
export type NavId = "home" | "tours" | "articles" | "about" | "contacts"

export const navItems: { id: NavId; href: string }[] = [
  { id: "home", href: "/" },
  { id: "tours", href: "/tours" },
  { id: "articles", href: "/articles" },
  { id: "about", href: "/about" },
  { id: "contacts", href: "/contacts" }
]
