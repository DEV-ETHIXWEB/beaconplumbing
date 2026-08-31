// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import { redirects } from './src/data/redirects.ts';

// https://astro.build/config
export default defineConfig({
  // TODO: VERIFY — confirm production domain before launch.
  site: 'https://www.beaconplumbing.net',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],
  redirects,
});