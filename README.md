# HI SARMA — فروشگاه تجهیزات برودتی (های سرما)

Production-oriented storefront for a refrigeration / HVAC-R equipment supplier:
refrigerant gases, fridge & freezer compressors, compressor oils and cold-room
equipment. Full Persian UI, genuine RTL layout.

## Stack

- **Vite + React 18** with `react-router-dom`
- Plain CSS design system in `src/styles/app.css` (CSS custom properties, logical
  properties throughout so RTL is a real layout, not just text alignment)
- No backend/database is wired up yet — see [Data layer](#data-layer)

## Run it

### In the Base44 sandbox

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Preview: host port **3000** (mapped to Vite's 5173). Hot reload is on.

### Locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, benefits strip, 4 category cards, why-us, featured products, brands, guides, CTA |
| `/products` | Full catalogue with URL-synced filters, sorting, pagination |
| `/category/:slug` | Category listing with category-specific technical filters |
| `/product/:slug` | Detail: gallery + lightbox, specs, docs state, related products, add-to-cart |
| `/compatibility` | Structured compressor matching with per-criterion explanations |
| `/cart`, `/checkout`, `/order/:id` | Cart, validated checkout, order confirmation |
| `/wishlist`, `/account` | Wishlist and account (sign-in / register / order history) |
| `/brands`, `/guides`, `/guides/:slug`, `/about`, `/contact` | Brand showcase, buying guides, about, contact |

## Data layer

`src/context/StoreContext.jsx` holds cart, wishlist, orders and the signed-in user
and persists them to `localStorage`. It is deliberately a single module so it can be
swapped for API calls in one place.

**This is a temporary data layer, not production storage:** state is per-browser,
orders are visible only in the browser that created them, and sign-in is a local
demo (SHA-256 digest + per-user salt, never plain text) without a server session,
rate limiting or password reset. Server-side validation and per-customer
permissions must be enforced by the real backend.

All catalogue records in `src/data/products.js` are marked `priceType: 'sample'`
and labelled "داده نمونه" in the UI. Prices, stock and specifications are demo
values and must be replaced with verified business data before selling.

## What is NOT configured (and never faked)

| Feature | State |
| --- | --- |
| Online payment | **Not connected.** No gateway credentials exist. Checkout records an *order request*; no money moves and no success state is simulated. |
| Contact form submission | **Not connected.** The form validates, then explicitly tells the user that no submission service is configured. |
| Product datasheets | No documents uploaded; the docs tab says so and offers a request path. |
| Contact details, social links, legal pages | Empty in `src/data/site.js` — they must be confirmed by the business, so nothing is invented. |
| Product photography / logo | The real assets are not in this repository. Stand-in SVGs live in `public/assets/`; drop the real files at the same paths to swap them in. |
| Brand logos | Rendered as text wordmarks only — no trademark artwork is fabricated. |

## Assets

```
public/assets/logo-hi-sarma.svg          # brand mark (stand-in)
public/assets/products/*.svg             # 11 product images (stand-ins)
```

`src/data/products.js` references those paths directly, so replacing a file with
the real photograph needs no code change.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, `aria-invalid` + Persian
  error text on every validated field, keyboard-operable dropdown/lightbox.
- `prefers-reduced-motion` disables animations and transitions.
- Product images below the fold are `loading="lazy"`; the hero images are eager
  (they are the primary visual) — the hero therefore has no lazy-load delay.
- No product structured data / JSON-LD is emitted while the catalogue holds sample
  records, to avoid publishing unverified prices and stock.

## Verification status

- `npm run build` passes.
- The stack boots in the sandbox and serves on port 3000.
- Interactions exercised in the preview: see the report in the task thread.
- Not automatically verified: signed-in-only screens when no preview session is
  replayed, and any third-party integration (none are configured).
