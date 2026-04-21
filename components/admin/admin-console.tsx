"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { AdminCourseRow, AdminStudentRow } from "@/services/admin";
import { adminDeleteUser, revalidateAdminPage } from "@/app/admin/actions";
import { RefreshCw, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type Tab = "students" | "courses";

function avg(nums: number[]) {
  if (!nums.length) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export function AdminConsole({
  students,
  courses,
  serviceRoleConfigured,
}: {
  students: AdminStudentRow[];
  courses: AdminCourseRow[];
  /** When false, list reads use the signed-in JWT; set `SUPABASE_SERVICE_ROLE_KEY` for reliable full-table access. */
  serviceRoleConfigured: boolean;
}) {
  const [tab, setTab] = useState<Tab>("students");
  const [qStudent, setQStudent] = useState("");
  const [qCourse, setQCourse] = useState("");

  const totalEnrollments = useMemo(
    () =>
      students.reduce((n, s) => n + (s.enrollments?.length ?? 0), 0),
    [students]
  );

  const filteredStudents = useMemo(() => {
    const t = qStudent.trim().toLowerCase();
    if (!t) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(t) ||
        (s.email ?? "").toLowerCase().includes(t)
    );
  }, [students, qStudent]);

  const filteredCourses = useMemo(() => {
    const t = qCourse.trim().toLowerCase();
    if (!t) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(t));
  }, [courses, qCourse]);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {!serviceRoleConfigured ? (
          <div
            className="mb-8 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 shadow-sm"
            role="status"
          >
            <p className="font-medium">Configure the service role key</p>
            <p className="mt-1 text-amber-900/85">
              Set <code className="rounded bg-white/80 px-1 py-0.5 text-xs">SUPABASE_SERVICE_ROLE_KEY</code> in{" "}
              <code className="rounded bg-white/80 px-1 py-0.5 text-xs">.env.local</code> (server only). Without it,
              admin lists rely on your session and RLS — you need{" "}
              <span className="font-medium">public.users.role = &apos;admin&apos;</span> for your user, not only App
              Metadata.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              Admin insights
            </h1>
            <p className="mt-2 max-w-2xl text-muted">
              Live data from Supabase: learners, catalog, and seats. Search to narrow lists.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <form action={revalidateAdminPage}>
              <Button type="submit" variant="outline" size="sm">
                <RefreshCw className="text-primary" aria-hidden />
                Refresh data
              </Button>
            </form>
            <div className="flex gap-2 rounded-xl border border-border bg-white p-1 shadow-sm">
            <Button
              type="button"
              size="sm"
              variant={tab === "students" ? "default" : "ghost"}
              className="rounded-lg"
              onClick={() => setTab("students")}
            >
              Students
            </Button>
            <Button
              type="button"
              size="sm"
              variant={tab === "courses" ? "default" : "ghost"}
              className="rounded-lg"
              onClick={() => setTab("courses")}
            >
              Courses
            </Button>
          </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <MetricCard label="Learners" value={String(students.length)} />
          <MetricCard label="Catalog courses" value={String(courses.length)} />
          <MetricCard label="Enrollments" value={String(totalEnrollments)} />
        </div>

        {tab === "students" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            <div className="max-w-md">
              <Input
                value={qStudent}
                onChange={(e) => setQStudent(e.target.value)}
                placeholder="Search by student name or email…"
                aria-label="Search students"
              />
            </div>
            {filteredStudents.length === 0 ? (
              <Empty
                label={
                  students.length === 0 && !qStudent.trim()
                    ? "No learners yet — enrollments will appear here after students sign up and buy courses."
                    : "No students match your search."
                }
              />
            ) : (
              <div className="grid gap-4">
                {filteredStudents.map((s) => {
                  const progresses =
                    s.enrollments?.map((e) => e.progress) ?? [];
                  const completed =
                    s.enrollments?.filter((e) => e.status === "completed")
                      .length ?? 0;
                  return (
                    <Card key={s.id}>
                      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <CardTitle>{s.name}</CardTitle>
                          <p className="mt-1 text-sm text-muted">{s.email}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <StatPill
                            label="Avg progress"
                            value={`${avg(progresses)}%`}
                          />
                          <StatPill
                            label="Completed"
                            value={`${completed}/${s.enrollments?.length ?? 0}`}
                          />

                          <form
                            action={adminDeleteUser}
                            onSubmit={(e) => {
                              if (!serviceRoleConfigured) return;
                              const ok = window.confirm(
                                `Delete ${s.name} (${s.email ?? "no email"})?\n\nThis permanently removes the user in Supabase Auth and cascades their profile/enrollments.`
                              );
                              if (!ok) e.preventDefault();
                            }}
                            className="ml-auto"
                          >
                            <input type="hidden" name="userId" value={s.user_id} />
                            <Button
                              type="submit"
                              size="sm"
                              variant="destructive"
                              disabled={!serviceRoleConfigured}
                              title={
                                serviceRoleConfigured
                                  ? "Delete user"
                                  : "Set SUPABASE_SERVICE_ROLE_KEY to enable deletes"
                              }
                            >
                              Delete user
                            </Button>
                          </form>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="divide-y divide-border rounded-xl border border-border">
                          {(s.enrollments ?? []).length === 0 ? (
                            <p className="p-4 text-sm text-muted">
                              No enrollments yet.
                            </p>
                          ) : (
                            (s.enrollments ?? []).map((e) => (
                              <div
                                key={e.id}
                                className="flex flex-wrap items-center justify-between gap-3 p-4"
                              >
                                <div>
                                  <p className="text-sm font-medium text-deep">
                                    {e.course.title}
                                  </p>
                                  <p className="text-xs capitalize text-muted">
                                    {e.status}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  {e.purchase_source === "coupon" ? (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.10] px-2 py-1 text-[11px] font-semibold text-deep">
                                      <Tag className="h-3.5 w-3.5 text-primary" aria-hidden />
                                      Free
                                    </span>
                                  ) : null}
                                  <div className="text-sm font-semibold text-primary">
                                    {e.progress}%
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 space-y-6"
          >
            <div className="max-w-md">
              <Input
                value={qCourse}
                onChange={(e) => setQCourse(e.target.value)}
                placeholder="Search courses…"
                aria-label="Search courses"
              />
            </div>
            {filteredCourses.length === 0 ? (
              <Empty
                label={
                  courses.length === 0 && !qCourse.trim()
                    ? "No courses in the database — add rows in Supabase or use the seed migration."
                    : "No courses match your search."
                }
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredCourses.map((c) => {
                  const progresses =
                    c.enrollments?.map((e) => e.progress) ?? [];
                  return (
                    <Card key={c.id}>
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{c.title}</CardTitle>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <StatPill
                            label="Enrollments"
                            value={`${c.enrollments?.length ?? 0}`}
                          />
                          <StatPill
                            label="Avg progress"
                            value={`${avg(progresses)}%`}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="max-h-48 space-y-2 overflow-auto pr-1">
                          {(c.enrollments ?? []).map((e) => (
                            <div
                              key={e.id}
                              className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-background px-3 py-2 text-sm"
                            >
                              <div className="min-w-0">
                                <p className="truncate font-medium text-deep">
                                  {e.studentName}
                                </p>
                                <p className="text-xs capitalize text-muted">
                                  {e.status}
                                </p>
                              </div>
                              {e.purchase_source === "coupon" ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.10] px-2 py-1 text-[11px] font-semibold text-deep">
                                  <Tag className="h-3.5 w-3.5 text-primary" aria-hidden />
                                  Free
                                </span>
                              ) : null}
                              <span className="shrink-0 font-semibold text-primary tabular-nums">
                                {e.progress}%
                              </span>
                            </div>
                          ))}
                          {(c.enrollments ?? []).length === 0 && (
                            <p className="text-sm text-muted">No seats yet.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white px-4 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-deep">{value}</p>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-deep sm:gap-2 sm:px-3 sm:text-sm">
      <span className="truncate text-muted">{label}</span>
      <span className="shrink-0 tabular-nums">{value}</span>
    </span>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-white/70 px-6 py-14 text-center text-sm text-muted">
      {label}
    </div>
  );
}
