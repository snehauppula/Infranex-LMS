"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  ALUMNI_EMPLOYER_LOGOS,
  type AlumniEmployerLogo,
} from "@/lib/alumni-employers";

function EmployerLogoTile({
  item,
  ariaHidden,
}: {
  item: AlumniEmployerLogo;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex h-[5rem] w-[min(11rem,34vw)] shrink-0 flex-col rounded-2xl border border-white/[0.14] bg-zinc-50 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] sm:h-[5.25rem] sm:w-[11.5rem]"
    >
      {/* Neutral tile so white/light logos stay visible; fill scales art to the tile */}
      <div className="relative min-h-0 min-w-0 flex-1 px-3 py-2.5 sm:px-4 sm:py-3">
        <Image
          src={item.src}
          alt={ariaHidden ? "" : `${item.name} logo`}
          fill
          className="object-contain object-center p-0.5"
          sizes="(max-width: 640px) 34vw, 184px"
        />
      </div>
    </div>
  );
}

export function AlumniSuccessSection() {
  const items = ALUMNI_EMPLOYER_LOGOS;

  return (
    <section className="relative border-b border-border bg-gradient-to-b from-background via-surface to-background py-12 sm:py-16">
      <Container className="relative z-10 max-w-[1360px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-deep px-5 py-10 shadow-[0_32px_90px_-48px_rgba(8,28,61,0.65)] sm:rounded-[1.75rem] sm:px-10 sm:py-12"
        >
          <div
            className="pointer-events-none absolute -left-24 top-0 h-52 w-52 rounded-full bg-primary/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 right-[-3rem] h-60 w-60 rounded-full bg-primary/[0.12] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />

          <h2 className="relative mx-auto max-w-[22rem] text-center text-xl font-bold leading-snug tracking-tight text-white sm:max-w-xl sm:text-2xl md:text-[1.7rem] md:leading-[1.2]">
            Celebrating success
            <br />
            <span className="font-semibold text-white/80">of our alumni</span>
          </h2>

          <div
            className="relative mt-10 w-full overflow-hidden py-2 sm:mt-11"
            aria-label="Companies where alumni work"
          >
            {/* Narrow fades — wide overlays were hiding logos on the entering/exiting tiles */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-deep to-transparent sm:w-14"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-deep to-transparent sm:w-14"
              aria-hidden
            />

            <div className="domains-marquee-track alumni-marquee-track gap-6 sm:gap-8">
              {items.map((item) => (
                <EmployerLogoTile key={item.name} item={item} />
              ))}
              {items.map((item) => (
                <EmployerLogoTile
                  key={`${item.name}-dup`}
                  item={item}
                  ariaHidden
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
