import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('../Images');
const OUT = path.resolve('./public/images');
mkdirSync(OUT, { recursive: true });

const jobs = [
  ['Hero BG.png', 'hero-bg.webp', { lossless: false, quality: 100 }],
  ['Engine work.png', 'engine-work.webp', { lossless: false, quality: 100 }],
  ['SS Grille2.jpg', 'ss-grille.webp', { lossless: false, quality: 100 }],
  ['Logo TRANS BG.png', 'logo.webp', { lossless: true }],
];

for (const [from, to, opts] of jobs) {
  const info = await sharp(path.join(SRC, from))
    .webp({ effort: 6, ...opts })
    .toFile(path.join(OUT, to));
  console.log(`${from} -> ${to}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
