"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManualCourseComplete({
  courseId,
  initialProgress,
}: {
  courseId: string;
  /** Last known 0–100; at 100 we show completed state */
  initialProgress: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const done = initialProgress >= 100;

  if (done) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-600/20 bg-emerald-600/[0.07] px-4 py-3 text-left text-sm text-deep">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
        <div>
          <p className="font-semibold text-deep">Course complete</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            You marked this course finished. Progress stays at 100%.
          </p>
        </div>
      </div>
    );
  }

  async function markComplete() {
    setBusy(true);
    try {
      const res = await fetch("/api/enrollments/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, progress: 100 }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not update progress");
        return;
      }
      toast.success("Course marked complete");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs leading-relaxed text-muted">
        When you have finished the lesson, mark the course complete so your enrollment and
        dashboard show the right status.
      </p>
      <Button
        type="button"
        variant="outline"
        className="w-full border-primary/35 hover:border-primary/50"
        disabled={busy}
        aria-busy={busy}
        onClick={() => void markComplete()}
      >
        {busy ? "Saving…" : "Mark course complete"}
      </Button>
    </div>
  );
}
