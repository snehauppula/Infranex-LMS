-- Ensure enrollment progress updates succeed under RLS (explicit WITH CHECK).

drop policy if exists "enrollments_update_own" on public.enrollments;

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
