# Giveport build notes

Short notes after each phase: what was built, and why.

## Phase 1: public pages (October 2026)

### What was built

- `/`: landing page
- `/how-it-works`, `/fees`, `/faq`, `/terms`, `/privacy`
- `/signup` and `/login`: "opening soon" placeholders, so buttons never lead to a 404. These get replaced in phase 2.
- A custom 404 page and an SVG favicon.

There is no database, no login and no payment code yet. The whole site is static, which makes it fast on slow connections.

### Stack

Next.js 16 (App Router) with TypeScript and Tailwind CSS 4, as the PRD suggested. The `create-next-app` defaults for Next 16 turn on Cache Components (`cacheComponents: true`). Because of that, the footer year uses `"use cache"`: Next refuses to prerender `new Date()` without it.

### Design choices

- **Colours.** Deep forest green (`#1F4D3A`) is the one main colour. It reads as money and stability without looking like a bank template. Ochre (`#B86A12`) is the single accent, used only for small labels and highlights. The background is warm paper (`#FAF8F3`) instead of pure white, which is softer on the eyes. All colours are tokens in `src/app/globals.css`.
- **Fonts.** Newsreader (serif) for headings gives an editorial, considered feel. Public Sans for body text is the US government's design-system font, built for plain, readable public information. Numbers use tabular figures so fee amounts line up.
- **Trust.** There are no stock photos, testimonials or counters. The hero shows a labelled *example* donation page with the fee breakdown visible. The other sections cover the real money path, a worked fee example, the safeguards, and a "what Giveport does not do" section.
- **Small screens.** The mobile menu uses a plain `<details>` element, so it needs no JavaScript. Every page was checked at 375px width with no sideways scrolling.

### Where settings live

`src/lib/config.ts` holds every value the site depends on:

- `GIVEPORT_FEE_PERCENT`: Giveport's fee. **It is a placeholder (2%) until you decide.** Change it in Vercel environment variables and redeploy, and every page updates.
- `GIVEPORT_CONTACT_EMAIL`: defaults to `hello@giveport.site`. **Make sure that inbox exists**, or change it.
- The payment processor fee range (0.5%–1%). Check it against the provider's current pricing page before launch.
- `testMode: true` shows the "in testing" banner at the top of every page.

### Code rules followed

- No ternary operators. Conditions use `if` statements or small named helpers, for example `amountButtonClass` and `stepNumberClass`.
- Content (FAQ questions, fee rows, steps) lives in plain arrays at the top of each page file, so wording is easy to edit without touching layout.

### Things to check before real money flows

- The Terms and Privacy pages are careful drafts, not legal advice. Have a lawyer review them, especially around money transmission and data protection laws in your jurisdiction.
- The Terms don't name a legal entity yet. Add the registered business name once there is one.
- The Fees page says card payments "can carry an extra charge shown at checkout". Confirm how the payment processor charges donors.

---

## Phase 2: auth, profiles, donor pages (October 2026)

### What was built

- **Clerk auth** wired in. `src/proxy.ts` is the Next.js 16 middleware file (note: not `middleware.ts` — that is the Next ≤15 convention). `ClerkProvider` wraps the root layout. The header shows Log in / Get your link when signed out, and Dashboard + UserButton when signed in.
- **Neon + Drizzle ORM** for the database. Schema in `src/lib/db/schema.ts` (two tables: `profiles` and `donations`). Client in `src/lib/db/index.ts`. Run `npm run db:push` to apply the schema to Neon.
- **3-step signup wizard** at `/dashboard/setup`. Collects username, display name, country, bio, wallet address, coin and network. Validates and calls `POST /api/profile/create`.
- **Dashboard** at `/dashboard`. Protected by Clerk (`auth()` redirects unauthenticated users). Shows total received, donation count, shareable link with a copy button, recent donations table, and links to edit profile/wallet.
- **Profile edit** at `/dashboard/profile`. Updates display name, country and bio via `PATCH /api/profile/update`.
- **Wallet edit** at `/dashboard/wallet`. Updates wallet address, coin and network via `PATCH /api/profile/wallet`. Includes a prominent warning that wallet changes should be confirmed by email before they take effect in production.
- **Live public donor pages** at `/r/[username]`. Loads the recipient's profile from Neon, shows their story, country, coin, and a fee breakdown. The right column has the `DonateForm` client component.
- **DonateForm** — preset amounts ($10/$25/$50/$100) plus a custom amount input, optional donor name/email/message, spinner while setting up checkout, success screen. Calls `POST /api/donations/create`.
- **Africa-wide focus.** All mentions of Uganda as the sole country were removed. The landing page now has an `AfricaStrip` marquee listing 25 African countries. The FAQ, fees, footer, and meta description all say "across Africa".
- **No payment processor named.** All previous mentions of NOWPayments were removed from every public-facing page. The wording is "our payment partner" or "secure checkout".

### Env vars required for Phase 2

See `.env.example`. You need:
1. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from [dashboard.clerk.com](https://dashboard.clerk.com)
2. `DATABASE_URL` from [console.neon.tech](https://console.neon.tech) (connection string, `?sslmode=require`)

Set both in Vercel → Project → Settings → Environment Variables, then redeploy.

### Run the DB migration

```bash
# After setting DATABASE_URL in .env.local:
npm run db:push
```

This creates the `profiles` and `donations` tables on Neon. Re-run after any schema change.

### What is not yet wired

- Real payment checkout (the API route has a clear `TODO` comment for where to add the provider call)
- Email confirmation for wallet changes
- Photo uploads for profiles
- Report-a-page flow
