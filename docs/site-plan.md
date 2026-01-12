## Planning & Strategy
- **Purpose & Audience:** Serve halal fast-casual fans in Haverhill/Bradford who want customizable bowls/burritos with premium feel; key personas: (1) Busy locals ordering pickup, (2) Foodies seeking signature items, (3) Catering planners needing quick quotes.
- **Branding:** Use existing charcoal/cream/gold palette, serif display + sans body, grain/vignette texture; reinforce “charcoal-fired halal, chef-crafted” in headers, CTAs, and badges.
- **Competitor Analysis:** Pull cues from Gao’s BBQ, Props, 5Church: big spacing, bold hero, signature highlights, luxe hover states; avoid cluttered banners and weak badges.
- **Sitemap & Structure:** Home, Menu, Build (custom), Our Story, Locations, Checkout/Cart, Admin; keep Header/Footer nav aligned; add a CTA band on key pages to Order/Build.

## Technical & Functional
- **Domain & Hosting:** Ensure memorable domain (e.g., habiburrito.com) with reliable hosting (Vercel/Next); map DNS to target.
- **Platform:** Next.js (in use) with Tailwind; continue using current stack.
- **Responsive Design:** All new sections use grid/flex with mobile fallbacks; verify on small screens (Menu hero/filters, Build steps).
- **Speed:** Add missing image `/public/menu-items/burrito-special.jpg` or swap to existing asset to remove 404s; keep images optimized (next/image), avoid heavy videos for now.
- **Security:** SSL via host; keep JWT secret set; protect admin routes (middleware in proxy.ts). Use strong passwords/env handling.
- **Scalability:** Prisma-backed menu; modular components (cards, pills, timeline). Leave room for delivery toggle and multi-location expansion.

## Design & Content
- **UX:** Clear CTAs (Order/Build), pill filters, signature strips, sticky summary on Build; large section spacing to mirror references.
- **Content:** Replace any placeholder copy/images; ensure hero/menu/build use real food stills. Add parking/accessibility clarity (fixed icons).
- **CTAs:** Primary: Order/Build; Secondary: View Menu/Directions; keep dual-button bands on key pages.
- **About Page (Our Story):** Already rebuilt with origin/promise/team/timeline; keep photography fresh and text concise.

## Post-Launch
- **SEO:** Add/fix meta titles/descriptions per page; ensure alt text on images; resolve 404 asset; clean URLs (menu, build, locations).
- **Analytics:** Enable GA or Vercel Analytics (already imported) and verify env keys; track Order/Build clicks.
- **Maintenance:** Keep deps updated; run `npm run lint` before deploy; back up env vars; refresh menu items and images regularly.
- **Promotion:** Use social (IG/TT/FB) with food stills; consider local ads + “Order Pickup” promos; highlight catering lead time on site and socials.
