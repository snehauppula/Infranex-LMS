/**
 * One-off / maintenance: key near-black to transparent, then trim empty margins (critical
 * for nav: a huge square canvas makes object-contain look microscopic).
 * Usage: node scripts/process-brand-logo.mjs <input.png> <output.png>
 */
import sharp from "sharp";

const src = process.argv[2];
const dest = process.argv[3];
if (!src || !dest) {
  console.error("Usage: node scripts/process-brand-logo.mjs <input.png> <output.png>");
  process.exit(1);
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const BLACK = 12;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r <= BLACK && g <= BLACK && b <= BLACK) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .trim({ threshold: 5 })
  .toFile(dest);

const meta = await sharp(dest).metadata();
console.log("OK", dest, `${meta.width}x${meta.height}`);
