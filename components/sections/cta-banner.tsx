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
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 px-6 py-10 text-white sm:px-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">联系我们</p>
            <h2 className="heading-display mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={primary.href} size="lg" className="border-white bg-white text-black hover:border-zinc-200 hover:bg-zinc-200">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" className="border-zinc-700 bg-zinc-900 text-white hover:border-zinc-500 hover:bg-zinc-800">
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
