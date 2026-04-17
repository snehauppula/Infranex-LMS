-- Optional bullet list for course detail (demo / marketing copy per course).
alter table public.courses add column if not exists highlights text[];
