# Мандри Світу

Макет вебсайту туристичної компанії з адаптивним дизайном.
Навчальна робота на тему «Розробка вебсайту з адаптивним дизайном для туристичної компанії».

Поки що реалізовано лише frontend-частину — візуальний шар без серверної логіки.

## Стек

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + shadcn/ui (Radix UI + class-variance-authority)
- **React Hook Form** + **Zod** — валідація форм
- **TanStack Query** — кешування клієнтських запитів
- **Zustand** — локальний стан (обране, чернетка пошуку)

## Структура

```
app/
  layout.tsx          кореневий layout, шрифти, Header/Footer
  page.tsx            головна
  tours/              каталог + детальна сторінка туру
  about/              про компанію
  contacts/           контакти та форма заявки
  blog/               блог
  login/, register/   авторизація (UI)
components/
  ui/                 базові примітиви (shadcn/ui)
  site-header.tsx, site-footer.tsx
  tour-card.tsx, tour-filters.tsx, search-box.tsx ...
lib/
  tours-data.ts       мок-дані каталогу
  store.ts            Zustand
  validation.ts       Zod-схеми
  navigation.ts       меню сайту
  utils.ts            cn, formatPrice, pluralUa
```

## Запуск

```bash
npm install
npm run dev
```

Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
