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
  return (
    <div className={cn("grid min-w-0 gap-5", columnClasses[columns])}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="glass-card min-w-0 p-6 transition-colors duration-200">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-zinc-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
            {item.bullets?.length ? (
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-zinc-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-zinc-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.href ? (
              <SmartLink href={item.href} className="mt-6 inline-flex items-center text-sm font-medium text-zinc-950 hover:text-zinc-600">
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
