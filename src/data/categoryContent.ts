// Extra editorial content for the six service-category landing pages
// (/services/[category]). Kept separate from services.ts since it's
// page-copy, not service taxonomy.
//
// Stats are grounded in well-established public figures (EPA, U.S. DOE,
// NFPA) or general, widely-known trade knowledge, deliberately worded with
// hedges ("about", "one of the leading causes") rather than precise numbers
// this file can't verify. None are Beacon-specific claims.

import { business } from './business';
import type { ServiceCategory } from './services';

export interface CategoryStat {
  value: string;
  label: string;
  source?: string;
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryContent {
  paragraphs: string[];
  stats: CategoryStat[];
  faqs: CategoryFAQ[];
}

export const categoryContent: Record<ServiceCategory['slug'], CategoryContent> = {
  plumbing: {
    paragraphs: [
      'Plumbing problems rarely happen at a convenient time, and a lot of the water damage that ends up costing thousands starts as something small, a slow drip, a running toilet, a fixture that’s just a little louder than it used to be. Beacon’s licensed plumbers handle everything from routine repairs and fixture installs to full home repiping, for both houses and commercial properties across the greater Seattle area.',
      'Many homes in King, Pierce, and Snohomish counties were built decades ago, and older plumbing, galvanized supply lines, aging water heaters, outdated fixtures, tends to fail in predictable ways as it reaches the end of its service life. Whether you’re dealing with an emergency or just want a system checked before it becomes one, our technicians diagnose the actual cause of the problem, not just the symptom, and quote a flat price before any work begins.',
    ],
    stats: [
      { value: '10,000 gal', label: 'Wasted per year by the average home’s hidden leaks', source: 'U.S. EPA WaterSense' },
      { value: '10%', label: 'Of homes have a leak large enough to waste 90+ gallons a day', source: 'U.S. EPA WaterSense' },
      { value: '20–50 yrs', label: 'Typical supply pipe lifespan, galvanized steel on the low end, copper and PEX on the high end' },
    ],
    faqs: [
      { question: 'How quickly can Beacon respond to a plumbing emergency?', answer: 'Beacon Plumbing provides 24/7 emergency response across the greater Seattle area. Call us directly and a technician will be dispatched right away for active leaks, backups, or no-water situations.' },
      { question: 'Do you offer upfront pricing before starting plumbing work?', answer: 'Yes. You’ll receive a flat price quote after diagnosis and before any work begins, so there are no surprises on the invoice.' },
      { question: 'Can Beacon Plumbing handle both residential and commercial plumbing?', answer: 'Yes, our licensed technicians service homes, offices, restaurants, and other commercial properties throughout Puget Sound.' },
    ],
  },
  'sewer-drain': {
    paragraphs: [
      'A slow drain is usually a nuisance. A sewer line problem is a different scale of issue, and the two can look identical at first. Beacon diagnoses drain and sewer issues before recommending a fix, whether that means snaking a single clogged line or replacing a collapsed section of sewer pipe.',
      'Mature trees are common throughout Seattle-area neighborhoods, and their roots are drawn to the moisture inside sewer lines, working into tiny cracks and joints until they cause a blockage or full collapse. Older clay and cast-iron pipe adds to the risk. We use camera inspection to confirm exactly what’s happening underground before digging, and offer trenchless repair options where the situation allows it.',
    ],
    stats: [
      { value: 'Root intrusion', label: 'Is one of the most common causes of sewer line failure in older, tree-lined neighborhoods' },
      { value: '50+ yrs', label: 'Many Seattle-area homes still run on original clay or cast-iron sewer lines installed decades ago' },
      { value: 'Camera-first', label: 'A video inspection confirms the exact cause and location of a blockage before any digging starts' },
    ],
    faqs: [
      { question: 'How do I know if I have a sewer line problem instead of just a clogged drain?', answer: 'If multiple drains back up at the same time, or you notice sewage odor in the yard, that usually points to the main sewer line rather than an isolated clog. A camera inspection can confirm exactly where the problem is.' },
      { question: 'Do you offer trenchless sewer repair?', answer: 'Yes, we use trenchless pipe lining and pipe bursting where the site allows, which avoids digging up an entire yard or driveway to reach the damaged pipe.' },
      { question: 'How often should sewer lines be inspected?', answer: 'Homes with mature trees nearby or a history of backups benefit from a video inspection every couple of years, to catch root intrusion or pipe damage before it causes a backup.' },
    ],
  },
  'heating-hvac': {
    paragraphs: [
      'A heating system that’s losing efficiency doesn’t always announce itself with a full breakdown. It shows up gradually, as higher bills, rooms that never quite reach temperature, or a furnace that runs longer than it used to. Beacon services gas and electric furnaces, boilers, heat pumps, and hydronic radiant systems, for both routine tune-ups and no-heat emergencies.',
      'Puget Sound’s mild, wet winters put a different kind of strain on heating equipment than a harsher climate would, but the systems still age, and parts still wear out. We diagnose the actual failed component rather than defaulting to a full replacement, and when a system genuinely has reached the end of its service life, we’ll size a replacement to the home rather than the old unit.',
    ],
    stats: [
      { value: '~50%', label: 'Share of a typical home’s energy bill that goes toward heating and cooling', source: 'U.S. Department of Energy' },
      { value: '15–20 yrs', label: 'Typical service life of a well-maintained furnace or boiler before efficiency drops off' },
      { value: 'Annual', label: 'Recommended frequency for a professional heating system tune-up before the cold season hits' },
    ],
    faqs: [
      { question: 'How often should my furnace or boiler be serviced?', answer: 'We recommend an annual tune-up before the heating season starts, to catch worn components before they cause a mid-winter breakdown.' },
      { question: 'Do you repair both gas and electric heating systems?', answer: 'Yes, our technicians service gas furnaces, electric furnaces, boilers, and heat pumps.' },
      { question: 'What’s the difference between a furnace and a heat pump?', answer: 'A furnace generates heat by burning fuel or using electric resistance, while a heat pump moves existing heat from outside air into your home, and can run in reverse to cool it in summer.' },
    ],
  },
  'air-conditioning': {
    paragraphs: [
      'Air conditioning used to be optional in the Puget Sound area. Warmer summers have made it a lot less optional, and a lot of homes are still working with an older window unit, an underpowered system, or no cooling at all. Beacon installs and repairs central AC and ductless mini-split systems sized to the home, not a one-size-fits-all unit.',
      'Homes without existing ductwork, additions, and converted spaces like garages or ADUs are often poor candidates for central air but good candidates for a ductless mini-split, which mounts on the wall and runs on refrigerant lines instead of ducts. Whichever system you have or are considering, we’ll diagnose what’s actually wrong before recommending a repair or a replacement.',
    ],
    stats: [
      { value: '~6%', label: 'Of all electricity produced in the U.S. goes toward air conditioning', source: 'U.S. Department of Energy' },
      { value: '15 yrs', label: 'Typical lifespan of a central AC system with regular maintenance' },
      { value: 'Monthly', label: 'How often an AC filter should be checked during peak cooling season' },
    ],
    faqs: [
      { question: 'Do I need central air or would a mini-split work better for my home?', answer: 'If your home already has ductwork, central AC is usually the more efficient choice. Homes without ducts, additions, and converted spaces are often better served by a ductless mini-split.' },
      { question: 'How often should I service my AC system?', answer: 'An annual check before cooling season, plus regular filter changes, keeps most systems running efficiently and catches small issues before they become breakdowns.' },
      { question: 'Do you offer same-day AC repair?', answer: 'Yes, we prioritize same-day service for AC repairs whenever possible, especially during warm-weather demand.' },
    ],
  },
  electrical: {
    paragraphs: [
      'Electrical work isn’t an area to guess on. A flickering light or a breaker that trips once might be nothing, or it might be an early sign of a failing connection or an overloaded circuit. Beacon’s electricians troubleshoot the actual circuit to find the cause, from panel upgrades and full home rewiring to EV charger installs and everyday repairs.',
      'A lot of the electrical systems in older Seattle-area homes were designed for a much lighter load than today’s households actually draw, before central air, EV chargers, and a house full of electronics were part of the picture. We evaluate what a panel or circuit can actually support before adding to it, and bring outdated wiring up to current code where it’s fallen behind.',
    ],
    stats: [
      { value: 'Leading cause', label: 'Electrical failures and malfunctions are among the leading causes of home fires in the U.S.', source: 'National Fire Protection Association' },
      { value: '100A → 200A', label: 'Many older homes still run on panels sized for a different era of electrical demand' },
      { value: 'Every 10 yrs', label: 'General rule of thumb for having an electrical panel and wiring professionally inspected' },
    ],
    faqs: [
      { question: 'How do I know if my electrical panel needs an upgrade?', answer: 'Frequent breaker trips, a panel still using fuses, or a home under 100-amp service trying to run modern appliances, EV chargers, or heat pumps are all signs it’s time for an upgrade.' },
      { question: 'Is Beacon Plumbing licensed for electrical work?', answer: `Yes, our electricians are licensed under Washington Contractors License #${business.license.number}, and all work is performed to current code.` },
      { question: 'Do you offer emergency electrical service?', answer: 'Yes, we respond 24/7 for active electrical hazards like sparking outlets, burning smells, or a total loss of power.' },
    ],
  },
  septic: {
    paragraphs: [
      'A lot of Puget Sound properties, especially outside the denser parts of Seattle, run on a septic system rather than municipal sewer. Septic systems are mostly out of sight and out of mind, right up until they’re not, and by the time a problem is visible above ground, it’s often more expensive than routine maintenance would have been.',
      'Beacon provides septic tank pumping, inspection, and grease trap and interceptor cleaning for residential properties and commercial kitchens across King, Pierce, and Snohomish counties. Staying on a regular pumping schedule is the single biggest factor in whether a septic system lasts for decades or needs a costly drain field replacement.',
    ],
    stats: [
      { value: '1 in 5', label: 'U.S. households rely on an individual septic system rather than a municipal sewer', source: 'U.S. EPA' },
      { value: '3–5 yrs', label: 'Recommended pumping interval for most residential septic tanks' },
      { value: 'Drain field', label: 'Replacement is the most expensive septic repair, and the one regular pumping is meant to prevent' },
    ],
    faqs: [
      { question: 'How often does a septic tank need to be pumped?', answer: 'Most residential tanks need pumping every three to five years, depending on household size and tank capacity, though heavier usage can shorten that interval.' },
      { question: 'What are the warning signs a septic tank needs attention?', answer: 'Slow drains throughout the house, sewage odor near the tank or drain field, and standing water over the tank are the most common warning signs.' },
      { question: 'Do you service grease traps for commercial kitchens?', answer: 'Yes, we pump and clean grease traps and interceptors for restaurants and other food service properties, and can set up a recurring maintenance schedule.' },
    ],
  },
};
