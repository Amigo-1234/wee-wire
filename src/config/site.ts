/**
 * Site-wide settings. Environment flags are documented in .env.example.
 */

const env = import.meta.env;

export const site = {
  /** Search indexing is off unless explicitly enabled for an approved launch. */
  allowIndexing: env.PUBLIC_SITE_INDEXING === 'true',
  /** Prototype review markers and owner-content placeholders. On by default. */
  showReviewMarkers: env.PUBLIC_SHOW_REVIEW_MARKERS !== 'false',
  /** Request-service form endpoint. When null the form never sends data. */
  formEndpoint: env.PUBLIC_FORM_ENDPOINT?.trim() || null,
  /** Default social share image (relative to /public). */
  defaultOgImage: '/og-default.png',
  locale: 'en_US',
};

export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  ...primaryNav,
  { label: 'Privacy policy', href: '/privacy' },
];

export const requestServiceHref = '/contact#request';
