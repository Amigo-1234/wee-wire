/**
 * Normalises a request path to its public URL form. Static builds use
 * build.format 'file', so Astro reports paths like /services.html or
 * /index.html; the site is served without extensions (/services, /).
 */
export function publicPath(pathname: string): string {
  return pathname.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';
}
