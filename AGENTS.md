# AGENTS.md — HI SARMA storefront

Notes that are not obvious from the manifests. Read the README first.

## Stack

Vite + React 18 + react-router-dom, plain CSS (`src/styles/app.css`). No backend and
no database are connected — see "Data layer" below before assuming otherwise.

## Running it here (Base44 sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build   # first boot / compose change
docker compose -f docker-compose.base44.yml logs -f web     # dev server output
```

- Host port **3000** → container **5173** (Vite). Only this port is public.
- The app runs from the bind-mounted source with the Vite dev server, so edits
  hot-reload. `node_modules` lives in the `hi-sarma-node-modules` volume and is
  installed on container start (lockfile-aware).
- `vite.config.js` enables `watch.usePolling` — bind mounts on this microVM miss
  inotify events otherwise. Without it hot reload silently stops working.
- Healthcheck runs `node -e "fetch('http://127.0.0.1:5173/')"` (curl is not in
  `node:22-bookworm-slim`).

### Sandbox-only overrides

Everything sandbox-specific is gated on `BASE44_PREVIEW_MODE === "1"`:

- `vite.config.js` extends `server.allowedHosts` with `.<BASE44_SANDBOX_HOST_DOMAIN>`
  (the sandbox id rotates, so the wildcard is required). With the flag unset the
  option stays `undefined` and Vite's defaults apply unchanged.
- `docker-compose.base44.yml` passes `BASE44_PREVIEW_MODE`,
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, `BASE44_SANDBOX_HOST_DOMAIN` and
  `BASE44_PUBLIC_HOST_SUFFIX` through to the service. No resolved host value is
  ever hardcoded in a file.

Nothing here bypasses auth, CORS or TLS checks.

## Data layer (important)

`src/context/StoreContext.jsx` is the **single integration point** for cart,
wishlist, orders and accounts. It currently persists to `localStorage`, so:

- carts/wishlists/orders are per-browser, not per-account;
- sign-in is a local demo (SHA-256 + per-user salt, never plain text) with no
  server session, rate limiting or password reset;
- every catalogue record in `src/data/products.js` is `priceType: 'sample'`.

Swapping that module for API calls is what makes this production-ready. Server-side
validation and per-customer record permissions must be enforced there, not in the UI.

## Product images

Real product photography / the official logo are **not in this repository**. Every
image is a stand-in SVG under `public/assets/` (logo: `logo-hi-sarma.svg`; products:
`public/assets/products/*.svg`). Product records point at those paths, so replacing
a file with the real photograph requires no code change. The placeholders are
clearly marked in the UI ("داده نمونه") and must be replaced before launch.

## Verification tips

- Product listing state lives entirely in the URL (`?q=`, `?sort=`, `?page=`,
  `?f_brand=...`), so a listing view can be reproduced by URL alone.
- The compatibility tool (`/compatibility`) never returns a confirmed verdict —
  unmatched capacity/application criteria are reported as "cannot verify" by design.
- `npm run build` is the fastest way to catch an unused/missing import.
