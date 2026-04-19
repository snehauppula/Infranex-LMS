"use client";

import Image from "next/image";
import { INFRANEX_DOMAINS } from "@/lib/infranex-domains";

const tileClassName =
  "group flex w-[min(280px,88vw)] shrink-0 flex-col rounded-2xl border border-border bg-card shadow-sm transition-[box-shadow,transform,border-color] duration-300 ease-brand-out motion-reduce:duration-150 hover:-translate-y-0.5 hover:shadow-md sm:w-[min(292px,82vw)] sm:rounded-3xl";

function DomainTile({
  d,
  ariaHidden,
}: {
  d: (typeof INFRANEX_DOMAINS)[number];
  ariaHidden?: boolean;
}) {
  const Icon = d.icon;
  if (d.imageSrc) {
    return (
      <article
        aria-hidden={ariaHidden}
        className={`${tileClassName} overflow-hidden`}
      >
        <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={d.imageSrc}
            alt=""
            fill
            className="object-cover transition-[transform] duration-500 ease-brand-out motion-reduce:transition-none group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 88vw, 292px"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90"
            aria-hidden
          />
        </div>
        <div className="flex flex-col p-5 sm:p-6">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-deep">
            {d.label}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">
            {d.blurb}
          </p>
        </div>
      </article>
    );
  }
  return (
    <article
      aria-hidden={ariaHidden}
      className={`${tileClassName} p-5 sm:p-6`}
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
      className="relative mt-9 w-full overflow-hidden py-3 sm:mt-10"
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
