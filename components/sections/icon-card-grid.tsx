import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

type GridItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  label?: string;
  bullets?: string[];
};

type IconCardGridProps = {
  items: GridItem[];
  columns?: "two" | "three" | "four";
  tone?: "light" | "dark";
};

const columnClasses = {
  two: "md:grid-cols-2",
  three: "md:grid-cols-2 xl:grid-cols-3",
  four: "md:grid-cols-2 xl:grid-cols-4",
};

export default function IconCardGrid({ items, columns = "three" }: IconCardGridProps) {
  const tones = [
    {
      icon: "border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 text-blue-700",
      dot: "bg-blue-500",
      link: "text-blue-700 hover:text-blue-800",
    },
    {
      icon: "border-cyan-100 bg-gradient-to-br from-cyan-50 to-teal-50 text-cyan-700",
      dot: "bg-cyan-500",
      link: "text-cyan-700 hover:text-cyan-800",
    },
    {
      icon: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-lime-50 text-emerald-700",
      dot: "bg-emerald-500",
      link: "text-emerald-700 hover:text-emerald-800",
    },
    {
      icon: "border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 text-orange-700",
      dot: "bg-orange-500",
      link: "text-orange-700 hover:text-orange-800",
    },
  ];

  return (
    <div className={cn("grid min-w-0 gap-5", columnClasses[columns])}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const tone = tones[index % tones.length];
        return (
          <article key={item.title} className="glass-card group min-w-0 p-6 transition-all duration-200 hover:-translate-y-1">
            <div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,.8)]", tone.icon)}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            {item.bullets?.length ? (
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className={cn("mt-2.5 h-1 w-1 flex-none rounded-full", tone.dot)} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.href ? (
              <SmartLink href={item.href} className={cn("mt-6 inline-flex items-center text-sm font-semibold", tone.link)}>
                {item.label ?? "查看详情"}
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </SmartLink>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
