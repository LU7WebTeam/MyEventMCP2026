# MyEventMCP.com — Site Content Inventory (Revamp Prep)

> Extracted from the live site (retrieved with webfetch). This is the baseline "what already exists and can be reused" reference for the revamp.

## Company / Brand Facts
- **Brand:** MyEventMCP ("My Event MCP")
- **Company:** A multi-camera production agency based in Kuala Lumpur, Malaysia
- **Parent company:** Video Production KL Sdn Bhd (linked in footer and hero tagline)
- **Founded:** 2014 (per About copy)
- **Positioning tagline (SEO meta):** "Malaysia's trusted choice for high-quality multi-camera production and event coverage"
- **Currency:** RM (Malaysian Ringgit)
- **Service area:** Kuala Lumpur + all across Malaysia (extra transport/accommodation outside KL & Selangor)

## Technical Stack (existing site, for reference only)
- WordPress 7.0.3 + Divi theme v4.27.6 (page builder)
- Yoast SEO v27.8
- Gravity Forms + reCAPTCHA v3 (loaded, but see note below)
- **Contact/quote forms are a Monday.com embedded form iframe**:
  `https://forms.monday.com/forms/embed/2a116a8c5989396447903d425dd3d0e1?r=use1`
- Google Tag Manager: `GTM-KP5JMBH7`
- Fonts: Open Sans, Roboto, Poppins, ABeeZee
- Content Delivery / LiteSpeed optimiser in use
- Email addresses are Cloudflare-obfuscated in source (need real values from the owner)

## Common Global Elements (all pages)
### Header nav
- Portfolio (`#portfolio`)
- About Us (`#about`)
- Packages (dropdown)
  - Silver MCP Package (`/silver-mcp-package/`)
  - Gold MCP Package (`/gold-mcp-package/`)
  - Diamond MCP Package (`/diamond-mcp-package/`)
  - PTZ RoboCam Setup (`/ptz-robocam-setup/`)
  - Customised Solution (`/customised-solution/`)
- Gallery (`#gallery`)
- Contact Us (`#quote`)
- CTA button: **Get a Quote** → `/#quote`

### Footer
- Tagline: "A multi-camera production agency, based in Kuala Lumpur. Providing MCP services to achieve successful events all across Malaysia."
- **Email:** (obfuscated — get real address from owner)
- **WhatsApp / Mobile:** `+6011-3307 8724` → `https://wa.me/601133078724`
- Legal links: Terms and Services, Privacy Policy
- CTA: "Have an Inquiry? Get a Quote" + WhatsApp icon
- Copyright: `© 2026 MyEventMCP by Video Production KL Sdn Bhd | All Rights Reserved`
- Social: WhatsApp only — **no Facebook / Instagram / LinkedIn / TikTok / X profiles present** (opportunity)

## Page Inventory (from sitemap, 13 URLs)
| # | Slug | Purpose / 1-line description | Last modified |
|---|------|------------------------------|---------------|
| 1 | `/` (home) | Single-page marketing site: hero, gallery, about, portfolio, packages, clients, quote | 2026-03-25 |
| 2 | `/home-myeventmcp-duplicate/` | Duplicate/home copy (stray — candidate for removal/redirect) | 2025-01-03 |
| 3 | `/about-us/` | Company story, why choose us, clients | 2025-03-24 |
| 4 | `/contact-us/` | Contact details + address; note phone/WhatsApp differ from footer | 2025-03-24 |
| 5 | `/get-a-quote/` | Quote form (renders client-side via Monday.com iframe) | 2025-03-24 |
| 6 | `/customised-solution/` | Tailored/add-on service offering | 2025-03-24 |
| 7 | `/ptz-robocam-setup/` | PTZ RoboCam package | 2025-03-24 |
| 8 | `/packages/` | All packages + add-on services index | 2025-03-24 |
| 9 | `/privacy-policy/` | Legal | 2025-03-24 |
| 10 | `/terms-services/` | Legal | 2025-03-24 |
| 11 | `/thank-you/` | Post-submission confirmation | 2025-03-24 |
| 12 | `/diamond-mcp-package/` | Diamond package | 2025-09-10 |
| 13 | `/gold-mcp-package/` | Gold package | 2025-09-10 |
| 14 | `/silver-mcp-package/` | Silver package | 2025-09-10 |

## Full list of pages → see `pages/` folder for full text content.
## Packages & add-on services → see `02-packages-and-services.md`.
## All images → see `images.csv`.
## Strategic recommendations → see `03-strategic-recommendations.md`.
