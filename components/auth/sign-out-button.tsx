"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
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
