import { AuthPanel } from "@/components/auth/auth-panel";
import { AuthHeroLogo } from "@/components/brand/auth-hero-logo";
import { Container } from "@/components/layout/container";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Container className="grid min-h-[calc(100dvh-0px)] min-w-0 items-stretch gap-8 py-10 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:py-20">
      <div className="relative hidden min-w-0 flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-deep p-8 text-white shadow-lg sm:p-10 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,174,239,0.1),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 flex w-full flex-col">
          <div className="flex w-full min-w-0 items-center justify-center rounded-2xl border border-white/20 bg-card px-5 py-8 shadow-sm sm:px-10 sm:py-14">
            <AuthHeroLogo priority variant="desktop" />
          </div>
          <h2 className="mt-8 text-3xl font-semibold leading-tight tracking-tight sm:mt-10 sm:text-4xl">
            Calm learning.
            <br />
            <span className="text-primary">Serious outcomes.</span>
          </h2>
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-center justify-center">
        <div className="mb-6 flex w-full max-w-md min-w-0 items-center justify-center rounded-2xl border border-border bg-card px-5 py-8 shadow-sm sm:mb-8 sm:px-6 sm:py-10 lg:hidden">
          <AuthHeroLogo priority variant="mobile" />
        </div>
        <AuthPanel authError={error} />
      </div>
    </Container>
  );
}
