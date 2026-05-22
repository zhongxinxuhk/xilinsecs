import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getProjectBySlug, projects } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import JsonLd from "@/components/seo/json-ld";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: project.href,
    image: project.heroImage,
  });
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "项目案例", href: "/projects/" }, { label: project.title }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          image: project.heroImage,
          url: `https://www.sec.hn.cn${project.href}`,
          datePublished: `${project.year}-01-01`,
        }}
      />

      <PageHero
        kicker={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.description}
        image={project.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "返回案例列表", href: "/projects/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Client</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">{project.client}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="项目概览" description={project.summary} />
              <div className="mt-6 space-y-4 text-sm leading-8 text-slate-700">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="项目亮点" description="这些内容最能体现项目的执行价值。" />
              <div className="mt-6">
                <CheckList items={[...project.highlights, ...project.services, ...project.stack]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="项目画面"
              title="项目画面"
              description="保留原项目中的关键界面或环境截图，便于快速理解交付结果。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {project.gallery.map((image) => (
              <Reveal key={image}>
                <div className="glass-card overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={image} alt={project.title} fill className="object-cover" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="如果你也在处理类似问题，我们可以从现状梳理开始。"
            description="不一定要从一个完整需求文档开始，只要能说明业务目标和当前阻碍，我们就可以一起收敛范围。"
            primary={{ label: "发起项目沟通", href: "/contact/request/" }}
            secondary={{ label: "继续查看案例", href: "/projects/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
