import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type CtaBannerProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
};

export default function CtaBanner({ title, description, primary, secondary, aside }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden border-y border-blue-500/25 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="site-shell relative grid min-h-[360px] items-center gap-10 py-16 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-100">开始合作</p>
          <h2 className="heading-display mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50/90">{description}</p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <ButtonLink href={primary.href} size="lg" className="w-full border-white bg-white text-blue-700 shadow-none hover:border-blue-50 hover:bg-blue-50 sm:w-auto">{primary.label}</ButtonLink>
          {secondary ? <ButtonLink href={secondary.href} size="lg" className="w-full border-white/40 bg-white/10 text-white shadow-none hover:border-white/70 hover:bg-white/20 sm:w-auto">{secondary.label}</ButtonLink> : null}
          {aside ? <div className="mt-4">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
