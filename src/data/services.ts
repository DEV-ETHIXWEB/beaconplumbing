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
//
// Five services (urinal-repair-installation, drinking-fountain-repair,
// commercial-drain-cleaning, light-fixture-installation, ev-charger-installation)
// were added later, not sourced from the legacy-site audit — added to match
// icons from the client's custom icon set. TODO: VERIFY these are services
// Beacon actually offers before launch.

import type { IconName } from '../components/ui/Icon3D.astro';

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  category: ServiceCategory['slug'];
  featured?: boolean;
  icon: IconName;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'plumbing',
    name: 'Plumbing',
    description: 'Residential and commercial plumbing repair, installation, and maintenance.',
    icon: 'plumbing',
  },
  {
    slug: 'sewer-drain',
    name: 'Sewer & Drain',
    description: 'Drain cleaning, sewer repair and replacement, trenchless technology, and video inspection.',
    icon: 'sewer',
  },
  {
    slug: 'heating-hvac',
    name: 'Heating & HVAC',
    description: 'Furnaces, boilers, heat pumps, and hydronic heating systems.',
    icon: 'hvac',
  },
  {
    slug: 'air-conditioning',
    name: 'Air Conditioning',
    description: 'AC installation, repair, and maintenance for Puget Sound homes and businesses.',
    icon: 'air-conditioning',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    description: 'Panel upgrades, rewiring, troubleshooting, and residential electrical service.',
    icon: 'electrical',
  },
  {
    slug: 'septic',
    name: 'Septic',
    description: 'Septic tank pumping, inspection, and grease trap/interceptor cleaning.',
    icon: 'grease-trap',
  },
];

export const services: Service[] = [
  // Plumbing
  { slug: 'emergency-plumbing', name: 'Emergency Plumbing', category: 'plumbing', featured: true, icon: 'emergency-plumbing',
    shortDescription: '24/7 rapid-response plumbing repair when you can’t wait.' },
  { slug: 'residential-plumbing', name: 'Residential Plumbing', category: 'plumbing', featured: true, icon: 'plumbing',
    shortDescription: 'Everyday repairs, installations, and maintenance for your home.' },
  { slug: 'commercial-plumbing', name: 'Commercial Plumbing', category: 'plumbing', icon: 'commercial-plumbing',
    shortDescription: 'Plumbing service for offices, restaurants, and commercial properties.' },
  { slug: 'water-heaters', name: 'Water Heaters', category: 'plumbing', featured: true, icon: 'boiler',
    shortDescription: 'Gas, electric, and tankless water heater installation and repair.' },
  { slug: 'leak-detection', name: 'Leak Detection', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Locating hidden leaks before they become costly damage.' },
  { slug: 'pipe-repair-repiping', name: 'Pipe Repair & Repiping', category: 'plumbing', icon: 'pipe-repair',
    shortDescription: 'Burst pipes, galvanized pipe replacement, and whole-home repiping.' },
  { slug: 'water-line-repair', name: 'Water Line Repair', category: 'plumbing', icon: 'water-lines',
    shortDescription: 'New water service lines and water main break repair.' },
  { slug: 'water-filtration', name: 'Water Filtration', category: 'plumbing', icon: 'water-lines',
    shortDescription: 'Whole-home water filtration system installation.' },
  { slug: 'bathroom-kitchen-remodeling', name: 'Bathroom & Kitchen Remodeling', category: 'plumbing', icon: 'toilet',
    shortDescription: 'Plumbing for bathroom and kitchen remodels, fixture upgrades, and new installations.' },
  { slug: 'garbage-disposal-repair', name: 'Garbage Disposal Repair', category: 'plumbing', icon: 'drain-cleaning',
    shortDescription: 'Diagnosis and repair for jammed, leaking, or humming disposals.' },
  { slug: 'urinal-repair-installation', name: 'Urinal Repair & Installation', category: 'plumbing', icon: 'urinal',
    shortDescription: 'Commercial urinal repair, replacement, and new installation.' },
  { slug: 'drinking-fountain-repair', name: 'Drinking Fountain Repair & Installation', category: 'plumbing', icon: 'drinking-fountain',
    shortDescription: 'Repair and installation for commercial and public drinking fountains.' },

  // Sewer & Drain
  { slug: 'drain-cleaning', name: 'Drain Cleaning', category: 'sewer-drain', featured: true, icon: 'drain-cleaning',
    shortDescription: 'Clearing clogs, backups, and slow drains fast.' },
  { slug: 'sewer-repair', name: 'Sewer Repair & Replacement', category: 'sewer-drain', featured: true, icon: 'sewer',
    shortDescription: 'Sewer line repair, replacement, and emergency sewer service.' },
  { slug: 'trenchless-sewer-repair', name: 'Trenchless Sewer Repair', category: 'sewer-drain', icon: 'pipe-repair',
    shortDescription: 'Pipe lining and trenchless technology to repair sewers without digging up your yard.' },
  { slug: 'sewer-video-inspection', name: 'Sewer Video Inspection', category: 'sewer-drain', icon: 'sewer-camera',
    shortDescription: 'Camera inspection to diagnose sewer line problems accurately.' },
  { slug: 'hydro-jetting', name: 'Hydro Jetting', category: 'sewer-drain', icon: 'hydro-jetting',
    shortDescription: 'High-pressure water jetting to clear stubborn blockages and buildup.' },
  { slug: 'sump-pumps', name: 'Sump Pumps', category: 'sewer-drain', icon: 'sewer',
    shortDescription: 'Sump and sewage ejector pump installation and repair.' },
  { slug: 'commercial-drain-cleaning', name: 'Commercial Drain Cleaning', category: 'sewer-drain', icon: 'commercial-drain',
    shortDescription: 'Drain cleaning and maintenance for restaurants, offices, and commercial properties.' },

  // Heating & HVAC
  { slug: 'furnace-repair', name: 'Furnace Repair & Installation', category: 'heating-hvac', featured: true, icon: 'furnace',
    shortDescription: 'Gas and electric furnace repair, replacement, and installation.' },
  { slug: 'boiler-repair', name: 'Boiler Repair', category: 'heating-hvac', icon: 'boiler',
    shortDescription: 'Boiler service and repair for residential heating systems.' },
  { slug: 'heat-pumps', name: 'Heat Pumps', category: 'heating-hvac', icon: 'heat-pump',
    shortDescription: 'Heat pump installation and repair for efficient year-round comfort.' },
  { slug: 'hydronic-radiant-heating', name: 'Hydronic & Radiant Heating', category: 'heating-hvac', icon: 'boiler',
    shortDescription: 'In-floor radiant heat and hydronic heating system service.' },

  // Air Conditioning
  { slug: 'ac-installation-repair', name: 'AC Installation & Repair', category: 'air-conditioning', featured: true, icon: 'air-conditioning',
    shortDescription: 'Same-day air conditioning repair and new system installation.' },
  { slug: 'mini-split-ac', name: 'Mini-Split AC', category: 'air-conditioning', icon: 'mini-split',
    shortDescription: 'Ductless mini-split installation for targeted cooling.' },

  // Electrical
  { slug: 'electrical-repair', name: 'Electrical Repair', category: 'electrical', featured: true, icon: 'electrical',
    shortDescription: 'Troubleshooting and repair for residential electrical issues.' },
  { slug: 'panel-upgrades', name: 'Panel Upgrades', category: 'electrical', icon: 'electrical-panel',
    shortDescription: 'Electrical panel replacement and capacity upgrades.' },
  { slug: 'home-rewiring', name: 'Home Rewiring', category: 'electrical', icon: 'home-rewiring',
    shortDescription: 'Full and partial home rewiring for older properties.' },
  { slug: 'emergency-electrician', name: 'Emergency Electrician', category: 'electrical', icon: 'generator',
    shortDescription: '24/7 emergency electrical service.' },
  { slug: 'low-voltage-electrical', name: 'Low Voltage Electrical', category: 'electrical', icon: 'outlet-circuit',
    shortDescription: 'Low-voltage wiring for lighting, security, and smart-home devices.' },
  { slug: 'light-fixture-installation', name: 'Light Fixture Installation', category: 'electrical', icon: 'light-fixture',
    shortDescription: 'Indoor and outdoor light fixture installation and replacement.' },
  { slug: 'ev-charger-installation', name: 'EV Charger Installation', category: 'electrical', icon: 'ev-charger',
    shortDescription: 'Home EV charger installation, wired for safe, reliable charging.' },

  // Septic
  { slug: 'septic-tank-pumping', name: 'Septic Tank Pumping', category: 'septic', featured: true, icon: 'grease-trap',
    shortDescription: 'Routine and emergency septic tank pumping and inspection.' },
  { slug: 'grease-trap-cleaning', name: 'Grease Trap & Interceptor Cleaning', category: 'septic', icon: 'grease-trap',
    shortDescription: 'Grease trap and interceptor cleaning for commercial kitchens.' },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter((s) => s.category === categorySlug);
}
