/**
 * Single brand image for the whole app (navbar, footer, auth, favicon, etc.).
 * Source file: `public/brand/infranex.png`
 */
export const BRAND_IMAGE_SRC = "/brand/infranex.png";

/**
 * Bump this when replacing `public/brand/infranex.png` so browsers/CDNs don't keep
 * serving a stale cached asset at the same URL.
 */
export const BRAND_IMAGE_VERSION = "20260419";

/** Use this for `next/image` `src` + metadata icons (cache-safe). */
export const BRAND_IMAGE_URL = `${BRAND_IMAGE_SRC}?v=${BRAND_IMAGE_VERSION}`;

/** Intrinsic dimensions for `next/image` (tight-cropped lockup); layout uses object-contain. */
export const BRAND_IMAGE_WIDTH = 805;
export const BRAND_IMAGE_HEIGHT = 237;
