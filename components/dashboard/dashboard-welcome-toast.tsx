"use client";

import { useEffect } from "react";
import { Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

/** Bumped when toast copy/behavior changes so users aren’t stuck behind an old session flag. */
const STORAGE_KEY = "infranex-dashboard-welcome-toast-v3";

export function DashboardWelcomeToast({
  firstName,
  isAdmin = false,
}: {
  firstName: string;
  /** When true, shows administrator copy + shield icon (same toast as learners, different message). */
  isAdmin?: boolean;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    /* Admins: show on every dashboard visit (no sessionStorage — shared key was blocking repeats). */
    if (isAdmin) {
      toast(
        firstName !== "there"
          ? `Welcome, ${firstName}`
          : "Welcome back",
        {
          description: "Admin: use the nav link.",
          duration: 8000,
          icon: (
            <Shield
              className="h-5 w-5 shrink-0 text-primary"
              strokeWidth={2}
              aria-hidden
            />
          ),
          classNames: {
            toast:
              "rounded-2xl border border-border bg-card p-3 shadow-[0_20px_50px_-28px_rgba(8,28,61,0.28)] ring-1 ring-black/[0.04]",
            title: "text-[15px] font-semibold leading-snug tracking-tight text-deep",
            description: "mt-1 text-[13px] leading-snug text-muted",
            icon: "self-start pt-0.5",
          },
        }
      );
      return;
    }

    /* Learners: once per tab session so the catalog hint isn’t noisy on every navigation. */
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");

    const title =
      firstName !== "there"
        ? `Welcome back, ${firstName}`
        : "Welcome back";

    toast(title, {
      description:
        "Head to the catalog to enroll, or jump back into a course below. Progress saves automatically across devices.",
      duration: 9000,
      icon: (
        <Sparkles
          className="h-5 w-5 shrink-0 text-primary"
          strokeWidth={2}
          aria-hidden
        />
      ),
      classNames: {
        toast:
          "rounded-2xl border border-border bg-card p-4 shadow-[0_20px_50px_-28px_rgba(8,28,61,0.28)] ring-1 ring-black/[0.04]",
        title: "text-[15px] font-semibold leading-snug tracking-tight text-deep",
        description: "mt-2 text-sm leading-relaxed text-muted",
        icon: "self-start pt-0.5",
      },
    });
  }, [firstName, isAdmin]);

  return null;
}
