-- Run in Supabase SQL Editor (postgres role).
-- Use when a user exists under Authentication but has no row in public.users
-- (UPDATE ... WHERE email = ... then affects 0 rows).
--
-- 1) Change the email in BOTH places below, then run the whole script.

/* ============ edit this email only ============ */
-- snehauppula23@gmail.com

-- 2) Upsert public.users from auth (creates row or forces admin + fresh email)
insert into public.users (id, email, role)
select a.id, a.email, 'admin'
from auth.users a
where lower(a.email) = lower('snehauppula23@gmail.com')
on conflict (id) do update set
  email = excluded.email,
  role = 'admin';

-- 3) Ensure public.students row (required by enrollments / LMS)
insert into public.students (user_id, name)
select
  u.id,
  coalesce(
    nullif(trim(au.raw_user_meta_data->>'full_name'), ''),
    nullif(trim(au.raw_user_meta_data->>'name'), ''),
    split_part(u.email, '@', 1)
  )
from public.users u
join auth.users au on au.id = u.id
where lower(u.email) = lower('snehauppula23@gmail.com')
  and not exists (select 1 from public.students s where s.user_id = u.id)
on conflict (user_id) do nothing;

-- 4) Verify
select u.id, u.email, u.role, s.id as student_id
from public.users u
left join public.students s on s.user_id = u.id
where lower(u.email) = lower('snehauppula23@gmail.com');
