"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ShowcasePagerItem = {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaLabel: string;
  eyebrow: string;
  meta?: string;
  tags?: string[];
};

type GsapShowcasePagerProps = {
  kicker: string;
  title: string;
  description: string;
  items: ShowcasePagerItem[];
  tone?: "azure" | "emerald";
};

export default function GsapShowcasePager({
  kicker,
  title,
  description,
  items,
  tone = "azure",
}: GsapShowcasePagerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeItem = items[activeIndex];

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return true;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!items.length || nextIndex === activeIndex) {
        return;
      }

      const normalizedIndex = (nextIndex + items.length) % items.length;
      setDirection(normalizedIndex > activeIndex || (activeIndex === items.length - 1 && normalizedIndex === 0) ? 1 : -1);
      setActiveIndex(normalizedIndex);
    },
    [activeIndex, items.length]
  );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goTo(activeIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        goTo(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeIndex, goTo]);

  useLayoutEffect(() => {
    if (reducedMotion || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const copyChildren = copyRef.current?.querySelectorAll("[data-gsap-copy]");
      const activeThumb = railRef.current?.querySelector("[data-active='true']");

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, clipPath: direction > 0 ? "inset(0 0 0 24%)" : "inset(0 24% 0 0)", scale: 1.08, x: 28 * direction },
        { autoAlpha: 1, clipPath: "inset(0 0% 0 0%)", scale: 1, x: 0, duration: 0.72, ease: "power3.out" }
      );

      gsap.fromTo(
        copyChildren ?? [],
        { autoAlpha: 0, y: 18, x: 18 * direction },
        { autoAlpha: 1, y: 0, x: 0, duration: 0.56, ease: "power3.out", stagger: 0.06, delay: 0.08 }
      );

      if (activeThumb) {
        gsap.fromTo(activeThumb, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.65)" });
      }
    }, rootRef);

    return () => context.revert();
  }, [activeIndex, direction, reducedMotion]);

  if (!items.length) {
    return null;
  }

  return (
    <div ref={rootRef} className={cn("showcase-pager", tone === "emerald" && "showcase-pager-emerald")}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="min-w-0">
          <div className="section-kicker">{kicker}</div>
          <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">{description}</p>
        </div>

        <div className="flex min-w-0 items-center justify-start gap-3 lg:justify-end">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="showcase-nav-button"
            aria-label="上一页"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="showcase-count" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </div>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="showcase-nav-button"
            aria-label="下一页"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div ref={imageRef} className="showcase-media">
          <Image
            key={activeItem.image}
            src={activeItem.image}
            alt={activeItem.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
          <div className="showcase-media-shade" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-white">
            <span className="rounded-full border border-white/30 bg-white/18 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
              {activeItem.eyebrow}
            </span>
            {activeItem.meta ? <span className="text-sm font-semibold drop-shadow">{activeItem.meta}</span> : null}
          </div>
        </div>

        <div ref={copyRef} className="showcase-copy">
          <p data-gsap-copy className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            {activeItem.eyebrow}
          </p>
          <h3 data-gsap-copy className="heading-display mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-50 md:text-4xl">
            {activeItem.title}
          </h3>
          <p data-gsap-copy className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{activeItem.description}</p>

          {activeItem.tags?.length ? (
            <div data-gsap-copy className="mt-6 flex flex-wrap gap-2">
              {activeItem.tags.map((tag) => (
                <span key={tag} className="showcase-tag">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div data-gsap-copy className="mt-8">
            <ButtonLink href={activeItem.href} className="group">
              {activeItem.ctaLabel}
              <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </div>
      </div>

      <div ref={railRef} className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(index)}
            data-active={index === activeIndex}
            className={cn("showcase-thumb", index === activeIndex && "showcase-thumb-active")}
          >
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-2 block text-left text-sm font-semibold text-slate-950 dark:text-slate-50">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
