// Service-area/location data. City list is derived from the legacy site's
// verified page inventory (A:\beaconplumbing\beaconplumbing_OLD) — every city
// below had at least one real service+location combo page on the old site
// (e.g. "auburn-plumber.html", "bellevue-electrician.html").
//
// The legacy site's per-city pages were heavily templated boilerplate (same
// paragraph structure, city name swapped) — a doorway-page pattern this
// rebuild deliberately avoids. Instead each city here is served by ONE
// dynamic `/service-areas/[location]` route that presents genuinely useful,
// non-duplicated local info (see src/pages/service-areas/[location].astro).
//
// Regions group cities for navigation/UX only.

export interface ServiceArea {
  slug: string;
  name: string;
  region: 'Seattle Metro' | 'Eastside' | 'South King & Pierce County' | 'Snohomish County' | 'Kitsap Peninsula';
  featured?: boolean;
}

export const serviceAreas: ServiceArea[] = [
  // Seattle Metro
  { slug: 'seattle', name: 'Seattle', region: 'Seattle Metro', featured: true },
  { slug: 'west-seattle', name: 'West Seattle', region: 'Seattle Metro' },
  { slug: 'north-seattle', name: 'North Seattle', region: 'Seattle Metro' },
  { slug: 'shoreline', name: 'Shoreline', region: 'Seattle Metro' },
  { slug: 'burien', name: 'Burien', region: 'Seattle Metro' },
  { slug: 'tukwila', name: 'Tukwila', region: 'Seattle Metro' },
  { slug: 'des-moines', name: 'Des Moines', region: 'Seattle Metro' },

  // Eastside
  { slug: 'bellevue', name: 'Bellevue', region: 'Eastside', featured: true },
  { slug: 'redmond', name: 'Redmond', region: 'Eastside' },
  { slug: 'kirkland', name: 'Kirkland', region: 'Eastside' },
  { slug: 'issaquah', name: 'Issaquah', region: 'Eastside' },
  { slug: 'mercer-island', name: 'Mercer Island', region: 'Eastside' },
  { slug: 'factoria', name: 'Factoria', region: 'Eastside' },
  { slug: 'bothell', name: 'Bothell', region: 'Eastside' },
  { slug: 'woodinville', name: 'Woodinville', region: 'Eastside' },

  // South King & Pierce County
  { slug: 'kent', name: 'Kent', region: 'South King & Pierce County', featured: true },
  { slug: 'renton', name: 'Renton', region: 'South King & Pierce County' },
  { slug: 'auburn', name: 'Auburn', region: 'South King & Pierce County' },
  { slug: 'federal-way', name: 'Federal Way', region: 'South King & Pierce County' },
  { slug: 'tacoma', name: 'Tacoma', region: 'South King & Pierce County', featured: true },
  { slug: 'puyallup', name: 'Puyallup', region: 'South King & Pierce County' },
  { slug: 'lakewood', name: 'Lakewood', region: 'South King & Pierce County' },
  { slug: 'maple-valley', name: 'Maple Valley', region: 'South King & Pierce County' },
  { slug: 'bonney-lake', name: 'Bonney Lake', region: 'South King & Pierce County' },
  { slug: 'south-hill', name: 'South Hill', region: 'South King & Pierce County' },
  { slug: 'university-place', name: 'University Place', region: 'South King & Pierce County' },
  { slug: 'fife', name: 'Fife', region: 'South King & Pierce County' },
  { slug: 'fircrest', name: 'Fircrest', region: 'South King & Pierce County' },
  { slug: 'edgewood', name: 'Edgewood', region: 'South King & Pierce County' },
  { slug: 'graham', name: 'Graham', region: 'South King & Pierce County' },
  { slug: 'orting', name: 'Orting', region: 'South King & Pierce County' },
  { slug: 'buckley', name: 'Buckley', region: 'South King & Pierce County' },
  { slug: 'eatonville', name: 'Eatonville', region: 'South King & Pierce County' },
  { slug: 'dupont', name: 'DuPont', region: 'South King & Pierce County' },
  { slug: 'steilacoom', name: 'Steilacoom', region: 'South King & Pierce County' },
  { slug: 'gig-harbor', name: 'Gig Harbor', region: 'South King & Pierce County' },
  { slug: 'vashon-island', name: 'Vashon Island', region: 'South King & Pierce County' },

  // Snohomish County
  { slug: 'everett', name: 'Everett', region: 'Snohomish County', featured: true },
  { slug: 'lynnwood', name: 'Lynnwood', region: 'Snohomish County' },
  { slug: 'marysville', name: 'Marysville', region: 'Snohomish County' },
  { slug: 'arlington', name: 'Arlington', region: 'Snohomish County' },
  { slug: 'lake-stevens', name: 'Lake Stevens', region: 'Snohomish County' },
  { slug: 'edmonds', name: 'Edmonds', region: 'Snohomish County' },

  // Kitsap Peninsula
  { slug: 'bremerton', name: 'Bremerton', region: 'Kitsap Peninsula' },
  { slug: 'silverdale', name: 'Silverdale', region: 'Kitsap Peninsula' },
  { slug: 'port-orchard', name: 'Port Orchard', region: 'Kitsap Peninsula' },
  { slug: 'poulsbo', name: 'Poulsbo', region: 'Kitsap Peninsula' },
  { slug: 'bainbridge-island', name: 'Bainbridge Island', region: 'Kitsap Peninsula' },
];

export const featuredServiceAreas = serviceAreas.filter((a) => a.featured);

export const regions = [
  'Seattle Metro',
  'Eastside',
  'South King & Pierce County',
  'Snohomish County',
  'Kitsap Peninsula',
] as const;
