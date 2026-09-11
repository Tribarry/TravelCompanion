import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'assets/images/originals');
const OUTPUT = path.join(ROOT, 'assets/images/generated');
const WIDTHS = [480, 800, 1200, 1600];
const QUALITY = 80;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

async function walk(dir) {
  const out = [];
  try {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...await walk(p));
      else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) out.push(p);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  return out;
}

await fs.mkdir(SOURCE, { recursive: true });
await fs.mkdir(OUTPUT, { recursive: true });
const files = await walk(SOURCE);
let optimised = 0;
let skipped = 0;

for (const file of files) {
  const relative = path.relative(SOURCE, file);
  const dir = path.join(OUTPUT, path.dirname(relative));
  const base = path.basename(relative, path.extname(relative));

  try {
    await fs.mkdir(dir, { recursive: true });
    const metadata = await sharp(file, { failOn: 'none' }).metadata();
    let wroteVariant = false;

    for (const width of WIDTHS) {
      if (metadata.width && width > metadata.width) continue;
      const target = path.join(dir, `${base}-${width}.webp`);
      await sharp(file, { failOn: 'none' })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5, smartSubsample: true })
        .toFile(target);
      wroteVariant = true;
      console.log(`${relative} -> ${path.relative(ROOT, target)}`);
    }

    if (wroteVariant) optimised++;
  } catch (err) {
    skipped++;
    console.warn(`Skipping unreadable image ${relative}: ${err.message}`);
  }
}

console.log(`Optimised ${optimised} source image(s); skipped ${skipped} unreadable source image(s).`);
