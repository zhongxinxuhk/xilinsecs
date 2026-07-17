import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

type ProjectCardProps = {
  project: {
    title: string;
    category: string;
    description: string;
    heroImage: string;
    href: string;
    tags?: string[];
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-card min-w-0 overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <Image src={project.heroImage} alt={project.title} fill className="object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="min-w-0 space-y-5 p-5 sm:p-6">
        <div className="flex min-w-0 flex-wrap gap-2">
          <span className="max-w-full rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700 sm:tracking-[0.16em]">
            {project.category}
          </span>
          {project.tags?.map((tag) => (
            <span key={tag} className="max-w-full rounded-full bg-cyan-50 px-3 py-1 text-xs text-cyan-700">
              {tag}
            </span>
          ))}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-600">{project.description}</p>
        </div>
        <ButtonLink href={project.href} variant="outline" className="group">
          <span className="min-w-0">查看详情</span>
          <ArrowUpRight className="ml-2 h-4 w-4 flex-none transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
