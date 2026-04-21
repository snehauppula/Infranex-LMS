"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Check, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseCheckout } from "@/components/checkout/course-checkout";

const COUPON_CODE = "INFRANEX100";

function formatInrPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function CoursePurchasePanel({
  courseId,
  courseSlug,
  title,
  basePricePaise,
  signedIn,
}: {
  courseId: string;
  courseSlug: string;
  title: string;
  basePricePaise: number;
  signedIn: boolean;
}) {
  const [coupon, setCoupon] = useState("");
  const [busy, setBusy] = useState(false);

  const normalized = useMemo(() => coupon.trim().toUpperCase(), [coupon]);
  const couponApplied = normalized === COUPON_CODE;
  const showInvalid = signedIn && normalized.length > 0 && !couponApplied;
  const effectivePrice = couponApplied ? 0 : basePricePaise;

  async function enrollFree() {
    setBusy(true);
    try {
      const res = await fetch("/api/enroll/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, couponCode: normalized }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Could not enroll");
      }
      window.location.href = `/courses/${courseSlug}/success`;
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not enroll");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 shadow-sm ring-1 ring-deep/[0.03] sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Tuition
        </p>
        <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-2">
          <p className="text-4xl font-bold tabular-nums tracking-tight text-primary sm:text-[2.65rem] sm:leading-none">
            {formatInrPaise(effectivePrice)}
          </p>
          {couponApplied ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.10] px-2.5 py-1 text-xs font-semibold text-deep">
              <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
              Coupon applied
            </span>
          ) : null}
        </div>
        <p className="mt-2 max-w-md text-sm text-muted">
          One-time payment in INR. Secure checkout — enrollment unlocks immediately.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
          <div className="w-full sm:flex-1">
            <div
              className={[
                "flex h-11 w-full items-center gap-2 rounded-xl border bg-background/70 px-3 shadow-sm backdrop-blur-sm",
                "transition-[border-color,box-shadow,background-color] duration-300 ease-brand-out motion-reduce:duration-150",
                couponApplied
                  ? "border-primary/40 ring-2 ring-primary/15"
                  : showInvalid
                    ? "border-red-500/35 ring-2 ring-red-500/10"
                    : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25",
                !signedIn ? "opacity-90" : "",
              ].join(" ")}
            >
              <Tag className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                aria-label="Coupon code"
                className="h-10 border-0 bg-transparent px-0 shadow-none ring-0 focus-visible:ring-0"
                disabled={busy || !signedIn}
                autoComplete="off"
                spellCheck={false}
              />
              {showInvalid ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Invalid
                </span>
              ) : null}
            </div>
          </div>

          {!signedIn ? (
            <Button asChild className="h-11 w-full sm:w-auto sm:min-w-[12rem]">
              <Link href="/auth">Sign in to enroll</Link>
            </Button>
          ) : couponApplied ? (
            <Button
              type="button"
              className="h-11 w-full sm:w-auto sm:min-w-[12rem] shadow-md shadow-primary/15"
              disabled={busy}
              onClick={() => void enrollFree()}
            >
              {busy ? "Enrolling…" : "Enroll free"}
            </Button>
          ) : (
            <div className="w-full sm:w-auto sm:min-w-[12rem]">
              <CourseCheckout
                courseId={courseId}
                courseSlug={courseSlug}
                title={title}
                couponCode={normalized || undefined}
              />
            </div>
          )}
        </div>

        {!signedIn ? (
          <p className="text-xs text-muted">Sign in to apply coupons and enroll.</p>
        ) : couponApplied ? (
          <p className="text-xs text-muted">
            Discount code accepted — your total is now{" "}
            <span className="font-semibold text-deep">₹0</span>.
          </p>
        ) : showInvalid ? (
          <p className="text-xs text-muted">That code doesn’t match. Check spelling and try again.</p>
        ) : null}
      </div>
    </div>
  );
}

