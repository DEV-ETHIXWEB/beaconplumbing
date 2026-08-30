// Centralized legacy → new URL redirect map.
//
// Source of truth: the Phase-0/URL-classification audit of the legacy
// HTTrack mirror (A:\beaconplumbing\beaconplumbing_OLD\www.beaconplumbing.net).
// That audit classified the legacy site's ~8,700 URLs into KEEP / MERGE /
// REDIRECT / NOINDEX-REMOVE / NEW (see project memory: beacon-seo-migration-map).
//
// Strategy, per that classification:
// - KEEP: legacy hub/nav pages that map 1:1 to an equivalent new page.
// - MERGE: the dominant pattern — legacy "[service]-[city]-wa.html" /
//   "[city]-[service].html" combo pages (city x service, x60-100 cities x
//   ~30 service variants) collapse into ONE authoritative new service page.
//   We do NOT generate a redirect entry per old file (thousands); instead we
//   redirect the STABLE legacy slug patterns actually used in internal nav
//   / likely to hold external backlinks (city + core-service, e.g.
//   "seattle-water-heaters", "everett-drain-cleaning") to their merged
//   target. The long tail of ultra-specific legacy combo slugs
//   (e.g. "auburn-community-nest-thermostat") is deliberately NOT
//   individually redirected — those pages held negligible search equity
//   (confirmed thin/templated in the audit) and 404s are acceptable; the
//   sitewide 404 page still gets users back into the new IA.
// - REDIRECT: niche legacy intents that fold into a stronger existing page.
// - NOINDEX/REMOVE: WordPress/HTTrack junk — never given a redirect entry.
//
// Format matches Astro's `redirects` config: { [fromPath]: toPath }.
// All entries are checked at build time (see scripts/validate-redirects.mjs)
// for chains, loops, and dead targets before the site can be considered QA-clean.

import { services } from './services';
import { serviceAreas } from './locations';

function serviceUrl(categorySlug: string, serviceSlug: string): string {
  return `/services/${categorySlug}/${serviceSlug}`;
}

function findService(slug: string) {
  const svc = services.find((s) => s.slug === slug);
  if (!svc) throw new Error(`redirects.ts: unknown service slug "${slug}"`);
  return serviceUrl(svc.category, svc.slug);
}

// KEEP — legacy hub/nav pages with a direct new-site equivalent.
const keepRedirects: Record<string, string> = {
  '/seattle-water-heaters': findService('water-heaters'),
  '/seattle-water-heaters.html': findService('water-heaters'),
  '/tankless-water-heater-seattle-wa': findService('water-heaters'),
  '/tankless-water-heater-seattle-wa.html': findService('water-heaters'),
  '/water-heaters-kent-wa': findService('water-heaters'),
  '/water-heaters-kent-wa.html': findService('water-heaters'),

  '/seattle-sewer-repair': findService('sewer-repair'),
  '/seattle-sewer-repair.html': findService('sewer-repair'),
  '/seattle-emergency-sewer-drain-repair-cleaning': findService('sewer-repair'),

  '/drain-cleaning-seattle-wa': findService('drain-cleaning'),
  '/drain-cleaning-seattle-wa.html': findService('drain-cleaning'),
  '/seattle-drain-cleaning': findService('drain-cleaning'),

  '/hydro-jetting-seattle-wa': findService('hydro-jetting'),
  '/hydro-jetting-seattle-wa.html': findService('hydro-jetting'),

  '/hydronic-heating-seattle-wa': findService('hydronic-radiant-heating'),
  '/hydronic-heating-seattle-wa.html': findService('hydronic-radiant-heating'),

  '/sump-pump-seattle-wa': findService('sump-pumps'),
  '/sump-pump-seattle-wa.html': findService('sump-pumps'),

  '/sewer-line-video': findService('sewer-video-inspection'),
  '/sewer-line-video.html': findService('sewer-video-inspection'),

  '/sewer-liners-perma-liner': findService('trenchless-sewer-repair'),
  '/sewer-liners-perma-liner.html': findService('trenchless-sewer-repair'),
  '/trenchless-technology-seattle-wa': findService('trenchless-sewer-repair'),
  '/trenchless-technology-seattle-wa.html': findService('trenchless-sewer-repair'),

  '/commercial-plumbing-seattle-wa': findService('commercial-plumbing'),
  '/commercial-plumbing-seattle-wa.html': findService('commercial-plumbing'),
  '/seattle-commercial-plumbing': findService('commercial-plumbing'),

  '/residential-plumber-seattle-wa': findService('residential-plumbing'),
  '/residential-plumber-seattle-wa.html': findService('residential-plumbing'),

  '/emergency-plumbing-service-seattle-wa': findService('emergency-plumbing'),
  '/emergency-plumbing-service-seattle-wa.html': findService('emergency-plumbing'),
  '/seattle-emergency-plumber': findService('emergency-plumbing'),
  '/seattle-emergency-plumber.html': findService('emergency-plumbing'),
  '/emergency-plumbing-dispatch-locations': '/emergency-plumbing',

  '/boiler-repair-seattle-wa': findService('boiler-repair'),
  '/boiler-repair-seattle-wa.html': findService('boiler-repair'),

  '/new-water-line-repair-seattle-wa': findService('water-line-repair'),
  '/new-water-line-repair-seattle-wa.html': findService('water-line-repair'),
  '/seattle-water-line-repair': findService('water-line-repair'),

  '/new-gas-electric-furnace-seattle-wa': findService('furnace-repair'),
  '/new-gas-electric-furnace-seattle-wa.html': findService('furnace-repair'),

  '/seattle-hvac': '/services/heating-hvac',
  '/seattle-hvac.html': '/services/heating-hvac',
  '/heating-seattle-wa': '/services/heating-hvac',
  '/heating-repair-seattle-wa': findService('furnace-repair'),

  '/seattle-electrician': '/services/electrical',
  '/seattle-electrician.html': '/services/electrical',

  '/seattle-air-conditioning': findService('ac-installation-repair'),
  '/air-conditioning-seattle-wa': findService('ac-installation-repair'),
  '/seattle-heat-pump': findService('heat-pumps'),

  '/seattle-septic-tank-pumping': findService('septic-tank-pumping'),
  '/seattle-septic-pump-repair': findService('septic-tank-pumping'),
  '/grease-trap': findService('grease-trap-cleaning'),
  '/grease-trap.html': findService('grease-trap-cleaning'),
  '/grease-trap-interceptor-cleaning-seattle-wa': findService('grease-trap-cleaning'),

  '/find-plumber-seattle-wa': '/contact',
  '/find-plumber-seattle-wa.html': '/contact',

  '/internet-plumbing-promotions-seattle-wa': '/offers',
  '/internet-plumbing-promotions-seattle-wa.html': '/offers',

  '/privacy-policy.html': '/privacy-policy',

  '/areas': '/service-areas',
  '/areas.html': '/service-areas',
};

// REDIRECT — niche legacy intents folded into the nearest strong page.
const nicheRedirects: Record<string, string> = {
  '/urinal-repair-seattle-wa': findService('commercial-plumbing'),
  '/seattle-water-filtration': findService('water-filtration'),
  '/garbage-disposal-repair-seattle-wa': findService('garbage-disposal-repair'),
};

// City-level service redirects: for each curated city + a set of
// consistently-used legacy slug patterns, point at the merged service page.
// Only cities confirmed by the audit to exist on the legacy site are
// included (all 48 curated cities had legacy inventory — see migration map).
const cityServiceSlugMerges: Array<{ legacySuffix: string; service: string }> = [
  { legacySuffix: 'plumber', service: 'residential-plumbing' },
  { legacySuffix: 'emergency-plumber', service: 'emergency-plumbing' },
  { legacySuffix: 'drain-cleaning', service: 'drain-cleaning' },
  { legacySuffix: 'electrician', service: 'electrical-repair' },
];

const cityRedirects: Record<string, string> = {};
for (const area of serviceAreas) {
  for (const { legacySuffix, service } of cityServiceSlugMerges) {
    const target = findService(service);
    cityRedirects[`/${area.slug}-${legacySuffix}`] = target;
    cityRedirects[`/${area.slug}-${legacySuffix}.html`] = target;
  }
  // Legacy "find a plumber in [city]" style hub pages -> new location page.
  cityRedirects[`/${area.slug}`] = `/service-areas/${area.slug}`;
}

export const redirects: Record<string, string> = {
  ...keepRedirects,
  ...nicheRedirects,
  ...cityRedirects,
};
