# Travel Agency

Full-stack travel agency website.

## Stack

**Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · React Hook Form + Zod · TanStack Query · Zustand

**Backend:** Next.js API Routes · Prisma ORM · SQLite (file-based) · NextAuth.js · bcrypt

## Features

- **Auth modal** in the header — login / register tabs, no separate page
- **Real filters** on `/tours` (type, price range, sort) — driven by URL params
- **Bookings** — logged-in users can book tours, manage in `/account/bookings`
- **Contact form** — saves to DB
- **i18n** — UA / EN toggle for the whole site
- **Currency switcher** — UAH / USD / EUR with conversion
- **Favourites** — persist in `localStorage` (Zustand)
- **CI** — typecheck, lint, build, npm audit
- **CodeQL** — security scan

## Local setup (3 commands)

```bash
npm install
npm run db:push && npm run db:seed
npm run dev
```

Open **http://localhost:4000**

That’s it — no Docker, no Postgres server. SQLite stores everything in `prisma/dev.db`.

### Demo credentials
After seeding:
- Email: `admin@travel-agency.com`
- Password: `admin12345`

Or click **Sign up** in the header to register a new user.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server on http://localhost:4000 |
| `npm run build` | Production build |
| `npm run start` | Start production server on :4000 |
| `npm run lint` | ESLint |
| `npm run db:push` | Apply schema to SQLite |
| `npm run db:seed` | Insert 6 demo tours + admin user |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

## Project structure

```
app/
  layout.tsx, providers.tsx, globals.css
  page.tsx                 home
  tours/                   list + [slug] detail
  account/                 dashboard + bookings
  api/
    auth/[...nextauth]     NextAuth credentials
    register               POST  create user
    tours                  GET   list with filters
    bookings               GET/POST  user bookings (auth)
    contact                POST  contact form

components/
  auth-dialog.tsx          login/register modal
  user-menu.tsx            avatar dropdown
  tour-filters.tsx         URL-driven sidebar filters
  tour-grid.tsx            TanStack Query grid
  booking-form.tsx         book a tour (auth-gated)
  contact-form.tsx         contact request → API
  ui/                      shadcn primitives

lib/
  prisma.ts                Prisma singleton
  auth.ts                  NextAuth config
  store.ts                 Zustand stores (favs, locale, currency)
  i18n.ts                  translations
  tours.ts                 Tour helpers
  utils.ts                 cn(), formatPrice()

prisma/
  schema.prisma            data model (User, Tour, Booking, Favorite, ContactRequest)
  seed.ts                  initial data
  dev.db                   SQLite file (gitignored)
```

## Production deploy (when needed)

For real traffic switch to PostgreSQL:

1. In `prisma/schema.prisma` change `provider = "sqlite"` to `provider = "postgresql"`
2. Switch back `String` JSON columns to `String[]` (Postgres supports arrays)
3. Use [Neon](https://neon.tech) (free) for the DB and [Vercel](https://vercel.com) for hosting
4. Set env vars on Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

For coursework / demo SQLite is enough.
