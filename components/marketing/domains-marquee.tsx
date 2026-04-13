"use client";

import { INFRANEX_DOMAINS } from "@/lib/infranex-domains";

function DomainTile({
  d,
  ariaHidden,
}: {
  d: (typeof INFRANEX_DOMAINS)[number];
  ariaHidden?: boolean;
}) {
  const Icon = d.icon;
  return (
    <article
      aria-hidden={ariaHidden}
      className="group flex w-[min(280px,88vw)] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-[min(292px,82vw)] sm:rounded-3xl sm:p-6"
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-primary"
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </div>
      <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-deep">
        {d.label}
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">
        {d.blurb}
      </p>
    </article>
  );
}

export function DomainsMarquee() {
  const items = INFRANEX_DOMAINS;

  return (
    <div
      className="relative mt-14 w-full overflow-hidden py-4"
      aria-label="Learning domains"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background to-transparent sm:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background to-transparent sm:w-32"
        aria-hidden
      />

      <div className="domains-marquee-track gap-5">
        {items.map((d) => (
          <DomainTile key={d.slug} d={d} />
        ))}
        {items.map((d) => (
          <DomainTile key={`${d.slug}-dup`} d={d} ariaHidden />
        ))}
      </div>
    </div>
  );
}
