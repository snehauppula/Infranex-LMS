"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function signOutAndRedirect(router: ReturnType<typeof useRouter>) {
  const supabase = createClient();
  if (!supabase) {
    toast.error("Supabase is not configured");
    return;
  }
  await supabase.auth.signOut();
  toast.success("Signed out");
  router.push("/");
  router.refresh();
}

export function SignOutButton({
  className,
  appearance = "default",
}: {
  className?: string;
  /** Inline icon beside profile; default is a labeled control */
  appearance?: "default" | "icon";
}) {
  const router = useRouter();

  if (appearance === "icon") {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 shrink-0 rounded-full text-muted hover:bg-primary/[0.08] hover:text-deep",
          className
        )}
        aria-label="Sign out"
        onClick={() => void signOutAndRedirect(router)}
      >
        <LogOut className="h-4 w-4" strokeWidth={2.25} />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={cn("shrink-0", className)}
      onClick={() => void signOutAndRedirect(router)}
    >
      Sign out
    </Button>
  );
}
