// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin for the site. Defaults to the apex domain used by the
// current production site; override with SITE_URL if the owner prefers www.
const SITE_URL = process.env.SITE_URL ?? 'https://weewire.com';

export default defineConfig({
  site: SITE_URL,
  // Matches the existing production URL style (e.g. /pricing, no trailing slash).
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
