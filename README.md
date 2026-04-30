# Travel Agency

Full-stack travel agency website built with the requested stack.

## Stack

**Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · React Hook Form + Zod · TanStack Query · Zustand

**Backend:** Next.js API Routes · Prisma ORM · PostgreSQL · NextAuth.js · bcrypt

## Features

- **Auth modal** in the header (login/register tabs, no separate page)
- **Real filters** on `/tours` (type, price range, sort by price/rating)
- **Bookings** — logged-in users can book tours, manage in `/account/bookings`
- **Contact form** — saves requests to `ContactRequest` table
- **i18n** — UA / EN toggle for the whole site
- **Currency switcher** — UAH / USD / EUR
- **Favourites** — persist in `localStorage` (Zustand)
- **CI** — typecheck, lint, build, npm audit
- **CodeQL** — security scan

## Local setup

### 1. Prerequisites
- Node.js 20+
- PostgreSQL (locally via Docker or [Neon](https://neon.tech) free tier)

### 2. Install
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set:
- `DATABASE_URL` — Postgres connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local

### 4. Apply schema and seed
```bash
npx prisma db push
npm run db:seed
```
This creates tables and inserts 6 demo tours plus an admin user `admin@travel-agency.com / admin12345`.

### 5. Run
```bash
npm run dev
```
Open http://localhost:3000

## Production deploy (Vercel + Neon)

1. Create a Postgres DB on [neon.tech](https://neon.tech) — copy the pooled connection string
2. Push the repo to GitHub (already done)
3. Import the repo on [vercel.com](https://vercel.com)
4. In Vercel project settings → **Environment Variables** add:
   - `DATABASE_URL` — from Neon
   - `NEXTAUTH_SECRET` — `openssl rand -base64 32`
   - `NEXTAUTH_URL` — your production URL (e.g. `https://travel-agency.vercel.app`)
5. Deploy. After first deploy run once locally:
   ```bash
   DATABASE_URL="<production-neon-url>" npx prisma db push
   DATABASE_URL="<production-neon-url>" npm run db:seed
   ```

Vercel will auto-deploy every push to `main`.

## Project structure

```
app/
  (root)              layout, providers, globals.css
  page.tsx            home
  tours/              catalogue + detail
  account/            user dashboard + bookings
  api/
    auth/             NextAuth credentials provider
    register/         POST — create user
    tours/            GET — list with filters
    bookings/         GET/POST — user bookings
    contact/          POST — contact form
components/
  auth-dialog.tsx     login/register modal
  user-menu.tsx       avatar dropdown when logged in
  tour-filters.tsx    sidebar filters (URL-driven)
  tour-grid.tsx       fetches tours with TanStack Query
  booking-form.tsx    book a tour (auth-gated)
  contact-form.tsx    contact request → API
  ui/                 shadcn primitives (button, card, dialog, tabs, ...)
lib/
  prisma.ts           Prisma singleton
  auth.ts             NextAuth config
  store.ts            Zustand stores (favs, locale, currency)
  i18n.ts             translations + plural helper
  tours.ts            Tour type + locale helper
  utils.ts            cn(), formatPrice()
prisma/
  schema.prisma       data model
  seed.ts             initial data
```
