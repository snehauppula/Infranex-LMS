-- Admin course CRUD (RLS). Applied via Supabase MCP on remote project.

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
