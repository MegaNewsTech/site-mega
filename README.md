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

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Sass
- Framer Motion
- Lucide React
