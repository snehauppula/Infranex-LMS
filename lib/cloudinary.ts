/**
 * Build a static JPG URL from a Cloudinary *video* delivery URL (first frame).
 * @see https://cloudinary.com/documentation/video_manipulation#generating_a_thumbnail_from_a_video
 */
export function cloudinaryVideoThumbnailUrl(videoUrl: string): string | null {
  try {
    const u = new URL(videoUrl);
    if (!u.hostname.endsWith("cloudinary.com")) return null;
    const uploadMarker = "/video/upload/";
    if (!u.pathname.includes(uploadMarker)) return null;

    const noHash = videoUrl.split("#")[0];
    const queryIdx = noHash.indexOf("?");
    const pathPart = queryIdx === -1 ? noHash : noHash.slice(0, queryIdx);
    const query = queryIdx === -1 ? "" : noHash.slice(queryIdx);

    if (!pathPart.toLowerCase().endsWith(".mp4")) return null;

    const baseNoExt = pathPart.slice(0, -".mp4".length);
    const idx = baseNoExt.indexOf(uploadMarker);
    if (idx === -1) return null;

    const prefix = baseNoExt.slice(0, idx + uploadMarker.length);
    const afterUpload = baseNoExt.slice(idx + uploadMarker.length);
    return `${prefix}so_0/${afterUpload}.jpg${query}`;
  } catch {
    return null;
  }
}
