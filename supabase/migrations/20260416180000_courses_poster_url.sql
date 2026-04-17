-- Optional catalog / preview image when `video_url` is not Cloudinary (e.g. MEGA embed).
alter table public.courses add column if not exists poster_url text;
