-- Generic HTTPS video URL (Cloudinary, MEGA CDN, self-hosted, etc.)
alter table public.courses rename column cloudinary_url to video_url;
