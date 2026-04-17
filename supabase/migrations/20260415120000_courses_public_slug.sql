-- Short public URL segment for course pages (canonical: /courses/:slug). UUID remains primary key.

alter table public.courses add column if not exists slug text;

-- Stable, readable slugs for shipped catalog rows
update public.courses set slug = 'applied-ml' where id = '00000000-0000-4000-8000-000000000011';
update public.courses set slug = 'data-science' where id = '00000000-0000-4000-8000-000000000012';
update public.courses set slug = 'cloud-infra' where id = '11111111-1111-4111-8111-111111111101';
update public.courses set slug = 'security-eng' where id = '11111111-1111-4111-8111-111111111102';
update public.courses set slug = 'data-pipelines' where id = '11111111-1111-4111-8111-111111111103';

-- Any other rows: deterministic short slug from id
update public.courses
set slug = 'c-' || left(md5(id::text), 8)
where slug is null or btrim(slug) = '';

create unique index if not exists courses_slug_unique on public.courses (slug);

create or replace function public.courses_normalize_slug()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' and (new.slug is null or btrim(new.slug) = '') then
    new.slug := 'c-' || left(md5(coalesce(new.id::text, gen_random_uuid()::text)), 8);
  end if;
  if new.slug is not null then
    new.slug := lower(btrim(new.slug));
  end if;
  return new;
end;
$$;

drop trigger if exists courses_normalize_slug on public.courses;
create trigger courses_normalize_slug
  before insert or update on public.courses
  for each row
  execute function public.courses_normalize_slug();

alter table public.courses alter column slug set not null;

comment on column public.courses.slug is 'URL segment for /courses/:slug; unique, lowercase.';
