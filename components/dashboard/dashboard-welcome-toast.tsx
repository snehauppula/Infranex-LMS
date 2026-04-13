"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "infranex-dashboard-welcome-toast";

export function DashboardWelcomeToast({ firstName }: { firstName: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
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
      icon: <Sparkles className="h-4 w-4 text-primary" aria-hidden />,
      classNames: {
        toast: "border-border bg-card shadow-md",
        title: "font-semibold text-deep",
        description: "text-muted leading-snug",
      },
    });
  }, [firstName]);

  return null;
}
