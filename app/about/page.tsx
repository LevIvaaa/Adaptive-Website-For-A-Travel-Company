import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Про нас"
}

const stats = [
  { value: "12+", label: "років на ринку" },
  { value: "180", label: "напрямків" },
  { value: "42 000", label: "клієнтів" },
  { value: "4.9", label: "середня оцінка" }
]

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="container py-12">
          <h1 className="text-3xl font-bold md:text-4xl">Про компанію</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Організовуємо подорожі з 2012 року. Знаємо регіони з перших рук,
            самі зупиняємось у готелях перш ніж пропонувати їх.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-6 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container max-w-3xl space-y-5 text-foreground/90">
          <h2 className="text-2xl font-bold">Наша історія</h2>
          <p>
            У 2012 році троє друзів поверталися з поїздки на Крит і не могли знайти
            туроператора, який сам побував у готелі, куди відправляє клієнтів.
            Саме з цього питання починалася компанія «Мандри Світу».
          </p>
          <p>
            Сьогодні у нас 23 людини в команді, понад 180 напрямків у каталозі,
            і головне — кожен готель перевірений особисто менеджером або
            постійним клієнтом.
          </p>
          <p>
            Ми не продаємо «коти в мішку» — якщо не були в готелі самі,
            прямо кажемо про це та допомагаємо знайти альтернативу з відгуками.
          </p>
        </div>
      </section>
    </>
  )
}
