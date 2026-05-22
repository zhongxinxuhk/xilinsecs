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

export default function IconCardGrid({
  items,
  columns = "three",
  tone = "light",
}: IconCardGridProps) {
  return (
    <div className={cn("grid min-w-0 gap-5", columnClasses[columns])}>
      {items.map((item) => {
        const Icon = item.icon;
        const isDark = tone === "dark";

        return (
          <article
            key={item.title}
            className={cn(
              "min-w-0 rounded-[24px] border p-5 transition duration-300 sm:rounded-[28px] sm:p-6",
              isDark
                ? "border-white/10 bg-white/5 text-white hover:-translate-y-1 hover:bg-white/8"
                : "glass-card hover:-translate-y-1"
            )}
          >
            <div
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                isDark ? "bg-cyan-400/12 text-cyan-200" : "bg-slate-950 text-white"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className={cn("responsive-text mt-5 text-xl font-semibold", isDark ? "text-white" : "text-slate-950 dark:text-slate-50")}>
              {item.title}
            </h3>
            <p className={cn("responsive-text mt-3 text-sm leading-7", isDark ? "text-slate-300" : "text-slate-600 dark:text-slate-400")}>
              {item.description}
            </p>
            {item.bullets?.length ? (
              <ul className={cn("mt-5 space-y-2 text-sm", isDark ? "text-slate-200" : "text-slate-700 dark:text-slate-300")}>
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex min-w-0 gap-2">
                    <span className={cn("mt-1 h-2 w-2 flex-none rounded-full", isDark ? "bg-cyan-300" : "bg-blue-600")} />
                    <span className="responsive-text min-w-0 flex-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.href ? (
              <SmartLink
                href={item.href}
                className={cn(
                  "mt-6 inline-flex max-w-full items-center text-sm font-semibold",
                  isDark ? "text-cyan-200" : "text-blue-700"
                )}
              >
                <span className="min-w-0">{item.label ?? "查看详情"}</span>
                <ArrowUpRight className="ml-2 h-4 w-4 flex-none" />
              </SmartLink>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
