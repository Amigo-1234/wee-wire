// Generates public/og-default.png (1200×630) for link previews.
// Run with: node scripts/generate-og.mjs
// Uses system fonts for rendering; regenerate once the official logo arrives.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

const ports = Array.from({ length: 12 }, (_, i) => `<rect x="${700 + i * 34}" y="250" width="22" height="18" fill="#ece9e3"/>`).join('');
const leds = Array.from({ length: 12 }, (_, i) =>
  i % 5 === 0 ? '' : `<circle cx="${711 + i * 34}" cy="306" r="3" fill="${i % 4 === 1 ? '#e2a93b' : '#46b583'}"/>`,
).join('');
const ports2 = Array.from({ length: 12 }, (_, i) => `<rect x="${700 + i * 34}" y="316" width="22" height="18" fill="#ece9e3"/>`).join('');
const cords = [0, 3, 5, 8, 10]
  .map((i) => {
    const x = 711 + i * 34;
    return `<path d="M ${x} 268 C ${x} 288, ${x + 10} 296, ${x + 10} 316" stroke="#e48a5c" stroke-width="3" fill="none"/>`;
  })
  .join('');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e1318"/>
  <g stroke="#1c252e" stroke-width="1">
    ${Array.from({ length: 26 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="630"/>`).join('')}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="1200" y2="${i * 48}"/>`).join('')}
  </g>
  <rect x="676" y="220" width="452" height="146" fill="#151c23" stroke="#5b6773"/>
  ${ports}${leds}${ports2}${cords}
  <text x="72" y="120" font-family="DejaVu Sans Mono, monospace" font-size="22" letter-spacing="3" fill="#a3acb5">LOW-VOLTAGE &amp; NETWORK INFRASTRUCTURE</text>
  <text x="72" y="330" font-family="Inter Display, Inter, sans-serif" font-weight="700" font-size="104" letter-spacing="-3" fill="#ece9e3">Weewire</text>
  <text x="72" y="420" font-family="Inter, sans-serif" font-size="34" fill="#a3acb5">Cabling · Fiber · Data center · On-site support</text>
  <rect x="72" y="520" width="56" height="6" fill="#e48a5c"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`Wrote ${out}`);
