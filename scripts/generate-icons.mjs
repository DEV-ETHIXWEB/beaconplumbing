// One-off generator for apple-touch-icon / manifest icons, rasterized from
// the existing public/favicon.svg mark (no new logo asset needed). Run with
// `node scripts/generate-icons.mjs` after editing the source mark, if ever.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const publicDir = path.join(root, 'public');

const BRAND_900 = '#02254a';

const rawSvg = readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8');
// Force the white variant of the mark (the source SVG picks black/white via
// a prefers-color-scheme media query, which a raster export can't evaluate)
// so it reads clearly against the solid brand-900 background used below.
const whiteMarkSvg = rawSvg
  .replace(/<style>[\s\S]*?<\/style>/, '')
  .replace('fill="none"', 'fill="none"')
  .replace('<path ', '<path fill="#FFFFFF" ');

async function makeIcon(size, outFile, { padding }) {
  const markSize = Math.round(size * (1 - padding * 2));
  const mark = await sharp(Buffer.from(whiteMarkSvg)).resize(markSize, markSize).png().toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_900,
    },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, outFile));

  console.log(`wrote ${outFile} (${size}x${size})`);
}

await makeIcon(180, 'apple-touch-icon.png', { padding: 0.18 });
await makeIcon(192, 'icon-192.png', { padding: 0.18 });
await makeIcon(512, 'icon-512.png', { padding: 0.18 });

const manifest = {
  name: 'Beacon Plumbing',
  short_name: 'Beacon Plumbing',
  start_url: '/',
  display: 'standalone',
  background_color: BRAND_900,
  theme_color: BRAND_900,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};
writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote site.webmanifest');
