# Get a Quote (`/get-a-quote/`)
- **SEO title:** Request a Quote – Affordable Multi-Camera Production Packages

## Note
The page body is essentially empty in server-rendered HTML — the quote form loads client-side. The working quote form lives in the homepage `#quote` section as a **Monday.com embedded form iframe**:

`https://forms.monday.com/forms/embed/2a116a8c5989396447903d425dd3d0e1?r=use1`

Gravity Forms + reCAPTCHA v3 are loaded site-wide, but form fields are rendered client-side via JS, so exact field labels are not extractable from static HTML. **Recommendation:** capture the actual Monday.com form fields (or export the Gravity Form) during the revamp so the new quoted form has real field definitions.
