import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

type NewsCardProps = {
  item: {
    title: string;
    date: string;
    summary: string;
    href: string;
    heroImage: string;
  };
};

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="glass-card min-w-0 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image src={item.heroImage} alt={item.title} fill className="object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:tracking-[0.18em]">{item.date}</p>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
        </div>
        <ButtonLink href={item.href} variant="ghost" className="group px-0">
          <span className="min-w-0">阅读更多</span>
          <ArrowUpRight className="ml-2 h-4 w-4 flex-none transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
