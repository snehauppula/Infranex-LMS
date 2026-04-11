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
      <div className="hidden min-w-0 flex-col justify-center rounded-3xl border border-border/80 bg-gradient-to-br from-deep via-[#0b2a5c] to-deep p-8 text-white shadow-[0_28px_80px_-24px_rgba(0,174,239,0.35)] sm:p-10 lg:flex">
        <div className="flex w-full min-w-0 items-center justify-center rounded-2xl border border-white/25 bg-white px-5 py-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] sm:px-10 sm:py-14">
          <AuthHeroLogo priority variant="desktop" />
        </div>
        <h2 className="mt-8 text-3xl font-semibold leading-tight tracking-tight sm:mt-10 sm:text-4xl">
          Calm learning.
          <br />
          <span className="text-primary">Serious outcomes.</span>
        </h2>
      </div>
      <div className="flex min-w-0 flex-col items-center justify-center">
        <div className="mb-6 flex w-full max-w-md min-w-0 items-center justify-center rounded-2xl border border-border bg-white px-5 py-8 shadow-[0_18px_50px_-20px_rgba(10,31,68,0.15)] sm:mb-8 sm:px-6 sm:py-10 lg:hidden">
          <AuthHeroLogo priority variant="mobile" />
        </div>
        <AuthPanel authError={error} />
      </div>
    </Container>
  );
}
