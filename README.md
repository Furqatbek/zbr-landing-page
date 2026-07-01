# ZBR — Landing Page

Pre-launch marketing site for **ZBR**, a fast food-delivery app launching in
Tashkent. Bold, speed-first design; trilingual (Russian / Uzbek / Karakalpak);
lead capture for restaurants and couriers that delivers straight to Telegram.

Built with **Vite + React + TypeScript**. Implemented from the Claude Design
export that still lives, for reference, in [`project/`](project/) (the original
HTML/JSX prototype) and [`chats/`](chats/) (the design conversation).

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build locally
npm run typecheck  # type-check only
```

## Lead capture → Telegram

The partner form, courier form, and footer newsletter all POST to
`/api/lead`, a serverless function ([`api/lead.ts`](api/lead.ts)) that forwards
each lead to a Telegram chat. Configure two environment variables:

```bash
cp .env.example .env
# then fill in:
#   TELEGRAM_BOT_TOKEN  — from @BotFather
#   TELEGRAM_CHAT_ID    — the chat/group/channel that should receive leads
```

The same handler runs under `npm run dev` / `npm run preview` via a small Vite
middleware, so you can test the full round trip locally. Without the env vars,
the endpoint returns `500 "Lead delivery is not configured"` and the forms show
a retry error — nothing is silently dropped.

Phone numbers are the only contact field (email is uncommon in the target
market). They're validated and normalized to `+998XXXXXXXXX` before sending.

## Deployment

Ships as a static SPA plus one serverless function. On **Vercel**, the included
[`vercel.json`](vercel.json) rewrites client-side routes to `index.html` and
`api/lead.ts` is picked up automatically as a function — just set the two
Telegram env vars in the project settings. For any other host, serve `dist/`
with an SPA fallback (all non-`/api` paths → `index.html`) and deploy
`api/lead.ts` as a function or port it to your backend of choice.

## Structure

```
index.html              Vite entry
api/
  lead.ts               Serverless function → Telegram
  _lead.ts              Shared validate + send logic (also used by the dev middleware)
vite.config.ts          React plugin + /api/lead dev middleware
src/
  main.tsx              App bootstrap (Router + i18n provider)
  App.tsx               Routes: / , /partner-offer , /courier-offer + scroll manager
  styles.css            Design tokens + base styles + responsive rules
  i18n/
    translations.ts     RU (canonical) / UZ / KK copy, compile-time key-checked
    index.tsx           I18nProvider + useI18n hook (persists choice to localStorage)
  lib/                  device detection, phone formatting, lead submission
  components/           Nav, Hero, Footer, phone mockup, store badges, lead flow, …
  components/sections/  Home page sections
  pages/Home.tsx        Home composition
```

## Notes on fidelity

This is a faithful implementation of the **final** state of the design export.
A few intentional differences from the raw prototype:

- The Claude Design **"Tweaks" accent-color panel** and its editor `postMessage`
  plumbing were design-tool scaffolding, not a product feature — dropped. The
  accent stays the brand orange `#FF6B00` (still a single CSS variable if you
  want to theme it).
- Dead code the final design no longer rendered was removed: the "we're
  launching / zero orders" band, the unused tracking/restaurant phone screens,
  and the pre-launch hero badge / "early access" nav button.
- Lead submission goes to **Telegram** instead of the prototype's
  `localStorage` demo stub.
- Client-side routing uses **React Router** (`/partner-offer`, `/courier-offer`)
  instead of the prototype's custom hash-event router; the browser back button
  and deep links work.
