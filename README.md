# Korbojoy

Bengali e-commerce storefront built with Next.js 16 (App Router, TypeScript).

## Run

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

## What's included

- Home, shop, categories, collections, search, product pages
- Cart (saved in the browser) → checkout → order confirmation
- Order API (`POST /api/orders`) with server-side price and stock validation
- Order tracking (`/track-order`) by order ID + phone
- Admin panel at `/admin/orders` (HTTP basic auth via `proxy.ts`) to update order status
- Delivery / returns / privacy / terms pages
- Bangla / English: toggle in the top bar, saved in the `korbojoy-lang` cookie (default: Bangla)

## Where to edit

- `lib/site.ts` — phone, WhatsApp, email, address, delivery charges
- `lib/data.ts` — categories and products (every name/summary has `bn` and `en`)
- `lib/i18n.ts` — all UI text in both languages
- `app/globals.css` — colors and design tokens (`:root`)

Orders are stored in `data/orders.json`. That works on a single server or VPS.
For serverless hosting (e.g. Vercel), move `lib/orders.ts` to a database.
