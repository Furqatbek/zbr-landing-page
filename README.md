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

## QR restaurant pages — `/{slug}`

Posters and stickers carry a QR pointing at the bare slug — `app.zbrr.uz/qahvoon`
(a numeric id also works, so a code can go to print before anyone agrees a slug).
The page renders the venue and its menu from one public, unauthenticated call:

```http
GET https://zbrr.uz/api/v1/public/r/{slugOrId}
Accept-Language: uz | ru | en
```

Client and types live in [`src/lib/restaurant.ts`](src/lib/restaurant.ts); the
page is [`src/pages/RestaurantPage.tsx`](src/pages/RestaurantPage.tsx).

A few contract details worth keeping in mind when editing:

- The payload is under `data` — the root is the platform envelope.
- Prices render from `effectivePrice`, not `price`; `price` only appears as the
  struck-through original when `onSale`.
- Items grey out on `orderable`, not `inStock` — `orderable` also accounts for
  sizes being available.
- Null fields are **absent** from the JSON rather than `null`, so reads use
  optional chaining throughout.
- `isCurrentlyOpen` is the only open flag. `isOpen` is in the OpenAPI schema but
  never sent, so it is deliberately absent from our types.
- An empty `menu` is a real state (venue live, dishes not loaded yet) and a 404
  is expected eventually — a poster outlives the venue. Both have designed
  states rather than a blank page.

`lat`/`lng` are optional and add `distanceKm` plus an ETA range. The page asks
for location only when the visitor taps for it: a QR scan should not open with a
permission prompt.

**CORS:** the API only allows `https://app.zbrr.uz` as an origin, so a browser on
any other host is blocked. `vite.config.ts` proxies `/api/v1` in dev to make the
request same-origin; set `VITE_API_BASE` to point at another backend.

### Reserved slugs

Because venues live at the root, a slug that collides with one of the site's own
top-level paths is unreachable — the marketing page wins, since React Router
ranks static segments above dynamic ones. **Whoever assigns slugs must avoid:**

```
about  blog  careers  cookies  courier-offer  for-offices  partner-offer
press  privacy  r  refunds  restaurant-dashboard  safety  status  support  terms
```

`terms`, `cookies` and `refunds` have no pages yet but are routed home to keep
them reserved. `r` is kept because `/r/{slug}`, the path the original API doc
specified, still redirects to `/{slug}` so any QR already printed keeps working.
Adding a new top-level marketing route adds to this list — the two namespaces
share one root.

## Universal Links / App Links — `/.well-known/`

Opening the app directly, instead of the web page, when someone with the app
installed taps a QR link needs two files served from **the host in the link**.
The link is `app.zbrr.uz`, so these are ours to serve — the backend cannot do
it from `zbrr.uz`, because iOS and Android fetch them from the link's own host.

Drop them in [`public/.well-known/`](public/) and they ship with the build:

| File | Supplied by | Needs |
|---|---|---|
| `apple-app-site-association` (no extension) | iOS team | Team ID + bundle id (`app.zbr.customer`) |
| `assetlinks.json` | Android team | package name + **release** signing SHA-256 |

`vercel.json` is already set up for them, and both parts matter:

- **The SPA rewrite excludes `.well-known/`.** Without that exclusion every path
  falls through to `index.html`, so both files answered `200 text/html` with the
  landing page in them — which is what they did before this was added. Neither
  OS reports the mistake; the link just quietly opens the browser instead.
- **`apple-app-site-association` is served as `application/json`.** It has no
  file extension, so nothing else would infer the type, and iOS rejects it
  otherwise. `assetlinks.json` needs no rule — its extension is enough.

Check them on the deployed site after adding:

```bash
curl -sI https://app.zbrr.uz/.well-known/apple-app-site-association | grep -i content-type
curl -s  https://app.zbrr.uz/.well-known/assetlinks.json | jq .
```

Both must return JSON, not HTML. Until the files exist the paths 404, which is
correct — an app that is not installed falls back to this page either way.

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
