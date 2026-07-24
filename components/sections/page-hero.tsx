"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ButtonLink } from "@/components/ui/button";
import HeroParticles from "@/components/sections/hero-particles";

type HeroAction = { label: string; href: string; variant?: "solid" | "outline" };
type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  aside?: ReactNode;
  image?: string;
  /** 关闭 hero 标题的拆字入场动画 */
  disableFx?: boolean;
  /** id 用于 HeroFx 客户端附加拆分动画 */
  titleId?: string;
};

export default function PageHero({
  kicker,
  title,
  description,
  actions = [],
  aside,
  image,
  disableFx,
  titleId = "page-hero-title",
}: PageHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || disableFx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const wordSpans = titleRef.current.querySelectorAll<HTMLElement>(".word");
        if (wordSpans.length > 0) {
          gsap.fromTo(
            wordSpans,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, duration: 0.95, ease: "power3.out", stagger: 0.06 }
          );
        }
      }
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.4 }
        );
      }
      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current.children,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.55 }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [disableFx, title]);

  // 将标题文本拆到 <span class="word"> 内
  const words = title.split(/(\s+)/);

  return (
    <section ref={rootRef} className="section-panel relative overflow-hidden">
      <HeroParticles count={50} color="37, 99, 235" className="pointer-events-none absolute inset-0 z-0" />
      <div className="site-shell relative min-h-[620px] py-20 sm:py-24 lg:py-0 z-[1]">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-45 [mask-image:linear-gradient(to_right,black,transparent_78%)]" />
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" aria-hidden />

        <div className="relative grid min-h-[620px] items-stretch lg:grid-cols-[1.08fr_.92fr]">
          <div className="flex flex-col justify-center py-8 pr-0 lg:border-r lg:border-blue-100 lg:pr-16">
            <div className="max-w-4xl">
              <div className="section-kicker inline-flex">{kicker}</div>
              <h1
                id={titleId}
                ref={titleRef}
                className="heading-display responsive-text mt-7 text-5xl font-semibold leading-[.94] text-slate-950 sm:text-6xl lg:text-7xl 2xl:text-8xl"
              >
                {words.map((word, index) =>
                  /^\s+$/.test(word) ? (
                    <span key={`space-${index}`}>{word}</span>
                  ) : (
                    <span key={`word-${index}`} className="word inline-block">{word}</span>
                  )
                )}
              </h1>
              <p ref={descriptionRef} className="mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>
              {actions.length ? (
                <div ref={actionsRef} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {actions.map((action) => (
                    <ButtonLink
                      key={action.href}
                      href={action.href}
                      variant={action.variant ?? "solid"}
                      size="lg"
                      className="group w-full sm:w-auto"
                    >
                      {action.label}
                    </ButtonLink>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative min-h-[320px] border-t border-blue-100 lg:min-h-0 lg:border-t-0">
            {image ? (
              <>
                <Image src={image} alt={title} fill className="object-cover saturate-[1.04]" priority />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/15 via-transparent to-cyan-50/25" />
              </>
            ) : null}
            {aside ? <div className="absolute inset-x-6 bottom-6 z-10 sm:inset-x-10 sm:bottom-10">{aside}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
