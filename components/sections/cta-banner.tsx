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
      <div className="rainbow-panel overflow-hidden px-5 py-10 text-slate-950 dark:text-slate-50 sm:px-8 md:px-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.18em] text-blue-700">联系我们</p>
            <h2 className="heading-display mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-50 md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={primary.href} size="lg" className="w-full sm:w-auto">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" variant="outline" className="w-full sm:w-auto">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          {aside ? <div className="min-w-0 self-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
