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
    <section className="site-shell">
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 px-6 py-10 text-white shadow-[0_24px_70px_rgba(37,99,235,0.25)] sm:px-10 md:py-14">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">联系我们</p>
            <h2 className="heading-display mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-blue-50/90">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={primary.href} size="lg" className="border-white bg-white text-blue-700 shadow-none hover:border-blue-50 hover:bg-blue-50">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" className="border-white/40 bg-white/10 text-white shadow-none hover:border-white/70 hover:bg-white/20">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
