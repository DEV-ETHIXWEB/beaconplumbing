// Coupon/offer categories confirmed on the legacy site's promotions page
// (internet-plumbing-promotions-seattle-wa.html) — 33 categories, each a
// printable PDF coupon. Discount amounts were baked into the PDF/image
// assets themselves and were not extracted as text during the audit, so
// specific dollar amounts are TODO: VERIFY except water heaters ($50 off,
// independently confirmed from a legacy meta description).
//
// TODO: ASSET REQUIRED — the actual coupon PDF/image assets should be
// re-sourced or redesigned for the new site rather than reusing the legacy
// PDFs as-is.
//
// `detail` is genuinely user-facing copy (rendered on /offers) — it must
// never assert a specific discount amount we haven't verified. Where the
// legacy site had a confirmed amount, use it. Otherwise describe the
// category only and let the on-page banner's "call to confirm terms"
// messaging cover the verification gap, rather than printing "TODO" to users.

export interface Offer {
  slug: string;
  title: string;
  detail: string;
}

export const offers: Offer[] = [
  { slug: 'water-heaters', title: 'Water Heaters', detail: '$50 off gas or electric water heater repair.' },
  { slug: 'drain-cleaning', title: 'Drain Cleaning', detail: 'Ask about current drain cleaning specials.' },
  { slug: 'sewers', title: 'Sewers', detail: 'Ask about current sewer service specials.' },
  { slug: 'leak-detection', title: 'Leak Detection', detail: 'Ask about current leak detection specials.' },
  { slug: 'pipe-repair', title: 'Pipe Repair', detail: 'Ask about current pipe repair specials.' },
  { slug: 'repiping', title: 'Repiping', detail: 'Ask about current repiping specials.' },
  { slug: 'water-lines', title: 'Water Lines', detail: 'Ask about current water line specials.' },
  { slug: 'water-filtration', title: 'Water Filtration Systems', detail: 'Ask about current water filtration specials.' },
  { slug: 'burst-pipes', title: 'Burst Pipes', detail: 'Ask about current burst pipe repair specials.' },
  { slug: 'frozen-pipes', title: 'Frozen Pipes', detail: 'Ask about current frozen pipe repair specials.' },
  { slug: 'trenchless-technology', title: 'Trenchless Technology', detail: 'Ask about current trenchless sewer specials.' },
  { slug: 'rooter', title: 'Rooter Service', detail: 'Ask about current rooter service specials.' },
  { slug: 'commercial-plumbing', title: 'Commercial Plumbing', detail: 'Ask about current commercial plumbing specials.' },
  { slug: 'bathroom-remodeling', title: 'Bathroom Remodeling', detail: 'Ask about current bathroom remodeling specials.' },
  { slug: 'kitchen-remodeling', title: 'Kitchen Remodeling', detail: 'Ask about current kitchen remodeling specials.' },
  { slug: 'septic-pumps', title: 'Septic Pumps & Alarms', detail: 'Ask about current septic pump and alarm specials.' },
  { slug: 'gas-piping', title: 'Gas Piping', detail: 'Ask about current gas piping specials.' },
  { slug: 'hvac', title: 'HVAC', detail: 'Ask about current HVAC service specials.' },
  { slug: 'heating', title: 'Heating', detail: 'Ask about current heating service specials.' },
  { slug: 'furnace-repair', title: 'Furnace Repair', detail: 'Ask about current furnace repair specials.' },
  { slug: 'boilers', title: 'Boilers', detail: 'Ask about current boiler service specials.' },
  { slug: 'heat-pumps', title: 'Heat Pumps', detail: 'Ask about current heat pump specials.' },
  { slug: 'hydronic-radiant-heating', title: 'Hydronic or Radiant Heating', detail: 'Ask about current hydronic/radiant heating specials.' },
  { slug: 'air-conditioning', title: 'Air Conditioning', detail: 'Ask about current air conditioning specials.' },
  { slug: 'electrician', title: 'Electrician', detail: 'Ask about current electrical service specials.' },
  { slug: 'residential-electrician', title: 'Residential Electrician', detail: 'Ask about current residential electrical specials.' },
  { slug: 'emergency-electrician', title: 'Emergency Electrician', detail: 'Ask about current emergency electrical specials.' },
  { slug: 'electrical-troubleshooting', title: 'Electrical Troubleshooting', detail: 'Ask about current electrical troubleshooting specials.' },
  { slug: 'low-voltage-electrician', title: 'Low Voltage Electrician', detail: 'Ask about current low voltage electrical specials.' },
  { slug: 'panel-upgrades', title: 'Panel Upgrades', detail: 'Ask about current panel upgrade specials.' },
  { slug: 'home-rewire', title: 'Home Rewire', detail: 'Ask about current home rewiring specials.' },
  { slug: 'generators', title: 'Kohler & Generac Generators', detail: 'Ask about current generator installation specials.' },
];
