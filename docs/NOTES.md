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
- The NOWPayments fee range (0.5%–1%) comes from the PRD research. Check it against their current pricing page before launch.
- `testMode: true` shows the "in testing" banner at the top of every page.

### Code rules followed

- No ternary operators. Conditions use `if` statements or small named helpers, for example `amountButtonClass` and `stepNumberClass`.
- Content (FAQ questions, fee rows, steps) lives in plain arrays at the top of each page file, so wording is easy to edit without touching layout.

### Things to check before real money flows

- The Terms and Privacy pages are careful drafts, not legal advice. Have a lawyer in Uganda review them, especially around money transmission and the Data Protection and Privacy Act, 2019.
- The Terms don't name a legal entity yet. Add the registered business name once there is one.
- The Fees page says card payments "can carry an extra charge shown at checkout". Confirm how NOWPayments' card on-ramp (Banxa) charges donors.
