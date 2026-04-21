"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CourseCheckout({
  courseId,
  courseSlug,
  title,
  enrolled = false,
  couponCode,
}: {
  courseId: string;
  /** Canonical slug for post-checkout celebration page. */
  courseSlug: string;
  title: string;
  /** When true, payment is hidden and learner can jump to the player. */
  enrolled?: boolean;
  couponCode?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const pay = useCallback(async () => {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      toast.error("Razorpay is not configured");
      return;
    }
    setBusy(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay");
      }

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, couponCode }),
      });
      const data = (await res.json()) as {
        orderId?: string;
        currency?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "Order failed");

      const options = {
        key,
        currency: data.currency ?? "INR",
        name: "Infranex Technologies Pvt Ltd",
        description: title,
        order_id: data.orderId,
        modal: {
          ondismiss: () => setBusy(false),
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verify = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId,
                couponCode,
              }),
            });
            const v = (await verify.json()) as { ok?: boolean; error?: string };
            if (!verify.ok || !v.ok) {
              toast.error(v.error ?? "Verification failed");
              setBusy(false);
              return;
            }
            setBusy(false);
            router.refresh();
            router.push(`/courses/${courseSlug}/success`);
          } catch {
            toast.error("Could not confirm payment. Contact support if you were charged.");
            setBusy(false);
          }
        },
        theme: { color: "#00AEEF" },
      };

      const rz = new window.Razorpay(options);
      rz.open();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Payment failed");
      setBusy(false);
    }
  }, [couponCode, courseId, courseSlug, router, title]);

  if (enrolled) {
    return (
      <Button
        asChild
        className="h-11 w-full rounded-xl text-[15px] font-semibold shadow-md shadow-primary/20"
      >
        <Link href="/dashboard">View on dashboard</Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className="mt-4 w-full"
      disabled={busy}
      onClick={() => void pay()}
    >
      {busy ? "Preparing checkout…" : "Pay with Razorpay"}
    </Button>
  );
}
