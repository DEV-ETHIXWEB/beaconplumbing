// Single source of truth for Beacon Plumbing business/brand information.
// Sourced from Phase 0 audit of the legacy site (A:\beaconplumbing\beaconplumbing_OLD).
// Where the legacy site had conflicting data, the canonical value below was
// chosen explicitly by the client — see README/audit notes. Do not reintroduce
// the old conflicting values (other phone numbers, emails, ratings) anywhere.

export const business = {
  name: 'Beacon Plumbing',
  legalName: 'Beacon Plumbing, Heating, Electrical & Mechanical Inc',
  tagline: "Stop Freakin'... Call Beacon!",
  foundingYear: 1999,
  founder: 'Bill Cahill',

  phone: {
    display: '(206) 800-6269',
    href: 'tel:+12068006269',
  },
  email: 'customersupport@beaconplumbing.net',

  address: {
    street: '515 7th Ave S',
    city: 'Seattle',
    state: 'WA',
    stateFull: 'Washington',
    zip: '98104',
    country: 'US',
    lat: 47.597856,
    lng: -122.323921,
    // https://www.google.com/maps/dir/?api=1&destination=515+7th+Ave+S,+Seattle,+WA+98104
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=515+7th+Ave+S%2C+Seattle%2C+WA+98104',
  },

  license: {
    label: 'Washington Contractors License',
    number: 'BEACOPM856PS',
    issuer: 'Washington State Department of Labor & Industries',
    issuerUrl: 'https://lni.wa.gov',
  },

  hours: {
    // Legacy site never published formal hours-of-operation schema; all
    // messaging asserts 24/7 emergency availability. TODO: VERIFY with
    // client whether standard business hours (for non-emergency scheduling
    // calls) should also be published.
    emergency: '24/7/365 Emergency Service',
    note: 'TODO: VERIFY standard office hours, if any, beyond 24/7 emergency dispatch',
  },

  trustBadges: [
    { label: 'Licensed, Bonded & Insured', icon: 'licensed-insured' },
    { label: 'Family Owned & Operated', icon: undefined },
    { label: '24/7 Emergency Response', icon: '24-7-emergency' },
    { label: 'Same-Day Service Available', icon: 'same-day-service' },
  ] as { label: string; icon?: import('../components/ui/Icon3D.astro').IconName }[],

  awards: [
    {
      name: 'Best in the PNW, The Seattle Times, Winner 2023 (The People\u2019s Choice)',
      imagePath: 'BPNW-Seattle-Times-Winner-2023.webp',
    },
  ],

  paymentMethods: ['American Express', 'Mastercard', 'Visa', 'Discover'],
  militaryDiscount: true,

  social: {
    // Footer (most recently uploaded, May 2026) is the freshest source and is
    // used here; legacy schema blocks disagreed with each other and with the footer.
    instagram: 'https://instagram.com/beaconplumbing',
    x: 'https://x.com/beaconplumbing',
    youtube: 'https://www.youtube.com/channel/UCRQlWXu9R7mP8OzdQ_J3mEQ',
    facebook: 'https://facebook.com/BeaconPlumbingInc',
  },

  bbb: {
    // TODO: VERIFY — legacy BBB profile is registered under Kent, WA while
    // the primary business address used site-wide is Seattle, WA. Unreconciled
    // in the old site; confirm correct current BBB profile URL before launch.
    profileUrl:
      'https://www.bbb.org/us/wa/kent/profile/plumber/beacon-plumbing-mechanical-inc-1296-13027089',
  },

  financing: {
    partner: 'Synchrony',
    applyUrl: 'https://www.synchrony.com/mmc/S6190937707',
    // TODO: VERIFY — legacy site never published specific rates/terms on-page,
    // only a logo linking to Synchrony's own application page. Confirm whether
    // the client wants terms displayed on-site or should keep linking out.
  },

  // Ratings intentionally omitted — legacy site had three mutually
  // inconsistent aggregateRating claims (4.3/1200, 4.1/680, and a live
  // widget showing 2,488). Per client decision, do not assert a specific
  // number anywhere (UI or schema). Link out to live review profiles instead.
  reviewProfiles: {
    google: 'TODO: VERIFY — current Google Business Profile review URL',
    bbb: 'https://www.bbb.org/us/wa/kent/profile/plumber/beacon-plumbing-mechanical-inc-1296-13027089',
  },

  tradesServed: [
    'Plumbing',
    'Sewer & Drain',
    'Heating & HVAC',
    'Air Conditioning',
    'Electrical',
    'Septic',
  ] as const,
} as const;

export type Business = typeof business;
