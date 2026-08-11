# Web Strategy — MyEventMCP Revamp

Web-strategist notes built from the content inventory. These are observations and suggestions to consider — not decisions.

## 1. Current site strengths (reuse / keep)
- **Tiered, transparent pricing** (Silver / Gold / Diamond + PTZ) with per-day rates and clear inclusions — strong for qualified lead generation.
- **Real client proof:** a logo wall of credible Malaysian institutions (Bank Negara Malaysia, Khazanah Nasional, Petronas, Bursa Malaysia, KWSP, ASUS, MIA, FIMMAC, Cyberview) — high-trust social proof that should be front-and-centre.
- **Portfolio videos** (YouTube embeds) for 6 anchor events — good sales assets, currently hidden behind small popups.
- **Category-defining value prop:** handles "last-minute" events (12 hours) — a real differentiator worth promoting.
- **Add-on services menu** — supports both upselling and the customised-solution offer.

## 2. Gaps / risks to fix in the revamp (data hygiene)
- **Stray duplicate page** `/home-myeventmcp-duplicate/` — remove and 301-redirect; also potentially redundant `/home-myeventmcp...`. Clean up sitemap.
- **Contact data inconsistency:** footer/homepage say WhatsApp `+6011-3307 8724`; the Contact page says WhatsApp `+6011-5167 7752` and phone `+603-8605 3563`. Reconcile the single source of truth.
- **Email is Cloudflare-obfuscated everywhere** — capture the real address for the rebuild.
- **Alt-text errors:** Gold/Diamond/Silver hero images all share alt `"silver package mcp"` (copy/paste). Fix descriptive, keyword-aware alt text throughout.
- **Placeholders in legal pages** (`[Your Email]`, `[Insert Number]`, `[Your Country/State]`) — complete before launch.
- **T&C inconsistency:** day-before rehearsal surcharge shows **30%** on homepage vs **50%** on packages page. Reconcile.
- **No form fields captured:** quote form is a Monday.com iframe (fields not exposed). Export/spec the real fields before rebuild so the new form matches what sales actually needs.

## 3. Strategic recommendations (for the team to weigh)
### Information architecture
- **Consolidate:** the hero is thin (no photo or visual anchor on the right column — it's empty). Give the revamped hero a compelling visual (camera rig / behind-the-scenes / live-switcher shot).
- **Make portfolio a showcase, not a footnote:** build a proper case-study section with 6–10 projects, each with thumbnails, client, brief, outcome, and a playable video. Filterable by event type if volume grows.
- **Consider a dedicated "Services" page** separating core packages from add-ons end-to-end (currently scattered), and a clear "Who we serve" section (corporate, associations, government agencies, universities).
- **Add About content:** the brand page is text-only. Add people/team, equipment, certifications, and an expanded history around the "since 2014" story.

### Lead generation & conversion
- **Replace/audit the Monday.com iframe** as the primary quoting mechanism — an embedded native form (Gravity Forms is already licensed) with field labels and validation is more reliable, indexable, and branded. Capturing form fields is essential.
- **Email capture:** offer a lead magnet (e.g., "2026 Event Coverage Planning Checklist" or a shooting-day guide) to build an owned audience for retargeting.
- **WhatsApp is the primary channel** — keep prominent; test a click-to-chat on every package card.
- **Add urgency/objection-handling:** address "budget", "timing/last-minute", "locations outside KL" (transport/accommodation transparency) explicitly.

### SEO & content strategy
- Audit **meta titles/descriptions** per page (several have thin or repeated descriptions).
- Target **location + intent keywords**: "multi-camera production Malaysia", "conference videography KL", "corporate event live streaming Malaysia", "annual dinner video production", "PTZ camera live event KL".
- **Add structured content:** FAQ section (booking lead time, camera counts, livestream platforms, outstation fees) to capture long-tail queries.
- **Blog/worthwhile resources idea:** "How many cameras does my event need?" — a decision guide that funnels to the package tiers.
- Each package page currently has good copy — expand into full comparison table with a "which package for my event" helper.

### Trust & social proof
- **Testimonials are absent site-wide.** Add a testimonials/case-study layer (quotable outcomes, client names/roles where permitted).
- **Portfolio numbers:** add measurable results (attendees streamed, watch-time, formats delivered) to strengthen credibility.
- **Add social presence:** no Facebook/Instagram/LinkedIn/TikTok profiles exist (only WhatsApp). LinkedIn, in particular, is critical for B2B corporate-event buyers in Malaysia.

### Design / UX opportunities
- Responsive + page-speed: current site is heavy (Divi, full-size images, several slider/gallery libs). Revamp should modernise performance (proper image compression, srcset/WebP usage, lazy-load, no jQuery bloat where avoidable).
- Footer shows a clear structure but lacks an **"Our Packages"** nav links and a newsletter/CTA — flesh these out.
- Provide a clear **booking/availability enquiry path** and confirm the `/thank-you/` funnel follows it.

## 4. Suggested revamp priorities (quick-win order)
1. Fix contact data, stray pages, alt-text, legal placeholders, T&C discrepancies. *(low effort, high quality signal)*
2. Modernise the hero + add a strong visual + prominent client logo wall.
3. Elevate portfolio into case studies with inline video playback.
4. Replace iframe form with a proper structured quote form + capture fields; keep WhatsApp.
5. Add testimonials, FAQ, and an SEO-focused content layer (comparison/guide pages).
6. Expand social presence (LinkedIn first).

---

## Open questions for the owner (things only they know)
- Real email address(es) for enquiries.
- Correct/current phone + WhatsApp numbers (reconcile homepage vs contact page).
- Whether package pricing and inclusions are current (are these still being sold as-is?).
- Whether to keep Monday.com for quotes or move to Gravity Forms.
- How many portfolio projects they can supply and whether videos are hosted only on YouTube.
- Preferred brand positioning: budget-friendly vs premium (current copy mixes "budget-friendly" with "premium/trusted").
- Target audience focus: corporate/government vs SME vs universities vs associations.
- Style tone: current "event magic / dazzle" vs more corporate/premium.
