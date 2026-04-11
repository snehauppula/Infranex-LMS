-- Applied via Supabase MCP (project). RLS + policies + new-user trigger.

alter table public.users enable row level security;
alter table public.students enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;

create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

create policy "students_select_own" on public.students
  for select using (auth.uid() = user_id);

create policy "students_insert_own" on public.students
  for insert with check (auth.uid() = user_id);

create policy "students_update_own" on public.students
  for update using (auth.uid() = user_id);

create policy "courses_select_all" on public.courses for select using (true);

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
  for update using (
    exists (
      select 1 from public.students s
      where s.id = enrollments.student_id and s.user_id = auth.uid()
    )
  );

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
