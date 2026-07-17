import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type HeroAction = { label: string; href: string; variant?: "solid" | "outline" };
type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  aside?: ReactNode;
  image?: string;
};

export default function PageHero({ kicker, title, description, actions = [], aside, image }: PageHeroProps) {
  return (
    <section className="section-panel">
      <div className="site-shell relative min-h-[620px] py-20 sm:py-24 lg:py-0">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-45 [mask-image:linear-gradient(to_right,black,transparent_78%)]" />
        <div className="relative grid min-h-[620px] items-stretch lg:grid-cols-[1.08fr_.92fr]">
          <div className="flex flex-col justify-center py-8 pr-0 lg:border-r lg:border-blue-100 lg:pr-16">
            <div className="max-w-4xl">
              <div className="section-kicker">{kicker}</div>
              <h1 className="heading-display responsive-text mt-7 text-5xl font-semibold leading-[.94] text-slate-950 sm:text-6xl lg:text-7xl 2xl:text-8xl">
                {title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>
              {actions.length ? (
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {actions.map((action) => (
                    <ButtonLink key={action.href} href={action.href} variant={action.variant ?? "solid"} size="lg" className="w-full sm:w-auto">
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
