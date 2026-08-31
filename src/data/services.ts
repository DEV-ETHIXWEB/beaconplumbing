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
//
// longDescription: service-specific paragraph shown on the service detail
// page, grounded in general trade knowledge (not fabricated Beacon-specific
// claims, stats, or history) so it stays accurate regardless of the TODOs
// above.

import type { IconName } from '../components/ui/Icon3D.astro';

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
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
    shortDescription: '24/7 rapid-response plumbing repair when you can’t wait.',
    longDescription: 'Burst pipes, overflowing toilets, sewage backups, and water heaters that quit without warning don’t wait for business hours, and neither do we. Our technicians carry the parts and tools to shut off the source of damage fast, stop the immediate problem, and start the repair on the same visit.' },
  { slug: 'residential-plumbing', name: 'Residential Plumbing', category: 'plumbing', featured: true, icon: 'plumbing',
    shortDescription: 'Everyday repairs, installations, and maintenance for your home.',
    longDescription: 'From a dripping faucet and a running toilet to fixture replacements and small remodel plumbing, residential service covers the everyday issues that come up in every home. We diagnose the actual cause rather than just treating the symptom, so the same leak or clog doesn’t come back in a month.' },
  { slug: 'commercial-plumbing', name: 'Commercial Plumbing', category: 'plumbing', icon: 'commercial-plumbing',
    shortDescription: 'Plumbing service for offices, restaurants, and commercial properties.',
    longDescription: 'Commercial properties have higher fixture counts, heavier daily use, and code requirements residential jobs don’t, from grease management to backflow prevention. We work around business hours where possible and prioritize getting restrooms, kitchens, and water service back online quickly to minimize disruption to your operation.' },
  { slug: 'water-heaters', name: 'Water Heaters', category: 'plumbing', featured: true, icon: 'boiler',
    shortDescription: 'Gas, electric, and tankless water heater installation and repair.',
    longDescription: 'Whether it’s a conventional tank unit that’s stopped heating, a pilot light that won’t stay lit, or an upgrade to a tankless system for continuous hot water and lower standby energy loss, we size and install water heaters to match your household’s or building’s actual demand, and repair what’s already installed.' },
  { slug: 'leak-detection', name: 'Leak Detection', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Locating hidden leaks before they become costly damage.',
    longDescription: 'A higher-than-usual water bill, a damp spot on a wall or ceiling, or the sound of running water with no fixture on are often the only signs of a leak hidden inside a wall, under a slab, or underground. We use listening equipment and moisture detection to pinpoint the source before cutting into anything, so repairs stay targeted instead of exploratory.' },
  { slug: 'pipe-repair-repiping', name: 'Pipe Repair & Repiping', category: 'plumbing', icon: 'pipe-repair',
    shortDescription: 'Burst pipes, galvanized pipe replacement, and whole-home repiping.',
    longDescription: 'Older Puget Sound homes often still run on galvanized steel supply lines, which corrode from the inside, restrict water pressure, and eventually fail. We repair isolated pipe breaks and, where the existing plumbing has reached the end of its service life, repipe with modern copper or PEX to eliminate the recurring leaks and rust-colored water that come with aging pipe.' },
  { slug: 'water-line-repair', name: 'Water Line Repair', category: 'plumbing', icon: 'water-lines',
    shortDescription: 'New water service lines and water main break repair.',
    longDescription: 'The water service line running from the street to your home is exposed to shifting soil, tree roots, and age-related corrosion, and a break there can cut off water entirely or flood a yard. We repair and replace service lines, including trenchless options that avoid tearing up an entire yard or driveway to reach the pipe.' },
  { slug: 'water-filtration', name: 'Water Filtration', category: 'plumbing', icon: 'water-lines',
    shortDescription: 'Whole-home water filtration system installation.',
    longDescription: 'Municipal water can still carry sediment, chlorine taste and odor, and mineral hardness that shortens the life of water heaters and fixtures. We install whole-home filtration and softening systems sized to your water supply and usage, so every tap in the house delivers cleaner, better-tasting water.' },
  { slug: 'bathroom-kitchen-remodeling', name: 'Bathroom & Kitchen Remodeling', category: 'plumbing', icon: 'toilet',
    shortDescription: 'Plumbing for bathroom and kitchen remodels, fixture upgrades, and new installations.',
    longDescription: 'Relocating a sink, adding a second bathroom, or upgrading to a new tub, shower, or kitchen fixture layout means moving supply and drain lines, not just swapping a faucet. We handle the rough-in and finish plumbing for remodels so the new layout works correctly the first time, coordinated around your contractor’s or designer’s timeline.' },
  { slug: 'garbage-disposal-repair', name: 'Garbage Disposal Repair', category: 'plumbing', icon: 'drain-cleaning',
    shortDescription: 'Diagnosis and repair for jammed, leaking, or humming disposals.',
    longDescription: 'A disposal that hums without spinning, leaks from the bottom, or trips its reset button repeatedly usually points to a jam, a worn seal, or a failing motor. We diagnose which it is, clear jams safely, and repair or replace the unit rather than defaulting straight to a swap.' },
  { slug: 'urinal-repair-installation', name: 'Urinal Repair & Installation', category: 'plumbing', icon: 'urinal',
    shortDescription: 'Commercial urinal repair, replacement, and new installation.',
    longDescription: 'Commercial urinals see heavy daily use and their flush valves, sensors, and seals wear accordingly, leading to running water, weak flushes, or leaks at the base. We repair existing valves and fixtures and install new water-efficient models for offices, restaurants, and other commercial restrooms.' },
  { slug: 'drinking-fountain-repair', name: 'Drinking Fountain Repair & Installation', category: 'plumbing', icon: 'drinking-fountain',
    shortDescription: 'Repair and installation for commercial and public drinking fountains.',
    longDescription: 'Weak flow, no flow, or a leak at the base of a drinking fountain typically comes down to a failed valve, clogged line, or worn seal. We repair existing units and install new fountains and filtered bottle-fill stations for schools, offices, and public buildings.' },

  // Sewer & Drain
  { slug: 'drain-cleaning', name: 'Drain Cleaning', category: 'sewer-drain', featured: true, icon: 'drain-cleaning',
    shortDescription: 'Clearing clogs, backups, and slow drains fast.',
    longDescription: 'Slow or gurgling drains in a sink, tub, or floor drain are usually caused by a buildup of grease, hair, soap scum, or debris somewhere in the line. We snake and clear the blockage, and where a drain keeps clogging in the same spot, we’ll look further down the line to find out why.' },
  { slug: 'sewer-repair', name: 'Sewer Repair & Replacement', category: 'sewer-drain', featured: true, icon: 'sewer',
    shortDescription: 'Sewer line repair, replacement, and emergency sewer service.',
    longDescription: 'Tree root intrusion, pipe bellies, and aging clay or cast-iron pipe are common causes of sewer line failure in older Puget Sound neighborhoods, showing up as repeated backups, slow drainage throughout the house, or sewage odor in the yard. We diagnose the location and severity of the damage, then repair or fully replace the line, including emergency response for active backups.' },
  { slug: 'trenchless-sewer-repair', name: 'Trenchless Sewer Repair', category: 'sewer-drain', icon: 'pipe-repair',
    shortDescription: 'Pipe lining and trenchless technology to repair sewers without digging up your yard.',
    longDescription: 'Traditional sewer replacement means excavating a trench the full length of the damaged pipe, which can tear up landscaping, driveways, or hardscape. Trenchless methods like pipe lining and pipe bursting rehabilitate or replace the line through small access points instead, restoring the sewer with far less digging and disruption to your property.' },
  { slug: 'sewer-video-inspection', name: 'Sewer Video Inspection', category: 'sewer-drain', icon: 'sewer-camera',
    shortDescription: 'Camera inspection to diagnose sewer line problems accurately.',
    longDescription: 'A push camera run down the sewer line shows exactly where a blockage, root intrusion, or pipe damage is located and how severe it is, instead of guessing based on symptoms alone. We use video inspection to confirm the cause of recurring backups and to check line condition before a home purchase or property renovation.' },
  { slug: 'hydro-jetting', name: 'Hydro Jetting', category: 'sewer-drain', icon: 'hydro-jetting',
    shortDescription: 'High-pressure water jetting to clear stubborn blockages and buildup.',
    longDescription: 'A standard drain snake punches a hole through a clog, but grease, scale, and root intrusion tend to build back up quickly along the pipe walls. Hydro jetting uses high-pressure water to scour the full interior of the pipe clean, clearing stubborn blockages more thoroughly than snaking alone and slowing how fast buildup returns.' },
  { slug: 'sump-pumps', name: 'Sump Pumps', category: 'sewer-drain', icon: 'sewer',
    shortDescription: 'Sump and sewage ejector pump installation and repair.',
    longDescription: 'Basements and crawl spaces below the main sewer line, or properties prone to groundwater intrusion during Puget Sound’s wet season, rely on sump and sewage ejector pumps to keep water and waste moving out instead of backing up. We install, repair, and replace these pumps, including battery backup options for when the power goes out during a storm.' },
  { slug: 'commercial-drain-cleaning', name: 'Commercial Drain Cleaning', category: 'sewer-drain', icon: 'commercial-drain',
    shortDescription: 'Drain cleaning and maintenance for restaurants, offices, and commercial properties.',
    longDescription: 'Restaurant kitchens, floor drains, and high-traffic commercial restrooms clog faster than residential plumbing because of grease, food waste, and daily volume. We clear active blockages and can set up routine maintenance cleaning to keep drains flowing and avoid a shutdown during business hours.' },

  // Heating & HVAC
  { slug: 'furnace-repair', name: 'Furnace Repair & Installation', category: 'heating-hvac', featured: true, icon: 'furnace',
    shortDescription: 'Gas and electric furnace repair, replacement, and installation.',
    longDescription: 'A furnace that won’t ignite, short-cycles, or blows cold air usually traces back to the ignitor, flame sensor, blower motor, or a clogged filter restricting airflow. We diagnose and repair gas and electric furnaces, and when a unit is old enough that repairs are becoming frequent, we’ll size and install a replacement matched to your home.' },
  { slug: 'boiler-repair', name: 'Boiler Repair', category: 'heating-hvac', icon: 'boiler',
    shortDescription: 'Boiler service and repair for residential heating systems.',
    longDescription: 'Boilers heating a home through radiators or in-floor loops can develop leaks at fittings, lose pressure, or have pilot and ignition issues, all of which show up as uneven heat or a system that won’t fire. We troubleshoot hydronic boiler systems and repair the specific component causing the failure rather than replacing the whole unit by default.' },
  { slug: 'heat-pumps', name: 'Heat Pumps', category: 'heating-hvac', icon: 'heat-pump',
    shortDescription: 'Heat pump installation and repair for efficient year-round comfort.',
    longDescription: 'Heat pumps move heat rather than generate it, which makes them well suited to the Puget Sound’s mild winters and warmer summers, providing both heating and cooling from one system. We install ducted and ductless heat pumps and repair existing systems that are underperforming, short-cycling, or not reaching temperature.' },
  { slug: 'hydronic-radiant-heating', name: 'Hydronic & Radiant Heating', category: 'heating-hvac', icon: 'boiler',
    shortDescription: 'In-floor radiant heat and hydronic heating system service.',
    longDescription: 'In-floor radiant systems circulate heated water through tubing beneath the floor, delivering even, consistent warmth without forced air or ductwork. We service and repair existing hydronic and radiant systems, from the boiler and manifold to individual zone issues, and can extend heated loops into new or remodeled spaces.' },

  // Air Conditioning
  { slug: 'ac-installation-repair', name: 'AC Installation & Repair', category: 'air-conditioning', featured: true, icon: 'air-conditioning',
    shortDescription: 'Same-day air conditioning repair and new system installation.',
    longDescription: 'Weak airflow, warm air from the vents, or a system that won’t turn on at all are the most common central AC complaints, often tied to refrigerant levels, a failing capacitor, or a dirty condenser coil. We repair existing systems and install new central AC sized to your home’s square footage and layout, not a one-size-fits-all unit.' },
  { slug: 'mini-split-ac', name: 'Mini-Split AC', category: 'air-conditioning', icon: 'mini-split',
    shortDescription: 'Ductless mini-split installation for targeted cooling.',
    longDescription: 'Homes without existing ductwork, additions, and converted spaces like garages or ADUs often aren’t practical to cool with central AC. Ductless mini-splits mount directly on the wall and run on refrigerant lines instead of ducts, giving room-by-room temperature control with a much simpler installation.' },

  // Electrical
  { slug: 'electrical-repair', name: 'Electrical Repair', category: 'electrical', featured: true, icon: 'electrical',
    shortDescription: 'Troubleshooting and repair for residential electrical issues.',
    longDescription: 'Flickering lights, dead outlets, and breakers that trip for no obvious reason are symptoms of an underlying wiring, connection, or load issue that’s worth tracking down rather than resetting repeatedly. Our electricians troubleshoot the circuit to find the actual cause and repair it safely, rather than just replacing the visible fixture.' },
  { slug: 'panel-upgrades', name: 'Panel Upgrades', category: 'electrical', icon: 'electrical-panel',
    shortDescription: 'Electrical panel replacement and capacity upgrades.',
    longDescription: 'Many older homes still run on 100-amp panels, or even original fuse boxes, that weren’t built for today’s electrical load from EV chargers, heat pumps, and modern appliances. We upgrade panels to 200-amp service and beyond, giving the home the capacity and circuit breakers it needs and bringing outdated panels up to current code.' },
  { slug: 'home-rewiring', name: 'Home Rewiring', category: 'electrical', icon: 'home-rewiring',
    shortDescription: 'Full and partial home rewiring for older properties.',
    longDescription: 'Older Seattle-area homes were sometimes originally wired with knob-and-tube or aluminum wiring, both of which fall short of modern safety and insurance standards and can’t support today’s electrical demand. We handle full and partial rewiring projects, replacing outdated wiring with properly grounded copper circuits.' },
  { slug: 'emergency-electrician', name: 'Emergency Electrician', category: 'electrical', icon: 'generator',
    shortDescription: '24/7 emergency electrical service.',
    longDescription: 'A burning smell from an outlet, sparking at a switch, or a total loss of power isn’t something to wait on until morning. Our electricians respond around the clock for active electrical hazards and outages, working to make the situation safe first and then complete the repair.' },
  { slug: 'low-voltage-electrical', name: 'Low Voltage Electrical', category: 'electrical', icon: 'outlet-circuit',
    shortDescription: 'Low-voltage wiring for lighting, security, and smart-home devices.',
    longDescription: 'Security cameras, doorbell wiring, landscape lighting, and smart-home devices run on low-voltage circuits that are wired differently from standard household power. We run and terminate low-voltage wiring correctly so these systems work reliably instead of relying on exposed cords or unreliable wireless workarounds.' },
  { slug: 'light-fixture-installation', name: 'Light Fixture Installation', category: 'electrical', icon: 'light-fixture',
    shortDescription: 'Indoor and outdoor light fixture installation and replacement.',
    longDescription: 'Swapping a light fixture, adding recessed lighting, or wiring a new ceiling fan involves more than the fixture itself, from box support to circuit capacity. We install and replace indoor and outdoor fixtures safely and to code, including fixtures that need a new switch leg or dedicated circuit run.' },
  { slug: 'ev-charger-installation', name: 'EV Charger Installation', category: 'electrical', icon: 'ev-charger',
    shortDescription: 'Home EV charger installation, wired for safe, reliable charging.',
    longDescription: 'A Level 2 home EV charger needs a dedicated circuit sized correctly for the charger’s draw, and in many homes that means confirming the panel has the available capacity before running the line. We evaluate your panel, install the circuit and charger, and upgrade the panel first if the existing service can’t support it.' },

  // Septic
  { slug: 'septic-tank-pumping', name: 'Septic Tank Pumping', category: 'septic', featured: true, icon: 'grease-trap',
    shortDescription: 'Routine and emergency septic tank pumping and inspection.',
    longDescription: 'Septic tanks need pumping on a regular schedule, typically every three to five years depending on household size and tank capacity, to keep solids from reaching the drain field and causing a much costlier failure. We provide routine pumping and inspection for properties on septic across King, Pierce, and Snohomish counties, plus emergency pumping when a tank backs up unexpectedly.' },
  { slug: 'grease-trap-cleaning', name: 'Grease Trap & Interceptor Cleaning', category: 'septic', icon: 'grease-trap',
    shortDescription: 'Grease trap and interceptor cleaning for commercial kitchens.',
    longDescription: 'Commercial kitchens are required to keep grease traps and interceptors cleaned on a regular schedule, both to stay in compliance with local code and to prevent slow drains, odors, and backups in the kitchen. We pump and clean grease traps and interceptors for restaurants and food service properties, and can set up a recurring maintenance schedule.' },
];

export const featuredServices = services.filter((s) => s.featured);

export function getServicesByCategory(categorySlug: string): Service[] {
  return services.filter((s) => s.category === categorySlug);
}
