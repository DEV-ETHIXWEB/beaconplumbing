// Service taxonomy. Categories and services below are drawn from the legacy
// site's actual primary navigation and confirmed page inventory (Phase 0
// audit) — Plumbing, Sewer & Drain, Heating & HVAC, Air Conditioning,
// Electrical, and Septic are all real, established service lines with their
// own page families on the old site, not invented additions.
//
// Deliberately excluded: the hyper-local long-tail combo pages (e.g.
// "auburn-community-nest-thermostat") — those are thin, templated doorway
// pages per the legacy site's own pattern, and this rebuild's SEO strategy
// is to consolidate them into fewer, genuinely useful service pages that
// list relevant service areas rather than duplicating pages per city.

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  category: ServiceCategory['slug'];
  featured?: boolean;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  icon: string; // icon key, resolved in src/icons
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'plumbing',
    name: 'Plumbing',
    description: 'Residential and commercial plumbing repair, installation, and maintenance.',
    icon: 'wrench',
  },
  {
    slug: 'sewer-drain',
    name: 'Sewer & Drain',
    description: 'Drain cleaning, sewer repair and replacement, trenchless technology, and video inspection.',
    icon: 'pipe',
  },
  {
    slug: 'heating-hvac',
    name: 'Heating & HVAC',
    description: 'Furnaces, boilers, heat pumps, and hydronic heating systems.',
    icon: 'flame',
  },
  {
    slug: 'air-conditioning',
    name: 'Air Conditioning',
    description: 'AC installation, repair, and maintenance for Puget Sound homes and businesses.',
    icon: 'snowflake',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    description: 'Panel upgrades, rewiring, troubleshooting, and residential electrical service.',
    icon: 'bolt',
  },
  {
    slug: 'septic',
    name: 'Septic',
    description: 'Septic tank pumping, inspection, and grease trap/interceptor cleaning.',
    icon: 'droplet',
  },
];

export const services: Service[] = [
  // Plumbing
  { slug: 'emergency-plumbing', name: 'Emergency Plumbing', category: 'plumbing', featured: true,
    shortDescription: '24/7 rapid-response plumbing repair when you can’t wait.' },
  { slug: 'residential-plumbing', name: 'Residential Plumbing', category: 'plumbing', featured: true,
    shortDescription: 'Everyday repairs, installations, and maintenance for your home.' },
  { slug: 'commercial-plumbing', name: 'Commercial Plumbing', category: 'plumbing',
    shortDescription: 'Plumbing service for offices, restaurants, and commercial properties.' },
  { slug: 'water-heaters', name: 'Water Heaters', category: 'plumbing', featured: true,
    shortDescription: 'Gas, electric, and tankless water heater installation and repair.' },
  { slug: 'leak-detection', name: 'Leak Detection', category: 'plumbing',
    shortDescription: 'Locating hidden leaks before they become costly damage.' },
  { slug: 'pipe-repair-repiping', name: 'Pipe Repair & Repiping', category: 'plumbing',
    shortDescription: 'Burst pipes, galvanized pipe replacement, and whole-home repiping.' },
  { slug: 'water-line-repair', name: 'Water Line Repair', category: 'plumbing',
    shortDescription: 'New water service lines and water main break repair.' },
  { slug: 'water-filtration', name: 'Water Filtration', category: 'plumbing',
    shortDescription: 'Whole-home water filtration system installation.' },
  { slug: 'bathroom-kitchen-remodeling', name: 'Bathroom & Kitchen Remodeling', category: 'plumbing',
    shortDescription: 'Plumbing for bathroom and kitchen remodels, fixture upgrades, and new installations.' },
  { slug: 'garbage-disposal-repair', name: 'Garbage Disposal Repair', category: 'plumbing',
    shortDescription: 'Diagnosis and repair for jammed, leaking, or humming disposals.' },

  // Sewer & Drain
  { slug: 'drain-cleaning', name: 'Drain Cleaning', category: 'sewer-drain', featured: true,
    shortDescription: 'Clearing clogs, backups, and slow drains fast.' },
  { slug: 'sewer-repair', name: 'Sewer Repair & Replacement', category: 'sewer-drain', featured: true,
    shortDescription: 'Sewer line repair, replacement, and emergency sewer service.' },
  { slug: 'trenchless-sewer-repair', name: 'Trenchless Sewer Repair', category: 'sewer-drain',
    shortDescription: 'Pipe lining and trenchless technology to repair sewers without digging up your yard.' },
  { slug: 'sewer-video-inspection', name: 'Sewer Video Inspection', category: 'sewer-drain',
    shortDescription: 'Camera inspection to diagnose sewer line problems accurately.' },
  { slug: 'hydro-jetting', name: 'Hydro Jetting', category: 'sewer-drain',
    shortDescription: 'High-pressure water jetting to clear stubborn blockages and buildup.' },
  { slug: 'sump-pumps', name: 'Sump Pumps', category: 'sewer-drain',
    shortDescription: 'Sump and sewage ejector pump installation and repair.' },

  // Heating & HVAC
  { slug: 'furnace-repair', name: 'Furnace Repair & Installation', category: 'heating-hvac', featured: true,
    shortDescription: 'Gas and electric furnace repair, replacement, and installation.' },
  { slug: 'boiler-repair', name: 'Boiler Repair', category: 'heating-hvac',
    shortDescription: 'Boiler service and repair for residential heating systems.' },
  { slug: 'heat-pumps', name: 'Heat Pumps', category: 'heating-hvac',
    shortDescription: 'Heat pump installation and repair for efficient year-round comfort.' },
  { slug: 'hydronic-radiant-heating', name: 'Hydronic & Radiant Heating', category: 'heating-hvac',
    shortDescription: 'In-floor radiant heat and hydronic heating system service.' },

  // Air Conditioning
  { slug: 'ac-installation-repair', name: 'AC Installation & Repair', category: 'air-conditioning', featured: true,
    shortDescription: 'Same-day air conditioning repair and new system installation.' },
  { slug: 'mini-split-ac', name: 'Mini-Split AC', category: 'air-conditioning',
    shortDescription: 'Ductless mini-split installation for targeted cooling.' },

  // Electrical
  { slug: 'electrical-repair', name: 'Electrical Repair', category: 'electrical', featured: true,
    shortDescription: 'Troubleshooting and repair for residential electrical issues.' },
  { slug: 'panel-upgrades', name: 'Panel Upgrades', category: 'electrical',
    shortDescription: 'Electrical panel replacement and capacity upgrades.' },
  { slug: 'home-rewiring', name: 'Home Rewiring', category: 'electrical',
    shortDescription: 'Full and partial home rewiring for older properties.' },
  { slug: 'emergency-electrician', name: 'Emergency Electrician', category: 'electrical',
    shortDescription: '24/7 emergency electrical service.' },
  { slug: 'low-voltage-electrical', name: 'Low Voltage Electrical', category: 'electrical',
    shortDescription: 'Low-voltage wiring for lighting, security, and smart-home devices.' },

  // Septic
  { slug: 'septic-tank-pumping', name: 'Septic Tank Pumping', category: 'septic', featured: true,
    shortDescription: 'Routine and emergency septic tank pumping and inspection.' },
  { slug: 'grease-trap-cleaning', name: 'Grease Trap & Interceptor Cleaning', category: 'septic',
    shortDescription: 'Grease trap and interceptor cleaning for commercial kitchens.' },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter((s) => s.category === categorySlug);
}
