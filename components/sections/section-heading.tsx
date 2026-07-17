import type { LucideIcon } from "lucide-react";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
};

export default function SectionHeading({ kicker, title, description, icon: Icon }: SectionHeadingProps) {
  return (
    <div className="min-w-0 max-w-3xl">
      {kicker ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{kicker}</p> : null}
      <h2 className="heading-display mt-3 flex min-w-0 items-center gap-3 text-3xl font-semibold text-zinc-950 md:text-4xl">
        {Icon ? <Icon className="h-7 w-7 flex-none text-zinc-700" /> : null}
        <span className="min-w-0">{title}</span>
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-zinc-600 md:text-lg">{description}</p> : null}
    </div>
  );
}
