# Product Requirements Document — TelePrompter.my

A reusable, full-site blueprint for a **high-converting static marketing site for a
rental/service business**, built with Astro and deployed to cPanel. The reference
implementation is the TelePrompter.my revamp. Reuse this PRD to stand up a site of the
same stack and shape for other businesses.

> **Secrets policy (read first):** This PRD contains **placeholders only**. Never commit
> API keys, SMTP passwords, FTP credentials, or SendGrid API keys. Secrets are placed
> manually on the server after deploy via FTP / cPanel Web UI or a `.env` file that is
> `.gitignore`-ed. Use the per-site configuration table in §5.

---

## 1. Product Overview

### 1.1 Purpose
Deliver a fast, SEO-friendly marketing and quotation site for a service/rental business.
Visitors browse offerings, view a gallery, and request a quote directly from the site.

### 1.2 Core sections (reference implementation)
- **Hero** — headline + primary CTA
- **Marquee** — scrolling strip
- **Products** — the offerings catalog
- **Why Choose / Feature Cards** — differentiators
- **Gallery** — slider carousel with lightbox (opens, next/prev navigation)
- **Terms** — service terms strip
- **Contact / Book** — the quote request form (§3)
- **Footer** — company + legal links
- **WhatsApp FAB** — floating chat button

### 1.2.1 SEO landing pages — Locations
Programmatic location pages that target local search intent ("teleprompter rental in
{city}"). One static page per location, generated from a typed data file.

- **Hub page** — `/locations/` index listing all locations (cards → detail pages).
- **Detail page** — `/locations/{slug}/` with location-specific copy:
  - Local hero (H1, sub, badge, CTAs, trust strip)
  - Local intro + areas-covered chips
  - Why choose (shared benefits, local framing)
  - Products (reused `<Products />` section)
  - What's included (shared checklist)
  - How it works (shared steps)
  - Gallery (reused)
  - FAQ (location-specific Q&As)
  - Final CTA + "other locations" cross-links
- **Data** — `src/data/locations.ts` (`LocationPage` interface). Add an object per
  location; the dynamic route `src/pages/locations/[slug].astro` generates the page.
- **SEO** — LocalBusiness + BreadcrumbList + FAQPage JSON-LD per page; ItemList +
  BreadcrumbList on the hub. Unique title/meta per location. Sitemap includes all.
- **Planning** — `docs/locations-content.csv` maps 1:1 to the schema columns; draft
  copy in the CSV, then paste cells into a new object in `locations.ts` to publish.

### 1.2.2 SEO landing pages — Events / occasions
Programmatic event-type pages that target use-case search intent ("teleprompter for
{event type}"). One static page per event type, generated from a typed data file.
Each page **recommends specific teleprompters** for that use case (primary + secondary).

- **Hub page** — `/events/` index listing all event types (cards → detail pages).
- **Detail page** — `/events/{slug}/` with event-specific copy:
  - Event hero (H1, sub, badge, CTAs, trust strip)
  - Intro + typical-scenario chips
  - **Recommended teleprompters** — cards pulling live product data (name, price,
    image, tag) from `products.ts` via slug, each with a "why this fits" reason;
    primary pick gets a highlighted border + "Recommended" badge
  - Why choose (event-specific benefits)
  - What's included (shared checklist)
  - How it works (shared steps)
  - Gallery (reused)
  - FAQ (event-specific Q&As)
  - Final CTA + "other event types" cross-links
- **Data** — `src/data/events.ts` (`EventPage` interface with `recommended:
  RecommendedProduct[]` referencing product slugs). Add an object per event type;
  the dynamic route `src/pages/events/[slug].astro` generates the page.
- **SEO** — Service + BreadcrumbList + FAQPage JSON-LD per page; ItemList +
  BreadcrumbList on the hub. Unique title/meta per event type. Sitemap includes all.
- **Planning** — `docs/events-content.csv` maps 1:1 to the schema columns; draft
  copy in the CSV, then paste cells into a new object in `events.ts` to publish.

### 1.3 Users
- **Customers** — research offerings, view galleries, request a quote.
- **Business owner/admin** — receives quote requests by email and WhatsApp.

---

## 2. Technology Stack & Architecture

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Astro** (v7.x) | SFC `.astro` files |
| Output | **Static** (`output: 'static'`) | No node server at runtime |
| Build format | Directory (`build.format = 'directory'`) | Clean subfolder routing |
| SEO | `@astrojs/sitemap` | Generates sitemap on build |
| Styling | Astro `<style is:global>` | Design tokens: `--fg`, `--accent`, `--accent-2`, `--muted`, `--smoke`, `--border`, `--bg`, `--ease`, `--font-display`, `--font-body` |
| Breakpoints | 1100 / 880 / 640 px | Responsive grid behavior |
| Hosting | **cPanel** | Serves static files + runs PHP |
| Deployment | **GitHub Actions → FTP** | Build in CI, push `dist/` to cPanel |
| Email delivery | **PHPMailer + SendGrid SMTP** | Admin + user copy |
| Messaging | **WhatsApp** (pre-filled chat) | No backend/API needed |

### 2.1 Repository layout
```
astro.config.mjs          # site, base, output, sitemap
public/                   # static assets (images) + quote.php → copied to dist/
src/
  components/             # Astro components (Hero, Gallery, Contact, ...)
  data/                   # products.ts, site.ts, features.ts, locations.ts, events.ts
  layouts/BaseLayout.astro
  pages/                  # index.astro + product routes (e.g. ipad-teleprompter/)
    locations/            # [slug].astro (detail) + index.astro (hub) — SEO landing pages
    events/               # [slug].astro (detail) + index.astro (hub) — SEO landing pages
.github/workflows/deploy.yml
docs/PRD.md               # this file
docs/locations-content.csv # planning CSV for location copy (reference only)
docs/events-content.csv   # planning CSV for event copy (reference only)
```

- Images live in `public/assets/`, referenced via `import.meta.env.BASE_URL`.
- Catalog data (products, prices, galleries) lives in `src/data/products.ts`.
- Site config (domain, contact, WhatsApp, nav, footer) lives in `src/data/site.ts`.
- Location SEO pages live in `src/data/locations.ts` + `src/pages/locations/`.
- Event SEO pages live in `src/data/events.ts` + `src/pages/events/`.

### 2.2 Build & deploy
1. `astro build` → `dist/` (static HTML + copied `public/` files).
2. GitHub Action (`npm ci` + `npm run build`) uploads `dist/` via FTP to
   `server-dir: <domain>/<folder>/` using cPanel FTP secrets.

**GitHub secrets required:** `CPANEL_FTP_SERVER`, `CPANEL_FTP_USERNAME`, `CPANEL_FTP_PASSWORD`.

---

## 3. Quote Request Form (the contact/book form)

> Note: The form module lives in `src/components/Contact.astro` and is shared across all
> pages (home + each product page). The backend mailbox handler is `public/quote.php`.

### 3.1 Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | text | ✅ | |
| Email | email | ✅ | Used for the user's copy + reply-to |
| Start date | date | ✅ | Rental/delivery start |
| End date | date | ✅ | Rental/pickup end; defines `days` |
| Package vs Custom | segmented toggle | ✅ | See §3.2 |
| Product select(s) | select | ✅ | Presidential / Stage TV / Monitor / iPad (+ qty 1–5) |
| Location | text | ✅ | Venue / address |
| State | dropdown | ✅ | Malaysian states (KL, Selangor, Johor, Penang + all 16) |
| Message | textarea | | Event details, special requirements |
| Delivery choice | radio | ✅ | **Email me the quote** / **Send via WhatsApp** |
| Quote summary | read-only box | | Live itemized total (RM) + preview of what gets sent |
| Honeypot | hidden | | Spam trap; must be empty |

### 3.2 Package vs Custom
- **Package**: one product select + quantity (1–5). Simplest path for a single offering.
- **Custom**: dynamic rows `[product] + [quantity 1–5]` with add/remove; multiple rows allowed.

Both reference the same product/pricing catalog.

### 3.3 Quote calculator (client-side JS)
- `days = max(1, endDate − startDate)`; warn if `end < start`.
- `total = Σ (dailyPrice × quantity × days)` using prices from `src/data/products.ts`.
- Summary updates live as selection, quantity, or dates change.

### 3.4 Submission behavior
**Email path**
- `fetch()` POST to `quote.php` (same-origin, no page reload).
- PHP sends a full quote email to the **admin** and a **confirmation copy to the user** via
  PHPMailer + SendGrid SMTP (see §4).
- Inline success/error feedback; no reload.

**WhatsApp path**
- Open `https://wa.me/<number>?text=<url-encoded quote>` in a new tab.
- User reviews and sends the pre-filled message. No server call required.

---

## 4. Email Delivery — PHPMailer + SendGrid SMTP

### 4.1 Configuration
| Setting | Value |
|---------|-------|
| Host | `smtp.sendgrid.net` |
| Port | `587` (STARTTLS) |
| Username | `apikey` |
| Password | **SendGrid SMTP API key** (secret) |
| From | Verified sender/domain, e.g. `info@<domain>` |
| To (admin) | `info@<domain>` |
| CC/BCC (user copy) | Customer's submitted email |

- The sending domain must be **verified in SendGrid** to avoid deliverability/spam issues.
- Email is sent as **plain text** (formatted quote) to maximize compatibility.

### 4.2 Recipients
1. **Admin** — full quote request (all fields, itemized selection, total).
2. **User** — confirmation copy of their own quote request.

### 4.3 Backend file: `public/quote.php`
- Placed under `public/` so it is copied to `dist/` and deployed with the static site.
- Reads and **sanitizes** all POST fields.
- **Drops** submissions where the honeypot is filled (spam).
- Returns JSON `{ "success": true|false, ... }` for inline form feedback.
- Reads the SendGrid API key from a **server-side config** (e.g. a config file / `.env`
  loaded on the server, NOT committed to git).

### 4.4 PHPMailer inclusion (no Composer on cPanel)
- Copy the **PHPMailer source** (`src/` classes) manually to the server directory next to
  `quote.php` via FTP / cPanel Web UI after deploy.
- `quote.php` references the uploaded PHPMailer path (configurable constant).

### 4.5 Manual post-deploy setup (repeatable runbook)
After CI deploys the static site:
1. Create/upload a server-side config file containing the **SendGrid API key**
   (outside the repo; do not commit).
2. Upload the **PHPMailer** source directory to the server.
3. (cPanel) Optionally set PHP version and `mail`-independent SMTP timeouts.
4. Test the **email** path (admin + user receive copies) and the **WhatsApp** pre-fill.

---

## 5. Per-Site Configuration Variables (placeholders)

Change these for every new site. **Never** fill real secrets into this file or the repo.

| Variable | Placeholder | Where |
|----------|-------------|-------|
| Site domain | `<domain>` | `astro.config.mjs` (`site`), `src/data/site.ts` (`url`) |
| Base path / cPanel folder | `<folder>` (e.g. `/preview/`) | `astro.config.mjs` (`base`), workflow `server-dir` |
| Business / company name | `<Company>` | `src/data/site.ts` |
| Address | `<lines>` | `src/data/site.ts` (`contact.address`) |
| Admin email (From + To) | `info@<domain>` | `src/data/site.ts`, `public/quote.php` |
| WhatsApp number | `+60XXXXXXXXX` | `src/data/site.ts`, `public/quote.php` |
| WhatsApp `wa.me` href | `https://wa.me/<digits>` | `src/data/site.ts` |
| Mobile / tel href | `+60XXXXXXXXX` | `src/data/site.ts` |
| Event states (Malaysia) | fixed list | `Contact.astro` |
| Products + daily prices | catalog in `products.ts` | `src/data/products.ts` |
| Gallery images | `public/assets/` | data files reference paths |
| SendGrid sending domain | `<domain>` | SendGrid dashboard (manual) |
| SendGrid SMTP API key | `SENDGRID_API_KEY` | server-side config (manual, secret) |
| PHPMailer path | `/preview/vendor/phpmailer/` | `public/quote.php` (manual upload) |
| FTP server/user/pass | — | GitHub secrets (never in repo) |

---

## 6. Secrets Handling Policy

1. **Never commit** secrets: SendGrid API key, SMTP password, FTP credentials, `.env*`.
2. `.env`, `.env.production`, secrets, and local config files are already in `.gitignore` —
   keep them out.
3. Secrets live **only on the server**:
   - SendGrid API key → server-side config / `.env` loaded by `quote.php`.
   - PHPMailer source → uploaded manually via FTP / Web UI.
   - FTP credentials → GitHub Action secrets.
4. If a key is ever committed accidentally, rotate it and remove it from history.

---

## 7. Reusable Blueprint / Component Patterns

### 7.1 Gallery slider + lightbox (home page — `Gallery.astro`)
- Horizontal carousel with prev/next arrow buttons.
- Infinite-loop feel via cloned tracks; carousel scrolls by item width + gap.
- Each item is a `<button>` that opens a **lightbox**.
- Lightbox features: prev/next navigation, keyboard (Esc close, ←/→ navigate), backdrop
  click close, body scroll lock, image counter + caption.

### 7.2 Product gallery (`ProductGallery.astro`)
- Same carousel + lightbox pattern as the home gallery, but **data-driven** from
  `product.gallery` (each product's own images, tags, captions).

### 7.3 Product detail pages
- Generated per product from `products.ts`: name, price, unit, description, specs,
  transport, gallery.

### 7.4 Contact form module (`Contact.astro`)
- Shared across all pages; single source of truth for the quote form (§3).

### 7.5 WhatsApp FAB (`WhatsAppFab.astro`)
- Fixed-position floating chat button linking to a pre-filled `wa.me` chat.

### 7.6 SEO landing pages (locations + events)
Programmatic static pages generated from typed data files via `getStaticPaths()`.
Each entry in the data file produces one page at `/{type}/{slug}/`.

**Pattern (shared by both locations and events):**
- Hub index page (`/{type}/index.astro`) — cards linking to detail pages; ItemList +
  BreadcrumbList JSON-LD.
- Detail page (`/{type}/[slug].astro`) — hero, intro, why, what's-included, steps,
  gallery (reused), FAQ, final CTA, and cross-links to siblings.
- Per-page JSON-LD: LocalBusiness (locations) / Service (events) + BreadcrumbList +
  FAQPage. Unique title/meta description per page.
- Shared sections (included items, steps, benefits) are defined once in the data file
  and reused across all pages — only location/event-specific copy differs.

**Data → page contract:**
- Location/event copy lives in `src/data/locations.ts` / `src/data/events.ts`.
- Planning CSVs in `docs/` map 1:1 to the schema fields — draft copy in the CSV row,
  then paste cells into a new object in the `.ts` file to publish a new page.
- Event pages additionally reference `products.ts` via slug to render recommended
  teleprompter cards with live pricing and imagery.

**Adding a new location or event page:**
1. Draft copy in the matching CSV row (`docs/locations-content.csv` or
   `docs/events-content.csv`).
2. Copy the row's cells into a new object in `locations.ts` / `events.ts`.
3. Build — the dynamic route generates the page; sitemap includes it automatically.
4. Footer + hub index auto-link the new page (no manual nav edits needed).

---

## 8. Acceptance Criteria

For a replicated site, verify:
- [ ] Static build succeeds and all routes generate (`astro build`).
- [ ] Gallery images open in lightbox with next/prev and keyboard support.
- [ ] Quote form: name/email/date/location/state required; package & custom both work.
- [ ] Calculator shows correct total (price × qty × days, min 1 day).
- [ ] **Email path**: admin and user both receive the quote via SendGrid SMTP.
- [ ] **WhatsApp path**: opens pre-filled `wa.me` chat with the full quote.
- [ ] Honeypot submissions are rejected.
- [ ] Deploy to cPanel works; `quote.php` reachable; no secrets in repo.
- [ ] Location pages: each `/locations/{slug}/` has unique title/meta, LocalBusiness +
      BreadcrumbList + FAQPage JSON-LD, and appears in the sitemap.
- [ ] Event pages: each `/events/{slug}/` has unique title/meta, Service +
      BreadcrumbList + FAQPage JSON-LD, recommends teleprompters via live product
      data, and appears in the sitemap.
- [ ] Hub pages (`/locations/`, `/events/`) render an ItemList + BreadcrumbList and
      link to all detail pages.
- [ ] Footer links to all location and event pages sitewide.

---

## 9. Future Work / Non-Goals

- **No database** — quotes are delivered via email/WhatsApp, not stored.
- **No node/runtime server** — PHP handles email delivery only.
- Optional future hardening: rate limiting, CAPTCHA/honeypot upgrade, stored client record,
  Webhook analytics, or a manual admin dashboard.
- Optional: store a copy of submissions in cPanel logs for auditing.
