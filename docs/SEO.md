# SEO Settings Reference — MyEventMCP

A living reference for search-engine metadata across every page on the site. Update this
file whenever titles, descriptions, canonical URLs, OG images or JSON-LD change.

## Global defaults

Configured in `src/layouts/BaseLayout.astro` and applied to **every page**:

| Setting | Value |
|---------|-------|
| `<title>` | Page-specific (falls back to `MyEventMCP \| Multi-Camera Production Malaysia`) |
| Meta description | Page-specific (falls back to `Professional multi-camera production and event coverage across Malaysia.`) |
| Canonical | `https://myeventmcp.com` + current path, auto-derived from `Astro.url.pathname` |
| Robots | `index, follow` |
| OG type | `website` (page can override) |
| OG site name | `MyEventMCP` |
| OG locale | `en_MY` |
| OG image | Page-specific (defaults to `/logo-color.webp`, resolved to an absolute URL) |
| Twitter card | `summary_large_image` + title/description/image |
| JSON-LD (all pages) | `Organization` (name, url, logo, contactPoint) |

## Page inventory

### Homepage

| Route | `/` |
|-------|-----|
| Title | `MyEventMCP \| Multi-Camera Production Malaysia` |
| Description | `Professional multi-camera production and event coverage across Malaysia. Based in Kuala Lumpur, serving events across Malaysia.` |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization + **FAQPage** (7 questions) |

### Package detail pages

Slugs: `silver-mcp-package`, `gold-mcp-package`, `diamond-mcp-package`,
`ptz-robocam-setup`, `customised-solution`.

| Route | `/{slug}/` |
|-------|-----------|
| Title | `{Package title} \| MyEventMCP` (e.g. `Gold MCP Package \| MyEventMCP`) |
| Description | `{Package title} for event coverage across Malaysia.` (Silver has a custom marketing description) |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization + **Service** |

Rendered in `src/pages/[slug].astro` and `src/pages/silver-mcp-package.astro`.

### Events hub

| Route | `/events/` |
|-------|-----------|
| Title | `Event types \| MyEventMCP` |
| Description | `Explore multi-camera production services for conferences, launches, awards, broadcasts and more.` |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization only — TODO: add **ItemList + BreadcrumbList** |

### Event detail pages

Slugs: `corporate-conferences`, `product-launches`, `gala-dinners-awards`,
`broadcast-video-production`, `government-glc-events`.

| Route | `/events/{slug}/` |
|-------|-------------------|
| Title | `{Event name} \| MyEventMCP` |
| Description | `{shortDescription} MyEventMCP provides professional multi-camera production across Malaysia.` |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization + **Service + BreadcrumbList + FAQPage** |

Rendered from `src/data/seo-pages.ts` via `src/components/SeoLanding.astro`.

### Locations hub

| Route | `/locations/` |
|-------|---------------|
| Title | `Locations \| MyEventMCP` |
| Description | `Explore professional multi-camera event production services in Kuala Lumpur and across Malaysia.` |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization only — TODO: add **ItemList + BreadcrumbList** |

### Location detail pages

Slugs: `kuala-lumpur`, `klang-valley`, `putrajaya`, `penang`, `johor`.

| Route | `/locations/{slug}/` |
|-------|----------------------|
| Title | `{Location name} \| MyEventMCP` |
| Description | `{shortDescription} MyEventMCP provides professional multi-camera production across Malaysia.` |
| OG image | `https://myeventmcp.com/wp-content/uploads/2025/01/DSC02241-scaled.jpg` |
| JSON-LD | Organization + **LocalBusiness + BreadcrumbList + FAQPage** |

Rendered from `src/data/seo-pages.ts` via `src/components/SeoLanding.astro`.

## Content pages — planned (markdown exists, routes not yet built)

`content/pages/*.md` exist but are not generated as routes yet. Titles/descriptions sit in
each file's front matter / heading block. Routes: `/about-us/`, `/packages/`,
`/portfolio/`, `/contact-us/`, `/get-a-quote/`, `/faq/`, `/privacy-policy/`,
`/terms-services/`, `/thank-you/`.

## Content pages

| Route | Title | JSON-LD |
|-------|-------|---------|
| `/terms-services/` | `Terms of Service \| MyEventMCP` | Organization |
| `/privacy-policy/` | `Privacy Policy \| MyEventMCP` | Organization |

Built in `src/pages/terms-services.astro` and `src/pages/privacy-policy.astro` using the
shared `src/layouts/LegalLayout.astro`. Remaining content pages (`about-us`, `packages`,
`portfolio`, `contact-us`, `get-a-quote`, `faq`, `thank-you`) are still to be built from
`content/pages/*.md`.

## Where to edit

| What | Where |
|------|-------|
| Global defaults, OG/Twitter tags, Organization schema | `src/layouts/BaseLayout.astro` |
| Homepage title/description/image | `src/pages/index.astro` (BaseLayout props) |
| Package titles/descriptions | `src/pages/[slug].astro` + `src/pages/silver-mcp-package.astro` |
| SEO landing titles/descriptions/FAQs | `src/data/seo-pages.ts` |
| Event/location OG images | `src/components/SeoLanding.astro` (BaseLayout `image` prop) |
| Hub titles/descriptions | `src/components/SeoDirectory.astro` |
| SEO pages JSON-LD | `src/components/SeoLanding.astro` (frontmatter `schema`) |
| Homepage FAQ JSON-LD | `src/pages/index.astro` (`faqSchema` const) |

## Outstanding SEO items

- [ ] Add **ItemList + BreadcrumbList** JSON-LD to `/events/` and `/locations/` hubs
- [ ] Wire up the remaining content-page routes (`about-us`, `packages`, `portfolio`, `contact-us`, `get-a-quote`, `faq`, `thank-you`)
- [ ] Confirm the rehearsal surcharge and contact details resolve any conflicting placeholder text
- [ ] Re-run Google Rich Results / Rich Snippets validation for FAQPage and Service/LocalBusiness mark-up