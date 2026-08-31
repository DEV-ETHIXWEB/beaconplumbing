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
//
// lat/lng are public, standard city-center coordinates (not
// business-specific data) — used to plot the service-area map on
// /service-areas. Precision is city-level, not rooftop-level.

export interface ServiceArea {
  slug: string;
  name: string;
  region: 'Seattle Metro' | 'Eastside' | 'South King & Pierce County' | 'Snohomish County' | 'Kitsap Peninsula';
  featured?: boolean;
  lat: number;
  lng: number;
}

export const serviceAreas: ServiceArea[] = [
  // Seattle Metro
  { slug: 'seattle', name: 'Seattle', region: 'Seattle Metro', featured: true, lat: 47.6062, lng: -122.3321 },
  { slug: 'west-seattle', name: 'West Seattle', region: 'Seattle Metro', lat: 47.5636, lng: -122.386 },
  { slug: 'north-seattle', name: 'North Seattle', region: 'Seattle Metro', lat: 47.7095, lng: -122.3311 },
  { slug: 'shoreline', name: 'Shoreline', region: 'Seattle Metro', lat: 47.7557, lng: -122.3415 },
  { slug: 'burien', name: 'Burien', region: 'Seattle Metro', lat: 47.4704, lng: -122.3468 },
  { slug: 'tukwila', name: 'Tukwila', region: 'Seattle Metro', lat: 47.4744, lng: -122.261 },
  { slug: 'des-moines', name: 'Des Moines', region: 'Seattle Metro', lat: 47.4004, lng: -122.324 },

  // Eastside
  { slug: 'bellevue', name: 'Bellevue', region: 'Eastside', featured: true, lat: 47.6101, lng: -122.2015 },
  { slug: 'redmond', name: 'Redmond', region: 'Eastside', lat: 47.674, lng: -122.1215 },
  { slug: 'kirkland', name: 'Kirkland', region: 'Eastside', lat: 47.6769, lng: -122.206 },
  { slug: 'issaquah', name: 'Issaquah', region: 'Eastside', lat: 47.5301, lng: -122.0326 },
  { slug: 'mercer-island', name: 'Mercer Island', region: 'Eastside', lat: 47.5707, lng: -122.2221 },
  { slug: 'factoria', name: 'Factoria', region: 'Eastside', lat: 47.5798, lng: -122.1687 },
  { slug: 'bothell', name: 'Bothell', region: 'Eastside', lat: 47.7623, lng: -122.2054 },
  { slug: 'woodinville', name: 'Woodinville', region: 'Eastside', lat: 47.7543, lng: -122.1637 },

  // South King & Pierce County
  { slug: 'kent', name: 'Kent', region: 'South King & Pierce County', featured: true, lat: 47.3809, lng: -122.2348 },
  { slug: 'renton', name: 'Renton', region: 'South King & Pierce County', lat: 47.4829, lng: -122.2171 },
  { slug: 'auburn', name: 'Auburn', region: 'South King & Pierce County', lat: 47.3073, lng: -122.2285 },
  { slug: 'federal-way', name: 'Federal Way', region: 'South King & Pierce County', lat: 47.3223, lng: -122.3126 },
  { slug: 'tacoma', name: 'Tacoma', region: 'South King & Pierce County', featured: true, lat: 47.2529, lng: -122.4443 },
  { slug: 'puyallup', name: 'Puyallup', region: 'South King & Pierce County', lat: 47.1854, lng: -122.2929 },
  { slug: 'lakewood', name: 'Lakewood', region: 'South King & Pierce County', lat: 47.1718, lng: -122.5185 },
  { slug: 'maple-valley', name: 'Maple Valley', region: 'South King & Pierce County', lat: 47.3987, lng: -122.0398 },
  { slug: 'bonney-lake', name: 'Bonney Lake', region: 'South King & Pierce County', lat: 47.1773, lng: -122.1815 },
  { slug: 'south-hill', name: 'South Hill', region: 'South King & Pierce County', lat: 47.1287, lng: -122.2856 },
  { slug: 'university-place', name: 'University Place', region: 'South King & Pierce County', lat: 47.2237, lng: -122.5432 },
  { slug: 'fife', name: 'Fife', region: 'South King & Pierce County', lat: 47.2401, lng: -122.3593 },
  { slug: 'fircrest', name: 'Fircrest', region: 'South King & Pierce County', lat: 47.236, lng: -122.5129 },
  { slug: 'edgewood', name: 'Edgewood', region: 'South King & Pierce County', lat: 47.2568, lng: -122.2801 },
  { slug: 'graham', name: 'Graham', region: 'South King & Pierce County', lat: 46.9976, lng: -122.2965 },
  { slug: 'orting', name: 'Orting', region: 'South King & Pierce County', lat: 47.0968, lng: -122.2098 },
  { slug: 'buckley', name: 'Buckley', region: 'South King & Pierce County', lat: 47.1618, lng: -122.0265 },
  { slug: 'eatonville', name: 'Eatonville', region: 'South King & Pierce County', lat: 46.8676, lng: -122.2668 },
  { slug: 'dupont', name: 'DuPont', region: 'South King & Pierce County', lat: 47.1004, lng: -122.6415 },
  { slug: 'steilacoom', name: 'Steilacoom', region: 'South King & Pierce County', lat: 47.1712, lng: -122.5926 },
  { slug: 'gig-harbor', name: 'Gig Harbor', region: 'South King & Pierce County', lat: 47.3301, lng: -122.5799 },
  { slug: 'vashon-island', name: 'Vashon Island', region: 'South King & Pierce County', lat: 47.4456, lng: -122.4593 },

  // Snohomish County
  { slug: 'everett', name: 'Everett', region: 'Snohomish County', featured: true, lat: 47.979, lng: -122.2021 },
  { slug: 'lynnwood', name: 'Lynnwood', region: 'Snohomish County', lat: 47.8209, lng: -122.3151 },
  { slug: 'marysville', name: 'Marysville', region: 'Snohomish County', lat: 48.0518, lng: -122.1771 },
  { slug: 'arlington', name: 'Arlington', region: 'Snohomish County', lat: 48.1926, lng: -122.1259 },
  { slug: 'lake-stevens', name: 'Lake Stevens', region: 'Snohomish County', lat: 48.0154, lng: -122.0576 },
  { slug: 'edmonds', name: 'Edmonds', region: 'Snohomish County', lat: 47.8107, lng: -122.3774 },

  // Kitsap Peninsula
  { slug: 'bremerton', name: 'Bremerton', region: 'Kitsap Peninsula', lat: 47.5673, lng: -122.6329 },
  { slug: 'silverdale', name: 'Silverdale', region: 'Kitsap Peninsula', lat: 47.6446, lng: -122.6929 },
  { slug: 'port-orchard', name: 'Port Orchard', region: 'Kitsap Peninsula', lat: 47.5262, lng: -122.6412 },
  { slug: 'poulsbo', name: 'Poulsbo', region: 'Kitsap Peninsula', lat: 47.7359, lng: -122.6468 },
  { slug: 'bainbridge-island', name: 'Bainbridge Island', region: 'Kitsap Peninsula', lat: 47.6262, lng: -122.5212 },
];

export const featuredServiceAreas = serviceAreas.filter((a) => a.featured);

export const regions = [
  'Seattle Metro',
  'Eastside',
  'South King & Pierce County',
  'Snohomish County',
  'Kitsap Peninsula',
] as const;
