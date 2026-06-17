#!/usr/bin/env node
/**
 * Compress and import one or more images for a dinner entry.
 *
 * Usage:
 *   node scripts/add-dinner-image.mjs <image> [<image> ...] --dinner <slug>
 *   node scripts/add-dinner-image.mjs <image> [<image> ...] --dinner <slug> --quality 82 --max-width 1400
 *
 * Outputs WebP to public/images/dinners/<slug>/ with sequential numbering,
 * then appends the public path to that dinner's photos[] in dinners.json.
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { resolve, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const DINNERS_JSON = resolve(ROOT, 'src/data/dinners.json');
const PUBLIC_IMAGES = resolve(ROOT, 'public/images/dinners');

// ── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

function flag(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : null;
}

const quality   = parseInt(flag('quality')   ?? '82', 10);
const maxWidth  = parseInt(flag('max-width') ?? '1400', 10);
const dinnerSlug = flag('dinner');

const imagePaths = args.filter(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--dinner'
  && args[args.indexOf(a) - 1] !== '--quality'
  && args[args.indexOf(a) - 1] !== '--max-width');

if (!imagePaths.length) {
  console.error('Usage: node scripts/add-dinner-image.mjs <image> [<image> ...] --dinner <slug>');
  process.exit(1);
}

if (!dinnerSlug) {
  // Print available dinners and exit with guidance
  const dinners = JSON.parse(readFileSync(DINNERS_JSON, 'utf8'));
  console.error('\nMissing --dinner <slug>. Available dinners:\n');
  dinners.forEach(d => console.error(`  ${d.slug.padEnd(36)} ${d.name}`));
  console.error('\nExample:\n  node scripts/add-dinner-image.mjs photo.jpg --dinner amour-amour-2025-09\n');
  process.exit(1);
}

// ── Load and validate dinner ─────────────────────────────────────────────────

const dinners = JSON.parse(readFileSync(DINNERS_JSON, 'utf8'));
const dinnerIdx = dinners.findIndex(d => d.slug === dinnerSlug);
if (dinnerIdx === -1) {
  console.error(`No dinner found with slug "${dinnerSlug}". Run without --dinner to see available slugs.`);
  process.exit(1);
}

const dinner = dinners[dinnerIdx];

// ── Ensure output directory ──────────────────────────────────────────────────

const outDir = resolve(PUBLIC_IMAGES, dinnerSlug);
mkdirSync(outDir, { recursive: true });

// Determine next sequential number based on existing .webp files
function nextIndex() {
  if (!existsSync(outDir)) return 1;
  const existing = readdirSync(outDir).filter(f => f.endsWith('.webp'));
  if (!existing.length) return 1;
  const nums = existing.map(f => parseInt(f.replace('.webp', ''), 10)).filter(n => !isNaN(n));
  return nums.length ? Math.max(...nums) + 1 : existing.length + 1;
}

// ── Process images ───────────────────────────────────────────────────────────

let idx = nextIndex();
const addedPaths = [];

for (const imgPath of imagePaths) {
  const src = resolve(imgPath);
  const outFile = resolve(outDir, `${idx}.webp`);
  const publicPath = `/images/dinners/${dinnerSlug}/${idx}.webp`;

  process.stdout.write(`  ${basename(src)} → ${publicPath} … `);

  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outFile);

  const { size: inSize } = (await import('fs')).statSync(src);
  const { size: outSize } = (await import('fs')).statSync(outFile);
  const pct = Math.round((1 - outSize / inSize) * 100);
  console.log(`done (${kb(inSize)} → ${kb(outSize)}, ${pct > 0 ? '-' : '+'}${Math.abs(pct)}%)`);

  addedPaths.push(publicPath);
  idx++;
}

// ── Update dinners.json ───────────────────────────────────────────────────────

if (!Array.isArray(dinner.photos)) dinner.photos = [];
dinner.photos.push(...addedPaths);
dinners[dinnerIdx] = dinner;
writeFileSync(DINNERS_JSON, JSON.stringify(dinners, null, 2) + '\n', 'utf8');

console.log(`\nAdded ${addedPaths.length} photo(s) to "${dinner.name}" (${dinnerSlug})`);
console.log(`dinners.json photos[]:`, dinner.photos);

// ── Helpers ──────────────────────────────────────────────────────────────────

function kb(bytes) {
  return `${Math.round(bytes / 1024)}kb`;
}
