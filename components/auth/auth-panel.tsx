"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function safeDecodeParam(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatAuthError(e: unknown): string {
  if (!(e instanceof Error)) return "Authentication failed";
  return e.message;
}

export function AuthPanel({ authError }: { authError?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function submit() {
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const origin =
          typeof window !== "undefined" ? window.location.origin : "";
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
          },
        });
        if (error) throw error;

        // Confirm email OFF → Supabase returns a session immediately.
        if (data.session) {
          toast.success("Welcome — your account is ready.");
          router.push("/dashboard");
          router.refresh();
          return;
        }

        // Duplicate signup: Supabase often returns a user stub with no identities (no leak).
        const identities = data.user?.identities ?? [];
        if (data.user && identities.length === 0) {
          toast.message(
            "This email is already registered. Try signing in instead.",
            { duration: 7000 }
          );
          return;
        }

        // Confirm email ON (or provider rules): no session until they verify.
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e: unknown) {
      if (e instanceof Error && /invalid api key/i.test(e.message)) {
        toast.error("Supabase API key rejected", {
          description:
            "Put your Publishable key (sb_publishable_…) or legacy anon JWT in NEXT_PUBLIC_SUPABASE_ANON_KEY, or set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Never use service_role. Match the same project as NEXT_PUBLIC_SUPABASE_URL. Save .env.local and restart npm run dev.",
          duration: 12_000,
        });
      } else {
        toast.error(formatAuthError(e));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-md min-w-0 flex-col gap-5 rounded-3xl border border-border bg-white/90 p-6 shadow-[0_22px_60px_-18px_rgba(10,31,68,0.18)] backdrop-blur-md sm:gap-6 sm:p-8">
      {authError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {safeDecodeParam(authError)}
        </div>
      ) : null}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-deep">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Access your courses, progress, and certificates in one place.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
      </div>
      <Button
        type="button"
        className="w-full"
        disabled={loading}
        onClick={() => void submit()}
      >
        {loading ? "Please wait…" : mode === "signin" ? "Continue" : "Sign up"}
      </Button>
      <p className="text-center text-sm text-muted">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setMode("signup")}
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have access?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
          </>
        )}
      </p>
      <p className="text-center text-xs text-muted">
        <Link href="/" className="hover:text-deep">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
