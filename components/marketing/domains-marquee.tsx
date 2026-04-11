"use client";

import { INFRANEX_DOMAINS } from "@/lib/infranex-domains";

function DomainTile({
  d,
  ariaHidden,
}: {
  d: (typeof INFRANEX_DOMAINS)[number];
  ariaHidden?: boolean;
}) {
  return (
    <article
      aria-hidden={ariaHidden}
      className="group flex w-[min(280px,88vw)] shrink-0 flex-col rounded-2xl border border-white/70 bg-white/75 p-5 shadow-[0_20px_50px_-24px_rgba(10,31,68,0.18)] ring-1 ring-deep/[0.06] backdrop-blur-xl transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_28px_60px_-18px_rgba(0,174,239,0.35)] sm:w-[min(292px,82vw)] sm:rounded-3xl sm:p-6"
    >
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-deep/10 text-2xl ring-1 ring-primary/15"
        aria-hidden
      >
        {d.emoji}
      </div>
      <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-deep">
        {d.label}
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">
        {d.blurb}
      </p>
      <span className="mt-4 inline-flex text-[11px] font-semibold uppercase tracking-wider text-primary/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore domain →
      </span>
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
