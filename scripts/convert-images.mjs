import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('../Images');
const THUMBS = path.join(SRC, 'Thumbs');
const OUT = path.resolve('./public/images');
mkdirSync(OUT, { recursive: true });

// quality 100 everywhere; the logo stays lossless so the transparent edges are clean
const Q = { quality: 100, effort: 6 };

// Service card thumbs render at ~280x232 CSS px, so 800px wide covers 2x displays.
// Cropped to the card's aspect ratio from the centre of each photo.
const CARD_W = 800;
const CARD_H = 664;

const thumbs = [
  ['Engine Diagnostics.jpg', 'engine-diagnostics.webp'],
  ['Brake Service.jpg', 'brake-service.webp'],
  ['Oil Change.png', 'oil-changes.webp'],
  ['Tires Wheels.png', 'tires-wheels.webp'],
  ['transmission.jpeg', 'transmission-repair.webp'],
  ['Suspension.png', 'suspension-steering.webp'],
  ['Air Conditioner.png', 'ac-heating.webp'],
  ['And more.jpg', 'and-more.webp'],
];

// [source, output, max width (0 = keep native), webp options]
const large = [
  ['Hero BG.png', 'hero-bg.webp', 1920, Q],
  // square crop of the hero, used only under the mobile breakpoint
  ['MOBILE hero bg.png', 'hero-bg-mobile.webp', 1254, Q],
  ['Engine work.png', 'engine-work.webp', 1600, Q],
  ['SS Grille2.jpg', 'ss-grille.webp', 1600, Q],
  ['metal grid.png', 'metal-grid.webp', 1600, Q],
  ['Logo TRANS BG.png', 'logo.webp', 900, { lossless: true, effort: 6 }],
];

for (const [from, to] of thumbs) {
  const info = await sharp(path.join(THUMBS, from))
    .resize(CARD_W, CARD_H, { fit: 'cover', position: 'centre' })
    .webp(Q)
    .toFile(path.join(OUT, to));
  console.log(`thumb  ${from.padEnd(24)} -> ${to.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}

for (const [from, to, maxW, opts] of large) {
  const pipeline = sharp(path.join(SRC, from));
  if (maxW) pipeline.resize({ width: maxW, withoutEnlargement: true });
  const info = await pipeline.webp(opts).toFile(path.join(OUT, to));
  console.log(`image  ${from.padEnd(24)} -> ${to.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
