"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { AdminCourseRow, AdminStudentRow } from "@/services/admin";
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
}: {
  students: AdminStudentRow[];
  courses: AdminCourseRow[];
}) {
  const [tab, setTab] = useState<Tab>("students");
  const [qStudent, setQStudent] = useState("");
  const [qCourse, setQCourse] = useState("");

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-deep sm:text-4xl">
              Admin insights
            </h1>
            <p className="mt-2 max-w-2xl text-muted">
              Search learners or courses. Metrics stay compact so you can scan
              fast.
            </p>
          </div>
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
                        <div className="flex flex-wrap gap-2 text-xs">
                          <StatPill label="Avg progress" value={`${avg(progresses)}%`} />
                          <StatPill
                            label="Completed"
                            value={`${completed}/${s.enrollments?.length ?? 0}`}
                          />
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
                                <div className="text-sm font-semibold text-primary">
                                  {e.progress}%
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
                              className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-sm"
                            >
                              <span className="text-muted">Learner seat</span>
                              <span className="font-semibold text-deep">
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
