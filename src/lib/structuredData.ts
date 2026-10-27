import { business } from '@/config/business';

/**
 * LocalBusiness structured data. Returns null until the core business details
 * (name, phone and address) are all confirmed by the owner, so unverified
 * details are never published to search engines as structured facts.
 */
export function localBusinessSchema(siteUrl: URL): Record<string, unknown> | null {
  const { legalName, displayName, phone, address, email } = business;
  const confirmed = [legalName, displayName, phone, address].every((f) => f.status === 'confirmed' && f.value);
  if (!confirmed || !address.value) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: displayName.value,
    legalName: legalName.value,
    url: siteUrl.origin,
    telephone: phone.value,
    ...(email.status === 'confirmed' && email.value ? { email: email.value } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.value.street,
      addressLocality: address.value.locality,
      addressRegion: address.value.region,
      postalCode: address.value.postalCode,
      addressCountry: address.value.country,
    },
  };
}
