"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={cn("shrink-0", className)}
      onClick={async () => {
        const supabase = createClient();
        if (!supabase) {
          toast.error("Supabase is not configured");
          return;
        }
        await supabase.auth.signOut();
        toast.success("Signed out");
        router.push("/");
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
}
