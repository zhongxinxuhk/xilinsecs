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
      {kicker ? <div className="section-kicker">{kicker}</div> : null}
      <h2 className="heading-display mt-4 flex min-w-0 flex-col items-start gap-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:flex-row sm:items-center md:text-4xl">
        {Icon && <Icon className="h-7 w-7 flex-none text-blue-600 sm:h-8 sm:w-8" />}
        <span className="min-w-0">{title}</span>
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">{description}</p> : null}
    </div>
  );
}
