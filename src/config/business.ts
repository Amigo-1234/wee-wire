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
  /** Possible values awaiting a decision. Never rendered. */
  candidates?: T[];
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
  /** City and state the business operates from. */
  locality: Fact<string>;
  socialProfiles: { label: string; url: string }[];
}

/*
 * Not stored here on purpose: email credentials, tax ID, staff personal
 * phone numbers, and the full street address (withheld until the owner
 * approves publishing it; this repository is public).
 */

const OWNER_EMAIL = 'Owner email, Oct 2026';
const CURRENT_SITE = 'Indexed text of the current weewire.com homepage (search-engine index)';

export const business: BusinessInfo = {
  /** Brand name as it appears in the current site's page title. */
  displayName: {
    value: 'Weewire',
    status: 'confirmed',
    source: 'Owner-supplied logo and company email signature',
  },

  legalName: {
    value: 'Weewire LLC',
    status: 'confirmed',
    source: 'Owner-supplied logo and company email signature; matches the AZ ROC posting list',
  },

  email: {
    value: 'dispatch@weewire.com',
    status: 'unverified',
    source: CURRENT_SITE,
  },

  phone: {
    value: null,
    status: 'missing',
    source: OWNER_EMAIL,
    note:
      'The owner supplied two company numbers but has not yet said which is the public contact number. A staff email signature lists 480-702-1168 as "Main, option 1". Not shown until the owner confirms which number to publish.',
    candidates: ['480-702-1168', '480-702-1161'],
  },

  address: {
    value: null,
    status: 'missing',
    source: OWNER_EMAIL,
    note: 'The owner supplied a street address in Maricopa, AZ. It is withheld from the site and this public repository until the owner confirms it should be published (it may not be a public business location).',
  },

  locality: {
    value: 'Maricopa, Arizona',
    status: 'confirmed',
    source: `${OWNER_EMAIL} (business address)`,
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

};
