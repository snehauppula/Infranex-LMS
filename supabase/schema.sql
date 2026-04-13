-- Infranex LMS — canonical schema (see also supabase/migrations/*).
-- Remote project: applied via Supabase MCP migrations + optional seed.
-- Links public.users.id to auth.users.id

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'student' check (role in ('student', 'admin'))
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null
);

create unique index if not exists students_user_id_key on public.students (user_id);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  duration text,
  price integer not null default 0,
  cloudinary_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  unique (student_id, course_id)
);

alter table public.users enable row level security;
alter table public.students enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;

-- Users: read own row
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- Students
create policy "students_select_own" on public.students
  for select using (auth.uid() = user_id);

create policy "students_insert_own" on public.students
  for insert with check (auth.uid() = user_id);

create policy "students_update_own" on public.students
  for update using (auth.uid() = user_id);

-- Courses: public read
create policy "courses_select_all" on public.courses for select using (true);

-- Enrollments: own student rows
create policy "enrollments_select_own" on public.enrollments
  for select using (
    exists (
      select 1 from public.students s
      where s.id = enrollments.student_id and s.user_id = auth.uid()
    )
  );

create policy "enrollments_insert_own" on public.enrollments
  for insert with check (
    exists (
      select 1 from public.students s
      where s.id = enrollments.student_id and s.user_id = auth.uid()
    )
  );

create policy "enrollments_update_own" on public.enrollments
  for update
  using (
    exists (
      select 1 from public.students s
      where s.id = enrollments.student_id and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.students s
      where s.id = enrollments.student_id and s.user_id = auth.uid()
    )
  );

-- Admin read paths (dashboard analytics)
create policy "admin_users_select" on public.users
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

create policy "admin_students_select" on public.students
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

create policy "admin_enrollments_select" on public.enrollments
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- Admin: manage catalog (optional; mirrors migration infranex_admin_course_mutations)
create policy "admin_courses_insert" on public.courses
  for insert with check (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

create policy "admin_courses_update" on public.courses
  for update using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

create policy "admin_courses_delete" on public.courses
  for delete using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );

-- Service role bypasses RLS for server-side payment enrollment

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, role)
  values (new.id, new.email, 'student')
  on conflict (id) do nothing;

  insert into public.students (user_id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
