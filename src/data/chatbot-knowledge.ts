// Static knowledge base for the site chatbot (src/components/ui/ChatWidget.astro).
// Deliberately NOT LLM-backed — this is a plain keyword-scored matcher over
// real content already in src/data, so it works with no API key, no
// backend, and never fabricates an answer the way a generative model could.
// Every answer here is built directly from the same source-of-truth data
// files used elsewhere on the site (business.ts, services.ts, locations.ts,
// faqs.ts) — nothing is invented for the chatbot specifically.

import { business } from './business';
import { services, serviceCategories } from './services';
import { serviceAreas, regions } from './locations';
import { generalFaqs } from './faqs';

export interface KBEntry {
  id: string;
  keywords: string[];
  answer: string;
  link?: { label: string; href: string };
}

// Real, already-published claims (see GuaranteeStrip.astro) — repeated
// here verbatim, not reworded into a new promise.
const GUARANTEE_ANSWER =
  'Beacon Plumbing backs every job with a 90-minute response window, upfront pricing before any work starts, no trip charges, and a 1-year guarantee.';

const coreEntries: KBEntry[] = [
  {
    id: 'phone',
    keywords: ['phone number', 'phone', 'call you', 'telephone', 'reach you'],
    answer: `You can call Beacon Plumbing directly at ${business.phone.display}, available for 24/7 emergency service.`,
    link: { label: `Call ${business.phone.display}`, href: business.phone.href },
  },
  {
    id: 'emergency',
    keywords: ['emergency', '24/7', '247', 'urgent', 'after hours', 'middle of the night', 'weekend service'],
    answer: `Yes — Beacon Plumbing offers ${business.hours.emergency}. Call ${business.phone.display} any time, day or night.`,
    link: { label: 'Emergency Plumbing', href: '/emergency-plumbing' },
  },
  {
    id: 'service-areas',
    keywords: ['service area', 'areas do you serve', 'which cities', 'what cities', 'do you serve', 'located near'],
    answer: `Beacon Plumbing serves the greater Puget Sound region — ${regions.join(', ')} — covering ${serviceAreas.length}+ cities in total.`,
    link: { label: 'View all service areas', href: '/service-areas' },
  },
  {
    id: 'licensed',
    keywords: ['licensed', 'insured', 'bonded', 'license number'],
    answer: `Yes. Beacon Plumbing is licensed, bonded, and insured — Washington Contractors License #${business.license.number}.`,
  },
  {
    id: 'financing',
    keywords: ['financing', 'finance', 'payment plan', 'loan', 'afford', 'monthly payments'],
    answer: `Beacon Plumbing offers financing through ${business.financing.partner} for larger jobs.`,
    link: { label: 'Learn about financing', href: '/financing' },
  },
  {
    id: 'address',
    keywords: ['address', 'located', 'headquarters', 'office location', 'where are you'],
    answer: `Beacon Plumbing is headquartered at ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}.`,
    link: { label: 'Get directions', href: business.address.directionsUrl },
  },
  {
    id: 'military-discount',
    keywords: ['military discount', 'veteran discount', 'military', 'veteran'],
    answer: 'Yes, Beacon Plumbing offers a military discount.',
  },
  {
    id: 'payment-methods',
    keywords: ['payment methods', 'credit card', 'how can i pay', 'accept cards'],
    answer: `Beacon Plumbing accepts ${business.paymentMethods.join(', ')}.`,
  },
  {
    id: 'careers',
    keywords: ['careers', 'job openings', 'jobs', 'hiring', 'work for beacon', 'employment'],
    answer: 'Beacon Plumbing is always interested in hearing from skilled tradespeople.',
    link: { label: 'View careers', href: '/careers' },
  },
  {
    id: 'reviews',
    keywords: ['reviews', 'ratings', 'testimonials', 'is beacon good'],
    answer: 'You can read real customer reviews from across the Puget Sound area, plus our BBB profile.',
    link: { label: 'Read reviews', href: '/reviews' },
  },
  {
    id: 'booking',
    keywords: ['book service', 'schedule', 'appointment', 'get a quote', 'estimate', 'request service'],
    answer: 'You can request service online with a quick form and our team will follow up to schedule.',
    link: { label: 'Request Service', href: '/contact' },
  },
  {
    id: 'services-overview',
    keywords: ['what services', 'what do you offer', 'what do you do', 'services list'],
    answer: `Beacon Plumbing offers ${serviceCategories.map((c) => c.name).join(', ')}.`,
    link: { label: 'Browse all services', href: '/services' },
  },
  {
    id: 'offers',
    keywords: ['offers', 'deals', 'coupon', 'discount code', 'specials'],
    answer: 'Check the Offers page for current promotions.',
    link: { label: 'View current offers', href: '/offers' },
  },
  {
    id: 'guarantee',
    keywords: ['guarantee', 'warranty', 'response time', 'trip charge', 'upfront pricing'],
    answer: GUARANTEE_ANSWER,
  },
];

const faqEntries: KBEntry[] = generalFaqs.map((f, i) => ({
  id: `faq-${i}`,
  keywords: [f.question.toLowerCase().replace(/[?.,]/g, '')],
  answer: f.answer,
}));

// One entry per real service category, generated from services.ts so it
// stays in sync automatically rather than being hand-duplicated.
const categoryEntries: KBEntry[] = serviceCategories.map((c) => ({
  id: `category-${c.slug}`,
  keywords: [c.name.toLowerCase()],
  answer: c.description,
  link: { label: `${c.name} services`, href: `/services/${c.slug}` },
}));

// One entry per individual service (34 total) — covers specific questions
// like "do you fix water heaters" without hand-writing each answer.
const serviceEntries: KBEntry[] = services.map((s) => ({
  id: `service-${s.slug}`,
  keywords: [s.name.toLowerCase()],
  answer: s.shortDescription,
  link: { label: s.name, href: `/services/${s.category}/${s.slug}` },
}));

export const knowledgeBase: KBEntry[] = [
  ...coreEntries,
  ...faqEntries,
  ...categoryEntries,
  ...serviceEntries,
];

// Common shorthand/synonyms expanded before matching, so real phrasing like
// "do you fix ACs" or "toilet is clogged" still reaches the right existing
// entry above rather than falling through to the fallback. This only maps
// TOWARD real content already in the knowledge base — it never introduces
// a new claim.
const SYNONYMS: Record<string, string> = {
  ac: 'air conditioning',
  'a/c': 'air conditioning',
  hvac: 'heating',
  heater: 'water heaters heating',
  toilet: 'plumbing',
  clogged: 'drain cleaning',
  clog: 'drain cleaning',
  leak: 'leak detection',
  leaking: 'leak detection',
  sewage: 'sewer',
  ev: 'ev charger',
  cost: 'pricing estimate',
  price: 'pricing estimate',
  pricing: 'estimate',
  open: 'hours emergency',
  hours: 'emergency 24/7',
};

function expandQuery(query: string): string {
  let expanded = query;
  for (const [shorthand, expansion] of Object.entries(SYNONYMS)) {
    if (new RegExp(`\\b${shorthand.replace('/', '\\/')}\\b`).test(query)) {
      expanded += ' ' + expansion;
    }
  }
  return expanded;
}

const GREETINGS = ['hi', 'hello', 'hey', 'yo', "what's up", 'good morning', 'good afternoon', 'good evening'];

export interface MatchResult {
  answer: string;
  link?: { label: string; href: string };
}

const FALLBACK: MatchResult = {
  answer: `I'm not sure about that one. For anything I can't answer, call Beacon Plumbing directly at ${business.phone.display} or send a request and our team will help.`,
  link: { label: 'Contact us', href: '/contact' },
};

export function findAnswer(rawQuery: string): MatchResult {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return FALLBACK;

  if (GREETINGS.some((g) => query === g || query.startsWith(g + ' ') || query.startsWith(g + '!'))) {
    return {
      answer: `Hi! I'm the Beacon Plumbing assistant. Ask me about our services, service areas, financing, or how to reach us — or use the menu buttons below.`,
    };
  }

  const searchText = expandQuery(query);
  let best: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (searchText.includes(keyword)) {
        // Longer, more specific phrase matches outrank single generic words.
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  // Require a minimum score so a single short, coincidental word match
  // (e.g. "do") doesn't produce a confident-looking wrong answer.
  if (best && bestScore >= 4) {
    return { answer: best.answer, link: best.link };
  }

  return FALLBACK;
}

// --- MCQ menu tree, browsable by tapping instead of typing -----------------
// Built from the exact same source data as the free-text matcher above, so
// the two paths (chat vs. menu) never disagree with each other.

export interface MenuLeaf {
  label: string;
  answer: string;
  link?: { label: string; href: string };
}

export interface MenuBranch {
  label: string;
  options: MenuOption[];
}

export type MenuOption = MenuLeaf | MenuBranch;

export function isMenuBranch(option: MenuOption): option is MenuBranch {
  return 'options' in option;
}

export const chatMenu: MenuBranch = {
  label: 'Main Menu',
  options: [
    {
      label: 'Our Services',
      options: serviceCategories.map((c) => ({
        label: c.name,
        answer: c.description,
        link: { label: `${c.name} services`, href: `/services/${c.slug}` },
      })),
    },
    {
      label: 'Service Areas',
      answer: `Beacon Plumbing serves ${regions.join(', ')} — ${serviceAreas.length}+ cities across the Puget Sound region.`,
      link: { label: 'View all service areas', href: '/service-areas' },
    },
    {
      label: 'Emergency Service',
      answer: `Yes — ${business.hours.emergency}. Call ${business.phone.display} any time.`,
      link: { label: 'Emergency Plumbing', href: '/emergency-plumbing' },
    },
    {
      label: 'Financing',
      answer: `Financing is available through ${business.financing.partner} for larger jobs.`,
      link: { label: 'Learn about financing', href: '/financing' },
    },
    {
      label: 'Our Guarantee',
      answer: GUARANTEE_ANSWER,
    },
    {
      label: 'Common Questions',
      options: generalFaqs.map((f) => ({ label: f.question, answer: f.answer })),
    },
    {
      label: 'Book a Service',
      answer: 'Request service online with a quick form and our team will follow up to schedule.',
      link: { label: 'Request Service', href: '/contact' },
    },
    {
      label: 'Contact Info',
      answer: `Call ${business.phone.display}, or visit us at ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}.`,
      link: { label: 'Get directions', href: business.address.directionsUrl },
    },
  ],
};
