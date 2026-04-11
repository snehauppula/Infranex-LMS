import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 py-20">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-deep sm:text-4xl">
          This page does not exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The link may be broken or the resource was removed. Head back to the
          catalog or home.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/courses">Courses</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
