# Weewire website (prototype)

Prototype redesign of the Weewire website, built with [Astro](https://astro.build) and TypeScript.

**This repository is separate from the production website at weewire.com.** Nothing here changes the live site, its hosting or its DNS. The prototype is kept out of search engines until a launch is approved.

## Getting started

Requires Node.js 22.23.4 or later (Node 24 recommended).

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

**Do not add details that have not been supplied or confirmed by the owner.** Phone numbers, the new address, service area, hours, testimonials, client names and the official logo are intentionally absent.

Pricing (`src/data/pricing.ts`) and services (`src/content/services/*.md`) follow the same rule: values come from the current site's indexed text and are marked `unverified` until confirmed.

### Adding the official logo

1. Put the SVG (preferred) or PNG in `public/brand/`.
2. Set `business.logo.value` to `{ src: '/brand/logo.svg', width, height, alt: 'Weewire' }` and its status to `'confirmed'`.
3. Regenerate the share image with the real logo (`scripts/generate-og.mjs`).

Until then the header and footer use a plain typeset name as a temporary treatment.

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

## Deployment (Vercel preview)

`vercel.json` configures the Astro framework preset, `npm run build`, the `dist` output, clean URLs without trailing slashes, and security/caching headers. Connect this repository to a Vercel project to get a preview URL per branch push. No production domain should be attached until launch is approved.
