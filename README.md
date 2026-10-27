# Weewire website (prototype)

Prototype redesign of the Weewire website, built with [Astro](https://astro.build) and TypeScript.

**This repository is separate from the production website at weewire.com.** Nothing here changes the live site, its hosting or its DNS. The prototype is kept out of search engines until a launch is approved.

## Getting started

Requires Node.js 22.23.4 or later (Node 24 recommended; Astro 7).

```sh
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # type-check (astro check) + static build to dist/
npm run preview   # serve the built site locally
```

## Project structure

```
src/
  config/
    business.ts     Single source of truth for business facts (contact, licensing, address, logo)
    site.ts         Navigation, environment flags, form endpoint
  data/
    pricing.ts      Rates and terms shown on /pricing
  content/
    services/       One Markdown file per service (drives Services, Home, About and the form)
  content.config.ts Service collection schema
  components/       Shared UI (Header, Footer, Button, Fact, FormField, …)
  components/diagrams/  Technical SVG illustrations (rack, fiber trace, topology, cabling plan)
  layouts/BaseLayout.astro  HTML shell, SEO meta, canonical, robots
  lib/              Helpers (fact rendering, structured data, paths)
  pages/            Routes: /, /services, /pricing, /about, /contact, /privacy, 404, robots.txt
  styles/global.css Design tokens and base styles
public/             favicon, default share image
scripts/generate-og.mjs  Regenerates public/og-default.png
```

## Business information and verification

Every business detail lives in `src/config/business.ts` and carries a status:

| Status | Meaning | How it renders (prototype) |
| --- | --- | --- |
| `confirmed` | Confirmed by the owner | Shown as-is |
| `unverified` | From the current site's indexed text or a public record | Shown with a **Pending confirmation** tag |
| `missing` | Not known | Shown as a dashed placeholder; omitted when markers are off |

To update a detail: set `value`, change `status` to `'confirmed'`, and update `source`.

**Do not add details that have not been supplied or confirmed by the owner.**

- **Phone:** the owner supplied two numbers without saying which is the public one. Both are recorded as `candidates` on `business.phone` (never rendered). Once the owner chooses, set `value` and `status: 'confirmed'`.
- **Address:** the owner supplied a street address; only the locality (Maricopa, Arizona) is used. The street address is deliberately kept out of this public repository and the site until the owner approves publishing it.
- **Never commit:** email credentials or mail-server settings, tax IDs, or staff personal phone numbers. This repository is public.
- Testimonials, client names, service area and hours are intentionally absent.

Pricing (`src/data/pricing.ts`) and services (`src/content/services/*.md`) follow the same rule: values come from the current site's indexed text and are marked `unverified` until confirmed.

### Logo and brand colours

The owner-supplied primary logo lives at `src/assets/brand/weewire-logo-primary.png` (only its empty white margin was trimmed) and is wired up in `src/config/brand.ts`. `src/components/Logo.astro` renders it at 1×/2×/3× density without distortion: blended into light surfaces in the header, and on a white plate over the dark footer.

To use a higher-resolution or vector version: add the file to `src/assets/brand/`, change the import in `src/config/brand.ts`, then run `node scripts/generate-og.mjs` to refresh the share image. Never stretch, recolour or redraw the logo.

The palette is derived from the logo (cyan `#00ffff`, orange `#ff9955`, black, white) and defined as tokens in `src/styles/global.css`. Raw cyan and orange are used decoratively and on dark backgrounds; text on light backgrounds uses the darker `--cyan-ink` and `--accent` variants so it meets WCAG AA. Primary buttons use brand orange with dark text (9.1:1).

### Adding photography

Use `src/components/Media.astro` with images imported from `src/assets/`. It produces responsive AVIF/WebP at several widths with intrinsic dimensions. Only use images the owner has permission to publish.

## Environment variables

See `.env.example`. None are secrets; never commit real credentials.

| Variable | Default | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://weewire.com` | Canonical origin for canonical URLs and the sitemap |
| `PUBLIC_SITE_INDEXING` | unset (off) | `true` allows indexing. Set **only** for an approved production launch |
| `PUBLIC_SHOW_REVIEW_MARKERS` | on | `false` hides pending tags and placeholders |
| `PUBLIC_FORM_ENDPOINT` | unset | Form submission URL. When unset the form validates but sends nothing, and says so |

## Request-service form

The form at `/contact` validates input accessibly (inline errors, error summary, focus management). No form backend is configured, so **it does not send or store anything**: on a valid submit it tells the user the request was not sent. To connect it, set `PUBLIC_FORM_ENDPOINT` to a service that accepts a `multipart/form-data` POST and returns a 2xx response, then update the privacy policy to name that provider.

## Search engines

The prototype is blocked from indexing in four independent ways:

- `<meta name="robots" content="noindex, nofollow">` on every page
- `robots.txt` disallows all crawling
- `X-Robots-Tag: noindex, nofollow` header in `vercel.json`
- Vercel preview deployments are not indexed by default

`LocalBusiness` structured data is generated automatically only when the business name, phone and address are all `confirmed`.

### Launch checklist (not yet approved)

- [ ] All business facts confirmed; review markers turned off (`PUBLIC_SHOW_REVIEW_MARKERS=false`)
- [ ] Official logo and approved photography in place
- [ ] Privacy policy reviewed and approved; effective date and retention set
- [ ] Form endpoint configured and tested end-to-end
- [ ] Canonical domain decided (`weewire.com` or `www.weewire.com`)
- [ ] Existing production URLs inventoried and redirects added where paths change
- [ ] `PUBLIC_SITE_INDEXING=true` and the `X-Robots-Tag` header removed from `vercel.json`
- [ ] DNS change planned and approved by the owner

## Deployment (Vercel)

- **Project:** `wee-wire` in the "AMIGO's projects" Vercel team (Hobby plan), linked to `Amigo-1234/wee-wire`.
- **Branch:** `claude/weewire-website-audit-w95115` (the repository's default branch, so Vercel treats it as the project's production branch). Every push deploys automatically.
- **Addresses:** `*.vercel.app` only. No custom domain is attached, and weewire.com DNS is untouched.
- **Access:** Vercel Authentication (the team default) protects all `*.vercel.app` URLs, so viewers need access to the Vercel team, or a share link, to open the prototype.
- **Indexing:** `vercel.json` sets security and caching headers and `X-Robots-Tag: noindex, nofollow` on every response.

Do not attach a custom domain or remove the noindex header until launch is approved (see the checklist above).
