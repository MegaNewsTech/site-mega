# Mega News

Institutional website for **Mega News** — softhouse from Irecê-BA since 1996.

**Site:** [meganews.com.br](https://meganews.com.br)

## Architecture

```
src/
  app/                 # Next.js App Router (routes only)
  features/            # Page-level screens
    home/
    faq/
    contact/
    auth/              # login, free trial, activation
    plans/
  components/
    layout/            # Header, Footer, Logo, SiteFooter
    home/              # Hero, Timeline, Reels, Map, WhatsApp
    pricing/
    ui/                # shared UI (DashedCircles, …)
  lib/                 # helpers (assetSrc, trial storage)
  styles/              # globals + variables
  assets/
    team/ images/ clients/ products/
  types/
```

## Routes

| Route | Screen |
|------|--------|
| `/` | Home |
| `/produtos/[slug]` | Product page (`mega-flex-gestao`, `admpower`, `mega-agil`, `mega-posto`) |
| `/doubt` | FAQ |
| `/fale-com-vendas` | Contact sales |
| `/login` | Login |
| `/teste-gratis` | Free trial |
| `/ativacao` | Account activation |

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Deploy (meganews.com.br)

The production host is the WordPress Docker container (Apache). The site is
published as a static export next to WordPress:

1. `npm run build:static` → static files in `out-build/`.
2. Upload the contents of `out-build/` to the WordPress root (`/var/www/html`).
3. `wordpress/mu-plugins/meganews-static-home.php` must be in
   `wp-content/mu-plugins/`: it serves `index.html` on `/`, because Apache there
   prefers `index.php`. Deleting it brings back the WordPress home.

`/wp-admin` keeps working. Other routes (`/doubt/`, `/login/`, …) are folders
served directly by Apache.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Sass
- Framer Motion
- Lucide React
