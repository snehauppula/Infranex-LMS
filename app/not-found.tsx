import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[min(85dvh,720px)] flex-col items-center justify-center bg-background px-4 py-16 sm:px-6 sm:py-24">
      <Container className="max-w-lg text-center">
        <div className="rounded-3xl border border-border bg-card px-6 py-10 shadow-sm ring-1 ring-deep/[0.04] sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            404
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-deep sm:text-3xl">
            This page does not exist
          </h1>
          <p className="mx-auto mt-4 text-sm leading-relaxed text-muted sm:text-base">
            The link may be broken or the page was removed. Use the buttons below
            to get back on track.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to home
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/courses">Browse courses</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
