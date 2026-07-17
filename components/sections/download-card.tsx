import type { DownloadRecord } from "@/lib/data/types";
import { ButtonLink } from "@/components/ui/button";

type DownloadCardProps = {
  item: DownloadRecord;
};

export default function DownloadCard({ item }: DownloadCardProps) {
  return (
    <article className="glass-card flex h-full min-w-0 flex-col p-5 sm:p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700 sm:tracking-[0.18em]">
        {item.platforms.join(" · ")}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-700">
        {item.benefits.map((benefit) => (
          <li key={benefit} className="flex min-w-0 gap-2">
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-blue-600" />
            <span className="min-w-0">{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={item.href} className="w-full sm:w-auto">{item.cta?.label ?? "查看详情"}</ButtonLink>
      </div>
    </article>
  );
}
