import type { VerificationStatus } from '@/config/business';

/**
 * Pricing as it appears in the indexed text of the current weewire.com/pricing
 * page. None of it has been confirmed by the owner yet, and the figures reached
 * us through a search-engine summary, so each entry stays 'unverified' until
 * the owner signs off. Do not change figures here without owner confirmation.
 */

export const pricingSource = 'Indexed text of the current weewire.com/pricing page (search-engine index)';

export interface Rate {
  label: string;
  price: string;
  unit: string;
  detail: string;
  status: VerificationStatus;
}

export interface CablePull {
  cable: string;
  maxLength: string;
  maxHeight: string;
  price: string;
  status: VerificationStatus;
}

export interface Term {
  term: string;
  detail: string;
  status: VerificationStatus;
}

export const serviceCallRate: Rate = {
  label: 'Service calls',
  price: '$85',
  unit: 'per hour',
  detail: 'Troubleshooting, maintenance and smart-hands requests.',
  status: 'unverified',
};

export const cablePulls: CablePull[] = [
  { cable: 'CAT6', maxLength: 'Up to 300 ft', maxHeight: 'Up to 14 ft', price: '$165', status: 'unverified' },
  { cable: 'CAT5e', maxLength: 'Up to 300 ft', maxHeight: 'Up to 14 ft', price: '$145', status: 'unverified' },
];

export const cablePullNote = 'Priced per pull. Work above 14 ft may require a custom quote.';

export const terms: Term[] = [
  { term: 'Minimum', detail: 'All work includes a 2-hour minimum.', status: 'unverified' },
  { term: 'Site surveys', detail: 'Free site survey for new installations, with a same-day quote.', status: 'unverified' },
  { term: 'Deposit', detail: 'A 20% upfront payment may be required to schedule work.', status: 'unverified' },
  { term: 'Cancellation', detail: 'No charge for cancellations made at least 48 hours in advance.', status: 'unverified' },
  { term: 'Travel', detail: 'A trip charge applies to work outside the Metro area.', status: 'unverified' },
  {
    term: 'Cabling warranty',
    detail: '10-year warranty on cabling services, covering defects in materials or workmanship.',
    status: 'unverified',
  },
];
