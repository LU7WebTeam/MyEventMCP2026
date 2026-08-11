# Product Requirements Document - MyEventMCP Revamp

## 1. Document Purpose

This PRD defines the content, design, technical and conversion requirements for the
MyEventMCP website revamp.

The new site will use the Meetco Conference Event template as its visual and interaction
foundation, while replacing the template's conference-registration model with
MyEventMCP's multi-camera event production service model.

### 1.1 Source references

- Live website: `https://myeventmcp.com/`
- Visual reference: `https://html.xpressbuddy.com/meetco/`
- Existing content inventory: `content/00-site-overview.md`
- Existing homepage content: `content/01-homepage.md`
- Package and service inventory: `content/02-packages-and-services.md`
- Image inventory: `content/images.csv`
- Strategy notes: `content/03-strategic-recommendations.md`

### 1.2 Scope

This PRD covers:

- Public marketing website
- Homepage and service/package pages
- Portfolio and gallery presentation
- Quote request flow
- WhatsApp conversion path
- SEO, accessibility and performance requirements
- Static deployment architecture

This PRD does not cover:

- A customer login or event-management platform
- Online payment processing
- A customer dashboard
- A production booking management system
- A CMS implementation unless separately approved

## 2. Product Overview

MyEventMCP is a Kuala Lumpur-based multi-camera production agency serving events across
Malaysia. The website must help visitors understand the service quickly, compare packages,
see credible production proof and request a quote with minimal friction.

### 2.1 Primary positioning

**Malaysia's trusted choice for high-quality multi-camera production and event coverage.**

### 2.2 Supporting positioning

- Multi-camera production for corporate and institutional events
- Based in Kuala Lumpur, serving events across Malaysia
- Operating since 2014
- Professional crew, production equipment and live-feed expertise
- Package options for different event sizes and production requirements
- Custom solutions and add-on services available
- Last-minute support subject to availability

### 2.3 Business goals

1. Generate qualified quote requests.
2. Make package selection easier for first-time buyers.
3. Demonstrate quality through client work, logos, photography and video.
4. Increase WhatsApp enquiries from mobile users.
5. Improve organic visibility for Malaysian event-production searches.
6. Establish a scalable content structure for future case studies and SEO pages.

### 2.4 User groups

| User | Need | Primary action |
|------|------|----------------|
| Corporate event organiser | Reliable event coverage and clear pricing | Compare packages / request quote |
| Conference or seminar organiser | Multiple angles, recording and live feed | View package inclusions |
| Government or institutional buyer | Credibility, formal process and proof | Review portfolio / contact sales |
| Agency or production partner | Flexible crew and equipment support | Request customised solution |
| University or association organiser | Good coverage within a defined budget | Compare Silver and Gold |
| Returning client | Fast contact and availability check | WhatsApp / call |

## 3. Success Metrics

The following metrics should be measurable after launch:

- Quote form completion rate
- Quote form abandonment rate
- WhatsApp click-through rate
- Package detail page visits
- Package CTA click-through rate
- Portfolio video engagement
- Organic traffic for target service/location terms
- Mobile conversion rate
- Contact form response time

Do not publish business metrics such as event counts, client counts or satisfaction rates
until the owner provides verified figures.

## 4. Information Architecture

### 4.1 Required routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage and primary conversion page |
| `/packages/` | Package comparison and add-on services |
| `/silver-mcp-package/` | Silver package detail |
| `/gold-mcp-package/` | Gold package detail |
| `/diamond-mcp-package/` | Diamond package detail |
| `/ptz-robocam-setup/` | PTZ RoboCam detail |
| `/customised-solution/` | Custom solution detail |
| `/about-us/` | Company story, capabilities and clients |
| `/portfolio/` | Portfolio index and video projects |
| `/portfolio/{slug}/` | Optional case-study detail pages |
| `/contact-us/` | Contact details and enquiry options |
| `/get-a-quote/` | Dedicated quote form |
| `/faq/` | Frequently asked questions |
| `/privacy-policy/` | Privacy policy |
| `/terms-services/` | Terms of service |
| `/thank-you/` | Form completion confirmation |

### 4.2 Navigation

Desktop and mobile navigation must include:

- Home
- About Us
- Packages
- Portfolio
- Gallery
- FAQ
- Contact
- `Get a Quote` primary CTA

Packages should be a dropdown on desktop and expandable group in the mobile drawer.

### 4.3 Redirects and cleanup

- Redirect `/home-myeventmcp-duplicate/` to `/`.
- Preserve existing package URLs to avoid losing search equity.
- Preserve existing legal URLs unless legal review requires a change.
- Generate a clean sitemap containing only canonical public routes.
- Remove or noindex unused duplicate pages.

## 5. Homepage Requirements

The homepage should follow the Meetco template's visual rhythm but use MyEventMCP's
commercial journey.

### 5.1 Header

Requirements:

- Transparent header over hero, becoming solid or elevated on scroll.
- MyEventMCP logo with appropriate desktop and mobile variants.
- High-contrast navigation in all hero states.
- Sticky behavior on desktop and mobile.
- Mobile slide-out navigation with backdrop and close control.
- Prominent `Get a Quote` button.
- Optional compact WhatsApp action on mobile.

### 5.2 Hero

Use the Meetco hero composition:

- Large editorial headline
- Supporting copy
- Floating or overlapping production images
- Staggered entrance animation
- Strong CTA treatment

Required content direction:

- Eyebrow: `Multi-Camera Production Across Malaysia`
- H1: `Every angle covered. Every moment delivered.`
- Supporting copy: explain professional multi-camera coverage for conferences,
  seminars, corporate gatherings, launches and other events.
- Primary CTA: `Get a Quote`
- Secondary CTA: `Explore Packages`
- Trust metadata:
  - `Based in Kuala Lumpur`
  - `Serving events across Malaysia`
  - `Established in 2014`

The hero must communicate the service within the first viewport. Avoid vague headlines
without an explanatory subheading.

### 5.3 Client logo marquee

Adapt Meetco's two-direction marquee:

- Eyebrow: `Trusted by leading organisations`
- Use approved client logos from `content/images.csv`.
- Preserve logo aspect ratios.
- Use muted or grayscale presentation by default if brand approvals require it.
- Pause or reduce motion for `prefers-reduced-motion`.
- Do not imply an endorsement beyond the client's approved logo usage.

Known client/logo inventory includes Bank Negara Malaysia, FIMMAC, MIA, Khazanah
Nasional, PETRONAS, KWSP, Bursa Malaysia, ASUS and Cyberview.

### 5.4 Service/package comparison

Replace the template schedule table with a visual package selector or comparison grid.

Display:

- Silver MCP Package - from RM1800/day
- Gold MCP Package - from RM2800/day
- Diamond MCP Package - from RM5500/day
- PTZ RoboCam Setup - from RM4500/day
- Customised Solution - custom quote

Each package card must include:

- Short positioning statement
- Camera count or setup type
- Crew count
- Key switcher/equipment summary
- Event duration
- `View Details` CTA
- `Book Now` or `Get a Quote` CTA

The comparison must not hide important price qualifiers. Use `from` pricing and include
a clear note that final pricing depends on event requirements, date, location and
availability.

### 5.5 About / story section

Use the template's dark gradient about section with a two-column editorial layout and
production image strip.

Required content themes:

- MyEventMCP's 2014 origin
- Multi-camera production expertise
- Corporate, conference, seminar, annual dinner, roundtable and launch coverage
- Strategic camera placement and dynamic shot composition
- Real-time switching/editing and reliable delivery
- Tailored solutions for each event

CTA: `Meet MyEventMCP` or `About Us`.

### 5.6 Why choose MyEventMCP

Use the template's stacked feature list with icon, title, description and optional image.

Required feature cards:

1. Last-Minute Event Support
2. Professional Production Crew
3. Multi-Camera Expertise
4. Flexible Packages
5. Customer-Centric Solutions
6. Reliable Delivery

Avoid unsupported superlatives. Copy must distinguish between a factual capability and
a marketing claim.

### 5.7 Verified proof metrics

Use the Meetco counter section only when data is verified. Candidate metrics:

- Years of experience
- Events covered
- Organisations served
- Malaysian locations served
- Cameras or production setups available

The implementation must support hiding the entire metrics section until figures are
approved.

### 5.8 Portfolio

Replace the speaker grid with project cards and video previews.

Initial projects:

- Sasana Symposium 2023 - Bank Negara Malaysia
- FIMMAC 2023 - Federation of Investment Managers Malaysia
- ICIEF 2024 - International Islamic University Malaysia
- Karnival Celik Kewangan 2023 - Bank Negara Malaysia
- BELANJAWANKU 2023 - KWSP / EPF
- World Bank Conference 2023 - Suruhanjaya Sekuriti Malaysia

Each card should support:

- Image thumbnail
- Client name
- Event name
- Event type
- Short project description
- YouTube video or case-study link
- Accessible play button and descriptive label

Future case studies should support:

- Brief
- Scope
- Setup/package used
- Event size or format
- Production challenge
- Outcome
- Video/gallery
- Client quote, subject to approval

### 5.9 Gallery

Use Meetco's image-led collage or carousel treatment for existing production images.

Requirements:

- Responsive image gallery
- Lightbox with previous/next controls
- Escape key support
- Keyboard focus management
- Captions or descriptive labels
- Lazy loading below the fold
- Correct alt text from `content/images.csv`, revised where current text is inaccurate

### 5.10 Testimonials

Add the Meetco-style testimonial carousel only after approved testimonials are supplied.

Required fields:

- Quote
- Client name
- Role or organisation, if approved
- Optional event/project reference
- Optional rating only if meaningful and genuine

Do not invent testimonials, ratings or client quotes.

### 5.11 Quote/contact section

Use the Meetco contact section as the primary final conversion block, with a high-contrast
production background and form panel.

Required headline direction:

- `We know you're excited`
- `Get a quote now!`

Supporting copy should explain that MyEventMCP provides multi-camera production in Kuala
Lumpur and across Malaysia.

The quote form must be native, branded and usable without relying on a third-party iframe.

### 5.12 FAQ

Use the Meetco accordion pattern.

Initial questions:

- Which package is right for my event?
- How many cameras do I need?
- Do you provide livestreaming?
- Do you cover locations outside Kuala Lumpur and Selangor?
- What is included in the event recording?
- How much rehearsal and setup time is included?
- Can you support a last-minute event?
- Can I combine packages and add-on services?
- What happens after I submit a quote request?

Answers must be approved against current operations, pricing and terms.

### 5.13 Final CTA

Use the template's large CTA treatment:

- Headline: `Planning an event? Let's make every angle count.`
- Primary CTA: `Request a Quote`
- Secondary CTA: `Chat on WhatsApp`

### 5.14 Footer

Required footer groups:

- Packages
- Add-on services
- Portfolio
- About
- Contact
- FAQ
- Privacy policy
- Terms of service

Contact details must come from one central site configuration and must not be hardcoded
in separate components.

## 6. Package and Service Requirements

### 6.1 Core packages

Package content must be data-driven so cards, comparison tables and detail pages use the
same source of truth.

| Slug | Name | Starting price | Setup |
|------|------|----------------|-------|
| `silver-mcp-package` | Silver MCP Package | RM1800/day | 1 static camera, 2 crews |
| `gold-mcp-package` | Gold MCP Package | RM2800/day | 2 static cameras, 3 crews |
| `diamond-mcp-package` | Diamond MCP Package | RM5500/day | 3 static cameras, 4 crews |
| `ptz-robocam-setup` | PTZ RoboCam Setup | RM4500/day | 3 PTZ cameras, 3 crews |
| `customised-solution` | Customised Solution | Custom quote | Mix and match |

Every package detail page must include:

- Package name and positioning
- Starting price and price qualifier
- Recommended event scenarios
- Equipment and crew inclusions
- Setup/rehearsal terms
- Recording/delivery details
- Relevant gallery
- Add-on services
- Quote CTA
- Related packages
- FAQ or relevant terms

### 6.2 Add-on services

The following add-ons must be represented in the catalog:

| Service | Starting price |
|---------|----------------|
| Audio Equipment | RM3000/day |
| Event Laptop | RM500/day |
| Additional MCP Camera | RM800/day |
| Livestreaming | RM2500/day |
| Event Highlights | RM3500/day |
| Zoom Webinar | RM2000/day |
| Event Photography | RM2500/day |
| Internet Connection | RM1500/day |

Each service needs an approved description, inclusion list, availability notes and pricing
qualifier before launch.

### 6.3 Customised solution

The customised solution page must explain:

1. Mix and match packages.
2. Select only the products and services required.
3. Add extras from the add-on catalog.

CTA: `Tell us what you need` leading to the quote form.

## 7. Quote Request Flow

### 7.1 Form fields

| Field | Type | Required |
|-------|------|----------|
| Name | Text | Yes |
| Email | Email | Yes |
| Phone / WhatsApp | Tel | Yes |
| Company / organisation | Text | No |
| Event type | Select | Yes |
| Event date | Date | Yes |
| Event location / venue | Text | Yes |
| State | Select | Yes |
| Package preference | Select | Yes |
| Add-on services | Multi-select | No |
| Estimated audience / event size | Select or text | No |
| Event details | Textarea | No |
| Preferred response | Radio: Email / WhatsApp / Phone | Yes |
| Consent | Checkbox | Yes |
| Honeypot | Hidden | Yes |

Event types should include corporate gathering, conference, annual dinner, seminar,
roundtable, launch, webinar, hybrid event, livestream and other.

### 7.2 Submission paths

#### Email

- Submit asynchronously where possible.
- Send full request to the configured admin email.
- Send confirmation copy to the customer.
- Show inline success and error states.
- Redirect or link to `/thank-you/` after successful submission if the implementation
  requires a dedicated analytics page.

#### WhatsApp

- Generate a URL-encoded pre-filled WhatsApp message containing the quote details.
- Open WhatsApp in a new tab or app.
- Do not claim that a WhatsApp enquiry is a confirmed booking.

### 7.3 Validation and security

- Validate all fields server-side.
- Sanitize submitted values before email output.
- Reject or ignore filled honeypot submissions.
- Add rate limiting or CAPTCHA if spam volume requires it.
- Never expose SMTP credentials or API keys in the repository.
- Do not store personal data unless a storage policy is approved.

### 7.4 Current contact-data blockers

The following must be resolved before production launch:

- Homepage/footer WhatsApp: `+6011-3307 8724`
- Contact page WhatsApp: `+6011-5167 7752`
- Contact page phone: `+603-8605 3563`
- Email address is currently obfuscated and must be confirmed.

Use one approved source of truth in `src/data/site.ts` or equivalent.

## 8. Design System

### 8.1 Brand colors

The brand colors are ordered by accent hierarchy:

```css
:root {
  --brand-primary: #ea4336;
  --brand-secondary: #faaf40;
  --brand-tertiary: #303485;

  --color-background: #ffffff;
  --color-surface: #f7f7f5;
  --color-surface-dark: #303485;
  --color-text: #20213b;
  --color-text-muted: #686978;
  --color-border: #dedee5;
  --color-white: #ffffff;
  --color-black: #111111;
}
```

Usage rules:

- `#ea4336`: primary CTA buttons, active actions, important conversion emphasis.
- `#faaf40`: secondary CTA buttons, eyebrow labels, highlights, icons and hover accents.
- `#303485`: dark backgrounds, navigation, headings, footer and structural surfaces.
- Do not use all three colors at equal intensity in the same component.
- Red buttons must meet accessible contrast requirements with their text treatment.
- Orange should not be used for long body copy or small text on white.
- Use neutral surfaces to prevent the page from becoming visually noisy.

### 8.2 Template visual language

Retain from Meetco:

- Editorial, oversized headings
- Generous section spacing
- Dark gradient feature sections
- Angled or clipped image/logo tiles
- Circular arrow CTA motifs
- Asymmetric image compositions
- Marquees, reveal animations and hover transitions
- Light gray content bands alternating with dark sections

Adapt carefully:

- Use production imagery, not conference stock imagery.
- Keep animations purposeful and restrained around conversion controls.
- Avoid excessive decoration that competes with package information.
- Use sentence case for customer-facing copy unless a brand decision approves display-case
  typography.

### 8.3 Typography

Recommended starting system:

- Display font: Meetco's `ARPDisplay` or an approved equivalent.
- Body font: Inter.
- Monospace font: not required unless used for equipment/specification labels.

Typography must remain readable on mobile. Do not use the display font for long paragraphs,
forms or legal copy.

### 8.4 Buttons and CTAs

Primary:

- Red fill `#ea4336`
- White text
- Arrow or directional icon
- Clear hover, focus and disabled states

Secondary:

- Orange fill `#faaf40` or outlined treatment
- Navy or dark text depending on contrast

Dark-surface CTA:

- White or orange treatment against `#303485`

Circular CTAs may be used for major editorial actions, but standard rectangular buttons
must remain available for clarity and accessibility.

## 9. Interaction and Animation Requirements

Retain the template's interaction vocabulary where it supports the user journey:

- Sticky header transition
- Staggered fade-in reveals
- Image parallax used sparingly
- Two-direction logo marquee
- Portfolio carousel or grid hover states
- Testimonial carousel
- FAQ accordion
- Gallery lightbox
- Back-to-top control
- WhatsApp floating action button

Requirements:

- Respect `prefers-reduced-motion`.
- Do not hide critical content behind animation.
- Ensure keyboard users can operate menus, carousels, accordions and lightboxes.
- Avoid auto-playing video with sound.
- Pause marquees and carousels when focused or hovered where appropriate.

## 10. Technical Architecture

The site should follow the existing Astro static-site blueprint in `Teleprompter PRD.md`.

### 10.1 Stack

- Astro 7.x or current approved version
- Static output
- TypeScript data files
- Component-scoped or global CSS with design tokens
- Native browser APIs where sufficient
- Minimal client-side JavaScript islands for interactive components
- PHP quote endpoint on cPanel, if required by hosting
- PHPMailer + SMTP provider configured only on the server
- GitHub Actions + FTP deployment, if approved

### 10.2 Suggested repository layout

```text
astro.config.mjs
public/
  assets/
  quote.php
src/
  components/
    Header.astro
    MobileMenu.astro
    Hero.astro
    ClientMarquee.astro
    PackageComparison.astro
    AboutSection.astro
    FeatureStack.astro
    Metrics.astro
    Portfolio.astro
    Gallery.astro
    Testimonials.astro
    QuoteForm.astro
    FAQ.astro
    FinalCTA.astro
    Footer.astro
    WhatsAppFab.astro
  data/
    site.ts
    packages.ts
    services.ts
    portfolio.ts
    faqs.ts
    clients.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    packages/index.astro
    packages/[slug].astro
    portfolio/index.astro
    portfolio/[slug].astro
    about-us.astro
    contact-us.astro
    get-a-quote.astro
    faq.astro
    privacy-policy.astro
    terms-services.astro
    thank-you.astro
docs/
  MyEventMCP PRD.md
```

### 10.3 Data source requirements

Packages, add-ons, portfolio items, clients, FAQs and navigation must be data-driven.
This prevents the homepage cards and detail pages from drifting apart.

Each package record should contain:

- `slug`
- `name`
- `shortDescription`
- `longDescription`
- `priceFrom`
- `priceUnit`
- `recommendedFor`
- `cameraSetup`
- `crewCount`
- `equipment`
- `duration`
- `rehearsal`
- `includes`
- `gallery`
- `ctaLabel`

## 11. SEO Requirements

### 11.1 Page metadata

Every indexable page must have:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph title, description and image
- Twitter card metadata
- Descriptive H1
- Logical heading order

### 11.2 Target search themes

- Multi-camera production Malaysia
- Multi-camera production Kuala Lumpur
- Corporate event video production KL
- Conference video production Malaysia
- Event livestreaming Malaysia
- PTZ camera event coverage Malaysia
- Corporate event recording Kuala Lumpur
- Multi-camera event coverage

Do not keyword-stuff package descriptions or alt text.

### 11.3 Structured data

Implement where accurate:

- Organization
- LocalBusiness or ProfessionalService
- Service for package pages
- BreadcrumbList
- FAQPage for approved FAQs
- VideoObject for portfolio videos where metadata is available

### 11.4 SEO landing-page opportunity

Future phase, not required for initial launch:

- `/events/conferences/`
- `/events/corporate-gatherings/`
- `/events/annual-dinners/`
- `/events/seminars/`
- `/events/launches/`
- `/locations/kuala-lumpur/`
- `/locations/selangor/`
- Additional Malaysian location pages only when unique, useful content exists.

## 12. Accessibility Requirements

- WCAG 2.2 AA target for core interactions.
- Keyboard-operable navigation, menus, accordions, carousel and lightbox.
- Visible focus indicators.
- Correct semantic heading hierarchy.
- Form labels associated with inputs.
- Error messages connected to fields.
- Alt text for meaningful images; empty alt for decorative images.
- Captions or transcripts for important video content where available.
- Sufficient contrast for all brand-color combinations.
- No essential information conveyed by color alone.
- Touch targets at least approximately 44px where practical.

## 13. Performance Requirements

- Optimise and serve images in WebP or AVIF where supported.
- Use responsive image sizes and `srcset`.
- Lazy-load below-the-fold images.
- Avoid loading unused template plugins and libraries.
- Delay non-critical animation libraries.
- Do not load all YouTube embeds until interaction where possible.
- Target strong Core Web Vitals on mobile.
- Ensure the hero has an explicit image dimension to avoid layout shift.

## 14. Legal and Operational Content Requirements

Resolve before launch:

- Real enquiry email address.
- Correct phone and WhatsApp numbers.
- Weekend/public-holiday surcharge.
- Day-before rehearsal surcharge (current content conflicts between 30% and 50%).
- Cancellation and refund policy.
- Governing law in the terms page.
- Privacy-policy contact email; current content contains `[Your Email]`.
- Terms page placeholders `[Insert Number]` and `[Your Country/State]`.
- Permission to display all client logos and project videos.
- Image and video usage rights.

## 15. Content Acceptance Rules

- Do not publish unverified statistics.
- Do not publish invented testimonials.
- Do not claim guaranteed availability for last-minute work.
- Preserve `from` pricing terminology.
- Clearly state that final quotes depend on date, location, scope, equipment availability
  and selected add-ons.
- Keep package inclusions consistent across homepage, packages index and detail pages.
- Use approved terminology consistently: `multi-camera production`, `live feed`,
  `livestreaming`, `event recording`, `PTZ RoboCam`.

## 16. Analytics and Measurement

Track at minimum:

- `quote_cta_click`
- `quote_form_start`
- `quote_form_submit`
- `quote_form_error`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `package_view`
- `package_quote_click`
- `portfolio_video_play`
- `gallery_open`
- `faq_open`

Use the existing Google Tag Manager container only after confirming ownership and privacy
requirements. Do not expose tracking IDs or credentials in documentation as secrets.

## 17. Delivery Phases

### Phase 0 - Content and approvals

- Confirm contact details and legal terms.
- Confirm current prices and package inclusions.
- Approve hero copy and visual direction.
- Approve client logo and portfolio usage.
- Collect testimonials and verified business metrics.
- Define quote-form recipient and response workflow.

### Phase 1 - Design foundation

- Configure brand tokens.
- Adapt Meetco header, hero, CTA, section rhythm and responsive patterns.
- Prepare image crops and image alt text.
- Create shared components.

### Phase 2 - Core build

- Homepage.
- Packages index and five package pages.
- About, portfolio, contact, quote and FAQ pages.
- Footer, WhatsApp FAB and legal pages.

### Phase 3 - Conversion and SEO

- Implement native quote flow.
- Add analytics events.
- Add metadata and structured data.
- Add redirects and sitemap.
- Add portfolio lightbox/case-study support.

### Phase 4 - QA and launch

- Test mobile, tablet and desktop.
- Test all forms and email/WhatsApp paths.
- Test keyboard and screen-reader-critical flows.
- Run Lighthouse/Core Web Vitals checks.
- Verify redirects, sitemap, robots and canonical URLs.
- Confirm no secrets or placeholder legal text remain.

## 18. Acceptance Criteria

### Content and navigation

- [ ] All required routes generate successfully.
- [ ] Navigation links work on desktop and mobile.
- [ ] Package data is consistent across cards and detail pages.
- [ ] Duplicate home page redirects to the canonical homepage.
- [ ] No unresolved legal or contact placeholders remain.

### Design

- [ ] Meetco-derived layout language is recognisable but fully branded for MyEventMCP.
- [ ] `#ea4336` is the primary action accent.
- [ ] `#faaf40` is the secondary accent.
- [ ] `#303485` anchors dark surfaces, headings and structural UI.
- [ ] Hero communicates the service without requiring scrolling.
- [ ] Site remains readable and usable at mobile widths.

### Conversion

- [ ] Quote CTA appears in header, hero, packages, detail pages and final CTA.
- [ ] Quote form validates required fields.
- [ ] Email submission reaches the approved admin mailbox.
- [ ] Customer receives a confirmation where approved.
- [ ] WhatsApp path opens a correctly encoded message.
- [ ] Success and error states are clear.
- [ ] WhatsApp FAB is available without covering form controls.

### Accessibility and performance

- [ ] Core flows are keyboard operable.
- [ ] Form fields have labels and useful errors.
- [ ] Images have approved alt text.
- [ ] Reduced-motion preference is respected.
- [ ] Gallery and video interactions do not block page access.
- [ ] Images are responsive and below-fold media is lazy-loaded.
- [ ] No unnecessary third-party scripts are loaded.

### SEO and analytics

- [ ] Every indexable page has unique metadata and canonical URL.
- [ ] Sitemap contains only canonical public pages.
- [ ] Organization, service and breadcrumb structured data validate.
- [ ] Key CTA and form events are tracked.
- [ ] No sensitive form data is sent to analytics tools.

## 19. Open Decisions

These decisions must be resolved before final production content and launch:

1. Which phone and WhatsApp numbers are correct?
2. What is the approved enquiry email address?
3. Is the rehearsal surcharge 30% or 50%?
4. Are all listed package prices current?
5. Should the positioning emphasise premium quality, flexible value or both?
6. Which client logos and portfolio videos have usage approval?
7. Will the quote form use email only, WhatsApp only or both?
8. Which SMTP/provider and sender address will be used?
9. Are testimonials and verified business metrics available?
10. Is a blog/resource section required for launch or a later phase?
