import { cloudinaryVideoThumbnailUrl } from "@/lib/cloudinary";

/**
 * Static thumbnail for catalog cards / marketing when derivable (e.g. Cloudinary `.mp4` → `.jpg`).
 * Other hosts: cards fall back to a neutral surface; course detail can use `<video preload="metadata">`.
 */
export function catalogVideoThumbnailUrl(videoUrl: string): string | null {
  return cloudinaryVideoThumbnailUrl(videoUrl);
}

/**
 * Parse a clock-style duration label into total seconds (e.g. MEGA’s `2:55:30` or `45:30`).
 * Returns null if the string doesn’t match a supported pattern (letters, prose, etc.).
 */
export function parseVideoDurationLabelToSeconds(
  label: string | null | undefined
): number | null {
  if (!label) return null;
  const s = label.trim();
  const hms = s.match(/^(\d+):(\d{2}):(\d{2})$/);
  if (hms) {
    const h = Number(hms[1]);
    const m = Number(hms[2]);
    const sec = Number(hms[3]);
    if (!Number.isFinite(h) || !Number.isFinite(m) || !Number.isFinite(sec)) return null;
    if (m > 59 || sec > 59) return null;
    const total = h * 3600 + m * 60 + sec;
    return total > 0 ? total : null;
  }
  const ms = s.match(/^(\d+):(\d{2})$/);
  if (ms) {
    const a = Number(ms[1]);
    const b = Number(ms[2]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
    if (b > 59) return null;
    const total = a * 60 + b;
    return total > 0 ? total : null;
  }
  return null;
}

/**
 * MEGA embed URLs use a trailing `!{seconds}s` on the hash to set the start offset when the iframe loads
 * (same control as MEGA’s “Start video at” in their embed UI). This does not expose live playback time
 * to the parent page — it only sets the initial seek when `src` is requested.
 *
 * Links: `https://mega.nz/embed/...#key` or `#key!78s`, or a pasted `<iframe ... src="...">` snippet.
 * The hash fragment is required for playback — never strip it for these URLs.
 */
export function megaEmbedSrcFromVideoUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = raw.trim();
  const fromIframe = t.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  const candidate = (fromIframe?.[1] ?? t).trim();
  try {
    const u = new URL(candidate);
    if (u.hostname !== "mega.nz" && !u.hostname.endsWith(".mega.nz")) return null;
    if (!u.pathname.toLowerCase().startsWith("/embed/")) return null;
    return u.href;
  } catch {
    return null;
  }
}

export function isMegaEmbedVideoUrl(raw: string | null | undefined): boolean {
  return megaEmbedSrcFromVideoUrl(raw) != null;
}

/**
 * Set or replace MEGA’s `!{seconds}s` start suffix on the embed URL hash (decryption material before `!` is kept).
 */
export function megaEmbedSrcWithStartSeconds(embedSrc: string, startSeconds: number): string {
  let u: URL;
  try {
    u = new URL(embedSrc);
  } catch {
    return embedSrc;
  }
  const rawHash = u.hash.startsWith("#") ? u.hash.slice(1) : u.hash;
  if (!rawHash) return embedSrc;
  const sec = Math.max(0, Math.floor(startSeconds));
  const baseKey = rawHash.replace(/!\d+s$/i, "");
  u.hash = `${baseKey}!${sec}s`;
  return u.href;
}
