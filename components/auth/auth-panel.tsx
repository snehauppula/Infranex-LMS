"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DURATION, transitionEase, transitionSpring } from "@/lib/motion";

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

/** Supabase often returns in under ~100ms — keep the loading pill visible so it feels intentional. */
const MIN_AUTH_UI_MS = 980;

async function ensureMinAuthUiVisible(startedAt: number) {
  const remaining = MIN_AUTH_UI_MS - (Date.now() - startedAt);
  if (remaining > 0) {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, remaining);
    });
  }
}

const modes = [
  { id: "signin" as const, label: "Sign in" },
  { id: "signup" as const, label: "Create account" },
];

export function AuthPanel({ authError }: { authError?: string }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const progressTickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function submit() {
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase is not configured");
      return;
    }
    setLoading(true);
    setLoadingProgress(8);
    const uiStartedAt = Date.now();
    progressTickRef.current = setInterval(() => {
      setLoadingProgress((p) => {
        if (p >= 88) return p;
        return Math.min(88, p + 2 + Math.floor(Math.random() * 7));
      });
    }, 120);
    /** When true, skip resetting `loading` in `finally` so the pill stays up until navigation unmounts (avoids a 1-frame Sign in button flash). */
    let holdLoadingUntilRouteChange = false;
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

        if (data.session) {
          await ensureMinAuthUiVisible(uiStartedAt);
          setLoadingProgress(100);
          await new Promise<void>((r) => {
            window.setTimeout(r, 160);
          });
          toast.success("Welcome — your account is ready.");
          holdLoadingUntilRouteChange = true;
          router.push("/dashboard");
          router.refresh();
          return;
        }

        const identities = data.user?.identities ?? [];
        if (data.user && identities.length === 0) {
          toast.message(
            "This email is already registered. Try signing in instead.",
            { duration: 7000 }
          );
          return;
        }

        await ensureMinAuthUiVisible(uiStartedAt);
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        await ensureMinAuthUiVisible(uiStartedAt);
        setLoadingProgress(100);
        await new Promise<void>((r) => {
          window.setTimeout(r, 160);
        });
        holdLoadingUntilRouteChange = true;
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
      if (progressTickRef.current != null) {
        clearInterval(progressTickRef.current);
        progressTickRef.current = null;
      }
      if (!holdLoadingUntilRouteChange) {
        setLoadingProgress(0);
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex w-full max-w-md min-w-0 flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:gap-6 sm:p-8">
      {authError ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {safeDecodeParam(authError)}
        </div>
      ) : null}

      {/* Segmented control: explicit choices, not a “toggle switch” metaphor */}
      <LayoutGroup id="auth-mode">
        <div
          className="relative rounded-full border border-border bg-surface p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
          role="tablist"
          aria-label="How do you want to continue?"
        >
          <div className="grid grid-cols-2 gap-0.5">
            {modes.map((m) => {
              const selected = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`auth-tab-${m.id}`}
                  aria-selected={selected}
                  aria-controls="auth-form-panel"
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "relative rounded-full py-2.5 text-center text-sm font-semibold tracking-tight outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                    selected ? "text-deep" : "text-muted hover:text-deep/90"
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="auth-mode-indicator"
                      className="absolute inset-0 rounded-full bg-card shadow-sm ring-1 ring-border"
                      aria-hidden
                      transition={transitionSpring(reduceMotion)}
                    />
                  ) : null}
                  <span className="relative z-10">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          id="auth-form-panel"
          role="tabpanel"
          aria-labelledby={`auth-tab-${mode}`}
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={transitionEase(DURATION.sm, reduceMotion)}
          className="flex flex-col gap-2"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-deep">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p className="text-sm leading-relaxed text-muted">
            {mode === "signin"
              ? "Use the email and password for your Infranex account to open your courses and progress."
              : "Choose an email and password. You’ll use them each time you return to keep learning."}
          </p>
        </motion.div>
      </AnimatePresence>

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
            disabled={loading}
            className="bg-surface/60 transition-[border-color,box-shadow,background-color] duration-200 ease-out focus-visible:bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className="bg-surface/60 pr-11 transition-[border-color,box-shadow,background-color] duration-200 ease-out focus-visible:bg-white"
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted outline-none transition-colors hover:bg-white/90 hover:text-deep focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none disabled:opacity-40"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <Eye className="h-4 w-4 shrink-0" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-valuetext={
            mode === "signin"
              ? "Signing in, please wait"
              : "Creating your account, please wait"
          }
          className="flex h-12 w-full items-center gap-3 rounded-2xl bg-[#05162e] px-4 text-white shadow-[0_14px_36px_-14px_rgba(5,22,46,0.65)] ring-1 ring-white/12 sm:h-[3.25rem] sm:rounded-full sm:px-5"
        >
          <span className="shrink-0 text-sm font-semibold tracking-tight text-white">
            {mode === "signin" ? "Signing in" : "Creating account"}
          </span>
          <div className="relative h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/14 ring-1 ring-white/10">
            {reduceMotion ? (
              <div
                className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary via-sky-200 to-primary opacity-95 shadow-[0_0_18px_rgba(0,174,239,0.55)]"
                aria-hidden
              />
            ) : (
              <motion.div
                className="absolute inset-y-0 w-[40%] rounded-full bg-gradient-to-r from-primary via-cyan-100 to-primary shadow-[0_0_18px_rgba(0,174,239,0.7),0_0_28px_rgba(0,174,239,0.25)]"
                aria-hidden
                initial={false}
                animate={{ left: ["-42%", "108%"] }}
                transition={{
                  duration: 1.45,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>
          <span className="shrink-0 tabular-nums text-sm font-semibold text-white/90">
            {loadingProgress}%
          </span>
        </div>
      ) : (
        <Button
          type="button"
          className="w-full"
          disabled={loading}
          onClick={() => void submit()}
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </Button>
      )}
      <p className="text-center text-xs leading-relaxed text-muted">
        <Link
          href="/"
          className="font-medium text-muted underline-offset-4 outline-none transition-colors hover:text-deep focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
