/**
 * Build square PNGs for Next.js file-based metadata (`app/icon.png`, `app/apple-icon.png`).
 * Usage: node scripts/generate-app-icons.mjs
 */
import fs from "fs";
import sharp from "sharp";

const src = "public/brand/infranex.png";

async function squarePng(size, outPath) {
  const buf = await sharp(src)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  console.log("Wrote", outPath, `${size}x${size}`);
}

await squarePng(48, "app/icon.png");
await squarePng(180, "app/apple-icon.png");
