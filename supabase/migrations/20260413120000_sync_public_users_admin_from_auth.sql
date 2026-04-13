-- Sync LMS admin: copy role from Auth app metadata into public.users, and
-- backfill public.users + public.students when an auth user exists but the
-- trigger never created a profile (common with some OAuth flows).
--
-- Apply with: supabase db push / migration run, or paste into SQL Editor.

-- 1) Existing rows: set admin when Auth app metadata says admin
update public.users u
set role = 'admin'
from auth.users a
where a.id = u.id
  and lower(trim(coalesce(a.raw_app_meta_data->>'role', ''))) = 'admin';

-- 2) Missing public.users: insert admin profile for auth users with admin in app metadata
insert into public.users (id, email, role)
select
  a.id,
  coalesce(nullif(trim(a.email), ''), a.id::text || '@unknown.local'),
  'admin'
from auth.users a
where lower(trim(coalesce(a.raw_app_meta_data->>'role', ''))) = 'admin'
  and not exists (select 1 from public.users u where u.id = a.id)
on conflict (id) do nothing;

-- 3) Missing public.students: mirror handle_new_user() for any user without a student row
insert into public.students (user_id, name)
select
  u.id,
  coalesce(
    nullif(trim(a.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(a.raw_user_meta_data->>'name'), ''),
    split_part(u.email, '@', 1)
  )
from public.users u
join auth.users a on a.id = u.id
where not exists (select 1 from public.students s where s.user_id = u.id)
on conflict (user_id) do nothing;
