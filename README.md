# NovaShop 🛍️

A **premium e-commerce platform** built with a modern, scalable, feature-based architecture. NovaShop delivers an Apple/Linear-inspired shopping experience — soft gradients, elegant motion, dark/light theming, and a full commerce flow from browse to checkout, plus an admin dashboard.

![Tech](https://img.shields.io/badge/React-19-61dafb) ![TS](https://img.shields.io/badge/TypeScript-5.7-3178c6) ![Vite](https://img.shields.io/badge/Vite-6-646cff) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Highlights

- **Storefront** — landing/home, category & product catalog with advanced filters, sorting, infinite scroll, product details with gallery, reviews & ratings, related & recently-viewed products.
- **Commerce** — cart (drawer + page), wishlist, coupon system, multi-step checkout with a simulated Stripe test payment, order history & tracking.
- **Discovery** — mega-menu navigation, command-style search, flash sales with a live countdown, best sellers, new arrivals, recommended.
- **Account** — authentication, profile, and full address management.
- **Admin dashboard** — sales analytics (Recharts), product/category/order/user management, inventory alerts, image upload, order-status control, responsive tables.
- **Experience** — dark/light mode, skeleton loading, lazy-loaded routes, smooth page & micro-interactions (Framer Motion), toast notifications, SEO meta management, accessible components, 404 + error pages.

## 🧱 Tech Stack

| Area | Tech |
|------|------|
| Framework | React 19 + TypeScript + Vite 6 |
| Styling | TailwindCSS + shadcn/ui (Radix primitives) |
| State | Redux Toolkit (cart, wishlist, auth, orders, recently-viewed) |
| Server state | TanStack React Query |
| Routing | React Router 7 (data router, code-split routes) |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Charts | Recharts |
| Backend (optional) | Firebase / Firestore / Storage · Stripe (test) · Axios |

## 🚀 Getting Started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

> The app runs **fully on mock data** out of the box — no keys required. Product images are served from picsum.photos.

## 🔌 Going live with Firebase / Stripe

1. Copy `.env.example` → `.env.local` and fill in your keys.
2. Set `VITE_DATA_SOURCE=firebase` and run `npm i firebase`.
3. Uncomment the initialization in [`src/lib/firebase.ts`](src/lib/firebase.ts) and swap the mock implementations in [`src/lib/services/`](src/lib/services/) for Firestore queries. **The UI never changes** — the service layer is the single seam.

## 🗂️ Architecture

Feature-based, scalable folder structure:

```
src/
├── app/            # store, providers, router, typed hooks
├── components/
│   ├── ui/         # shadcn primitives (button, card, sheet, …)
│   ├── layout/     # navbar, mega-menu, footer, cart drawer, admin layout
│   └── shared/     # ProductCard, Rating, Price, SectionHeading, …
├── features/       # domain modules (products, cart, wishlist, auth, orders, admin, theme, home)
│   └── <feature>/  # slice + selectors + queries + components (co-located)
├── hooks/          # reusable hooks (useCart, useWishlist, useDebounce, useCountdown, useSeo, …)
├── lib/            # utils, schemas, storage, services, firebase
├── data/           # mock catalog & admin data
├── pages/          # route components (lazy-loaded)
└── types/          # shared domain types
```

### Notable patterns

- **Single service seam** — swap mock ↔ Firebase without touching UI.
- **URL-driven catalog** — filters/sort live in the query string (shareable, back-button friendly).
- **Persisted state** — cart, wishlist, recently-viewed & auth sync to `localStorage` via Redux middleware.
- **Code splitting** — every route is `React.lazy`-loaded; vendor chunks are split in the Vite config.
- **Custom hooks** — encapsulate cart, wishlist, countdown, intersection (infinite scroll), SEO, and theme logic.

## 🎨 Design

Minimalist, Apple/Linear-inspired: HSL design tokens for light & dark, `Sora` display + `Inter` body type, soft gradients, glassmorphism, and cubic-bezier motion throughout.

---

Crafted as a production-ready reference for a modern, senior-level React commerce app.
