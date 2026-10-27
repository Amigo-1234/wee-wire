/**
 * Single source of truth for business facts shown anywhere on the site.
 *
 * Every fact records how far it can be trusted:
 *   - 'confirmed'  — confirmed by the owner. Shown as-is.
 *   - 'unverified' — taken from the current weewire.com site (via search-engine
 *                    index) or a public record, but not yet confirmed by the
 *                    owner. Shown with a "pending confirmation" marker while
 *                    review markers are enabled.
 *   - 'missing'    — not known. Never invented; rendered as a visible
 *                    placeholder in the prototype and omitted otherwise.
 *
 * To update a detail once the owner supplies it: set `value`, change `status`
 * to 'confirmed', and update `source`.
 */

export type VerificationStatus = 'confirmed' | 'unverified' | 'missing';

export interface Fact<T> {
  value: T | null;
  status: VerificationStatus;
  /** Where the value came from. */
  source: string;
  /** Anything a reviewer should know (conflicts, caveats). */
  note?: string;
}

export interface License {
  authority: string;
  number: string;
  classification: string;
  /** Short form for compact display, e.g. "AZ ROC #342833". */
  label: string;
}

export interface Address {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface BusinessInfo {
  displayName: Fact<string>;
  legalName: Fact<string>;
  email: Fact<string>;
  phone: Fact<string>;
  address: Fact<Address>;
  serviceArea: Fact<string>;
  hours: Fact<string>;
  onCallSupport: Fact<string>;
  licenses: Fact<License>[];
  socialProfiles: { label: string; url: string }[];
  logo: Fact<{ src: string; width: number; height: number; alt: string }>;
}

const CURRENT_SITE = 'Indexed text of the current weewire.com homepage (search-engine index)';

export const business: BusinessInfo = {
  /** Brand name as it appears in the current site's page title. */
  displayName: {
    value: 'Weewire',
    status: 'unverified',
    source: 'Current weewire.com page title',
  },

  legalName: {
    value: 'Weewire LLC',
    status: 'unverified',
    source:
      'Arizona Registrar of Contractors dual-license posting list (seen via search index) and current site footer',
  },

  email: {
    value: 'dispatch@weewire.com',
    status: 'unverified',
    source: CURRENT_SITE,
  },

  phone: {
    value: null,
    status: 'missing',
    source: 'Conflicting sources',
    note:
      'Four different numbers appear across the current homepage, the current pricing page, ZoomInfo and Yellow Pages. Not shown until the owner confirms one.',
  },

  address: {
    value: null,
    status: 'missing',
    source: 'Owner',
    note: 'The owner has a new business address that has not been supplied yet. Directory listings conflict (Maricopa AZ, Tempe AZ, Albuquerque NM).',
  },

  serviceArea: {
    value: null,
    status: 'missing',
    source: 'Owner',
    note: 'The current pricing page refers to a "Metro area" for trip charges but does not define it.',
  },

  hours: {
    value: null,
    status: 'missing',
    source: 'Owner',
  },

  onCallSupport: {
    value: 'On-call support, 24/7',
    status: 'unverified',
    source: CURRENT_SITE,
  },

  licenses: [
    {
      value: {
        authority: 'Arizona Registrar of Contractors',
        number: '342833',
        classification: 'CR-67 Low Voltage Communication Systems',
        label: 'AZ ROC #342833',
      },
      status: 'unverified',
      source: `${CURRENT_SITE}; classification from the AZ ROC posting list (seen via search index)`,
    },
  ],

  socialProfiles: [],

  /**
   * Official logo. While null, a plain typeset wordmark is used as a temporary
   * treatment. When supplied, place the file in /public/brand/ and set the path.
   */
  logo: {
    value: null,
    status: 'missing',
    source: 'Owner (logo files in owner email, not yet supplied)',
  },
};
