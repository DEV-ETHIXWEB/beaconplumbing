// Resolves Icon3D image assets to plain URL strings, server-side, for use
// inside ContactForm.tsx — a React island can't use Astro's <Image>
// component or import .astro files, so the parent page resolves the URLs
// here and passes them down as a serializable prop instead.
import { getImage } from 'astro:assets';
import { icons, type IconName } from '../data/icon3d-assets';

// Maps each of ContactForm's 9 general service options to the same icon
// used for that trade elsewhere on the site (services.ts / categoryContent),
// so the form doesn't introduce a second, inconsistent icon set.
const GENERAL_SERVICE_ICONS: Record<string, IconName> = {
  'Emergency Plumbing': 'emergency-plumbing',
  'Drain Cleaning': 'drain-cleaning',
  'Water Heaters': 'boiler',
  'Sewer Repair': 'sewer',
  'Heating & HVAC': 'hvac',
  'Air Conditioning': 'air-conditioning',
  Electrical: 'electrical',
  Septic: 'grease-trap',
};

let cachedGeneralIconUrls: Record<string, string> | null = null;

async function resolveIconUrl(name: IconName): Promise<string> {
  const optimized = await getImage({ src: icons[name], width: 96 });
  return optimized.src;
}

// The 9 general options' icons never change per-page, so resolve them once
// per build and reuse the cached result across every page that renders
// ContactForm, rather than repeating the same getImage() calls dozens of
// times over during the static build.
export async function getGeneralServiceIconUrls(): Promise<Record<string, string>> {
  if (cachedGeneralIconUrls) return cachedGeneralIconUrls;
  const entries = await Promise.all(
    Object.entries(GENERAL_SERVICE_ICONS).map(async ([label, iconName]) => [label, await resolveIconUrl(iconName)] as const)
  );
  cachedGeneralIconUrls = Object.fromEntries(entries);
  return cachedGeneralIconUrls;
}

// For a page-specific option ContactForm injects dynamically (a single
// service or category name not already in the 9 general options), resolve
// that one icon too so it isn't the only option left without one.
export async function getServiceIconUrlMap(extra?: { label: string; icon: IconName }): Promise<Record<string, string>> {
  const base = await getGeneralServiceIconUrls();
  if (!extra || base[extra.label]) return base;
  return { ...base, [extra.label]: await resolveIconUrl(extra.icon) };
}
