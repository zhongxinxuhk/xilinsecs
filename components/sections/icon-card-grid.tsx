import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

type GridItem = { title: string; description: string; icon: LucideIcon; href?: string; label?: string; bullets?: string[] };
type IconCardGridProps = { items: GridItem[]; columns?: "two" | "three" | "four"; tone?: "light" | "dark" };
const columnClasses = { two: "md:grid-cols-2", three: "md:grid-cols-2 xl:grid-cols-3", four: "md:grid-cols-2 xl:grid-cols-4" };
const tones = [
  { icon: "bg-blue-50 text-blue-700", line: "bg-blue-500", link: "text-blue-700" },
  { icon: "bg-cyan-50 text-cyan-700", line: "bg-cyan-500", link: "text-cyan-700" },
  { icon: "bg-emerald-50 text-emerald-700", line: "bg-emerald-500", link: "text-emerald-700" },
  { icon: "bg-amber-50 text-amber-700", line: "bg-amber-500", link: "text-amber-700" },
];

export default function IconCardGrid({ items, columns = "three" }: IconCardGridProps) {
  return (
    <div className={cn("grid border-l border-t border-blue-100", columnClasses[columns])}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const tone = tones[index % tones.length];
        return (
          <article key={item.title} className="group relative border-b border-r border-blue-100 bg-white p-7 transition-all duration-500 hover:bg-blue-50/30 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 sm:p-9">
            <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100", tone.line === "bg-blue-500" ? "from-blue-500 to-cyan-500" : tone.line === "bg-cyan-500" ? "from-cyan-500 to-emerald-500" : tone.line === "bg-emerald-500" ? "from-emerald-500 to-teal-500" : "from-amber-500 to-orange-500")} />
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110", tone.icon)}><Icon className="h-5 w-5" /></div>
            <h3 className="mt-8 text-2xl font-semibold tracking-[-.025em] text-slate-950">{item.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{item.description}</p>
            {item.bullets?.length ? (
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-700">
                {item.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className={cn("mt-2.5 h-1.5 w-1.5 flex-none rounded-full", tone.line)} /><span>{bullet}</span></li>)}
              </ul>
            ) : null}
            {item.href ? <SmartLink href={item.href} className={cn("mt-8 inline-flex items-center text-sm font-semibold", tone.link)}>{item.label ?? "查看详情"}<ArrowUpRight className="ml-1.5 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></SmartLink> : null}
          </article>
        );
      })}
    </div>
  );
}
