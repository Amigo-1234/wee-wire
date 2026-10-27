import type { Address, Fact } from '@/config/business';
import { site } from '@/config/site';

/** True when a fact has a value that may be displayed. */
export function hasValue<T>(fact: Fact<T>): fact is Fact<T> & { value: T } {
  return fact.value !== null && fact.status !== 'missing';
}

/** True when a pending-confirmation marker should accompany the value. */
export function needsMarker<T>(fact: Fact<T>): boolean {
  return site.showReviewMarkers && fact.status === 'unverified';
}

/** Converts a display phone number to a tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Formats an address fact as a single-line string fact for display. */
export function addressAsText(fact: Fact<Address>): Fact<string> {
  const { candidates: _candidates, value: a, ...rest } = fact;
  return { ...rest, value: a ? [a.street, a.locality, `${a.region} ${a.postalCode}`.trim()].filter(Boolean).join(', ') : null };
}
