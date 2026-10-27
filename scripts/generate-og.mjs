// Generates public/og-default.png (1200×630) for link previews, using the
// logo from src/assets/brand. Run with: node scripts/generate-og.mjs
// Re-run whenever the logo is replaced.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const logoPath = fileURLToPath(new URL('../src/assets/brand/weewire-logo-primary.png', import.meta.url));
const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

const W = 1200;
const H = 630;
const plate = { x: 72, y: 150, w: 520, h: 300 };

const grid = [
  ...Array.from({ length: 26 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="${H}"/>`),
  ...Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="${W}" y2="${i * 48}"/>`),
].join('');

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0b0f13"/>
  <g stroke="#18212a" stroke-width="1">${grid}</g>
  <rect x="0" y="0" width="${W / 2}" height="8" fill="#00ffff"/>
  <rect x="${W / 2}" y="0" width="${W / 2}" height="8" fill="#ff9955"/>
  <rect x="${plate.x}" y="${plate.y}" width="${plate.w}" height="${plate.h}" rx="4" fill="#ffffff"/>
  <text x="660" y="250" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="3" fill="#a2abb4">LOW-VOLTAGE &amp; NETWORK</text>
  <text x="660" y="280" font-family="DejaVu Sans Mono, monospace" font-size="20" letter-spacing="3" fill="#a2abb4">INFRASTRUCTURE</text>
  <text x="660" y="350" font-family="Inter, sans-serif" font-weight="600" font-size="34" fill="#eceeee">Cabling · Fiber</text>
  <text x="660" y="394" font-family="Inter, sans-serif" font-weight="600" font-size="34" fill="#eceeee">Data center · On-site support</text>
</svg>`;

const logoHeight = plate.h - 60;
const logo = await sharp(logoPath).resize({ height: logoHeight }).png().toBuffer();
const { width: logoWidth } = await sharp(logo).metadata();

await sharp(Buffer.from(background))
  .composite([{ input: logo, left: Math.round(plate.x + (plate.w - logoWidth) / 2), top: plate.y + 30 }])
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Wrote ${out}`);
