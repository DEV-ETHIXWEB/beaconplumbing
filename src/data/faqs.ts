// General/homepage FAQs.
//
// TODO: VERIFY — the legacy site had FAQ accordion CSS/JS scaffolding on many
// pages, but the Phase 0 audit found no populated, confirmed FAQ question/answer
// content anywhere in the sampled pages. Rather than fabricate FAQ content
// (explicitly disallowed), the entries below are limited to answers directly
// supported by verified facts elsewhere in src/data (business.ts, financing,
// service areas). Do not add speculative Q&A. Expand this list once real FAQ
// copy is supplied or found in a source page not yet sampled.

import { business } from './business';

export interface FAQItem {
  question: string;
  answer: string;
}

export const generalFaqs: FAQItem[] = [
  {
    question: 'What areas does Beacon Plumbing serve?',
    answer:
      'Beacon Plumbing serves Seattle and the greater Puget Sound region, including the Eastside, South King & Pierce County, Snohomish County, and the Kitsap Peninsula. Visit our Service Areas page for the full list of cities we serve.',
  },
  {
    question: 'Is Beacon Plumbing available for emergencies?',
    answer:
      'Yes. Beacon Plumbing offers 24/7 emergency response for urgent plumbing, heating, and electrical issues.',
  },
  {
    question: 'Is Beacon Plumbing licensed and insured?',
    answer: `Yes. Beacon Plumbing is licensed, bonded, and insured, holding Washington Contractors License #${business.license.number}.`,
  },
  {
    question: 'Does Beacon Plumbing offer financing?',
    answer:
      'Yes, financing is available through Synchrony. Visit our Financing page for details.',
  },
];
