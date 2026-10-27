import type { APIRoute } from 'astro';
import { site } from '@/config/site';

/**
 * robots.txt. Disallows all crawling unless PUBLIC_SITE_INDEXING=true is set
 * for an approved production launch.
 */
export const GET: APIRoute = ({ site: siteUrl }) => {
  const sitemap = siteUrl ? new URL('sitemap-index.xml', siteUrl).href : '/sitemap-index.xml';
  const body = site.allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Prototype build: not for indexing.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
